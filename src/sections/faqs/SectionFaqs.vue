<!-- src/sections/terrazas/faqs/SectionFaqAccordion.vue -->
<template>
  <section
    :id="id"
    class="section section-faq-accordion position-relative overflow-hidden"
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

    <!-- 🧭 Header -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <header
        :class="['section-header mb-5', headerAlignClass]"
        v-bind="aosAttrs('fade-up')"
      >
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p
          v-if="subtitle"
          class=" mt-2"
          :class="textAlignClass"
          style="max-width: 42rem"
        >
          {{ subtitle }}
        </p>
      </header>
    </div>

    <!-- 💬 Contenido -->
    <div
      :class="[
        fluid ? 'container-fluid px-3 px-md-5' : 'container',
        boxed ? 'p-4 p-md-5' : 'p-0 ps-lg-5 pe-lg-4 py-5',
        'position-relative',
      ]"
      :style="{ zIndex: 2 }"
    >
      <!-- Acordeón -->
      <div
        class="accordion mx-auto"
        :id="`${id}-accordion`"
        v-bind="aosAttrs('fade-up')"
      >
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="accordion-item border-0 mb-3 rounded-4 shadow-sm overflow-hidden"
        >
          <h2 class="accordion-header" :id="`heading-${i}`">
            <button
              class="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse-${i}`"
              aria-expanded="false"
              :aria-controls="`collapse-${i}`"
            >
              <i v-if="faq.icon" :class="faq.icon" class="me-2 text-accent"></i>
              {{ faq.question }}
            </button>
          </h2>
          <div
            :id="`collapse-${i}`"
            class="accordion-collapse collapse"
            :aria-labelledby="`heading-${i}`"
            :data-bs-parent="`#${id}-accordion`"
          >
            <div class="accordion-body">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div
        v-if="ctas?.length"
        class="text-center mt-5"
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
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-faq-accordion' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  ctas: { type: Array, default: () => [] },
  faqs: { type: Array, default: () => [] },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' }, // left | center | right
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

/** Controla si aplicar AOS dinámicamente */
const aosAttrs = (animation) => {
  return props.animate
    ? { 'data-aos': animation, 'data-aos-duration': '700' }
    : {}
}
</script>

<style lang="less" scoped>
.section-faq-accordion {
  background: var(--surface);
  color: var(--text);
  overflow: hidden;
  position: relative;

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.65);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.55)
    );
    z-index: 1;
  }

  .accordion {
    max-width: 800px;
  }

  .accordion-button {
    background: var(--surface-2);
    color: var(--text);
    border: none;
    font-weight: 600;
    padding: 1.25rem 1.5rem;
    transition: all 0.3s ease;

    &:not(.collapsed) {
      background: color-mix(in srgb, var(--accent) 15%, var(--surface-2) 85%);
      box-shadow: inset 0 -2px 0 var(--accent);
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem color-mix(in srgb, var(--accent) 25%, transparent);
    }
  }

  .accordion-body {
    background: var(--surface);
    color: var(--);
    font-size: 0.95rem;
    line-height: 1.6;
    padding: 1.25rem 1.5rem;
  }

  .text-accent {
    color: var(--accent);
  }

  .btn {
    font-weight: 600;
  }
}
</style>
