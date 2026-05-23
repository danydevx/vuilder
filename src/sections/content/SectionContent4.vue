<!-- src/sections/terrazas/content/SectionContent4.vue -->
<template>
  <section
    :id="id"
    class="section section-content-4 position-relative overflow-hidden py-5"
    :class="[schemeClass]"
  >
    <!-- 🌄 Fondo general -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- 🧭 Encabezado -->
    <div
      v-if="title || subtitle"
      :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']"
      :data-aos="animate ? 'fade-up' : null"
      data-aos-duration="700"
    >
      <header :class="[headerAlignClass, 'mb-5']">
        <h2 class="fw-bold display-6 mb-2">{{ title }}</h2>
        <p v-if="subtitle" class=" lead mx-auto" style="max-width: 42rem">
          {{ subtitle }}
        </p>
      </header>
    </div>

    <!-- 🔹 Contenido principal -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div
        class="row align-items-stretch g-4"
        :class="[
          justifyClass,
          { 'flex-row-reverse': order === 'inverted' }
        ]"
      >
        <!-- 🧩 Columna izquierda: features -->
        <div
          class="col-lg-7"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="700"
        >
          <div
            :class="[
              'features-grid h-100',
              boxed ? 'p-4 p-md-5 rounded-4 shadow-sm glassy' : 'p-0 ps-lg-5 pe-lg-4 py-5'
            ]"
          >
            <div
              v-for="(item, i) in features"
              :key="i"
              class="feature-card rounded-4 shadow-sm p-4 text-center"
              :id="`feature-${i + 1}`"
              :data-aos="animate ? 'fade-up' : null"
              data-aos-delay="100"
            >
              <div class="icon-circle mx-auto mb-3">
                <i :class="[item.icon, 'fs-3']"></i>
              </div>
              <h5 class="fw-bold mb-2 text-uppercase">{{ item.title }}</h5>
              <p class=" small mb-0">{{ item.text }}</p>
            </div>
          </div>
        </div>

        <!-- 🟥 Columna derecha: bloque destacado -->
        <div
          class="col-lg-5 d-flex"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <div
            class="highlight-block d-flex flex-column justify-content-center align-items-center rounded-4 text-center shadow-lg w-100"
            :style="{ backgroundColor: content.blockColor || 'var(--accent)' }"
          >
            <h3 class="fw-bold text-white mb-3">{{ highlight.title }}</h3>
            <p v-if="highlight.text" class="text-white-50 mb-4" style="max-width: 22rem">
              {{ highlight.text }}
            </p>

            <!-- CTA -->
            <div v-if="highlight.cta">
              <a
                :href="highlight.cta.href || '#'"
                class="btn btn-light fw-semibold px-4 py-2 rounded-pill"
              >
                <i v-if="highlight.cta.icon" :class="[highlight.cta.icon, 'me-1']"></i>
                {{ highlight.cta.label }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 🔸 Botones generales opcionales -->
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
  id: { type: String, default: 'section-content-4' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Los transportistas requieren confianza' },
  subtitle: { type: String, default: 'Más de 25 años en el mercado del transporte' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  ctas: { type: Array, default: () => [] },
  features: { type: Array, default: () => [] },
  highlight: { type: Object, default: () => ({}) },
  content: { type: Object, default: () => ({}) }
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
.section-content-4 {
  position: relative;
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

  .features-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .feature-card {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--surface-border);
    transition: all 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
      border-color: var(--accent);
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

  .highlight-block {
    color: var(--text-inverse);
    min-height: 100%;
    padding: 3rem 2rem;

    a.btn {
      background: var(--text-inverse);
      color: var(--accent);
      border: none;
      transition: all 0.25s ease;

      &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
      }
    }
  }

  @media (max-width: 992px) {
    .features-grid {
      grid-template-columns: 1fr 1fr;
    }
    .highlight-block {
      margin-top: 2rem;
    }
  }

  @media (max-width: 576px) {
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
