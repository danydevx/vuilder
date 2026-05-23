<template>
  <section
    :id="id"
    class="section section-hero-terrace-static position-relative overflow-hidden d-flex align-items-center"
    :class="['component-scheme-' + scheme, alignClass]"
  >
    <!-- Fondo -->
    <div
      v-if="params.background"
      class="hero-bg"
      :style="{ backgroundImage: `url('${params.background}')` }"
      aria-hidden="true"
    ></div>
    <div class="hero-overlay" aria-hidden="true"></div>

    <!-- Contenido -->
    <div class="container position-relative py-5">
      <div class="row align-items-center g-4 justify-content-center">
        <div class="col-12 col-md-8">
          <!-- Logo o Título -->
          <div data-aos="fade-up" data-aos-duration="700" class="mb-3">
            <img
              v-if="logo"
              :src="logo"
              alt="Logo de la terraza"
              class="hero-logo mb-3"
              loading="lazy"
            />
            <h1 v-else class="hero-title mb-2">
              <i v-if="icon" :class="icon" class="me-2"></i>{{ title }}
            </h1>
          </div>

          <!-- Subtítulo y descripción -->
          <p v-if="subtitle" class="hero-subtitle mb-3" data-aos="fade-up" data-aos-delay="100">
            {{ subtitle }}
          </p>
          <div
            v-if="body"
            class="hero-body mb-4"
            v-html="body"
            data-aos="fade-up"
            data-aos-delay="200"
          ></div>

          <!-- Servicios -->
          <div
            v-if="params.services && params.services.length"
            class="hero-services d-flex flex-wrap gap-3 mb-4"
            :class="servicesAlignClass"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div
              v-for="(service, i) in params.services.slice(0, 6)"
              :key="i"
              class="service-item d-flex align-items-center gap-2"
            >
              <i :class="service.icon" class="fs-5"></i>
              <span class="small">{{ service.label }}</span>
            </div>
          </div>

          <!-- CTAs -->
          <div
            class="hero-ctas d-flex flex-wrap gap-2"
            :class="ctasAlignClass"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <a
              v-for="(cta, i) in ctas"
              :key="i"
              :href="cta.href"
              class="btn button-rounded"
              :class="cta.variant === 'outline' ? 'btn-outline-secondary' : 'btn-scheme'"
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
  id: { type: String, default: 'section-hero-terrace-static' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  body: { type: String, default: '' },
  icon: { type: String, default: '' },
  logo: { type: String, default: '' },
  align: { type: String, default: 'center' }, // left | center | right
  ctas: {
    type: Array,
    default: () => ([
      { label: 'Ver paquetes', href: '#section-packages', variant: 'solid', icon: 'bi bi-bag' },
      { label: 'Ubicación', href: '#section-map', variant: 'outline', icon: 'bi bi-geo-alt' }
    ])
  },
  params: {
    type: Object,
    default: () => ({
      background: 'https://placehold.co/1600x900/jpg?text=Fondo+Terraza',
      services: [
        { icon: 'bi bi-car-front', label: 'Estacionamiento' },
        { icon: 'bi bi-wifi', label: 'Wi-Fi' },
        { icon: 'bi bi-cup-straw', label: 'Catering' },
        { icon: 'bi bi-music-note-beamed', label: 'DJ incluido' },
        { icon: 'bi bi-flower2', label: 'Decoración floral' },
        { icon: 'bi bi-sunset', label: 'Vista al atardecer' }
      ]
    })
  }
})

const alignClass = computed(() => `align-${props.align}`)
const servicesAlignClass = computed(() => ({
  'justify-content-start': props.align === 'left',
  'justify-content-center': props.align === 'center',
  'justify-content-end': props.align === 'right'
}))
const ctasAlignClass = computed(() => ({
  'justify-content-start': props.align === 'left',
  'justify-content-center': props.align === 'center',
  'justify-content-end': props.align === 'right'
}))
</script>

<style lang="less" scoped>
.section-hero-terrace-static {
  position: relative;
  min-height: 90vh;
  background: var(--surface);
  color: var(--text);
  display: flex;
  align-items: center;

  /* ===== Fondo ===== */
  .hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.82) saturate(1.05);
    transform: scale(1.05);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      color-mix(in oklab, var(--surface) 60%, transparent) 10%,
      color-mix(in oklab, var(--surface) 50%, transparent) 70%,
      var(--surface) 95%
    );
    pointer-events: none;
  }

  /* ===== Alineaciones ===== */
  &.align-left {
    text-align: left;
  }

  &.align-center {
    text-align: center;
  }

  &.align-right {
    text-align: right;
  }

  /* ===== Elementos ===== */
  .hero-logo {
    max-width: 200px;
    height: auto;
    object-fit: contain;
    background: color-mix(in oklab, var(--surface) 60%, transparent);
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    font-weight: 700;
    color: var(--heading-color);
    line-height: 1.2;
  }

  .hero-subtitle {
    color: var(--text-secondary);
    font-size: 1.05rem;
  }

  .hero-body {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .hero-services {
    .service-item {
      background: color-mix(in oklab, var(--surface-2) 80%, transparent);
      border-radius: 50rem;
      padding: 0.4rem 0.9rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      transition: all 0.25s ease;
      i {
        color: var(--accent);
        transition: color 0.2s ease;
      }
      span {
        color: var(--text);
        font-weight: 500;
      }
      &:hover {
        transform: translateY(-2px);
        background: color-mix(in oklab, var(--accent-muted) 80%, transparent);
      }
    }
  }

  .hero-ctas {
    .btn-outline-secondary {
      border-color: var(--surface-border);
      color: var(--text);
      &:hover {
        background-color: var(--accent-muted);
        border-color: var(--accent);
        transform: translateY(-1px);
      }
    }
  }

  /* ===== Responsive ===== */
  @media (max-width: 768px) {
    text-align: center !important;
    min-height: 80vh;
    .hero-ctas,
    .hero-services {
      justify-content: center !important;
    }
    .hero-logo {
      max-width: 160px;
    }
  }
}
</style>
