<!-- src/sections/countdown/SectionCountdown7.vue -->
<template>
  <section :id="id" class="section section-countdown-7 py-5" :class="schemeClass">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <p v-if="eyebrow" class="eyebrow mb-2">{{ eyebrow }}</p>
          <h2 class="title mb-3">{{ title }}</h2>
          <p v-if="subtitle" class="subtitle mb-0">{{ subtitle }}</p>
        </div>
        <div class="col-lg-5 mt-4 mt-lg-0">
          <div class="countdown-wrapper text-center text-lg-start">
            <div class="countdown-grid d-flex justify-content-center justify-content-lg-start gap-3">
              <div v-for="(unit, i) in timeUnits" :key="i" class="unit-box">
                <div class="unit-value ">{{ unit.value }}</div>
                <div class="unit-label small">{{ unit.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  id: { type: String, default: 'countdown-7' },
  scheme: { type: String, default: 'default-light' },
  eyebrow: String,
  title: { type: String, default: 'El evento comienza en' },
  subtitle: String,
  eventDate: { type: String, required: true }
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
    { value: hours, label: 'Hrs' },
    { value: minutes, label: 'Min' },
    { value: seconds, label: 'Seg' }
  ]
})

onMounted(() => { timer = setInterval(() => { now.value = new Date() }, 1000) })
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>

<style lang="less" scoped>
.section-countdown-7 {
  .eyebrow {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--);
  }
  .title {
    color: var(--heading-color);
    font-size: var(--h3-size);
  }
  .subtitle {
    color: var(--);
  }
  .countdown-grid {
    .unit-box {
      text-align: center;
      min-width: 60px;
      padding: 0.75rem;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 0.5rem;
      .unit-value {
        font-size: 1.75rem;
        color: var(--heading-color);
        line-height: 1;
      }
      .unit-label {
        color: var(--);
        text-transform: uppercase;
        margin-top: 0.25rem;
      }
    }
  }
}
</style>