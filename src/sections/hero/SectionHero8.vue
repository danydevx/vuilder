<template>
  <section
    :id="id"
    class="section-hero-lightbox-gallery position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div class="container-fluid p-0 m-0 position-relative">
      <!-- Swiper principal -->
      <div ref="swiperEl" class="swiper hero-gallery-swiper m-0 p-0">
        <div class="swiper-wrapper">
          <div
            v-for="(item, i) in gallery"
            :key="i"
            class="swiper-slide position-relative"
          >
            <a
              :href="item.image"
              class="gallery-item d-block position-relative glightbox"
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
              <div class="gallery-overlay d-flex flex-column justify-content-end p-3">
                <div class="text-overlay">
                  <h5 class="fw-semibold mb-1">{{ item.title }}</h5>
                  <p class="small mb-0 ">{{ item.subtitle }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- Dots -->
        <div v-if="showDots" class="swiper-pagination"></div>

        <!-- Arrows -->
        <div v-if="showArrows" class="swiper-button-prev"></div>
        <div v-if="showArrows" class="swiper-button-next"></div>
      </div>

      <!-- Hidden (extra) items para lightbox -->
      <div v-if="extraItems.length">
        <a
          v-for="(extra, j) in extraItems"
          :key="'hidden-' + j"
          :href="extra.src"
          class="glightbox"
          :data-gallery="galleryName"
          :data-title="extra.title"
          style="display: none;"
        ></a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

const props = defineProps({
  id: { type: String, default: 'section-hero-lightbox-gallery' },
  scheme: { type: String, default: 'default-light' },
  galleryName: { type: String, default: 'hero-gallery' },
  gallery: { type: Array, required: true },
  extraItems: { type: Array, default: () => [] },
  autoplay: { type: Boolean, default: false },
  delay: { type: Number, default: 4000 },
  showDots: { type: Boolean, default: true },
  showArrows: { type: Boolean, default: true }
})

const swiperEl = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(async () => {
  await nextTick()

  // 🌀 Inicializa Swiper sin espacio entre slides
  new Swiper(swiperEl.value, {
    modules: [Navigation, Pagination, Autoplay],
    loop: props.gallery.length > 1,
    slidesPerView: 1,
    spaceBetween: 0, // 🔥 sin separación
    autoplay: props.autoplay
      ? { delay: props.delay, disableOnInteraction: false }
      : false,
    pagination: props.showDots
      ? { el: '.swiper-pagination', clickable: true }
      : false,
    navigation: props.showArrows
      ? {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      : false,
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
      1200: { slidesPerView: 4 }
    }
  })

  // ✅ Inicializa GLightbox
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    zoomable: true,
    autoplayVideos: true
  })
})
</script>

<style lang="less" scoped>
.section-hero-lightbox-gallery {
  background: var(--surface);
  color: var(--text);
  padding: 0;
  margin: 0;

  .hero-gallery-swiper {
    padding: 0;
    margin: 0;
  }

  .swiper-slide {
    height: auto;
    margin: 0 !important;
  }

  .gallery-item {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 0; // 🔥 sin bordes redondeados
    aspect-ratio: 4 / 3;
    overflow: hidden;
    margin: 0;
    transition: transform 0.4s ease;

    img {
      transition: transform 0.6s ease, filter 0.6s ease;
      border-radius: 0;
    }

    &:hover img {
      transform: scale(1.05);
      filter: brightness(1.05);
    }

    .gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        color-mix(in oklab, var(--surface) 70%, transparent) 0%,
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    &:hover .gallery-overlay {
      opacity: 1;
    }

    .text-overlay {
      color: var(--text);
      h5 {
        font-family: var(--font-heading);
        color: var(--text);
      }
      p {
        color: var(--muted);
      }
    }
  }

  .swiper-pagination {
    bottom: 0 !important;
  }

  .swiper-button-prev,
  .swiper-button-next {
    top: 50%;
    transform: translateY(-50%);
    background: color-mix(in oklab, var(--surface-overlay, rgba(0,0,0,.12)), var(--accent) 8%);
    color: var(--accent);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 0.3s ease;
    &::after {
      font-size: 1.1rem;
    }

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
    }
  }

  .swiper-button-prev { left: 0.5rem; }
  .swiper-button-next { right: 0.5rem; }

  @media (max-width: 768px) {
    .gallery-item { aspect-ratio: 3 / 4; }
    .swiper-button-prev,
    .swiper-button-next { display: none; }
  }
}

/* Lightbox */
.glightbox-container {
  background: color-mix(in oklab, var(--surface-overlay), black 60%) !important;
  backdrop-filter: blur(6px);
}

.glightbox-clean img.gslide-image {
  max-width: 96vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 0.5rem;
}
</style>
