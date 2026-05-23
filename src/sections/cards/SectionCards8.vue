<template>
  <section
    :id="id"
    class="section section-cards-steps py-5 position-relative overflow-hidden"
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

      <div class="steps-wrapper">
        <div
          v-for="(card, i) in cards"
          :key="card.id || i"
          class="step-item"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
        >
          <div class="step-marker">
            <div class="step-number">{{ i + 1 }}</div>
            <div v-if="i < cards.length - 1" class="step-line"></div>
          </div>

          <article
            class="step-card rounded-4 p-4"
            :class="{ 'step-card--clickable': card.href || card.onClick }"
            @click="card.onClick ? card.onClick(card) : null"
          >
            <div class="d-flex align-items-start gap-3">
              <div v-if="card.icon" class="step-icon-wrap flex-shrink-0">
                <i :class="card.icon" class="fs-4"></i>
              </div>

              <div class="flex-grow-1">
                <h3 v-if="card.title" class="step-title h6 fw-semibold mb-2">
                  {{ card.title }}
                </h3>

                <p v-if="card.subtitle" class="step-subtitle small  mb-2">
                  {{ card.subtitle }}
                </p>

                <p v-if="card.description" class="step-description small  mb-3">
                  {{ card.description }}
                </p>

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
  id: { type: String, default: 'section-cards-steps' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
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
.section-cards-steps {
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

  .steps-wrapper {
    max-width: 720px;
    margin: 0 auto;
  }

  .step-item {
    display: flex;
    gap: 1.5rem;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  .step-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  .step-number {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent);
    color: var(--accent-contrast);
    border-radius: 50%;
    font-weight: 700;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .step-line {
    width: 2px;
    flex-grow: 1;
    min-height: 40px;
    background: linear-gradient(
      to bottom,
      var(--accent),
      color-mix(in oklab, var(--accent), transparent 60%)
    );
    margin-top: 0.5rem;
  }

  .step-card {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    flex-grow: 1;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &.step-card--clickable {
      cursor: pointer;
    }

    &:hover {
      transform: translateX(4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--accent);
    }
  }

  .step-icon-wrap {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in oklab, var(--accent), transparent 88%);
    border-radius: 0.5rem;
    color: var(--accent);
  }

  .step-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .step-subtitle,
  .step-description {
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
    .step-item {
      gap: 1rem;
    }

    .step-number {
      width: 32px;
      height: 32px;
      font-size: 0.875rem;
    }

    .step-line {
      min-height: 24px;
    }
  }
}
</style>