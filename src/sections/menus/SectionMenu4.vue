<template>
  <section
    :id="id"
    class="section section-menu-4 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- 🔹 Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- 🔹 Contenedor -->
    <div :class="[fluid ? 'container-fluid' : 'container', 'position-relative']">
      <!-- Header -->
      <header v-if="title || subtitle" class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 42rem">
          {{ subtitle }}
        </p>
      </header>

      <!-- 🔹 Swiper -->
      <Swiper
        class="menu-swiper"
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1"
        :space-between="24"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :breakpoints="{
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }"
      >
        <SwiperSlide
          v-for="(menu, i) in menus"
          :key="menu.id || i"
          class="h-auto"
        >
          <div
            class="menu-card position-relative rounded-4 overflow-hidden shadow-sm h-100"
            data-aos="fade-up"
            :data-aos-delay="i * 100"
            @click="openModal(menu)"
            role="button"
            tabindex="0"
            @keypress.enter="openModal(menu)"
          >
            <figure class="menu-figure ratio ratio-4x3 m-0">
              <img
                :src="menu.image"
                :alt="menu.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
              <div class="menu-overlay d-flex flex-column justify-content-end p-3">
                <div class="menu-text bg-glass rounded-4 p-3">
                  <h4 class="fw-bold mb-1">{{ menu.title }}</h4>
                  <p v-if="menu.subtitle" class=" small mb-2">
                    {{ menu.subtitle }}
                  </p>
                  <div v-if="menu.price" class="price fw-semibold text-accent mb-2">
                    {{ menu.price }}
                  </div>
                  <ul v-if="menu.items?.length" class="list-unstyled small mb-0">
                    <li
                      v-for="(item, j) in menu.items.slice(0, 3)"
                      :key="j"
                      class="d-flex align-items-center "
                    >
                      <i class="bi bi-dot text-accent me-1"></i>{{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </figure>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- 🔹 Modal -->
    <transition name="fade">
      <div
        v-if="activeMenu"
        class="custom-modal-backdrop d-flex align-items-center justify-content-center"
        @click.self="closeModal"
      >
        <div class="custom-modal rounded-4 overflow-hidden shadow-lg" data-aos="zoom-in">
          <!-- Header -->
          <div class="modal-header p-3 border-0 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold m-0">{{ activeMenu.title }}</h5>
            <button
              class="btn btn-ghost p-0 fs-4 lh-1"
              @click="closeModal"
              aria-label="Cerrar"
            >
              <i class="bi bi-x"></i>
            </button>
          </div>

          <!-- Imagen -->
          <figure class="ratio ratio-16x9 m-0">
            <img
              :src="activeMenu.image"
              :alt="activeMenu.title"
              class="w-100 h-100 object-fit-cover"
            />
          </figure>

          <!-- Contenido expandible -->
          <div class="modal-scroll p-4">
            <h6 v-if="activeMenu.subtitle" class=" mb-3">
              {{ activeMenu.subtitle }}
            </h6>

            <transition name="expand">
              <div
                ref="modalContentRef"
                class="modal-content-inner"
                :style="{ maxHeight: modalExpanded ? '1200px' : '280px' }"
              >
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
                  <ul class="list-unstyled small ">
                    <li v-for="(inc, k) in activeMenu.includes" :key="k">
                      <i class="bi bi-dot me-1"></i>{{ inc }}
                    </li>
                  </ul>
                </div>

                <div v-if="activeMenu.extras?.length" class="mb-3">
                  <h6 class="fw-semibold mb-1">Extras:</h6>
                  <ul class="list-unstyled small ">
                    <li v-for="(extra, l) in activeMenu.extras" :key="l">
                      <i class="bi bi-plus-circle me-1 text-accent"></i>{{ extra }}
                    </li>
                  </ul>
                </div>

                <p v-if="activeMenu.conditions" class="small  mt-3">
                  {{ activeMenu.conditions }}
                </p>
              </div>
            </transition>

            <!-- Botón Ver más -->
            <div v-if="showModalExpand" class="text-center mt-3 border-top pt-2">
              <button
                class="btn btn-sm btn-outline rounded-pill"
                @click="toggleModalExpand"
              >
                {{ modalExpanded ? 'Ver menos' : 'Ver más' }}
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer border-0 p-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div class="text-accent fw-semibold">{{ formatPrice(activeMenu.price) }}</div>
            <div class="d-flex flex-wrap gap-2">
              <a
                v-for="(cta, c) in activeMenu.ctas"
                :key="c"
                :href="cta.href"
                class="btn"
                :class="[
                  cta.variant === 'outline' ? 'btn-outline-secondary' : 'btn-scheme'
                ]"
              >
                <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>{{ cta.label }}
              </a>
              <a href="#contacto" class="btn btn-scheme">
                <i class="bi bi-envelope-paper me-1"></i> Solicitar cotización
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  id: { type: String, default: 'section-menu-4' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Menús Destacados' },
  subtitle: {
    type: String,
    default: 'Disfruta de una selección curada de platillos para todo tipo de evento.',
  },
  menus: { type: Array, required: true },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const activeMenu = ref(null)
const modalExpanded = ref(false)
const showModalExpand = ref(false)
const modalContentRef = ref(null)

function openModal(menu) {
  activeMenu.value = menu
  document.body.style.overflow = 'hidden'
  nextTick(() => checkModalOverflow())
}
function closeModal() {
  activeMenu.value = null
  document.body.style.overflow = ''
  modalExpanded.value = false
  showModalExpand.value = false
}
function toggleModalExpand() {
  modalExpanded.value = !modalExpanded.value
}
function checkModalOverflow() {
  if (modalContentRef.value) {
    showModalExpand.value = modalContentRef.value.scrollHeight > 280
  }
}
function formatPrice(value) {
  if (typeof value === 'string') return value
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>

<style lang="less" scoped>
.section-menu-4 {
  background: var(--surface);
  color: var(--text);

  .custom-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    z-index: 1050;
  }

  .custom-modal {
    background: var(--surface);
    color: var(--text);
    max-width: 800px;
    width: 95%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    border-radius: 1.2rem;
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    animation: modalPop 0.25s ease-out forwards;
  }

  /* Scroll interno */
  .modal-scroll {
    flex-grow: 1;
    overflow-y: auto;
    max-height: calc(90vh - 200px);
  }

  .modal-content-inner {
    overflow: hidden;
    transition: max-height 0.4s ease;
  }

  .btn-outline {
    border-color: var(--surface-border);
    color: var(--text);
    &:hover {
      background: var(--accent);
      color: var(--accent-contrast, #fff);
    }
  }

  .expand-enter-active,
  .expand-leave-active {
    transition: max-height 0.4s ease;
  }
  .expand-enter-from,
  .expand-leave-to {
    max-height: 280px;
  }

  @keyframes modalPop {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
