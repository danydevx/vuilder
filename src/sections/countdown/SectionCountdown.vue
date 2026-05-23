<!-- src/sections/SectionCountdown.vue -->
<template>
  <section
    id="countdown"
    class="section section-countdown text-center position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div class="inner container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8" data-aos="fade-up" data-aos-duration="700">
          <!-- ENCABEZADO UNIFICADO -->
          <header class="section-header">
            <div class="section-tags" v-if="tags?.length">
              <span v-for="(tag, i) in tags" :key="i" class="tag">
                <i class="bi bi-clock me-1"></i>{{ tag }}
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
              <div v-if="state === 'upcoming'" class="d-flex align-items-center justify-content-center gap-3">
                <div class="counter display-4 ">{{ daysLeft }}</div>
                <div class="text-start">
                  <div class="h5 mb-0 fw-semibold">días</div>
                  <small class="">para el gran día</small>
                </div>
              </div>

              <div v-else-if="state === 'today'" class="display-6 ">
                ¡Hoy es el gran día! 🎉
              </div>

              <div v-else class="display-6 ">
                Evento finalizado
              </div>

              <div class="mt-4 d-flex flex-wrap justify-content-center gap-2">
                <a
                  v-if="icsHref"
                  :href="icsHref"
                  :download="icsFilename"
                  class="btn btn-scheme rounded-pill"
                >
                  <i class="bi bi-calendar-plus me-1"></i> Descargar recordatorio (.ics)
                </a>

                <a
                  v-else-if="icsUrl"
                  :href="icsUrl"
                  class="btn btn-scheme btn-outline rounded-pill"
                  target="_blank" rel="noopener"
                >
                  <i class="bi bi-calendar-plus me-1"></i> Descargar recordatorio (.ics)
                </a>
              </div>

              <p class="small  mt-3 mb-0">
                {{ niceDate }}
              </p>
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
  id: { type: String, default: 'countdown' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Cuenta regresiva' },
  subtitle: { type: String, default: 'Estamos muy emocionados de compartir este día contigo.' },
  tags: { type: Array, default: () => ['Countdown'] },
  metaInfo: { type: Array, default: () => [] },
  eventDate: { type: String, required: true },
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
  icsFilename: { type: String, default: 'recordatorio.ics' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const now = ref(new Date())
let timer = null

const targetDate = computed(() => new Date(props.eventDate))

const msPerDay = 24 * 60 * 60 * 1000
const diffMs = computed(() => targetDate.value.getTime() - now.value.getTime())
const daysLeft = computed(() => {
  const d = Math.ceil(diffMs.value / msPerDay)
  return d > 0 ? d : 0
})

const state = computed(() => {
  const d = Math.floor(diffMs.value / msPerDay)
  if (d > 0) return 'upcoming'
  const t = targetDate.value
  const sameDay =
    t.getFullYear() === now.value.getFullYear() &&
    t.getMonth() === now.value.getMonth() &&
    t.getDate() === now.value.getDate()
  return sameDay ? 'today' : 'past'
})

const niceDate = computed(() => {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'short' }).format(targetDate.value)
  } catch {
    return targetDate.value.toLocaleString()
  }
})

/** Generación .ics local (si no hay icsUrl) */
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
    'PRODID:-//invitados.vip//Countdown//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcs(props.icsData.title || 'Evento')}`,
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

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 60 * 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  if (icsHref.value) URL.revokeObjectURL(icsHref.value)
})
</script>

<style lang="less" scoped>
.section-countdown {
  padding: 4rem 0;
  position: relative;

  /* ENCABEZADO UNIFICADO - usa las clases globales */
  .section-header {
    margin-bottom: 3rem;
  }

  .count-card {
    max-width: 560px;
    background: var(--surface);
    border: 1px solid var(--surface-border);
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    .counter {
      line-height: 1;
      letter-spacing: .5px;
      color: var(--heading-color);
      text-shadow: 0 6px 20px color-mix(in oklab, var(--shadow), transparent 70%);
    }
  }

  /* Soporte prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    .btn {
      transition: none;
      &:hover {
        transform: none;
      }
    }
  }
}
</style>