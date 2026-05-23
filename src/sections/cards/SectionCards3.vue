<template>
  <section
    :id="id"
    class="section section-cards-icons py-5 position-relative overflow-hidden"
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

      <div class="row g-3 g-md-4" :class="justifyClass">
        <div
          v-for="(card, i) in cards"
          :key="card.id || i"
          :class="colClass"
          data-aos="fade-up"
          :data-aos-delay="80 * i"
        >
          <article
            class="card-item h-100 text-center p-4 rounded-4 d-flex flex-column align-items-center"
            :class="{ 'card-item--clickable': card.href || card.onClick }"
            @click="card.onClick ? card.onClick(card) : null"
          >
            <div class="card-icon-wrap mb-3">
              <i v-if="card.icon" :class="card.icon"></i>
            </div>

            <h3 v-if="card.title" class="card-title h6 fw-semibold mb-2">
              {{ card.title }}
            </h3>

            <p v-if="card.subtitle" class="card-subtitle small  mb-3">
              {{ card.subtitle }}
            </p>

            <p v-if="card.description" class="card-description small  flex-grow-1 mb-3">
              {{ card.description }}
            </p>

            <div v-if="card.ctas?.length" class="d-flex flex-wrap gap-2 mt-auto">
              <a
                v-for="(cta, c) in card.ctas"
                :key="c"
                :href="cta.href"
                class="btn btn-sm"
                :class="getCtaClass(cta.variant)"
              >
                <i v-if="cta.icon" :class="cta.icon" class="me-1" aria-hidden="true"></i>
                {{ cta.label }}
              </a>
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
  id: { type: String, default: 'section-cards-icons' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 4 },
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
    case 2:
      return 'col-12 col-sm-6 col-lg-6'
    case 3:
      return 'col-12 col-sm-6 col-lg-4'
    case 4:
      return 'col-6 col-sm-4 col-lg-3'
    case 5:
      return 'col-6 col-sm-4 col-lg-2'
    case 6:
      return 'col-4 col-sm-4 col-lg-2'
    default:
      return 'col-6 col-sm-4 col-lg-3'
  }
})

function getCtaClass(variant = 'solid') {
  const variants = {
    solid: 'btn-scheme',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    secondary: 'btn-secondary-accent'
  }
  return variants[variant] ?? variants.solid
}
</script>

<style lang="less" scoped>
.section-cards-icons {
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
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &.card-item--clickable {
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
        border-color: var(--accent);
      }
    }
  }

  .card-icon-wrap {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in oklab, var(--accent), transparent 88%);
    border-radius: 50%;
    color: var(--accent);
    transition: transform 0.2s ease;

    i {
      font-size: 1.75rem;
      line-height: 1;
    }

    .card-item:hover & {
      transform: scale(1.1);
    }
  }

  .card-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .card-subtitle,
  .card-description {
    color: var(--);
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
    .card-icon-wrap {
      width: 52px;
      height: 52px;

      i {
        font-size: 1.4rem;
      }
    }
  }
}
</style>