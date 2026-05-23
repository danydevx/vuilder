<!-- src/sections/countdown/SectionCountdown4.vue -->
<template>
  <section
    id="countdown-4"
    class="section section-countdown-4 position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div class="inner container">
      <div class="row align-items-center">
        <div class="col-lg-6" data-aos="fade-right" data-aos-duration="700">
          <header class="section-header mb-0">
            <div class="section-tags" v-if="tags?.length">
              <span v-for="(tag, i) in tags" :key="i" class="tag">
                <i class="bi bi-stopwatch me-1"></i>{{ tag }}
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
        </div>

        <div class="col-lg-6 mt-4 mt-lg-0" data-aos="fade-left" data-aos-duration="700">
          <div class="countdown-blocks d-flex justify-content-lg-end gap-3 gap-md-4">
            <div v-for="(unit, index) in timeUnits" :key="index" class="count-block text-center">
              <div class="count-number display-6 ">{{ unit.value }}</div>
              <div class="count-label small  text-uppercase">{{ unit.label }}</div>
            </div>
          </div>

          <div class="event-info mt-4 text-lg-end">
            <p class="mb-1">
              <i class="bi bi-calendar-event me-2"></i>{{ niceDate }}
            </p>
            <p v-if="location" class=" mb-0">
              <i class="bi bi-geo-alt me-2"></i>{{ location }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  id: { type: String, default: 'countdown-4' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Our Event Starts In' },
  subtitle: { type: String, default: 'Mark your calendar and join us' },
  tags: { type: Array, default: () => ['Countdown', 'Minimal'] },
  metaInfo: { type: Array, default: () => [] },
  eventDate: { type: String, required: true },
  location: { type: String, default: '' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const now = ref(new Date())
let timer = null

const targetDate = computed(() => new Date(props.eventDate))
const diffMs = computed(() => Math.max(0, targetDate.value.getTime() - now.value.getTime()))

const timeUnits = computed(() => {
  const total = diffMs.value
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((total % (1000 * 60)) / 1000)

  return [
    { value: days.toString().padStart(2, '0'), label: 'Días' },
    { value: hours.toString().padStart(2, '0'), label: 'Horas' },
    { value: minutes.toString().padStart(2, '0'), label: 'Min' },
    { value: seconds.toString().padStart(2, '0'), label: 'Seg' }
  ]
})

const niceDate = computed(() => {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(targetDate.value)
  } catch {
    return targetDate.value.toLocaleString()
  }
})

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="less" scoped>
.section-countdown-4 {
  padding: 4rem 0;

  .section-header {
    margin-bottom: 0;
  }

  .countdown-blocks {
    .count-block {
      min-width: 80px;
      padding: 1rem;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      box-shadow: var(--shadow-sm);

      .count-number {
        color: var(--heading-color);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }

      .count-label {
        letter-spacing: 0.1em;
        margin-top: 0.5rem;
      }
    }
  }

  .event-info {
    p {
      color: var(--);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .count-block {
      transition: none;
    }
  }
}
</style>