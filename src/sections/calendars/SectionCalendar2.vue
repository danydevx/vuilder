<!-- src/sections/terrazas/calendars/SectionCalendar2.vue -->
<template>
  <section
    :id="id"
    class="section section-calendar-2 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- 🌄 Fondo -->
    <div v-if="backgroundImg" class="bg-media" :style="{ backgroundImage: `url('${backgroundImg}')` }" />
    <div v-if="enableOverlay" class="bg-overlay" />

    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']">
      <!-- Header -->
      <header class="text-center mb-4" data-aos="fade-up">
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 42rem">
          {{ subtitle }}
        </p>
      </header>

      <!-- ✅ Mensaje si ya se envió -->
      <transition name="fade">
        <div
          v-if="sent"
          class="alert alert-info text-center mb-4 mx-auto"
          style="max-width: 600px"
        >
          {{ sentMessage }}
          <button class="btn btn-outline ms-2 mt-2" @click="cancelAndReset">
            Enviar de nuevo y Cancelar
          </button>
        </div>
      </transition>

      <!-- ============ STEP 1: Selección de día y hora ============ -->
      <div v-if="!selectedTime && !loadingForm && !sent" class="calendar-step-1" data-aos="fade-up">
        <!-- 📅 Días -->
        <div class="days-slider d-flex gap-2 overflow-auto pb-3 mb-4 justify-content-center">
          <div
            v-for="(day, i) in availableDaysLimited"
            :key="i"
            class="day-card text-center flex-shrink-0 px-3 py-2 rounded-3 border"
            :class="{ active: selectedDay === day.iso, disabled: isPast(day.iso) }"
            @click="selectDay(day.iso)"
          >
            <div class="fw-semibold">{{ day.weekday }}</div>
            <small class="">{{ day.date }}</small>
          </div>
        </div>

        <!-- 🕒 Horarios -->
        <div v-if="selectedDay" class="time-slots text-center" ref="timeSlotsRef">
          <h6 class="fw-semibold mb-3">Selecciona un horario:</h6>
          <div class="d-flex flex-wrap gap-2 justify-content-center">
            <button
              v-for="(time, t) in timeSlots"
              :key="t"
              class="btn btn-outline rounded-pill px-3 py-2"
              :disabled="isSlotTaken(time)"
              @click="selectTime(time)"
            >
              {{ time }}
            </button>
          </div>
        </div>
      </div>

      <!-- ============ STEP 2: Precarga + Formulario ============ -->
      <transition name="fade">
        <div v-if="loadingForm" class="loading-form d-flex flex-column align-items-center py-5">
          <div class="spinner-border text-accent mb-3" role="status"></div>
          <p class="">Preparando tu formulario...</p>
        </div>
      </transition>

      <transition name="fade">
        <div
          v-if="selectedTime && !loadingForm && !sent"
          class="appointment-form mx-auto mt-4"
          style="max-width: 500px"
        >
          <h5 class="fw-bold mb-2">¡Ya casi!</h5>
          <p class=" small mb-3">
            {{ formatDate(selectedDay) }}, <strong>{{ selectedTime }}</strong>
            <button class="btn btn-link p-0 ms-2 small text-accent" @click="resetSelection">
              Cambiar
            </button>
          </p>

          <form @submit.prevent="submitFormDemo">
            <div class="mb-3">
              <label class="form-label">Nombre *</label>
              <input
                v-model.trim="form.name"
                @input="clearError('name')"
                type="text"
                class="form-control"
                placeholder="Tu nombre completo"
                :class="{ 'is-invalid': errors.name }"
              />
              <small v-if="errors.name" class="error-text">{{ errors.name }}</small>
            </div>

            <div class="mb-3">
              <label class="form-label">Correo electrónico *</label>
              <input
                v-model.trim="form.email"
                @input="clearError('email')"
                type="email"
                class="form-control"
                placeholder="tucorreo@dominio.com"
                :class="{ 'is-invalid': errors.email }"
              />
              <small v-if="errors.email" class="error-text">{{ errors.email }}</small>
            </div>

            <div class="mb-3">
              <label class="form-label">Mensaje (opcional)</label>
              <textarea
                v-model.trim="form.message"
                rows="3"
                class="form-control"
                placeholder="Agrega un comentario..."
              ></textarea>
            </div>

            <div class="text-end mt-4">
              <button type="submit" class="btn btn-scheme w-100 py-2" :disabled="sending">
                <span v-if="!sending">Confirmar reunión</span>
                <span v-else>Enviando...</span>
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

/* ============================================================
📦 Props
============================================================ */
const props = defineProps({
  id: String,
  scheme: String,
  title: String,
  subtitle: String,
  backgroundImg: String,
  enableOverlay: Boolean,
  fluid: { type: Boolean, default: false },
  daysVisible: { type: Number, default: 7 },
  sendBy: { type: String, default: 'email' },
  sentMessage: {
    type: String,
    default:
      'Ya has enviado tu cita. Si deseas cancelarla o reenviar, haz clic en "Enviar de nuevo".',
  },
  config: Object,
})

/* ============================================================
🧠 Estado reactivo y configuración
============================================================ */
const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const today = new Date()

const storageKey = computed(() =>
  props.id ? props.id.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() : 'calendar2'
)

const configResolved = computed(() => ({
  getBookedSlots: props.config?.getBookedSlots,
  reserveSlot: props.config?.reserveSlot,
  generateTimeSlotsForDate: props.config?.generateTimeSlotsForDate,
}))

