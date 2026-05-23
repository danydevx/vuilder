<template>
  <section
    :id="id"
    class="section section-cards-horizontal py-5 position-relative overflow-hidden"
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

      <div class="d-flex flex-column gap-4">
        <article
          v-for="(card, i) in cards"
          :key="card.id || i"
          class="card-item rounded-4 overflow-hidden"
          :class="{ 'card-item--clickable': card.href || card.onClick }"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
          @click="card.onClick ? card.onClick(card) : null"
        >
          <div class="row g-0">
            <div v-if="card.image" class="col-md-5 col-lg-4">
              <figure class="card-media ratio ratio-4x3 m-0 h-100">
                <img
                  :src="card.image"
                  :alt="card.title"
                  class="w-100 h-100 object-fit-cover"
                  loading="lazy"
                />
              </figure>
            </div>

            <div class="col-md-7 col-lg-8">
              <div class="card-body p-4 d-flex flex-column h-100">
                <div class="d-flex align-items-start gap-3 mb-3">
                  <div v-if="card.icon" class="card-icon-wrap flex-shrink-0">
                    <i :class="card.icon" class="fs-4"></i>
                  </div>
                  <div>
                    <h3 v-if="card.title" class="card-title h5 fw-semibold mb-1">
                      {{ card.title }}
                    </h3>
                    <p v-if="card.subtitle" class="card-subtitle small  mb-0">
                      {{ card.subtitle }}
                    </p>
                  </div>
                </div>

                <p v-if="card.description" class="card-description small  flex-grow-1 mb-3">
                  {{ card.description }}
                </p>

                <ul v-if="card.features?.length" class="list-unstyled small mb-3">
                  <li
                    v-for="(feat, f) in card.features"
                    :key="f"
                    class="d-flex align-items-center mb-1"
                  >
                    <i :class="feat.icon || 'bi bi-check-circle'" class="me-2 text-accent"></i>
                    {{ feat.text || feat }}
                  </li>
                </ul>

                <div v-if="card.ctas?.length" class="d-flex flex-wrap gap-2 mt-auto">
                  <a
                    v-for="(cta, c) in card.ctas"
                    :key="c"
                    :href="cta.href"
                    class="btn"
                    :class="getCtaClass(cta.variant)"
                  >
                    <i v-if="cta.icon" :class="cta.icon" class="me-1" aria-hidden="true"></i>
                    {{ cta.label }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-cards-horizontal' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
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
.section-cards-horizontal {
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

    &.card-item--clickable {
      cursor: pointer;

      &:hover {
        transform: translateX(6px);
        box-shadow: var(--shadow-lg);
      }
    }
  }

  .card-media {
    overflow: hidden;
    min-height: 200px;

    img {
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.04);
    }
  }

  .card-icon-wrap {
    width: 48px;
    height: 48px;
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

  @media (max-width: 768px) {
    .card-media {
      min-height: 180px;
    }

    .card-body {
      padding: 1.5rem;
    }
  }
}
</style>