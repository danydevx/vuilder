<template>
  <section
    :id="id"
    class="section section-hero-terrace position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- Swiper de fondos -->
    <div class="hero-bg-swiper">
      <div ref="swiperEl" class="swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(bg, i) in params.backgrounds"
            :key="i"
            class="swiper-slide"
          >
            <div
              class="hero-bg-slide"
              :style="{ backgroundImage: `url('${bg.image}')` }"
            ></div>
          </div>
        </div>
      </div>
      <div class="hero-bg-overlay"></div>
    </div>

    <!-- Contenido principal -->
    <div class="container position-relative z-1">
      <div class="row align-items-end min-vh-100 py-5 gy-4">
        <!-- Texto -->
        <div
          class="col-12 col-md-7"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <h1 class="hero-title mb-3">
            <i v-if="icon" :class="icon" class="me-2"></i>
            {{ title }}
          </h1>

          <h4
            v-if="subtitle"
            class="hero-subtitle fw-normal  mb-3"
          >
            {{ subtitle }}
          </h4>

          <div
            v-if="body"
            class="hero-body  pe-lg-5"
            v-html="body"
          ></div>
        </div>

        <!-- Botones -->
        <div
          class="col-12 col-md-5 text-md-end"
          data-aos="zoom-in"
          data-aos-duration="700"
        >
          <div
            class="hero-ctas d-flex flex-wrap justify-content-md-end justify-content-center gap-2 mt-3"
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
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const props = defineProps({
  id: { type: String, default: 'section-hero-terrace' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  body: { type: String, default: '' },
  icon: { type: String, default: '' },
  ctas: {
    type: Array,
    default: () => ([
      { label: 'Ver paquetes', href: '#section-packages', variant: 'solid', icon: 'bi bi-bag' },
      { label: 'Galería', href: '#section-gallery', variant: 'outline', icon: 'bi bi-images' }
    ])
  },
  params: {
    type: Object,
    default: () => ({
      backgrounds: [
        { image: 'https://placehold.co/1200x1600/jpg?text=Terraza+1', title: 'Vista principal' },
        { image: 'https://placehold.co/1200x1600/jpg?text=Terraza+2', title: 'Evento de noche' },
        { image: 'https://placehold.co/1200x1600/jpg?text=Terraza+3', title: 'Montaje elegante' }
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
    autoplay: { delay: 5000, disableOnInteraction: false },
    speed: 1200
  })
})
</script>

<style lang="less" scoped>
.section-hero-terrace {
  position: relative;
  min-height: 100vh;
  background: var(--surface);
  color: var(--text);

  /* Fondo Swiper */
  .hero-bg-swiper {
    position: absolute;
    inset: 0;

    .swiper {
      width: 100%;
      height: 100%;
    }

    .hero-bg-slide {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      filter: brightness(0.85) saturate(1.05);
      transition: opacity 1.2s ease;
    }

    .hero-bg-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        color-mix(in oklab, var(--surface) 50%, transparent) 5%,
        transparent 70%
      );
      pointer-events: none;
    }
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: clamp(1.8rem, 5vw, 2.8rem);
    color: var(--heading-color);
    line-height: 1.2;
  }

  .hero-subtitle {
    color: var(--text-secondary);
    font-size: 1.05rem;
    max-width: 520px;
  }

  .hero-body {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .hero-ctas {
    .btn-outline-secondary {
      border-color: var(--surface-border);
      color: var(--text);
      transition: all 0.25s ease;
      &:hover {
        background-color: var(--accent-muted);
        border-color: var(--accent);
        transform: translateY(-1px);
      }
    }
  }

  @media (max-width: 768px) {
    .row {
      text-align: center;

      .hero-title {
        font-size: clamp(1.6rem, 6vw, 2.4rem);
      }

      .hero-subtitle {
        margin-left: auto;
        margin-right: auto;
      }

      .hero-ctas {
        justify-content: center;
        margin-top: 1.5rem;
      }
    }
  }
}
</style>
