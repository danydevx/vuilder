<template>
  <section
    :id="id"
    class="section section-calendar position-relative overflow-hidden py-5"
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

    <!-- Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']">
      <!-- Header -->
      <header class="text-center mb-5" data-aos="fade-up" data-aos-duration="700">
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

      <!-- 🔹 Layout responsive: calendario + horarios -->
      <div
        class="calendar-layout row g-4 justify-content-center align-items-start"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <!-- 📅 Calendario -->
        <div class="col-12 col-lg-8 d-flex justify-content-center">
          <div class="calendar-grid w-100">
            <div
              v-for="(day, i) in configResolved.availableDays"
              :key="i"
              class="calendar-day rounded-3 text-center p-3 shadow-sm"
              :class="{ available: isAvailable(day), disabled: isPast(day) || sent.value }"
              @click="selectDay(day)"
            >
              <div class="fw-semibold">{{ formatDate(day) }}</div>
              <small v-if="isAvailable(day)" class="text-accent fw-semibold">Disponible</small>
              <small v-else class="">No disponible</small>
            </div>
          </div>
        </div>

        <!-- 🕒 Horarios -->
        <div class="col-12 col-lg-4" ref="timeSlotsRef">
          <div
            v-if="selectedDay && timeSlots.length"
            class="time-slots text-center text-lg-start"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            <h6 class="fw-semibold mb-3">
              Horarios para {{ formatDate(selectedDay) }}:
            </h6>
            <div class="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
              <button
                v-for="(time, t) in timeSlots"
                :key="t"
                class="btn btn-outline rounded-pill px-3 py-2"
                :disabled="isSlotTaken(time) || sent.value"
                @click="openModal(time)"
              >
                {{ time }}
                <small
                  v-if="isSlotTaken(time)"
                  class="d-block small "
                  style="font-size: 0.75rem"
                >
                  Ocupado
                </small>
              </button>
            </div>
          </div>

          <div v-else class=" text-center small fst-italic">
            Selecciona una fecha disponible para ver los horarios.
          </div>
        </div>
      </div>

      <!-- CTAs -->
      <div v-if="ctas?.length" class="text-center mt-5" data-aos="fade-up">
        <a
          v-for="(cta, i) in ctas"
          :key="i"
          :href="cta.href"
          class="btn me-2 mb-2"
          :class="[
            cta.variant === 'solid'
              ? 'btn-scheme'
              : cta.variant === 'outline'
              ? 'btn-outline'
              : 'btn-ghost'
          ]"
        >
          <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>{{ cta.label }}
        </a>
      </div>
    </div>

    <!-- 🪄 Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="custom-modal-backdrop d-flex align-items-center justify-content-center"
        @click.self="closeModal"
      >
        <div class="custom-modal rounded-4 overflow-hidden shadow-lg" data-aos="zoom-in">
          <div class="modal-header p-3 border-0 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold m-0">Reservar cita</h5>
            <button class="btn btn-ghost p-0 fs-4 lh-1" @click="closeModal">
              <i class="bi bi-x"></i>
            </button>
          </div>

          <div class="modal-scroll p-4">
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
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  id: String,
  scheme: String,
  title: String,
  subtitle: String,
  backgroundImg: String,
  enableOverlay: Boolean,
  fluid: { type: Boolean, default: false },
  ctas: Array,
  config: Object,
  sendBy: { type: String, default: 'email' },
  sentMessage: {
    type: String,
    default:
      'Ya has enviado tu cita. Si deseas cancelarla o reenviar, haz clic en "Enviar de nuevo".',
  },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

// ID limpio para localStorage
const storageKey = computed(() =>
  props.id ? props.id.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() : 'calendar'
)

const configResolved = computed(() => ({
  minDaysAhead: props.config?.minDaysAhead ?? 2,
  availableDays: props.config?.availableDays ?? [],
  subjects: props.config?.subjects ?? [],
  extraFields: props.config?.extraFields ?? {},
  checkAvailability: props.config?.checkAvailability,
  reserveSlot: props.config?.reserveSlot,
  getBookedSlots: props.config?.getBookedSlots,
  generateTimeSlotsForDate: props.config?.generateTimeSlotsForDate,
}))

