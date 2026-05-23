<template>
  <section
    :id="id"
    class="section section-portfolio-stack py-5 position-relative overflow-hidden"
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

      <div class="portfolio-stack">
        <article
          v-for="(project, i) in projects"
          :key="project.id || i"
          class="project-item d-flex align-items-center gap-4 rounded-4 p-3 mb-3"
          :class="{ 'project-item--clickable': project.href || project.onClick }"
          data-aos="fade-up"
          :data-aos-delay="80 * i"
          @click="project.onClick ? project.onClick(project) : null"
        >
          <figure class="project-thumb rounded-3 overflow-hidden flex-shrink-0">
            <img
              :src="project.image"
              :alt="project.title"
              loading="lazy"
            />
          </figure>

          <div class="project-info flex-grow-1">
            <div class="d-flex align-items-center gap-2 mb-1">
              <span v-if="project.category" class="project-category text-accent small fw-semibold">
                {{ project.category }}
              </span>
              <span v-if="project.year" class="project-year  small">
                {{ project.year }}
              </span>
            </div>
            <h3 class="project-title h6 fw-semibold mb-1">{{ project.title }}</h3>
            <p v-if="project.client" class="project-client  small mb-0">
              {{ project.client }}
            </p>
          </div>

          <div class="project-arrow flex-shrink-0">
            <i class="bi bi-arrow-right"></i>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-portfolio-stack' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
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
.section-portfolio-stack {
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

  .portfolio-stack {
    max-width: 800px;
    margin: 0 auto;
  }

  .project-item {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &.project-item--clickable {
      cursor: pointer;
    }

    &:hover {
      transform: translateX(6px);
      box-shadow: var(--shadow-lg);
      border-color: var(--accent);

      .project-thumb img {
        transform: scale(1.08);
      }

      .project-arrow {
        transform: translateX(4px);
        color: var(--accent);
      }
    }
  }

  .project-thumb {
    width: 80px;
    height: 80px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  .project-category {
    color: var(--accent);
  }

  .project-year {
    color: var(--);
  }

  .project-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .project-client {
    color: var(--);
  }

  .project-arrow {
    font-size: 1.25rem;
    color: var(--);
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .text-accent {
    color: var(--accent);
  }

  @media (max-width: 576px) {
    .project-thumb {
      width: 60px;
      height: 60px;
    }
  }
}
</style>