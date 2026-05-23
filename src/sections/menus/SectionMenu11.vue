<template>
  <section
    :id="id"
    class="section section-menu-11 py-5 position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- Fondo opcional -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <!-- Contenedor principal -->
    <div :class="[fluid ? 'container-fluid' : 'container', 'position-relative']">
      <!-- Header -->
      <header v-if="title || subtitle" class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold section-title">{{ title }}</h2>
        <p v-if="subtitle" class="section-subtitle mt-2">{{ subtitle }}</p>
      </header>

      <!-- 🔹 Menús horizontales (Swiper Tabs) -->
      <div class="menu-tabs-horizontal mb-5" data-aos="fade-up">
        <Swiper v-bind="swiperOptionsComputed" class="menu-swiper">
          <SwiperSlide
            v-for="(menu, i) in menus"
            :key="menu.id || i"
            class="menu-tab-slide"
          >
            <button
              class="nav-link w-100 text-center fw-semibold rounded-3 px-3 py-2"
              :class="{ active: activeIndex === i }"
              type="button"
              @click="setActive(i)"
            >
              <span>{{ menu.title }}</span>
            </button>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- 🔹 Contenido de menú activo -->
      <transition name="fade" mode="out-in">
        <div
          v-if="activeMenu"
          :key="activeMenu.id"
          class="menu-content-active"
          data-aos="fade-up"
        >
          <div class="row g-4 align-items-center">
            <!-- Imagen -->
            <div class="col-12 col-md-5">
              <figure
                v-if="activeMenu.image"
                class="ratio ratio-4x3 rounded-4 overflow-hidden shadow-sm"
              >
                <img
                  :src="activeMenu.image"
                  :alt="activeMenu.title"
                  class="w-100 h-100 object-fit-cover"
                />
              </figure>
            </div>

            <!-- Contenido -->
            <div class="col-12 col-md-7">
              <h4 class="fw-bold mb-2">{{ activeMenu.title }}</h4>
              <p v-if="activeMenu.subtitle" class=" mb-3">
                {{ activeMenu.subtitle }}
              </p>

              <ul class="list-unstyled mb-3">
                <li
                  v-for="(item, j) in activeMenu.items"
                  :key="j"
                  class="d-flex align-items-center mb-1"
                >
                  <i class="bi bi-check2-circle text-accent me-2"></i>{{ item }}
                </li>
              </ul>

              <div v-if="activeMenu.includes?.length" class="mb-3">
                <h6 class="fw-semibold mb-1">Incluye:</h6>
                <ul class="list-unstyled small  mb-0">
                  <li v-for="(inc, k) in activeMenu.includes" :key="k">
                    <i class="bi bi-dot me-1"></i>{{ inc }}
                  </li>
                </ul>
              </div>

              <div v-if="activeMenu.extras?.length" class="mb-3">
                <h6 class="fw-semibold mb-1">Extras:</h6>
                <ul class="list-unstyled small  mb-0">
                  <li v-for="(extra, l) in activeMenu.extras" :key="l">
                    <i class="bi bi-plus-circle text-accent me-1"></i>{{ extra }}
                  </li>
                </ul>
              </div>

              <p v-if="activeMenu.conditions" class="small  mt-3">
                {{ activeMenu.conditions }}
              </p>

              <div v-if="activeMenu.price" class="text-accent fw-semibold mt-3">
                {{ formatPrice(activeMenu.price) }}
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const props = defineProps({
  id: { type: String, default: 'section-menu-11' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Menús' },
  subtitle: { type: String, default: 'Explora cada tipo de menú disponible.' },
  menus: { type: Array, required: true },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  swiperOptions: {
    type: Object,
    default: () => ({
      slidesPerView: 'auto',
      spaceBetween: 16,
      freeMode: true,
      pagination: false, 
      centeredSlides: false,
      grabCursor: true,
    }),
  },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const activeIndex = ref(0)
const activeMenu = computed(() => props.menus[activeIndex.value])

function setActive(i) {
  activeIndex.value = i
}

function formatPrice(value) {
  if (typeof value === 'string') return value
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value)
}

const swiperOptionsComputed = computed(() => ({
  ...props.swiperOptions,
}))
</script>

<style lang="less" scoped>
.section-menu-11 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.6);
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

  .section-title {
    color: var(--heading-color);
  }

  /* Tabs horizontales */
  .menu-tabs-horizontal {
    .menu-tab-slide {
      width: auto;
      min-width: 150px;
    }

    .nav-link {
      background: var(--surface-2);
      border: 1px solid var(--surface-border);
      color: var(--text);
      transition: all 0.25s ease;
      white-space: nowrap;

      &:hover {
        background: var(--surface-muted);
      }

      &.active {
        background: var(--accent);
        color: var(--accent-contrast);
        box-shadow: 0 6px 16px color-mix(in oklab, var(--accent), black 20%);
      }
    }
  }

  .menu-content-active {
    background: var(--surface-2);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid var(--surface-border);
    box-shadow: 0 6px 16px color-mix(in oklab, var(--accent), transparent 90%);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
