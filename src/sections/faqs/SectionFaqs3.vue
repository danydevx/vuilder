<!-- src/sections/terrazas/faqs/SectionFaqChat.vue -->
<template>
  <section
    :id="id"
    class="section section-faq-chat position-relative overflow-hidden"
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

    <!-- 💬 Contenido principal -->
    <div
      :class="[
        fluid ? 'container-fluid px-3 px-md-5' : 'container',
        boxed ? 'p-4 p-md-5' : 'p-0 ps-lg-5 pe-lg-4 py-5',
        'position-relative',
      ]"
      :style="{ zIndex: 2 }"
    >
      <!-- Layout de dos columnas o una -->
      <div
        :class="[
          'd-flex flex-column gap-4 align-items-center align-items-lg-stretch',
          { 'flex-lg-row': columns === 2, 'flex-lg-row-reverse': columns === 2 && order === 'inverted' },
        ]"
      >
        <!-- 🗨️ Columna principal (chat) -->
        <div class="flex-grow-1" v-bind="aosAttrs('fade-up')">
          <div class="faq-chat mx-auto">
            <div
              v-for="(faq, i) in faqs"
              :key="i"
              class="chat-bubble-group"
              :class="{ 'from-user': i % 2 === 0, 'from-host': i % 2 !== 0 }"
            >
              <!-- Pregunta -->
              <div class="chat-bubble question">
                <i v-if="faq.icon" :class="faq.icon" class="me-2 text-accent"></i>
                {{ faq.question }}
              </div>

              <!-- Respuesta -->
              <div class="chat-bubble answer shadow-sm mt-2">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>

        <!-- 📸 Columna secundaria opcional -->
        <div
          v-if="asideImg || $slots.aside"
          class="flex-shrink-0 col-aside text-center"
          v-bind="aosAttrs(order === 'inverted' ? 'fade-left' : 'fade-right')"
        >
          <img
            v-if="asideImg"
            :src="asideImg"
            alt="aside illustration"
            class="aside-img rounded-4 shadow-sm"
            loading="lazy"
          />
          <slot name="aside" />
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
  id: { type: String, default: 'section-faq-chat' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  faqs: { type: Array, default: () => [] },
  ctas: { type: Array, default: () => [] },
  asideImg: { type: String, default: '' },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' }, // normal | inverted
  animate: { type: Boolean, default: true },
  columns: { type: Number, default: 1 }, // 1 o 2 columnas
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

/** AOS control seguro */
const aosAttrs = (animation) => {
  if (!props.animate) return { 'data-aos': null }
  return { 'data-aos': animation, 'data-aos-duration': '700' }
}
</script>

<style lang="less" scoped>
.section-faq-chat {
  background: var(--surface);
  color: var(--text);
  position: relative;
  overflow: hidden;

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
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.55)
    );
    z-index: 1;
  }

  .faq-chat {
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .chat-bubble-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &.from-user {
      align-items: flex-end;

      .question {
        background: color-mix(in srgb, var(--accent) 80%, transparent);
        color: var(--text-inverse);
        align-self: flex-end;
      }

      .answer {
        background: var(--surface-2);
        border: 1px solid var(--surface-border);
      }
    }

    &.from-host {
      align-items: flex-start;

      .question {
        background: var(--surface-2);
        color: var(--text);
      }

      .answer {
        background: var(--surface);
        border: 1px solid var(--surface-border);
      }
    }
  }

  .chat-bubble {
    border-radius: 1.2rem;
    padding: 0.9rem 1.2rem;
    max-width: 85%;
    line-height: 1.55;
    font-size: 0.95rem;
    transition: transform 0.3s ease, background 0.3s ease;

    &.question {
      font-weight: 600;
    }

    &.answer {
      font-weight: 400;
    }

    &:hover {
      transform: scale(1.02);
    }
  }

  .col-aside {
    flex: 0 0 38%;
    max-width: 38%;

    .aside-img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border: 1px solid var(--surface-border);
    }
  }

  .text-accent {
    color: var(--accent);
  }

  @media (max-width: 992px) {
    .col-aside {
      max-width: 100%;
      order: 2;
    }
  }

  @media (max-width: 768px) {
    .chat-bubble {
      max-width: 100%;
    }
  }
}
</style>
