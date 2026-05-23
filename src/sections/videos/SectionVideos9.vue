<template>
  <section
    :id="id"
    class="section section-videos-stack py-5 position-relative overflow-hidden"
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

      <div class="video-stack d-flex flex-column gap-3">
        <article
          v-for="(video, i) in videos"
          :key="video.id || i"
          class="video-item d-flex gap-4 rounded-4 p-3"
          :class="{ 'video-item--active': activeVideoId === (video.id || i) }"
          @click="selectVideo(video, i)"
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
              <i class="bi bi-play-fill fs-5"></i>
            </div>
            <span v-if="video.duration" class="duration-badge">{{ video.duration }}</span>
          </div>

          <div class="video-content flex-grow-1">
            <div class="d-flex align-items-center gap-2 mb-1">
              <span v-if="video.category" class="video-category badge">
                {{ video.category }}
              </span>
              <span v-if="video.year" class="video-year  small">{{ video.year }}</span>
            </div>
            <h3 class="video-title h6 fw-semibold mb-1">{{ video.title }}</h3>
            <p v-if="video.description" class="video-description  small mb-2">
              {{ video.description }}
            </p>
            <div v-if="video.tags?.length" class="video-tags d-flex flex-wrap gap-1">
              <span v-for="(tag, t) in video.tags" :key="t" class="tag-badge">{{ tag }}</span>
            </div>
          </div>

          <div class="video-play flex-shrink-0 d-flex align-items-center">
            <i :class="activeVideoId === (video.id || i) ? 'bi bi-pause-circle-fill' : 'bi bi-play-circle'"></i>
          </div>
        </article>
      </div>

      <div v-if="activeVideo" class="video-preview mt-4 rounded-4 overflow-hidden" data-aos="fade-up">
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
        <div class="video-preview-info p-3">
          <h4 class="h5  mb-1">{{ activeVideo.title }}</h4>
          <p v-if="activeVideo.description" class=" small mb-0">{{ activeVideo.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-videos-stack' },
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

const activeVideoId = ref(null)
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

function selectVideo(video, index) {
  if (activeVideoId.value === (video.id || index)) {
    activeVideoId.value = null
    activeVideo.value = null
  } else {
    activeVideoId.value = video.id || index
    activeVideo.value = video
  }
}
</script>

<style lang="less" scoped>
.section-videos-stack {
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

  .video-stack {
    max-width: 800px;
    margin: 0 auto;
  }

  .video-item {
    background: var(--surface-2);
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--surface-border);
      transform: translateX(4px);

      .video-thumb img {
        transform: scale(1.08);
      }

      .play-overlay {
        background: rgba(0, 0, 0, 0.5);
      }
    }

    &.video-item--active {
      border-color: var(--accent);
      background: color-mix(in oklab, var(--accent), transparent 95%);

      .play-overlay {
        background: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .video-thumb {
    width: 140px;
    height: 90px;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;

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
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
  }

  .duration-badge {
    position: absolute;
    bottom: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.85);
    color: #fff;
    font-size: 0.65rem;
    padding: 0.15rem 0.35rem;
    border-radius: 3px;
  }

  .video-category {
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .video-year {
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

  .tag-badge {
    background: var(--surface-muted);
    color: var(--);
    font-size: 0.65rem;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
  }

  .video-play {
    font-size: 2rem;
    color: var(--accent);
  }

  .video-preview {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    max-width: 800px;
    margin: 0 auto;
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

  .video-preview-info {
    border-top: 1px solid var(--surface-border);
  }

  @media (max-width: 576px) {
    .video-thumb {
      width: 100px;
      height: 65px;
    }

    .video-play {
      font-size: 1.5rem;
    }
  }
}
</style>