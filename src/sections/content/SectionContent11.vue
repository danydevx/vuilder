<!-- src/sections/terrazas/content/SectionContent11.vue -->
<template>
  <section
    :id="id"
    class="section section-content-11 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <header
        v-if="title || subtitle"
        :class="[headerAlignClass, 'mb-4']"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-duration="700"
      >
        <p
          v-if="content.overline"
          class="text-uppercase small  text-accent mb-2"
        >
          {{ content.overline }}
        </p>
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p v-if="subtitle" class=" lead">{{ subtitle }}</p>
      </header>

      <div
        class="video-wrapper position-relative rounded-4 overflow-hidden shadow-lg mx-auto"
        :data-aos="animate ? 'zoom-in' : null"
        data-aos-duration="800"
      >
        <a
          v-if="content.videoUrl"
          :href="content.videoUrl"
          class="glightbox d-block position-relative w-100 h-100"
          data-gallery="video"
        >
          <img
            :src="content.thumb"
            alt="Video thumbnail"
            class="w-100 h-100 object-fit-cover"
            loading="lazy"
          />

          <div
            class="video-overlay d-flex flex-column justify-content-center align-items-center text-center"
          >
            <button class="play-btn mb-3">
              <i class="bi bi-play-fill"></i>
            </button>
            <h3 class="fw-bold text-white mb-0">{{ content.ctaText }}</h3>
          </div>
        </a>
      </div>

      <div
        v-if="ctas?.length"
        class="d-flex flex-wrap gap-2 justify-content-center mt-5"
      >
        <a
          v-for="(cta, i) in ctas"
          :key="i"
          :href="cta.href"
          class="btn"
          :class="[
            cta.variant === 'solid'
              ? 'btn-scheme'
              : cta.variant === 'outline'
              ? 'btn-outline'
              : 'btn-ghost'
          ]"
        >
          <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
          {{ cta.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed, nextTick } from 'vue'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

const props = defineProps({
  id: { type: String, default: 'section-content-11' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: false },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const headerAlignClass = computed(() => ({
  'text-center mx-auto': props.align === 'center',
  'text-start me-auto': props.align === 'left',
  'text-end ms-auto': props.align === 'right'
}))

onMounted(async () => {
  await nextTick()
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    zoomable: true,
    autoplayVideos: true,
    openEffect: 'fade',
    closeEffect: 'fade',
    moreText: ''
  })
})
</script>

<style lang="less" scoped>
.section-content-11 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.1;
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .video-wrapper {
    max-width: 960px;
    position: relative;
    cursor: pointer;

    img {
      transition: transform 0.6s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    .video-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        color-mix(in srgb, var(--accent) 60%, transparent) 0%,
        transparent 80%
      );
      color: var(--text-inverse);
      transition: all 0.3s ease;
      padding: 1rem;

      .play-btn {
        background: var(--text-inverse);
        color: var(--accent);
        border: none;
        border-radius: 50%;
        width: 70px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        transition: all 0.25s ease;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

        &:hover {
          transform: scale(1.1);
          background: var(--accent);
          color: var(--text-inverse);
        }
      }

      h3 {
        font-size: clamp(1.5rem, 2.5vw, 2.2rem);
      }
    }
  }

  @media (max-width: 768px) {
    .video-wrapper {
      max-width: 100%;
    }

    .play-btn {
      width: 60px;
      height: 60px;
      font-size: 1.8rem;
    }

    h3 {
      font-size: 1.25rem;
    }
  }
}
</style>
