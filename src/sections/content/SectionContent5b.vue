<!-- src/sections/terrazas/content/SectionContent5B.vue -->
<template>
  <section
    :id="id"
    class="section section-content-5b position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div
        class="row align-items-center g-5"
        :class="[justifyClass, { 'flex-row-reverse': order === 'inverted' }]"
      >
        <div
          class="col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="800"
        >
          <div class="image-wrapper rounded-4 shadow-lg overflow-hidden">
            <img
              :src="content.image"
              :alt="content.title || 'Imagen destacada'"
              class="w-100 h-auto object-fit-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div
          class="col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <header :class="[headerAlignClass, 'mb-4']">
            <h2 class="fw-bold display-6 mb-3 text-uppercase">{{ title }}</h2>
            <p v-if="subtitle" class=" lead mb-4" style="max-width: 42rem">
              {{ subtitle }}
            </p>
          </header>

          <div class="row g-3">
            <div
              v-for="(item, i) in content.features"
              :key="i"
              class="col-sm-6"
              :data-aos="animate ? 'fade-up' : null"
              :data-aos-delay="i * 100"
            >
              <div class="feature d-flex align-items-start gap-3">
                <div class="icon-circle flex-shrink-0">
                  <i :class="[item.icon, 'fs-5']"></i>
                </div>
                <div>
                  <h6 class="fw-bold text-uppercase mb-1">{{ item.title }}</h6>
                  <p class=" small mb-0">{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="content.cta || ctas?.length"
            class="d-flex flex-wrap gap-2 mt-4"
            :class="justifyClass"
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-5b' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' }, // left | center | right
  justify: { type: String, default: 'center' }, // start | center | end | between | around
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' }, // normal | inverted
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
.section-content-5b {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .image-wrapper {
    background: var(--surface-2);
    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    &:hover img {
      transform: scale(1.05);
    }
  }

  .feature {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    border-radius: 1rem;
    padding: 1rem;
    transition: all 0.25s ease;

    &:hover {
      border-color: var(--accent);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
    }

    .icon-circle {
      width: 42px;
      height: 42px;
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
    .row {
      flex-direction: column !important;
    }
    .image-wrapper {
      margin-bottom: 2rem;
    }
  }
}
</style>
