<!-- src/sections/countdown/SectionCountdown3.vue -->
<template>
  <section
    id="countdown-3"
    class="section section-countdown-3 text-center position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div class="inner container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8" data-aos="fade-up" data-aos-duration="700">
          <header class="section-header">
            <div class="section-tags" v-if="tags?.length">
              <span v-for="(tag, i) in tags" :key="i" class="tag">
                <i class="bi bi-alarm me-1"></i>{{ tag }}
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

          <div class="flip-clock d-flex justify-content-center flex-wrap gap-3 gap-md-4" data-aos="zoom-in" data-aos-duration="700">
            <div v-for="(unit, index) in timeUnits" :key="index" class="flip-unit">
              <div class="flip-card" :class="{ flipping: unit.flipping }">
                <div class="flip-top">
                  <span>{{ unit.value }}</span>
                </div>
                <div class="flip-bottom">
                  <span>{{ unit.value }}</span>
                </div>
                <div class="flip-back">
                  <div class="flip-back-top">
                    <span>{{ unit.prevValue }}</span>
                  </div>
                  <div class="flip-back-bottom">
                    <span>{{ unit.value }}</span>
                  </div>
                </div>
              </div>
              <div class="unit-label small  mt-2">{{ unit.label }}</div>
            </div>
          </div>

          <div class="event-details mt-5">
            <p class="mb-2">
              <i class="bi bi-calendar-check me-2"></i>{{ niceDate }}
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
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  id: { type: String, default: 'countdown-3' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Flip Clock Countdown' },
  subtitle: { type: String, default: 'El tiempo no se detiene' },
  tags: { type: Array, default: () => ['Countdown', 'Flip'] },
  metaInfo: { type: Array, default: () => [] },
  eventDate: { type: String, required: true },
  location: { type: String, default: '' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const now = ref(new Date())
let timer = null

const targetDate = computed(() => new Date(props.eventDate))
const diffMs = computed(() => Math.max(0, targetDate.value.getTime() - now.value.getTime()))

const prevTime = ref({ days: '000', hours: '00', minutes: '00', seconds: '00' })
const flipping = ref({ days: false, hours: false, minutes: false, seconds: false })

const timeUnits = computed(() => {
  const total = diffMs.value
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((total % (1000 * 60)) / 1000)

  const newTime = {
    days: days.toString().padStart(3, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  }

  Object.keys(newTime).forEach(key => {
    if (newTime[key] !== prevTime.value[key]) {
      flipping.value[key] = true
      setTimeout(() => { flipping.value[key] = false }, 300)
    }
  })

  prevTime.value = newTime

  return [
    { value: newTime.days, prevValue: prevTime.value.days, label: 'Días', flipping: flipping.value.days },
    { value: newTime.hours, prevValue: prevTime.value.hours, label: 'Horas', flipping: flipping.value.hours },
    { value: newTime.minutes, prevValue: prevTime.value.minutes, label: 'Min', flipping: flipping.value.minutes },
    { value: newTime.seconds, prevValue: prevTime.value.seconds, label: 'Seg', flipping: flipping.value.seconds }
  ]
})

const niceDate = computed(() => {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'short' }).format(targetDate.value)
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
.section-countdown-3 {
  padding: 4rem 0;

  .section-header {
    margin-bottom: 3rem;
  }

  .flip-clock {
    perspective: 400px;

    .flip-unit {
      .flip-card {
        width: 80px;
        height: 100px;
        position: relative;
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: 8px;
        box-shadow: var(--shadow);
        overflow: hidden;

        .flip-top,
        .flip-bottom {
          position: absolute;
          left: 0;
          right: 0;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;

          span {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--heading-color);
            font-variant-numeric: tabular-nums;
          }
        }

        .flip-top {
          top: 0;
          border-bottom: 1px solid var(--surface-border);
          align-items: flex-end;
          padding-bottom: 2px;
          background: var(--surface);
          border-radius: 8px 8px 0 0;
        }

        .flip-bottom {
          bottom: 0;
          align-items: flex-start;
          padding-top: 2px;
          background: color-mix(in oklab, var(--surface), black 3%);
          border-radius: 0 0 8px 8px;
        }

        .flip-back {
          display: none;
        }

        &.flipping {
          .flip-back {
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;

            .flip-back-top,
            .flip-back-bottom {
              position: absolute;
              left: 0;
              right: 0;
              height: 200%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: var(--surface);
              border: 1px solid var(--surface-border);

              span {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--accent);
                font-variant-numeric: tabular-nums;
              }
            }

            .flip-back-top {
              top: 0;
              align-items: flex-end;
              padding-bottom: 2px;
              border-radius: 8px 8px 0 0;
              transform-origin: bottom;
              animation: flipTop 0.3s ease-in forwards;
            }

            .flip-back-bottom {
              bottom: 0;
              align-items: flex-start;
              padding-top: 2px;
              border-radius: 0 0 8px 8px;
              transform-origin: top;
              transform: rotateX(90deg);
              animation: flipBottom 0.3s ease-out 0.3s forwards;
            }
          }
        }
      }

      .unit-label {
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
    }
  }

  @keyframes flipTop {
    to { transform: rotateX(-90deg); }
  }

  @keyframes flipBottom {
    to { transform: rotateX(0deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .flip-card,
    .flip-back-top,
    .flip-back-bottom {
      animation: none !important;
    }
  }
}
</style>