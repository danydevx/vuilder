<!-- src/sections/terrazas/faqs/SectionFaqTimeline.vue -->
<template>
  <section
    :id="id"
    class="section section-faq-timeline position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    ></div>
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <div class="container position-relative py-5">
      <!-- Header -->
      <header class="text-center mb-5" data-aos="fade-up">
        <h2 class="display-6 ">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 700px;">
          {{ subtitle }}
        </p>
      </header>

      <!-- Timeline -->
      <div class="faq-timeline mx-auto position-relative" data-aos="fade-up">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="faq-timeline-item d-flex flex-column flex-md-row align-items-start gap-4 mb-5 position-relative"
          :class="{ 'faq-right': i % 2 !== 0 }"
          data-aos="fade-up"
          :data-aos-delay="100 * i"
        >
          <!-- Icono -->
          <div class="faq-icon flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center">
            <i :class="faq.icon || 'bi bi-question-lg'"></i>
          </div>

          <!-- Contenido -->
          <div class="faq-content bg-surface-2 rounded-4 shadow-sm p-4 flex-grow-1">
            <h3 class="h6  mb-2">{{ faq.question }}</h3>
            <p class="small  mb-0">{{ faq.answer }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="ctas?.length" class="text-center mt-5" data-aos="fade-up">
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
  id: { type: String, default: 'section-faq-timeline' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  faqs: { type: Array, default: () => [] },
  ctas: { type: Array, default: () => [] },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-faq-timeline {
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
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
  }

  .faq-timeline {
    position: relative;
    max-width: 760px;
    margin: 0 auto;
    padding: 2rem 0;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      background: color-mix(in srgb, var(--accent) 40%, var(--text) 20%);
      transform: translateX(-50%);
      z-index: 0;
    }
  }

  .faq-timeline-item {
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;

    &.faq-right {
      flex-direction: row-reverse;
      text-align: right;

      .faq-content {
        background: var(--surface-2);
      }

      .faq-icon {
        order: 2;
      }
    }

    .faq-icon {
      width: 44px;
      height: 44px;
      background: var(--accent);
      color: var(--text-inverse);
      font-size: 1.2rem;
      box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 20%, transparent 80%);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 0 10px color-mix(in srgb, var(--accent) 25%, transparent);
      }
    }

    .faq-content {
      background: var(--surface-2);
      border: 1px solid var(--surface-border);
      color: var(--text);
      position: relative;
      z-index: 1;
      transition: all 0.3s ease;
      &:hover {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      }
    }
  }

  @media (max-width: 768px) {
    .faq-timeline::before {
      left: 1rem;
    }

    .faq-timeline-item {
      flex-direction: row;
      gap: 1rem;
      text-align: left;

      .faq-icon {
        width: 38px;
        height: 38px;
        font-size: 1rem;
      }
    }
  }
}
</style>
