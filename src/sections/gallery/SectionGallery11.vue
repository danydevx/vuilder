<!-- src/sections/terrazas/gallery/SectionGallery5.vue -->
<template>
  <section
    :id="id"
    class="section-gallery-mosaic position-relative overflow-hidden"
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

      <!-- Mosaic grid -->
      <div class="gallery-mosaic" data-aos="fade-up" data-aos-duration="800">
        <div
          v-for="(row, r) in chunkedGallery"
          :key="r"
          class="gallery-row d-flex flex-wrap gap-3 mb-3"
        >
          <div
            v-for="(item, i) in row"
            :key="i"
            class="gallery-item position-relative rounded-4 overflow-hidden shadow-sm"
            :class="`size-${getMosaicSize(r, i)}`"
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
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />

              <div v-if="item.title" class="overlay p-3">
                <h6 class="fw-semibold mb-0 text-white">{{ item.title }}</h6>
                <small v-if="item.subtitle" class="text-white-50">{{
                  item.subtitle
                }}</small>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

const props = defineProps({
  id: { type: String, default: 'gallery-mosaic' },
  title: { type: String, default: 'Galería Mosaico' },
  subtitle: { type: String, default: 'Distribución de mosaico dinámico' },
  scheme: { type: String, default: 'default-light' },
  gallery: { type: Array, default: () => [] },
  galleryName: { type: String, default: 'gallery5' },
  enableLightbox: { type: Boolean, default: true },
  itemsPerRow: { type: Number, default: 4 },
})

// Agrupa el array en filas
const chunkedGallery = computed(() => {
  const chunks = []
  for (let i = 0; i < props.gallery.length; i += props.itemsPerRow) {
    chunks.push(props.gallery.slice(i, i + props.itemsPerRow))
  }
  return chunks
})

// Devuelve un tamaño visual para el mosaico basado en patrones
const getMosaicSize = (rowIndex, itemIndex) => {
  // Patrones de mosaico más variados
  const patterns = [
    ['large', 'small', 'small', 'medium'],
    ['small', 'large', 'medium', 'small'],
    ['medium', 'small', 'large', 'small'],
    ['small', 'medium', 'small', 'large']
  ]
  
  const patternIndex = rowIndex % patterns.length
  return patterns[patternIndex][itemIndex % patterns[patternIndex].length]
}

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
.section-gallery-mosaic {
  background: var(--surface);
  color: var(--text);

  .gallery-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow, 0 8px 20px rgba(0, 0, 0, 0.15));

      .overlay {
        opacity: 1;
      }

      img {
        transform: scale(1.08);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
      border-radius: inherit;
    }

    /* Tamaños de mosaico */
    &.size-large {
      flex: 2 1 300px;
      aspect-ratio: 4/3;
    }

    &.size-medium {
      flex: 1 1 200px;
      aspect-ratio: 1/1;
    }

    &.size-small {
      flex: 1 1 150px;
      aspect-ratio: 3/4;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        color-mix(in oklab, var(--accent), black 50%) 0%,
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.4s ease;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      padding: 1.5rem;

      h6 {
        color: var(--text-inverse);
        font-size: 1.1rem;
      }

      small {
        font-size: 0.85rem;
      }
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
    .gallery-item {
      &.size-large,
      &.size-medium,
      &.size-small {
        flex: 1 1 100%;
        aspect-ratio: 16/9;
      }
    }
  }
}
</style>