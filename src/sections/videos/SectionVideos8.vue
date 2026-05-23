<template>
  <section
    :id="id"
    class="section section-videos-parallax py-5 position-relative overflow-hidden"
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

      <div class="parallax-wrapper">
        <div
          v-for="(video, i) in videos"
          :key="video.id || i"
          class="parallax-item mb-4"
          data-aos="fade-up"
          :data-aos-delay="150 * i"
        >
          <article
            class="video-card rounded-4 overflow-hidden"
            @click="openModal(video)"
          >
            <div class="video-scene position-relative">
              <figure class="video-media m-0">
                <img
                  v-if="video.thumbnail"
                  :src="video.thumbnail"
                  :alt="video.title"
                  class="w-100"
                  loading="lazy"
                />
                <img
                  v-else-if="video.embedId"
                  :src="`https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`"
                  :alt="video.title"
                  class="w-100"
                  loading="lazy"
                />
              </figure>

              <div class="video-overlay d-flex flex-column justify-content-between p-4">
                <div class="d-flex justify-content-end">
                  <span v-if="video.duration" class="duration-badge">
                    {{ video.duration }}
                  </span>
                </div>

                <div>
                  <div class="play-btn-wrapper mb-3">
                    <div class="play-btn rounded-circle">
                      <i class="bi bi-play-fill"></i>
                    </div>
                  </div>

                  <h3 v-if="video.title" class="video-title h4  mb-2">{{ video.title }}</h3>

                  <div v-if="video.category || video.year" class="video-meta">
                    <span v-if="video.category" class="meta-item">
                      <i class="bi bi-tag me-1"></i>{{ video.category }}
                    </span>
                    <span v-if="video.year" class="meta-item">
                      <i class="bi bi-calendar me-1"></i>{{ video.year }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
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
            <div v-if="activeVideo.title" class="modal-footer p-3 border-0">
              <h4 class="h5  mb-0">{{ activeVideo.title }}</h4>
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
  id: { type: String, default: 'section-videos-parallax' },
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
.section-videos-parallax {
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

  .parallax-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  .video-card {
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.01);

      .video-media img {
        transform: scale(1.1);
      }

      .video-overlay {
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(0, 0, 0, 0.6) 50%,
          rgba(0, 0, 0, 0.3) 100%
        );
      }

      .play-btn {
        transform: scale(1.15);
        background: var(--accent-hover);
      }
    }
  }

  .video-scene {
    position: relative;
    overflow: hidden;
    border-radius: 0.75rem;
  }

  .video-media {
    overflow: hidden;

    img {
      transition: transform 0.6s ease;
      display: block;
    }
  }

  .video-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.15) 100%
    );
    transition: background 0.4s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    color: #fff;
  }

  .duration-badge {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .play-btn-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .play-btn {
    width: 60px;
    height: 60px;
    background: var(--accent);
    color: var(--accent-contrast);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: transform 0.2s ease, background 0.2s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);

    i {
      margin-left: 3px;
    }
  }

  .video-title {
    color: #fff;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .video-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .meta-item {
    display: flex;
    align-items: center;
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

    iframe, video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .modal-footer {
    background: var(--surface);
    color: var(--text);
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
      width: 48px;
      height: 48px;
      font-size: 1.25rem;
    }

    .video-overlay {
      padding: 1rem;
    }
  }
}
</style>