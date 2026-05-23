<template>
  <section
    :id="id"
    class="section section-menu-10 py-5 position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <!-- Contenedor -->
    <div :class="[fluid ? 'container-fluid' : 'container', 'position-relative']">
      <!-- Header -->
      <header v-if="title || subtitle" class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold section-title">{{ title }}</h2>
        <p v-if="subtitle" class="section-subtitle mt-2">{{ subtitle }}</p>
      </header>

      <div class="row g-5 align-items-start">
        <!-- 🔹 Tabs Verticales (Desktop) -->
        <div class="col-12 col-lg-4" data-aos="fade-right">
          <div class="menu-tabs-wrapper d-none d-lg-block">
            <div ref="tabsContainer" class="menu-tabs-scroll">
              <ul class="nav nav-pills flex-column gap-3" id="menuTabs" role="tablist">
                <li
                  v-for="(menu, i) in menus"
                  :key="menu.id || i"
                  class="nav-item"
                  role="presentation"
                >
                  <button
                    class="nav-link w-100 text-start fw-semibold rounded-3"
                    :class="{ active: activeIndex === i }"
                    type="button"
                    @click="setActive(i)"
                  >
                    <div class="d-flex justify-content-between align-items-center">
                      <span>{{ menu.title }}</span>
                      <small class="text-accent">{{ menu.price }}</small>
                    </div>
                    <p class="small  mb-0 mt-1">{{ menu.subtitle }}</p>
                  </button>
                </li>
              </ul>
            </div>

            <!-- Botones scroll -->
            <div
              v-if="showScrollControls"
              class="scroll-controls d-flex justify-content-between mt-3"
            >
              <button class="btn btn-sm btn-outline" @click="scrollTabs('up')">
                <i class="bi bi-chevron-up"></i>
              </button>
              <button class="btn btn-sm btn-outline" @click="scrollTabs('down')">
                <i class="bi bi-chevron-down"></i>
              </button>
            </div>
          </div>

          <!-- 🔹 Tabs móviles (Swiper horizontal) -->
          <div class="menu-tabs-swiper d-lg-none mb-4">
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
        </div>

        <!-- 🔹 Contenido del menú -->
        <div class="col-12 col-lg-8" data-aos="fade-left">
          <transition name="fade" mode="out-in">
            <div
              v-if="activeMenu"
              :key="activeMenu.id"
              class="tab-pane show active"
              role="tabpanel"
            >
              <div class="row g-4 align-items-center">
                <!-- Texto -->
                <div class="col-12 col-md-6">
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

                  <p
                    v-if="activeMenu.conditions"
                    class="small  mt-3 mb-3"
                  >
                    {{ activeMenu.conditions }}
                  </p>
                </div>

                <!-- Imagen -->
                <div class="col-12 col-md-6">
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
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const props = defineProps({
  id: { type: String, default: 'section-menu-10' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Menús' },
  subtitle: { type: String, default: 'Selecciona una categoría para explorar.' },
  menus: { type: Array, required: true },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  swiperOptionsMobile: {
    type: Object,
    default: () => ({
      slidesPerView: 'auto',
      spaceBetween: 12,
      freeMode: true,
      pagination: false, // ✅ sin dots por defecto
    }),
  },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const activeIndex = ref(0)
const activeMenu = computed(() => props.menus[activeIndex.value])

function setActive(i) {
  activeIndex.value = i
}

// Scroll vertical controlado
const tabsContainer = ref(null)
const showScrollControls = ref(false)

function checkScrollHeight() {
  const el = tabsContainer.value
  if (!el) return
  showScrollControls.value = el.scrollHeight > el.clientHeight
}

function scrollTabs(direction) {
  const el = tabsContainer.value
  if (!el) return
  const amount = el.clientHeight * 0.6
  el.scrollBy({ top: direction === 'down' ? amount : -amount, behavior: 'smooth' })
}

const swiperOptionsComputed = computed(() => ({
  ...props.swiperOptionsMobile,
}))

onMounted(async () => {
  await nextTick()
  checkScrollHeight()
  window.addEventListener('resize', checkScrollHeight)
})
</script>

<style lang="less" scoped>
.section-menu-10 {
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

  .nav-pills {
    .nav-link {
      background: var(--surface-2);
      border: 1px solid var(--surface-border);
      color: var(--text);
      transition: all 0.25s ease;
      &:hover {
        background: var(--surface-muted);
      }
      &.active {
        background: var(--accent);
        color: var(--accent-contrast);
      }
    }
  }

  .menu-tabs-scroll {
    max-height: 75vh;
    overflow-y: auto;
    padding-right: 4px;
  }

  .scroll-controls .btn {
    flex: 1;
    border-color: var(--surface-border);
    color: var(--text);
    &:hover {
      background: var(--accent);
      color: var(--accent-contrast);
    }
  }

  /* Swiper móvil */
  .menu-tabs-swiper {
    .menu-tab-slide {
      width: auto;
      min-width: 160px;
    }
    .nav-link {
      border: 1px solid var(--surface-border);
      background: var(--surface-2);
      &.active {
        background: var(--accent);
        color: var(--accent-contrast);
      }
    }
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
