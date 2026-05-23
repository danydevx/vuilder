<!-- src/sections/terrazas/content/SectionContent18.vue -->
<template>
  <section
    :id="id"
    class="section section-content-18 position-relative overflow-hidden py-5"
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
        <!-- Columna izquierda -->
        <div
          class="col-lg-5"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="700"
        >
          <div class="content-left pe-lg-4" :class="headerAlignClass">
            <p
              v-if="content.overline"
              class="text-uppercase small fw-semibold text-accent mb-2"
            >
              {{ content.overline }}
            </p>

            <h2 class="fw-bold display-6 mb-3">{{ title }}</h2>
            <p
              v-if="subtitle"
              class="lead mb-4 "
              style="max-width: 40rem"
            >
              {{ subtitle }}
            </p>

            <a
              v-if="content.cta"
              :href="content.cta.href"
              class="btn btn-scheme fw-semibold px-4 py-2"
              :class="[content.cta.variant === 'outline' ? 'btn-outline' : '']"
            >
              {{ content.cta.label }}
            </a>
          </div>
        </div>

        <!-- Columna derecha -->
        <div
          class="col-lg-7"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <div class="row g-4">
            <div
              v-for="(stat, i) in content.stats"
              :key="i"
              class="col-6 col-md-6 col-lg-6"
            >
              <div class="stat-card">
                <h3 class="stat-value ">{{ stat.value }}</h3>
                <p class=" small mb-0">{{ stat.text }}</p>
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
  id: { type: String, default: 'section-content-18' },
  scheme: { type: String, default: 'default-dark' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: true },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: false },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({ stats: [] }) },
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
.section-content-18 {
  background: var(--surface);
  color: var(--text-inverse);
  position: relative;

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.2;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
  }

  .content-left {
    color: var(--text-inverse);

    h2 {
      color: var(--text-inverse);
    }

    p {
      color: color-mix(in srgb, var(--text-inverse) 85%, transparent);
    }

    .btn {
      margin-top: 1rem;
    }
  }

  .stat-card {
    color: var(--text-inverse);
    text-align: left;
    transition: all 0.25s ease;

    .stat-value {
      font-size: 2.5rem;
      margin-bottom: 0.25rem;
      color: var(--text-inverse);
      line-height: 1.1;
    }

    p {
      color: color-mix(in srgb, var(--text-inverse) 70%, transparent);
    }

    &:hover {
      transform: translateY(-3px);
      opacity: 0.95;
    }
  }

  @media (max-width: 992px) {
    .stat-card {
      text-align: center;
    }

    .content-left {
      text-align: center;

      .btn {
        margin-inline: auto;
      }
    }
  }
}
</style>
