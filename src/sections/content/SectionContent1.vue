<template>
  <section
    :id="id"
    class="section section-content-1 position-relative overflow-hidden py-5"
    :class="[schemeClass]"
  >
    <!-- 🌄 Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- 🧭 Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']">
      <!-- Header -->
      <header
        v-if="title || subtitle"
        class="section-header mb-5"
        :class="headerAlignClass"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-duration="700"
      >
        <h2 class="section-title  mb-2">{{ title }}</h2>
        <p
          v-if="subtitle"
          class="section-subtitle "
          :class="{ 'mx-auto': align === 'center' }"
        >
          {{ subtitle }}
        </p>
      </header>

      <!-- 💡 Layout principal -->
      <div
        class="row align-items-center g-5"
        :class="[justifyClass, { 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- Columna texto -->
        <div
          class="col-12 col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="700"
        >
          <div class="content-block">
            <h3 v-if="content.title" class="fw-semibold mb-3">
              {{ content.title }}
            </h3>
            <p v-if="content.text" class=" mb-4">
              {{ content.text }}
            </p>

            <!--  Lista de características -->
            <ul
              v-if="content.features?.length"
              class="feature-list list-unstyled mb-4"
              :class="{ 'two-cols': content.features.length > 3 }"
            >
              <li
                v-for="(f, i) in content.features"
                :key="i"
                class="d-flex align-items-start mb-3"
              >
                <i
                  v-if="f.icon"
                  :class="[f.icon, 'text-accent fs-4 me-3 flex-shrink-0']"
                ></i>
                <div>
                  <strong class="d-block">{{ f.title }}</strong>
                  <small class="">{{ f.text }}</small>
                </div>
              </li>
            </ul>

            <!-- CTA Buttons -->
            <div v-if="ctas?.length" class="d-flex flex-wrap gap-2">
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

        <!-- Columna imagen -->
        <div
          class="col-12 col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <figure class="image-wrapper rounded-4 shadow-sm overflow-hidden mb-0">
            <img
              v-if="content.image"
              :src="content.image"
              :alt="content.title"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros Servicios' },
  subtitle: { type: String, default: 'Soluciones ideales para tus eventos' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' }, // left | right | center
  justify: { type: String, default: 'center' }, // start | center | end | between | around
  order: { type: String, default: 'normal' }, // normal | inverted
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
.section-content-1 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.9);
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--);
    max-width: 40rem;
  }

  .content-block {
    p {
      line-height: 1.7;
    }

    .feature-list {
      transition: all 0.25s ease;
      &.two-cols {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1rem 2rem;
      }

      li {
        transition: all 0.25s ease;

        &:hover {
          transform: translateX(4px);
          i {
            color: var(--accent-hover);
          }
        }
      }
    }
  }

  .image-wrapper {
    aspect-ratio: 4 / 3;
    background: var(--surface-2);
    img {
      transition: transform 0.6s ease;
    }
    &:hover img {
      transform: scale(1.05);
    }
  }

  @media (max-width: 992px) {
    .row {
      flex-direction: column !important;
    }
    .image-wrapper {
      aspect-ratio: 16 / 9;
    }
    .feature-list.two-cols {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 576px) {
    .feature-list.two-cols {
      grid-template-columns: 1fr;
    }
  }
}
</style>
