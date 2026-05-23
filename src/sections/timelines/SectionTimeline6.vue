<!-- src/sections/terrazas/timelines/SectionTimelineGallery.vue -->
<template>
  <section
    :id="id"
    class="section section-timeline-gallery position-relative overflow-hidden"
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
      <header class="text-center mb-4" data-aos="fade-up">
        <h2 class="display-6 ">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 700px">
          {{ subtitle }}
        </p>
      </header>

      <!-- Swiper principal -->
      <div ref="swiperMainEl" class="swiper mySwiper2 mb-3" data-aos="zoom-in">
        <div class="swiper-wrapper">
          <div
            v-for="(event, i) in events"
            :key="i"
            class="swiper-slide"
          >
            <div class="main-slide position-relative rounded-4 overflow-hidden shadow-lg">
              <img
                :src="event.image"
                :alt="event.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
              <div class="main-caption position-absolute bottom-0 start-0 w-100 text-start p-4">
                <div class="badge bg-accent text-white small mb-2 px-3 py-1">
                  <i v-if="event.icon" :class="event.icon" class="me-1"></i> {{ event.time }}
                </div>
                <h3 class="h5  text-white mb-1">{{ event.title }}</h3>
                <p class="small text-white-50 mb-0">{{ event.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>

      <!-- Swiper de miniaturas -->
      <div ref="swiperThumbsEl" class="swiper mySwiper" data-aos="fade-up">
        <div class="swiper-wrapper">
          <div
            v-for="(event, i) in events"
            :key="i"
            class="swiper-slide"
          >
            <div class="thumb-slide rounded-3 overflow-hidden shadow-sm">
              <img
                :src="event.thumb || event.image"
                :alt="event.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="ctas?.length" class="text-center mt-4" data-aos="fade-up">
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
import { Navigation, Thumbs, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

const props = defineProps({
  id: { type: String, default: 'section-timeline-gallery' },
  scheme: { type: String, default: 'default-dark' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: true },
  ctas: { type: Array, default: () => [] },
  events: {
    type: Array,
    default: () => [
      {
        time: 'Ceremonia',
        title: 'Ceremonia Religiosa',
        description: 'En la Parroquia de San José.',
        icon: 'bi bi-heart',
        image: 'https://swiperjs.com/demos/images/nature-1.jpg',
      },
      {
        time: 'Recepción',
        title: 'Brindis y Cena',
        description: 'Terraza Vista Aurora, con la mejor vista al atardecer.',
        icon: 'bi bi-cup-straw',
        image: 'https://swiperjs.com/demos/images/nature-2.jpg',
      },
      {
        time: 'Fiesta',
        title: 'Baile de los Novios',
        description: 'La pista se abre con el vals y continúa la fiesta.',
        icon: 'bi bi-stars',
        image: 'https://swiperjs.com/demos/images/nature-3.jpg',
      },
      {
        time: 'Despedida',
        title: 'Cierre del Evento',
        description: 'Gracias por acompañarnos en este día tan especial.',
        icon: 'bi bi-emoji-heart-eyes',
        image: 'https://swiperjs.com/demos/images/nature-4.jpg',
      },
    ],
  },
})

const swiperMainEl = ref(null)
const swiperThumbsEl = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(async () => {
  await nextTick()

  const thumbsSwiper = new Swiper(swiperThumbsEl.value, {
    modules: [FreeMode, Thumbs],
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      1200: { slidesPerView: 5 },
      768: { slidesPerView: 4 },
      0: { slidesPerView: 3 },
    },
  })

  new Swiper(swiperMainEl.value, {
    modules: [Navigation, Thumbs],
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
  })
})
</script>

<style lang="less" scoped>
.section-timeline-gallery {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.55);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
  }

  .swiper {
    width: 100%;
    border-radius: 1rem;
  }

  .mySwiper2 {
    height: 70vh;
    .swiper-slide {
      background: var(--surface-2);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;
      overflow: hidden;
    }

    img {
      object-fit: cover;
    }

    .main-caption {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
    }

    .badge.bg-accent {
      background: var(--accent);
    }
  }

  .mySwiper {
    height: 120px;
    padding: 10px 0;
    .swiper-slide {
      opacity: 0.5;
      transition: opacity 0.3s ease, transform 0.3s ease;

      &.swiper-slide-thumb-active {
        opacity: 1;
        transform: scale(1.05);
      }
    }

    .thumb-slide {
      width: 100%;
      height: 100%;
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: var(--text-inverse);
    background: rgba(0, 0, 0, 0.3);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    &::after {
      font-size: 1.2rem;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
