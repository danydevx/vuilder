<!-- src/sections/terrazas/content/SectionContent19.vue -->
<template>
  <section
    :id="id"
    class="section section-content-19 position-relative overflow-hidden py-5"
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
        class="row align-items-start g-4 g-lg-5"
        :class="[{ 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- Columna izquierda -->
        <div
          class="col-lg-4"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="700"
        >
          <div :class="headerAlignClass">
            <p
              v-if="content.overline"
              class="text-uppercase small fw-semibold text-accent mb-2"
            >
              {{ content.overline }}
            </p>
            <h2 class="fw-bold display-6 mb-3">{{ title }}</h2>
            <div class="underline mb-4"></div>
          </div>
        </div>

        <!-- Columna derecha -->
        <div
          class="col-lg-8"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <div class="row g-4 benefits-row">
            <div
              v-for="(item, i) in content.benefits"
              :key="i"
              class="col-md-4"
            >
              <div class="benefit-card text-start text-md-center">
                <div class="icon mb-3">
                  <i :class="item.icon"></i>
                </div>
                <h5 class="fw-semibold mb-2">{{ item.title }}</h5>
                <p class=" small mb-0">{{ item.text }}</p>
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
  id: { type: String, default: 'section-content-19' },
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
  content: { type: Object, default: () => ({ benefits: [] }) },
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
.section-content-19 {
  position: relative;
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.08;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
  }

  .underline {
    width: 60px;
    height: 2px;
    background: var(--accent);
    margin-inline: auto;
  }

  .benefits-row {
    border-top: 1px solid var(--surface-border);
    border-bottom: 1px solid var(--surface-border);
    padding: 2rem 0;
  }

  .benefit-card {
    padding: 0 1.5rem;
    text-align: center;

    .icon {
      font-size: 2.2rem;
      color: var(--text);
      transition: all 0.3s ease;
    }

    &:hover .icon {
      color: var(--accent);
      transform: scale(1.1);
    }

    h5 {
      color: var(--heading-color);
    }

    p {
      color: var(--);
    }
  }

  @media (max-width: 992px) {
    .underline {
      margin-inline: auto;
    }

    .benefit-card {
      text-align: center;

      .icon {
        font-size: 2.4rem;
      }
    }
  }
}
</style>
