<!-- src/sections/terrazas/content/SectionContent9.vue -->
<template>
  <section
    :id="id"
    class="section section-content-9 position-relative overflow-hidden py-5"
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
          <header :class="[headerAlignClass, 'mb-5']">
            <div v-if="content.overline" class="badge-outline mb-3">
              {{ content.overline }}
            </div>
            <h2 class="fw-bold display-6 mb-2">{{ title }}</h2>
            <p v-if="subtitle" class=" lead" style="max-width: 42rem">{{ subtitle }}</p>
          </header>

          <div class="timeline d-flex flex-column gap-4">
            <div
              v-for="(step, i) in content.steps"
              :key="i"
              class="timeline-item d-flex align-items-start gap-3"
              :data-aos="animate ? 'fade-up' : null"
              :data-aos-delay="i * 100"
            >
              <div class="timeline-icon">
                <i :class="[step.icon, 'fs-4']"></i>
              </div>
              <div class="timeline-content rounded-4 shadow-sm glassy p-4 flex-fill">
                <div class="step-number">
                  {{ (i + 1).toString().padStart(2, '0') }}
                </div>
                <h5 class="fw-bold mb-2">{{ step.title }}</h5>
                <p class=" small mb-0">{{ step.text }}</p>
              </div>
            </div>
          </div>

          <div
            v-if="ctas?.length"
            class="d-flex flex-wrap gap-2 mt-5"
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

        <div
          class="col-lg-6 text-center"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="800"
        >
          <div class="image-circle mx-auto shadow-lg overflow-hidden">
            <img
              :src="content.image"
              alt="Process Illustration"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-9' },
  scheme: { type: String, default: 'default-dark' },
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
  'text-center mx-auto': props.align === 'center',
  'text-start me-auto': props.align === 'left',
  'text-end ms-auto': props.align === 'right'
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
.section-content-9 {
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

  .badge-outline {
    display: inline-block;
    padding: 0.4rem 0.9rem;
    font-size: 0.8rem;
    border: 1px solid var(--surface-border);
    border-radius: 2rem;
    color: var(--);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .timeline {
    position: relative;

    .timeline-item {
      .timeline-icon {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        background: color-mix(in srgb, var(--accent) 15%, var(--surface));
        color: var(--accent);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 0.3s ease;
      }

      .timeline-content {
        position: relative;
        background: color-mix(in srgb, var(--surface) 92%, var(--accent) 3%);
        border: 1px solid var(--surface-border);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
        }

        .step-number {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--);
        }
      }
    }
  }

  .image-circle {
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: var(--surface-2);
    overflow: hidden;
    transition: transform 0.4s ease;

    img {
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  @media (max-width: 991px) {
    .image-circle {
      width: 300px;
      height: 300px;
      margin-top: 2rem;
    }
    .row {
      flex-direction: column !important;
    }
  }
}
</style>
