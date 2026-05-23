<template>
  <section
    :id="id"
    class="section section-portfolio-carousel py-5 position-relative overflow-hidden"
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

      <div class="carousel-wrapper">
        <div class="portfolio-carousel d-flex gap-4 overflow-auto pb-4">
          <article
            v-for="(project, i) in projects"
            :key="project.id || i"
            class="project-card flex-shrink-0 rounded-4 overflow-hidden"
            :class="{ 'project-card--clickable': project.href || project.onClick }"
            :style="{ width: cardWidth }"
            data-aos="fade-up"
            :data-aos-delay="100 * i"
            @click="project.onClick ? project.onClick(project) : null"
          >
            <figure class="project-media ratio ratio-4x3 m-0">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </figure>

            <div class="project-body p-3">
              <span v-if="project.category" class="project-category badge mb-2 d-inline-block">
                {{ project.category }}
              </span>

              <h3 v-if="project.title" class="project-title h6 fw-semibold mb-1">
                {{ project.title }}
              </h3>

              <div v-if="project.year || project.client" class="project-meta small ">
                <span v-if="project.client">{{ project.client }}</span>
                <span v-if="project.client && project.year"> · </span>
                <span v-if="project.year">{{ project.year }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-portfolio-carousel' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  cardWidth: { type: String, default: '300px' },
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
.section-portfolio-carousel {
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

  .portfolio-carousel {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: var(--surface-2);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--accent-muted);
      border-radius: 3px;
    }
  }

  .project-card {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    scroll-snap-align: start;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &.project-card--clickable {
      cursor: pointer;
    }

    &:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
    }
  }

  .project-media {
    overflow: hidden;

    img {
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.06);
    }
  }

  .project-category {
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .project-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .project-meta {
    margin-top: 0.25rem;
  }
}
</style>