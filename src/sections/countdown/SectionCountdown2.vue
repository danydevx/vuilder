<!-- src/sections/countdown/SectionCountdown2.vue -->
<template>
  <section
    id="countdown-2"
    class="section section-countdown-2 text-center position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div class="inner container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8" data-aos="fade-up" data-aos-duration="700">
          <header class="section-header">
            <div class="section-tags" v-if="tags?.length">
              <span v-for="(tag, i) in tags" :key="i" class="tag">
                <i class="bi bi-circle-fill me-1"></i>{{ tag }}
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

          <div class="countdown-circles d-flex justify-content-center flex-wrap gap-4" data-aos="zoom-in" data-aos-duration="700">
            <div v-for="(unit, index) in timeUnits" :key="index" class="circle-item">
              <div class="circle-ring" :style="{ '--progress': unit.progress }">
                <div class="circle-inner">
                  <span class="circle-number display-5 ">{{ unit.value }}</span>
                  <span class="circle-label small ">{{ unit.label }}</span>
                </div>
              </div>
            </div>
          </div>

          <p class="countdown-date mt-4 ">
            <i class="bi bi-calendar-event me-1"></i>{{ niceDate }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  id: { type: String, default: 'countdown-2' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Tiempo Remaining' },
  subtitle: { type: String, default: 'Cada momento nos acerca más' },
  tags: { type: Array, default: () => ['Countdown', 'Circular'] },
  metaInfo: { type: Array, default: () => [] },
  eventDate: { type: String, required: true },
  location: { type: String, default: '' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const now = ref(new Date())
let timer = null

const targetDate = computed(() => new Date(props.eventDate))
const diffMs = computed(() => Math.max(0, targetDate.value.getTime() - now.value.getTime()))

const totalDays = 365
const timeUnits = computed(() => {
  const total = diffMs.value
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((total % (1000 * 60)) / 1000)

  return [
    { value: days.toString().padStart(3, '0'), label: 'Días', progress: (days % 100) / 100 },
    { value: hours.toString().padStart(2, '0'), label: 'Horas', progress: hours / 24 },
    { value: minutes.toString().padStart(2, '0'), label: 'Min', progress: minutes / 60 },
    { value: seconds.toString().padStart(2, '0'), label: 'Seg', progress: seconds / 60 }
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
.section-countdown-2 {
  padding: 4rem 0;

  .section-header {
    margin-bottom: 3rem;
  }

  .countdown-circles {
    .circle-item {
      .circle-ring {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: conic-gradient(
          var(--accent) calc(var(--progress) * 360deg),
          var(--surface-border) calc(var(--progress) * 360deg)
        );
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          inset: 6px;
          background: var(--surface);
          border-radius: 50%;
        }

        .circle-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;

          .circle-number {
            color: var(--heading-color);
            line-height: 1;
          }

          .circle-label {
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
        }
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .circle-ring {
      transition: none;
    }
  }
}
</style>