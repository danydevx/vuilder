<template>
  <section
    :id="id"
    class="section section-portfolio-list py-5 position-relative overflow-hidden"
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

      <div class="portfolio-list d-flex flex-column gap-4">
        <article
          v-for="(project, i) in projects"
          :key="project.id || i"
          class="project-item rounded-4 overflow-hidden"
          :class="[{ 'project-item--clickable': project.href || project.onClick, featured: project.featured }]"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
          @click="project.onClick ? project.onClick(project) : null"
        >
          <div class="row g-0">
            <div v-if="project.image" class="col-lg-5">
              <figure class="project-media m-0 h-100">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-100 h-100 object-fit-cover"
                  loading="lazy"
                />
              </figure>
            </div>

            <div class="col-lg-7">
              <div class="project-body p-4 h-100 d-flex flex-column">
                <div class="d-flex align-items-center gap-3 mb-3">
                  <span v-if="project.category" class="project-category badge">
                    {{ project.category }}
                  </span>
                  <span v-if="project.year" class="project-year  small">
                    {{ project.year }}
                  </span>
                  <span v-if="project.client" class="project-client  small">
                    <i class="bi bi-person me-1"></i>{{ project.client }}
                  </span>
                </div>

                <h3 v-if="project.title" class="project-title h4  mb-3">
                  {{ project.title }}
                </h3>

                <p v-if="project.description" class="project-description  flex-grow-1">
                  {{ project.description }}
                </p>

                <div v-if="project.tags?.length" class="project-tags d-flex flex-wrap gap-2 mt-3">
                  <span
                    v-for="(tag, t) in project.tags"
                    :key="t"
                    class="tag-badge"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div v-if="project.cta" class="mt-4">
                  <a
                    :href="project.cta.href || '#'"
                    class="btn"
                    :class="project.cta.variant === 'outline' ? 'btn-outline' : 'btn-scheme'"
                  >
                    <i v-if="project.cta.icon" :class="project.cta.icon" class="me-1" aria-hidden="true"></i>
                    {{ project.cta.label }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-portfolio-list' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
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
</script>

<style lang="less" scoped>
.section-portfolio-list {
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

  .project-item {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &.project-item--clickable {
      cursor: pointer;
    }

    &.featured {
      border-left: 4px solid var(--accent);
    }

    &:hover {
      transform: translateX(4px);
      box-shadow: var(--shadow-lg);
    }

    @media (max-width: 992px) {
      .project-media {
        min-height: 200px;
      }
    }
  }

  .project-media {
    overflow: hidden;

    img {
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.03);
    }
  }

  .project-category {
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .project-year,
  .project-client {
    color: var(--);
    font-size: 0.85rem;
  }

  .project-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .project-description {
    color: var(--);
    line-height: 1.7;
  }

  .tag-badge {
    background: color-mix(in oklab, var(--accent), transparent 88%);
    color: var(--accent);
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
}
</style>