const selectedDay = ref(null)
const selectedTime = ref('')
const currentTimeSlots = ref([])
const bookedSlots = ref([])
const loadingForm = ref(false)
const sending = ref(false)
const sent = ref(false)
const form = ref({ name: '', email: '', message: '' })
const errors = ref({})

onMounted(() => {
  sent.value = localStorage.getItem(storageKey.value) === '1'
})

/* ============================================================
📅 Generador de días disponibles
============================================================ */
const availableDaysLimited = computed(() => {
  const days = []
  const start = new Date(today)
  start.setDate(start.getDate() + 1)
  const limit = Math.min(props.daysVisible, 30)
  for (let i = 0; i < limit; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = d.toISOString().split('T')[0]
    days.push({
      key,
      iso: d.toISOString(),
      weekday: d.toLocaleDateString('es-MX', { weekday: 'short' }),
      date: d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
    })
  }
  return days
})

/* ============================================================
👁️ Watchers
============================================================ */
watch(selectedDay, async (day) => {
  if (!day) return
  const key = new Date(day).toISOString().split('T')[0]
  currentTimeSlots.value = configResolved.value.generateTimeSlotsForDate?.(key) ?? []
  if (configResolved.value.getBookedSlots)
    bookedSlots.value = await configResolved.value.getBookedSlots(key)
})

/* ============================================================
🔧 Utilidades
============================================================ */
function isPast(date) {
  return new Date(date) < new Date()
}
function isSlotTaken(time) {
  return bookedSlots.value.includes(time)
}
function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}
function selectDay(day) {
  selectedDay.value = day
  selectedTime.value = ''
}
function selectTime(time) {
  if (isSlotTaken(time)) return
  selectedTime.value = time
  loadingForm.value = true
  setTimeout(() => {
    loadingForm.value = false
  }, 1000)
}
function resetSelection() {
  selectedDay.value = null
  selectedTime.value = ''
  form.value = { name: '', email: '', message: '' }
  errors.value = {}
}
function clearError(f) {
  delete errors.value[f]
}
function validateForm() {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'El nombre es obligatorio.'
  if (!form.value.email) errors.value.email = 'El correo es obligatorio.'
  else if (!/.+@.+\..+/.test(form.value.email)) errors.value.email = 'Correo no válido.'
  return Object.keys(errors.value).length === 0
}

/* ============================================================
🧪 submitFormDemo — Simulación con bloqueo y reenvío
============================================================ */
async function submitFormDemo() {
  if (sent.value) {
    alert(props.sentMessage)
    return
  }

  if (!validateForm()) return
  sending.value = true

  const payload = {
    ...form.value,
    date: selectedDay.value,
    time: selectedTime.value,
    created_at: new Date().toISOString(),
  }

  try {
    console.info('Simulando guardado en BD...', payload)
    await new Promise((r) => setTimeout(r, 800))
    alert('✅ Simulación: Datos guardados correctamente.')

    if (configResolved.value.reserveSlot)
      await configResolved.value.reserveSlot(selectedDay.value, selectedTime.value)

    if (props.sendBy === 'email') {
      await new Promise((r) => setTimeout(r, 400))
      alert('📧 Correo enviado correctamente.')
    } else if (props.sendBy === 'whatsapp') {
      const text = encodeURIComponent(
        `Hola 👋 soy ${form.value.name}.\nConfirmo mi cita:\n📅 ${formatDate(
          selectedDay.value
        )}\n🕒 ${selectedTime.value}\n✉️ ${form.value.email}\n💬 ${
          form.value.message || 'Sin mensaje'
        }`
      )
      window.open(`https://wa.me/?text=${text}`, '_blank')
      await new Promise((r) => setTimeout(r, 300))
      alert('💬 Mensaje preparado y enviado por WhatsApp.')
    }

    localStorage.setItem(storageKey.value, '1')
    sent.value = true
    resetSelection()
  } catch (err) {
    console.error('Error en submitFormDemo', err)
    alert('❌ Error durante la simulación.')
  } finally {
    sending.value = false
  }
}

/* ============================================================
🔁 Cancelar o reenviar
============================================================ */
function cancelAndReset() {
  localStorage.removeItem(storageKey.value)
  sent.value = false
  alert('Has cancelado tu cita. Ya puedes volver a enviar el formulario.')
}

/* ============================================================
🕒 Slots disponibles
============================================================ */
const timeSlots = computed(() => currentTimeSlots.value)
</script>


<style lang="less" scoped>
.section-calendar-2 {
  background: var(--surface);
  color: var(--text);

  .bg-media,
  .bg-overlay {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .container {
    position: relative;
    z-index: 2;
  }

  .days-slider {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .day-card {
      width: 80px;
      background: var(--surface-2);
      border: 1px solid var(--surface-border);
      border-radius: 0.75rem;
      cursor: pointer;
      transition: all 0.25s ease;
      &.active {
        background: var(--accent);
        color: var(--text-inverse);
        border-color: var(--accent);
      }
      &.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    }
    @media (min-width: 992px) {
      justify-content: center;
      overflow: visible;
    }
  }

  .time-slots {
    margin-top: 1rem;
    .btn {
      min-width: 100px;
    }
  }

  .loading-form {
    .spinner-border {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  .appointment-form {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    border-radius: 1rem;
    padding: 2rem;
  }

  .form-control,
  .form-select {
    background: var(--surface);
    border-color: var(--surface-border);
    color: var(--text);
    &:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--accent) 25%, transparent);
    }
  }

  .btn-outline {
    border-color: var(--surface-border);
    color: var(--text);
    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
    }
  }

  .error-text {
    font-size: 0.8rem;
    color: color-mix(in srgb, var(--accent), var(--text) 40%);
  }
}
</style>
