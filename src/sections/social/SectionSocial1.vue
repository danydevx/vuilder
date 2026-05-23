<!-- src/sections/terrazas/social/SectionSocial1.vue -->
<template>
  <section
    :id="id"
    class="section section-social-1 position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- 🌄 Fondo opcional -->
    <div
      v-if="params?.background"
      class="bg-media"
      :style="{ backgroundImage: `url(${params.background})` }"
      aria-hidden="true"
    />
    <div v-if="params?.overlay" class="bg-overlay" aria-hidden="true" />

    <!-- 🧭 Contenedor -->
    <div
      :class="[
        fluid ? 'container-fluid px-3 px-md-5' : 'container',
        boxed ? 'p-4 p-md-5' : 'p-0 py-5',
        'position-relative',
      ]"
      :style="{ zIndex: 2 }"
    >
      <div
        class="inner mx-auto"
        style="max-width: 800px"
        :class="headerAlignClass"
        v-bind="aosAttrs('fade-up')"
      >
        <!-- 🖼️ Logo -->
        <div v-if="logo" class="mb-4 logo-wrapper">
          <img
            :src="logo"
            alt="Logo"
            class="img-fluid"
            style="max-height: 90px"
            loading="lazy"
          />
        </div>

        <!-- 🧾 Título -->
        <h2 v-if="title" class="section-title  mb-2">{{ title }}</h2>

        <!-- ✨ Subtítulo -->
        <p v-if="subtitle" class="section-subtitle mb-4 ">
          {{ subtitle }}
        </p>

        <!-- 🌐 Lista de redes -->
        <div
          v-if="socialLinks?.length"
          class="social-links d-flex flex-wrap gap-3 mt-4"
          :class="socialAlignClass"
        >
          <a
            v-for="(social, i) in socialLinks"
            :key="i"
            :href="social.url"
            target="_blank"
            rel="noopener"
            class="social-btn d-inline-flex align-items-center justify-content-center"
            :class="[
              buttonStyleClass,
              ['text', 'mixed'].includes(params?.buttonStyle)
                ? 'px-3 py-2'
                : 'p-3',
            ]"
            v-bind="aosAttrs('zoom-in')"
            :data-aos-delay="i * 100"
          >
            <i :class="['bi', social.icon, 'fs-4']"></i>
            <span
              v-if="showText"
              class="social-label fw-semibold small ms-2"
            >
              {{ social.name }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-social-1' },
  scheme: { type: String, default: 'default-light' },
  logo: String,
  title: String,
  subtitle: String,
  socialLinks: { type: Array, default: () => [] },
  params: { type: Object, default: () => ({}) },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' }, // left | center | right
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
})

/* ====== Computed ====== */
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const headerAlignClass = computed(() => {
  return props.align === 'left'
    ? 'text-start align-left'
    : props.align === 'right'
    ? 'text-end align-right'
    : 'text-center align-center'
})

const socialAlignClass = computed(() => {
  return props.align === 'left'
    ? 'justify-content-start'
    : props.align === 'right'
    ? 'justify-content-end'
    : 'justify-content-center'
})

const showText = computed(() =>
  ['text', 'mixed'].includes(props.params?.buttonStyle)
)

const buttonStyleClass = computed(() => {
  switch (props.params?.buttonStyle) {
    case 'rounded':
      return 'btn-rounded'
    case 'square':
      return 'btn-square'
    case 'text':
      return 'btn-text'
    case 'mixed':
      return 'btn-mixed'
    default:
      return 'btn-rounded'
  }
})

/* ====== Control de animaciones ====== */
const aosAttrs = (animation) => {
  if (!props.animate) return { 'data-aos': null }
  return { 'data-aos': animation, 'data-aos-duration': '700' }
}
</script>

<style lang="less" scoped>
.section-social-1 {
  background: var(--surface);
  color: var(--text);
  position: relative;

  /* Fondo y overlay */
  .bg-media,
  .bg-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .bg-media {
    background-size: cover;
    background-position: center;
    filter: brightness(0.7);
    z-index: 0;
  }

  .bg-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.45)
    );
    z-index: 1;
  }

  .inner {
    position: relative;
    z-index: 2;
  }

  /* ===== Lista de redes ===== */
  .social-links {
    position: relative;
    z-index: 2;
  }

  .social-btn {
    transition: all 0.3s ease;
    text-decoration: none;
    border: 1px solid var(--surface-border);
    background: var(--surface-2);
    color: var(--text);
    min-width: 44px;
    min-height: 44px;
    box-shadow: var(--shadow-sm);
    border-radius: 1rem;

    i {
      color: var(--accent);
      transition: color 0.3s ease;
    }

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      border-color: var(--accent);
      transform: translateY(-3px);

      i {
        color: var(--text-inverse);
      }
    }
  }

  /* ===== Variantes visuales ===== */
  .btn-rounded {
    border-radius: 50%;
    width: 54px;
    height: 54px;
    justify-content: center;
  }

  .btn-square {
    border-radius: 0.75rem;
    width: 54px;
    height: 54px;
    justify-content: center;
  }

  .btn-text {
    border-radius: 2rem;
    background: var(--surface);
    border: 1px solid var(--surface-border);
    padding: 0.6rem 1rem;

    .social-label {
      color: var(--accent);
      transition: color 0.3s ease;
    }

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      border-color: var(--accent);

      .social-label {
        color: var(--text-inverse);
      }
    }
  }

  .btn-mixed {
    border-radius: 1.5rem;
    background: var(--surface-muted);
    border: 1px solid var(--surface-border);

    .social-label {
      color: var(--accent);
    }

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      border-color: var(--accent);

      .social-label {
        color: var(--text-inverse);
      }
    }
  }

  /* ===== Alineaciones ===== */
  &.align-left,
  .align-left {
    text-align: left;
  }

  &.align-right,
  .align-right {
    text-align: right;
  }

  &.align-center,
  .align-center {
    text-align: center;
  }
}
</style>
