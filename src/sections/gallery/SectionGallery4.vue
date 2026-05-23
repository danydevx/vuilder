<!-- src/sections/terrazas/gallery/SectionGallery4.vue -->
<template>
  <section
    :id="id"
    class="section-gallery-justified position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div class="container-fluid px-3 px-md-4">
      <!-- Header -->
      <header
        v-if="title || subtitle"
        class="text-center mb-5"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 40rem">
          {{ subtitle }}
        </p>
      </header>

      <!-- Galería justificada -->
      <div class="gallery-grid" data-aos="fade-up" data-aos-duration="800">
        <div
          v-for="(item, i) in gallery"
          :key="i"
          class="gallery-item position-relative rounded-4 overflow-hidden shadow-sm"
        >
          <a
            v-if="enableLightbox"
            :href="item.image"
            class="d-block glightbox"
            :data-gallery="galleryName"
            :data-title="item.title"
            :data-description="item.subtitle"
          >
            <img
              :src="item.thumb || item.image"
              :alt="item.title || `Imagen ${i + 1}`"
              loading="lazy"
              class="w-100 h-100 object-fit-cover"
            />
            <div v-if="item.title" class="gallery-overlay p-3">
              <h6 class="fw-semibold text-white mb-0">{{ item.title }}</h6>
              <small v-if="item.subtitle" class="text-white-50">{{ item.subtitle }}</small>
            </div>
          </a>

          <img
            v-else
            :src="item.thumb || item.image"
            :alt="item.title || `Imagen ${i + 1}`"
            loading="lazy"
            class="w-100 h-100 object-fit-cover"
          />
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
  id: { type: String, default: 'gallery-justified' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  scheme: { type: String, default: 'default-light' },
  gallery: { type: Array, default: () => [] },
  galleryName: { type: String, default: 'gallery4' },
  enableLightbox: { type: Boolean, default: true },
  rowHeight: { type: Number, default: 240 },
  gap: { type: String, default: '1rem' },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

onMounted(() => {
  if (props.enableLightbox) {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true,
      openEffect: 'fade',
      closeEffect: 'fade',
    })
  }
})
</script>

<style lang="less" scoped>
.section-gallery-justified {
  background: var(--surface);
  color: var(--text);

  .gallery-grid {
    display: grid;
    grid-auto-flow: dense;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    grid-auto-rows: v-bind('rowHeight + "px"');
    gap: v-bind('gap');

    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: 1rem;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background: var(--surface-2);

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow, 0 6px 18px rgba(0, 0, 0, 0.1));
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: inherit;
        transition: transform 0.4s ease;
      }

      &:hover img {
        transform: scale(1.04);
      }

      /* Overlay */
      .gallery-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        background: linear-gradient(
          to top,
          color-mix(in oklab, var(--accent), black 45%) 0%,
          transparent 80%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;

        h6 {
          font-family: var(--font-heading);
        }
      }

      &:hover .gallery-overlay {
        opacity: 1;
      }

      /* Móviles: overlay siempre visible */
      @media (hover: none) {
        .gallery-overlay {
          opacity: 1;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.15)
          );
        }
      }
    }
  }

  /* Pequeños ajustes de spacing según pantalla */
  @media (max-width: 768px) {
    .gallery-grid {
      gap: 0.75rem;
      grid-auto-rows: 180px;
    }
  }
}
</style>
