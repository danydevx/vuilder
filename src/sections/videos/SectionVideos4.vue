<template>
  <section
    :id="id"
    class="section section-videos-list py-5 position-relative overflow-hidden"
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

      <div class="video-list">
        <article
          v-for="(video, i) in videos"
          :key="video.id || i"
          class="video-item d-flex align-items-center gap-4 rounded-4 p-3 mb-3"
          @click="openModal(video)"
          data-aos="fade-up"
          :data-aos-delay="80 * i"
        >
          <div class="video-thumb rounded-3 overflow-hidden flex-shrink-0">
            <img
              v-if="video.thumbnail"
              :src="video.thumbnail"
              :alt="video.title"
              loading="lazy"
            />
            <img
              v-else-if="video.embedId"
              :src="`https://img.youtube.com/vi/${video.embedId}/mqdefault.jpg`"
              :alt="video.title"
              loading="lazy"
            />
            <div class="play-overlay d-flex align-items-center justify-content-center">
              <i class="bi bi-play-circle-fill fs-3"></i>
            </div>
          </div>

          <div class="video-content flex-grow-1">
            <div class="d-flex align-items-center gap-2 mb-1">
              <span v-if="video.category" class="video-category text-accent small fw-semibold">
                {{ video.category }}
              </span>
              <span v-if="video.duration" class="video-duration  small">
                {{ video.duration }}
              </span>
            </div>
            <h3 class="video-title h6 fw-semibold mb-1">{{ video.title }}</h3>
            <p v-if="video.description" class="video-description  small mb-0">
              {{ video.description }}
            </p>
          </div>

          <div class="video-arrow flex-shrink-0">
            <i class="bi bi-play-fill"></i>
          </div>
        </article>
      </div>

      <transition name="quickfade">
        <div v-if="activeVideo" class="video-modal-backdrop" @click.self="closeModal">
          <div class="video-modal rounded-4 overflow-hidden">
            <div class="modal-header p-2 border-0 d-flex justify-content-end">
              <button class="btn btn-ghost" @click="closeModal" aria-label="Cerrar">
                <i class="bi bi-x fs-4"></i>
              </button>
            </div>
            <div class="video-embed-wrapper">
              <iframe
                v-if="activeVideo.embedId"
                :src="`https://www.youtube.com/embed/${activeVideo.embedId}?autoplay=1`"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <video
                v-else-if="activeVideo.url"
                :src="activeVideo.url"
                class="w-100"
                controls
                autoplay
              />
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
  id: { type: String, default: 'section-videos-list' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  headerAlignClass: { type: String, default: '' },
  videos: { type: Array, default: () => [] }
})

const activeVideo = ref(null)

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

function openModal(video) {
  activeVideo.value = video
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  activeVideo.value = null
  document.body.style.overflow = ''
}
</script>

<style lang="less" scoped>
.section-videos-list {
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

  .video-list {
    max-width: 800px;
    margin: 0 auto;
  }

  .video-item {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

    &:hover {
      transform: translateX(6px);
      box-shadow: var(--shadow-lg);
      border-color: var(--accent);

      .video-thumb img {
        transform: scale(1.08);
      }

      .play-overlay {
        background: rgba(0, 0, 0, 0.5);
        color: var(--accent);
      }

      .video-arrow {
        transform: translateX(4px);
        color: var(--accent);
      }
    }
  }

  .video-thumb {
    width: 120px;
    height: 80px;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  .play-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    transition: background 0.2s ease, color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-category {
    color: var(--accent);
  }

  .video-duration {
    color: var(--);
  }

  .video-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .video-description {
    color: var(--);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .video-arrow {
    font-size: 1.5rem;
    color: var(--);
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .text-accent {
    color: var(--accent);
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
    max-width: 800px;
    background: #000;
  }

  .video-embed-wrapper {
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

  .quickfade-enter-active,
  .quickfade-leave-active {
    transition: opacity 0.2s ease;
  }
  .quickfade-enter-from,
  .quickfade-leave-to {
    opacity: 0;
  }

  @media (max-width: 576px) {
    .video-thumb {
      width: 90px;
      height: 60px;
    }

    .video-arrow {
      display: none;
    }
  }
}
</style>