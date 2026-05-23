<template>
  <section
    :id="id"
    class="section section-portfolio-minimal py-5 position-relative overflow-hidden"
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

      <div class="row g-4" :class="justifyClass">
        <div
          v-for="(project, i) in projects"
          :key="project.id || i"
          :class="colClass"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
        >
          <article
            class="project-card h-100 position-relative rounded-4 overflow-hidden"
            :class="{ 'project-card--clickable': project.href || project.onClick }"
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

            <div class="project-year-overlay position-absolute top-0 end-0 p-3">
              <span class="year-badge">{{ project.year }}</span>
            </div>

            <div class="project-body p-3">
              <span v-if="project.category" class="project-category d-block mb-1">
                {{ project.category }}
              </span>
              <h3 v-if="project.title" class="project-title h6  mb-1">
                {{ project.title }}
              </h3>
              <p v-if="project.client" class="project-client  small mb-0">
                {{ project.client }}
              </p>
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
  id: { type: String, default: 'section-portfolio-minimal' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 4 },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
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

const justifyClass = computed(() => {
  const map = {
    start: 'justify-content-start',
    center: 'justify-content-center',
    end: 'justify-content-end',
    between: 'justify-content-between',
    around: 'justify-content-around'
  }
  return map[props.justify] || 'justify-content-center'
})

const colClass = computed(() => {
  switch (props.cols) {
    case 2:
      return 'col-12 col-sm-6'
    case 3:
      return 'col-12 col-sm-6 col-lg-4'
    case 4:
      return 'col-6 col-lg-3'
    case 5:
      return 'col-6 col-lg-2'
    default:
      return 'col-6 col-lg-3'
  }
})
</script>

<style lang="less" scoped>
.section-portfolio-minimal {
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

  .project-card {
    background: var(--surface-2);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &.project-card--clickable {
      cursor: pointer;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);

      .project-media img {
        transform: scale(1.04);
      }
    }
  }

  .project-media {
    overflow: hidden;

    img {
      transition: transform 0.4s ease;
    }
  }

  .project-year-overlay {
    z-index: 2;
  }

  .year-badge {
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
  }

  .project-category {
    color: var(--accent);
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .project-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .project-client {
    color: var(--);
  }
}
</style>