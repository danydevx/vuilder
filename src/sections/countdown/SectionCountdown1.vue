<!-- src/sections/SectionCountdownDetailed.vue -->
<template>
  <section
    id="countdown-detailed"
    class="section section-countdown-detailed text-center position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div class="inner container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8" data-aos="fade-up" data-aos-duration="700">
          <!-- ENCABEZADO UNIFICADO -->
          <header class="section-header">
            <div class="section-tags" v-if="tags?.length">
              <span v-for="(tag, i) in tags" :key="i" class="tag">
                <i class="bi bi-hourglass-split me-1"></i>{{ tag }}
              </span>
            </div>
            
            <h2 class="section-title">{{ title }}</h2>
            
            <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
            
            <div class="section-meta" v-if="metaInfo?.length">
              <span v-for="(meta, i) in metaInfo" :key="i">
                <i :class="meta.icon" class="me-1"></i>{{ meta.text }}
              </span>
            </div>
          </header>

          <div class="count-card card border-0 shadow-lg mx-auto rounded-4" data-aos="zoom-in" data-aos-duration="700">
            <div class="card-body py-4 py-md-5">
              <!-- Contador detallado -->
              <div v-if="state === 'upcoming'" class="countdown-detailed">
                <div class="countdown-grid">
                  <div class="countdown-item">
                    <div class="countdown-number display-4 ">{{ timeLeft.days }}</div>
                    <div class="countdown-label">días</div>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <div class="countdown-number display-4 ">{{ timeLeft.hours }}</div>
                    <div class="countdown-label">horas</div>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <div class="countdown-number display-4 ">{{ timeLeft.minutes }}</div>
                    <div class="countdown-label">minutos</div>
                  </div>
                  <div class="countdown-separator">:</div>
                  <div class="countdown-item">
                    <div class="countdown-number display-4 ">{{ timeLeft.seconds }}</div>
                    <div class="countdown-label">segundos</div>
                  </div>
                </div>
                <p class="countdown-message  mt-3">
                  {{ countdownMessage }}
                </p>
              </div>

              <div v-else-if="state === 'today'" class="today-message">
                <div class="display-6  mb-3">¡Hoy es el gran día! 🎉</div>
                <p class="">El evento comienza a las {{ startTime }}</p>
              </div>

              <div v-else class="past-message">
                <div class="display-6  mb-3">Evento finalizado</div>
                <p class="">Gracias por ser parte de este momento especial</p>
              </div>

              <!-- Progreso (opcional) -->
              <div v-if="showProgress && state === 'upcoming'" class="progress-section mt-4">
                <div class="d-flex justify-content-between small  mb-2">
                  <span>Inicio</span>
                  <span>{{ progressPercentage }}%</span>
                  <span>Evento</span>
                </div>
                <div class="progress" style="height: 6px;">
                  <div 
                    class="progress-bar" 
                    :style="{ width: progressPercentage + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Botones de acción -->
              <div class="mt-4 d-flex flex-wrap justify-content-center gap-2">
                <a
                  v-if="icsHref"
                  :href="icsHref"
                  :download="icsFilename"
                  class="btn btn-scheme rounded-pill"
                >
                  <i class="bi bi-calendar-plus me-1"></i> Agendar evento
                </a>

                <a
                  v-else-if="icsUrl"
                  :href="icsUrl"
                  class="btn btn-scheme btn-outline rounded-pill"
                  target="_blank" rel="noopener"
                >
                  <i class="bi bi-calendar-plus me-1"></i> Descargar .ics
                </a>

                <button
                  v-if="showShare && state === 'upcoming'"
                  class="btn btn-ghost rounded-pill"
                  @click="shareEvent"
                >
                  <i class="bi bi-share me-1"></i> Compartir
                </button>
              </div>

              <!-- Información adicional -->
              <div class="event-info mt-4">
                <p class="small  mb-1">
                  <i class="bi bi-calendar-event me-1"></i>{{ niceDate }}
                </p>
                <p v-if="location" class="small  mb-0">
                  <i class="bi bi-geo-alt me-1"></i>{{ location }}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  id: { type: String, default: 'countdown-detailed' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Cuenta Regresiva Detallada' },
  subtitle: { type: String, default: 'Cada segundo cuenta para nuestro día especial.' },
  tags: { type: Array, default: () => ['Countdown', 'Tiempo Real'] },
  metaInfo: { type: Array, default: () => [] },
  eventDate: { type: String, required: true },
  location: { type: String, default: '' },
  showProgress: { type: Boolean, default: true },
  showShare: { type: Boolean, default: true },
  icsUrl: { type: String, default: '' },
  icsData: {
    type: Object,
    default: () => ({
      title: 'Evento especial',
      description: 'Te esperamos.',
      location: '',
      start: '',
      end: ''
    })
  },
  icsFilename: { type: String, default: 'evento.ics' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

/* ==== TIME MANAGEMENT ==== */
const now = ref(new Date())
let timer = null

const targetDate = computed(() => new Date(props.eventDate))
const diffMs = computed(() => targetDate.value.getTime() - now.value.getTime())

// Tiempo detallado
const timeLeft = computed(() => {
  const total = Math.max(0, diffMs.value)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((total % (1000 * 60)) / 1000)
  
  return {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  }
})

// Estados
const state = computed(() => {
  if (diffMs.value > 0) return 'upcoming'
  const t = targetDate.value
  const n = now.value
  const sameDay = t.getFullYear() === n.getFullYear() &&
    t.getMonth() === n.getMonth() &&
    t.getDate() === n.getDate()
  return sameDay ? 'today' : 'past'
})

// Progreso
const progressPercentage = computed(() => {
  if (state.value !== 'upcoming') return 100
  
  const totalDuration = 30 * 24 * 60 * 60 * 1000 // 30 días como referencia
  const elapsed = totalDuration - diffMs.value
  return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
})

// Mensajes dinámicos
const countdownMessage = computed(() => {
  const days = parseInt(timeLeft.value.days)
  if (days > 30) return 'Queda mucho tiempo, pero la emoción crece cada día'
  if (days > 7) return 'La cuenta regresiva avanza, ¡pronto nos vemos!'
  if (days > 1) return '¡Falta muy poco! Prepárate para el gran día'
  return '¡Es mañana! El momento está muy cerca'
})

const startTime = computed(() => {
  return targetDate.value.toLocaleTimeString(undefined, { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
})

const niceDate = computed(() => {
  try {
    return new Intl.DateTimeFormat(undefined, { 
      dateStyle: 'full', 
      timeStyle: 'short' 
    }).format(targetDate.value)
  } catch {
    return targetDate.value.toLocaleString()
  }
})

/* ==== ICS GENERATION ==== */
const icsHref = ref('')
watch(
  () => [props.icsUrl, props.icsData, props.eventDate],
  () => buildIcsIfNeeded(),
  { immediate: true, deep: true }
)

function buildIcsIfNeeded() {
  icsHref.value = ''
  if (props.icsUrl) return

  const startISO = props.icsData.start || props.eventDate
  const start = new Date(startISO)
  const end = new Date(props.icsData.end || (start.getTime() + 2 * 60 * 60 * 1000))

  const toIcsDate = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  const uid = `${Date.now()}@invitados.vip`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//invitados.vip//CountdownDetailed//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcs(props.icsData.title || 'Evento Especial')}`,
    props.icsData.location ? `LOCATION:${escapeIcs(props.icsData.location)}` : '',
    props.icsData.description ? `DESCRIPTION:${escapeIcs(props.icsData.description)}` : '',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean)

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  icsHref.value = URL.createObjectURL(blob)
}

function escapeIcs(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

/* ==== SHARING ==== */
async function shareEvent() {
  const shareData = {
    title: props.icsData.title || 'Evento Especial',
    text: `Únete a nosotros el ${niceDate.value}`,
    url: window.location.href
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(shareData.text)
      alert('¡Información copiada al portapapeles!')
    }
  } catch (err) {
    console.log('Error sharing:', err)
  }
}

/* ==== LIFECYCLE ==== */
onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000) // Actualizar cada segundo
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  if (icsHref.value) URL.revokeObjectURL(icsHref.value)
})
</script>

