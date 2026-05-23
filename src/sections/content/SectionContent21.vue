<!-- src/sections/terrazas/content/SectionContent21.vue -->
<template>
  <section
    :id="id"
    class="section section-content-21 position-relative overflow-hidden py-5"
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

    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div
        class="row align-items-center g-5"
        :class="[{ 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- Columna izquierda: imágenes -->
        <div
          class="col-lg-6 position-relative"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="700"
        >
          <div
            class="images-stack position-relative d-flex justify-content-center align-items-center"
          >
            <img
              v-for="(img, i) in content.images"
              :key="i"
              :src="img"
              class="stack-img rounded-3 shadow-sm"
              :class="'img-' + (i + 1)"
              loading="lazy"
              alt="work image"
            />
          </div>
        </div>

        <!-- Columna derecha: acordeón -->
        <div
          class="col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <div :class="headerAlignClass" class="mb-4">
            <p
              v-if="content.overline"
              class="text-uppercase small fw-semibold text-accent mb-2"
            >
              {{ content.overline }}
            </p>
            <h2 class="fw-bold display-6 mb-4">{{ title }}</h2>
          </div>

          <div class="accordion-list">
            <div
              v-for="(step, i) in content.steps"
              :key="i"
              class="accordion-item border-bottom"
            >
              <button
                class="accordion-header d-flex justify-content-between align-items-center w-100 py-3 fw-semibold"
                @click="toggle(i)"
              >
                <span>{{ step.number }} {{ step.title }}</span>
                <i
                  class="bi"
                  :class="openIndex === i ? 'bi-chevron-up' : 'bi-chevron-down'"
                ></i>
              </button>
              <div
                class="accordion-body overflow-hidden"
                :style="{ maxHeight: openIndex === i ? '200px' : '0' }"
              >
                <p class=" small mb-3 ps-2">{{ step.text }}</p>
              </div>
            </div>
          </div>

          <a
            v-if="content.cta"
            :href="content.cta.href"
            class="btn btn-scheme fw-semibold mt-4 px-4 py-2"
          >
            {{ content.cta.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-21' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Cómo trabajamos' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: false },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({ images: [], steps: [] }) },
  ctas: { type: Array, default: () => [] }
})

const openIndex = ref(null)
function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}

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
.section-content-21 {
  position: relative;
  background: var(--surface);
  color: var(--text);

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

  .images-stack {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    min-height: 420px;

    .stack-img {
      width: 230px;
      height: 300px;
      object-fit: cover;
      border-radius: 0.75rem;
      border: 1px solid var(--surface-border);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.4s ease;

      &:hover {
        transform: scale(1.04);
      }
    }
  }

  .accordion-list {
    border-top: 1px solid var(--surface-border);

    .accordion-item {
      .accordion-header {
        color: var(--text);
        background: transparent;
        border: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        font-size: 1rem;
        transition: color 0.2s ease;

        &:hover {
          color: var(--accent);
        }

        i {
          transition: transform 0.2s ease;
        }
      }

      .accordion-body {
        transition: max-height 0.3s ease;
      }
    }
  }

  @media (max-width: 992px) {
    .images-stack {
      flex-direction: column;
      gap: 1rem;
      min-height: auto;

      .stack-img {
        width: 100%;
        max-width: 320px;
        height: auto;
      }
    }

    .accordion-list {
      .accordion-header {
        font-size: 1rem;
      }
    }
  }
}
</style>
