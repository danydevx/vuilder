<!-- src/sections/cta/SectionCta6.vue -->
<template>
  <section id="cta-6" class="section section-cta-6" :class="schemeClass">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <h2 class="cta-title">{{ title }}</h2>
          <p v-if="subtitle" class="cta-text mb-0">{{ subtitle }}</p>
        </div>
        <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
          <a v-if="buttonText" :href="buttonLink || '#'" class="btn btn-scheme btn-lg rounded-pill">
            {{ buttonText }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'cta-6' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Transforma tu negocio hoy' },
  subtitle: { type: String, default: 'Comienza en minutos, sin conocimientos técnicos' },
  buttonText: { type: String, default: 'Prueba gratis' },
  buttonLink: { type: String, default: '' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-cta-6 {
  padding: 4rem 0;
  .cta-title {
    color: var(--heading-color);
    font-size: var(--h2-size);
    font-weight: 700;
  }
  .cta-text {
    color: var(--);
    font-size: 1rem;
    margin-top: 0.5rem;
  }
}
</style>