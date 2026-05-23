<template>
  <section
    :id="id"
    class="section section-cards-compact py-5 position-relative overflow-hidden"
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

      <div class="cards-grid d-flex flex-wrap" :class="justifyClass">
        <div
          v-for="(card, i) in cards"
          :key="card.id || i"
          class="card-col"
          data-aos="fade-up"
          :data-aos-delay="60 * i"
          @click="card.onClick ? card.onClick(card) : null"
        >
          <article
            class="card-item text-center p-3 rounded-4"
            :class="{ 'card-item--clickable': card.href || card.onClick }"
          >
            <div class="card-icon-wrap mb-2">
              <i v-if="card.icon" :class="card.icon"></i>
            </div>
            <p class="card-title small fw-semibold mb-0">{{ card.title }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-cards-compact' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  cols: { type: Number, default: 5 },
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
</script>

<style lang="less" scoped>
.section-cards-compact {
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

  .cards-grid {
    row-gap: 1rem;
    column-gap: 1rem;
  }

  .card-col {
    flex: 0 1 calc((100% / v-bind('props.cols')) - 1rem);
    max-width: 160px;
    min-width: 100px;

    @media (max-width: 992px) {
      flex: 0 1 calc(20% - 0.8rem);
    }

    @media (max-width: 768px) {
      flex: 0 1 calc(25% - 0.75rem);
    }

    @media (max-width: 576px) {
      flex: 0 1 calc(33.333% - 0.667rem);
    }
  }

  .card-item {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: transform 0.2s ease, border-color 0.2s ease;

    &.card-item--clickable {
      cursor: pointer;
    }

    &:hover {
      transform: translateY(-3px);
      border-color: var(--accent);
    }
  }

  .card-icon-wrap {
    width: 52px;
    height: 52px;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in oklab, var(--accent), transparent 90%);
    border-radius: 50%;
    color: var(--accent);
    transition: transform 0.2s ease;

    i {
      font-size: 1.5rem;
      line-height: 1;
    }

    .card-item:hover & {
      transform: scale(1.1);
    }
  }

  .card-title {
    color: var(--text);
    line-height: 1.3;
    word-break: break-word;
  }

  @media (max-width: 576px) {
    .card-icon-wrap {
      width: 44px;
      height: 44px;

      i {
        font-size: 1.25rem;
      }
    }
  }
}
</style>