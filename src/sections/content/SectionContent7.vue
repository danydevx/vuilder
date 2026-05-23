<!-- src/sections/terrazas/content/SectionContent7.vue -->
<template>
  <section
    :id="id"
    class="section section-content-7 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <div
      v-if="title || subtitle"
      :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']"
      :data-aos="animate ? 'fade-up' : null"
      data-aos-duration="700"
    >
      <header :class="[headerAlignClass, 'mb-5']">
        <h2 class="fw-bold display-6 mb-3">{{ title }}</h2>
        <p
          v-if="subtitle"
          class=" lead"
          :class="{ 'mx-auto': align === 'center' }"
          style="max-width: 46rem"
        >
          {{ subtitle }}
        </p>
      </header>
    </div>

    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div class="grid-features">
        <div
          v-for="(item, i) in content.features"
          :key="i"
          class="feature-item rounded-4 shadow-sm glassy"
          :data-aos="animate ? 'zoom-in' : null"
          :data-aos-delay="i * 100"
        >
          <div class="feature-icon mb-3">
            <i :class="[item.icon, 'fs-2']"></i>
          </div>
          <h5 class="fw-bold mb-2">{{ item.title }}</h5>
          <p class=" small mb-0">{{ item.text }}</p>
        </div>
      </div>
    </div>

    <div
      v-if="content.cta || ctas?.length"
      :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']"
      class="text-center mt-5"
      :data-aos="animate ? 'fade-up' : null"
      data-aos-delay="300"
    >
      <a
        v-if="content.cta"
        :href="content.cta.href || '#'"
        class="btn btn-scheme fw-semibold rounded-pill px-4 py-2"
      >
        <i v-if="content.cta.icon" :class="[content.cta.icon, 'me-2']"></i>
        {{ content.cta.label }}
      </a>

      <a
        v-for="(cta, i) in ctas"
        :key="i"
        :href="cta.href"
        class="btn"
        :class="[
          cta.variant === 'solid'
            ? 'btn-scheme'
            : cta.variant === 'outline'
            ? 'btn-outline'
            : 'btn-ghost'
        ]"
      >
        <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
        {{ cta.label }}
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-7' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const headerAlignClass = computed(() => ({
  'text-center': props.align === 'center',
  'text-start': props.align === 'left',
  'text-end': props.align === 'right'
}))

const justifyClass = computed(() => {
  const map = {
    start: 'justify-content-start',
    center: 'justify-content-center',
    end: 'justify-content-end',
    between: 'justify-content-between',
    around: 'justify-content-around'
  }
  return map[props.justify] || 'justify-content-center'
})
</script>

<style lang="less" scoped>
.section-content-7 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.12;
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .grid-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .feature-item {
    background: color-mix(in srgb, var(--surface) 90%, var(--accent) 4%);
    border: 1px solid var(--surface-border);
    padding: 2rem 1.5rem;
    text-align: left;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-6px);
      border-color: var(--accent);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    }

    .feature-icon {
      color: var(--accent);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: color-mix(in srgb, var(--accent) 12%, var(--surface));
      border-radius: 1rem;
      width: 56px;
      height: 56px;
    }

    h5 {
      color: var(--text);
      font-size: 1.1rem;
    }
  }

  @media (max-width: 768px) {
    .feature-item {
      text-align: center;
      .feature-icon {
        margin-inline: auto;
      }
    }
  }
}
</style>
