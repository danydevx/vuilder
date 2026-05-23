<!-- src/sections/countdown/SectionCountdown6.vue -->
<template>
  <section :id="id" class="section section-countdown-6 text-center py-5" :class="schemeClass">
    <div class="container">
      <p v-if="eyebrow" class="eyebrow mb-2">{{ eyebrow }}</p>
      <h2 class="title mb-4">{{ title }}</h2>
      <div class="countdown-row d-flex justify-content-center gap-3 gap-md-4 flex-wrap">
        <div v-for="(unit, i) in timeUnits" :key="i" class="unit-box">
          <div class="unit-value display-4 ">{{ unit.value }}</div>
          <div class="unit-label small ">{{ unit.label }}</div>
        </div>
      </div>
      <p v-if="targetText" class="target-date mt-4">
        <i class="bi bi-calendar-event me-1"></i>{{ targetText }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  id: { type: String, default: 'countdown-6' },
  scheme: { type: String, default: 'default-light' },
  eyebrow: String,
  title: { type: String, default: 'Cuenta Regresiva' },
  eventDate: { type: String, required: true },
  targetText: String
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
    { value: days, label: 'Días' },
    { value: hours, label: 'Horas' },
    { value: minutes, label: 'Minutos' },
    { value: seconds, label: 'Segundos' }
  ]
})

onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 1000) })
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>

<style lang="less" scoped>
.section-countdown-6 {
  .eyebrow {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--);
  }
  .title {
    color: var(--heading-color);
  }
  .unit-box {
    min-width: 80px;
    padding: 1rem;
    background: var(--surface);
    border: 1px solid var(--surface-border);
    border-radius: 0.75rem;
    .unit-value {
      color: var(--heading-color);
      line-height: 1;
    }
  }
  .target-date {
    color: var(--);
  }
}
</style>