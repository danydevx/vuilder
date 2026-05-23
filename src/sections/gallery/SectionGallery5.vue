<!-- src/sections/terrazas/gallery/SectionGallery4.vue -->
<template>
  <section
    :id="id"
    class="section-gallery-editorial position-relative overflow-hidden"
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

      <!-- Editorial rows -->
      <div class="gallery-editorial" data-aos="fade-up" data-aos-duration="800">
        <div
          v-for="(row, r) in chunkedGallery"
          :key="r"
          class="gallery-row d-flex flex-wrap gap-3 mb-3"
        >
          <div
            v-for="(item, i) in row"
            :key="i"
            class="gallery-cell position-relative rounded-4 overflow-hidden flex-grow-1 shadow-sm"
            :class="`size-${getRandomSize(r, i)}`"
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
  id: { type: String, default: 'gallery-editorial' },
  title: { type: String, default: 'Galería Editorial' },
  subtitle: { type: String, default: 'Distribución justificada tipo revista' },
  scheme: { type: String, default: 'default-light' },
  gallery: { type: Array, default: () => [] },
  galleryName: { type: String, default: 'gallery4' },
  enableLightbox: { type: Boolean, default: true },
  itemsPerRow: { type: Number, default: 3 },
})

// Agrupa el array en filas
const chunkedGallery = computed(() => {
  const chunks = []
  for (let i = 0; i < props.gallery.length; i += props.itemsPerRow) {
    chunks.push(props.gallery.slice(i, i + props.itemsPerRow))
  }
  return chunks
})

// Devuelve un tamaño visual aleatorio para la celda
const getRandomSize = (rowIndex, itemIndex) => {
  const patterns = ['wide', 'tall', 'square']
  const pattern = (rowIndex + itemIndex) % patterns.length
  return patterns[pattern]
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
.section-gallery-editorial {
  background: var(--surface);
  color: var(--text);

  .gallery-row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-wrap: wrap;
    }
  }

  .gallery-cell {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    flex: 1 1 0;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow, 0 6px 18px rgba(0, 0, 0, 0.1));

      .overlay {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
      border-radius: inherit;
    }

    &:hover img {
      transform: scale(1.05);
    }

    /* Tamaños relativos de celdas */
    &.size-wide {
      flex: 2;
      aspect-ratio: 16 / 9;
    }

    &.size-tall {
      aspect-ratio: 3 / 4;
    }

    &.size-square {
      aspect-ratio: 1 / 1;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        color-mix(in oklab, var(--accent), black 45%) 0%,
        transparent 80%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;

      h6 {
        color: var(--text-inverse);
      }
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
}
</style>
