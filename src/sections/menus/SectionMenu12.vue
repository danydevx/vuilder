<template>
  <section
    :id="id"
    class="section section-menu-12 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- 🔹 Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <!-- 🔹 Contenedor -->
    <div :class="[fluid ? 'container-fluid' : 'container', 'position-relative']">
      <!-- Header -->
      <header
        v-if="title || subtitle"
        class="text-center mb-5"
        data-aos="fade-up"
      >
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p
          v-if="subtitle"
          class=" mx-auto"
          style="max-width: 42rem"
        >
          {{ subtitle }}
        </p>
      </header>

      <!-- ✅ Swiper si hay más de “cols” -->
      <div v-if="menus.length > cols" class="swiper-container-wrapper">
        <Swiper v-bind="swiperOptionsComputed" class="menus-swiper" data-aos="fade-up">
          <SwiperSlide
            v-for="(menu, i) in menus"
            :key="menu.id || i"
            class="swiper-slide"
          >
            <article
              class="menu-card card border-0 shadow-lg overflow-hidden h-100"
              @click="openModal(menu)"
            >
              <figure class="menu-media position-relative m-0 ratio ratio-4x3">
                <img
                  :src="menu.image"
                  :alt="menu.title"
                  class="w-100 h-100 object-fit-cover"
                  loading="lazy"
                />
                <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>
              </figure>

              <div class="card-body p-4 d-flex flex-column">
                <h4 class="fw-bold mb-1">{{ menu.title }}</h4>
                <p class=" small mb-2">{{ menu.subtitle }}</p>
                <div class="text-accent fw-semibold mb-3">{{ menu.price }}</div>

                <ul class="list-unstyled small  mb-3">
                  <li
                    v-for="(item, j) in menu.items.slice(0, 3)"
                    :key="j"
                    class="d-flex align-items-center"
                  >
                    <i class="bi bi-check2-circle me-2 text-accent"></i>{{ item }}
                  </li>
                </ul>

                <button
                  class="btn btn-scheme mt-auto w-100"
                  @click.stop="openModal(menu)"
                >
                  <i class="bi bi-eye me-1"></i> Ver detalles
                </button>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- ✅ Grid normal si hay pocos menús -->
      <div v-else class="row g-4 justify-content-center" data-aos="fade-up">
        <div
          v-for="(menu, i) in menus"
          :key="menu.id || i"
          class="col-12 col-sm-6 col-lg-4"
        >
          <article
            class="menu-card card border-0 shadow-sm h-100 overflow-hidden"
            @click="openModal(menu)"
          >
            <figure class="ratio ratio-4x3 m-0">
              <img
                :src="menu.image"
                :alt="menu.title"
                class="w-100 h-100 object-fit-cover"
              />
            </figure>
            <div class="card-body p-4">
              <h5 class="fw-bold">{{ menu.title }}</h5>
              <p class="small ">{{ menu.subtitle }}</p>
              <div class="text-accent fw-semibold mb-3">{{ menu.price }}</div>
              <button
                class="btn btn-scheme w-100"
                @click.stop="openModal(menu)"
              >
                Ver detalles
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- 🔹 Modal -->
    <transition name="fade">
      <div
        v-if="activeMenu"
        class="custom-modal-backdrop d-flex align-items-center justify-content-center"
        @click.self="closeModal"
      >
        <div class="custom-modal rounded-4 overflow-hidden shadow-lg">
          <div
            class="modal-header p-3 border-0 d-flex justify-content-between align-items-center"
          >
            <h5 class="fw-bold m-0">{{ activeMenu.title }}</h5>
            <button
              class="btn btn-ghost p-0 fs-4 lh-1"
              @click="closeModal"
              aria-label="Cerrar"
            >
              <i class="bi bi-x"></i>
            </button>
          </div>

          <figure class="ratio ratio-16x9 m-0">
            <img
              :src="activeMenu.image"
              :alt="activeMenu.title"
              class="w-100 h-100 object-fit-cover"
            />
          </figure>

          <div class="p-4 modal-scroll">
            <h6 class=" mb-3">{{ activeMenu.subtitle }}</h6>

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

                <p
                  v-if="activeMenu.conditions"
                  class="small  mt-3"
                >
                  {{ activeMenu.conditions }}
                </p>
              </div>
            </transition>

            <!-- Botón ver más -->
            <div v-if="showModalExpand" class="text-center mt-3 border-top pt-2">
              <button
                class="btn btn-sm btn-outline rounded-pill"
                @click="toggleModalExpand"
              >
                {{ modalExpanded ? 'Ver menos' : 'Ver más' }}
              </button>
            </div>
          </div>

          <div
            class="modal-footer border-0 p-4 d-flex justify-content-between align-items-center flex-wrap gap-2"
          >
            <div class="text-accent fw-semibold">{{ activeMenu.price }}</div>
            <a href="#contact" class="btn btn-scheme">
              <i class="bi bi-envelope-paper me-1"></i> Solicitar cotización
            </a>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

const props = defineProps({
  id: { type: String, default: 'section-menu-12' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Menús' },
  subtitle: { type: String, default: 'Disfruta de la experiencia completa.' },
  menus: { type: Array, required: true },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 3 },
  swiperOptions: {
    type: Object,
    default: () => ({
      modules: [EffectCoverflow, Navigation],
      slidesPerView: 1.15,
      spaceBetween: 16,
      centeredSlides: true,
      loop: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 3,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      breakpoints: {
        576: { slidesPerView: 1.3 },
        768: { slidesPerView: 2.2 },
        992: { slidesPerView: 3 },
      },
    }),
  },
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

const swiperOptionsComputed = computed(() => ({
  ...props.swiperOptions,
}))
</script>

<style lang="less" scoped>
.section-menu-12 {
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

  /* ✅ Swiper */
  .menus-swiper {
    padding-bottom: 3rem;
    .swiper-slide {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
      }
    }
  }

  /* ✅ Card */
  .menu-card {
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden;

    .menu-media {
      .overlay {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent 70%);
      }
    }

    .badge-chip {
      background: var(--accent);
      color: var(--accent-contrast);
      font-size: 0.75rem;
      padding: 0.4rem 0.7rem;
      border-radius: 999px;
      font-weight: 600;
    }
  }

  .custom-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
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
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    transform: scale(0.96);
    animation: modalPop 0.25s ease-out forwards;
  }

  .modal-scroll {
    flex-grow: 1;
    overflow-y: auto;
    max-height: calc(90vh - 200px);
  }

  .modal-content-inner {
    overflow: hidden;
    transition: max-height 0.4s ease;
  }

  .expand-enter-active,
  .expand-leave-active {
    transition: max-height 0.4s ease;
  }

  .expand-enter-from,
  .expand-leave-to {
    max-height: 280px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
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
