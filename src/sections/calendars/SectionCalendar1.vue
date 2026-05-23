<template>
  <section
    :id="id"
    class="section section-calendar-inline position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- 🌄 Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']">
      <!-- Header -->
      <header class="text-center mb-4" data-aos="fade-up" data-aos-duration="700">
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 42rem">{{ subtitle }}</p>

      </header>

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

      <!-- 📅 Días disponibles -->
      <div class="days-slider d-flex gap-2 overflow-auto pb-3 mb-4" data-aos="fade-up">

        <div
          v-for="(day, i) in weekDays"
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
      <div v-if="selectedDay" class="time-slots text-center" ref="timeSlotsRef" data-aos="fade-up">
        <h6 class="fw-semibold mb-3">Horarios para {{ formatDate(selectedDay) }}</h6>

        <div class="d-flex flex-wrap gap-2 justify-content-center">
          <button
            v-for="(time, t) in timeSlots"
            :key="t"
            class="btn btn-outline rounded-pill px-3 py-2"
            :disabled="isSlotTaken(time) || sent.value"
            @click="selectTime(time)"
          >
            {{ time }}
          </button>
        </div>
      </div>

      <!-- 🧾 Formulario -->
      <transition name="fade">
        <div
            v-if="selectedTime"
            ref="formRef"
            class="appointment-form mt-5 mx-auto"
            style="max-width: 600px"
            data-aos="fade-up"
            data-aos-duration="700"
          >
          <h5 class="fw-bold mb-3">Reservar cita</h5>

          <p class=" small mb-3">
            Día: <strong>{{ formatDate(selectedDay) }}</strong> <br />
            Hora: <strong>{{ selectedTime }}</strong>
          </p>

          <form @submit.prevent="submitFormDemo">
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input
                v-model.trim="form.name"
                @input="clearError('name')"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                required
              />
              <small v-if="errors.name" class="error-text">{{ errors.name }}</small>
            </div>

            <div class="mb-3">
              <label class="form-label">Teléfono</label>
              <input
                v-model.trim="form.phone"
                @input="clearError('phone')"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors.phone }"
                required
              />
              <small v-if="errors.phone" class="error-text">{{ errors.phone }}</small>
            </div>

            <div class="mb-3">
              <label class="form-label">Asunto</label>
              <select
                v-model="form.subject"
                @change="clearError('subject')"
                class="form-select"
                :class="{ 'is-invalid': errors.subject }"
              >
                <option disabled value="">Selecciona un asunto</option>
                <option v-for="(s, i) in configResolved.subjects" :key="i" :value="s">
                  {{ s }}
                </option>
              </select>
              <small v-if="errors.subject" class="error-text">{{ errors.subject }}</small>
            </div>

            <div class="mb-3">
              <label class="form-label">Mensaje</label>
              <textarea
                v-model.trim="form.message"
                @input="clearError('message')"
                class="form-control"
                :class="{ 'is-invalid': errors.message }"
                rows="3"
              ></textarea>
              <small v-if="errors.message" class="error-text">{{ errors.message }}</small>
            </div>

            <div
              v-for="(field, key) in configResolved.extraFields"
              :key="key"
              class="mb-3"
            >
              <label class="form-label">{{ field.name }}</label>
              <input
                v-model.trim="form.extra[key]"
                @input="clearError(key)"
                :type="field.type"
                class="form-control"
                :class="{ 'is-invalid': errors[key] }"
                :required="field.required"
              />
              <small v-if="errors[key]" class="error-text">{{ errors[key] }}</small>
            </div>

            <div class="text-end mt-4">
              <button type="submit" class="btn btn-scheme px-4" :disabled="sending">
                <span v-if="!sending">Enviar</span>
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
  sendBy: { type: String, default: 'email' }, // ✅ email / whatsapp
  sentMessage: {
    type: String,
    default:
      'Ya has enviado tu cita. Si deseas cancelarla o reenviar, haz clic en "Enviar de nuevo".',
  },
  config: Object,
})

/* ============================================================
🧠 Estado general
============================================================ */
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

// 🧩 ID limpio para localStorage (sin espacios ni caracteres)
const storageKey = computed(() =>
  props.id ? props.id.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() : 'calendar'
)

const configResolved = computed(() => ({
  subjects: props.config?.subjects ?? [],
  extraFields: props.config?.extraFields ?? {},
  getBookedSlots: props.config?.getBookedSlots,
  reserveSlot: props.config?.reserveSlot,
  generateTimeSlotsForDate: props.config?.generateTimeSlotsForDate,
  checkAvailability: props.config?.checkAvailability,
}))

