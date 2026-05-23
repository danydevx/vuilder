<template>
  <section
    :id="id"
    class="section section-videos-hero py-5 position-relative overflow-hidden"
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
        <h2 v-if="title" class="section__title">{{ title }}</h2>
        <p v-if="subtitle" class="section__subtitle mt-2">{{ subtitle }}</p>
      </header>

      <div class="video-hero-wrapper rounded-4 overflow-hidden" data-aos="fade-up">
        <div class="video-container position-relative">
          <video
            v-if="video.url"
            :src="video.url"
            :poster="video.poster"
            class="video-element w-100"
            controls
            :autoplay="video.autoplay"
            :loop="video.loop"
            :muted="video.muted"
          />
          <img
            v-else-if="video.embedId"
            :src="`https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`"
            :alt="video.title"
            class="w-100"
          />

          <div class="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
            <button
              v-if="video.embedId"
              class="play-btn rounded-circle"
              @click="openModal"
              aria-label="Reproducir video"
            >
              <i class="bi bi-play-fill"></i>
            </button>
          </div>
        </div>

        <div v-if="video.title || video.description" class="video-info p-4">
          <div class="d-flex align-items-center gap-3 mb-2">
            <span v-if="video.category" class="video-category badge">
              {{ video.category }}
            </span>
            <span v-if="video.duration" class="video-duration  small">
              <i class="bi bi-clock me-1"></i>{{ video.duration }}
            </span>
          </div>
          <h3 v-if="video.title" class="video-title h5  mb-2">{{ video.title }}</h3>
          <p v-if="video.description" class="video-description  mb-0">{{ video.description }}</p>
        </div>
      </div>

      <transition name="quickfade">
        <div v-if="showModal" class="video-modal-backdrop" @click.self="closeModal">
          <div class="video-modal rounded-4 overflow-hidden">
            <div class="modal-header p-3 border-0 d-flex justify-content-end">
              <button class="btn btn-ghost" @click="closeModal" aria-label="Cerrar">
                <i class="bi bi-x fs-4"></i>
              </button>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                v-if="video.embedId"
                :src="`https://www.youtube.com/embed/${video.embedId}?autoplay=1`"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-videos-hero' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  headerAlignClass: { type: String, default: '' },
  video: { type: Object, default: () => ({}) }
})

const showModal = ref(false)

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

function openModal() {
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  showModal.value = false
  document.body.style.overflow = ''
}
</script>

<style lang="less" scoped>
.section-videos-hero {
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

  .video-hero-wrapper {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
  }

  .video-container {
    position: relative;
  }

  .video-element {
    display: block;
    max-height: 70vh;
    object-fit: contain;
    background: #000;
  }

  .video-overlay {
    background: linear-gradient(
      to bottom,
      transparent 30%,
      rgba(0, 0, 0, 0.4) 100%
    );
    pointer-events: none;
  }

  .play-btn {
    width: 80px;
    height: 80px;
    background: var(--accent);
    color: var(--accent-contrast);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    cursor: pointer;
    pointer-events: auto;
    transition: transform 0.2s ease, background 0.2s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

    &:hover {
      transform: scale(1.1);
      background: var(--accent-hover);
    }

    i {
      margin-left: 4px;
    }
  }

  .video-info {
    border-top: 1px solid var(--surface-border);
  }

  .video-category {
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .video-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .video-description {
    color: var(--);
    line-height: 1.6;
  }

  .video-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .video-modal {
    width: 100%;
    max-width: 900px;
    background: #000;
  }

  .video-embed-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .quickfade-enter-active,
  .quickfade-leave-active {
    transition: opacity 0.2s ease;
  }
  .quickfade-enter-from,
  .quickfade-leave-to {
    opacity: 0;
  }

  @media (max-width: 768px) {
    .play-btn {
      width: 60px;
      height: 60px;
      font-size: 1.5rem;
    }
  }
}
</style>