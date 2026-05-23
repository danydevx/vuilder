<!-- src/sections/welcome/SectionWelcome5.vue -->
<template>
  <section :id="id" class="section section-welcome-5 position-relative py-5 py-md-6" :class="schemeClass">
    <div v-if="backgroundImg" class="bg-section" :style="{ backgroundImage: `url('${backgroundImg}')` }"></div>
    <div v-if="enableOverlay" class="bg-overlay"></div>
    <div class="container position-relative">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center">
          <div class="welcome-icon mb-4" v-if="showIcon">
            <i :class="iconClass || 'bi bi-rocket-takeoff'" style="font-size: 3.5rem;"></i>
          </div>
          <p v-if="eyebrow" class="welcome-eyebrow mb-2">{{ eyebrow }}</p>
          <h1 class="welcome-title display-4  mb-3">{{ title }}</h1>
          <p v-if="subtitle" class="welcome-subtitle lead mb-4">{{ subtitle }}</p>
          <p v-if="message" class="welcome-message mb-0">{{ message }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'welcome-5' },
  scheme: { type: String, default: 'default-light' },
  eyebrow: String,
  title: { type: String, default: 'Empezando' },
  subtitle: String,
  message: String,
  backgroundImg: String,
  enableOverlay: { type: Boolean, default: true },
  showIcon: { type: Boolean, default: true },
  iconClass: String,
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-welcome-5 {
  .bg-section {
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
  .welcome-icon {
    color: var(--accent);
  }
  .welcome-eyebrow {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.9;
  }
  .welcome-title {
    color: var(--heading-color);
  }
  .welcome-subtitle {
    color: var(--);
  }
  .welcome-message {
    color: var(--text);
    max-width: 36rem;
    margin: 0 auto;
  }
}
</style>