<!-- src/sections/terrazas/content/SectionContent6.vue -->
<template>
  <section
    :id="id"
    class="section section-content-6 position-relative overflow-hidden py-5"
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
      <div
        class="row align-items-center gy-5"
        :class="[justifyClass, { 'flex-row-reverse': order === 'inverted' }]"
      >
        <div
          class="col-lg-6 position-relative"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="800"
        >
          <div class="image-frame rounded-4 shadow-lg overflow-hidden">
            <img
              :src="content.image"
              :alt="content.title || 'Visual principal'"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
            <div
              v-if="content.badge"
              class="floating-badge rounded-4 shadow-sm text-center"
            >
              <i v-if="content.icon" :class="[content.icon, 'fs-4 mb-2']"></i>
              <p class="fw-semibold small mb-0">{{ content.badge }}</p>
            </div>
          </div>
        </div>

        <div
          class="col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <header :class="[headerAlignClass, 'mb-4']">
            <h2 class="fw-bold display-6 mb-3">{{ title }}</h2>
            <p v-if="subtitle" class=" lead" style="max-width: 42rem">
              {{ subtitle }}
            </p>
          </header>

          <div class="feature-stack mt-4">
            <div
              v-for="(item, i) in content.features"
              :key="i"
              class="feature-item d-flex align-items-start gap-3 p-3 rounded-4 shadow-sm glassy"
              :data-aos="animate ? 'fade-up' : null"
              :data-aos-delay="i * 100"
            >
              <div class="icon-circle flex-shrink-0">
                <i :class="[item.icon, 'fs-5']"></i>
              </div>
              <div>
                <h6 class="fw-bold mb-1">{{ item.title }}</h6>
                <p class="small  mb-0">{{ item.text }}</p>
              </div>
            </div>
          </div>

          <div
            v-if="content.cta || ctas?.length"
            class="d-flex flex-wrap gap-2 mt-4"
            :class="justifyClass"
          >
            <a
              v-if="content.cta"
              :href="content.cta.href || '#'"
              class="btn btn-secondary-accent fw-semibold rounded-pill px-4 py-2"
            >
              <i v-if="content.cta.icon" :class="[content.cta.icon, 'me-2']"></i>
              {{ content.cta.label }}
            </a>

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
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-6' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

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
</script>

<style lang="less" scoped>
.section-content-6 {
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

  .image-frame {
    aspect-ratio: 4 / 3;
    background: var(--surface-2);
    position: relative;

    img {
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    .floating-badge {
      position: absolute;
      bottom: 1.25rem;
      left: 1.25rem;
      background: color-mix(in srgb, var(--surface) 70%, var(--accent) 5%);
      backdrop-filter: blur(10px);
      padding: 0.75rem 1rem;
      width: 160px;
      color: var(--text);
      i {
        color: var(--accent);
        display: block;
      }
    }
  }

  .feature-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .feature-item {
      border: 1px solid var(--surface-border);
      transition: all 0.25s ease;

      &:hover {
        transform: translateY(-3px);
        border-color: var(--accent);
      }

      .icon-circle {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: color-mix(in srgb, var(--accent) 15%, var(--surface));
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          color: var(--accent);
        }
      }
    }
  }

  .btn-secondary-accent {
    background: var(--secondary-accent);
    color: var(--text-inverse);
    border: none;
    transition: all 0.25s ease;

    &:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
  }

  @media (max-width: 992px) {
    .row {
      flex-direction: column !important;
    }
    .image-frame {
      margin-bottom: 2rem;
    }
  }
}
</style>
