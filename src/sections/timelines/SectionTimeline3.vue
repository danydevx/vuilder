<!-- src/sections/terrazas/timelines/SectionTimelineScrollBar.vue -->
<template>
  <section
    :id="id"
    class="section section-timeline-scrollbar position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- Fondo opcional -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    ></div>
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <div class="container-fluid position-relative py-5">
      <!-- Encabezado -->
      <header class="text-center mb-5" data-aos="fade-up">
        <h2 class="display-6 ">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 700px">
          {{ subtitle }}
        </p>
      </header>

      <!-- Timeline Swiper -->
      <div ref="swiperEl" class="swiper mySwiper" data-aos="fade-up">
        <div class="swiper-wrapper">
          <div
            v-for="(event, i) in events"
            :key="i"
            class="swiper-slide d-flex flex-column align-items-center justify-content-start text-center"
          >
            <!-- Fecha / hora -->
            <span class="timeline-time small fw-semibold text-accent mb-2">
              <i v-if="event.icon" :class="event.icon" class="me-1"></i>
              {{ event.time }}
            </span>

            <!-- Imagen -->
            <div v-if="event.image" class="timeline-image ratio ratio-1x1 rounded-circle overflow-hidden shadow-sm mb-3">
              <img
                :src="event.image"
                :alt="event.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </div>

            <!-- Contenido -->
            <h3 class="h6  mb-1">{{ event.title }}</h3>
            <p class=" small mb-0">{{ event.description }}</p>
          </div>
        </div>

        <!-- Scrollbar -->
        <div class="swiper-scrollbar"></div>
      </div>

      <!-- CTA -->
      <div v-if="ctas?.length" class="text-center mt-5" data-aos="fade-up">
        <a
          v-for="(cta, i) in ctas"
          :key="i"
          :href="cta.href"
          class="btn me-2 mb-2"
          :class="[
            cta.variant === 'solid'
              ? 'btn-scheme'
              : cta.variant === 'outline'
              ? 'btn-outline'
              : 'btn-ghost',
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
import { ref, onMounted, computed, nextTick } from 'vue'
import Swiper from 'swiper'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'

const props = defineProps({
  id: { type: String, default: 'section-timeline-scrollbar' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: true },
  ctas: { type: Array, default: () => [] },
  events: {
    type: Array,
    default: () => [
      {
        time: '2015',
        title: 'Nos conocimos',
        description: 'El inicio de una hermosa historia.',
        icon: 'bi bi-heart',
        image: 'https://placehold.co/300x300/jpg?text=2015',
      },
      {
        time: '2017',
        title: 'Nuestro primer viaje',
        description: 'Descubriendo nuevos lugares juntos.',
        icon: 'bi bi-globe-americas',
        image: 'https://placehold.co/300x300/jpg?text=2017',
      },
    ],
  },
})

const swiperEl = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(async () => {
  await nextTick()
  new Swiper(swiperEl.value, {
    modules: [Scrollbar],
    slidesPerView: 3,
    spaceBetween: 24,
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
    },
    breakpoints: {
      1600: { slidesPerView: 5 },
      1200: { slidesPerView: 4 },
      992: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1.2 },
    },
  })
})
</script>

<style lang="less" scoped>
.section-timeline-scrollbar {
  background: var(--surface);
  color: var(--text);
  overflow: hidden;

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.6);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.6)
    );
    z-index: 1;
  }

  .container-fluid {
    position: relative;
    z-index: 2;
  }

  .swiper {
    width: 100%;
    padding-bottom: 3rem;

    .swiper-slide {
      background: var(--surface-2);
      border: 1px solid var(--surface-border);
      border-radius: 1rem;
      padding: 1.5rem 1rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: grab;
      max-width: 280px;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
      }
    }

    .timeline-image img {
      border-radius: 50%;
    }
  }

  .swiper-scrollbar {
    height: 6px;
    background: var(--surface-muted);
    border-radius: 3px;

    .swiper-scrollbar-drag {
      background: var(--accent);
      border-radius: 3px;
      transition: background 0.3s ease;
    }
  }

  .text-accent {
    color: var(--accent);
  }
}
</style>
