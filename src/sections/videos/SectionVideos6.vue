<template>
  <section
    :id="id"
    class="section section-videos-split py-5 position-relative overflow-hidden"
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

      <div class="row g-0 split-wrapper rounded-4 overflow-hidden">
        <div class="col-lg-7">
          <article class="video-main position-relative h-100" @click="openModal">
            <figure class="video-media m-0 h-100">
              <img
                v-if="video.thumbnail"
                :src="video.thumbnail"
                :alt="video.title"
                class="w-100 h-100 object-fit-cover"
              />
              <img
                v-else-if="video.embedId"
                :src="`https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`"
                :alt="video.title"
                class="w-100 h-100 object-fit-cover"
              />
              <div class="video-overlay d-flex align-items-center justify-content-center">
                <div class="play-btn rounded-circle">
                  <i class="bi bi-play-fill"></i>
                </div>
              </div>
            </figure>
          </article>
        </div>

        <div class="col-lg-5">
          <div class="video-content p-4 p-lg-5 h-100 d-flex flex-column justify-content-center">
            <div class="mb-auto">
              <div class="d-flex align-items-center gap-3 mb-3">
                <span v-if="video.category" class="video-category badge">
                  {{ video.category }}
                </span>
                <span v-if="video.duration" class="video-duration  small">
                  <i class="bi bi-clock me-1"></i>{{ video.duration }}
                </span>
              </div>

              <h3 class="video-title display-6  mb-3">
                {{ video.title }}
              </h3>

              <p v-if="video.description" class="video-description  mb-4">
                {{ video.description }}
              </p>

              <div v-if="video.tags?.length" class="video-tags d-flex flex-wrap gap-2">
                <span v-for="(tag, t) in video.tags" :key="t" class="tag-badge">
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="mt-4">
              <button class="btn btn-lg" :class="video.cta?.variant === 'outline' ? 'btn-outline' : 'btn-scheme'" @click="openModal">
                <i class="bi bi-play-circle me-2"></i>
                {{ video.cta?.label || 'Reproducir' }}
              </button>
            </div>
          </div>
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
                v-if="video.embedId"
                :src="`https://www.youtube.com/embed/${video.embedId}?autoplay=1`"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <video
                v-else-if="video.url"
                :src="video.url"
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
  id: { type: String, default: 'section-videos-split' },
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
.section-videos-split {
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

  .split-wrapper {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    min-height: 500px;
  }

  .video-main {
    cursor: pointer;

    &:hover {
      .video-media img {
        transform: scale(1.03);
      }

      .play-btn {
        transform: scale(1.1);
      }
    }
  }

  .video-media {
    overflow: hidden;
    position: relative;

    img {
      transition: transform 0.5s ease;
    }
  }

  .video-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      transparent 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
  }

  .play-btn {
    width: 80px;
    height: 80px;
    background: var(--accent);
    color: var(--accent-contrast);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    transition: transform 0.2s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

    i {
      margin-left: 4px;
    }
  }

  .video-content {
    background: var(--surface);
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

  .video-duration {
    color: var(--);
  }

  .video-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .video-description {
    color: var(--);
    line-height: 1.7;
  }

  .tag-badge {
    background: color-mix(in oklab, var(--accent), transparent 90%);
    color: var(--accent);
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
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

  .quickfade-enter-active,
  .quickfade-leave-active {
    transition: opacity 0.2s ease;
  }
  .quickfade-enter-from,
  .quickfade-leave-to {
    opacity: 0;
  }

  @media (max-width: 992px) {
    .split-wrapper {
      min-height: auto;
    }

    .video-main {
      min-height: 300px;
    }

    .video-title {
      font-size: 1.75rem;
    }

    .play-btn {
      width: 60px;
      height: 60px;
      font-size: 1.5rem;
    }
  }
}
</style>