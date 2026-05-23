<!-- src/sections/terrazas/social/SectionSocial3.vue -->
<template>
  <section
    :id="id"
    class="section section-social-3 position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- 🌄 Fondo -->
    <div
      v-if="params?.background"
      class="bg-media"
      :style="{ backgroundImage: `url(${params.background})` }"
      aria-hidden="true"
    />
    <div v-if="params?.overlay" class="bg-overlay" aria-hidden="true" />

    <!-- 🧭 Contenedor -->
    <div
      :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative py-5']"
      style="z-index: 2"
    >
      <div
        class="row align-items-center g-5"
        :class="{ 'flex-row-reverse': order === 'inverted' }"
      >
        <!-- 🧾 Contenido -->
        <div class="col-12 col-lg-6" v-bind="aosAttrs('fade-up')">
          <div
            class="content-block"
            :class="{
              'text-center mx-auto': align === 'center',
              'text-end ms-auto': align === 'right',
              'text-start me-auto': align === 'left',
            }"
            style="max-width: 520px"
          >
            <img
              v-if="logo"
              :src="logo"
              alt="Logo"
              class="img-fluid mb-3"
              style="max-height: 80px"
              loading="lazy"
            />
            <h2 v-if="title" class="section-title  mb-2">
              {{ title }}
            </h2>
            <p v-if="subtitle" class="section-subtitle  mb-3">
              {{ subtitle }}
            </p>
            <p v-if="body" class="lead fw-medium mb-0">{{ body }}</p>
          </div>
        </div>

        <!-- 🌐 Redes sociales -->
        <div class="col-12 col-lg-6" v-bind="aosAttrs('fade-up')" data-aos-delay="150">
          <div
            class="social-zone d-flex flex-wrap gap-3 mt-3 mt-lg-0"
            :class="[
              align === 'center'
                ? 'justify-content-center'
                : align === 'right'
                ? 'justify-content-lg-end'
                : 'justify-content-lg-start',
            ]"
          >
            <a
              v-for="(social, i) in socialLinks"
              :key="i"
              :href="social.url"
              target="_blank"
              rel="noopener"
              class="social-btn d-inline-flex align-items-center gap-2 text-decoration-none"
              :class="buttonStyleClass"
              v-bind="aosAttrs('zoom-in')"
              :data-aos-delay="i * 100"
            >
              <i :class="['bi', social.icon, 'fs-5']"></i>
              <span v-if="showText" class="fw-semibold small">
                {{ social.name }}
              </span>
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
  id: { type: String, default: 'section-social-3' },
  scheme: { type: String, default: 'default-light' },
  logo: String,
  title: String,
  subtitle: String,
  body: String,
  align: { type: String, default: 'left' }, // left | center | right
  order: { type: String, default: 'normal' }, // normal | inverted
  socialLinks: { type: Array, default: () => [] },
  params: { type: Object, default: () => ({}) },
  fluid: { type: Boolean, default: false },
  animate: { type: Boolean, default: true },
})

/* ===== Computed ===== */
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

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

/* ===== Animaciones ===== */
const aosAttrs = (animation) => {
  if (!props.animate) return { 'data-aos': null }
  return { 'data-aos': animation, 'data-aos-duration': '700' }
}
</script>

<style lang="less" scoped>
.section-social-3 {
  background: var(--surface);
  color: var(--text);
  position: relative;

  /* ===== Fondo ===== */
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
      to right,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.45)
    );
    z-index: 1;
  }

  .content-block {
    position: relative;
    z-index: 2;
  }

  .section-subtitle {
    color: var(--);
  }

  /* ===== Botones de redes ===== */
  .social-btn {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    color: var(--text);
    padding: 0.6rem 1rem;
    border-radius: 50rem;
    transition: all 0.3s ease;

    i {
      color: var(--accent);
      transition: color 0.3s ease;
    }

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    &:hover i {
      color: var(--text-inverse);
    }
  }

  /* ===== Variantes ===== */
  .btn-rounded {
    border-radius: 50%;
    width: 52px;
    height: 52px;
    justify-content: center;
  }

  .btn-square {
    border-radius: 0.75rem;
    width: 52px;
    height: 52px;
    justify-content: center;
  }

  .btn-text {
    border-radius: 2rem;
    padding: 0.5rem 1rem;
  }

  .btn-mixed {
    border-radius: 1rem;
    background: var(--surface-muted);
  }

  /* ===== Responsive ===== */
  @media (max-width: 767px) {
    .content-block {
      text-align: center !important;
      margin: 0 auto;
    }
    .social-zone {
      justify-content: center !important;
    }
  }
}
</style>
