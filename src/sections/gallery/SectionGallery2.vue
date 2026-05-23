<!-- src/sections/terrazas/gallery/SectionGallery2.vue -->
<template>
  <section
    :id="id"
    class="section section-gallery-masonry position-relative overflow-hidden py-5"
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
        <p v-if="subtitle" class="section-subtitle  mx-auto" style="max-width: 40rem">
          {{ subtitle }}
        </p>
      </header>

      <!-- Masonry Gallery -->
      <div class="masonry-wrapper" data-aos="fade-up" data-aos-duration="800">
        <div class="masonry">
          <div
            v-for="(item, i) in gallery"
            :key="i"
            class="masonry-item mb-4 position-relative"
          >
            <a
              :href="item.image"
              class="d-block position-relative rounded-4 overflow-hidden shadow-sm glightbox"
              :data-gallery="galleryName"
              :data-title="item.title"
              :data-description="item.subtitle"
            >
              <img
                :src="item.thumb || item.image"
                :alt="item.title || 'Imagen'"
                class="img-fluid w-100 h-auto object-fit-cover"
                loading="lazy"
              />
              <div v-if="item.title" class="gallery-overlay d-flex align-items-end p-3">
                <div class="overlay-text w-100">
                  <h6 class="mb-0 fw-semibold">{{ item.title }}</h6>
                  <small v-if="item.subtitle">{{ item.subtitle }}</small>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

const props = defineProps({
  id: { type: String, default: 'section-gallery-masonry' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  scheme: { type: String, default: 'default-neutral' },
  galleryName: { type: String, default: 'gallery-masonry' },
  gallery: { type: Array, default: () => [] },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(() => {
  GLightbox({ selector: '.glightbox' })
})
</script>

<style lang="less" scoped>
.section-gallery-masonry {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }
  .section-subtitle {
    color: var(--muted);
  }

  /* Masonry Layout */
  .masonry {
    column-count: 3;
    column-gap: 1.5rem;

    @media (max-width: 992px) {
      column-count: 2;
    }

    @media (max-width: 576px) {
      column-count: 1;
    }

    .masonry-item {
      break-inside: avoid;
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);

        .gallery-overlay {
          opacity: 1;
        }
      }

      img {
        border-radius: 1rem;
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      a:hover img {
        transform: scale(1.02);
      }

      .gallery-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          color-mix(in srgb, var(--surface-overlay) 60%, rgba(0, 0, 0, 0.6)) 0%,
          transparent 80%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: inherit;

        .overlay-text {
          color: var(--text-inverse);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

          small {
            color: color-mix(in srgb, var(--text-inverse) 75%, transparent);
          }
        }
      }
    }
  }

  .masonry-wrapper {
    padding: 0;
    margin: 0;
  }
}
</style>
