<!-- src/sections/terrazas/faqs/SectionFaqCards.vue -->
<template>
  <section
    :id="id"
    class="section section-faq-cards position-relative overflow-hidden"
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

    <!-- 💬 Grid de FAQs -->
    <div
      :class="[
        fluid ? 'container-fluid px-3 px-md-5' : 'container',
        boxed ? 'p-4 p-md-5' : 'p-0 ps-lg-5 pe-lg-4 py-5',
        'position-relative',
      ]"
      :style="{ zIndex: 2 }"
    >
      <div class="row g-4 justify-content-center" v-bind="aosAttrs('fade-up')">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          :class="['faq-col', colClass]"
        >
          <div
            class="faq-card rounded-4 shadow-sm h-100 position-relative"
            @click="toggleFaq(i)"
          >
            <div
              class="faq-header d-flex align-items-center justify-content-between p-4"
            >
              <div class="d-flex align-items-center">
                <i
                  v-if="faq.icon"
                  :class="faq.icon"
                  class="me-2 text-accent fs-5"
                ></i>
                <h3 class="h6  mb-0">{{ faq.question }}</h3>
              </div>
              <i
                class="bi transition fs-5"
                :class="
                  openFaq === i
                    ? 'bi-dash-lg text-accent'
                    : 'bi-plus-lg '
                "
              ></i>
            </div>

            <transition name="faq-expand">
              <div
                v-if="openFaq === i"
                class="faq-body px-4 pb-4  small"
              >
                {{ faq.answer }}
              </div>
            </transition>
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
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-faq-cards' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  ctas: { type: Array, default: () => [] },
  faqs: { type: Array, default: () => [] },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  cols: { type: [Number, String], default: 3 }, // número de columnas dinámicas
})

const openFaq = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

/** Alineación del encabezado */
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

/** Control AOS seguro (siempre devuelve objeto) */
const aosAttrs = (animation) => {
  if (!props.animate) return { 'data-aos': null }
  return { 'data-aos': animation, 'data-aos-duration': '700' }
}

/** Genera clases de columnas dinámicas */
const colClass = computed(() => {
  const c = Number(props.cols)
  switch (c) {
    case 1:
      return 'col-12 col-md-10'
    case 2:
      return 'col-12 col-md-6'
    case 3:
      return 'col-12 col-md-6 col-lg-4'
    case 4:
      return 'col-12 col-sm-6 col-lg-3'
    case 5:
      return 'col-12 col-sm-6 col-lg-2-4' // puedes definir regla CSS custom si deseas 5 exactas
    default:
      return 'col-12 col-md-6 col-lg-4'
  }
})

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? null : index
}
</script>

<style lang="less" scoped>
.section-faq-cards {
  background: var(--surface);
  color: var(--text);
  position: relative;
  overflow: hidden;

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

  .faq-card {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(8px);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    }

    .faq-header h3 {
      color: var(--text);
      transition: color 0.3s ease;
    }

    .faq-body {
      color: var(--);
      line-height: 1.6;
    }
  }

  /* Animación del contenido */
  .faq-expand-enter-active,
  .faq-expand-leave-active {
    transition: all 0.3s ease;
  }
  .faq-expand-enter-from,
  .faq-expand-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }

  .text-accent {
    color: var(--accent);
  }

  .btn {
    font-weight: 600;
  }
}
</style>
