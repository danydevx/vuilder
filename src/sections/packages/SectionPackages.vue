<template>
  <section
    :id="id"
    class="section section-packages py-5 position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🧭 Header -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <header
        v-if="title || subtitle"
        class="section-header mb-5"
        :class="headerAlignClass"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <h2 v-if="title" class="section-title ">{{ title }}</h2>
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

    <!-- 🧩 Paquetes -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div class="row g-4" :class="justifyClass">
        <div
          v-for="(pkg, i) in packages"
          :key="pkg.id || i"
          :class="['package-col', colClass]"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
        >
          <div
            class="package-card card border-0 rounded-4 shadow-sm h-100 overflow-hidden"
            :class="{ featured: pkg.featured }"
          >
            <!-- Imagen -->
            <div class="position-relative">
              <figure class="ratio ratio-4x3 m-0">
                <img
                  :src="pkg.image"
                  :alt="pkg.name"
                  class="w-100 h-100 object-fit-cover"
                  loading="lazy"
                />
              </figure>

              <div
                v-if="pkg.badge"
                class="package-badge badge-chip position-absolute top-0 start-0 m-3 d-flex align-items-center gap-1"
              >
                <i v-if="pkg.badgeIcon" :class="pkg.badgeIcon"></i>
                {{ pkg.badge }}
              </div>
            </div>

            <!-- Contenido -->
            <div class="card-body p-4 d-flex flex-column">
              <h4 class="fw-bold mb-1">{{ pkg.name }}</h4>
              <p v-if="pkg.subtitle" class=" small mb-3">{{ pkg.subtitle }}</p>

              <!-- Precio -->
              <div class="price-display mb-3">
                <span class="fs-5 fw-semibold">{{ formatPrice(pkg.price) }}</span>
                <small class=""> / {{ pkg.period }}</small>
              </div>

              <!-- Meta -->
              <ul v-if="pkg.meta?.length" class="list-unstyled small  mb-3">
                <li
                  v-for="(meta, m) in pkg.meta"
                  :key="m"
                  class="d-flex align-items-center mb-1"
                >
                  <i v-if="meta.icon" :class="meta.icon" class="me-2"></i>{{ meta.text }}
                </li>
              </ul>

              <!-- Features -->
              <ul v-if="pkg.features?.length" class="list-unstyled flex-grow-1">
                <li
                  v-for="(feat, f) in pkg.features"
                  :key="f"
                  class="d-flex align-items-center mb-1"
                >
                  <i v-if="feat.icon" :class="feat.icon" class="text-success me-2"></i>
                  {{ feat.text }}
                </li>
              </ul>

              <p v-if="pkg.description" class="mt-3 small ">
                {{ pkg.description }}
              </p>

              <!-- CTAs -->
              <div v-if="pkg.ctas?.length" class="mt-3 d-flex flex-wrap gap-2">
                <a
                  v-for="(cta, c) in pkg.ctas"
                  :key="c"
                  :href="cta.href"
                  class="btn flex-grow-1"
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
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-packages' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Paquetes' },
  subtitle: { type: String, default: 'Opciones flexibles para cada tipo de evento' },
  packages: { type: Array, required: true },
  params: {
    type: Object,
    default: () => ({ layout: 'grid', highlightFeatured: true })
  },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 3 }, // ahora dinámico
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  order: { type: String, default: 'normal' }
})

function formatPrice(value) {
  if (typeof value === 'string') return value
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value)
}

// 🧭 Alineaciones
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

// 📐 Clases de columnas dinámicas
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
    case 5:
      return 'col-6 col-md-4 col-lg-2-4' // no estándar, puedes ajustar
    default:
      return 'col-12 col-md-6 col-lg-4'
  }
})
</script>

<style lang="less" scoped>
.section-packages {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--muted);
    max-width: 38rem;
  }

  .package-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: var(--surface-2);
    border: 1px solid var(--surface-border);

    &:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
    }

    &.featured {
      border: 2px solid var(--accent);
      box-shadow: 0 6px 24px color-mix(in oklab, var(--accent), black 20%);
      .card-body {
        background: color-mix(in oklab, var(--accent), var(--surface) 85%);
      }
    }
  }

  .package-badge {
    background: var(--accent);
    color: var(--accent-contrast);
    padding: 0.35rem 0.7rem;
    font-size: 0.75rem;
    border-radius: 999px;
  }

  .price-display {
    color: var(--accent);
  }

  .btn-outline-secondary {
    border-color: var(--surface-border);
    color: var(--text);
    transition: all 0.2s ease;
    &:hover {
      background-color: var(--accent-muted);
      border-color: var(--accent);
      color: var(--accent-contrast);
      transform: translateY(-1px);
    }
  }

  @media (max-width: 768px) {
    .package-card .card-body {
      padding: 1.5rem;
    }
  }
}
</style>
