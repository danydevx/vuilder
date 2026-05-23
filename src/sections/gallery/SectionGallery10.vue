<template>
  <section
    :id="id"
    class="section section-gallery-masonry-wall position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- Fondo opcional -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    ></div>
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <div class="container position-relative">
      <!-- Header -->
      <header v-if="title || subtitle" class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 40rem">
          {{ subtitle }}
        </p>
      </header>

      <!-- Masonry Wall -->
      <masonry-wall
        class="gallery-masonry"
        :items="gallery"
        :ssr-columns="1"
        :column-width="columnWidth"
        :gap="gap"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <template #default="{ item, index }">
          <div
            :key="index"
            class="masonry-item position-relative rounded-4 overflow-hidden shadow-sm"
            :style="item.height ? { height: `${item.height}px` } : {}"
          >
            <!-- Si tiene href, redirige -->
            <RouterLink
              v-if="item.href"
              :to="item.href"
              class="d-block position-relative"
            >
              <img
                :src="item.thumb || item.image"
                :alt="item.title || 'Imagen'"
                class="img-fluid w-100 h-100 object-fit-cover"
                loading="lazy"
              />

              <div class="gallery-overlay d-flex align-items-end p-3">
                <div class="overlay-text w-100">
                  <h6 class="mb-0 fw-semibold">{{ item.title }}</h6>
                  <small v-if="item.subtitle">{{ item.subtitle }}</small>
                </div>
              </div>
            </RouterLink>

            <!-- Si no tiene href, abre lightbox -->
            <a
              v-else
              :href="item.type === 'video' ? item.source : item.image"
              class="d-block position-relative glightbox"
              :data-gallery="galleryName"
              :data-type="item.type || 'image'"
              :data-title="item.title"
              :data-description="item.subtitle"
            >
              <img
                :src="item.thumb || item.image"
                :alt="item.title || 'Imagen'"
                class="img-fluid w-100 h-100 object-fit-cover"
                loading="lazy"
              />

              <div class="gallery-overlay d-flex align-items-end p-3">
                <div class="overlay-text w-100">
                  <h6 class="mb-0 fw-semibold">{{ item.title }}</h6>
                  <small v-if="item.subtitle">{{ item.subtitle }}</small>
                </div>
              </div>

              <div v-if="item.type === 'video'" class="play-overlay">
                <i class="bi bi-play-fill"></i>
              </div>
            </a>
          </div>
        </template>
      </masonry-wall>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import MasonryWall from '@yeger/vue-masonry-wall'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

const props = defineProps({
  id: { type: String, default: 'section-gallery-masonry-wall' },
  scheme: { type: String, default: 'default-dark' },
  title: { type: String, default: 'Galería Masonry Vue 11' },
  subtitle: { type: String, default: 'Distribución fluida y adaptable' },
  galleryName: { type: String, default: 'gallery11' },
  gallery: { type: Array, required: true },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  columnWidth: { type: Number, default: 320 },
  gap: { type: Number, default: 18 },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(() => {
  GLightbox({
    selector: '.glightbox',
    loop: true,
    zoomable: true,
    autoplayVideos: true,
    openEffect: 'fade',
    closeEffect: 'fade',
  })
})
</script>

<style lang="less" scoped>
.section-gallery-masonry-wall {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.65);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      color-mix(in srgb, var(--surface-overlay) 40%, rgba(0, 0, 0, 0.3)) 0%,
      transparent 70%
    );
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
  }

  .masonry-item {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px color-mix(in srgb, var(--accent) 25%, transparent);
      .gallery-overlay {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: inherit;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.03);
    }

    .gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        color-mix(in srgb, var(--surface-overlay) 70%, rgba(0, 0, 0, 0.6)) 0%,
        transparent 75%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: flex-end;
      border-radius: inherit;

      .overlay-text {
        color: var(--text-inverse);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        small {
          color: color-mix(in srgb, var(--text-inverse) 80%, transparent);
        }
      }
    }

    .play-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;

      i {
        font-size: 2.5rem;
        color: var(--text-inverse);
        opacity: 0.9;
      }
    }
  }
}
</style>
