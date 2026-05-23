<template>
  <section
    :id="id"
    class="section section-services-masonry position-relative overflow-hidden py-5"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🧭 Contenedor del header -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']" data-aos="fade-up">
      <header
        class="section-header mb-5"
        :class="headerAlignClass"
      >
        <h2 class="section-title "  :class="{
            'mx-auto': align === 'center',
            'ms-auto me-0': align === 'right',
            'me-auto ms-0': align === 'left'
          }">{{ title }}</h2>
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

    <!-- 🧩 Swiper Masonry -->
    <div
      :class="[fluid ? 'container-fluid px-0' : 'container px-0']"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div ref="swiperEl" class="swiper services-masonry-swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(svc, i) in services"
            :key="i"
            class="swiper-slide masonry-card rounded-4 overflow-hidden shadow-sm position-relative"
            @click="openModal(svc)"
          >
            <div
              class="card-bg"
              :style="svc.image ? { backgroundImage: `url('${svc.image}')` } : {}"
            ></div>

            <div class="card-overlay d-flex flex-column justify-content-end p-4">
              <div class="icon-wrap mb-2">
                <i v-if="svc.icon" :class="svc.icon" class="fs-4"></i>
              </div>
              <h5 class="fw-semibold mb-1">{{ svc.title }}</h5>
              <p v-if="svc.subtitle" class="small text-accent mb-2">
                {{ svc.subtitle }}
              </p>
              <p v-if="svc.text" class="small  mb-0">
                {{ svc.text }}
              </p>
            </div>
          </div>
        </div>

        <!-- Controles -->
        <div class="swiper-nav position-absolute top-50 start-0 translate-middle-y w-100 px-3 d-flex justify-content-between">
          <button class="btn-nav btn-prev rounded-circle d-flex align-items-center justify-content-center">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="btn-nav btn-next rounded-circle d-flex align-items-center justify-content-center">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 💬 Modal -->
    <transition name="quickfade">
      <div
        v-if="activeService"
        class="custom-modal-backdrop d-flex align-items-center justify-content-center"
        @click.self="closeModal"
      >
        <div class="custom-modal rounded-4 shadow-lg overflow-hidden">
          <!-- Header -->
          <div class="modal-header p-3 border-0 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold m-0">{{ activeService.title }}</h5>
            <button
              class="btn btn-ghost p-0 fs-4 lh-1"
              @click="closeModal"
              aria-label="Cerrar"
            >
              <i class="bi bi-x"></i>
            </button>
          </div>

          <!-- Imagen -->
          <figure v-if="activeService.image" class="ratio ratio-16x9 m-0">
            <img
              :src="activeService.image"
              :alt="activeService.title"
              class="w-100 h-100 object-fit-cover"
            />
          </figure>

          <!-- Contenido -->
          <div class="p-4">
            <h6 v-if="activeService.subtitle" class=" mb-2">
              {{ activeService.subtitle }}
            </h6>
            <p v-if="activeService.text" class="small  mb-3">
              {{ activeService.text }}
            </p>

            <ul
              v-if="activeService.features?.length"
              class="list-unstyled mb-3 small "
            >
              <li
                v-for="(feat, f) in activeService.features"
                :key="f"
                class="d-flex align-items-center mb-1"
              >
                <i :class="feat.icon || 'bi bi-check-circle'" class="me-2 text-accent"></i>
                {{ feat.text || feat }}
              </li>
            </ul>

            <div v-if="activeService.ctas?.length" class="d-flex flex-wrap gap-2 mt-3">
              <a
                v-for="(cta, c) in activeService.ctas"
                :key="c"
                :href="cta.href"
                class="btn"
                :class="cta.variant === 'outline' ? 'btn-outline-secondary' : 'btn-scheme'"
              >
                <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
                {{ cta.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps({
  id: { type: String, default: 'section-services-6' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Servicios visuales' },
  subtitle: { type: String, default: 'Explora los espacios y servicios destacados' },
  services: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' }, // left | center | right
  justify: { type: String, default: 'center' }, // start | center | end | between | around
  cols: { type: Number, default: 1 }, // mantenemos la prop aunque no aplica
  order: { type: String, default: 'normal' } // solo se usa en secciones de dos columnas
})

const swiperEl = ref(null)
const activeService = ref(null)

onMounted(() => {
  new Swiper(swiperEl.value, {
    modules: [Navigation],
    slidesPerView: 1.2,
    spaceBetween: 16,
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev'
    },
    breakpoints: {
      576: { slidesPerView: 1.5 },
      768: { slidesPerView: 2.5 },
      992: { slidesPerView: 3.5 },
      1200: { slidesPerView: 4 }
    }
  })
})

function openModal(svc) {
  activeService.value = svc
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  activeService.value = null
  document.body.style.overflow = ''
}

const headerAlignClass = computed(() => ({
  'text-center': props.align === 'center',
  'text-start': props.align === 'left',
  'text-end': props.align === 'right'
}))
</script>

<style lang="less" scoped>
.section-services-masonry {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }
  .section-subtitle {
    color: var(--muted);
    max-width: 40rem;
  }

  /* Swiper */
  .services-masonry-swiper {
    padding-bottom: 2rem;

    .swiper-slide {
      height: 340px;
      min-width: 260px;
      border: 1px solid var(--surface-border);
      cursor: pointer;
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px color-mix(in oklab, var(--accent), transparent 88%);
      }
    }
  }

  .masonry-card {
    position: relative;
    overflow: hidden;

    .card-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      filter: brightness(0.9);
      transition: transform 0.4s ease;
    }

    &:hover .card-bg {
      transform: scale(1.05);
    }

    .card-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 1.5rem;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.65),
        rgba(0, 0, 0, 0.25) 40%,
        rgba(0, 0, 0, 0)
      );
      color: var(--text-inverse);
      z-index: 1;

      .icon-wrap {
        color: var(--accent-secondary, var(--accent));
      }

      h5, p {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
      }
    }
  }

  /* Navegación */
  .swiper-nav .btn-nav {
    width: 38px;
    height: 38px;
    background: color-mix(in oklab, var(--surface), var(--surface-overlay, rgba(0, 0, 0, 0.04)) 15%);
    border: 1px solid var(--surface-border);
    color: var(--text);
    transition: all 0.15s ease;

    &:hover {
      background: var(--accent);
      color: var(--accent-contrast);
    }
  }

  @media (max-width: 768px) {
    .swiper-nav {
      display: none;
    }
  }

  /* Modal */
  .custom-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    backdrop-filter: blur(4px);
    padding: 1rem;

    @media (max-width: 768px) {
      align-items: flex-end;
      background: rgba(0, 0, 0, 0.35);
    }
  }

  .custom-modal {
    background: var(--surface);
    color: var(--text);
    width: 95%;
    max-width: 640px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 1rem;
    animation: modalSlideUp 0.12s ease-out;
    transform-origin: bottom center;
  }

  @keyframes modalSlideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .quickfade-enter-active,
  .quickfade-leave-active {
    transition: opacity 0.12s ease-in-out;
  }
  .quickfade-enter-from,
  .quickfade-leave-to {
    opacity: 0;
  }

  .btn-outline-secondary {
    color: var(--text);
    border-color: var(--surface-border);
    transition: all 0.15s ease;
    &:hover {
      background-color: var(--accent-muted);
      border-color: var(--accent);
    }
  }
}
</style>
