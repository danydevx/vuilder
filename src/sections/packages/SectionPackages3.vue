<template>
  <section
    :id="id"
    class="section section-packages-accordion py-5 position-relative overflow-hidden"
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

    <!-- 🧩 Contenido -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div
        class="row align-items-start g-5"
        :class="[
          justifyClass,
          { 'flex-row-reverse': order === 'inverted' }
        ]"
      >
        <!-- Columna izquierda: Accordion -->
        <div
          class="col-12 col-lg-6"
          :data-aos="order === 'inverted' ? 'fade-left' : 'fade-right'"
        >
          <div class="accordion" id="packagesAccordion">
            <div
              v-for="(pkg, i) in packages"
              :key="pkg.id || i"
              class="accordion-item border-0 mb-3 rounded-4 overflow-hidden shadow-sm"
            >
              <h2 class="accordion-header" :id="`heading-${pkg.id || i}`">
                <button
                  class="accordion-button fw-semibold"
                  :class="{ collapsed: activeIndex !== i }"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse-${pkg.id || i}`"
                  :aria-expanded="activeIndex === i"
                  :aria-controls="`collapse-${pkg.id || i}`"
                  @click="setActive(i)"
                >
                  <i
                    v-if="pkg.badgeIcon"
                    :class="pkg.badgeIcon"
                    class="me-2 text-accent"
                  ></i>
                  {{ pkg.name }}
                  <small
                    v-if="pkg.price"
                    class="ms-auto text-accent fw-semibold"
                  >
                    {{ formatPrice(pkg.price) }}
                  </small>
                </button>
              </h2>

              <div
                :id="`collapse-${pkg.id || i}`"
                class="accordion-collapse collapse"
                :class="{ show: activeIndex === i }"
                :aria-labelledby="`heading-${pkg.id || i}`"
                data-bs-parent="#packagesAccordion"
              >
                <div class="accordion-body">
                  <h6 v-if="pkg.subtitle" class=" mb-3">{{ pkg.subtitle }}</h6>

                  <!-- Meta -->
                  <ul
                    v-if="pkg.meta?.length"
                    class="list-unstyled small  mb-3"
                  >
                    <li
                      v-for="(meta, m) in pkg.meta"
                      :key="m"
                      class="mb-1 d-flex align-items-center"
                    >
                      <i :class="meta.icon" class="me-2 text-accent"></i>
                      {{ meta.text }}
                    </li>
                  </ul>

                  <!-- Features -->
                  <ul
                    v-if="pkg.features?.length"
                    class="list-unstyled mb-3"
                  >
                    <li
                      v-for="(feat, f) in pkg.features"
                      :key="f"
                      class="d-flex align-items-center mb-1"
                    >
                      <i :class="feat.icon" class="text-success me-2"></i>
                      {{ feat.text }}
                    </li>
                  </ul>

                  <p v-if="pkg.description" class="small  mb-3">
                    {{ pkg.description }}
                  </p>

                  <!-- Botones -->
                  <div v-if="pkg.ctas?.length" class="d-flex flex-wrap gap-2">
                    <a
                      v-for="(cta, c) in pkg.ctas"
                      :key="c"
                      :href="cta.href"
                      class="btn"
                      :class="[
                        cta.variant === 'outline'
                          ? 'btn-outline-secondary'
                          : 'btn-scheme',
                        'button-rounded'
                      ]"
                    >
                      <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
                      {{ cta.label }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna derecha: Imagen dinámica -->
        <div
          class="col-12 col-lg-6 text-center"
          :data-aos="order === 'inverted' ? 'fade-right' : 'fade-left'"
        >
          <div
            class="image-preview-wrapper rounded-4 overflow-hidden shadow-lg position-relative"
          >
            <transition name="fade" mode="out-in">
              <img
                v-if="activeImage"
                :key="activeImage"
                :src="activeImage"
                alt="Vista del paquete"
                class="img-fluid w-100 h-100 object-fit-cover"
              />
            </transition>
            <div class="image-overlay position-absolute top-0 start-0 w-100 h-100"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const props = defineProps({
  id: { type: String, default: 'section-packages-accordion' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Paquetes de Eventos' },
  subtitle: { type: String, default: 'Descubre nuestras opciones especiales' },
  packages: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' }, // left | center | right
  justify: { type: String, default: 'center' }, // start | center | end | between | around
  order: { type: String, default: 'normal' } // normal | inverted
})

const activeIndex = ref(0)
const activeImage = computed(() => props.packages[activeIndex.value]?.image || null)

function setActive(i) {
  activeIndex.value = i
}

function formatPrice(value) {
  if (typeof value === 'string') return value
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value)
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
.section-packages-accordion {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--muted);
    max-width: 40rem;
  }

  .accordion-button {
    background: var(--surface-2);
    color: var(--text);
    transition: background-color 0.2s ease, color 0.2s ease;
    border: none;
    box-shadow: none !important;

    &:not(.collapsed) {
      background: color-mix(in oklab, var(--accent), var(--surface) 88%);
      color: var(--text);
      font-weight: 600;
    }

    &:hover {
      background: var(--surface-muted);
    }

    &::after {
      filter: brightness(0.7);
    }
  }

  .accordion-body {
    background: var(--surface);
    color: var(--text);
    border-top: 1px solid var(--surface-border);
    transition: all 0.25s ease;
  }

  .btn-outline-secondary {
    border-color: var(--surface-border);
    color: var(--text);
    transition: all 0.25s ease;
    &:hover {
      background-color: var(--accent-muted);
      border-color: var(--accent);
    }
  }

  .image-preview-wrapper {
    position: relative;
    height: 100%;
    min-height: 380px;

    .image-overlay {
      background: linear-gradient(
        to top,
        color-mix(in oklab, var(--surface), transparent 40%),
        transparent 85%
      );
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  @media (max-width: 768px) {
    .image-preview-wrapper {
      min-height: 280px;
    }
  }
}
</style>
