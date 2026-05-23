<template>
  <section
    :id="id"
    class="section section-packages-showcase-modal position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🧭 Header -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <header
        v-if="title || subtitle"
        class="section-header py-5"
        :class="headerAlignClass"
        data-aos="fade-up"
      >
        <h2 class="section-title  mb-0">{{ title }}</h2>
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

    <!-- 🧩 Showcase items -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div
        v-for="(pkg, i) in packages"
        :key="pkg.id || i"
        class="showcase-item d-flex flex-column flex-lg-row align-items-center mb-5"
        :class="[{ 'flex-lg-row-reverse': order === 'inverted' && i % 2 === 1 }]"
      >
        <!-- Imagen -->
        <div
          class="showcase-image col-12 col-lg-6 position-relative"
          role="button"
          tabindex="0"
          @click="openModal(pkg)"
          @keypress.enter="openModal(pkg)"
        >
          <figure class="m-0 ratio ratio-16x9 ratio-lg-1x1">
            <img
              :src="pkg.image"
              :alt="pkg.name"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
          </figure>

          <div class="image-overlay position-absolute top-0 start-0 w-100 h-100"></div>

          <div class="package-title position-absolute bottom-0 start-0 w-100 p-4">
            <h3 class="text-white  mb-1">{{ pkg.name }}</h3>
            <p class="text-white-50 small m-0">{{ pkg.subtitle }}</p>
          </div>
        </div>

        <!-- Contenido -->
        <div
          class="showcase-content col-12 col-lg-6 d-flex flex-column justify-content-center"
          :class="[boxed ? 'p-4 p-md-5' : 'p-0 ps-lg-5 pe-lg-4 py-5']"
          data-aos="fade-up"
        >
          <div v-if="pkg.badge" class="badge-chip mb-3 align-self-start">
            <i v-if="pkg.badgeIcon" :class="pkg.badgeIcon" class="me-1"></i>
            {{ pkg.badge }}
          </div>

          <h3 class="fw-bold mb-2">{{ pkg.name }}</h3>
          <p class=" mb-3">{{ pkg.subtitle }}</p>

          <ul class="list-unstyled small  mb-3">
            <li
              v-for="(feat, f) in pkg.features.slice(0, 3)"
              :key="f"
              class="d-flex align-items-center mb-1"
            >
              <i :class="feat.icon" class="me-2 text-success"></i>{{ feat.text }}
            </li>
          </ul>

          <p class="small  flex-grow-1">{{ pkg.description }}</p>

          <div class="d-flex flex-wrap gap-2 align-items-center mt-3">
            <span class="price-display fw-semibold text-accent me-3">
              {{ formatPrice(pkg.price) }}
              <small class=""> / {{ pkg.period }}</small>
            </span>

            <button class="btn btn-scheme" @click="openModal(pkg)">
              <i class="bi bi-eye me-1"></i> Ver detalles
            </button>
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
        <div class="custom-modal rounded-4 overflow-hidden shadow-lg">
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

const props = defineProps({
  id: { type: String, default: 'section-packages-showcase-modal' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Paquetes Destacados' },
  subtitle: { type: String, default: '' },
  packages: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  boxed: { type: Boolean, default: true },
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
.section-packages-showcase-modal {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--muted);
    max-width: 38rem;
  }

  .showcase-item {
    min-height: 60vh;

    &:nth-child(even) .image-overlay {
      background: linear-gradient(to left, rgba(0, 0, 0, 0.45), transparent 70%);
    }
    &:nth-child(odd) .image-overlay {
      background: linear-gradient(to right, rgba(0, 0, 0, 0.45), transparent 70%);
    }

    .showcase-image {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      img {
        transition: transform 0.5s ease;
      }
      &:hover img {
        transform: scale(1.05);
      }
    }

    .showcase-content {
      background: var(--surface);
      h3 {
        font-family: var(--font-heading);
      }
      .price-display {
        color: var(--accent);
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
    transform: scale(0.96);
    animation: modalPop 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

  @media (max-width: 992px) {
    .showcase-item {
      flex-direction: column !important;
      .showcase-content {
        padding: 2rem 1.25rem !important;
      }
    }
  }
}
</style>
