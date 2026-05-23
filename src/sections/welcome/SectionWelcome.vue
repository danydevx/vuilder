<!-- src/sections/SectionWelcome1.vue -->
<template>
  <section
    :id="id"
    class="section section-welcome text-center position-relative overflow-hidden py-5 py-md-6"
    :class="schemeClass"
  >
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <div class="container position-relative" data-aos="fade-up" data-aos-duration="800">
      <p v-if="subtitle" class="welcome-subtitle mb-3">{{ subtitle }}</p>
      <h2 class="welcome-title display-6  mb-3">{{ title }}</h2>
      <p v-if="message" class="welcome-message lead mx-auto" style="max-width: 42rem">
        {{ message }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'welcome' },
  scheme: { type: String, default: 'default-light' },
  title: String,
  subtitle: String,
  message: String,
  backgroundImg: String,
  enableOverlay: { type: Boolean, default: true },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-welcome {
  position: relative;
  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.9);
  }
  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.4));
    mix-blend-mode: multiply;
  }
  .welcome-subtitle {
    font-size: 1rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.8;
  }
  .welcome-message {
    font-size: 1.125rem;
  }
}
</style>
    