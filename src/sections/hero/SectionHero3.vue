<template>
  <section
    :id="id"
    class="section section-hero-terrace-slideshow position-relative overflow-hidden d-flex align-items-center justify-content-center text-center"
    :class="['component-scheme-' + scheme]"
  >
    <!-- Fondo con Swiper -->
    <div ref="swiperEl" class="hero-bg-swiper swiper" aria-hidden="true">
      <div class="swiper-wrapper">
        <div v-for="(bg, i) in params.backgrounds" :key="i" class="swiper-slide">
          <div class="hero-bg-slide" :style="{ backgroundImage: `url('${bg.image}')` }"></div>
        </div>
      </div>
    </div>
    <div class="hero-overlay" aria-hidden="true"></div>

    <!-- Contenido principal -->
    <div class="container position-relative z-1 py-5">
      <div class="inner mx-auto" style="max-width: 720px">
        <!-- Logo o título -->
        <div class="mb-3" data-aos="zoom-in" data-aos-duration="700">
          <img
            v-if="logo"
            :src="logo"
            alt="Logo de la terraza"
            class="hero-logo mb-3"
            loading="lazy"
          />
          <h1 v-else class="hero-title mb-3">
            <i v-if="icon" :class="icon" class="me-2"></i>{{ title }}
          </h1>
        </div>

        <!-- Subtítulo y cuerpo -->
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
          class="hero-services d-flex flex-wrap justify-content-center gap-4 mb-4"
          data-aos="zoom-in-up"
          data-aos-delay="300"
        >
          <div
            v-for="(service, i) in params.services.slice(0, 10)"
            :key="i"
            class="service-item d-flex flex-column align-items-center"
          >
            <div class="icon-wrap mb-2">
              <i :class="service.icon" class="fs-4"></i>
            </div>
            <span class="small fw-medium">{{ service.label }}</span>
          </div>
        </div>

        <!-- CTAs -->
        <div class="hero-ctas d-flex flex-wrap gap-2 justify-content-center" data-aos="fade-up" data-aos-delay="400">
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
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const props = defineProps({
  id: { type: String, default: 'section-hero-terrace-slideshow' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  body: { type: String, default: '' },
  icon: { type: String, default: '' },
  logo: { type: String, default: '' },
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
      backgrounds: [
        { image: 'https://placehold.co/1600x900/jpg?text=Terraza+1' },
        { image: 'https://placehold.co/1600x900/jpg?text=Terraza+2' },
        { image: 'https://placehold.co/1600x900/jpg?text=Terraza+3' }
      ],
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

const swiperEl = ref(null)

onMounted(() => {
  new Swiper(swiperEl.value, {
    modules: [Autoplay, EffectFade],
    effect: 'fade',
    loop: true,
    speed: 1400,
    autoplay: { delay: 5200, disableOnInteraction: false }
  })
})
</script>

<style lang="less" scoped>
.section-hero-terrace-slideshow {
  position: relative;
  min-height: 100vh;
  background: var(--surface);
  color: var(--text);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  .hero-bg-swiper {
    position: absolute;
    inset: 0;
    .hero-bg-slide {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transition: opacity 1s ease;
      filter: brightness(0.8) saturate(1.05);
    }
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      color-mix(in oklab, var(--surface) 55%, transparent) 5%,
      color-mix(in oklab, var(--surface) 40%, transparent) 60%,
      var(--surface) 92%
    );
    pointer-events: none;
  }

  .hero-logo {
    max-width: 220px;
    background: color-mix(in oklab, var(--surface) 70%, transparent);
    border-radius: 1rem;
    padding: 0.6rem 1rem;
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.15);
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 700;
    color: var(--heading-color);
  }

  .hero-subtitle {
    color: var(--text-secondary);
    font-size: 1.1rem;
  }

  .hero-body {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .hero-services {
    .service-item {
      width: 5rem;
      .icon-wrap {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        background: color-mix(in oklab, var(--surface-2) 80%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        transition: all 0.25s ease;
      }
      i {
        color: var(--accent);
      }
      span {
        color: var(--text);
      }
      &:hover .icon-wrap {
        background: color-mix(in oklab, var(--accent-muted) 80%, transparent);
        transform: translateY(-2px);
      }
    }
  }

  .hero-ctas {
    .btn {
      border-radius: 999px;
      padding: 0.65rem 1.4rem;
      font-size: 0.95rem;
    }
  }

  @media (max-width: 768px) {
    min-height: 90vh;
    .hero-logo {
      max-width: 160px;
    }
  }
}
</style>
