<template>
  <section
    :id="id"
    class="section section-videos-grid py-5 position-relative overflow-hidden"
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

      <div class="row g-4">
        <div
          v-for="(item, i) in videos"
          :key="item.id || i"
          :class="colClass"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
        >
          <article
            class="video-card h-100 rounded-4 overflow-hidden"
            @click="openModal(item)"
          >
            <figure class="video-thumb ratio ratio-16x9 m-0 position-relative">
              <img
                v-if="item.thumbnail"
                :src="item.thumbnail"
                :alt="item.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
              <img
                v-else-if="item.embedId"
                :src="`https://img.youtube.com/vi/${item.embedId}/mqdefault.jpg`"
                :alt="item.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />

              <div class="play-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                <div class="play-btn rounded-circle">
                  <i class="bi bi-play-fill"></i>
                </div>
              </div>

              <span v-if="item.duration" class="duration-badge position-absolute bottom-0 end-0 m-2">
                {{ item.duration }}
              </span>
            </figure>

            <div class="video-info p-3">
              <span v-if="item.category" class="video-category text-accent small fw-semibold d-block mb-1">
                {{ item.category }}
              </span>
              <h3 v-if="item.title" class="video-title h6 fw-semibold mb-1">
                {{ item.title }}
              </h3>
              <p v-if="item.description" class="video-description small  mb-0">
                {{ item.description }}
              </p>
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
              <h4 class="h6  mb-0">{{ activeVideo.title }}</h4>
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
  id: { type: String, default: 'section-videos-grid' },
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

const colClass = computed(() => {
  switch (props.cols) {
    case 1: return 'col-12'
    case 2: return 'col-12 col-md-6'
    case 3: return 'col-12 col-sm-6 col-lg-4'
    case 4: return 'col-12 col-sm-6 col-lg-3'
    default: return 'col-12 col-sm-6 col-lg-4'
  }
})

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
.section-videos-grid {
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

  .video-card {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);

      .play-overlay {
        background: rgba(0, 0, 0, 0.5);
      }

      .play-btn {
        transform: scale(1.1);
      }

      .video-thumb img {
        transform: scale(1.05);
      }
    }
  }

  .video-thumb {
    overflow: hidden;

    img {
      transition: transform 0.4s ease;
    }
  }

  .play-overlay {
    background: rgba(0, 0, 0, 0.35);
    transition: background 0.3s ease;
  }

  .play-btn {
    width: 50px;
    height: 50px;
    background: var(--accent);
    color: var(--accent-contrast);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: transform 0.2s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

    i {
      margin-left: 2px;
    }
  }

  .duration-badge {
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }

  .video-category {
    color: var(--accent);
  }

  .video-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .video-description {
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
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }
  }
}
</style>