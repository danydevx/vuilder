<!-- src/sections/terrazas/faqs/SectionFaqListScrollable.vue -->
<template>
  <section
    :id="id"
    class="section section-faq-list-scroll position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- 🌄 Fondo opcional -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- 🧭 Contenedor -->
    <div
      :class="[
        fluid ? 'container-fluid px-3 px-md-5' : 'container',
        boxed ? 'p-4 p-md-5' : 'p-0 ps-lg-5 pe-lg-4 py-5',
        'position-relative',
      ]"
    >
      <div
        class="row align-items-stretch g-5"
        :class="{ 'flex-lg-row-reverse': order === 'inverted' }"
      >
        <!-- 📸 Imagen lateral -->
        <div
          class="col-12 col-lg-5 d-flex"
          v-bind="aosAttrs(order === 'inverted' ? 'fade-left' : 'fade-right')"
        >
          <figure
            class="faq-image-wrapper rounded-4 overflow-hidden shadow-sm flex-fill"
          >
            <img
              :src="sideImage || 'https://placehold.co/800x1000/jpg?text=FAQ+Image'"
              alt="Ilustración de preguntas frecuentes"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
          </figure>
        </div>

        <!-- 💬 Lista scrollable -->
        <div
          class="col-12 col-lg-7 d-flex flex-column"
          v-bind="aosAttrs(order === 'inverted' ? 'fade-right' : 'fade-left')"
        >
          <header
            class="mb-4"
            :class="headerAlignClass"
          >
            <h2 class="display-6 ">{{ title }}</h2>
            <p
              v-if="subtitle"
              class=""
              :class="textAlignClass"
            >
              {{ subtitle }}
            </p>
          </header>

          <!-- Lista con scroll -->
          <div class="faq-scroll-wrapper position-relative flex-grow-1">
            <div class="faq-scroll-inner pe-3">
              <ul class="faq-list list-unstyled m-0">
                <li
                  v-for="(faq, i) in faqs"
                  :key="i"
                  class="faq-item d-flex align-items-start gap-3 mb-4"
                >
                  <div class="faq-icon mt-1 flex-shrink-0">
                    <i
                      :class="faq.icon || 'bi bi-question-circle'"
                      class="fs-5 text-accent"
                    ></i>
                  </div>
                  <div class="faq-content">
                    <h3 class="h6  mb-1">{{ faq.question }}</h3>
                    <p class="mb-0  small">{{ faq.answer }}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="scroll-gradient-top"></div>
            <div class="scroll-gradient-bottom"></div>
          </div>

          <!-- CTA -->
          <div
            v-if="ctas?.length"
            class="mt-4 text-center text-lg-start"
            v-bind="aosAttrs('fade-up')"
          >
            <a
              v-for="(cta, i) in ctas"
              :key="i"
              :href="cta.href"
              class="btn me-2 mb-2"
              :class="[
                cta.variant === 'solid'
                  ? 'btn-scheme'
                  : cta.variant === 'outline'
                  ? 'btn-outline'
                  : 'btn-ghost',
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
  id: { type: String, default: 'section-faq-list-scroll' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  sideImage: { type: String, default: '' },
  faqs: { type: Array, default: () => [] },
  ctas: { type: Array, default: () => [] },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'left' }, // left | center | right
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' }, // normal | inverted
  animate: { type: Boolean, default: true },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const headerAlignClass = computed(() => {
  return props.align === 'left'
    ? 'text-start'
    : props.align === 'right'
    ? 'text-end'
    : 'text-center'
})

const textAlignClass = computed(() => {
  return props.align === 'left'
    ? 'me-auto'
    : props.align === 'right'
    ? 'ms-auto'
    : 'mx-auto'
})

/** Controla AOS dinámico */
const aosAttrs = (animation) => {
  if (!props.animate) return { 'data-aos': null }
  return { 'data-aos': animation, 'data-aos-duration': '700' }
}
</script>

<style lang="less" scoped>
.section-faq-list-scroll {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.7);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.6)
    );
    z-index: 1;
  }

  .faq-image-wrapper {
    aspect-ratio: 3 / 4;
    background: var(--surface-2);
    img {
      transition: transform 0.5s ease;
    }
    &:hover img {
      transform: scale(1.05);
    }
  }

  .faq-scroll-wrapper {
    position: relative;
    max-height: 480px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--accent) var(--surface-muted);

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--accent);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: var(--surface-muted);
    }

    .scroll-gradient-top,
    .scroll-gradient-bottom {
      position: sticky;
      height: 30px;
      pointer-events: none;
      z-index: 10;
    }

    .scroll-gradient-top {
      top: 0;
      background: linear-gradient(to bottom, var(--surface) 60%, transparent);
    }

    .scroll-gradient-bottom {
      bottom: 0;
      background: linear-gradient(to top, var(--surface) 60%, transparent);
    }
  }

  .faq-item {
    border-bottom: 1px solid var(--surface-border);
    padding-bottom: 1rem;

    &:last-child {
      border-bottom: none;
    }

    .faq-icon {
      color: var(--accent);
    }
  }

  .text-accent {
    color: var(--accent);
  }

  @media (max-width: 992px) {
    .faq-image-wrapper {
      aspect-ratio: 16 / 9;
    }
    .faq-scroll-wrapper {
      max-height: none;
      overflow: visible;
    }
  }
}
</style>
