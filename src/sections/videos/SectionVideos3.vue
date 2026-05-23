<template>
  <section
    :id="id"
    class="section section-videos-carousel py-5 position-relative overflow-hidden"
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
        class="section__header mb-4"
        :class="headerAlignClass"
        data-aos="fade-up"
      >
        <p v-if="eyebrow" class="section__eyebrow">{{ eyebrow }}</p>
        <h2 v-if="title" class="section__title ">{{ title }}</h2>
        <p v-if="subtitle" class="section__subtitle mt-2">{{ subtitle }}</p>
      </header>

      <div class="carousel-section">
        <div class="main-video mb-3" data-aos="fade-up">
          <div class="main-video-container rounded-4 overflow-hidden position-relative">
            <figure class="main-thumb m-0">
              <img
                v-if="activeVideo"
                :src="activeVideo.thumbnail || `https://img.youtube.com/vi/${activeVideo.embedId}/maxresdefault.jpg`"
                :alt="activeVideo.title"
                class="w-100"
              />
            </figure>

            <div class="main-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
              <button
                class="play-btn rounded-circle"
                @click="openModal"
                aria-label="Reproducir"
              >
                <i class="bi bi-play-fill"></i>
              </button>
            </div>

            <div v-if="activeVideo?.duration" class="duration-badge position-absolute bottom-0 end-0 m-3">
              {{ activeVideo.duration }}
            </div>
          </div>

          <div v-if="activeVideo" class="main-info p-3">
            <h3 class="main-title h5  mb-2">{{ activeVideo.title }}</h3>
            <p v-if="activeVideo.description" class="main-description  mb-0">
              {{ activeVideo.description }}
            </p>
          </div>
        </div>

        <div class="video-playlist d-flex gap-3 overflow-auto pb-3">
          <article
            v-for="(video, i) in videos"
            :key="video.id || i"
            class="playlist-item flex-shrink-0 rounded-3 overflow-hidden"
            :class="{ active: activeIndex === i }"
            :style="{ width: thumbWidth }"
            @click="setActive(i)"
          >
            <figure class="playlist-thumb ratio ratio-16x9 m-0">
              <img
                :src="video.thumbnail || `https://img.youtube.com/vi/${video.embedId}/mqdefault.jpg`"
                :alt="video.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
              <div class="play-indicator position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                <i class="bi bi-play-circle-fill"></i>
              </div>
            </figure>
            <div class="playlist-info p-2">
              <p class="playlist-title small fw-semibold mb-0 text-truncate">{{ video.title }}</p>
              <p v-if="video.duration" class="playlist-duration  small mb-0">{{ video.duration }}</p>
            </div>
          </article>
        </div>
      </div>

      <transition name="quickfade">
        <div v-if="showModal" class="video-modal-backdrop" @click.self="closeModal">
          <div class="video-modal rounded-4 overflow-hidden">
            <div class="modal-header p-2 border-0 d-flex justify-content-end">
              <button class="btn btn-ghost" @click="closeModal" aria-label="Cerrar">
                <i class="bi bi-x fs-4"></i>
              </button>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                v-if="activeVideo?.embedId"
                :src="`https://www.youtube.com/embed/${activeVideo.embedId}?autoplay=1`"
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
import { ref, computed, watch } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-videos-carousel' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  thumbWidth: { type: String, default: '160px' },
  align: { type: String, default: 'center' },
  headerAlignClass: { type: String, default: '' },
  videos: { type: Array, default: () => [] }
})

const activeIndex = ref(0)
const showModal = ref(false)

const activeVideo = computed(() => props.videos[activeIndex.value] || null)

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

function setActive(index) {
  activeIndex.value = index
}

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
.section-videos-carousel {
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

  .main-video-container {
    position: relative;
    cursor: pointer;

    &:hover .play-btn {
      transform: scale(1.1);
    }
  }

  .main-thumb {
    overflow: hidden;

    img {
      transition: transform 0.4s ease;
    }
  }

  &:hover .main-thumb img {
    transform: scale(1.02);
  }

  .main-overlay {
    background: linear-gradient(
      to bottom,
      transparent 40%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }

  .play-btn {
    width: 70px;
    height: 70px;
    background: var(--accent);
    color: var(--accent-contrast);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    transition: transform 0.2s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

    i {
      margin-left: 3px;
    }
  }

  .duration-badge {
    background: rgba(0, 0, 0, 0.85);
    color: #fff;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .main-info {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    border-top: none;
    border-radius: 0 0 0.75rem 0.75rem;
  }

  .main-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .main-description {
    color: var(--);
  }

  .video-playlist {
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: var(--surface-2);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--accent-muted);
      border-radius: 2px;
    }
  }

  .playlist-item {
    background: var(--surface-2);
    border: 2px solid transparent;
    cursor: pointer;
    scroll-snap-align: start;
    transition: border-color 0.2s ease, transform 0.2s ease;

    &.active {
      border-color: var(--accent);
    }

    &:hover:not(.active) {
      transform: translateY(-2px);
      border-color: var(--surface-border);
    }
  }

  .playlist-thumb {
    position: relative;
    overflow: hidden;
  }

  .play-indicator {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 1.5rem;
    opacity: 0;
    transition: opacity 0.2s ease;

    .playlist-item:hover &,
    .playlist-item.active & {
      opacity: 1;
    }

    .playlist-item.active & {
      color: var(--accent);
    }
  }

  .playlist-title {
    color: var(--text);
  }

  .playlist-duration {
    color: var(--);
  }

  .video-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
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
      width: 50px;
      height: 50px;
      font-size: 1.25rem;
    }

    .playlist-item {
      width: 120px !important;
    }
  }
}
</style>