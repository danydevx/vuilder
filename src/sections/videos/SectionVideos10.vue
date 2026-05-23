<template>
  <section
    :id="id"
    class="section section-videos-floatcards py-5 position-relative overflow-hidden"
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

      <div class="float-cards-grid">
        <article
          v-for="(video, i) in videos"
          :key="video.id || i"
          class="float-card"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
          @mouseenter="hoveredVideo = video"
          @mouseleave="hoveredVideo = null"
        >
          <div class="card-base rounded-4 p-4">
            <div class="card-icon mb-3">
              <i :class="video.icon || 'bi bi-play-circle'"></i>
            </div>
            <h3 class="card-title h6 fw-semibold mb-2">{{ video.title }}</h3>
            <p v-if="video.category" class="card-category text-accent small mb-2">{{ video.category }}</p>
            <p v-if="video.description" class="card-description small  mb-0">
              {{ video.description }}
            </p>
          </div>

          <transition name="floatzoom">
            <div v-if="hoveredVideo === video" class="card-popup rounded-4 overflow-hidden">
              <div class="popup-video">
                <iframe
                  v-if="video.embedId"
                  :src="`https://www.youtube.com/embed/${video.embedId}?autoplay=1&mute=1`"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <video
                  v-else-if="video.url"
                  :src="video.url"
                  class="w-100"
                  autoplay
                  muted
                  controls
                />
              </div>
              <div class="popup-info p-3">
                <p class="popup-title fw-semibold mb-0">{{ video.title }}</p>
              </div>
            </div>
          </transition>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-videos-floatcards' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 3 },
  align: { type: String, default: 'center' },
  headerAlignClass: { type: String, default: '' },
  videos: { type: Array, default: () => [] }
})

const hoveredVideo = ref(null)

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

const colClass = computed(() => {
  switch (props.cols) {
    case 2: return 'col-12 col-md-6'
    case 3: return 'col-12 col-md-6 col-lg-4'
    case 4: return 'col-12 col-sm-6 col-lg-3'
    default: return 'col-12 col-md-6 col-lg-4'
  }
})
</script>

<style lang="less" scoped>
.section-videos-floatcards {
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
    justify-content: center;
  }

  .float-card {
    flex: 1 1 calc((100% / v-bind('props.cols')) - 1.5rem);
    min-width: 280px;
    max-width: 350px;
    position: relative;
  }

  .card-base {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    .float-card:hover & {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
    }
  }

  .card-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in oklab, var(--accent), transparent 88%);
    border-radius: 0.75rem;
    color: var(--accent);
    font-size: 1.75rem;
  }

  .card-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .card-category {
    color: var(--accent);
  }

  .card-description {
    color: var(--);
  }

  .text-accent {
    color: var(--accent);
  }

  .card-popup {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: var(--surface);
    border: 1px solid var(--surface-border);
    box-shadow: var(--shadow-lg), 0 20px 50px rgba(0, 0, 0, 0.2);
  }

  .popup-video {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;

    iframe, video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .popup-info {
    background: var(--surface-2);
    border-top: 1px solid var(--surface-border);
  }

  .popup-title {
    color: var(--text);
    font-size: 0.9rem;
  }

  .floatzoom-enter-active {
    transition: all 0.3s ease;
  }
  .floatzoom-leave-active {
    transition: all 0.2s ease;
  }
  .floatzoom-enter-from {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }
  .floatzoom-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
}
</style>