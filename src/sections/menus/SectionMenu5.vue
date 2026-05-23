<template>
  <section
    :id="id"
    class="section section-menu-5 py-5 position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- 🔹 Fondo opcional -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <div
      :class="[fluid ? 'container-fluid' : 'container', 'position-relative']"
    >
      <!-- 🔹 Header -->
      <header class="text-center mb-5" data-aos="fade-up">
        <h2 class="section-title ">{{ title }}</h2>
        <p v-if="subtitle" class="section-subtitle mt-2">{{ subtitle }}</p>
      </header>

      <div class="row align-items-start g-5">
        <!-- 🔸 Acordeón de menús -->
        <div class="col-12 col-lg-6" data-aos="fade-right">
          <div class="accordion" id="menuAccordion">
            <div
              v-for="(menu, i) in menus"
              :key="menu.id || i"
              class="accordion-item border-0 mb-3 rounded-4 overflow-hidden shadow-sm"
            >
              <h2 class="accordion-header" :id="`heading-${menu.id}`">
                <button
                  class="accordion-button fw-semibold"
                  :class="{ collapsed: activeIndex !== i }"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse-${menu.id}`"
                  :aria-expanded="activeIndex === i"
                  :aria-controls="`collapse-${menu.id}`"
                  @click="setActive(i)"
                >
                  <i
                    v-if="menu.icon"
                    :class="menu.icon"
                    class="me-2 text-accent"
                  ></i>
                  {{ menu.title }}
                  <small
                    v-if="menu.price"
                    class="ms-auto text-accent fw-semibold"
                  >
                    {{ formatPrice(menu.price) }}
                  </small>
                </button>
              </h2>

              <div
                :id="`collapse-${menu.id}`"
                class="accordion-collapse collapse"
                :class="{ show: activeIndex === i }"
                :aria-labelledby="`heading-${menu.id}`"
                data-bs-parent="#menuAccordion"
              >
                <div class="accordion-body">
                  <h6 v-if="menu.subtitle" class=" mb-3">
                    {{ menu.subtitle }}
                  </h6>

                  <!-- 🔸 Platillos -->
                  <ul class="list-unstyled mb-3">
                    <li
                      v-for="(item, j) in menu.items"
                      :key="j"
                      class="d-flex align-items-center mb-1"
                    >
                      <i class="bi bi-check2-circle text-accent me-2"></i>
                      {{ item }}
                    </li>
                  </ul>

                  <!-- 🔸 Incluye -->
                  <div v-if="menu.includes?.length" class="mb-3">
                    <h6 class="fw-semibold mb-1">Incluye:</h6>
                    <ul class="list-unstyled small ">
                      <li v-for="(inc, k) in menu.includes" :key="k">
                        <i class="bi bi-dot me-1"></i>{{ inc }}
                      </li>
                    </ul>
                  </div>

                  <!-- 🔸 Extras -->
                  <div v-if="menu.extras?.length" class="mb-3">
                    <h6 class="fw-semibold mb-1">Extras:</h6>
                    <ul class="list-unstyled small ">
                      <li v-for="(extra, l) in menu.extras" :key="l">
                        <i class="bi bi-plus-circle me-1 text-accent"></i>{{ extra }}
                      </li>
                    </ul>
                  </div>

                  <!-- 🔸 Condiciones -->
                  <p v-if="menu.conditions" class="small  mt-3">
                    {{ menu.conditions }}
                  </p>

                  <!-- 🔸 Botones -->
                  <div v-if="menu.ctas?.length" class="d-flex flex-wrap gap-2 mt-3">
                    <a
                      v-for="(cta, c) in menu.ctas"
                      :key="c"
                      :href="cta.href"
                      class="btn"
                      :class="[
                        cta.variant === 'outline' ? 'btn-outline' : 'btn-scheme',
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

        <!-- 🔸 Imagen dinámica -->
        <div class="col-12 col-lg-6 text-center" data-aos="fade-left">
          <div class="image-preview-wrapper rounded-4 overflow-hidden shadow-lg position-relative">
            <transition name="fade" mode="out-in">
              <img
                v-if="activeImage"
                :key="activeImage"
                :src="activeImage"
                alt="Vista del menú"
                class="img-fluid w-100 h-100 object-fit-cover"
              />
            </transition>
            <div class="image-overlay position-absolute top-0 start-0 w-100 h-100"></div>
          </div>
        </div>
      </div>

      <!-- 🔹 CTAs globales -->
      <div
        v-if="ctas?.length"
        class="text-center mt-5"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <a
          v-for="(cta, i) in ctas"
          :key="i"
          :href="cta.href"
          class="btn me-2 mb-2"
          :class="[
            cta.variant === 'solid'
              ? 'btn-scheme'
              : cta.variant === 'outline'
              ? 'btn-outline'
              : 'btn-ghost'
          ]"
        >
          <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>{{ cta.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const props = defineProps({
  id: { type: String, default: 'section-menu-5' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Menús' },
  subtitle: { type: String, default: 'Explora nuestras opciones para cada tipo de evento.' },
  menus: { type: Array, required: true },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  ctas: { type: Array, default: () => [] },
})

const activeIndex = ref(0)
const activeImage = computed(() => props.menus[activeIndex.value]?.image || null)

function setActive(i) {
  activeIndex.value = i
}

function formatPrice(value) {
  if (typeof value === 'string') return value
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value)
}

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-menu-5 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.65);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      color-mix(in srgb, var(--surface-overlay) 60%, transparent),
      transparent 90%
    );
    z-index: 1;
  }

  .container,
  .container-fluid {
    position: relative;
    z-index: 2;
  }

  .accordion-button {
    background: var(--surface-2);
    color: var(--text);
    transition: background-color 0.2s ease, color 0.2s ease;

    &:not(.collapsed) {
      background: color-mix(in srgb, var(--accent), var(--surface) 85%);
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
  }

  .image-preview-wrapper {
    position: relative;
    height: 100%;
    min-height: 380px;

    .image-overlay {
      background: linear-gradient(
        to top,
        color-mix(in srgb, var(--surface-overlay) 80%, rgba(0, 0, 0, 0.4)),
        transparent 85%
      );
    }
  }

  .btn-outline {
    border-color: var(--surface-border);
    color: var(--text);

    &:hover {
      background-color: var(--accent);
      color: var(--accent-contrast);
      border-color: var(--accent);
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
      min-height: 260px;
    }
  }
}
</style>
