<template>
  <section
    :id="id"
    class="section section-hero-swiper position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- Swiper principal -->
    <div ref="swiperEl" class="swiper hero-swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="swiper-slide position-relative"
        >
          <!-- Imagen -->
          <div
            class="hero-slide-bg"
            :style="{ backgroundImage: `url('${slide.image}')` }"
          ></div>

          <!-- Overlay -->
          <div class="hero-slide-overlay"></div>

          <!-- Contenido -->
          <div
            class="hero-slide-content text-center text-white d-flex flex-column justify-content-center align-items-center"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h2 class="slide-text  mb-2">{{ slide.text }}</h2>
            <p v-if="slide.subtext" class="slide-subtext small mb-3">{{ slide.subtext }}</p>

            <!-- CTAs -->
            <div
              v-if="slide.ctas && slide.ctas.length"
              class="slide-ctas d-flex flex-wrap gap-2 justify-content-center mt-3"
            >
              <a
                v-for="(cta, j) in slide.ctas.slice(0, 4)"
                :key="j"
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

      <!-- Dots -->
      <div v-if="showDots" class="swiper-pagination"></div>

      <!-- Flechas -->
      <div v-if="showArrows" class="swiper-button-prev"></div>
      <div v-if="showArrows" class="swiper-button-next"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const props = defineProps({
  id: { type: String, default: 'section-hero-swiper' },
  scheme: { type: String, default: 'default-light' },
  slides: { type: Array, required: true },
  autoplay: { type: Boolean, default: true },
  delay: { type: Number, default: 5000 },
  effect: { type: String, default: 'fade' },
  showDots: { type: Boolean, default: true },
  showArrows: { type: Boolean, default: true }
})

const swiperEl = ref(null)

onMounted(() => {
  new Swiper(swiperEl.value, {
    modules: [Autoplay, EffectFade, Pagination, Navigation],
    loop: props.slides.length > 1,
    effect: props.effect,
    autoplay: props.autoplay
      ? { delay: props.delay, disableOnInteraction: false }
      : false,
    speed: 1200,
    pagination: props.showDots
      ? { el: '.swiper-pagination', clickable: true }
      : false,
    navigation: props.showArrows
      ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
      : false
  })
})
</script>

<style lang="less" scoped>
.section-hero-swiper {
  position: relative;
  min-height: 100vh;
  background: var(--surface);
  color: var(--text);

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    position: relative;
    height: 100vh;
  }

  /* ===== Imagen ===== */
  .hero-slide-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.85) saturate(1.1);
    transform: scale(1.05);
    transition: transform 10s ease-in-out;
  }

  /* ===== Overlay ===== */
  .hero-slide-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      color-mix(in oklab, var(--surface) 50%, transparent) 10%,
      transparent 60%,
      color-mix(in oklab, var(--surface) 60%, transparent) 100%
    );
    pointer-events: none;
  }

  /* ===== Contenido ===== */
  .hero-slide-content {
    position: relative;
    z-index: 2;
    min-height: 100vh;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
    padding: 0 1rem;

    .slide-text {
      font-family: var(--font-heading);
      font-size: clamp(1.8rem, 6vw, 3rem);
      color: var(--text-inverse);
      line-height: 1.2;
    }

    .slide-subtext {
      color: var(--text-inverse);
      opacity: 0.9;
      font-size: 0.95rem;
    }

    .slide-ctas {
      margin-top: 1rem;
      .btn {
        border-radius: 999px;
        padding: 0.6rem 1.2rem;
      }
    }
  }

  /* ===== Dots ===== */
  .swiper-pagination {
    bottom: 1.5rem !important;
    .swiper-pagination-bullet {
      background: var(--accent-muted);
      opacity: 0.7;
      transition: all 0.3s ease;
      &-active {
        background: var(--accent);
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }

  /* ===== Flechas ===== */
  .swiper-button-prev,
  .swiper-button-next {
    top: 50%;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: color-mix(in oklab, var(--surface-overlay, rgba(0, 0, 0, 0.12)), var(--accent) 5%);
    color: var(--accent);
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

    &::after {
      font-size: 1.1rem;
      font-weight: bold;
    }

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      transform: translateY(-50%) scale(1.05);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
    }
  }

  .swiper-button-prev {
    left: 1rem;
  }
  .swiper-button-next {
    right: 1rem;
  }

  @media (max-width: 768px) {
    .hero-slide-content {
      .slide-text {
        font-size: 1.8rem !important;
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
      display: none;
    }
  }
}
</style>
