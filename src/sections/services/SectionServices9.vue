<template>
  <section
    :id="id"
    class="section section-services-icons position-relative overflow-hidden py-5"
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

    <!-- 💠 Íconos circulares -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']" data-aos="fade-up" data-aos-delay="100">
      <div class="services-icons-row d-flex flex-wrap justify-content-center gap-3 gap-md-4">
        <div
          v-for="(svc, i) in services"
          :key="i"
          class="service-icon-col text-center"
          @click="openModal(svc)"
          :data-aos-delay="i * 50"
        >
          <div class="icon-btn d-flex align-items-center justify-content-center mx-auto">
            <i v-if="svc.icon" :class="svc.icon"></i>
          </div>
          <small class="icon-label d-block mt-2">{{ svc.title }}</small>
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
  id: { type: String, default: 'section-services-icons' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Servicios destacados' },
  subtitle: { type: String, default: 'Explora los espacios y amenidades' },
  services: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 5 }, // informativo
  align: { type: String, default: 'center' }, // left | center | right
  justify: { type: String, default: 'center' }, // start | center | end | between | around
  order: { type: String, default: 'normal' } // solo se aplica en secciones 2-cols
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
.section-services-icons {
  background: var(--surface);
  color: var(--text);
  text-align: center;

  .section-title {
    color: var(--heading-color);
  }
  .section-subtitle {
    color: var(--muted);
    max-width: 40rem;
  }

  /* ===== Grid flexible ===== */
  .services-icons-row {
    row-gap: 1.5rem;
    column-gap: 1.5rem;
  }

  .service-icon-col {
    cursor: pointer;
    flex: 0 1 12%;
    max-width: 140px;
    min-width: 90px;

    @media (max-width: 992px) {
      flex: 0 1 18%;
      max-width: 120px;
    }

    @media (max-width: 768px) {
      flex: 0 1 22%;
      max-width: 100px;
    }

    @media (max-width: 576px) {
      flex: 0 1 28%;
      max-width: 85px;
    }
  }

  /* ===== Círculo ===== */
  .icon-btn {
    aspect-ratio: 1 / 1;
    width: 100%;
    background: color-mix(in oklab, var(--surface-2), var(--surface-overlay) 20%);
    border-radius: 50%;
    color: var(--accent);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease;
    box-shadow: 0 2px 6px color-mix(in oklab, var(--accent), transparent 90%);

    &:hover {
      background: var(--accent);
      color: var(--accent-contrast);
      transform: translateY(-3px);
      box-shadow: 0 8px 18px color-mix(in oklab, var(--accent), transparent 80%);
    }

    i {
      font-size: clamp(1.4rem, 2vw, 2rem);
      line-height: 1;
    }
  }

  /* ===== Texto debajo ===== */
  .icon-label {
    font-size: clamp(0.7rem, 1vw, 0.85rem);
    color: var(--text);
    font-weight: 500;
    line-height: 1.2;
    margin-top: 0.5rem;
    word-break: break-word;
  }

  /* ===== Modal ===== */
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
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 1rem;
    box-shadow: var(--shadow-lg);
    animation: modalSlideUp 0.15s ease-out;

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
