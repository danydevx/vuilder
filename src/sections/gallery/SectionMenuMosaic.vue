<template>
  <section
    :id="id"
    class="section-menu-mosaic position-relative overflow-hidden"
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

      <!-- 🔹 Mosaic grid -->
      <div class="menu-mosaic" data-aos="fade-up" data-aos-duration="800">
        <div
          v-for="(row, r) in chunkedMenus"
          :key="r"
          class="menu-row d-flex flex-wrap gap-3 mb-3"
        >
          <div
            v-for="(menu, i) in row"
            :key="i"
            class="menu-item card shadow-sm position-relative overflow-hidden rounded-4 p-0"
            :class="`size-${getMosaicSize(r, i)}`"
          >
            <div class="menu-body d-flex flex-column p-4">
              <!-- Header -->
              <div class="menu-header mb-3">
                <h5 class="fw-bold mb-1">{{ menu.title }}</h5>
                <p class="text-accent fw-semibold mb-0">{{ menu.price }}</p>
              </div>

              <!-- Contenido limitado -->
              <transition name="expand">
                <div
                  class="menu-content-inner"
                  :style="{ maxHeight: expanded[i + '-' + r] ? expandedHeight : collapsedHeight }"
                  ref="contentRefs[i + '-' + r]"
                >
                  <ul class="list-unstyled mb-2 small">
                    <li
                      v-for="(item, j) in menu.items"
                      :key="j"
                      class="d-flex align-items-center mb-1"
                    >
                      <i class="bi bi-check2-circle text-accent me-1"></i>{{ item }}
                    </li>
                  </ul>

                  <div v-if="menu.includes?.length" class="small mb-2">
                    <h6 class="fw-semibold mb-1">Incluye:</h6>
                    <ul class="list-unstyled small ">
                      <li v-for="(inc, k) in menu.includes" :key="k">
                        <i class="bi bi-dot me-1"></i>{{ inc }}
                      </li>
                    </ul>
                  </div>

                  <div v-if="menu.extras?.length" class="small mb-2">
                    <h6 class="fw-semibold mb-1">Extras:</h6>
                    <ul class="list-unstyled small ">
                      <li v-for="(extra, l) in menu.extras" :key="l">
                        <i class="bi bi-plus-circle text-accent me-1"></i>{{ extra }}
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>

              <!-- CTA ver más -->
              <div v-if="isOverflow(menu, i, r)" class="text-center mt-3 border-top pt-2">
                <button
                  class="btn btn-sm btn-outline rounded-pill"
                  @click="toggleExpand(i, r)"
                >
                  {{ expanded[i + '-' + r] ? 'Ver menos' : 'Ver más' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-menu-mosaic' },
  title: { type: String, default: 'Menú Mosaico' },
  subtitle: { type: String, default: 'Explora todas nuestras opciones' },
  scheme: { type: String, default: 'default-light' },
  menus: { type: Array, required: true },
  itemsPerRow: { type: Number, default: 4 },
  collapsedHeight: { type: String, default: '260px' },
  expandedHeight: { type: String, default: '1200px' },
})

// Agrupa el array en filas
const chunkedMenus = computed(() => {
  const chunks = []
  for (let i = 0; i < props.menus.length; i += props.itemsPerRow) {
    chunks.push(props.menus.slice(i, i + props.itemsPerRow))
  }
  return chunks
})

// Patrón visual
const getMosaicSize = (rowIndex, itemIndex) => {
  const patterns = [
    ['large', 'small', 'medium', 'small'],
    ['small', 'medium', 'large', 'small'],
    ['medium', 'small', 'small', 'large'],
  ]
  const patternIndex = rowIndex % patterns.length
  return patterns[patternIndex][itemIndex % patterns[patternIndex].length]
}

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const expanded = ref({})
const contentRefs = ref({})

// Detecta overflow
const isOverflow = (menu, i, r) => {
  const key = i + '-' + r
  const el = contentRefs.value[key]
  if (!el) return false
  return el.scrollHeight > parseInt(props.collapsedHeight)
}

// Alterna expansión
const toggleExpand = (i, r) => {
  const key = i + '-' + r
  expanded.value[key] = !expanded.value[key]
  nextTick(() => {
    isOverflow(null, i, r)
  })
}
</script>

<style lang="less" scoped>
.section-menu-mosaic {
  background: var(--surface);
  color: var(--text);

  .menu-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .menu-item {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    cursor: pointer;
    background: var(--surface-2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    /* Tamaños visuales */
    &.size-large {
      flex: 2 1 340px;
      aspect-ratio: 4/3;
    }

    &.size-medium {
      flex: 1 1 260px;
      aspect-ratio: 1/1;
    }

    &.size-small {
      flex: 1 1 200px;
      aspect-ratio: 3/4;
    }

    @media (max-width: 768px) {
      &.size-large,
      &.size-medium,
      &.size-small {
        flex: 1 1 100%;
        aspect-ratio: auto;
      }
    }

    .menu-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .menu-content-inner {
      overflow: hidden;
      transition: max-height 0.4s ease;
    }

    .btn-outline {
      border-color: var(--surface-border);
      color: var(--text);
      &:hover {
        background: var(--accent);
        color: var(--accent-contrast);
      }
    }
  }

  /* Transiciones */
  .expand-enter-active,
  .expand-leave-active {
    transition: max-height 0.4s ease;
  }
  .expand-enter-from,
  .expand-leave-to {
    max-height: 260px;
  }
}
</style>
