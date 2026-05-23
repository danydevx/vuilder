<template>
  <section
    :id="id"
    class="section section-packages-swiper position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🧭 Header -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <header
        v-if="title || intro"
        class="section-header mb-5 pt-4"
        :class="headerAlignClass"
        data-aos="fade-up"
      >
        <h2 class="section-title ">{{ title }}</h2>
        <p
          v-if="intro"
          class="section-subtitle  mt-2"
          :class="{
            'mx-auto': align === 'center',
            'ms-auto me-0': align === 'right',
            'me-auto ms-0': align === 'left'
          }"
        >
          {{ intro }}
        </p>
      </header>
    </div>

    <!-- 🧩 Contenido -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <!-- Swiper layout si > 3 -->
      <div v-if="packages.length > 3" class="swiper-container-wrapper">
        <div
          ref="swiperEl"
          class="swiper packages-swiper"
          data-aos="zoom-in"
          data-aos-duration="700"
        >
          <div class="swiper-wrapper">
            <div v-for="(pkg, i) in packages" :key="pkg.id || i" class="swiper-slide">
              <article
                class="package-card card border-0 shadow-lg overflow-hidden h-100"
                @click="openModal(pkg)"
              >
                <figure class="package-media position-relative m-0">
                  <img
                    :src="pkg.image"
                    :alt="pkg.name"
                    class="w-100 h-100 object-fit-cover"
                    loading="lazy"
                  />
                  <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>
                  <div
                    v-if="pkg.badge"
                    class="badge-chip position-absolute top-0 start-0 m-3"
                  >
                    <i v-if="pkg.badgeIcon" :class="pkg.badgeIcon" class="me-1"></i>
                    {{ pkg.badge }}
                  </div>
                </figure>

                <div class="card-body p-4 d-flex flex-column">
                  <h4 class="fw-bold mb-1">{{ pkg.name }}</h4>
                  <p class=" small mb-3">{{ pkg.subtitle }}</p>

                  <div class="price text-accent fw-semibold mb-2">
                    {{ formatPrice(pkg.price) }}
                    <small class=""> / {{ pkg.period }}</small>
                  </div>

                  <ul class="list-unstyled small  mb-3">
                    <li
                      v-for="(feat, f) in pkg.features.slice(0, 3)"
                      :key="f"
                      class="d-flex align-items-center"
                    >
                      <i :class="feat.icon" class="me-2 text-success"></i>{{ feat.text }}
                    </li>
                  </ul>

                  <button class="btn btn-scheme w-100 mt-auto" @click.stop="openModal(pkg)">
                    <i class="bi bi-eye me-1"></i> Ver detalles
                  </button>
                </div>
              </article>
            </div>
          </div>

          <!-- Swiper controls -->
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev" aria-label="Anterior"></div>
          <div class="swiper-button-next" aria-label="Siguiente"></div>
        </div>
      </div>

      <!-- Grid layout si <= 3 -->
      <div v-else class="row g-4 justify-content-center" data-aos="fade-up">
        <div v-for="(pkg, i) in packages" :key="pkg.id || i" class="col-12 col-md-6 col-lg-4">
          <article
            class="package-card card border-0 shadow-sm h-100 overflow-hidden"
            @click="openModal(pkg)"
          >
            <figure class="ratio ratio-4x3 m-0">
              <img
                :src="pkg.image"
                :alt="pkg.name"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </figure>
            <div class="card-body p-4">
              <h5 class="fw-bold">{{ pkg.name }}</h5>
              <p class="small ">{{ pkg.subtitle }}</p>
              <div class="price text-accent fw-semibold mb-2">
                {{ formatPrice(pkg.price) }}
                <small class=""> / {{ pkg.period }}</small>
              </div>
              <button class="btn btn-scheme w-100" @click.stop="openModal(pkg)">Ver detalles</button>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- 💬 Modal -->
    <transition name="fade">
      <div
        v-if="activePackage"
        class="custom-modal-backdrop d-flex align-items-center justify-content-center"
        @click.self="closeModal"
      >
        <div class="custom-modal rounded-4 overflow-hidden shadow-lg">
          <div class="modal-header p-3 border-0 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold m-0">{{ activePackage.name }}</h5>
            <button class="btn btn-ghost p-0 fs-4 lh-1" @click="closeModal" aria-label="Cerrar">
              <i class="bi bi-x"></i>
            </button>
          </div>

          <figure class="ratio ratio-16x9 m-0">
            <img :src="activePackage.image" :alt="activePackage.name" class="w-100 h-100 object-fit-cover" />
          </figure>

          <div class="p-4">
            <h6 class=" mb-3">{{ activePackage.subtitle }}</h6>

            <ul class="list-unstyled mb-3 small ">
              <li v-for="(meta, m) in activePackage.meta" :key="m" class="mb-1 d-flex align-items-center">
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

            <p class="small ">{{ activePackage.description }}</p>
          </div>

          <div class="modal-footer border-0 p-4 d-flex justify-content-between flex-wrap gap-2">
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
                  cta.variant === 'outline' ? 'btn-outline-secondary' : 'btn-scheme'
                ]"
              >
                <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>{{ cta.label }}
              </a>

              <a href="#contact" class="btn btn-scheme">
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const props = defineProps({
  id: { type: String, default: 'section-packages-swiper' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Paquetes' },
  intro: { type: String, default: 'Explora las opciones más populares para tu evento' },
  packages: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' } // left | center | right
})

const swiperEl = ref(null)
const activePackage = ref(null)
let swiperInstance = null

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

onMounted(() => {
  if (props.packages.length > 3 && swiperEl.value) {
    swiperInstance = new Swiper(swiperEl.value, {
      slidesPerView: 1.15,
      spaceBetween: 16,
      centeredSlides: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 3,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      },
      loop: true,
      pagination: {
        el: swiperEl.value.querySelector('.swiper-pagination'),
        clickable: true
      },
      navigation: {
        prevEl: swiperEl.value.querySelector('.swiper-button-prev'),
        nextEl: swiperEl.value.querySelector('.swiper-button-next')
      },
      breakpoints: {
        576: { slidesPerView: 1.3 },
        768: { slidesPerView: 2.2 },
        992: { slidesPerView: 3 }
      }
    })
  }
})

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy(true, false)
    swiperInstance = null
  }
})
</script>

<style lang="less" scoped>
.section-packages-swiper {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--muted);
    max-width: 38rem;
  }

  .packages-swiper {
    padding-bottom: 3rem;

    .swiper-slide {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
    }

    .swiper-pagination-bullet {
      background: var(--accent);
      opacity: 0.5;
      &-active {
        opacity: 1;
        background: var(--accent-hover);
        transform: scale(1.25);
      }
    }

    .swiper-button-prev,
    .swiper-button-next {
      color: var(--accent);
      transition: color 0.25s ease;
      &:hover {
        color: var(--accent-hover);
      }
    }
  }

  .package-card {
    cursor: pointer;

    .overlay {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent 70%);
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

    scrollbar-width: thin;
    scrollbar-color: var(--surface-border) transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--surface-border);
      border-radius: 999px;
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
