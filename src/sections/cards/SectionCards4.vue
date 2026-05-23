<template>
  <section
    :id="id"
    class="section section-cards-overlay py-5 position-relative overflow-hidden"
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

      <div class="row g-4" :class="justifyClass">
        <div
          v-for="(card, i) in cards"
          :key="card.id || i"
          :class="colClass"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
        >
          <article
            class="card-item position-relative rounded-4 overflow-hidden h-100"
            :class="{ 'card-item--clickable': card.href || card.onClick }"
            @click="card.onClick ? card.onClick(card) : null"
          >
            <figure v-if="card.image" class="card-media ratio ratio-4x3 m-0">
              <img
                :src="card.image"
                :alt="card.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
              <div class="card-overlay position-absolute top-0 start-0 w-100 h-100"></div>
            </figure>

            <div class="card-body position-absolute bottom-0 start-0 w-100 p-4 text-white">
              <div v-if="card.icon" class="card-icon-wrap mb-2">
                <i :class="card.icon" class="fs-4"></i>
              </div>

              <h3 v-if="card.title" class="card-title h5  mb-2">
                {{ card.title }}
              </h3>

              <p v-if="card.subtitle" class="card-subtitle small mb-3 opacity-75">
                {{ card.subtitle }}
              </p>

              <p v-if="card.description" class="card-description small mb-3 opacity-75">
                {{ card.description }}
              </p>

              <div v-if="card.ctas?.length" class="d-flex flex-wrap gap-2">
                <a
                  v-for="(cta, c) in card.ctas"
                  :key="c"
                  :href="cta.href"
                  class="btn btn-sm"
                  :class="cta.variant === 'outline' ? 'btn-outline-light' : 'btn-scheme'"
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
  id: { type: String, default: 'section-cards-overlay' },
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
      return 'col-12'
    case 2:
      return 'col-12 col-md-6'
    case 3:
      return 'col-12 col-sm-6 col-lg-4'
    case 4:
      return 'col-12 col-sm-6 col-lg-3'
    default:
      return 'col-12 col-sm-6 col-lg-4'
  }
})
</script>

<style lang="less" scoped>
.section-cards-overlay {
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
    &.card-item--clickable {
      cursor: pointer;
    }

    &:hover .card-media img {
      transform: scale(1.05);
    }

    &:hover .card-overlay {
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        rgba(0, 0, 0, 0.2) 100%
      );
    }
  }

  .card-media {
    overflow: hidden;

    img {
      transition: transform 0.5s ease;
    }
  }

  .card-overlay {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.2) 60%,
      rgba(0, 0, 0, 0.1) 100%
    );
    transition: background 0.3s ease;
  }

  .card-icon-wrap {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in oklab, var(--accent), transparent 20%);
    border-radius: 50%;
    color: #fff;
  }

  .card-body {
    z-index: 2;
  }

  .card-title {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  .card-subtitle,
  .card-description {
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  .btn-outline-light {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.5);
    color: #fff;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: #fff;
    }
  }

  @media (max-width: 768px) {
    .card-body {
      padding: 1.5rem;
    }
  }
}
</style>