<style lang="less" scoped>
.section-countdown-detailed {
  padding: 4rem 0;
  position: relative;

  /* ENCABEZADO UNIFICADO */
  .section-header {
    margin-bottom: 3rem;
  }

  .count-card {
    max-width: 800px;
    background: var(--surface);
    border: 1px solid var(--surface-border);
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    /* Grid del contador detallado */
    .countdown-grid {
      display: grid;
      grid-template-columns: repeat(7, auto);
      gap: 0.5rem;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;

      .countdown-item {
        text-align: center;
        
        .countdown-number {
          color: var(--heading-color);
          text-shadow: 0 4px 12px color-mix(in oklab, var(--shadow), transparent 60%);
          line-height: 1;
          font-variant-numeric: tabular-nums;
          min-width: 2.5em;
        }
        
        .countdown-label {
          color: var(--);
          font-size: 0.875rem;
          font-weight: 600;
          margin-top: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      }

      .countdown-separator {
        color: var(--accent);
        font-size: 2rem;
        font-weight: 300;
        margin-top: -1rem;
        opacity: 0.7;
      }
    }

    .countdown-message {
      font-style: italic;
    }

    /* Barra de progreso */
    .progress-section {
      .progress {
        background: color-mix(in oklab, var(--surface), black 10%);
        border-radius: 10px;
        overflow: hidden;
        
        .progress-bar {
          background: linear-gradient(90deg, var(--accent), var(--accent-hover));
          transition: width 1s ease;
          border-radius: 10px;
        }
      }
    }

    /* Mensajes de estado */
    .today-message,
    .past-message {
      .display-6 {
        color: var(--heading-color);
        text-shadow: 0 2px 8px var(--shadow-sm);
      }
    }
  }

  /* Botones */
  .btn-ghost {
    background: color-mix(in oklab, var(--surface), transparent 50%);
    color: var(--text);
    border: 1px solid transparent;
    font-weight: 600;

    &:hover {
      background: color-mix(in oklab, var(--surface), transparent 30%);
      border-color: var(--surface-border);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .countdown-grid {
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 0.25rem !important;

      .countdown-separator {
        display: none;
      }

      .countdown-item {
        .countdown-number {
          font-size: 2rem !important;
        }
        
        .countdown-label {
          font-size: 0.75rem !important;
        }
      }
    }

    .d-flex.flex-wrap.justify-content-center.gap-2 {
      flex-direction: column;
      align-items: stretch;

      .btn {
        width: 100%;
      }
    }
  }

  @media (max-width: 480px) {
    .countdown-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  /* Soporte para prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    .btn-scheme,
    .progress-bar {
      transition: none;
    }
    
    .btn-scheme:hover {
      transform: none;
    }
  }
}
</style>