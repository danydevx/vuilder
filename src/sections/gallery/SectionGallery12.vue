<!-- src/sections/terrazas/gallery/SectionGallery7.vue -->
<template>
  <section
    :id="id"
    class="section-gallery-carousel position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <div class="container position-relative">
      <!-- Header -->
      <header
        v-if="title || subtitle"
        class="text-center mb-5"
        data-aos="fade-up"
      >
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p
          v-if="subtitle"
          class=" mx-auto"
          style="max-width: 40rem"
        >
          {{ subtitle }}
        </p>
      </header>

      <!-- Carousel -->
      <div
        class="gallery-carousel"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <swiper-container
          :slides-per-view="slidesPerView"
          :space-between="20"
          :loop="true"
          :navigation="true"
          :pagination="{ clickable: true }"
          :breakpoints="breakpoints"
          class="py-3"
        >
          <swiper-slide
            v-for="(item, i) in gallery"
            :key="i"
            class="media-slide rounded-4 overflow-hidden shadow-sm"
            :class="{ 'is-video': item.type === 'video' }"
          >
            <!-- 🖼 Imagen o 🎥 Video con Lightbox -->
            <a
              :href="item.type === 'video' ? item.source : item.image"
              class="d-block glightbox"
              :data-gallery="galleryName"
              :data-type="item.type || 'image'"
              :data-title="item.title"
              :data-description="item.subtitle"
            >
              <img
                v-if="item.type !== 'video'"
                :src="item.thumb || item.image"
                :alt="item.title || 'Media'"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
              <div
                v-else
                class="video-thumb position-relative w-100 h-100"
              >
                <img
                  :src="item.thumb || 'https://placehold.co/800x600?text=Video'"
                  :alt="item.title || 'Video'"
                  class="w-100 h-100 object-fit-cover"
                />
                <div class="play-overlay">
                  <i class="bi bi-play-circle-fill"></i>
                </div>
              </div>
            </a>

            <!-- Overlay de texto -->
            <div v-if="item.title" class="overlay p-3">
              <h6 class="fw-semibold text-white mb-0">
                {{ item.title }}
              </h6>
              <small
                v-if="item.subtitle"
                class="text-white-50"
              >
                {{ item.subtitle }}
              </small>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed, nextTick } from 'vue'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'
import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Registrar Swiper elementos personalizados
register()

const props = defineProps({
  id: { type: String, default: 'gallery-carousel' },
  title: { type: String, default: 'Galería Carrusel' },
  subtitle: { type: String, default: 'Navegación interactiva de fotos y videos' },
  scheme: { type: String, default: 'default-light' },
  gallery: { type: Array, default: () => [] },
  galleryName: { type: String, default: 'gallery7' },
  enableLightbox: { type: Boolean, default: true },
  itemsPerRow: { type: Number, default: 3 }, // No se usa directamente pero se mantiene
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

// Configuración responsive para el carrusel
const slidesPerView = computed(() => {
  return props.gallery.length > 0 ? Math.min(3, props.gallery.length) : 1
})

const breakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 10
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 15
  },
  1024: {
    slidesPerView: slidesPerView.value,
    spaceBetween: 20
  }
}

onMounted(async () => {
  await nextTick()

  if (props.enableLightbox) {
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      zoomable: true,
      openEffect: 'fade',
      closeEffect: 'fade',
      slideEffect: 'slide',
      moreText: '',
      videosWidth: '90%',
      width: '90%',
      plyr: {
        css: 'https://cdn.plyr.io/3.7.8/plyr.css',
        js: 'https://cdn.plyr.io/3.7.8/plyr.js',
      },
    })

    // Reinicia después de animaciones o re-render
    setTimeout(() => lightbox.reload(), 400)
  }
})
</script>

<style lang="less" scoped>
.section-gallery-carousel {
  background: var(--surface);
  color: var(--text);

  .gallery-carousel {
    position: relative;
    padding: 0 1rem;
  }

  .media-slide {
    position: relative;
    aspect-ratio: 16 / 9;
    cursor: pointer;
    overflow: hidden;
    border-radius: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: auto;

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow, 0 10px 30px rgba(0, 0, 0, 0.2));
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
      transition: transform 0.5s ease, filter 0.5s ease;
    }

    &:hover img {
      transform: scale(1.08);
      filter: brightness(1.05);
    }

    /* Video */
    .video-thumb {
      position: relative;
      .play-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.4);
        pointer-events: none;
        i {
          color: var(--text-inverse);
          font-size: 3rem;
          opacity: 0.9;
        }
      }
    }

    /* Overlay */
    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background: linear-gradient(
        to top,
        color-mix(in oklab, var(--surface-overlay) 80%, black 50%) 0%,
        transparent 80%
      );
      color: var(--text-inverse);
      opacity: 0;
      transition: opacity 0.4s ease;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }

    &:hover .overlay {
      opacity: 1;
    }

    @media (hover: none) {
      .overlay {
        opacity: 1;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.7),
          rgba(0, 0, 0, 0.2)
        );
      }
    }
  }

  @media (max-width: 768px) {
    .media-slide {
      aspect-ratio: 4 / 3;
    }

    /* Oculta subtítulo en móviles */
    .overlay small {
      display: none !important;
    }
  }

  /* Estilos para los controles del carrusel */
  :deep(swiper-container) {
    --swiper-navigation-size: 24px;
    --swiper-pagination-color: var(--accent);
    --swiper-pagination-bullet-inactive-color: rgba(255, 255, 255, 0.5);
    --swiper-pagination-bullet-inactive-opacity: 0.7;
    --swiper-pagination-bullet-size: 10px;
    --swiper-pagination-bullet-horizontal-gap: 6px;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    background-color: rgba(255, 255, 255, 0.7);
    color: var(--accent);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:after {
      font-size: 18px;
      font-weight: bold;
    }

    &:hover {
      background-color: var(--accent);
      color: white;
    }
  }

  :deep(.swiper-pagination-bullet) {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.5);
  }

  :deep(.swiper-pagination-bullet-active) {
    background-color: var(--accent);
  }
}

/* 🎥 Modal Lightbox (Customizado con scheme) */
:deep(.glightbox-container) {
  background: color-mix(in oklab, var(--surface-overlay), black 70%) !important;
  backdrop-filter: blur(8px);
}

:deep(.gslide-image img) {
  border-radius: 1rem;
  max-height: 85vh;
  object-fit: contain;
}

:deep(.gdesc-inner) {
  background: color-mix(in oklab, var(--surface), black 30%);
  color: var(--text-inverse);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  text-align: center;
  max-width: 640px;
  margin: 1.5rem auto 0;
}

:deep(.gslide-title) {
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--text-inverse);
  margin-bottom: 0.25rem;
}

:deep(.gslide-description) {
  font-size: 0.9rem;
  color: var(--muted);
}

:deep(.gprev),
:deep(.gnext) {
  background: color-mix(in oklab, var(--accent), black 20%);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  color: var(--text-inverse);
  transition: background 0.3s ease;
  &:hover {
    background: var(--accent);
  }
}
</style>