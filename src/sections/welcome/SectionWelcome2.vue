<!-- src/sections/welcome/SectionWelcome2.vue -->
<template>
  <section :id="id" class="section section-welcome-2 text-center py-5 py-md-6" :class="schemeClass">
    <div class="container">
      <div class="welcome-icon mb-4" v-if="showIcon">
        <i :class="iconClass || 'bi bi-house-heart'" style="font-size: 3rem;"></i>
      </div>
      <p v-if="eyebrow" class="welcome-eyebrow mb-2">{{ eyebrow }}</p>
      <h1 class="welcome-title display-5  mb-3">{{ title }}</h1>
      <p v-if="subtitle" class="welcome-subtitle lead mb-4">{{ subtitle }}</p>
      <p v-if="message" class="welcome-message mx-auto" style="max-width: 36rem">{{ message }}</p>
      <div v-if="showButtons" class="welcome-actions mt-4 d-flex justify-content-center gap-3 flex-wrap">
        <a v-if="primaryText" :href="primaryLink || '#'" class="btn btn-primary btn-lg rounded-pill">
          {{ primaryText }}
        </a>
        <a v-if="secondaryText" :href="secondaryLink || '#'" class="btn btn-outline rounded-pill">
          {{ secondaryText }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'welcome-2' },
  scheme: { type: String, default: 'default-light' },
  eyebrow: String,
  title: { type: String, default: 'Bienvenido' },
  subtitle: String,
  message: String,
  showIcon: { type: Boolean, default: true },
  iconClass: String,
  showButtons: { type: Boolean, default: false },
  primaryText: String,
  primaryLink: String,
  secondaryText: String,
  secondaryLink: String,
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-welcome-2 {
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
  .welcome-icon {
    color: var(--accent);
  }
}
</style>