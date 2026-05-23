<template>
  <section
    :id="id"
    class="section section-services-icons py-5 position-relative overflow-hidden"
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

      <!-- 🧩 Grid de íconos -->
      <div
        class="services-icon-grid d-flex flex-wrap gap-3 gap-md-4"
        :class="justifyClass"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        <div
          v-for="(svc, i) in services"
          :key="svc.title || i"
          class="icon-item position-relative text-center"
          @mouseenter="showTooltip(i)"
          @mouseleave="hideTooltip"
          @click="openModal(svc)"
        >
          <div class="icon-circle d-flex align-items-center justify-content-center rounded-circle">
            <i :class="svc.icon || 'bi bi-star'" class="fs-4"></i>
          </div>
          <small class="d-block mt-1 fw-medium">{{ svc.short || svc.title }}</small>

          <!-- Tooltip -->
          <transition name="fade">
            <div
              v-if="visibleTooltip === i"
              class="tooltip-box position-absolute p-2 rounded-3 shadow-sm"
            >
              <h6 class="fw-semibold mb-1">{{ svc.title }}</h6>
              <p v-if="svc.text" class="small m-0">{{ svc.text }}</p>
            </div>
          </transition>
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

          <!-- Imagen -->
          <figure
            v-if="activeService.image"
            class="ratio ratio-16x9 m-0 rounded-top overflow-hidden"
          >
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
  id: { type: String, default: 'section-services-4' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Amenidades y servicios' },
  subtitle: { type: String, default: '' },
  services: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' }, // left | center | right
  justify: { type: String, default: 'center' } // start | center | end | between | around
})

const visibleTooltip = ref(null)
const activeService = ref(null)

function showTooltip(i) {
  visibleTooltip.value = i
}
function hideTooltip() {
  visibleTooltip.value = null
}
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
</script>

<style lang="less" scoped>
.section-services-icons {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }
  .section-subtitle {
    color: var(--);
    max-width: 38rem;
  }

  /* Íconos */
  .icon-item {
    width: 80px;
    cursor: pointer;
    user-select: none;
    position: relative;

    .icon-circle {
      width: 58px;
      height: 58px;
      background: color-mix(in oklab, var(--surface-2), var(--surface-overlay, rgba(0, 0, 0, 0.05)) 15%);
      border: 1px solid var(--surface-border);
      color: var(--accent);
      transition: all 0.12s ease-in-out;
    }

    &:hover .icon-circle {
      background: color-mix(in oklab, var(--accent), white 85%);
      transform: scale(1.05);
    }

    small {
      color: var(--muted);
      font-size: 0.75rem;
      line-height: 1.2;
    }

    /* Tooltip */
    .tooltip-box {
      top: -110%;
      left: 50%;
      transform: translateX(-50%);
      background: var(--surface-2);
      color: var(--text);
      border: 1px solid var(--surface-border);
      width: 180px;
      text-align: left;
      z-index: 10;
      pointer-events: none;
    }

    @media (max-width: 768px) {
      .tooltip-box {
        top: auto;
        bottom: 110%;
      }
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
    max-width: 640px;
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
