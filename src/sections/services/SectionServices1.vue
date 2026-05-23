<template>
  <section
    :id="id"
    class="section section-services-modal py-5 position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🧭 Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <!-- Header -->
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

      <!--  Grid de Servicios -->
      <div class="row g-4 justify-content-center">
        <div
          v-for="(svc, i) in services"
          :key="i"
          :class="serviceColClass"
          data-aos="zoom-in"
          :data-aos-delay="100 * i"
        >
          <div
            class="service-item position-relative rounded-4 overflow-hidden shadow-sm"
            role="button"
            tabindex="0"
            @click="openModal(svc)"
            @keypress.enter="openModal(svc)"
          >
            <!-- Imagen -->
            <figure class="ratio ratio-4x3 m-0">
              <img
                :src="svc.image"
                :alt="svc.title"
                class="w-100 h-100 object-fit-cover img-fluid"
                loading="lazy"
              />
            </figure>

            <div class="overlay-gradient position-absolute top-0 start-0 w-100 h-100"></div>

            <!-- Info -->
            <div
              class="service-info position-absolute bottom-0 start-0 w-100 p-3 text-white"
            >
              <div class="d-flex align-items-center mb-1">
                <i v-if="svc.icon" :class="svc.icon" class="me-2 fs-5"></i>
                <h4 class="mb-0 ">{{ svc.title }}</h4>
              </div>
              <small v-if="svc.subtitle" class="text-white-50">
                {{ svc.subtitle }}
              </small>
            </div>
          </div>
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
        <div
          class="custom-modal rounded-4 overflow-hidden shadow-lg"
          data-aos="zoom-in"
        >
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
          <figure class="ratio ratio-16x9 m-0">
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
  id: { type: String, default: 'section-services-modal' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Servicios disponibles' },
  subtitle: { type: String, default: 'Conoce todo lo que ofrecemos para tu evento' },
  services: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 3 },
  align: { type: String, default: 'center' } // left | center | right
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

const headerAlignClass = computed(() => {
  return {
    'text-center': props.align === 'center',
    'text-start': props.align === 'left',
    'text-end': props.align === 'right'
  }
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
.section-services-modal {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--);
    max-width: 38rem;
  }

  .service-item {
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: var(--shadow-lg);
      .overlay-gradient {
        opacity: 0.35;
      }
    }

    .overlay-gradient {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent 70%);
      opacity: 0.5;
      transition: opacity 0.12s ease-in-out;
    }

    .service-info {
      z-index: 2;
      h4 {
        font-family: var(--font-heading);
        font-size: 1.15rem;
      }
      small {
        font-size: 0.85rem;
      }
    }
  }

  /* Modal */
  .custom-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    @media (max-width: 768px) {
      align-items: flex-end;
      background: rgba(0, 0, 0, 0.4);
    }
  }

  .custom-modal {
    background: var(--surface);
    color: var(--text);
    width: 95%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 1rem;
    box-shadow: var(--shadow-md);
    animation: modalPop 0.12s ease-out;
    transform-origin: center center;

    @media (max-width: 768px) {
      border-radius: 1rem 1rem 0 0;
      width: 100%;
      max-height: 80vh;
      animation: modalSlideUp 0.12s ease-out;
    }
  }

  @keyframes modalPop {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes modalSlideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
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
}
</style>
