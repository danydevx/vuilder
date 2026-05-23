<template>
  <section
    :id="id"
    class="section section-videos-beforeafter py-5 position-relative overflow-hidden"
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

      <div class="ba-wrapper" data-aos="fade-up">
        <div class="ba-container rounded-4 overflow-hidden position-relative">
          <figure class="ba-media m-0">
            <img
              :src="beforeAfter.afterImage || beforeAfter.image"
              alt="After"
              class="ba-image after"
            />
            <img
              v-if="beforeAfter.beforeImage"
              :src="beforeAfter.beforeImage"
              alt="Before"
              class="ba-image before"
              :style="{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }"
            />
          </figure>

          <div class="ba-slider position-absolute top-0 bottom-0" :style="{ left: `${sliderValue}%` }">
            <div class="ba-handle rounded-circle">
              <i class="bi bi-arrows-expand"></i>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            :value="sliderValue"
            class="ba-range"
            @input="updateSlider"
          />

          <div class="ba-labels position-absolute top-0 start-0 w-100 h-100 pointer-events-none">
            <span class="ba-label before-label">Antes</span>
            <span class="ba-label after-label">Después</span>
          </div>
        </div>

        <div class="ba-info p-4 text-center">
          <h3 v-if="beforeAfter.title" class="ba-title h5  mb-2">{{ beforeAfter.title }}</h3>
          <p v-if="beforeAfter.description" class="ba-description  mb-0">{{ beforeAfter.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-videos-beforeafter' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  headerAlignClass: { type: String, default: '' },
  beforeAfter: { type: Object, default: () => ({}) }
})

const sliderValue = ref(50)

const schemeClass = computed(() =>
  props.scheme ? `component-scheme-${props.scheme}` : ''
)

const containerClass = computed(() => [
  props.fluid ? 'container-fluid px-3 px-md-5' : 'container',
  'position-relative'
])

const headerAlignClass = computed(() =>
  props.headerAlignClass ||
  (props.align === 'left' ? 'text-start' : props.align === 'right' ? 'text-end' : 'text-center')
)

function updateSlider(e) {
  sliderValue.value = parseInt(e.target.value)
}
</script>

<style lang="less" scoped>
.section-videos-beforeafter {
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

  .ba-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  .ba-container {
    position: relative;
    aspect-ratio: 16 / 9;
    cursor: ew-resize;
    user-select: none;
  }

  .ba-media {
    position: absolute;
    inset: 0;
  }

  .ba-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    &.before {
      z-index: 2;
    }

    &.after {
      z-index: 1;
    }
  }

  .ba-slider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--accent);
    z-index: 3;
    transform: translateX(-50%);
    cursor: ew-resize;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
    }

    &::before {
      top: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 10px solid var(--accent);
    }

    &::after {
      bottom: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 10px solid var(--accent);
    }
  }

  .ba-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    background: var(--accent);
    color: var(--accent-contrast);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .ba-range {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: ew-resize;
    z-index: 10;
    margin: 0;
  }

  .ba-labels {
    pointer-events: none;
  }

  .ba-label {
    position: absolute;
    bottom: 1rem;
    padding: 0.35rem 0.75rem;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 4px;

    &.before-label {
      left: 1rem;
    }

    &.after-label {
      right: 1rem;
    }
  }

  .ba-info {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    border-top: none;
    border-radius: 0 0 0.75rem 0.75rem;
  }

  .ba-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .ba-description {
    color: var(--);
  }
}
</style>