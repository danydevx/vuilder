<!-- src/sections/SectionMenu8.vue -->
<template>
  <section
    :id="id"
    class="section section-menu-8 position-relative overflow-hidden py-0"
    :class="schemeClass"
  >
    <!-- 🔸 Fondo de textura -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    ></div>

    <!-- 🔸 Encabezado tipo banner -->
    <div class="menu8-banner text-center py-4 position-relative">
      <h2 class="fw-bold text-uppercase m-0">{{ title }}</h2>
      <p v-if="subtitle" class="text-light mt-1 mb-0">{{ subtitle }}</p>
    </div>

    <!-- 🔸 Contenedor -->
    <div :class="[fluid ? 'container-fluid' : 'container', 'py-5 position-relative']">
      <div
        class="menu8-grid"
        :style="{ gridTemplateColumns: `repeat(${computedCols}, minmax(0, 1fr))` }"
      >
        <div
          v-for="(menu, i) in menus"
          :key="menu.id || i"
          class="menu8-item p-4 rounded-3 shadow-sm"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <!-- Título + Precio -->
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h4 class="fw-bold mb-0 text-uppercase">{{ menu.title }}</h4>
            <span class="menu8-price ">{{ menu.price }}</span>
          </div>

          <p v-if="menu.subtitle" class="menu8-subtitle mb-3">
            {{ menu.subtitle }}
          </p>

          <!-- Contenido expandible -->
          <transition name="expand">
            <div
              ref="contentRefs"
              class="menu8-content-inner"
              :style="{ maxHeight: expanded[i] ? '1200px' : '220px' }"
            >
              <ul class="list-unstyled mb-3">
                <li v-for="(item, j) in menu.items" :key="j">
                  <i class="bi bi-dot text-accent me-1"></i>{{ item }}
                </li>
              </ul>

              <div v-if="menu.includes?.length" class="menu8-includes mb-2">
                <strong>Incluye:</strong>
                <ul class="list-unstyled small mb-0">
                  <li v-for="(inc, k) in menu.includes" :key="k">
                    <i class="bi bi-check2 text-accent me-1"></i>{{ inc }}
                  </li>
                </ul>
              </div>

              <div v-if="menu.extras?.length" class="menu8-extras mb-2">
                <strong>Extras:</strong>
                <ul class="list-unstyled small mb-0">
                  <li v-for="(extra, l) in menu.extras" :key="l">
                    <i class="bi bi-plus-circle text-accent me-1"></i>{{ extra }}
                  </li>
                </ul>
              </div>

              <p v-if="menu.conditions" class="menu8-conditions small  mt-2 mb-0">
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-menu-8' },
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
  cols: { type: Number, default: 2 },
})

const computedCols = computed(() => Math.min(Math.max(props.cols, 1), 3))
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
.section-menu-8 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.7);
  }

  /* === BANNER superior tipo franja === */
  .menu8-banner {
    background: var(--accent);
    color: var(--accent-contrast, #fff);
    position: relative;
    h2 {
      letter-spacing: 0.05em;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 8px;
      background: color-mix(in srgb, var(--accent-hover) 40%, transparent);
    }
  }

  /* === GRID === */
  .menu8-grid {
    display: grid;
    gap: 2rem;
    align-items: start;
    @media (max-width: 768px) {
      grid-template-columns: 1fr !important;
    }
  }

  /* === ITEM === */
  .menu8-item {
    background: color-mix(in srgb, var(--surface) 90%, var(--surface-2) 10%);
    border: 1px solid var(--surface-border);
    border-radius: 0.75rem;
    position: relative;
    transition: all 0.25s ease;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 18px color-mix(in srgb, var(--accent) 25%, transparent);
    }
  }

  .menu8-price {
    color: var(--accent);
    font-size: 1.15rem;
  }

  .menu8-subtitle {
    color: var(--);
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .menu8-content-inner {
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

  .btn-outline {
    border-color: var(--surface-border);
    color: var(--text);
    &:hover {
      background: var(--accent);
      color: var(--accent-contrast, #fff);
    }
  }

  /* Animación expandir */
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
