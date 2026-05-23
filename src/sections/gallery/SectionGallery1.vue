<template>
  <section
    :id="id"
    class="section section-gallery-hero position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- Header -->
    <div class="container text-center mb-4" data-aos="fade-up">
      <h2 class="section-title ">{{ title }}</h2>
      <p v-if="subtitle" class="section-subtitle mt-2">{{ subtitle }}</p>
    </div>

    <!-- Swiper principal -->
    <div class="container-fluid px-0 position-relative">
      <div ref="swiperEl" class="swiper gallery-hero-swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(item, i) in gallery"
            :key="i"
            class="swiper-slide position-relative"
          >
            <a
              :href="item.image"
              class="gallery-item d-block position-relative rounded-4 overflow-hidden glightbox"
              :data-gallery="galleryName"
              :data-title="item.title"
              :data-description="item.subtitle"
            >
              <img
                :src="item.thumb || item.image"
                :alt="item.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
              <div class="gallery-overlay d-flex flex-column justify-content-end p-4">
                <h5 class="fw-semibold mb-1 text-white">{{ item.title }}</h5>
                <p v-if="item.subtitle" class="small text-white-50 mb-0">
                  {{ item.subtitle }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Controles -->
      <button class="btn-nav btn-prev rounded-circle">
        <i class="bi bi-chevron-left"></i>
      </button>
      <button class="btn-nav btn-next rounded-circle">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

const props = defineProps({
  id: { type: String, default: 'section-gallery-hero' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Galería de Instalaciones' },
  subtitle: { type: String, default: 'Descubre cada rincón de nuestra terraza' },
  galleryName: { type: String, default: 'main-gallery' },
  gallery: { type: Array, required: true }
})

const swiperEl = ref(null)

onMounted(() => {
  new Swiper(swiperEl.value, {
    modules: [Navigation],
    slidesPerView: 1.2,
    spaceBetween: 12,
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev'
    },
    breakpoints: {
      576: { slidesPerView: 1.4 },
      768: { slidesPerView: 2.2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 3.4 }
    }
  })

  GLightbox({ selector: '.glightbox' })
})
</script>

<style lang="less" scoped>
.section-gallery-hero {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }
  .section-subtitle {
    color: var(--muted);
  }

  .gallery-hero-swiper {
    padding: 1rem 0 3rem;

    .swiper-slide {
      aspect-ratio: 16 / 9;
      max-height: 420px;
      cursor: pointer;
      transition: transform 0.25s ease;
      &:hover {
        transform: translateY(-4px);
      }
    }

    .gallery-item {
      display: block;
      width: 100%;
      height: 100%;
    }

    img {
      transition: transform 0.4s ease, filter 0.4s ease;
      &:hover {
        transform: scale(1.05);
        filter: brightness(1.05);
      }
    }

    .gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%);
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }
  }

  .btn-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 42px;
    height: 42px;
    background: color-mix(in oklab, var(--surface), var(--surface-overlay) 15%);
    border: 1px solid var(--surface-border);
    color: var(--text);
    transition: all 0.15s ease;

    &.btn-prev {
      left: 0.75rem;
    }
    &.btn-next {
      right: 0.75rem;
    }

    &:hover {
      background: var(--accent);
      color: var(--accent-contrast);
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
}
</style>