// 📅 Próximos 7 días
const weekDays = computed(() => {
  const days = []
  const start = new Date()
  start.setDate(start.getDate() + 1)
  for (let i = 0; i < 7; i++) {
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
📋 Estado reactivo
============================================================ */
const selectedDay = ref(null)
const selectedTime = ref('')
const bookedSlots = ref([])
const currentTimeSlots = ref([])
const sending = ref(false)
const sent = ref(false)
const form = ref({ name: '', phone: '', subject: '', message: '', extra: {} })
const errors = ref({})
const timeSlotsRef = ref(null)
const formRef = ref(null)

/* ============================================================
📡 Inicialización
============================================================ */
onMounted(() => {
  const stored = localStorage.getItem(storageKey.value)
  sent.value = stored === '1'
})

/* ============================================================
📡 Watchers
============================================================ */
watch(selectedDay, async (day) => {
  if (!day) return
  const dateKey = new Date(day).toISOString().split('T')[0]
  const slots = configResolved.value.generateTimeSlotsForDate?.(dateKey) ?? []
  currentTimeSlots.value = slots
  if (configResolved.value.getBookedSlots)
    bookedSlots.value = await configResolved.value.getBookedSlots(dateKey)
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
  if (sent.value) return
  selectedDay.value = day
  selectedTime.value = ''
  if (window.innerWidth < 992) {
    setTimeout(() => {
      timeSlotsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 250)
  }
}

function selectTime(time) {
  if (isSlotTaken(time) || sent.value) return
  selectedTime.value = time
  setTimeout(() => {
    if (!formRef.value) return
    const targetY = formRef.value.getBoundingClientRect().top + window.scrollY - 100
    smoothScrollTo(targetY, 600)
  }, 350)
}

function smoothScrollTo(target, duration = 500) {
  const startY = window.scrollY
  const distance = target - startY
  let startTime = null
  function step(currentTime) {
    if (!startTime) startTime = currentTime
    const progress = Math.min((currentTime - startTime) / duration, 1)
    const eased =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
    window.scrollTo(0, startY + distance * eased)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function clearError(field) {
  delete errors.value[field]
}

/* ============================================================
🧩 Validación
============================================================ */
function validateForm() {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'El nombre es obligatorio.'
  if (!form.value.phone) errors.value.phone = 'El teléfono es obligatorio.'
  else if (!/^[\d\s+()-]{8,}$/.test(form.value.phone))
    errors.value.phone = 'Número de teléfono no válido.'
  if (!form.value.subject) errors.value.subject = 'Selecciona un asunto.'
  if (!form.value.message) errors.value.message = 'Escribe un mensaje breve.'
  for (const [key, field] of Object.entries(configResolved.value.extraFields)) {
    if (field.required && !form.value.extra[key])
      errors.value[key] = `${field.name} es obligatorio.`
  }
  return Object.keys(errors.value).length === 0
}

/* ============================================================
🧪 submitFormDemo — Simulación completa con BD y envío
============================================================ */
async function submitFormDemo() {
  if (sent.value) {
    alert(props.sentMessage)
    return
  }

  if (!validateForm()) return
  sending.value = true
  const dateKey = new Date(selectedDay.value).toISOString().split('T')[0]
  const payload = {
    ...form.value,
    date: dateKey,
    time: selectedTime.value,
    created_at: new Date().toISOString(),
  }

  try {
    // 1️⃣ Guardado simulado
    console.info('Simulando guardado en BD...', payload)
    await new Promise((r) => setTimeout(r, 800))
    alert('✅ Simulación: El mensaje se guardó correctamente en la base de datos.')

    // 2️⃣ Reserva simulada
    if (configResolved.value.reserveSlot)
      await configResolved.value.reserveSlot(dateKey, selectedTime.value)

    // 3️⃣ Envío según método
    if (props.sendBy === 'email') {
      await new Promise((r) => setTimeout(r, 400))
      alert('📧 Simulación: Correo enviado correctamente.')
    } else if (props.sendBy === 'whatsapp') {
      const text = encodeURIComponent(
        `Hola 👋 soy ${form.value.name}.\nReservo una cita:\n📅 ${formatDate(
          selectedDay.value
        )}\n🕒 ${selectedTime.value}\n📞 ${form.value.phone}\n💬 ${
          form.value.message || 'Sin mensaje'
        }`
      )
      window.open(`https://wa.me/?text=${text}`, '_blank')
      await new Promise((r) => setTimeout(r, 250))
      alert('💬 Simulación: Mensaje preparado y enviado por WhatsApp.')
    } else {
      alert('✅ Simulación completada.')
    }

    // 🔒 Bloquear reenvío por ID único
    localStorage.setItem(storageKey.value, '1')
    sent.value = true
  } catch (err) {
    console.error('Error en submitFormDemo', err)
    alert('❌ Error durante la simulación.')
  } finally {
    sending.value = false
  }
}

/* ============================================================
🔁 Cancelar o permitir reenvío
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
.section-calendar-inline {
  scroll-behavior: smooth;
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    z-index: 0;
  }
  .bg-overlay {
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, var(--surface-overlay) 50%, transparent);
    z-index: 1;
  }
  .container {
    position: relative;
    z-index: 2;
  }

  /* --- Slider de días --- */
.days-slider {
  display: flex;
   scroll-behavior: smooth; // 👈 asegura animación también en desktop
    transition: transform 0.35s ease-in-out; // extra suavidad al moverse
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;
  scroll-padding: 1rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .day-card {
    width: 90px;
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    border-radius: 0.75rem;
    text-align: center;
    padding: 0.75rem 0.5rem;
    cursor: pointer;
    scroll-snap-align: start;
    transition: all 0.25s ease;

    &.active {
      background: var(--accent);
      color: var(--text-inverse);
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    &.disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  /* 🖥️ Centrar en desktop */
  @media (min-width: 992px) {
    justify-content: center;
    overflow: visible;
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

  .error-text {
    display: block;
    font-size: 0.8rem;
    color: color-mix(in srgb, var(--accent), var(--text) 40%);
    margin-top: 0.25rem;
  }

  .btn-outline {
    border-color: var(--surface-border);
    color: var(--text);
    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      border-color: var(--accent);
    }
  }

  @keyframes focus-pop {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.time-slots,
.appointment-form {
  animation: focus-pop 0.4s ease-out both;
}
}
</style>
