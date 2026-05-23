<!-- src/sections/terrazas/social/SectionSocial4.vue -->
<template>
  <section
    :id="id"
    class="section section-social-4 position-relative overflow-hidden"
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
        class="inner mx-auto"
        style="max-width: 720px"
        :class="headerAlignClass"
        v-bind="aosAttrs('fade-up')"
      >
        <!-- 🖼️ Logo -->
        <div v-if="logo" class="mb-4">
          <img
            :src="logo"
            alt="Logo"
            class="img-fluid"
            style="max-height: 90px"
            loading="lazy"
          />
        </div>

        <!-- 🧾 Títulos -->
        <h2 v-if="title" class="section-title mb-2 ">{{ title }}</h2>
        <p
          v-if="subtitle"
          class="section-subtitle  mb-4"
          :class="textAlignClass"
        >
          {{ subtitle }}
        </p>

        <!-- 🔹 Botones principales -->
        <div
          class="main-actions d-flex flex-wrap justify-content-center gap-3 mb-4"
          v-bind="aosAttrs('fade-up')"
        >
          <!-- WhatsApp -->
          <a
            v-if="params?.whatsapp"
            :href="params.whatsapp"
            target="_blank"
            rel="noopener"
            class="btn btn-whatsapp d-inline-flex align-items-center gap-2 px-4 py-3 fw-semibold"
          >
            <i class="bi bi-whatsapp fs-5"></i>
            <span>Enviar mensaje</span>
          </a>

          <!-- Llamar -->
          <a
            v-if="params?.phone"
            :href="`tel:${params.phone}`"
            class="btn btn-call d-inline-flex align-items-center gap-2 px-4 py-3 fw-semibold"
          >
            <i class="bi bi-telephone fs-5"></i>
            <span>Llamar ahora</span>
          </a>
        </div>

        <!-- 🌐 Redes sociales -->
        <div
          v-if="socialLinks?.length"
          class="social-links d-flex flex-wrap justify-content-center gap-3 mt-4"
          v-bind="aosAttrs('fade-up')"
        >
          <a
            v-for="(social, i) in socialLinks"
            :key="i"
            :href="social.url"
            target="_blank"
            rel="noopener"
            class="social-btn d-inline-flex align-items-center justify-content-center"
            :class="buttonStyleClass"
            v-bind="aosAttrs('zoom-in')"
            :data-aos-delay="i * 100"
          >
            <i :class="['bi', social.icon, 'fs-5']"></i>
            <span v-if="showText" class="social-label fw-semibold small ms-2">
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
  id: { type: String, default: 'section-social-4' },
  scheme: { type: String, default: 'default-light' },
  logo: String,
  title: String,
  subtitle: String,
  align: { type: String, default: 'center' },
  socialLinks: { type: Array, default: () => [] },
  params: { type: Object, default: () => ({}) },
  fluid: { type: Boolean, default: false },
  animate: { type: Boolean, default: true },
})

/* ====== Computed ====== */
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

/* ====== Animaciones ====== */
const aosAttrs = (animation) => {
  return props.animate
    ? { 'data-aos': animation, 'data-aos-duration': '700' }
    : {}
}
</script>

<style lang="less" scoped>
.section-social-4 {
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
    filter: brightness(0.75);
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

  /* ===== Botones principales ===== */
  .btn {
    border: none;
    font-size: 1rem;
    border-radius: 3rem;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);
  }

  .btn-whatsapp {
    background: #25d366;
    color: #fff;
    &:hover {
      background: color-mix(in oklab, #25d366, black 10%);
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }
  }

  .btn-call {
    background: var(--accent-secondary);
    color: var(--accent-secondary-contrast);
    &:hover {
      background: var(--accent-secondary-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-secondary);
    }
  }

  /* ===== Redes secundarias ===== */
  .social-btn {
    transition: all 0.3s ease;
    text-decoration: none;
    border: 1px solid var(--surface-border);
    background: var(--surface-2);
    color: var(--text);
    min-width: 44px;
    min-height: 44px;
    box-shadow: var(--shadow-sm);

    i {
      color: var(--accent);
      transition: color 0.3s ease;
    }

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      border-color: var(--accent);
      transform: translateY(-3px);
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
    background: var(--surface);
    border: 1px solid var(--surface-border);
    padding: 0.6rem 1rem;
  }

  .btn-mixed {
    border-radius: 1.5rem;
    background: var(--surface-muted);
  }

  /* ===== Responsivo ===== */
  @media (max-width: 767px) {
    .main-actions {
      flex-direction: column;
      align-items: center;
      .btn {
        width: 100%;
        max-width: 320px;
      }
    }
  }
}
</style>
