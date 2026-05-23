<!-- src/sections/terrazas/content/SectionContent2.vue -->
<template>
  <section
    :id="id"
    class="section section-content-2 position-relative overflow-hidden py-5"
    :class="[schemeClass]"
  >
    <!-- Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']">
      <div
        class="row align-items-center g-5"
        :class="[justifyClass, { 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- Columna de texto -->
        <div
          class="col-12 col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="700"
        >
          <div class="content-text">
            <h2 v-if="content.headline" class="headline  lh-sm text-uppercase mb-3">
              {{ content.headline }}
            </h2>

            <div class="underline-accent mb-3"></div>

            <p v-if="content.summary" class="lead  mb-3">
              {{ content.summary }}
            </p>

            <p v-if="content.text" class="text-body mb-4">
              {{ content.text }}
            </p>

            <!-- CTA -->
            <div v-if="ctas?.length" class="d-flex flex-wrap gap-2">
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

        <!-- Columna de imagen -->
        <div
          class="col-12 col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <div class="image-box rounded-4 shadow-sm overflow-hidden">
            <img
              v-if="content.image"
              :src="content.image"
              :alt="content.headline"
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
  id: { type: String, default: 'section-content-2' },
  scheme: { type: String, default: 'default-light' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  order: { type: String, default: 'normal' }, // normal | inverted
  justify: { type: String, default: 'center' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const justifyClass = computed(() => {
  const map = {
    start: 'justify-content-start',
    center: 'justify-content-center',
    end: 'justify-content-end',
    between: 'justify-content-between',
    around: 'justify-content-around',
  }
  return map[props.justify] || 'justify-content-center'
})
</script>

<style lang="less" scoped>
.section-content-2 {
  background: var(--surface);
  color: var(--text);

  /* Fondo */
  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.9);
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  /* Tipografía global de títulos */
  h1, h2, h3, h4, h5, h6 {
    color: var(--heading-color);
    
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin-bottom: 0.5rem;
  }

  h1 { font-size: clamp(2.2rem, 5vw, 3rem); }
  h2 { font-size: clamp(1.8rem, 3.5vw, 2.5rem); }
  h3 { font-size: clamp(1.6rem, 3vw, 2rem); }
  h4 { font-size: 1.4rem; }
  h5 { font-size: 1.2rem; }
  h6 { font-size: 1rem; }

  .content-text {
    .headline {
      color: var(--heading-color);
      font-size: clamp(1.8rem, 3vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      text-transform: uppercase;
    }

    .underline-accent {
      width: 60px;
      height: 4px;
      background: var(--accent);
      border-radius: 2px;
    }

    p {
      line-height: 1.7;
      color: var(--text);
    }

    .text-body {
      color: var(--text);
    }
  }

  .image-box {
    aspect-ratio: 1 / 1;
    background: var(--surface-2);
    img {
      transition: transform 0.6s ease;
    }
    &:hover img {
      transform: scale(1.04);
    }
  }

  /* Botones */
  .btn-scheme,
  .btn-outline,
  .btn-ghost {
    border-radius: 2rem;
    font-size: 0.9rem;
  }

  @media (max-width: 992px) {
    .row {
      flex-direction: column !important;
    }

    .image-box {
      aspect-ratio: 16 / 9;
    }
  }
}
</style>
