<!-- src/sections/terrazas/content/SectionContent13.vue -->
<template>
  <section
    :id="id"
    class="section section-content-13 position-relative overflow-hidden py-5"
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

    <!-- Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <!-- Row principal con inversión -->
      <div
        class="row g-5 align-items-start"
        :class="[{ 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- Columna izquierda -->
        <div
          class="col-lg-5"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="800"
        >
          <header :class="[headerAlignClass, 'mb-5']">
            <h2 class="fw-bold display-6 mb-3">{{ title }}</h2>
            <p v-if="subtitle" class=" lead">{{ subtitle }}</p>
          </header>

          <div class="metrics-list">
            <div
              v-for="(metric, i) in content.metrics"
              :key="i"
              class="metric-item mb-4"
              :data-aos="animate ? 'fade-up' : null"
              :data-aos-delay="i * 100"
            >
              <p class="fw-semibold small text-uppercase mb-1">{{ metric.label }}</p>
              <h3 class="fw-bold display-6 text-accent mb-0">{{ metric.value }}</h3>
            </div>
          </div>
        </div>

        <!-- Columna derecha -->
        <div
          class="col-lg-7 border-start ps-lg-5"
          :class="[{ 'border-end pe-lg-5 ps-lg-0': order === 'inverted' }]"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="800"
        >
          <div
            v-for="(card, i) in content.cards"
            :key="i"
            class="account-card d-flex flex-column flex-md-row align-items-start gap-3 pb-4 mb-4 border-bottom"
            :data-aos="animate ? 'fade-up' : null"
            :data-aos-delay="i * 100"
          >
            <img
              v-if="card.image"
              :src="card.image"
              alt="card image"
              class="rounded-3 flex-shrink-0"
              width="120"
              height="90"
              loading="lazy"
            />
            <div>
              <h5 class="fw-bold mb-1">{{ card.title }}</h5>
              <p class=" small mb-0">{{ card.text }}</p>
            </div>
          </div>

          <!-- CTA global -->
          <div
            v-if="ctas?.length"
            class="d-flex flex-wrap gap-2 mt-4"
            :class="justifyClass"
          >
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
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-13' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: false },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const headerAlignClass = computed(() => ({
  'text-start me-auto': props.align === 'left',
  'text-center mx-auto': props.align === 'center',
  'text-end ms-auto': props.align === 'right'
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
.section-content-13 {
  position: relative;
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.06;
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .metrics-list {
    .metric-item {
      h3 {
        color: var(--accent);
        line-height: 1;
      }
      p {
        color: var(--);
        letter-spacing: 0.05em;
      }
    }
  }

  .account-card {
    border-color: var(--surface-border);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }

    &:last-child {
      border-bottom: none;
    }

    img {
      object-fit: cover;
    }

    h5 {
      color: var(--heading-color);
    }

    p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 991px) {
    .border-start,
    .border-end {
      border: none !important;
      padding: 0 !important;
    }

    .account-card {
      flex-direction: column;
      align-items: center;
      text-align: center;

      img {
        width: 100%;
        max-width: 280px;
        height: auto;
      }
    }

    .metrics-list {
      text-align: center;
    }
  }
}
</style>
