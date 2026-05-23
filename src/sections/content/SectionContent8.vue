<!-- src/sections/terrazas/content/SectionContent8.vue -->
<template>
  <section
    :id="id"
    class="section section-content-8 position-relative overflow-hidden py-5"
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
        class="row align-items-center g-5"
        :class="[justifyClass, { 'flex-row-reverse': order === 'inverted' }]"
      >
        <div
          class="col-lg-6 position-relative"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="800"
        >
          <div class="photo-stack position-relative rounded-4 overflow-hidden shadow-lg">
            <img
              :src="content.imageMain"
              alt="Imagen principal"
              class="main-photo rounded-4"
              loading="lazy"
            />
            <img
              v-if="content.imageSecondary"
              :src="content.imageSecondary"
              alt="Imagen secundaria"
              class="secondary-photo rounded-4 shadow-sm"
              loading="lazy"
            />
            <div
              v-if="content.badge"
              class="experience-badge rounded-4 shadow-sm text-center"
            >
              <h3 class="fw-bold mb-0">{{ content.badge.value }}</h3>
              <p class="small mb-0">{{ content.badge.label }}</p>
            </div>
          </div>
        </div>

        <div
          class="col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <header :class="[headerAlignClass, 'mb-4']">
            <p
              v-if="content.overline"
              class="text-uppercase small  text-accent mb-2"
            >
              {{ content.overline }}
            </p>
            <h2 class="fw-bold display-6 mb-3">{{ title }}</h2>
            <p v-if="subtitle" class=" lead mb-4">{{ subtitle }}</p>
          </header>

          <ul class="list-unstyled mb-4">
            <li
              v-for="(feature, i) in content.features"
              :key="i"
              class="d-flex align-items-start gap-2 mb-2"
              :data-aos="animate ? 'fade-up' : null"
              :data-aos-delay="i * 100"
            >
              <i class="bi bi-check-circle-fill text-accent fs-5"></i>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <div
            v-if="content.contact"
            class="contact-box d-flex align-items-center gap-3 p-3 rounded-4 shadow-sm glassy mb-4"
          >
            <div class="icon-circle">
              <i class="bi bi-telephone-fill"></i>
            </div>
            <div>
              <p class="mb-0 small ">{{ content.contact.label }}</p>
              <h6 class="fw-bold mb-0">{{ content.contact.value }}</h6>
            </div>
          </div>

          <div
            v-if="content.signature"
            class="signature d-flex align-items-center gap-3"
          >
            <img
              v-if="content.signature.image"
              :src="content.signature.image"
              alt="Firma"
              class="signature-img"
            />
            <div>
              <p class="fw-semibold mb-0">{{ content.signature.name }}</p>
              <small class="">{{ content.signature.role }}</small>
            </div>
          </div>

          <div
            v-if="ctas?.length"
            class="d-flex flex-wrap gap-2 mt-4"
            :class="justifyClass"
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-8' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  justify: { type: String, default: 'center' },
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
.section-content-8 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.08;
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .photo-stack {
    position: relative;

    .main-photo {
      width: 100%;
      height: auto;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    &:hover .main-photo {
      transform: scale(1.05);
    }

    .secondary-photo {
      position: absolute;
      bottom: -1.5rem;
      right: -1.5rem;
      width: 55%;
      border: 4px solid var(--surface);
      transition: transform 0.4s ease;
    }

    &:hover .secondary-photo {
      transform: translateY(-4px);
    }

    .experience-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: var(--accent);
      color: var(--text-inverse);
      padding: 1rem 1.5rem;
      min-width: 120px;
    }
  }

  .contact-box {
    border: 1px solid var(--surface-border);
    background: color-mix(in srgb, var(--surface) 80%, var(--accent) 4%);
    transition: all 0.25s ease;

    &:hover {
      transform: translateY(-2px);
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
      color: var(--accent);
      font-size: 1.2rem;
    }
  }

  .signature {
    .signature-img {
      width: 120px;
      height: auto;
      opacity: 0.8;
    }
  }

  @media (max-width: 992px) {
    .row {
      flex-direction: column !important;
    }
    .secondary-photo {
      display: none;
    }
  }
}
</style>
