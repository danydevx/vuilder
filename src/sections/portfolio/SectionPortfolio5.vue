<template>
  <section
    :id="id"
    class="section section-portfolio-alternate py-5 position-relative overflow-hidden"
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

      <div class="portfolio-alternate">
        <article
          v-for="(project, i) in projects"
          :key="project.id || i"
          class="project-row d-flex align-items-center gap-4 mb-5"
          :class="{ 'flex-row-reverse': i % 2 !== 0 }"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
        >
          <figure class="project-media rounded-4 overflow-hidden flex-shrink-0"
            :class="{ 'project-media--clickable': project.href || project.onClick }"
            @click="project.onClick ? project.onClick(project) : null"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="object-fit-cover"
              loading="lazy"
            />
          </figure>

          <div class="project-content flex-grow-1">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span v-if="project.category" class="project-category badge">
                {{ project.category }}
              </span>
              <span v-if="project.year" class="project-year  small">
                {{ project.year }}
              </span>
            </div>

            <h3 v-if="project.title" class="project-title h4  mb-3">
              {{ project.title }}
            </h3>

            <p v-if="project.client" class="project-client small mb-2">
              <i class="bi bi-building me-1"></i>{{ project.client }}
            </p>

            <p v-if="project.description" class="project-description  mb-3">
              {{ project.description }}
            </p>

            <div v-if="project.tags?.length" class="project-tags d-flex flex-wrap gap-2">
              <span v-for="(tag, t) in project.tags" :key="t" class="tag-badge">
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
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-portfolio-alternate' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  imageSize: { type: String, default: '400px' },
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
.section-portfolio-alternate {
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

  .project-row {
    @media (max-width: 768px) {
      flex-direction: column !important;

      .project-media {
        width: 100% !important;
        height: 220px !important;
      }
    }
  }

  .project-media {
    width: v-bind('props.imageSize');
    height: v-bind('props.imageSize');
    overflow: hidden;
    transition: transform 0.3s ease;

    &.project-media--clickable {
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 100%;
      transition: transform 0.5s ease;
    }

    &:hover {
      transform: scale(1.02);

      img {
        transform: scale(1.05);
      }
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
  }

  .project-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .project-description {
    color: var(--);
    line-height: 1.7;
    max-width: 500px;
  }

  .tag-badge {
    background: color-mix(in oklab, var(--accent), transparent 90%);
    color: var(--accent);
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
  }
}
</style>