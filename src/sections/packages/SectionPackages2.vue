<template>
  <section
    :id="id"
    class="section section-packages-visual py-5 position-relative overflow-hidden"
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

    <!-- 🧩 Grid -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div class="row g-4" :class="justifyClass">
        <div
          v-for="(pkg, i) in packages"
          :key="pkg.id || i"
          :class="['package-col', colClass]"
          data-aos="zoom-in"
          :data-aos-delay="100 * i"
        >
          <div
            class="package-item position-relative rounded-4 overflow-hidden shadow-sm"
            role="button"
            tabindex="0"
            @click="openModal(pkg)"
            @keypress.enter="openModal(pkg)"
          >
            <!-- Imagen -->
            <figure class="ratio ratio-4x3 m-0">
              <img
                :src="pkg.image"
                :alt="pkg.name"
                class="w-100 h-100 object-fit-cover img-fluid"
                loading="lazy"
              />
            </figure>

            <div class="overlay-gradient position-absolute top-0 start-0 w-100 h-100"></div>

            <!-- Info inferior -->
            <div class="package-info position-absolute bottom-0 start-0 w-100 p-3">
              <h4 class="mb-1  text-white">{{ pkg.name }}</h4>
              <div class="price text-white-50 fw-semibold">
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
        <div class="custom-modal rounded-4 overflow-hidden shadow-lg" data-aos="zoom-in">
          <!-- Header -->
          <div class="modal-header p-3 border-0 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold m-0">{{ activePackage.name }}</h5>
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
              :src="activePackage.image"
              :alt="activePackage.name"
              class="w-100 h-100 object-fit-cover"
            />
          </figure>

          <!-- Contenido -->
          <div class="p-4">
            <h6 v-if="activePackage.subtitle" class=" mb-3">
              {{ activePackage.subtitle }}
            </h6>

            <ul
              v-if="activePackage.meta?.length"
              class="list-unstyled mb-3 small "
            >
              <li
                v-for="(meta, m) in activePackage.meta"
                :key="m"
                class="mb-1 d-flex align-items-center"
              >
                <i :class="meta.icon" class="me-2 text-accent"></i>
                {{ meta.text }}
              </li>
            </ul>

            <ul
              v-if="activePackage.features?.length"
              class="list-unstyled mb-3"
            >
              <li
                v-for="(feat, f) in activePackage.features"
                :key="f"
                class="d-flex align-items-center mb-1"
              >
                <i :class="feat.icon" class="me-2 text-success"></i>
                {{ feat.text }}
              </li>
            </ul>

            <p v-if="activePackage.description" class="small ">
              {{ activePackage.description }}
            </p>
          </div>

          <!-- Footer -->
          <div
            class="modal-footer border-0 p-4 d-flex justify-content-between align-items-center flex-wrap gap-2"
          >
            <div class="text-accent fw-semibold">
              {{ formatPrice(activePackage.price) }}
              <small class=""> / {{ activePackage.period }}</small>
            </div>

            <div v-if="activePackage.ctas?.length" class="d-flex flex-wrap gap-2">
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
  id: { type: String, default: 'section-packages-visual' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Paquetes de Eventos' },
  subtitle: { type: String, default: 'Encuentra la opción perfecta para tu celebración' },
  packages: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 3 }, // ahora se usa dinámicamente
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  order: { type: String, default: 'normal' }
})

const activePackage = ref(null)

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

// 🔹 Alineación encabezado
const headerAlignClass = computed(() => ({
  'text-center': props.align === 'center',
  'text-start': props.align === 'left',
  'text-end': props.align === 'right'
}))

// 🔹 Distribución
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

// 🔹 Columnas dinámicas
const colClass = computed(() => {
  switch (props.cols) {
    case 1:
      return 'col-12'
    case 2:
      return 'col-12 col-md-6'
    case 3:
      return 'col-12 col-md-6 col-lg-4'
    case 4:
      return 'col-12 col-sm-6 col-lg-3'
    default:
      return 'col-12 col-md-6 col-lg-4'
  }
})
</script>

<style lang="less" scoped>
.section-packages-visual {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--muted);
    max-width: 38rem;
  }

  .package-item {
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease;

    &:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: var(--shadow-lg);
      .overlay-gradient {
        opacity: 0.35;
      }
    }

    .overlay-gradient {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent 70%);
      opacity: 0.5;
      transition: opacity 0.18s ease-in-out;
    }

    .package-info {
      z-index: 2;
      h4 {
        font-family: var(--font-heading);
        font-size: 1.3rem;
      }
      .price {
        font-size: 0.95rem;
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

  /* Modal personalizado */
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

  .btn-outline-secondary {
    color: var(--text);
    border-color: var(--surface-border);
    transition: all 0.18s ease-in-out;
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
    transition: opacity 0.18s ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
