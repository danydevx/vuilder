<!-- src/sections/countdown/SectionCountdown5.vue -->
<template>
  <section
    id="countdown-5"
    class="section section-countdown-5 text-center"
    :class="schemeClass"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="countdown-minimal" data-aos="fade-up">
            <div v-for="(unit, i) in timeUnits" :key="i" class="unit">
              <span class="number">{{ unit.value }}</span>
              <span class="label">{{ unit.label }}</span>
            </div>
          </div>
          <p v-if="message" class="message mt-3">{{ message }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  id: { type: String, default: 'countdown-5' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
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
.section-countdown-5 {
  padding: 2rem 0;
  .countdown-minimal {
    display: flex;
    justify-content: center;
    gap: 2rem;
    .unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      .number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--heading-color);
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      .label {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: var(--);
        letter-spacing: 0.1em;
        margin-top: 0.25rem;
      }
    }
  }
  .message {
    color: var(--);
    font-size: 0.9rem;
  }
}
</style>