<template>
  <section
    :id="id"
    class="section section-cards-float py-5 position-relative overflow-hidden"
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

      <div class="float-cards-grid" :class="gridClass">
        <div
          v-for="(card, i) in cards"
          :key="card.id || i"
          class="float-card-wrapper"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
          :style="{ '--float-delay': `${i * 0.1}s` }"
        >
          <article
            class="float-card rounded-4 p-4"
            :class="{ 'float-card--clickable': card.href || card.onClick }"
            @click="card.onClick ? card.onClick(card) : null"
          >
            <figure v-if="card.image" class="float-card__media ratio ratio-16x9 rounded-3 overflow-hidden mb-3">
              <img
                :src="card.image"
                :alt="card.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </figure>

            <div class="float-card__body">
              <div v-if="card.icon" class="float-card__icon mb-3">
                <div class="icon-circle">
                  <i :class="card.icon" class="fs-4"></i>
                </div>
              </div>

              <h3 v-if="card.title" class="float-card__title h6 fw-semibold mb-2">
                {{ card.title }}
              </h3>

              <p v-if="card.subtitle" class="float-card__subtitle small  mb-2">
                {{ card.subtitle }}
              </p>

              <p v-if="card.description" class="float-card__description small  mb-3">
                {{ card.description }}
              </p>

              <ul v-if="card.features?.length" class="float-card__features list-unstyled small mb-3">
                <li
                  v-for="(feat, f) in card.features"
                  :key="f"
                  class="d-flex align-items-center mb-1"
                >
                  <i :class="feat.icon || 'bi bi-check-circle'" class="me-2 text-accent"></i>
                  {{ feat.text || feat }}
                </li>
              </ul>

              <div v-if="card.ctas?.length" class="d-flex flex-wrap gap-2">
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
  id: { type: String, default: 'section-cards-float' },
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

const gridClass = computed(() => ({
  'justify-content-start': props.justify === 'start',
  'justify-content-center': props.justify === 'center' || !props.justify,
  'justify-content-end': props.justify === 'end'
}))

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
.section-cards-float {
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

  .float-cards-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .float-card-wrapper {
    flex: 1 1 calc((100% / v-bind('props.cols')) - 1.5rem);
    min-width: 280px;
    max-width: 400px;
    animation: floatCard 6s ease-in-out infinite;
    animation-delay: var(--float-delay, 0s);

    @media (max-width: 992px) {
      flex: 1 1 calc(50% - 1rem);
    }

    @media (max-width: 576px) {
      flex: 1 1 100%;
    }
  }

  @keyframes floatCard {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  .float-card {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;

    &.float-card--clickable {
      cursor: pointer;
    }

    &:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg), 0 20px 40px color-mix(in oklab, var(--accent), transparent 80%);
      border-color: var(--accent);
      animation-play-state: paused;
    }
  }

  .float-card__media {
    overflow: hidden;

    img {
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .float-card__icon {
    display: flex;
    justify-content: center;
  }

  .icon-circle {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent), black 15%));
    border-radius: 50%;
    color: var(--accent-contrast);
    box-shadow: 0 4px 16px color-mix(in oklab, var(--accent), transparent 60%);
  }

  .float-card__title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .float-card__subtitle,
  .float-card__description {
    color: var(--);
  }

  .text-accent {
    color: var(--accent);
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
}
</style>