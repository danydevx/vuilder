<!-- src/sections/welcome/SectionWelcome3.vue -->
<template>
  <section :id="id" class="section section-welcome-3 py-5 py-md-6" :class="schemeClass">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6" :class="{ 'order-lg-2': reverse }">
          <div class="welcome-image-wrapper mb-4 mb-lg-0" v-if="imageUrl">
            <img :src="imageUrl" :alt="title" class="welcome-image img-fluid rounded-4 shadow">
          </div>
          <div class="welcome-icon-wrapper text-center mb-4 mb-lg-0" v-else>
            <i :class="iconClass || 'bi bi-grid-3x3-gap'" style="font-size: 4rem;"></i>
          </div>
        </div>
        <div class="col-lg-6">
          <p v-if="eyebrow" class="welcome-eyebrow mb-2">{{ eyebrow }}</p>
          <h2 class="welcome-title display-6  mb-3">{{ title }}</h2>
          <p v-if="subtitle" class="welcome-subtitle lead mb-3">{{ subtitle }}</p>
          <p v-if="message" class="welcome-message">{{ message }}</p>
          <div v-if="showButton && buttonText" class="mt-4">
            <a :href="buttonLink || '#'" class="btn btn-primary rounded-pill">
              {{ buttonText }}
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
  id: { type: String, default: 'welcome-3' },
  scheme: { type: String, default: 'default-light' },
  eyebrow: String,
  title: { type: String, default: 'Sobre Nosotros' },
  subtitle: String,
  message: String,
  imageUrl: String,
  iconClass: String,
  reverse: { type: Boolean, default: false },
  showButton: { type: Boolean, default: true },
  buttonText: { type: String, default: 'Conocer más' },
  buttonLink: String,
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-welcome-3 {
  .welcome-eyebrow {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--);
  }
  .welcome-title {
    color: var(--heading-color);
  }
  .welcome-subtitle {
    color: var(--);
  }
  .welcome-message {
    color: var(--text);
  }
  .welcome-image {
    max-height: 400px;
    object-fit: cover;
  }
  .welcome-icon-wrapper {
    color: var(--accent);
    padding: 3rem;
    background: var(--surface-2);
    border-radius: 1rem;
  }
}
</style>