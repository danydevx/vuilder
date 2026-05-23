<!-- src/sections/Sectionmenu9.vue -->
<template>
  <section
    :id="id"
    class="section section-menu-9 position-relative overflow-hidden py-0"
    :class="schemeClass"
  >
    <!-- 🔸 Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    ></div>

    <!-- 🔸 Banner superior -->
    <div class="menu9-banner text-center py-4 position-relative">
      <h2 class="fw-bold text-uppercase m-0">{{ title }}</h2>
      <p v-if="subtitle" class="text-light mt-1 mb-0">{{ subtitle }}</p>
    </div>

    <!-- 🔸 Contenedor -->
    <div :class="[fluid ? 'container-fluid' : 'container', 'py-5 position-relative']">
      <div
        class="menu9-grid"
        :style="{ gridTemplateColumns: `repeat(${computedCols}, minmax(0, 1fr))` }"
      >
        <div
          v-for="(menu, i) in menus"
          :key="menu.id || i"
          class="menu9-item d-flex flex-column flex-md-row align-items-stretch rounded-3 shadow-sm overflow-hidden"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <!-- 🔹 COLUMNA IZQUIERDA (Texto) -->
          <div class="menu9-body flex-grow-1 p-4">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h4 class="fw-bold mb-0 text-uppercase">{{ menu.title }}</h4>
              <span class="menu9-price ">{{ menu.price }}</span>
            </div>

            <p v-if="menu.subtitle" class="menu9-subtitle mb-3">
              {{ menu.subtitle }}
            </p>

            <!-- Contenido expandible -->
            <transition name="expand">
              <div
                ref="contentRefs"
                class="menu9-content-inner"
                :style="{ maxHeight: expanded[i] ? '1200px' : '220px' }"
              >
                <ul class="list-unstyled mb-3">
                  <li v-for="(item, j) in menu.items" :key="j">
                    <i class="bi bi-dot text-accent me-1"></i>{{ item }}
                  </li>
                </ul>

                <div v-if="menu.includes?.length" class="menu9-includes mb-2">
                  <strong>Incluye:</strong>
                  <ul class="list-unstyled small mb-0">
                    <li v-for="(inc, k) in menu.includes" :key="k">
                      <i class="bi bi-check2 text-accent me-1"></i>{{ inc }}
                    </li>
                  </ul>
                </div>

                <div v-if="menu.extras?.length" class="menu9-extras mb-2">
                  <strong>Extras:</strong>
                  <ul class="list-unstyled small mb-0">
                    <li v-for="(extra, l) in menu.extras" :key="l">
                      <i class="bi bi-plus-circle text-accent me-1"></i>{{ extra }}
                    </li>
                  </ul>
                </div>

                <p
                  v-if="menu.conditions"
                  class="menu9-conditions small  mt-2 mb-0"
                >
                  {{ menu.conditions }}
                </p>
              </div>
            </transition>

            <!-- Botón Ver más -->
            <div v-if="showExpandBtn[i]" class="text-center mt-3 border-top pt-2">
              <button
                class="btn btn-sm btn-outline rounded-pill"
                @click="toggleExpand(i)"
              >
                {{ expanded[i] ? 'Ver menos' : 'Ver más' }}
              </button>
            </div>
          </div>

          <!-- 🔹 COLUMNA DERECHA (Imagen decorativa) -->
          <div v-if="menu.image" class="menu9-image flex-shrink-0">
            <img
              :src="menu.image"
              :alt="menu.title"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-menu-9' },
  scheme: { type: String, default: 'default-dark' },
  title: { type: String, default: 'Vegetarian Platters & Salads' },
  subtitle: {
    type: String,
    default: 'Deliciosas combinaciones frescas para cada ocasión.',
  },
  menus: { type: Array, required: true },
  backgroundImg: {
    type: String,
    default: 'https://placehold.co/1600x900/jpg?text=Wood+Texture',
  },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 1 },
})

const computedCols = computed(() => Math.min(Math.max(props.cols, 1), 2))
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const contentRefs = ref([])
const expanded = ref([])
const showExpandBtn = ref([])

function toggleExpand(index) {
  expanded.value[index] = !expanded.value[index]
}

async function detectOverflow() {
  await nextTick()
  showExpandBtn.value = contentRefs.value.map((el) =>
    el ? el.scrollHeight > 220 : false
  )
}

onMounted(detectOverflow)
watch(() => props.menus, detectOverflow, { deep: true })
</script>

<style lang="less" scoped>
.section-menu-9 {
  background: var(--surface);
  color: var(--text);

  /* === Fondo de textura === */
  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.7);
  }

  /* === Banner superior === */
  .menu9-banner {
    background: var(--accent);
    color: var(--accent-contrast, #fff);
    h2 {
      letter-spacing: 0.05em;
    }
  }

  /* === Grid general === */
  .menu9-grid {
    display: grid;
    gap: 2rem;
    align-items: stretch;
    @media (max-width: 768px) {
      grid-template-columns: 1fr !important;
    }
  }

  /* === Item principal === */
  .menu9-item {
    background: color-mix(in srgb, var(--surface) 90%, var(--surface-2) 10%);
    border: 1px solid var(--surface-border);
    border-radius: 0.75rem;
    overflow: hidden;
    transition: all 0.25s ease;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 18px color-mix(in srgb, var(--accent) 25%, transparent);
    }
  }

  /* === Cuerpo de texto === */
  .menu9-body {
    flex: 1;
    background: var(--surface);
  }

  .menu9-price {
    color: var(--accent);
    font-size: 1.2rem;
  }

  .menu9-subtitle {
    color: var(--);
    font-size: 0.9rem;
  }

  .menu9-content-inner {
    overflow: hidden;
    transition: max-height 0.4s ease;
    ul li {
      font-size: 0.95rem;
      line-height: 1.4;
      color: var(--text);
    }
  }

  strong {
    color: var(--heading-color, var(--text));
  }

  /* === Imagen lateral === */
  .menu9-image {
    width: 260px;
    min-height: 100%;
    background: var(--surface-muted);
    border-left: 4px solid var(--accent);
    @media (max-width: 768px) {
      width: 100%;
      height: 200px;
      border-left: none;
      border-top: 4px solid var(--accent);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    &:hover img {
      transform: scale(1.05);
    }
  }

  /* === Botón === */
  .btn-outline {
    border-color: var(--surface-border);
    color: var(--text);
    &:hover {
      background: var(--accent);
      color: var(--accent-contrast, #fff);
    }
  }

  /* === Animación expandir === */
  .expand-enter-active,
  .expand-leave-active {
    transition: max-height 0.4s ease;
  }
  .expand-enter-from,
  .expand-leave-to {
    max-height: 220px;
  }
}
</style>