const selectedDay = ref(null)
const selectedTime = ref('')
const bookedSlots = ref([])
const currentTimeSlots = ref([])
const showModal = ref(false)
const sending = ref(false)
const sent = ref(false)
const form = ref({ name: '', phone: '', subject: '', message: '', extra: {} })
const errors = ref({})

onMounted(() => {
  sent.value = localStorage.getItem(storageKey.value) === '1'
})

watch(selectedDay, async (day) => {
  if (!day) return
  const slots = configResolved.value.generateTimeSlotsForDate?.(day) ?? []
  currentTimeSlots.value = slots
  if (configResolved.value.getBookedSlots) {
    bookedSlots.value = await configResolved.value.getBookedSlots(day)
  }
})

function isSlotTaken(time) {
  return bookedSlots.value.includes(time)
}
function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })
}
function isPast(date) {
  const today = new Date()
  const d = new Date(date)
  const min = new Date(today)
  min.setDate(today.getDate() + configResolved.value.minDaysAhead)
  return d < min
}
function isAvailable(date) {
  return configResolved.value.availableDays.includes(date)
}

const timeSlots = computed(() => currentTimeSlots.value)

function openModal(time) {
  if (isSlotTaken(time)) return
  selectedTime.value = time
  showModal.value = true
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  showModal.value = false
  document.body.style.overflow = ''
}
function clearError(field) {
  delete errors.value[field]
}
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

const timeSlotsRef = ref(null)
function selectDay(day) {
  if (isPast(day) || sent.value) return
  selectedDay.value = day
  if (window.innerWidth < 992) {
    setTimeout(() => {
      timeSlotsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 250)
  }
}

async function submitFormDemo() {
  if (sent.value) {
    alert(props.sentMessage)
    return
  }

  if (!validateForm()) return
  sending.value = true

  try {
    console.info('Simulando guardado en BD...')
    await new Promise((r) => setTimeout(r, 800))
    alert('✅ Simulación: El mensaje se guardó correctamente en la base de datos.')

    if (configResolved.value.reserveSlot)
      await configResolved.value.reserveSlot(selectedDay.value, selectedTime.value)

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
    }

    localStorage.setItem(storageKey.value, '1')
    sent.value = true
    closeModal()
  } catch (err) {
    console.error(err)
    alert('❌ Error durante la simulación.')
  } finally {
    sending.value = false
  }
}

function cancelAndReset() {
  localStorage.removeItem(storageKey.value)
  sent.value = false
  alert('Has cancelado tu cita. Ya puedes volver a enviar el formulario.')
}
</script>



<style lang="less" scoped>
 
 
 
.section-calendar {
  background: var(--surface);
  color: var(--text);

    .form-control.is-invalid,
  .form-select.is-invalid {
    border-color: var(--accent);
    box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--accent) 25%, transparent);
  }
  .error-text {
    display: block;
    font-size: 0.8rem;
    color: color-mix(in srgb, var(--accent), var(--text) 40%);
    margin-top: 0.25rem;
  }

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

 .calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); // 👈 Fijo 7 columnas = una semana
  gap: 0.75rem;
  max-width: 720px;
  margin: 0 auto;

  .calendar-day {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    border-radius: 0.75rem;
    padding: 1rem;
    transition: all 0.25s ease;
    cursor: pointer;
    font-size: 0.8rem;

    &.available:hover {
      background: color-mix(in srgb, var(--accent) 15%, var(--surface));
      transform: translateY(-2px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }

    &.disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  @media (max-width: 991px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
}


  .calendar-layout {
    max-width: 1200px;
    margin-inline: auto;
  }

 
  /* ---- Modal estilo menus-4 ---- */
  .custom-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    z-index: 1050;
  }

  .custom-modal {
    background: var(--surface);
    color: var(--text);
    max-width: 600px;
    width: 95%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    border-radius: 1.2rem;
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    animation: modalPop 0.25s ease-out forwards;
  }

  .modal-scroll {
    flex-grow: 1;
    overflow-y: auto;
    max-height: calc(90vh - 120px);
  }

  @keyframes modalPop {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .form-control,
  .form-select {
    background: var(--surface-2);
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
      border-color: var(--accent);
    }
  }
}
</style>
