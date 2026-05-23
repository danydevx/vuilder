<template>
  <section
    :id="id"
    class="section section-portfolio-expand py-5 position-relative overflow-hidden"
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

            <div class="project-expanded position-absolute top-0 start-0 w-100 h-100">
              <div class="expanded-content d-flex flex-column justify-content-end h-100 p-4">
                <span v-if="project.category" class="expanded-category badge mb-2">
                  {{ project.category }}
                </span>
                <h3 v-if="project.title" class="expanded-title h5  mb-2">
                  {{ project.title }}
                </h3>
                <p v-if="project.year || project.client" class="expanded-meta small mb-2">
                  <span v-if="project.client">{{ project.client }}</span>
                  <span v-if="project.client && project.year"> · </span>
                  <span v-if="project.year">{{ project.year }}</span>
                </p>
                <p v-if="project.description" class="expanded-description small mb-3">
                  {{ project.description }}
                </p>
                <div v-if="project.tags?.length" class="expanded-tags d-flex flex-wrap gap-1 mb-3">
                  <span v-for="(tag, t) in project.tags" :key="t" class="tag-badge">
                    {{ tag }}
                  </span>
                </div>
                <div v-if="project.cta" class="mt-auto">
                  <a
                    :href="project.cta.href || '#'"
                    class="btn btn-sm"
                    :class="project.cta.variant === 'outline' ? 'btn-outline' : 'btn-scheme'"
                    @click.stop
                  >
                    <i v-if="project.cta.icon" :class="project.cta.icon" class="me-1" aria-hidden="true"></i>
                    {{ project.cta.label }}
                  </a>
                </div>
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
  id: { type: String, default: 'section-portfolio-expand' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 3 },
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
    case 1:
      return 'col-12'
    case 2:
      return 'col-12 col-md-6'
    case 3:
      return 'col-12 col-sm-6 col-lg-4'
    case 4:
      return 'col-12 col-sm-6 col-lg-3'
    default:
      return 'col-12 col-sm-6 col-lg-4'
  }
})
</script>

<style lang="less" scoped>
.section-portfolio-expand {
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
    &.project-card--clickable {
      cursor: pointer;
    }

    &:hover {
      .project-expanded {
        opacity: 1;
      }

      .project-media img {
        transform: scale(1.1);
      }
    }
  }

  .project-media {
    overflow: hidden;

    img {
      transition: transform 0.5s ease;
    }
  }

  .project-expanded {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.92) 0%,
      rgba(0, 0, 0, 0.7) 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
    display: flex;
    align-items: flex-end;
  }

  .expanded-content {
    color: #fff;
    transform: translateY(10px);
    transition: transform 0.35s ease;
  }

  .project-card:hover .expanded-content {
    transform: translateY(0);
  }

  .expanded-category {
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 600;
    display: inline-block;
  }

  .expanded-title {
    color: #fff;
  }

  .expanded-meta {
    color: rgba(255, 255, 255, 0.7);
  }

  .expanded-description {
    color: rgba(255, 255, 255, 0.85);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .tag-badge {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
    font-size: 0.65rem;
    font-weight: 500;
  }

  .btn-outline {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.5);
    color: #fff;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: #fff;
    }
  }
}
</style>