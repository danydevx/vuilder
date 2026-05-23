<!-- src/sections/terrazas/content/SectionContent16.vue -->
<template>
  <section
    :id="id"
    class="section section-content-16 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div
        class="row align-items-center g-5"
        :class="[{ 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- Cita -->
        <div
          class="col-lg-5"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="700"
        >
          <div class="quote-block pe-lg-4">
            <div class="quote-icon mb-3">
              <i class="bi bi-quote fs-1 text-accent"></i>
            </div>
            <p class="lead fw-semibold mb-4" style="font-size: 1.5rem">
              {{ content.quote }}
            </p>
            <div class="author">
              <div class="line mb-2"></div>
              <h6 class="fw-bold mb-1">{{ content.author }}</h6>
              <p class=" small mb-0">{{ content.role }}</p>
            </div>
          </div>
        </div>

        <!-- Carrusel del equipo -->
        <div
          class="col-lg-7 position-relative"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <div ref="swiperEl" class="swiper team-swiper">
            <div class="swiper-wrapper">
              <div
                v-for="(person, i) in content.team"
                :key="i"
                class="swiper-slide"
              >
                <article class="person-card text-center">
                  <div class="person-img mb-3">
                    <img
                      :src="person.image"
                      :alt="person.name"
                      class="rounded-4 w-100 h-100 object-fit-cover"
                      loading="lazy"
                    />
                  </div>
                  <h6 class="fw-bold mb-1">{{ person.name }}</h6>
                  <p class=" small mb-0">{{ person.role }}</p>
                </article>
              </div>
            </div>

            <!-- Flechas -->
            <button class="swiper-button-prev btn-nav">
              <i class="bi bi-arrow-left"></i>
            </button>
            <button class="swiper-button-next btn-nav">
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps({
  id: { type: String, default: 'section-content-16' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] }
})

const swiperEl = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const headerAlignClass = computed(() => ({
  'text-center mx-auto': props.align === 'center',
  'text-start me-auto': props.align === 'left',
  'text-end ms-auto': props.align === 'right'
}))
const justifyClass = computed(() => {
  const map = {
    start: 'justify-content-start',
    center: 'justify-content-center',
    end: 'justify-content-end',
    between: 'justify-content-between',
    around: 'justify-content-around'
  }
  return map[props.justify] || 'justify-content-center'
})

onMounted(async () => {
  await nextTick()
  if (!swiperEl.value) return

  new Swiper(swiperEl.value, {
    modules: [Navigation],
    slidesPerView: 1.2,
    spaceBetween: 16,
    loop: props.content.team?.length > 3,
    grabCursor: true,
    centeredSlides: false,
    breakpoints: {
      576: { slidesPerView: 1.5, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 24 },
      992: { slidesPerView: 2.5, spaceBetween: 28 },
      1200: { slidesPerView: 3, spaceBetween: 32 },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
})
</script>

<style lang="less" scoped>
.section-content-16 {
  position: relative;
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.06;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
  }

  /* Cita */
  .quote-block {
    .quote-icon {
      color: var(--accent);
    }

    .line {
      width: 60px;
      height: 2px;
      background: var(--accent);
    }

    p {
      color: var(--text);
    }
  }

  /* Carrusel */
  .team-swiper {
    position: relative;
    overflow: hidden;
    padding: 0 2rem; /* espacio interno para flechas */
    margin: 0 auto;

    :deep(.swiper-slide) {
      height: auto !important;
      display: flex;
      justify-content: center;
    }

    .person-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      border-radius: 1.25rem;
      overflow: hidden;
      transition: all 0.3s ease;
      max-width: 280px;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      }

      .person-img {
        height: 320px;
        overflow: hidden;
      }
    }

    /* Flechas */
    .btn-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--surface-border);
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

      &:hover {
        background: var(--accent);
        color: var(--text-inverse);
      }

      &.swiper-button-prev {
        left: 0;
      }
      &.swiper-button-next {
        right: 0;
      }
    }
  }

  @media (max-width: 991px) {
    .team-swiper {
      padding: 0 1rem;

      .btn-nav {
        width: 38px;
        height: 38px;
      }
    }

    .quote-block {
      text-align: center;

      .line {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
}
</style>
