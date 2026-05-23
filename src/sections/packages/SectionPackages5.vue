<template>
  <section
    :id="id"
    class="section section-packages-carousel-modal py-5 position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🧭 Header -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <header
        v-if="title || subtitle"
        class="section-header mb-5"
        :class="headerAlignClass"
        data-aos="fade-up"
      >
        <h2 class="section-title ">{{ title }}</h2>
        <p
          v-if="subtitle"
          class="section-subtitle mt-2"
          :class="{
            'mx-auto': align === 'center',
            'ms-auto me-0': align === 'right',
            'me-auto ms-0': align === 'left'
          }"
        >
          {{ subtitle }}
        </p>
      </header>
    </div>

    <!-- 🧩 Carrusel principal -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <Swiper
        class="packages-swiper"
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1"
        :space-between="boxed ? 24 : 16"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :dir="order === 'inverted' ? 'rtl' : 'ltr'"
        :breakpoints="{
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }"
      >
        <SwiperSlide
          v-for="(pkg, i) in packages"
          :key="pkg.id || i"
          class="h-auto"
        >
          <div
            class="package-item rounded-4 overflow-hidden shadow-sm h-100 position-relative"
            role="button"
            tabindex="0"
            @click="openModal(pkg)"
            @keypress.enter="openModal(pkg)"
            :class="{ 'content-boxed': boxed }"
          >
            <figure class="ratio ratio-4x3 m-0">
              <img
                :src="pkg.image"
                :alt="pkg.name"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </figure>

            <div class="overlay-gradient position-absolute top-0 start-0 w-100 h-100"></div>

            <div class="package-info position-absolute bottom-0 start-0 w-100 p-3">
              <h4 class="text-white  mb-1">{{ pkg.name }}</h4>
              <p v-if="pkg.subtitle" class="text-white-50 small mb-2">
                {{ pkg.subtitle }}
              </p>
              <div class="price text-white fw-semibold">
                {{ formatPrice(pkg.price) }}
                <small class="text-white-50"> / {{ pkg.period }}</small>
              </div>
            </div>

            <div
              v-if="pkg.badge"
              class="badge-chip position-absolute top-0 start-0 m-3"
            >
              <i v-if="pkg.badgeIcon" :class="pkg.badgeIcon" class="me-1"></i>
              {{ pkg.badge }}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- 💬 Modal -->
    <transition name="fade">
      <div
        v-if="activePackage"
        class="custom-modal-backdrop d-flex align-items-center justify-content-center"
        @click.self="closeModal"
      >
        <div
          class="custom-modal rounded-4 overflow-hidden shadow-lg"
          data-aos="zoom-in"
        >
          <div
            class="modal-header p-3 border-0 d-flex justify-content-between align-items-center"
          >
            <h5 class="fw-bold m-0">{{ activePackage.name }}</h5>
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
              :src="activePackage.image"
              :alt="activePackage.name"
              class="w-100 h-100 object-fit-cover"
            />
          </figure>

          <div class="p-4">
            <h6 v-if="activePackage.subtitle" class=" mb-3">
              {{ activePackage.subtitle }}
            </h6>

            <ul class="list-unstyled mb-3 small ">
              <li
                v-for="(meta, m) in activePackage.meta"
                :key="m"
                class="mb-1 d-flex align-items-center"
              >
                <i :class="meta.icon" class="me-2 text-accent"></i>{{ meta.text }}
              </li>
            </ul>

            <ul class="list-unstyled mb-3">
              <li
                v-for="(feat, f) in activePackage.features"
                :key="f"
                class="d-flex align-items-center mb-1"
              >
                <i :class="feat.icon" class="me-2 text-success"></i>{{ feat.text }}
              </li>
            </ul>

            <p v-if="activePackage.description" class="small ">
              {{ activePackage.description }}
            </p>
          </div>

          <div
            class="modal-footer border-0 p-4 d-flex justify-content-between align-items-center flex-wrap gap-2"
          >
            <div class="text-accent fw-semibold">
              {{ formatPrice(activePackage.price) }}
              <small class=""> / {{ activePackage.period }}</small>
            </div>

            <div class="d-flex flex-wrap gap-2">
              <a
                v-for="(cta, c) in activePackage.ctas"
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

              <a href="#contact" class="btn btn-scheme">
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
  id: { type: String, default: 'section-packages-carousel-modal' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Paquetes de Eventos' },
  subtitle: { type: String, default: '' },
  packages: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  boxed: { type: Boolean, default: false },
  align: { type: String, default: 'center' }, // left | center | right
  order: { type: String, default: 'normal' } // normal | inverted
})

const activePackage = ref(null)
const headerAlignClass = computed(() => ({
  'text-center': props.align === 'center',
  'text-start': props.align === 'left',
  'text-end': props.align === 'right'
}))

function openModal(pkg) {
  activePackage.value = pkg
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  activePackage.value = null
  document.body.style.overflow = ''
}
function formatPrice(value) {
  if (typeof value === 'string') return value
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value)
}
</script>

<style lang="less" scoped>
.section-packages-carousel-modal {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--muted);
    max-width: 38rem;
  }

  /* Swiper */
  .packages-swiper {
    .swiper-slide {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      &:hover {
        transform: translateY(-6px);
        box-shadow: var(--shadow-lg);
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
      transition: color 0.2s ease;
      &:hover {
        color: var(--accent-hover);
      }
    }
  }

  /* Package card */
  .package-item {
    cursor: pointer;
    position: relative;
    &.content-boxed {
      padding: 0.5rem;
    }

    .overlay-gradient {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 70%);
      opacity: 0.55;
      transition: opacity 0.25s ease;
    }

    &:hover .overlay-gradient {
      opacity: 0.35;
    }

    .package-info {
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
    overflow-y: auto;
    border-radius: 1.2rem;
    box-shadow: var(--shadow-lg);
    transform: scale(0.96);
    animation: modalPop 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  /* Fade transition */
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
      transform: scale(0.96);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
