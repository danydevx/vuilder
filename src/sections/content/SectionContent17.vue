<!-- src/sections/terrazas/content/SectionContent17.vue -->
<template>
  <section
    :id="id"
    class="section section-content-17 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- 🌄 Fondo opcional -->
    <div v-if="backgroundImg" class="bg-media" :style="{ backgroundImage: `url('${backgroundImg}')` }" />
    <div v-if="enableOverlay" class="bg-overlay" />

    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div
        class="row align-items-center g-5"
        :class="[{ 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- 🧾 Columna izquierda -->
        <div
          class="col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="700"
        >
          <header :class="[headerAlignClass, 'mb-4']">
            <p v-if="content.overline" class="text-uppercase small fw-semibold text-accent mb-2">
              {{ content.overline }}
            </p>

            <h2 class="fw-bold display-6 mb-3">{{ title }}</h2>
            <p v-if="subtitle" class=" lead mb-4" style="max-width: 40rem">
              {{ subtitle }}
            </p>
          </header>

          <!-- 🧩 Lista de servicios -->
          <ul class="service-list list-unstyled mt-4">
            <li
              v-for="(service, i) in content.services"
              :key="i"
              class="service-item "
              :class="{ active: selectedIndex === i }"
              @click="selectedIndex = i"
            >
              <span>{{ service.name }}</span>
              <span v-if="selectedIndex === i" class="small opacity-75">0{{ i + 1 }}</span>
            </li>
          </ul>

          <!-- 🧠 Tarjeta activa (visible en móvil) -->
          <div class="service-card d-lg-none mt-4 p-4 rounded-4 shadow-sm glassy">
            <h5 class="fw-bold mb-2">{{ activeService.name }}</h5>
            <p class=" mb-0 small">{{ activeService.description }}</p>
          </div>
        </div>

        <!-- 🎨 Columna derecha -->
        <div
          class="col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <div class="service-image-wrapper position-relative text-center">
            <img
              :src="activeService.image"
              :alt="activeService.name"
              class="img-fluid rounded-4 shadow-lg mb-4"
              loading="lazy"
            />
            <div
              v-if="activeService.name"
              class="service-card d-none d-lg-block position-absolute bottom-0 start-0 translate-middle-y bg-surface p-4 rounded-4 shadow"
            >
              <h5 class="fw-bold mb-2">{{ activeService.name }}</h5>
              <p class=" mb-0 small">{{ activeService.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-17' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({ services: [] }) },
  ctas: { type: Array, default: () => [] }
})

const selectedIndex = ref(0)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const activeService = computed(() => props.content.services[selectedIndex.value] || {})

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
.section-content-17 {
  position: relative;

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.06;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
  }

  /* Lista */
  .service-list {
    margin: 0;
    padding: 0;

    .service-item {
      font-size: 1.3rem;
      margin-bottom: 0.75rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--);
      transition: all 0.3s ease;
      padding-bottom: 0.25rem;
      border-bottom: 1px solid transparent;

      &.active {
        color: var(--text);
        border-color: var(--accent);
        font-weight: 700;
      }

      &:hover {
        color: var(--text);
      }
    }
  }

  /* Imagen */
  .service-image-wrapper {
    position: relative;

    img {
      width: 100%;
      height: auto;
      max-width: 520px;
      object-fit: cover;
      border-radius: 1.5rem;
    }

    .service-card {
      background: var(--surface);
      border: 1px solid var(--surface-border);
      max-width: 340px;
      text-align: left;
      transition: all 0.4s ease;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);

      h5 {
        color: var(--heading-color);
      }

      p {
        color: var(--);
      }
    }
  }

  @media (max-width: 992px) {
    .service-list .service-item {
      font-size: 1.15rem;
    }

    .service-card {
      max-width: 100%;
    }

    .service-image-wrapper img {
      max-width: 100%;
    }
  }
}
</style>
