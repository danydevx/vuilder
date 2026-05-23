<!-- src/sections/cta/SectionCta5.vue -->
<template>
  <section id="cta-5" class="section section-cta-5 text-center" :class="schemeClass">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <h2 class="cta-title">{{ title }}</h2>
          <p v-if="subtitle" class="cta-text">{{ subtitle }}</p>
          <div class="cta-buttons mt-4">
            <a v-if="primaryText" :href="primaryLink || '#'" class="btn btn-scheme btn-lg rounded-pill me-2">
              {{ primaryText }}
            </a>
            <a v-if="secondaryText" :href="secondaryLink || '#'" class="btn btn-outline rounded-pill">
              {{ secondaryText }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'cta-5' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '¿Listo para empezar?' },
  subtitle: { type: String, default: 'Únete a miles de personas que ya están creando' },
  primaryText: { type: String, default: 'Comenzar' },
  primaryLink: { type: String, default: '' },
  secondaryText: { type: String, default: 'Saber más' },
  secondaryLink: { type: String, default: '' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-cta-5 {
  padding: 5rem 0;
  .cta-title {
    color: var(--heading-color);
    font-size: var(--h1-size);
    font-weight: 700;
  }
  .cta-text {
    color: var(--);
    font-size: 1.125rem;
    margin-top: 1rem;
  }
}
</style>