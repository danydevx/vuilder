<!-- src/sections/welcome/SectionWelcome4.vue -->
<template>
  <section :id="id" class="section section-welcome-4 text-center py-5 py-md-6" :class="schemeClass">
    <div class="container">
      <div class="welcome-card mx-auto rounded-4 shadow-lg p-4 p-md-5">
        <div class="welcome-badge mb-3" v-if="badge">
          <span class="badge bg-primary rounded-pill">{{ badge }}</span>
        </div>
        <h1 class="welcome-title display-5  mb-3">{{ title }}</h1>
        <p v-if="subtitle" class="welcome-subtitle lead mb-0">{{ subtitle }}</p>
      </div>
      <div v-if="showStats && stats?.length" class="welcome-stats row g-4 mt-4 justify-content-center">
        <div v-for="(stat, i) in stats" :key="i" class="col-6 col-md-3">
          <div class="stat-item">
            <div class="stat-number display-6 ">{{ stat.value }}</div>
            <div class="stat-label small ">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'welcome-4' },
  scheme: { type: String, default: 'default-light' },
  badge: String,
  title: { type: String, default: 'Bienvenido a Nuestro Sitio' },
  subtitle: String,
  showStats: { type: Boolean, default: false },
  stats: { type: Array, default: () => [] },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-welcome-4 {
  .welcome-card {
    background: var(--surface);
    max-width: 700px;
  }
  .welcome-title {
    color: var(--heading-color);
  }
  .welcome-subtitle {
    color: var(--);
  }
  .stat-number {
    color: var(--accent);
  }
}
</style>