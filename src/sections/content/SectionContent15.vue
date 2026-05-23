<!-- src/sections/terrazas/content/SectionContent15.vue -->
<template>
  <section
    :id="id"
    class="section section-content-15 position-relative overflow-hidden py-5"
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
      <!-- Header -->
      <header
        v-if="title || subtitle || content.overline"
        :class="[headerAlignClass, 'section-header mb-5']"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-duration="700"
      >
        <p
          v-if="content.overline"
          class="text-uppercase small fw-semibold text-accent mb-2"
        >
          {{ content.overline }}
        </p>
        <h2 class="fw-bold display-6 mb-3">{{ title }}</h2>
        <p
          v-if="subtitle"
          class=""
          :class="{
            'mx-auto': align === 'center',
            'ms-auto': align === 'right',
          }"
          style="max-width: 42rem"
        >
          {{ subtitle }}
        </p>
      </header>

      <!-- Swiper -->
      <div
        class="swiper-wrapper-container position-relative"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-duration="800"
      >
        <div ref="swiperEl" class="swiper accounts-swiper">
          <div class="swiper-wrapper">
            <div
              v-for="(card, i) in content.cards"
              :key="i"
              class="swiper-slide pb-4"
            >
              <article
                class="account-card rounded-4 overflow-hidden shadow-sm"
                :data-aos="animate ? 'zoom-in' : null"
                :data-aos-delay="i * 100"
              >
                <div class="card-img position-relative">
                  <img
                    :src="card.image"
                    :alt="card.title"
                    class="w-100 h-100 object-fit-cover"
                    loading="lazy"
                  />
                  <div class="overlay d-flex flex-column justify-content-end p-3">
                    <h5 class="fw-bold text-white mb-1">{{ card.title }}</h5>
                    <p class="small text-white-50 mb-0">{{ card.text }}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <!-- Flechas -->
          <div class="swiper-nav">
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
  id: { type: String, default: 'section-content-15' },
  scheme: { type: String, default: 'default-dark' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] }
})

const swiperEl = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const headerAlignClass = computed(() => {
  switch (props.align) {
    case 'left':
      return 'text-start me-auto'
    case 'right':
      return 'text-end ms-auto'
    default:
      return 'text-center mx-auto'
  }
})

onMounted(async () => {
  await nextTick()
  if (!swiperEl.value) return

  new Swiper(swiperEl.value, {
    modules: [Navigation],
    slidesPerView: 1.1,
    spaceBetween: 16,
    loop: props.content.cards?.length > 1,
    grabCursor: true,
    breakpoints: {
      576: { slidesPerView: 1.5, spaceBetween: 20 },
      768: { slidesPerView: 2.2, spaceBetween: 24 },
      992: { slidesPerView: 3.2, spaceBetween: 28 },
      1200: { slidesPerView: 4, spaceBetween: 32 },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
})
</script>

<style lang="less" scoped>
.section-content-15 {
  position: relative;
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.08;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
  }

  .section-header {
    color: var(--text);

    h2 {
      color: var(--heading-color);
    }

    p {
      color: var(--);
    }
  }

  .swiper-wrapper-container {
    position: relative;
    padding-bottom: 4.5rem;
  }

  .accounts-swiper {
    overflow: visible;
    padding-bottom: 1.5rem;

    :deep(.swiper-slide) {
      height: auto !important;
    }
  }

  .account-card {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
    }

    .card-img {
      position: relative;
      height: 320px;

      img {
        transition: transform 0.5s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }

      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0.3) 60%,
          transparent 100%
        );
      }

      h5,
      p {
        color: var(--text-inverse);
      }
    }
  }

  /* Navegación */
  .swiper-nav {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 1rem;
    z-index: 10;
  }

  .btn-nav {
    background: var(--surface-2);
    color: var(--text);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: all 0.25s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 991px) {
    .btn-nav {
      width: 40px;
      height: 40px;
    }

    .account-card .card-img {
      height: 260px;
    }
  }
}
</style>
