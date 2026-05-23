<!-- src/sections/terrazas/gallery/SectionGalleryMixed.vue -->
<template>
  <section
    :id="id"
    class="section section-gallery-mixed position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <div class="container position-relative">
      <!-- Header -->
      <header
        v-if="title || subtitle"
        class="text-center mb-5"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <h2 class="fw-bold display-6 section-title">{{ title }}</h2>
        <p v-if="subtitle" class="section-subtitle mx-auto" style="max-width: 40rem">
          {{ subtitle }}
        </p>
      </header>

      <!-- Gallery Grid -->
      <div class="row g-3 justify-content-center" data-aos="fade-up" data-aos-duration="800">
        <div
          v-for="(item, i) in gallery"
          :key="i"
          class="col-6 col-md-4 col-lg-3"
        >
          <!-- Con Lightbox -->
          <a
            v-if="enableLightbox"
            :href="item.type === 'video' ? item.source : item.image"
            class="media-item glightbox position-relative d-block rounded-4 overflow-hidden shadow-sm"
            :data-gallery="galleryName"
            :data-type="item.type || 'image'"
            :data-title="item.title"
            :data-description="item.subtitle"
            :class="{ 'is-video': item.type === 'video' }"
          >
            <img
              :src="item.thumb || item.image"
              :alt="item.title || 'Imagen'"
              class="img-fluid w-100 h-100 object-fit-cover"
              loading="lazy"
            />

            <!-- Ícono de video -->
            <div v-if="item.type === 'video'" class="play-overlay">
              <i class="bi bi-play-fill"></i>
            </div>

            <!-- Caption -->
            <div v-if="item.title" class="media-caption p-3">
              <h6 class="fw-semibold mb-0">{{ item.title }}</h6>
              <small v-if="item.subtitle">{{ item.subtitle }}</small>
            </div>
          </a>

          <!-- Sin lightbox -->
          <div
            v-else
            class="media-item position-relative rounded-4 overflow-hidden shadow-sm"
          >
            <img
              :src="item.thumb || item.image"
              :alt="item.title || 'Imagen'"
              class="img-fluid w-100 h-100 object-fit-cover"
              loading="lazy"
            />
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
  id: { type: String, default: 'gallery-mixed' },
  title: { type: String, default: 'Galería Multimedia' },
  subtitle: { type: String, default: 'Fotos y videos del evento' },
  scheme: { type: String, default: 'default-neutral' },
  gallery: { type: Array, default: () => [] },
  galleryName: { type: String, default: 'gallery-mixed' },
  enableLightbox: { type: Boolean, default: true },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(async () => {
  await nextTick()
  if (props.enableLightbox) {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true,
      autoplayVideos: true,
      openEffect: 'fade',
      closeEffect: 'fade',
      moreText: '',
    })
  }
})
</script>

<style lang="less" scoped>
.section-gallery-mixed {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }
  .section-subtitle {
    color: var(--muted);
  }

  .media-item {
    position: relative;
    display: block;
    cursor: pointer;
    border-radius: 1rem;
    overflow: hidden;
    text-decoration: none;
    transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
    background: var(--surface-2);
    border: 1px solid var(--surface-border);

    &:hover {
      transform: translateY(-3px);
      filter: brightness(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.03);
    }

    /* Overlay de video */
    .play-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: color-mix(in srgb, var(--surface-overlay) 50%, rgba(0, 0, 0, 0.35));
      transition: opacity 0.3s ease;
      pointer-events: none;

      i {
        color: var(--text-inverse);
        font-size: 2.5rem;
      }
    }

    /* Caption */
    .media-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(
        to top,
        color-mix(in srgb, var(--surface-overlay) 60%, rgba(0, 0, 0, 0.7)) 0%,
        transparent 70%
      );
      color: var(--text-inverse);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;

      h6 {
        color: var(--text-inverse);
      }

      small {
        color: color-mix(in srgb, var(--text-inverse) 80%, transparent);
      }
    }

    &:hover .media-caption {
      opacity: 1;
    }

    @media (hover: none) {
      .media-caption {
        opacity: 1;
      }
    }

    &.is-video img {
      filter: brightness(0.9);
    }
  }
}
</style>
