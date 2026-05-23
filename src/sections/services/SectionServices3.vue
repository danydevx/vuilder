<template>
  <section
    :id="id"
    class="section section-services-grid py-5 position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🧭 Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <!-- Header -->
      <header
        class="mb-4"
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

      <!-- 🧩 Grid -->
      <div
        class="row g-3 g-md-4"
        :class="justifyClass"
        data-aos="fade-up"
      >
        <div
          v-for="(svc, i) in services"
          :key="svc.title || i"
          :class="serviceColClass"
        >
          <button
            class="service-tile w-100 d-flex flex-column align-items-center justify-content-center text-center rounded-4 p-4"
            @click="openModal(svc)"
          >
            <div
              class="icon-wrap rounded-circle d-flex align-items-center justify-content-center mb-3"
            >
              <i v-if="svc.icon" :class="svc.icon" class="fs-3"></i>
            </div>
            <h5 class="fw-semibold mb-1">{{ svc.title }}</h5>
            <small v-if="svc.subtitle" class=" d-block">
              {{ svc.subtitle }}
            </small>
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
        <div class="custom-modal rounded-4 shadow-lg">
          <!-- Header -->
          <div
            class="modal-header p-3 border-0 d-flex justify-content-between align-items-center"
          >
            <h5 class="fw-bold m-0">{{ activeService.title }}</h5>
            <button
              class="btn btn-ghost p-0 fs-4 lh-1"
              @click="closeModal"
              aria-label="Cerrar"
            >
              <i class="bi bi-x"></i>
            </button>
          </div>

          <!-- Imagen principal -->
          <figure
            v-if="activeService.image"
            class="ratio ratio-16x9 m-0 rounded-top overflow-hidden"
          >
            <img
              :src="activeService.image"
              :alt="activeService.title"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
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
                <i
                  :class="feat.icon || 'bi bi-check-circle'"
                  class="me-2 text-accent"
                ></i>
                {{ feat.text || feat }}
              </li>
            </ul>

            <div
              v-if="activeService.ctas?.length"
              class="d-flex flex-wrap gap-2 mt-3"
            >
              <a
                v-for="(cta, c) in activeService.ctas"
                :key="c"
                :href="cta.href"
                class="btn"
                :class="cta.variant === 'outline'
                  ? 'btn-outline-secondary'
                  : 'btn-scheme'"
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
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-services-3' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Servicios visuales' },
  subtitle: { type: String, default: '' },
  services: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 3 },
  align: { type: String, default: 'center' }, // left | center | right
  justify: { type: String, default: 'center' } // start | center | end | between | around
})

const activeService = ref(null)

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

const justifyClass = computed(() => {
  const map = {
    start: 'justify-content-start',
    center: 'justify-content-center',
    end: 'justify-content-end',
    between: 'justify-content-between',
    around: 'justify-content-around'
  }
  return map[props.justify] || 'justify-content-center'
})

const serviceColClass = computed(() => {
  const colMap = {
    2: 'col-12 col-sm-6 col-lg-6',
    3: 'col-12 col-sm-6 col-lg-4',
    4: 'col-12 col-sm-6 col-lg-3'
  }
  return colMap[props.cols] || 'col-12 col-sm-6 col-lg-4'
})
</script>

<style lang="less" scoped>
.section-services-grid {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--);
    max-width: 38rem;
  }

  /* Tarjetas */
  .service-tile {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: all 0.12s ease-in-out;
    min-height: 140px;

    .icon-wrap {
      width: 58px;
      height: 58px;
      background: color-mix(in oklab, var(--surface), var(--surface-overlay, rgba(0, 0, 0, 0.04)) 20%);
      color: var(--accent);
      transition: transform 0.12s ease-in-out;
    }

    &:hover {
      transform: translateY(-3px);
      border-color: var(--accent);
      box-shadow: 0 4px 14px color-mix(in oklab, var(--accent), transparent 85%);
      .icon-wrap {
        transform: scale(1.08);
      }
    }

    &:active {
      transform: scale(0.98);
    }
  }

  /* Modal */
  .custom-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 1050;

    @media (max-width: 768px) {
      align-items: flex-end;
      background: rgba(0, 0, 0, 0.35);
    }
  }

  .custom-modal {
    background: var(--surface);
    color: var(--text);
    width: 95%;
    max-width: 720px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 1rem;
    box-shadow: var(--shadow-lg);
    animation: modalSlideUp 0.12s ease-out;
    transform-origin: bottom center;

    @media (max-width: 768px) {
      border-radius: 1rem 1rem 0 0;
      width: 100%;
      max-height: 85vh;
    }

    img {
      display: block;
    }
  }

  @keyframes modalSlideUp {
    from {
      transform: translateY(24px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Fade corto */
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
    transition: all 0.15s ease-in-out;
    &:hover {
      background-color: var(--accent-muted);
      border-color: var(--accent);
      transform: translateY(-1px);
    }
  }

  .text-accent {
    color: var(--accent);
  }
}
</style>
