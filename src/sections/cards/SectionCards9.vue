<template>
  <section
    :id="id"
    class="section section-cards-quotes py-5 position-relative overflow-hidden"
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
            class="quote-card h-100 rounded-4 p-4 position-relative"
            :class="{ 'quote-card--clickable': card.href || card.onClick }"
            @click="card.onClick ? card.onClick(card) : null"
          >
            <div class="quote-mark" aria-hidden="true">
              <i class="bi bi-quote"></i>
            </div>

            <div class="quote-content">
              <p v-if="card.quote" class="quote-text mb-3">
                "{{ card.quote }}"
              </p>

              <div class="quote-author d-flex align-items-center gap-3">
                <figure v-if="card.authorImage" class="author-avatar m-0">
                  <img
                    :src="card.authorImage"
                    :alt="card.author"
                    class="rounded-circle"
                    loading="lazy"
                  />
                </figure>

                <div>
                  <p v-if="card.author" class="author-name fw-semibold mb-0">
                    {{ card.author }}
                  </p>
                  <p v-if="card.role" class="author-role small  mb-0">
                    {{ card.role }}
                  </p>
                </div>
              </div>

              <div v-if="card.rating" class="quote-rating mt-3">
                <i
                  v-for="star in 5"
                  :key="star"
                  :class="star <= card.rating ? 'bi bi-star-fill' : 'bi bi-star'"
                  class="me-1"
                ></i>
              </div>
            </div>

            <div v-if="card.icon" class="quote-icon-overlay">
              <i :class="card.icon"></i>
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
  id: { type: String, default: 'section-cards-quotes' },
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
      return 'col-12 col-md-6 col-lg-4'
    case 4:
      return 'col-12 col-sm-6 col-lg-3'
    default:
      return 'col-12 col-md-6 col-lg-4'
  }
})
</script>

<style lang="less" scoped>
.section-cards-quotes {
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

  .quote-card {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    overflow: hidden;

    &.quote-card--clickable {
      cursor: pointer;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
  }

  .quote-mark {
    position: absolute;
    top: 0.75rem;
    right: 1rem;
    font-size: 4rem;
    line-height: 1;
    color: color-mix(in oklab, var(--accent), transparent 85%);
    font-family: Georgia, serif;
    pointer-events: none;
  }

  .quote-icon-overlay {
    position: absolute;
    bottom: -10px;
    right: -10px;
    font-size: 6rem;
    color: color-mix(in oklab, var(--accent), transparent 92%);
    pointer-events: none;
    transform: rotate(-15deg);
  }

  .quote-content {
    position: relative;
    z-index: 1;
  }

  .quote-text {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text);
    font-style: italic;
  }

  .author-avatar {
    width: 48px;
    height: 48px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .author-name {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .author-role {
    color: var(--);
  }

  .quote-rating {
    color: var(--accent);

    i {
      font-size: 0.875rem;
    }
  }

  @media (max-width: 768px) {
    .quote-mark {
      font-size: 3rem;
    }

    .quote-icon-overlay {
      font-size: 4rem;
    }
  }
}
</style>