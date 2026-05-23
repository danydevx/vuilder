<!-- src/sections/SectionMenu3.vue -->
<template>
  <section
    :id="id"
    class="section section-menu-3 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- Fondo opcional -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- Contenedor -->
    <div :class="[fluid ? 'container-fluid' : 'container', 'position-relative']">
      <!-- Header -->
      <header v-if="title || subtitle" class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 42rem">
          {{ subtitle }}
        </p>
      </header>

      <!-- Grid -->
      <div
        class="menu-grid"
        :style="{ gridTemplateColumns: `repeat(${computedCols}, minmax(0, 1fr))` }"
      >
        <article
          v-for="(menu, i) in menus"
          :key="i"
          class="menu-card d-flex flex-column flex-md-row rounded-4 shadow-sm overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="700"
          :data-aos-delay="i * 100"
        >
          <!-- Imagen lateral -->
          <div v-if="menu.image" class="menu-image flex-shrink-0">
            <img
              :src="menu.image"
              :alt="menu.title"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
          </div>

          <!-- Contenido -->
          <div class="menu-content flex-grow-1 p-4 d-flex flex-column">
            <header class="menu-header border-bottom pb-3 mb-3">
              <h4 class="fw-bold mb-1">{{ menu.title }}</h4>
              <p class="text-accent fw-semibold mb-0">{{ menu.price }}</p>
            </header>

            <transition name="expand">
              <div
                ref="contentRefs"
                class="menu-body flex-grow-1"
                :style="{ maxHeight: expanded[i] ? '1200px' : '280px' }"
              >
                <ul class="list-unstyled mb-3">
                  <li v-for="(item, j) in menu.items" :key="j">
                    <i class="bi bi-check2-circle me-1 text-accent"></i>{{ item }}
                  </li>
                </ul>

                <div v-if="menu.includes?.length" class="menu-includes mt-3">
                  <h6 class="fw-semibold mb-1">Incluye:</h6>
                  <ul class="list-unstyled mb-0">
                    <li v-for="(inc, k) in menu.includes" :key="k">
                      <i class="bi bi-dot me-1"></i>{{ inc }}
                    </li>
                  </ul>
                </div>

                <div v-if="menu.extras?.length" class="menu-extras mt-3">
                  <h6 class="fw-semibold mb-1">Extras:</h6>
                  <ul class="list-unstyled mb-0">
                    <li v-for="(extra, l) in menu.extras" :key="l">
                      <i class="bi bi-plus-circle me-1 text-accent"></i>{{ extra }}
                    </li>
                  </ul>
                </div>

                <footer
                  v-if="menu.conditions"
                  class="menu-footer mt-4 pt-3 border-top small "
                >
                  {{ menu.conditions }}
                </footer>
              </div>
            </transition>

            <!-- Botón Ver más -->
            <div
              v-if="showExpandBtn[i]"
              class="text-center mt-3 border-top pt-2"
            >
              <button
                class="btn btn-sm btn-outline rounded-pill"
                @click="toggleExpand(i)"
              >
                {{ expanded[i] ? 'Ver menos' : 'Ver más' }}
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- CTAs -->
      <div v-if="ctas?.length" class="text-center mt-5" data-aos="fade-up">
        <a
          v-for="(cta, i) in ctas"
          :key="i"
          :href="cta.href"
          class="btn me-2 mb-2"
          :class="[
            cta.variant === 'solid'
              ? 'btn-scheme'
              : cta.variant === 'outline'
              ? 'btn-outline'
              : 'btn-ghost'
          ]"
        >
          <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>{{ cta.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-menu-3' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Menús' },
  subtitle: { type: String, default: 'Explora todas las opciones disponibles para tu evento.' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  menus: { type: Array, required: true },
  ctas: { type: Array, default: () => [] },
  cols: { type: Number, default: 1 },
  fluid: { type: Boolean, default: false },
})

const computedCols = computed(() => Math.min(Math.max(props.cols, 1), 4))
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

// Estado de expansión y refs
const expanded = ref([])
const contentRefs = ref([])
const showExpandBtn = ref([])

function toggleExpand(i) {
  expanded.value[i] = !expanded.value[i]
}

// Detección real de overflow
async function detectOverflow() {
  await nextTick()
  showExpandBtn.value = contentRefs.value.map((el) =>
    el ? el.scrollHeight > 280 : false
  )
}

onMounted(detectOverflow)
watch(() => props.menus, detectOverflow, { deep: true })
</script>

<style lang="less" scoped>
.section-menu-3 {
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
    background: color-mix(in srgb, var(--surface-overlay) 40%, transparent);
    z-index: 1;
  }

  .container,
  .container-fluid {
    position: relative;
    z-index: 2;
  }

  .menu-grid {
    display: grid;
    gap: 1.5rem;
    @media (max-width: 767px) {
      grid-template-columns: 1fr !important;
    }
  }

  .menu-card {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 25%, transparent);
    }

    .menu-image {
      width: 100%;
      height: 220px;
      @media (min-width: 768px) {
        width: 40%;
        height: auto;
        min-height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }
      &:hover img {
        transform: scale(1.03);
      }
    }

    .menu-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .menu-body {
        overflow: hidden;
        transition: max-height 0.4s ease;
      }

      h4 {
        color: var(--heading-color, var(--text));
      }

      .text-accent {
        color: var(--accent);
      }

      ul li {
        padding: 0.25rem 0;
      }

      .menu-includes,
      .menu-extras {
        h6 {
          color: var(--text);
        }
        li {
          color: var(--);
        }
      }

      .menu-footer {
        border-color: var(--surface-border);
      }

      .btn-outline {
        border-color: var(--surface-border);
        color: var(--text);
        &:hover {
          background: var(--accent);
          color: var(--accent-contrast, #fff);
        }
      }
    }
  }

  /* Transición expandir */
  .expand-enter-active,
  .expand-leave-active {
    transition: max-height 0.4s ease;
  }
  .expand-enter-from,
  .expand-leave-to {
    max-height: 280px;
  }
}
</style>
