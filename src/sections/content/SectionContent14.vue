<!-- src/sections/terrazas/content/SectionContent14.vue -->
<template>
  <section
    :id="id"
    class="section section-content-14 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- Contenedor principal -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div
        class="row align-items-start g-5"
        :class="[{ 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- Columna izquierda -->
        <div
          class="col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="800"
        >
          <header class="mb-4">
            <h2 class="fw-bold display-6 mb-3">{{ title }}</h2>
            <p v-if="subtitle" class=" lead">{{ subtitle }}</p>
          </header>

          <div class="text-blocks">
            <div
              v-for="(block, i) in content.blocks"
              :key="i"
              class="mb-4"
              :data-aos="animate ? 'fade-up' : null"
              :data-aos-delay="i * 100"
            >
              <h5 class="fw-bold mb-1">{{ block.title }}</h5>
              <p class=" small mb-0">{{ block.text }}</p>
            </div>
          </div>
        </div>

        <!-- Columna derecha -->
        <div
          class="col-lg-6"
          :class="[{ 'border-end pe-lg-5 ps-lg-0': order === 'inverted' }]"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="800"
        >
          <!-- Lista de beneficios -->
          <div class="benefits-grid mb-4">
            <div
              v-for="(benefit, i) in content.benefits"
              :key="i"
              class="d-flex align-items-center gap-2 mb-2"
              :data-aos="animate ? 'fade-up' : null"
              :data-aos-delay="i * 100"
            >
              <i class="bi bi-check-circle-fill text-accent"></i>
              <span class="small fw-semibold">{{ benefit }}</span>
            </div>
          </div>

          <!-- Imagen -->
          <div
            v-if="content.image"
            class="image-wrapper rounded-4 overflow-hidden shadow-sm mb-4"
          >
            <img
              :src="content.image"
              alt="Illustration"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
          </div>

          <!-- CTA Box -->
          <div
            v-if="content.cta"
            class="cta-box p-4 rounded-4 shadow-sm d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
            :data-aos="animate ? 'fade-up' : null"
            data-aos-delay="400"
          >
            <div>
              <h6 class="fw-semibold mb-1">{{ content.cta.title }}</h6>
              <p class="mb-0 small ">{{ content.cta.text }}</p>
            </div>
            <a
              v-if="content.cta.button"
              :href="content.cta.button.href"
              class="btn btn-accent rounded-pill px-4 py-2 fw-semibold"
            >
              {{ content.cta.button.label }}
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
  id: { type: String, default: 'section-content-14' },
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
.section-content-14 {
  position: relative;
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.05;
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .text-blocks {
    h5 {
      color: var(--heading-color);
    }
    p {
      color: var(--);
      max-width: 90%;
    }
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

    i {
      font-size: 1rem;
      color: var(--accent);
    }
  }

  .image-wrapper {
    background: var(--surface-2);
    transition: transform 0.4s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  .cta-box {
    background: color-mix(in srgb, var(--accent) 5%, var(--surface-2));
    border-left: 4px solid var(--accent);
    transition: all 0.3s ease;

    h6 {
      color: var(--heading-color);
    }
    p {
      color: var(--);
    }

    &:hover {
      transform: translateY(-2px);
      border-left-color: color-mix(in srgb, var(--accent) 70%, black 5%);
    }
  }

  .btn-accent {
    background: var(--accent);
    color: var(--text-inverse);
    border: none;
    transition: all 0.25s ease;

    &:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  }

  @media (max-width: 991px) {
    .cta-box {
      flex-direction: column;
      text-align: center;
    }

    .border-end {
      border: none !important;
      padding: 0 !important;
    }

    .text-blocks p {
      max-width: 100%;
    }
  }
}
</style>
