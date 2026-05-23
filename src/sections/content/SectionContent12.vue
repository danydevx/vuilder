<!-- src/sections/terrazas/content/SectionContent12.vue -->
<template>
  <section
    :id="id"
    class="section section-content-12 position-relative overflow-hidden py-5"
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
          <div class="image-wrapper position-relative rounded-4 overflow-hidden shadow-lg">
            <img
              :src="content.imageMain"
              alt=""
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
            <img
              v-if="content.imageOverlay"
              :src="content.imageOverlay"
              alt=""
              class="image-card position-absolute shadow-sm rounded-3"
            />
          </div>
        </div>

        <div
          class="col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="800"
        >
          <header :class="[headerAlignClass, 'mb-4']">
            <h2 class="fw-bold display-6 mb-2">{{ title }}</h2>
            <p v-if="subtitle" class=" lead">{{ subtitle }}</p>
          </header>

          <div class="row g-4 align-items-start mb-4">
            <div class="col-md-8">
              <div class="feature d-flex gap-3 align-items-start">
                <div class="icon-circle flex-shrink-0">
                  <i :class="[content.icon, 'fs-3']"></i>
                </div>
                <div>
                  <h5 class="fw-bold text-capitalize mb-1">{{ content.featureTitle }}</h5>
                  <p class=" small mb-0">{{ content.featureText }}</p>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="experience-box text-center border-start ps-3">
                <h2 class="display-5  text-accent mb-0">
                  {{ content.experience.value }}
                </h2>
                <p class="small fw-semibold mb-0">
                  {{ content.experience.label }}
                </p>
              </div>
            </div>
          </div>

          <hr class="my-4" />

          <div class="row g-4 align-items-center">
            <div class="col-md-7">
              <ul class="list-unstyled mb-3">
                <li
                  v-for="(item, i) in content.benefits"
                  :key="i"
                  class="d-flex align-items-center gap-2 mb-2"
                >
                  <i class="bi bi-check-circle-fill text-accent"></i>
                  <span>{{ item }}</span>
                </li>
              </ul>

              <a
                v-if="content.cta"
                :href="content.cta.href"
                class="btn btn-scheme rounded-pill px-4 py-2 fw-semibold"
              >
                {{ content.cta.label }}
              </a>
            </div>

            <div class="col-md-5 text-md-end">
              <img
                v-if="content.imageMini"
                :src="content.imageMini"
                alt=""
                class="rounded-3 shadow-sm img-fluid"
                loading="lazy"
              />
            </div>
          </div>

          <div
            v-if="ctas?.length"
            class="d-flex flex-wrap gap-2 mt-4"
            :class="justifyClass"
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-12' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: false },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const headerAlignClass = computed(() => ({
  'text-start me-auto': props.align === 'left',
  'text-end ms-auto': props.align === 'right',
  'text-center mx-auto': props.align === 'center'
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
.section-content-12 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.08;
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .image-wrapper {
    position: relative;

    .image-card {
      width: 220px;
      bottom: -1rem;
      right: -1rem;
      border: 4px solid var(--surface);
    }
  }

  .icon-circle {
    width: 56px;
    height: 56px;
    background: color-mix(in srgb, var(--accent) 15%, var(--surface));
    color: var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .experience-box {
    h2 {
      color: var(--accent);
    }
  }

  ul li {
    font-size: 0.95rem;
    color: var(--text);
  }

  hr {
    border-color: var(--surface-border);
    opacity: 0.6;
  }

  @media (max-width: 992px) {
    .row {
      flex-direction: column !important;
    }

    .image-card {
      display: none;
    }
  }
}
</style>
