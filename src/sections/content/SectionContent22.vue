<!-- src/sections/terrazas/content/SectionContent22.vue -->
<template>
  <section
    :id="id"
    class="section section-content-22 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- Contenido -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <!-- Row principal con inversión -->
      <div
        class="row align-items-center g-5"
        :class="[{ 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- Columna izquierda (texto y features) -->
        <div
          class="col-lg-7"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="700"
        >
          <header :class="[headerAlignClass, 'mb-5']">
            <p
              v-if="content.overline"
              class="text-uppercase small fw-semibold text-accent mb-2"
            >
              {{ content.overline }}
            </p>
            <h2 class="fw-bold display-6 mb-3">{{ title }}</h2>
            <p
              v-if="subtitle"
              class=" lead mb-4"
              style="max-width: 42rem"
            >
              {{ subtitle }}
            </p>
          </header>

          <!-- Grid de características -->
          <div class="row g-4">
            <div
              v-for="(item, i) in content.features"
              :key="i"
              class="col-12 col-sm-6"
              :data-aos="animate ? 'fade-up' : null"
              :data-aos-delay="i * 100"
            >
              <div class="feature-item d-flex flex-column">
                <i :class="['bi', item.icon, 'fs-2 mb-3 text-accent']"></i>
                <h6 class="fw-semibold mb-2">{{ item.title }}</h6>
                <p class=" small mb-0">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna derecha (imagen decorativa) -->
        <div
          class="col-lg-5 position-relative"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <div class="image-stack position-relative">
            <div class="bg-block"></div>
            <img
              v-for="(img, i) in content.images"
              :key="i"
              :src="img"
              class="img-fluid rounded-3 shadow-sm position-absolute"
              :class="'img-' + (i + 1)"
              loading="lazy"
              alt="feature image"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-22' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Plantilla moderna con diseño limpio' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: false },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({ features: [], images: [] }) },
  ctas: { type: Array, default: () => [] }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const headerAlignClass = computed(() => {
  switch (props.align) {
    case 'center':
      return 'text-center mx-auto'
    case 'right':
      return 'text-end ms-auto'
    default:
      return 'text-start me-auto'
  }
})
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
.section-content-22 {
  position: relative;
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.05;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
  }

  /* Features */
  .feature-item {
    i {
      color: var(--accent);
      transition: transform 0.3s ease;
    }

    &:hover i {
      transform: scale(1.1);
    }

    h6 {
      color: var(--heading-color);
    }

    p {
      color: var(--);
    }
  }

  /* Imagen decorativa */
  .image-stack {
    position: relative;
    min-height: 420px;

    .bg-block {
      position: absolute;
      top: 40px;
      right: 0;
      width: 75%;
      height: 80%;
      background: var(--surface-muted);
      border-radius: 1rem;
      z-index: 1;
    }

    img {
      border-radius: 0.75rem;
      border: 1px solid var(--surface-border);
      object-fit: cover;
      transition: transform 0.4s ease;

      &:hover {
        transform: scale(1.04);
      }
    }

    .img-1 {
      top: 0;
      right: 50px;
      width: 260px;
      z-index: 3;
    }

    .img-2 {
      bottom: 0;
      right: 0;
      width: 360px;
      z-index: 2;
    }
  }

  /* En modo invertido, movemos el bloque visual al lado izquierdo */
  .flex-row-reverse .image-stack {
    .bg-block {
      left: 0;
      right: auto;
    }

    .img-1 {
      left: 50px;
      right: auto;
    }

    .img-2 {
      left: 0;
      right: auto;
    }
  }

  @media (max-width: 992px) {
    .image-stack {
      min-height: 300px;

      .bg-block {
        display: none;
      }

      img {
        position: relative;
        width: 100% !important;
        height: auto;
        margin-bottom: 1rem;
      }
    }

    .feature-item {
      text-align: center;
    }
  }
}
</style>
