<template>
  <section
    :id="id"
    class="section section-services-accordion py-5 position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🧭 Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <!-- Header -->
      <header
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

      <!-- 🧩 Contenido principal -->
      <div
        class="row align-items-start g-5"
        :class="justifyClass"
      >
        <!-- 🩰 Columna 1: Accordion -->
        <div
          class="col-12 col-lg-6"
          :class="{
            'order-2 order-lg-1': order === 'normal',
            'order-1 order-lg-2': order === 'inverted'
          }"
          data-aos="fade-right"
        >
          <div class="accordion" id="servicesAccordion">
            <div
              v-for="(svc, i) in services"
              :key="svc.title || i"
              class="accordion-item border-0 mb-3 rounded-4 overflow-hidden shadow-sm"
            >
              <h2 class="accordion-header" :id="`heading-${i}`">
                <button
                  class="accordion-button fw-semibold"
                  :class="{ collapsed: activeIndex !== i }"
                  type="button"
                  @click="setActive(i)"
                >
                  <i
                    v-if="svc.icon"
                    :class="svc.icon"
                    class="me-2 text-accent"
                  ></i>
                  {{ svc.title }}
                </button>
              </h2>

              <div
                :id="`collapse-${i}`"
                class="accordion-collapse collapse"
                :class="{ show: activeIndex === i }"
                :aria-labelledby="`heading-${i}`"
                data-bs-parent="#servicesAccordion"
              >
                <div class="accordion-body">
                  <h6 v-if="svc.subtitle" class=" mb-3">
                    {{ svc.subtitle }}
                  </h6>

                  <p v-if="svc.text" class="small  mb-3">
                    {{ svc.text }}
                  </p>

                  <ul
                    v-if="svc.features?.length"
                    class="list-unstyled mb-3 small "
                  >
                    <li
                      v-for="(feat, f) in svc.features"
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
                    v-if="svc.ctas?.length"
                    class="d-flex flex-wrap gap-2 mt-3"
                  >
                    <a
                      v-for="(cta, c) in svc.ctas"
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
          </div>
        </div>

        <!-- 🩰 Columna 2: Imagen dinámica -->
        <div
          class="col-12 col-lg-6 text-center"
          :class="{
            'order-1 order-lg-2': order === 'normal',
            'order-2 order-lg-1': order === 'inverted'
          }"
          data-aos="fade-left"
        >
          <div
            class="image-preview-wrapper rounded-4 overflow-hidden shadow-lg position-relative"
          >
            <transition name="fade" mode="out-in">
              <img
                v-if="activeImage"
                :key="activeImage"
                :src="activeImage"
                :alt="activeTitle"
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

const props = defineProps({
  id: { type: String, default: 'section-services-accordion' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Servicios detallados' },
  subtitle: { type: String, default: 'Explora cada opción disponible' },
  services: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 2 },
  align: { type: String, default: 'center' }, // left | center | right
  justify: { type: String, default: 'center' }, // start | center | end | between | around
  order: { type: String, default: 'normal' } // normal | inverted
})

const activeIndex = ref(0)
const activeImage = computed(() => props.services[activeIndex.value]?.image || null)
const activeTitle = computed(() => props.services[activeIndex.value]?.title || '')

function setActive(i) {
  activeIndex.value = i
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
.section-services-accordion {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }
  .section-subtitle {
    color: var(--muted);
    max-width: 38rem;
  }

  .accordion-button {
    background: var(--surface-2);
    color: var(--text);
    border: none;
    box-shadow: none !important;
    transition: all 0.25s ease;

    &:not(.collapsed) {
      background: color-mix(in oklab, var(--accent), var(--surface) 88%);
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

  /* Transición de fade */
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
      min-height: 260px;
    }
  }
}
</style>
