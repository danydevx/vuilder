<template>
  <section
    :id="id"
    class="section section-cards-pricing py-5 position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div
      v-if="backgroundImg"
      class="section__bg"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="section__overlay" aria-hidden="true" />

    <div :class="containerClass">
      <header
        v-if="title || subtitle"
        class=" section__header"
        :class="headerAlignClass"
        data-aos="fade-up"
      >
        <p v-if="eyebrow" class="section__eyebrow">{{ eyebrow }}</p>
        <h2 v-if="title" class="section__title ">{{ title }}</h2>
        <p v-if="subtitle" class="section__subtitle mt-2">{{ subtitle }}</p>
      </header>

      <div class="row g-4 align-items-end" :class="justifyClass">
        <div
          v-for="(card, i) in cards"
          :key="card.id || i"
          :class="colClass"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
        >
          <article
            class="card-item h-100 rounded-4 overflow-hidden d-flex flex-column"
            :class="{ 'card-item--featured': card.featured }"
          >
            <div v-if="card.badge" class="card-badge text-center py-2">
              <span>{{ card.badge }}</span>
            </div>

            <div class="card-body p-4 d-flex flex-column flex-grow-1">
              <div v-if="card.icon" class="card-icon-wrap mb-3">
                <i :class="card.icon" class="fs-3"></i>
              </div>

              <h3 v-if="card.title" class="card-title h5  mb-1">
                {{ card.title }}
              </h3>

              <p v-if="card.subtitle" class="card-subtitle small  mb-3">
                {{ card.subtitle }}
              </p>

              <div v-if="card.price" class="card-price mb-3">
                <span class="price-value fs-3 ">{{ card.price }}</span>
                <span v-if="card.period" class="price-period ">/ {{ card.period }}</span>
              </div>

              <p v-if="card.description" class="card-description small  mb-3 flex-grow-1">
                {{ card.description }}
              </p>

              <ul v-if="card.features?.length" class="list-unstyled mb-4 flex-grow-1">
                <li
                  v-for="(feat, f) in card.features"
                  :key="f"
                  class="d-flex align-items-center mb-2"
                >
                  <i
                    :class="feat.included !== false ? 'bi bi-check-circle-fill text-success' : 'bi bi-x-circle-fill '"
                    class="me-2"
                  ></i>
                  <span :class="{ '': feat.included === false }">
                    {{ feat.text || feat }}
                  </span>
                </li>
              </ul>

              <div v-if="card.ctas?.length" class="d-flex flex-column gap-2 mt-auto">
                <a
                  v-for="(cta, c) in card.ctas"
                  :key="c"
                  :href="cta.href"
                  class="btn w-100"
                  :class="getCtaClass(cta.variant, card.featured)"
                >
                  <i v-if="cta.icon" :class="cta.icon" class="me-1" aria-hidden="true"></i>
                  {{ cta.label }}
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-cards-pricing' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 3 },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  cards: { type: Array, default: () => [] }
})

const schemeClass = computed(() =>
  props.scheme ? `component-scheme-${props.scheme}` : ''
)

const containerClass = computed(() => [
  props.fluid ? 'container-fluid px-3 px-md-5' : 'container',
  'position-relative'
])

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

const colClass = computed(() => {
  switch (props.cols) {
    case 1:
      return 'col-12 col-lg-6 mx-auto'
    case 2:
      return 'col-12 col-md-6'
    case 3:
      return 'col-12 col-md-6 col-lg-4'
    case 4:
      return 'col-12 col-sm-6 col-lg-3'
    default:
      return 'col-12 col-md-6 col-lg-4'
  }
})

function getCtaClass(variant = 'solid', featured = false) {
  if (featured) return 'btn-scheme'
  if (variant === 'outline') return 'btn-outline'
  return 'btn-scheme'
}
</script>

<style lang="less" scoped>
.section-cards-pricing {
  background: var(--surface);
  color: var(--text);

  .section__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    z-index: 0;
  }

  .section__overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    z-index: 1;
  }

  .container,
  .container-fluid {
    position: relative;
    z-index: 2;
  }

  .section__header {
    max-width: 640px;
  }

  .section__title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .section__subtitle {
    color: var(--);
    max-width: 38rem;
  }

  .section__eyebrow {
    color: var(--accent);
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .card-item {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &.card-item--featured {
      border: 2px solid var(--accent);
      transform: translateY(-8px);
      box-shadow: 0 16px 40px color-mix(in oklab, var(--accent), transparent 75%);
    }

    &:not(.card-item--featured):hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
  }

  .card-badge {
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .card-icon-wrap {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in oklab, var(--accent), transparent 88%);
    border-radius: 0.75rem;
    color: var(--accent);
  }

  .card-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .card-subtitle,
  .card-description {
    color: var(--);
  }

  .card-price {
    .price-value {
      color: var(--accent);
    }
  }

  .btn-outline {
    border-color: var(--surface-border);
    color: var(--text);
    transition: all 0.2s ease;

    &:hover {
      background: color-mix(in oklab, var(--accent), transparent 90%);
      border-color: var(--accent);
      color: var(--accent);
    }
  }

  @media (max-width: 768px) {
    .card-item.card-item--featured {
      transform: none;
    }

    .card-body {
      padding: 1.5rem;
    }
  }
}
</style>