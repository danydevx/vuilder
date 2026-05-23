<!-- src/sections/SectionMenu7.vue -->
<template>
  <section
    :id="id"
    class="section section-menu-7 position-relative overflow-hidden py-5"
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

      <!-- GRID DE MENÚS -->
      <div
        class="menu7-grid"
        :style="{ gridTemplateColumns: `repeat(${computedCols}, minmax(0, 1fr))` }"
      >
        <div
          v-for="(menu, i) in menus"
          :key="menu.id || i"
          class="menu7-card rounded-4 shadow-sm p-4 d-flex flex-column"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <!-- HEADER DEL CARD -->
          <div class="menu7-header d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
            <h4 class="fw-bold mb-0">{{ menu.title }}</h4>
            <span class="price fw-semibold text-accent">{{ menu.price }}</span>
          </div>

          <p v-if="menu.subtitle" class=" small mb-3">
            {{ menu.subtitle }}
          </p>

          <!-- Contenido expandible -->
          <transition name="expand">
            <div
              ref="contentRefs"
              class="menu7-content-inner flex-grow-1"
              :style="{ maxHeight: expanded[i] ? '1200px' : '280px' }"
            >
              <ul class="list-unstyled mb-3">
                <li v-for="(item, j) in menu.items" :key="j">
                  <i class="bi bi-dot text-accent me-1"></i>{{ item }}
                </li>
              </ul>

              <div v-if="menu.includes?.length" class="menu-includes mb-3">
                <h6 class="fw-semibold mb-1 text-accent">Incluye:</h6>
                <ul class="list-unstyled small mb-0">
                  <li v-for="(inc, k) in menu.includes" :key="k">
                    <i class="bi bi-check2 me-1 text-accent"></i>{{ inc }}
                  </li>
                </ul>
              </div>

              <div v-if="menu.extras?.length" class="menu-extras mb-3">
                <h6 class="fw-semibold mb-1 text-accent">Extras:</h6>
                <ul class="list-unstyled small mb-0">
                  <li v-for="(extra, l) in menu.extras" :key="l">
                    <i class="bi bi-plus-circle me-1 text-accent"></i>{{ extra }}
                  </li>
                </ul>
              </div>

              <p
                v-if="menu.conditions"
                class="small  mt-3 border-top pt-2 mb-0"
              >
                {{ menu.conditions }}
              </p>
            </div>
          </transition>

          <!-- BOTÓN VER MÁS -->
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

      <!-- CTA global -->
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
  id: { type: String, default: 'section-menu-7' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Menús' },
  subtitle: { type: String, default: 'Opciones para todos los gustos.' },
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

// detección real de overflow
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
.section-menu-7 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.65);
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, var(--surface-overlay) 40%, transparent);
  }

  .container,
  .container-fluid {
    position: relative;
    z-index: 2;
  }

  /* === GRID === */
  .menu7-grid {
    display: grid;
    gap: 1.5rem;
    @media (max-width: 767px) {
      grid-template-columns: 1fr !important;
    }
  }

  /* === CARD === */
  .menu7-card {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    border-left: 6px solid var(--accent);
    border-radius: 1rem;
    transition: all 0.25s ease;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 20%, transparent);
    }
  }

  .menu7-header {
    h4 {
      color: var(--heading-color, var(--text));
    }
    .price {
      font-size: 1rem;
    }
  }

  .menu7-content-inner {
    overflow: hidden;
    transition: max-height 0.4s ease;
    ul li {
      font-size: 0.95rem;
      padding: 0.25rem 0;
      color: var(--text);
    }
  }

  .menu-includes,
  .menu-extras {
    h6 {
      color: var(--text);
      font-size: 0.85rem;
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
