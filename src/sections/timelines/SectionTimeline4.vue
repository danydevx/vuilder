<!-- src/sections/terrazas/timelines/SectionTimelineVertical.vue -->
<template>
  <section
    :id="id"
    class="section section-timeline-vertical position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div v-if="backgroundImg" class="bg-media" :style="{ backgroundImage: `url('${backgroundImg}')` }" />
    <div v-if="enableOverlay" class="bg-overlay" />

    <div ref="swiperEl" class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div
          v-for="(event, i) in events"
          :key="i"
          class="swiper-slide d-flex flex-column align-items-center justify-content-center text-center"
        >
          <div class="timeline-content" data-aos="fade-up" :data-aos-delay="i * 100">
            <div v-if="event.image" class="timeline-image ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm mb-4">
              <img
                :src="event.image"
                :alt="event.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </div>

            <div class="timeline-meta small text-accent mb-2">
              <i v-if="event.icon" :class="event.icon" class="me-1"></i>
              {{ event.time }}
            </div>

            <h2 class="h4  mb-2">{{ event.title }}</h2>
            <p class=" mb-0" style="max-width: 600px">{{ event.description }}</p>
          </div>
        </div>
      </div>

      <!-- Paginación -->
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps({
  id: { type: String, default: 'section-timeline-vertical' },
  scheme: { type: String, default: 'default-dark' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: true },
  events: {
    type: Array,
    default: () => [
      {
        time: '3:00 PM',
        title: 'Ceremonia Religiosa',
        description: 'En la Parroquia de San José. Favor de llegar con 15 minutos de anticipación.',
        icon: 'bi bi-heart',
        image: 'https://placehold.co/800x600/jpg?text=Ceremonia',
      },
      {
        time: '5:00 PM',
        title: 'Recepción en Terraza Aurora',
        description: 'Brindis, cena y baile con música en vivo.',
        icon: 'bi bi-music-note-beamed',
        image: 'https://placehold.co/800x600/jpg?text=Recepcion',
      },
      {
        time: '8:00 PM',
        title: 'Baile de los novios',
        description: 'La pista se abre con el vals y continúa la fiesta.',
        icon: 'bi bi-stars',
        image: 'https://placehold.co/800x600/jpg?text=Baile',
      },
    ],
  },
})

const swiperEl = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(async () => {
  await nextTick()

  new Swiper(swiperEl.value, {
    modules: [Pagination],
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })
})
</script>

<style lang="less" scoped>
.section-timeline-vertical {
  height: 100vh;
  background: var(--surface);
  color: var(--text);
  position: relative;

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.5);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6));
    z-index: 1;
  }

  .swiper {
    position: relative;
    height: 100%;
    z-index: 2;

    .swiper-wrapper {
      height: 100%;
    }

    .swiper-slide {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 3rem 1rem;
      transition: all 0.5s ease;
      text-align: center;
    }
  }

  .timeline-content {
    max-width: 800px;
    margin: 0 auto;
    color: var(--text);

    h2 {
      font-family: var(--font-heading);
      color: var(--text);
    }

    .text-accent {
      color: var(--accent);
    }
  }

  .swiper-pagination {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;

    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background: var(--surface-border);
      opacity: 0.6;
      transition: all 0.3s ease;
    }

    .swiper-pagination-bullet-active {
      background: var(--accent);
      opacity: 1;
      transform: scale(1.3);
    }
  }
}
</style>
