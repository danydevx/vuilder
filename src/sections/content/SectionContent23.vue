<!-- src/sections/terrazas/content/SectionContent23.vue -->
<template>
  <section
    :id="id"
    class="section section-content-23 position-relative overflow-hidden py-5"
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

    <!-- Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <!-- Encabezado -->
      <header
        v-if="title || subtitle || content.overline"
        class="section-header mb-5"
        :class="headerAlignClass"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-duration="700"
      >
        <p v-if="content.overline" class="text-uppercase small fw-semibold text-accent mb-2">
          {{ content.overline }}
        </p>
        <h2 class="fw-bold display-6 mb-3">
          <span v-html="title"></span>
        </h2>
        <p v-if="subtitle" class=" lead mx-auto" style="max-width: 48rem">
          {{ subtitle }}
        </p>
      </header>

      <!-- Lista de servicios -->
      <div class="services-list">
        <div
          v-for="(item, i) in content.services"
          :key="i"
          class="service-item d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between border-top py-4"
          :data-aos="animate ? 'fade-up' : null"
          :data-aos-delay="i * 100"
        >
          <!-- Número y título -->
          <div class="d-flex align-items-center gap-3">
            <div class="service-number fw-semibold opacity-75">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
            <div>
              <h5 class="fw-bold mb-1">{{ item.title }}</h5>
              <p class=" small mb-0">{{ item.subtitle }}</p>
            </div>
          </div>

          <!-- Descripción -->
          <div class="service-text  small mt-3 mt-md-0">
            {{ item.text }}
          </div>

          <!-- Flecha -->
          <a
            v-if="item.href"
            :href="item.href"
            class="btn-arrow ms-md-3 mt-3 mt-md-0"
            aria-label="Ver más"
          >
            <i class="bi bi-arrow-up-right"></i>
          </a>
        </div>
        <div class="border-top"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-23' },
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
  content: { type: Object, default: () => ({ services: [] }) },
  ctas: { type: Array, default: () => [] }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const headerAlignClass = computed(() => {
  switch (props.align) {
    case 'center':
      return 'text-center mx-auto'
    case 'right':
      return 'text-end ms-auto'
    default:
      return 'text-start me-auto'
  }
})
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
.section-content-23 {
  position: relative;
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.08;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
  }

  /* Encabezado */
  .section-header {
    h2 {
      color: var(--heading-color);
      font-weight: 800;
      line-height: 1.1;
    }

    span mark {
      background: var(--accent);
      color: var(--text-inverse);
      padding: 0 0.3em;
      border-radius: 0.25em;
    }

    p {
      color: var(--);
    }
  }

  /* Lista de servicios */
  .services-list {
    border-bottom: 1px solid var(--surface-border);

    .service-item {
      transition: background 0.3s ease;

      &:hover {
        background: color-mix(in srgb, var(--accent) 6%, transparent);
      }

      h5 {
        color: var(--heading-color);
      }

      p,
      .service-text {
        color: var(--);
      }

      .service-number {
        font-size: 1.1rem;
        color: var(--);
        width: 2rem;
      }

      .btn-arrow {
        color: var(--text);
        border: 1px solid var(--surface-border);
        border-radius: 50%;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &:hover {
          background: var(--accent);
          color: var(--text-inverse);
          border-color: var(--accent);
          transform: translateY(-2px);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .service-item {
      flex-direction: column !important;
      text-align: center;

      .btn-arrow {
        margin-inline: auto;
      }
    }
  }
}
</style>
