<!-- src/sections/terrazas/content/SectionContent5.vue -->
<template>
  <section
    :id="id"
    class="section section-content-5 position-relative overflow-hidden py-5"
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
      <header :class="[headerAlignClass, 'mb-4']">
        <h2 class="fw-bold display-6 mb-3 text-uppercase">{{ title }}</h2>
        <p v-if="subtitle" class=" lead mx-auto" style="max-width: 42rem">
          {{ subtitle }}
        </p>
      </header>
    </div>

    <div
      :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']"
      class="mb-5"
      :data-aos="animate ? 'zoom-in' : null"
      data-aos-duration="800"
    >
      <div
        class="main-image rounded-4 shadow-lg overflow-hidden mx-auto"
        :class="{ 'p-0': !boxed }"
      >
        <img
          :src="content.image"
          :alt="content.title || 'Imagen destacada'"
          class="w-100 h-auto object-fit-cover"
          loading="lazy"
        />
      </div>
    </div>

    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div
        class="row g-4"
        :class="[justifyClass]"
      >
        <div
          v-for="(item, i) in content.features"
          :key="i"
          class="col-12 col-sm-6 col-lg-3"
          :data-aos="animate ? 'fade-up' : null"
          :data-aos-delay="i * 100"
        >
          <div class="feature-card text-center p-4 rounded-4 shadow-sm glassy h-100">
            <div class="icon-circle mx-auto mb-3">
              <i :class="[item.icon, 'fs-3']"></i>
            </div>
            <h5 class="fw-bold text-uppercase mb-2">{{ item.title }}</h5>
            <p class=" small mb-0">{{ item.text }}</p>
          </div>
        </div>
      </div>

      <div
        v-if="ctas?.length"
        class="d-flex flex-wrap gap-2 mt-5"
        :class="[justifyClass, headerAlignClass]"
      >
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
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-5' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: true },
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
.section-content-5 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .main-image {
    max-width: 960px;
    background: var(--surface-2);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .feature-card {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    transition: all 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
    }

    .icon-circle {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--accent) 15%, var(--surface));
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        color: var(--accent);
      }
    }
  }

  @media (max-width: 992px) {
    .main-image {
      max-width: 100%;
    }
  }
}
</style>
