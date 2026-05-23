<template>
  <section
    :id="id"
    class="section section-packages-tabs py-5 position-relative overflow-hidden"
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
        class="row g-5 align-items-start"
        :class="[{ 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- 🗂️ Tabs de paquetes -->
        <div
          class="col-12 col-lg-4"
          :data-aos="order === 'inverted' ? 'fade-left' : 'fade-right'"
        >
          <ul class="nav nav-pills flex-column gap-3" id="packageTabs" role="tablist">
            <li
              v-for="(pkg, i) in packages"
              :key="pkg.id || i"
              class="nav-item"
              role="presentation"
            >
              <button
                class="nav-link w-100 text-start fw-semibold rounded-3"
                :class="{ active: activeIndex === i }"
                type="button"
                role="tab"
                :aria-controls="`tab-${pkg.id}`"
                :aria-selected="activeIndex === i"
                @click="setActive(i)"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <span>
                    <i
                      v-if="pkg.badgeIcon"
                      :class="pkg.badgeIcon"
                      class="me-2 text-accent"
                    ></i>
                    {{ pkg.name }}
                  </span>
                  <small class="text-accent">{{ formatPrice(pkg.price) }}</small>
                </div>
                <p class="small  mb-0 mt-1">{{ pkg.subtitle }}</p>
              </button>
            </li>
          </ul>
        </div>

        <!-- 📦 Contenido del tab -->
        <div
          class="col-12 col-lg-8"
          :data-aos="order === 'inverted' ? 'fade-right' : 'fade-left'"
        >
          <div class="tab-content">
            <transition name="fade" mode="out-in">
              <div
                v-if="activePackage"
                :key="activePackage.id"
                class="tab-pane show active"
                role="tabpanel"
              >
                <div class="row g-4 align-items-center">
                  <!-- Imagen -->
                  <div class="col-12 col-md-6">
                    <figure class="ratio ratio-4x3 rounded-4 overflow-hidden shadow-sm">
                      <img
                        :src="activePackage.image"
                        :alt="activePackage.name"
                        class="w-100 h-100 object-fit-cover"
                      />
                    </figure>
                  </div>

                  <!-- Detalles -->
                  <div class="col-12 col-md-6">
                    <h4 class="fw-bold mb-2">{{ activePackage.name }}</h4>
                    <h6 class=" mb-3">{{ activePackage.subtitle }}</h6>

                    <ul
                      v-if="activePackage.meta?.length"
                      class="list-unstyled small  mb-3"
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
                        <i :class="feat.icon" class="text-success me-2"></i>
                        {{ feat.text }}
                      </li>
                    </ul>

                    <p
                      v-if="activePackage.description"
                      class="small  mb-3"
                    >
                      {{ activePackage.description }}
                    </p>

                    <div v-if="activePackage.ctas?.length" class="d-flex flex-wrap gap-2">
                      <a
                        v-for="(cta, c) in activePackage.ctas"
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
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-packages-tabs' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Paquetes' },
  subtitle: { type: String, default: 'Descubre nuestras opciones exclusivas' },
  packages: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  order: { type: String, default: 'normal' } // normal | inverted
})

const activeIndex = ref(0)
const activePackage = computed(() => props.packages[activeIndex.value])

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
</script>

<style lang="less" scoped>
.section-packages-tabs {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--muted);
    max-width: 38rem;
  }

  /* NAV PILLS */
  .nav-pills {
    .nav-link {
      background: var(--surface-2);
      color: var(--text);
      border: 1px solid var(--surface-border);
      padding: 0.9rem 1rem;
      transition: all 0.25s ease;
      font-size: 0.95rem;

      &:hover {
        background: var(--surface-muted);
      }

      &.active {
        background: var(--accent);
        border-color: var(--accent);
        color: var(--accent-contrast);
        box-shadow: 0 6px 16px color-mix(in oklab, var(--accent), black 20%);
      }
    }
  }

  /* Tab content */
  .tab-content {
    .tab-pane {
      transition: opacity 0.25s ease;
    }
  }

  .btn-outline-secondary {
    border-color: var(--surface-border);
    color: var(--text);
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: var(--accent-muted);
      border-color: var(--accent);
      transform: translateY(-1px);
    }
  }

  .text-accent {
    color: var(--accent);
  }

  /* Fade transition */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  @media (max-width: 768px) {
    .nav-link {
      font-size: 0.9rem;
    }
  }
}
</style>
