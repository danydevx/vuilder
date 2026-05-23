<!-- src/sections/terrazas/gallery/SectionGallery6.vue -->
<template>
  <section
    :id="id"
    class="section-gallery-mixed-grid position-relative overflow-hidden py-5"
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

      <!-- Grid -->
      <div
        class="media-grid"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div
          v-for="(item, i) in gallery"
          :key="i"
          class="media-card rounded-4 overflow-hidden shadow-sm"
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
                <i class="bi bi-play-fill"></i>
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed, nextTick } from 'vue'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

const props = defineProps({
  id: { type: String, default: 'gallery-mixed-grid' },
  title: { type: String, default: 'Galería Mixta' },
  subtitle: { type: String, default: 'Fotos y clips de nuestros eventos' },
  scheme: { type: String, default: 'default-light' },
  gallery: { type: Array, default: () => [] },
  galleryName: { type: String, default: 'gallery6' },
  enableLightbox: { type: Boolean, default: true },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

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
.section-gallery-mixed-grid {
  background: var(--surface);
  color: var(--text);

  .media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }

  .media-card {
    position: relative;
    aspect-ratio: 4 / 3;
    cursor: pointer;
    overflow: hidden;
    border-radius: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow, 0 8px 24px rgba(0, 0, 0, 0.15));
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
      transition: transform 0.4s ease, filter 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
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
        background: rgba(0, 0, 0, 0.35);
        pointer-events: none;
        i {
          color: var(--text-inverse);
          font-size: 2.5rem;
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
        color-mix(in oklab, var(--surface-overlay) 70%, black 45%) 0%,
        transparent 80%
      );
      color: var(--text-inverse);
      opacity: 0;
      transition: opacity 0.3s ease;
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
          rgba(0, 0, 0, 0.65),
          rgba(0, 0, 0, 0.15)
        );
      }
    }
  }

  @media (max-width: 768px) {
    .media-grid {
      gap: 0.75rem;
    }

    .media-card {
      aspect-ratio: 1 / 1;
    }

    /* Oculta subtítulo en móviles */
    .overlay small {
      display: none !important;
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
}
</style>
