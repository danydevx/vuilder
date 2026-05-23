<template>
  <section
    :id="id"
    class="section section-portfolio-mosaic py-5 position-relative overflow-hidden"
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

      <div class="mosaic-grid">
        <article
          v-for="(project, i) in projects"
          :key="project.id || i"
          class="mosaic-item rounded-4 overflow-hidden"
          :class="[
            { 'mosaic-item--clickable': project.href || project.onClick },
            project.size === 'large' ? 'mosaic-large' : '',
            project.size === 'tall' ? 'mosaic-tall' : ''
          ]"
          data-aos="fade-up"
          :data-aos-delay="80 * i"
          @click="project.onClick ? project.onClick(project) : null"
        >
          <figure class="mosaic-media m-0 h-100">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
            <div class="mosaic-overlay position-absolute top-0 start-0 w-100 h-100">
              <div class="mosaic-content">
                <span v-if="project.category" class="mosaic-category badge">
                  {{ project.category }}
                </span>
                <h3 v-if="project.title" class="mosaic-title h5  mb-2">
                  {{ project.title }}
                </h3>
                <p v-if="project.year" class="mosaic-year small">
                  {{ project.year }}
                </p>
                <p v-if="project.description" class="mosaic-description small">
                  {{ project.description }}
                </p>
              </div>
            </div>
          </figure>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-portfolio-mosaic' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  cols: { type: Number, default: 3 },
  projects: { type: Array, default: () => [] }
})

const schemeClass = computed(() =>
  props.scheme ? `component-scheme-${props.scheme}` : ''
)

const containerClass = computed(() => [
  props.fluid ? 'container-fluid px-3 px-md-5' : 'container',
  'position-relative'
])

const headerAlignClass = computed(() => ({
  'text-center': props.align === 'center',
  'text-start': props.align === 'left',
  'text-end': props.align === 'right'
}))
</script>

<style lang="less" scoped>
.section-portfolio-mosaic {
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

  .mosaic-grid {
    display: grid;
    grid-template-columns: repeat(v-bind('props.cols'), 1fr);
    grid-auto-rows: 280px;
    gap: 1rem;

    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 220px;
    }

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
      grid-auto-rows: 240px;
    }
  }

  .mosaic-item {
    position: relative;
    overflow: hidden;

    &.mosaic-large {
      grid-column: span 2;
      grid-row: span 2;
    }

    &.mosaic-tall {
      grid-row: span 2;
    }

    &.mosaic-item--clickable {
      cursor: pointer;
    }

    &:hover {
      .mosaic-overlay {
        opacity: 1;
      }

      .mosaic-media img {
        transform: scale(1.06);
      }
    }

    @media (max-width: 576px) {
      &.mosaic-large,
      &.mosaic-tall {
        grid-column: span 1;
        grid-row: span 1;
      }
    }
  }

  .mosaic-media {
    overflow: hidden;
    position: relative;

    img {
      transition: transform 0.5s ease;
    }
  }

  .mosaic-overlay {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: flex-end;
  }

  .mosaic-content {
    padding: 1.25rem;
    color: #fff;
    width: 100%;
  }

  .mosaic-category {
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .mosaic-title {
    color: #fff;
    margin-top: 0.5rem;
  }

  .mosaic-year {
    color: rgba(255, 255, 255, 0.7);
  }

  .mosaic-description {
    color: rgba(255, 255, 255, 0.8);
    margin-top: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>