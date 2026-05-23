<!-- src/sections/terrazas/faqs/SectionFaqs5.vue -->
<template>
  <section
    :id="id"
    class="section section-faq-columns position-relative overflow-hidden"
    :class="schemeClass"
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
    <div
      :class="[
        fluid ? 'container-fluid px-3 px-md-5' : 'container',
        boxed ? 'p-4 p-md-5' : 'p-0 ps-lg-5 pe-lg-4 py-5',
        'position-relative',
      ]"
    >
      <!-- Encabezado -->
      <header
        :class="['mb-5', headerAlignClass]"
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

      <!-- 🧩 Dos columnas -->
      <div
        class="row g-5 justify-content-center"
        :class="{ 'flex-lg-row-reverse': order === 'inverted' }"
      >
        <!-- Columna izquierda -->
        <div
          class="col-12 col-lg-6"
          v-bind="aosAttrs(order === 'inverted' ? 'fade-left' : 'fade-right')"
        >
          <h3
            class="h5  mb-4 text-accent text-center text-lg-start"
          >
            {{ titleLeft }}
          </h3>

          <ul class="faq-list list-unstyled">
            <li
              v-for="(faq, i) in faqsLeft"
              :key="'L' + i"
              class="faq-item p-3 rounded-3 mb-3"
              @click="toggleFaq('L' + i)"
            >
              <div
                class="faq-question d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center gap-3">
                  <span
                    class="faq-number d-inline-flex align-items-center justify-content-center rounded-circle"
                  >
                    {{ i + 1 }}
                  </span>
                  <p class="fw-semibold mb-0">{{ faq.question }}</p>
                </div>
                <i
                  class="bi"
                  :class="
                    openFaq === 'L' + i
                      ? 'bi-dash-circle text-accent'
                      : 'bi-plus-circle '
                  "
                ></i>
              </div>

              <transition name="faq-slide">
                <div
                  v-if="openFaq === 'L' + i"
                  class="faq-answer mt-2 ps-5 small "
                >
                  {{ faq.answer }}
                </div>
              </transition>
            </li>
          </ul>
        </div>

        <!-- Columna derecha -->
        <div
          class="col-12 col-lg-6"
          v-bind="aosAttrs(order === 'inverted' ? 'fade-right' : 'fade-left')"
        >
          <h3
            class="h5  mb-4 text-accent text-center text-lg-start"
          >
            {{ titleRight }}
          </h3>

          <ul class="faq-list list-unstyled">
            <li
              v-for="(faq, i) in faqsRight"
              :key="'R' + i"
              class="faq-item p-3 rounded-3 mb-3"
              @click="toggleFaq('R' + i)"
            >
              <div
                class="faq-question d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center gap-3">
                  <span
                    class="faq-number d-inline-flex align-items-center justify-content-center rounded-circle"
                  >
                    {{ i + 1 }}
                  </span>
                  <p class="fw-semibold mb-0">{{ faq.question }}</p>
                </div>
                <i
                  class="bi"
                  :class="
                    openFaq === 'R' + i
                      ? 'bi-dash-circle text-accent'
                      : 'bi-plus-circle '
                  "
                ></i>
              </div>

              <transition name="faq-slide">
                <div
                  v-if="openFaq === 'R' + i"
                  class="faq-answer mt-2 ps-5 small "
                >
                  {{ faq.answer }}
                </div>
              </transition>
            </li>
          </ul>
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
  id: { type: String, default: 'section-faq-columns' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  titleLeft: { type: String, default: 'Sobre la Terraza' },
  titleRight: { type: String, default: 'Durante el Evento' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  faqsLeft: { type: Array, default: () => [] },
  faqsRight: { type: Array, default: () => [] },
  ctas: { type: Array, default: () => [] },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
})

const openFaq = ref(null)
const toggleFaq = (key) => {
  openFaq.value = openFaq.value === key ? null : key
}

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

const aosAttrs = (animation) => {
  if (!props.animate) return { 'data-aos': null }
  return { 'data-aos': animation, 'data-aos-duration': '700' }
}
</script>

<style lang="less" scoped>
.section-faq-columns {
  background: var(--surface);
  color: var(--text);
  position: relative;
  overflow: hidden;

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.8);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35),
      rgba(0, 0, 0, 0.55)
    );
    z-index: 1;
  }

  .faq-list {
    background: var(--surface-2);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .faq-item {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background: var(--surface-muted);
      transform: translateY(-2px);
    }

    .faq-number {
      width: 28px;
      height: 28px;
      background: var(--accent);
      color: var(--text-inverse);
      font-size: 0.9rem;
      flex-shrink: 0;
    }

    .faq-question i {
      color: var(--accent);
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }
  }

  .faq-slide-enter-active,
  .faq-slide-leave-active {
    transition: all 0.3s ease;
  }
  .faq-slide-enter-from,
  .faq-slide-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }

  .text-accent {
    color: var(--accent);
  }

  @media (max-width: 768px) {
    .faq-list {
      padding: 1rem;
    }
  }
}
</style>
