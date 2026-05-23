<!-- src/sections/SectionMenu1.vue -->
<template>
  <section
    :id="id"
    class="section section-menu-1 position-relative overflow-hidden py-5"
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
        <p v-if="subtitle" class=" mx-auto" style="max-width: 40rem">
          {{ subtitle }}
        </p>
      </header>

      <!-- Tarjetas -->
      <div
        class="menu-grid"
        :style="{ gridTemplateColumns: `repeat(${computedCols}, minmax(0, 1fr))` }"
      >
        <div
          v-for="(menu, i) in menus"
          :key="i"
          class="menu-card rounded-4 shadow-sm d-flex flex-column"
          data-aos="fade-up"
          data-aos-duration="700"
          :data-aos-delay="i * 100"
        >
          <!-- Imagen -->
          <div v-if="menu.image" class="menu-image position-relative">
            <img
              :src="menu.image"
              :alt="menu.title"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
            <div class="menu-image-overlay position-absolute top-0 start-0 w-100 h-100" />
            <div class="menu-image-label position-absolute bottom-0 start-0 w-100 p-3">
              <h5 class="fw-bold mb-0 text-inverse">{{ menu.title }}</h5>
            </div>
          </div>

          <!-- Contenido -->
          <div class="menu-body flex-grow-1 p-4">
            <div v-if="!menu.image" class="menu-header border-bottom pb-2 mb-3">
              <h4 class="fw-bold mb-1">{{ menu.title }}</h4>
              <p class="text-accent fw-semibold mb-0">{{ menu.price }}</p>
            </div>

            <transition name="expand">
              <div
                ref="contentRefs"
                class="menu-content-inner"
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

                <div
                  v-if="menu.conditions"
                  class="menu-footer mt-4 pt-3 border-top small "
                >
                  {{ menu.conditions }}
                </div>
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
        </div>
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
  id: { type: String, default: 'section-menu-1' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Menús' },
  subtitle: {
    type: String,
    default: 'Delicias para todos los gustos y estilos de evento.',
  },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  menus: { type: Array, required: true },
  ctas: { type: Array, default: () => [] },
  cols: { type: Number, default: 3 },
  fluid: { type: Boolean, default: false },
})

const computedCols = computed(() => Math.min(Math.max(props.cols, 1), 4))
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

// refs y estados
const contentRefs = ref([])
const expanded = ref([])
const showExpandBtn = ref([])

function toggleExpand(index) {
  expanded.value[index] = !expanded.value[index]
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
.section-menu-1 {
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

  /* GRID RESPONSIVE */
  .menu-grid {
    display: grid;
    gap: 1.5rem;
    @media (max-width: 767px) {
      grid-template-columns: 1fr !important;
    }
  }

  /* CARD */
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
      position: relative;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }
      &:hover img {
        transform: scale(1.05);
      }
      .menu-image-overlay {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 70%);
        pointer-events: none;
      }
      .menu-image-label {
        color: var(--text-inverse);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      }
    }

    .menu-content-inner {
      overflow: hidden;
      transition: max-height 0.4s ease;
    }

    .menu-header h4 {
      color: var(--heading-color, var(--text));
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

  /* Animación expandir */
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
