<template>
  <section
    :id="id"
    class="section section-hero-video-bg position-relative overflow-hidden d-flex align-items-center"
    :class="['component-scheme-' + scheme, alignClass]"
  >
    <!-- Video de fondo -->
    <video
      v-if="videoSrc"
      ref="videoEl"
      class="hero-video position-absolute w-100 h-100 fade-in"
      :poster="poster"
      autoplay
      playsinline
      :muted="muted"
      :loop="loop"
      preload="auto"
    >
      <source :src="videoSrc" type="video/mp4" />
      Tu navegador no soporta video HTML5.
    </video>

    <!-- Overlay -->
    <div class="hero-overlay" aria-hidden="true"></div>

    <!-- Contenido -->
    <div class="container position-relative z-1 py-5">
      <div class="inner mx-auto" style="max-width: 720px">
        <h1
          class="hero-title  mb-3"
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

        <!-- CTAs -->
        <div
          v-if="ctas && ctas.length"
          class="hero-ctas d-flex flex-wrap gap-2 mt-3"
          :class="ctasAlignClass"
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
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-hero-video-bg' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  videoSrc: { type: String, required: true },
  poster: { type: String, default: '' },
  muted: { type: Boolean, default: true },
  loop: { type: Boolean, default: true },
  align: { type: String, default: 'center' }, // left | center | right
  ctas: {
    type: Array,
    default: () => [
      { label: 'Ver paquetes', href: '#section-packages', variant: 'solid', icon: 'bi bi-bag' },
      { label: 'Ubicación', href: '#section-map', variant: 'outline', icon: 'bi bi-geo-alt' }
    ]
  }
})

const videoEl = ref(null)
const alignClass = computed(() => `align-${props.align}`)
const ctasAlignClass = computed(() => ({
  'justify-content-start': props.align === 'left',
  'justify-content-center': props.align === 'center',
  'justify-content-end': props.align === 'right'
}))

onMounted(() => {
  const video = videoEl.value
  if (video && props.muted) {
    video.play().catch(() => console.warn('Autoplay bloqueado — interacción requerida.'))
  }
})
</script>

<style lang="less" scoped>
.section-hero-video-bg {
  position: relative;
  min-height: 100vh;
  background: var(--surface);
  color: var(--text);
  overflow: hidden;
  display: flex;
  align-items: center;

  /* ===== VIDEO ===== */
  .hero-video {
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 0;
    filter: brightness(0.85) saturate(1.1);
  }

  .fade-in {
    opacity: 0;
    animation: fadeInVideo 1.5s ease forwards;
  }

  @keyframes fadeInVideo {
    to {
      opacity: 1;
    }
  }

  /* ===== OVERLAY ===== */
  .hero-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      to bottom,
      color-mix(in oklab, var(--surface) 65%, transparent) 5%,
      rgba(0, 0, 0, 0.35) 50%,
      color-mix(in oklab, var(--surface) 55%, transparent) 95%
    );
  }

  /* ===== TEXTO ===== */
  .hero-title {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 6vw, 3.2rem);
    color: var(--text-inverse);
    text-shadow: 0 3px 12px rgba(0, 0, 0, 0.45);
    line-height: 1.2;
  }

  .hero-subtitle {
    color: var(--text-inverse);
    opacity: 0.9;
    font-size: 1.1rem;
    max-width: 580px;
    margin-inline: auto;
  }

  /* ===== CTA ===== */
  .hero-ctas {
    margin-top: 1rem;

    .btn {
      border-radius: 999px;
      padding: 0.6rem 1.4rem;
      transition: all 0.25s ease;
      &:hover {
        transform: translateY(-2px);
      }
    }
  }

  /* ===== ALINEACIÓN ===== */
  &.align-left {
    text-align: left;
    .hero-ctas {
      justify-content: flex-start;
    }
  }
  &.align-center {
    text-align: center;
    .hero-ctas {
      justify-content: center;
    }
  }
  &.align-right {
    text-align: right;
    .hero-ctas {
      justify-content: flex-end;
    }
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    min-height: 80vh;
    text-align: center !important;

    .hero-title {
      font-size: 1.9rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .hero-ctas {
      justify-content: center !important;
    }
  }
}
</style>

<!--
<SectionHeroVideoBg
  id="section-hero-video-bg"
  scheme="default-light"
  align="center"
  title="Vive la Experiencia Terraza Coral"
  subtitle="Un escenario impresionante con vistas inigualables"
  video-src="https://cdn.coverr.co/videos/coverr-terrace-party-sunset-1080p.mp4"
  poster="https://placehold.co/1600x900/jpg?text=Terraza+Coral"
  :ctas="[
    { label: 'Explorar paquetes', href: '#section-packages', variant: 'solid', icon: 'bi bi-bag' },
    { label: 'Reservar ahora', href: '#section-rsvp', variant: 'outline', icon: 'bi bi-calendar-heart' }
  ]"
/>
-->
