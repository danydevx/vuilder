<template>
  <section
    :id="id"
    class="section section-services-minimal position-relative overflow-hidden py-5"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🧭 Header -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']" data-aos="fade-up">
      <header
        class="section-header mb-5"
        :class="headerAlignClass"
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

    <!-- 🧩 Grid minimalista -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div class="row g-3 g-md-4 justify-content-center">
        <div
          v-for="(svc, i) in services"
          :key="i"
          class="col-6 col-md-4 col-lg-3"
          data-aos="fade-up"
          :data-aos-delay="i * 80"
        >
          <button
            class="service-minicard d-flex flex-column align-items-center text-center p-4 rounded-4 h-100"
            @click="openModal(svc)"
          >
            <div class="icon-wrap rounded-circle d-flex align-items-center justify-content-center mb-3">
              <i v-if="svc.icon" :class="svc.icon" class="fs-3"></i>
            </div>

            <h6 class="fw-semibold mb-1">{{ svc.title }}</h6>
            <p v-if="svc.subtitle" class="small text-accent mb-1">{{ svc.subtitle }}</p>
            <p v-if="svc.text" class="small  mb-0">{{ svc.text }}</p>
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
          <figure v-if="activeService.image" class="ratio ratio-16x9 mb-3">
            <img
              :src="activeService.image"
              :alt="activeService.title"
              class="w-100 h-100 object-fit-cover rounded-top-4"
            />
          </figure>

          <!-- Contenido -->
          <div class="p-4">
            <h6 v-if="activeService.subtitle" class="text-accent mb-2">
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
  id: { type: String, default: 'section-services-9' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Servicios esenciales' },
  subtitle: { type: String, default: 'Todo lo que necesitas, sin complicaciones' },
  services: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 4 }, // solo informativo aquí
  align: { type: String, default: 'center' }, // left | center | right
  justify: { type: String, default: 'center' }, // start | center | end | between | around
  order: { type: String, default: 'normal' } // solo se aplica cuando hay 2 columnas
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
</script>

<style lang="less" scoped>
.section-services-minimal {
  background: var(--surface);
  color: var(--text);
  transition: background-color 0.3s ease;

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--muted);
    max-width: 38rem;
  }

  .service-minicard {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: all 0.25s ease;
    cursor: pointer;

    &:hover {
      background: var(--surface);
      border-color: var(--accent);
      box-shadow: 0 6px 14px color-mix(in oklab, var(--accent), transparent 88%);
      transform: translateY(-3px);

      .icon-wrap {
        transform: scale(1.08);
        color: var(--accent);
      }
    }

    .icon-wrap {
      width: 52px;
      height: 52px;
      background: color-mix(in oklab, var(--surface), var(--surface-overlay, rgba(0, 0, 0, 0.04)) 25%);
      color: var(--accent);
      transition: transform 0.25s ease, color 0.25s ease;
    }

    h6 {
      color: var(--heading-color);
    }

    p {
      line-height: 1.4;
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
    backdrop-filter: blur(6px);

    @media (max-width: 768px) {
      align-items: flex-end;
      background: rgba(0, 0, 0, 0.35);
      padding: 0;
    }
  }

  .custom-modal {
    background: var(--surface);
    color: var(--text);
    width: 95%;
    max-width: 600px;
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

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--surface-border);
      border-radius: 999px;
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
    transition: opacity 0.15s ease-in-out;
  }
  .quickfade-enter-from,
  .quickfade-leave-to {
    opacity: 0;
  }

  .btn-outline-secondary {
    color: var(--text);
    border-color: var(--surface-border);
    transition: all 0.18s ease;
    &:hover {
      background-color: var(--accent-muted);
      border-color: var(--accent);
      transform: translateY(-1px);
    }
  }
}
</style>
