<!-- src/sections/terrazas/timelines/SectionTimelineCardsStack.vue -->
<template>
  <section
    :id="id"
    class="section section-timeline-cards-stack position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    ></div>
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <div class="container position-relative py-5">
      <!-- Header -->
      <header class="text-center mb-5" data-aos="fade-up">
        <h2 class="display-6 ">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 600px">
          {{ subtitle }}
        </p>
      </header>

      <!-- Swiper con efecto Cards -->
      <div ref="swiperEl" class="swiper mySwiper" data-aos="zoom-in">
        <div class="swiper-wrapper">
          <div
            v-for="(event, i) in events"
            :key="i"
            class="swiper-slide d-flex flex-column align-items-center justify-content-center text-center p-4"
          >
            <div class="card border-0 shadow-lg w-100 h-100 rounded-4 overflow-hidden">
              <div v-if="event.image" class="ratio ratio-4x3">
                <img
                  :src="event.image"
                  :alt="event.title"
                  class="w-100 h-100 object-fit-cover"
                  loading="lazy"
                />
              </div>
              <div class="card-body">
                <div class="small text-accent fw-semibold mb-2">
                  <i v-if="event.icon" :class="event.icon" class="me-1"></i>
                  {{ event.time }}
                </div>
                <h3 class="h5  mb-2">{{ event.title }}</h3>
                <p class=" small mb-0">{{ event.description }}</p>
              </div>
            </div>
          </div>
        </div>
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
import { EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'

const props = defineProps({
  id: { type: String, default: 'section-timeline-cards-stack' },
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
        image: 'https://placehold.co/800x600/jpg?text=2015',
      },
      {
        time: '2017',
        title: 'Primer viaje juntos',
        description: 'Descubrimos lo bonito de compartir aventuras.',
        icon: 'bi bi-globe-americas',
        image: 'https://placehold.co/800x600/jpg?text=2017',
      },
      {
        time: '2020',
        title: 'Compromiso',
        description: 'El momento más esperado.',
        icon: 'bi bi-ring',
        image: 'https://placehold.co/800x600/jpg?text=2020',
      },
    ],
  },
})

const swiperEl = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(async () => {
  await nextTick()
  new Swiper(swiperEl.value, {
    modules: [EffectCards],
    effect: 'cards',
    grabCursor: true,
  })
})
</script>

<style lang="less" scoped>
.section-timeline-cards-stack {
  background: var(--surface);
  color: var(--text);
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.65);
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

  .container {
    position: relative;
    z-index: 2;
  }

  .swiper {
    width: 260px;
    height: 360px;
    margin: 0 auto;
    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      overflow: hidden;
      transition: transform 0.4s ease;
    }
  }

  .card {
    background: var(--surface-2);
    color: var(--text);
    border: 1px solid var(--surface-border);
  }

  .text-accent {
    color: var(--accent);
  }
}
</style>
