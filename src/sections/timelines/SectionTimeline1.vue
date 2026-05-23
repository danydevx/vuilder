<template>
  <section
    :id="id"
    class="section section-timeline-scroll position-relative overflow-hidden"
    :class="schemeClass"
    ref="sectionRef"
  >
    <!-- Fondo -->
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

      <!-- Swiper Timeline -->
      <div ref="swiperEl" class="swiper timeline-swiper" data-aos="fade-up">
        <div class="swiper-wrapper">
          <div
            v-for="(event, i) in events"
            :key="i"
            class="swiper-slide d-flex flex-column align-items-center justify-content-start"
          >
            <div class="timeline-line position-relative mb-3">
              <span class="timeline-dot"></span>
            </div>

            <div class="timeline-card card border-0 shadow-sm rounded-4 overflow-hidden text-center">
              <div class="ratio ratio-16x9">
                <img
                  :src="event.image"
                  :alt="event.title"
                  class="w-100 h-100 object-fit-cover"
                  loading="lazy"
                />
              </div>
              <div class="card-body p-4">
                <div class="timeline-meta small  mb-1">
                  <i :class="event.icon || 'bi bi-clock'" class="me-1"></i>
                  {{ event.time }}
                </div>
                <h3 class="h5  mb-2">{{ event.title }}</h3>
                <p class="mb-0 ">{{ event.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Flechas -->
        <div v-if="showArrows" class="swiper-button-prev"></div>
        <div v-if="showArrows" class="swiper-button-next"></div>
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
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps({
  id: { type: String, default: 'section-timeline-scroll' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: true },
  autoplay: { type: Boolean, default: false },
  delay: { type: Number, default: 6000 },
  showArrows: { type: Boolean, default: true },
  ctas: { type: Array, default: () => [] },
  events: { type: Array, required: true },
})

const swiperEl = ref(null)
const sectionRef = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(async () => {
  await nextTick()

  const swiperConfig = {
    modules: [Navigation, Autoplay],
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: true,
    loop: props.events.length > 3,
    speed: 900,
    grabCursor: true,
    autoplay: props.autoplay
      ? { delay: props.delay, disableOnInteraction: false }
      : false,
    navigation: props.showArrows
      ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
      : false,
    breakpoints: {
      1600: { slidesPerView: 5 },
      1400: { slidesPerView: 4 },
      1200: { slidesPerView: 3 },
      992: { slidesPerView: 2 },
      768: { slidesPerView: 1.2 },
      0: { slidesPerView: 1 },
    },
    watchSlidesProgress: true,
    slideToClickedSlide: true,
  }

  new Swiper(swiperEl.value, swiperConfig)
})
</script>

<style lang="less" scoped>
.section-timeline-scroll {
  background: var(--surface);
  color: var(--text);

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
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.6)
    );
    z-index: 1;
  }

  .container-fluid {
    position: relative;
    z-index: 2;
  }

  .timeline-swiper {
    width: 100%;
    padding-bottom: 2rem;

    .swiper-slide {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      text-align: center;
      transition: transform 0.4s ease, opacity 0.4s ease;

      &.swiper-slide-active {
        transform: scale(1.05);
        opacity: 1;
      }

      &:not(.swiper-slide-active) {
        opacity: 0.75;
      }
    }
  }

  .timeline-line {
    position: relative;
    width: 100%;
    height: 2px;
    background: color-mix(in srgb, var(--accent) 50%, var(--text) 20%);
    margin-bottom: 1rem;

    .timeline-dot {
      position: absolute;
      top: -6px;
      left: 50%;
      width: 14px;
      height: 14px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 5px color-mix(in srgb, var(--accent) 20%, transparent 80%);
    }
  }

  .timeline-card {
    background: var(--surface-2);
    color: var(--text);
    border: 1px solid var(--surface-border);
    width: 320px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
    }

    .card-body {
      padding: 1.25rem;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: var(--text-inverse);
    background: rgba(0, 0, 0, 0.35);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    transition: background 0.3s ease;
    &::after {
      font-size: 1.2rem;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
