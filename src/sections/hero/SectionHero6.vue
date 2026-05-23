<template>
  <section
    :id="id"
    class="section section-hero-terrace-video-banner position-relative overflow-hidden d-flex align-items-center justify-content-center text-center"
    :class="['component-scheme-' + scheme]"
  >
    <!-- Fondo animado -->
    <div class="hero-bg-slides position-absolute inset-0" aria-hidden="true">
      <transition-group name="fade" tag="div">
        <div
          v-for="(img, i) in backgroundImages"
          :key="i"
          v-show="currentBg === i"
          class="hero-bg-slide"
          :style="{ backgroundImage: `url('${img}')` }"
        ></div>
      </transition-group>
    </div>

    <!-- Overlay -->
    <div class="hero-overlay" aria-hidden="true"></div>

    <!-- Contenido principal -->
    <div class="container position-relative z-1 py-5">
      <div class="inner mx-auto" style="max-width: 720px">
        <!-- Video -->
        <div
          v-if="videoSrc"
          class="hero-video-wrapper mx-auto mb-4"
          data-aos="zoom-in"
          data-aos-duration="800"
        >
          <video
            :src="videoSrc"
            autoplay
            muted
            loop
            playsinline
            class="hero-video rounded-4 shadow-glow"
          ></video>
        </div>

        <!-- Texto -->
        <h1
          class="hero-title  mb-2"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="hero-subtitle mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {{ subtitle }}
        </p>

        <!-- CTA -->
        <div
          v-if="ctas && ctas.length"
          class="hero-ctas d-flex flex-wrap justify-content-center gap-2"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <a
            v-for="(cta, i) in ctas.slice(0, 3)"
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-hero-terrace-video-banner' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  videoSrc: { type: String, default: '' },
  ctas: {
    type: Array,
    default: () => [
      { label: 'Ver paquetes', href: '#section-packages', variant: 'solid', icon: 'bi bi-bag' }
    ]
  },
  backgroundImages: {
    type: Array,
    default: () => [
      'https://placehold.co/1600x900/jpg?text=Fondo+1',
      'https://placehold.co/1600x900/jpg?text=Fondo+2',
      'https://placehold.co/1600x900/jpg?text=Fondo+3'
    ]
  },
  interval: { type: Number, default: 4000 }
})

const currentBg = ref(0)
let timer = null

onMounted(() => {
  if (props.backgroundImages.length > 1) {
    timer = setInterval(() => {
      currentBg.value = (currentBg.value + 1) % props.backgroundImages.length
    }, props.interval)
  }
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<style lang="less" scoped>
.section-hero-terrace-video-banner {
  position: relative;
  min-height: 100vh;
  background: var(--surface);
  color: var(--text);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  /* ===== FONDO ===== */
  .hero-bg-slides {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-bg-slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.8) saturate(1.1);
    opacity: 0;
    transform: scale(1.05);
    transition: opacity 1.4s ease, transform 10s ease;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      color-mix(in oklab, var(--surface) 65%, transparent) 5%,
      transparent 60%,
      color-mix(in oklab, var(--surface) 55%, transparent) 100%
    );
    pointer-events: none;
  }

  /* ===== VIDEO ===== */
  .hero-video-wrapper {
    max-width: 560px;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 1rem;
  }

  .hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .shadow-glow {
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3),
      0 0 24px color-mix(in oklab, var(--accent) 40%, transparent);
  }

  /* ===== TEXTO ===== */
  .hero-title {
    font-family: var(--font-heading);
    color: var(--heading-color);
    font-size: clamp(2rem, 6vw, 3rem);
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    color: var(--muted);
  }

  /* ===== CTA ===== */
  .hero-ctas {
    margin-top: 1rem;
    .btn {
      border-radius: 999px;
      padding: 0.6rem 1.4rem;
      transition: transform 0.25s ease;
      &:hover {
        transform: translateY(-2px);
      }
    }
  }

  @media (max-width: 768px) {
    min-height: 80vh;

    .hero-video-wrapper {
      max-width: 95%;
    }

    .hero-title {
      font-size: 1.9rem;
    }
  }
}
</style>
