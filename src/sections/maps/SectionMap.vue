<template>
  <section
    :id="id"
    class="section section-map-advanced position-relative overflow-hidden py-5"
    :class="[schemeClass]"
  >
    <!-- 🌄 Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- 🧭 Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']">
      <!-- Header -->
      <header
        v-if="title || subtitle"
        class="section-header mb-5"
        :class="headerAlignClass"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-duration="700"
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

      <!-- 🧩 Layout -->
      <div
        class="row align-items-start g-4"
        :class="[justifyClass, { 'flex-row-reverse': order === 'inverted' }]"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-duration="800"
      >
        <!-- 🌍 Columna mapa -->
        <div class="col-12 col-lg-7">
          <div class="map-wrapper rounded-4 shadow-sm overflow-hidden position-relative">
            <iframe
              v-if="mapSrc"
              class="map-iframe w-100 border-0"
              :src="mapSrc"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <!-- ℹ️ Columna info -->
        <div class="col-12 col-lg-5">
          <div class="info-card bg-glass rounded-4 shadow-sm p-4">
            <h4 class="fw-bold mb-2">{{ info.title }}</h4>
            <p v-if="info.address" class=" small mb-3">
              <i class="bi bi-geo-alt me-1"></i> {{ info.address }}
            </p>

            <!-- Tabs -->
            <ul class="nav nav-tabs mb-3" role="tablist">
              <li class="nav-item" v-for="(tab, i) in tabs" :key="i">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === tab.id }"
                  @click="activeTab = tab.id"
                >
                  <i v-if="tab.icon" :class="[tab.icon, 'me-1']"></i> {{ tab.label }}
                </button>
              </li>
            </ul>

            <div class="tab-content">
              <!-- 🕒 Horarios -->
              <div v-if="activeTab === 'schedule'" class="tab-pane fade show active">
                <ul class="list-unstyled mb-0 small">
                  <li v-for="(h, i) in info.schedule" :key="i">
                    <i class="bi bi-clock me-2"></i>{{ h }}
                  </li>
                </ul>
              </div>

              <!-- ♿ Accesibilidad -->
              <div v-else-if="activeTab === 'accessibility'" class="tab-pane fade show active">
                <ul class="list-unstyled mb-0 small">
                  <li v-for="(a, i) in info.accessibility" :key="i">
                    <i class="bi bi-check2-circle me-2 text-accent"></i>{{ a }}
                  </li>
                </ul>
              </div>

              <!-- 🗺️ Rutas -->
              <div v-else-if="activeTab === 'routes'" class="tab-pane fade show active">
                <div class="gallery-thumbs d-flex flex-wrap gap-2">
                  <a
                    v-for="(img, i) in info.routes"
                    :key="i"
                    :href="img.full"
                    class="glightbox"
                    data-gallery="map-routes"
                  >
                    <img
                      :src="img.thumb"
                      :alt="'Ruta ' + (i + 1)"
                      class="thumb-img rounded-3 shadow-sm"
                    />
                  </a>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div v-if="ctas?.length" class="d-flex flex-wrap mt-4 gap-2" :class="justifyClass">
              <a
                v-for="(cta, i) in ctas"
                :key="i"
                :href="cta.href"
                class="btn"
                :class="[
                  cta.variant === 'solid'
                    ? 'btn-scheme'
                    : cta.variant === 'outline'
                    ? 'btn-outline'
                    : 'btn-ghost'
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
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

const props = defineProps({
  id: { type: String, default: 'section-map' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Ubicación del Evento' },
  subtitle: { type: String, default: 'Encuentra fácilmente el lugar en el mapa.' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  mapSrc: { type: String, default: '' },
  info: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] },
  fluid: { type: Boolean, default: false },
  order: { type: String, default: 'normal' },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  animate: { type: Boolean, default: true }
})

// 🔹 Clases reactivas
const schemeClass = computed(() => `component-scheme-${props.scheme}`)
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

const activeTab = ref('schedule')
const tabs = [
  { id: 'schedule', label: 'Horarios', icon: 'bi bi-clock' },
  { id: 'accessibility', label: 'Accesibilidad', icon: 'bi bi-universal-access-circle' },
  { id: 'routes', label: 'Rutas', icon: 'bi bi-map' }
]

onMounted(() => {
  GLightbox({ selector: '.glightbox' })
})
</script>

<style lang="less" scoped>
.section-map-advanced {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.9);
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--);
    max-width: 38rem;
  }

  .info-card {
    background: color-mix(in srgb, var(--surface) 88%, transparent);
    border: 1px solid var(--surface-border);
    backdrop-filter: blur(10px);
  }

  .map-wrapper {
    aspect-ratio: 16 / 9;
    border: 1px solid var(--surface-border);
    background: var(--surface-2);
  }

  .thumb-img {
    width: 100px;
    height: 70px;
    object-fit: cover;
    transition: all 0.25s ease;
    &:hover {
      transform: scale(1.05);
      box-shadow: var(--shadow-md);
    }
  }

  .nav-tabs {
    border-bottom: 1px solid var(--surface-border);

    .nav-link {
      color: var(--);
      border: none;
      border-bottom: 2px solid transparent;
      font-weight: 500;
      transition: all 0.25s ease;

      &.active {
        color: var(--accent);
        border-color: var(--accent);
      }

      &:hover:not(.active) {
        color: color-mix(in srgb, var(--accent) 40%, var(--text));
      }
    }
  }

  .btn-scheme,
  .btn-outline,
  .btn-ghost {
    border-radius: 2rem;
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .map-wrapper {
      aspect-ratio: 1 / 1;
    }
    .info-card {
      padding: 1.25rem;
    }
  }
}
</style>
