<template>
  <section
    :id="id"
    class="section section-portfolio-hero py-5 position-relative overflow-hidden"
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

      <article
        v-if="featured"
        class="featured-project rounded-4 overflow-hidden"
        data-aos="fade-up"
      >
        <div class="row g-0">
          <div class="col-lg-7">
            <figure class="featured-media m-0">
              <img
                :src="featured.image"
                :alt="featured.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </figure>
          </div>

          <div class="col-lg-5">
            <div class="featured-content p-4 p-lg-5 d-flex flex-column h-100">
              <div class="mb-auto">
                <div class="d-flex align-items-center gap-3 mb-3">
                  <span v-if="featured.category" class="featured-category badge">
                    {{ featured.category }}
                  </span>
                  <span v-if="featured.year" class="featured-year  small">
                    {{ featured.year }}
                  </span>
                </div>

                <h3 class="featured-title display-6  mb-3">
                  {{ featured.title }}
                </h3>

                <p v-if="featured.client" class="featured-client small mb-3">
                  <i class="bi bi-building me-1"></i>{{ featured.client }}
                </p>

                <p v-if="featured.description" class="featured-description  mb-4">
                  {{ featured.description }}
                </p>
              </div>

              <div class="mt-auto">
                <div v-if="featured.tags?.length" class="featured-tags d-flex flex-wrap gap-2 mb-4">
                  <span v-for="(tag, t) in featured.tags" :key="t" class="tag-badge">
                    {{ tag }}
                  </span>
                </div>

                <div v-if="featured.cta" class="featured-cta">
                  <a
                    :href="featured.cta.href || '#'"
                    class="btn btn-lg"
                    :class="featured.cta.variant === 'outline' ? 'btn-outline' : 'btn-scheme'"
                  >
                    <i v-if="featured.cta.icon" :class="featured.cta.icon" class="me-2" aria-hidden="true"></i>
                    {{ featured.cta.label }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div v-if="projects?.length" class="project-thumbnails mt-4">
        <div class="row g-3">
          <div
            v-for="(project, i) in projects"
            :key="project.id || i"
            class="col-6 col-md-3"
            data-aos="fade-up"
            :data-aos-delay="100 * i"
          >
            <article
              class="thumb-card rounded-3 overflow-hidden"
              :class="{ 'thumb-card--active': selectedIndex === i, 'thumb-card--clickable': project.onClick }"
              @click="selectProject(i, project)"
            >
              <figure class="thumb-media ratio ratio-16x9 m-0">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-100 h-100 object-fit-cover"
                  loading="lazy"
                />
              </figure>
              <div class="thumb-info p-2">
                <p class="thumb-title small fw-semibold mb-0 text-truncate">
                  {{ project.title }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-portfolio-hero' },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  featured: { type: Object, default: null },
  projects: { type: Array, default: () => [] }
})

const selectedIndex = ref(0)

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

function selectProject(index, project) {
  selectedIndex.value = index
  if (project.onClick) {
    project.onClick(project)
  }
}
</script>

<style lang="less" scoped>
.section-portfolio-hero {
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

  .featured-project {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    min-height: 480px;

    @media (max-width: 992px) {
      min-height: auto;
    }
  }

  .featured-media {
    overflow: hidden;

    img {
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.03);
    }
  }

  .featured-content {
    background: var(--surface);
  }

  .featured-category {
    background: var(--accent);
    color: var(--accent-contrast);
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .featured-year {
    color: var(--);
  }

  .featured-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .featured-client {
    color: var(--);
  }

  .featured-description {
    color: var(--);
    line-height: 1.7;
  }

  .tag-badge {
    background: color-mix(in oklab, var(--accent), transparent 90%);
    color: var(--accent);
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .thumb-card {
    border: 2px solid transparent;
    transition: border-color 0.2s ease, transform 0.2s ease;

    &.thumb-card--clickable {
      cursor: pointer;
    }

    &.thumb-card--active {
      border-color: var(--accent);
    }

    &:hover:not(.thumb-card--active) {
      border-color: var(--surface-border);
      transform: translateY(-2px);
    }
  }

  .thumb-title {
    color: var(--text);
  }

  @media (max-width: 768px) {
    .featured-title {
      font-size: 1.75rem;
    }
  }
}
</style>