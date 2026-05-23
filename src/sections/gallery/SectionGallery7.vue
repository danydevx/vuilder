<!-- src/sections/terrazas/gallery/SectionGallery7.vue -->
<template>
  <section
    :id="id"
    class="section section-gallery-zero position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- Swiper principal -->
    <div ref="swiperEl" class="swiper gallery-swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(item, i) in gallery"
          :key="i"
          class="swiper-slide position-relative"
        >
          <a
            :href="item.type === 'video' ? item.source : item.image"
            class="gallery-item d-block position-relative glightbox"
            :data-gallery="galleryName"
            :data-type="item.type || 'image'"
            :data-title="item.title"
            :data-description="item.subtitle"
          >
            <img
              :src="item.thumb || item.image"
              :alt="item.title || `Imagen ${i + 1}`"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />

            <!-- Overlay texto -->
            <div class="gallery-overlay d-flex flex-column justify-content-end p-3">
              <div class="text-overlay">
                <h5 class="fw-semibold mb-1">{{ item.title }}</h5>
                <p class="small mb-0">{{ item.subtitle }}</p>
              </div>
            </div>

            <!-- Overlay de play en videos -->
            <div v-if="item.type === 'video'" class="play-overlay">
              <i class="bi bi-play-fill"></i>
            </div>
          </a>
        </div>
      </div>

      <!-- Flechas -->
      <div v-if="showArrows" class="swiper-button-prev"></div>
      <div v-if="showArrows" class="swiper-button-next"></div>

      <!-- Dots -->
      <div v-if="showDots" class="swiper-pagination"></div>
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
  id: { type: String, default: 'gallery-zero' },
  scheme: { type: String, default: 'default-neutral' },
  galleryName: { type: String, default: 'gallery-zero' },
  gallery: { type: Array, required: true },
  autoplay: { type: Boolean, default: false },
  delay: { type: Number, default: 4000 },
  showDots: { type: Boolean, default: false },
  showArrows: { type: Boolean, default: true },
})

const swiperEl = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(async () => {
  await nextTick()

  new Swiper(swiperEl.value, {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 0,
    loop: props.gallery.length > 1,
    autoplay: props.autoplay
      ? { delay: props.delay, disableOnInteraction: false }
      : false,
    pagination: props.showDots
      ? { el: '.swiper-pagination', clickable: true }
      : false,
    navigation: props.showArrows
      ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
      : false,
  })

  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    zoomable: true,
    openEffect: 'fade',
    closeEffect: 'fade',
  })
})
</script>

<style lang="less" scoped>
.section-gallery-zero {
  background: var(--surface);
  color: var(--text);
  position: relative;

  .gallery-swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    aspect-ratio: 4 / 3;
    @media (max-width: 768px) {
      aspect-ratio: 3 / 4;
    }
  }

  .gallery-item {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--surface-border);
    background: var(--surface-2);
    transition: transform 0.4s ease, box-shadow 0.3s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease, filter 0.5s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);

      img {
        transform: scale(1.03);
        filter: brightness(1.05);
      }

      .gallery-overlay {
        opacity: 1;
      }
    }

    .gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        color-mix(in srgb, var(--surface-overlay) 65%, rgba(0, 0, 0, 0.5)) 0%,
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: inherit;

      .text-overlay {
        color: var(--text-inverse);
        h5 {
          color: var(--text-inverse);
          font-family: var(--font-heading);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
        }
        p {
          color: color-mix(in srgb, var(--text-inverse) 80%, transparent);
        }
      }
    }

    /* Overlay de video */
    .play-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: color-mix(in srgb, var(--surface-overlay) 45%, rgba(0, 0, 0, 0.3));
      pointer-events: none;
      i {
        font-size: 3rem;
        color: var(--text-inverse);
      }
    }
  }

  /* Flechas */
  .swiper-button-prev,
  .swiper-button-next {
    top: 50%;
    transform: translateY(-50%);
    background: color-mix(in srgb, var(--surface-overlay) 40%, var(--accent) 10%);
    color: var(--text);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--surface-border);
    transition: all 0.3s ease;

    &::after {
      font-size: 1.2rem;
    }

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .swiper-button-prev {
    left: 0.75rem;
  }
  .swiper-button-next {
    right: 0.75rem;
  }

  /* Paginación (dots) */
  .swiper-pagination-bullet {
    background: var(--accent);
    opacity: 0.4;
    &-active {
      opacity: 1;
      background: var(--accent-hover, var(--accent));
    }
  }

  /* Lightbox adaptado al scheme */
  :deep(.glightbox-container) {
    background: color-mix(in srgb, var(--surface-overlay) 50%, rgba(0, 0, 0, 0.65)) !important;
    backdrop-filter: blur(6px);
  }

  :deep(.gslide-description),
  :deep(.gslide-title) {
    color: var(--text-inverse) !important;
  }
}
</style>
