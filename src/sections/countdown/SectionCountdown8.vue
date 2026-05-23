<!-- src/sections/countdown/SectionCountdown8.vue -->
<template>
  <section :id="id" class="section section-countdown-8 text-center py-5 position-relative" :class="schemeClass">
    <div v-if="backgroundImg" class="bg-img" :style="{ backgroundImage: `url(${backgroundImg})` }"></div>
    <div v-if="enableOverlay" class="bg-overlay"></div>
    <div class="container position-relative">
      <p v-if="eyebrow" class="eyebrow mb-2">{{ eyebrow }}</p>
      <h2 class="title mb-3">{{ title }}</h2>
      <p v-if="subtitle" class="subtitle mb-4">{{ subtitle }}</p>
      <div class="countdown-ring d-flex justify-content-center gap-4 flex-wrap">
        <div v-for="(unit, i) in timeUnits" :key="i" class="ring-item">
          <div class="ring-circle" :style="{ '--pct': unit.pct }">
            <span class="ring-value">{{ unit.value }}</span>
          </div>
          <div class="ring-label small mt-2">{{ unit.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  id: { type: String, default: 'countdown-8' },
  scheme: { type: String, default: 'default-light' },
  eyebrow: String,
  title: { type: String, default: 'Tiempo Remaining' },
  subtitle: String,
  eventDate: { type: String, required: true },
  backgroundImg: String,
  enableOverlay: { type: Boolean, default: true }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const now = ref(new Date())
let timer = null

const targetDate = computed(() => new Date(props.eventDate))
const diffMs = computed(() => Math.max(0, targetDate.value.getTime() - now.value.getTime()))

const maxValues = { days: 365, hours: 24, minutes: 60, seconds: 60 }

const timeUnits = computed(() => {
  const total = diffMs.value
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((total % (1000 * 60)) / 1000)
  return [
    { value: days, label: 'Días', pct: (days / maxValues.days) * 100 },
    { value: hours, label: 'Horas', pct: (hours / maxValues.hours) * 100 },
    { value: minutes, label: 'Min', pct: (minutes / maxValues.minutes) * 100 },
    { value: seconds, label: 'Seg', pct: (seconds / maxValues.seconds) * 100 }
  ]
})

onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 1000) })
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>

<style lang="less" scoped>
.section-countdown-8 {
  .bg-img {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }
  .bg-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .eyebrow {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.9;
    color: var(--);
  }
  .title {
    color: var(--heading-color);
  }
  .subtitle {
    color: var(--);
  }
  .ring-item {
    .ring-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: conic-gradient(var(--accent) calc(var(--pct) * 1%), var(--surface-border) 0);
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
      .ring-value {
        position: relative;
        z-index: 1;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--heading-color);
      }
    }
    .ring-label {
      color: var(--);
      text-transform: uppercase;
    }
  }
}
</style>