<template>
  <section
    :id="id"
    class="section section-menu-6 py-5 position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- 🔹 Fondo opcional -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <div :class="[fluid ? 'container-fluid' : 'container', 'position-relative']">
      <!-- 🔹 Header -->
      <header class="text-center mb-5" data-aos="fade-up">
        <h2 class="section-title ">{{ title }}</h2>
        <p v-if="subtitle" class="section-subtitle mt-2">{{ subtitle }}</p>
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
            class="menu-item rounded-4 overflow-hidden shadow-sm h-100 position-relative"
            role="button"
            tabindex="0"
            @click="openModal(menu)"
            @keypress.enter="openModal(menu)"
          >
            <figure class="ratio ratio-4x3 m-0">
              <img
                :src="menu.image"
                :alt="menu.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </figure>

            <div class="overlay-gradient position-absolute top-0 start-0 w-100 h-100"></div>

            <div class="menu-info position-absolute bottom-0 start-0 w-100 p-3">
              <h4 class="text-white  mb-1">{{ menu.title }}</h4>
              <p v-if="menu.subtitle" class="text-white-50 small mb-2">
                {{ menu.subtitle }}
              </p>
              <div class="price text-white fw-semibold">
                {{ formatPrice(menu.price) }}
              </div>
            </div>

            <div
              v-if="menu.badge"
              class="badge-chip position-absolute top-0 start-0 m-3"
            >
              <i v-if="menu.badgeIcon" :class="menu.badgeIcon" class="me-1"></i>
              {{ menu.badge }}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- 🔹 Modal de detalle -->
<!-- 🔹 Modal de detalle -->
<transition name="fade">
  <div
    v-if="activeMenu"
    class="custom-modal-backdrop d-flex align-items-center justify-content-center"
    @click.self="closeModal"
  >
    <div class="custom-modal rounded-4 shadow-lg" data-aos="zoom-in">
      <!-- 🔸 Header fijo -->
      <div class="modal-header p-3 border-0 d-flex justify-content-between align-items-center sticky-top">
        <h5 class="fw-bold m-0">{{ activeMenu.title }}</h5>
        <button
          class="btn btn-ghost p-0 fs-4 lh-1"
          @click="closeModal"
          aria-label="Cerrar"
        >
          <i class="bi bi-x"></i>
        </button>
      </div>

      <!-- 🔸 Imagen -->
      <figure class="ratio ratio-16x9 m-0">
        <img
          :src="activeMenu.image"
          :alt="activeMenu.title"
          class="w-100 h-100 object-fit-cover"
        />
      </figure>

      <!-- 🔸 Contenido scrollable -->
      <div class="modal-body-scroll p-4">
        <h6 v-if="activeMenu.subtitle" class=" mb-3">
          {{ activeMenu.subtitle }}
        </h6>

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

      <!-- 🔸 Footer fijo -->
      <div
        class="modal-footer border-0 p-4 d-flex justify-content-between align-items-center flex-wrap gap-2 sticky-bottom"
      >
        <div class="text-accent fw-semibold">
          {{ formatPrice(activeMenu.price) }}
        </div>

        <div class="d-flex flex-wrap gap-2">
          <a
            v-for="(cta, c) in activeMenu.ctas"
            :key="c"
            :href="cta.href"
            class="btn"
            :class="[
              cta.variant === 'outline'
                ? 'btn-outline-secondary'
                : 'btn-scheme'
            ]"
          >
            <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
            {{ cta.label }}
          </a>

          <a href="#contacto" class="btn btn-scheme">
            <i class="bi bi-envelope-paper me-1"></i>
            Solicitar cotización
          </a>
        </div>
      </div>
    </div>
  </div>
</transition>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  id: { type: String, default: 'section-menu-6' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Menús Especiales' },
  subtitle: { type: String, default: 'Elige entre nuestras opciones más populares' },
  menus: { type: Array, required: true },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
})

const activeMenu = ref(null)

function openModal(menu) {
  activeMenu.value = menu
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  activeMenu.value = null
  document.body.style.overflow = ''
}
function formatPrice(value) {
  if (typeof value === 'string') return value
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value)
}

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-menu-6 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.6);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, var(--surface-overlay) 60%, transparent);
    z-index: 1;
  }

  .container,
  .container-fluid {
    position: relative;
    z-index: 2;
  }

  /* Swiper */
  .menu-swiper {
    .swiper-slide {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 8px 20px color-mix(in srgb, var(--accent) 25%, transparent);
      }
    }

    .swiper-pagination-bullet {
      background: var(--accent);
      opacity: 0.5;
      transition: all 0.25s ease;
      &-active {
        opacity: 1;
        transform: scale(1.2);
      }
    }

    .swiper-button-next,
    .swiper-button-prev {
      color: var(--accent);
      &:hover {
        color: var(--accent-hover);
      }
    }
  }

  /* Card */
  .menu-item {
    cursor: pointer;
    position: relative;

    .overlay-gradient {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 70%);
      opacity: 0.55;
      transition: opacity 0.25s ease;
    }

    &:hover .overlay-gradient {
      opacity: 0.3;
    }

    .menu-info {
      z-index: 2;
      h4 {
        font-family: var(--font-heading);
        font-size: 1.25rem;
      }
      .price {
        font-size: 0.9rem;
      }
    }

    .badge-chip {
      background: var(--accent);
      color: var(--accent-contrast);
      font-size: 0.75rem;
      padding: 0.35rem 0.7rem;
      border-radius: 999px;
      font-weight: 600;
    }
  }

  /* Modal */
  .custom-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    z-index: 1050;
  }

  /* Modal Backdrop */
/* Modal */
.custom-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 2rem 1rem;
}

.custom-modal {
  background: var(--surface);
  color: var(--text);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  box-shadow: var(--shadow-lg);
  animation: modalPop 0.25s ease-out forwards;
  overflow: hidden; /* mantiene header y footer fijos visualmente */
}

/* Contenido con scroll interno */
.modal-body-scroll {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding-bottom: 2rem;

  scrollbar-width: thin;
  scrollbar-color: var(--surface-border) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--surface-border);
    border-radius: 999px;
  }
}

/* Header y footer fijos */
.modal-header,
.modal-footer {
  background: var(--surface);
  z-index: 5;
}

.modal-header {
  position: sticky;
  top: 0;
  border-bottom: 1px solid var(--surface-border);
}

.modal-footer {
  position: sticky;
  bottom: 0;
  border-top: 1px solid var(--surface-border);
}

/* Responsive: fullscreen en móvil */
@media (max-width: 768px) {
  .custom-modal-backdrop {
    align-items: stretch;
    padding: 0;
  }

  .custom-modal {
    border-radius: 0;
    max-height: 100vh;
  }

  .modal-footer {
    padding: 1rem;
  }
}

/* Animaciones */
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


  /* Buttons */
  .btn-outline-secondary {
    border-color: var(--surface-border);
    color: var(--text);
    &:hover {
      background-color: var(--accent-muted);
      border-color: var(--accent);
    }
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
