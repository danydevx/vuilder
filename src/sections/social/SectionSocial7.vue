<!-- src/sections/terrazas/social/SectionSocial7.vue -->
<template>
  <section
    :id="id"
    class="section section-social-7 position-relative overflow-hidden"
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
      :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative text-center py-5']"
      style="z-index: 2"
      v-bind="aosAttrs('fade-up')"
    >
      <div class="mx-auto" style="max-width: 480px">
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

        <!-- 🧾 Título -->
        <h2 v-if="title" class="section-title  mb-2">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="section-subtitle  mb-4">
          {{ subtitle }}
        </p>

        <!-- 🔹 Botones principales -->
        <div class="vertical-buttons d-flex flex-column gap-3 align-items-center">
          <a
            v-if="params?.whatsapp"
            :href="params.whatsapp"
            target="_blank"
            rel="noopener"
            class="btn btn-whatsapp d-flex align-items-center justify-content-center gap-2 w-100 fw-semibold py-3"
          >
            <i class="bi bi-whatsapp fs-5"></i>
            <span>Enviar mensaje por WhatsApp</span>
          </a>

          <a
            v-if="params?.phone"
            :href="`tel:${params.phone}`"
            class="btn btn-call d-flex align-items-center justify-content-center gap-2 w-100 fw-semibold py-3"
          >
            <i class="bi bi-telephone fs-5"></i>
            <span>Llamar ahora</span>
          </a>

          <a
            v-if="params?.email"
            :href="`mailto:${params.email}`"
            class="btn btn-email d-flex align-items-center justify-content-center gap-2 w-100 fw-semibold py-3"
          >
            <i class="bi bi-envelope fs-5"></i>
            <span>Enviar correo</span>
          </a>
        </div>

        <!-- 🌐 Redes sociales -->
        <div
          v-if="socialLinks?.length"
          class="social-links d-flex flex-wrap justify-content-center gap-3 mt-5"
          v-bind="aosAttrs('fade-up')"
        >
          <a
            v-for="(social, i) in socialLinks"
            :key="i"
            :href="social.url"
            target="_blank"
            rel="noopener"
            class="social-btn d-inline-flex align-items-center justify-content-center rounded-circle"
            :title="social.name"
            v-bind="aosAttrs('zoom-in')"
            :data-aos-delay="i * 100"
          >
            <i :class="['bi', social.icon, 'fs-5']"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-social-7' },
  scheme: { type: String, default: 'default-light' },
  logo: String,
  title: String,
  subtitle: String,
  socialLinks: { type: Array, default: () => [] },
  params: { type: Object, default: () => ({}) },
  fluid: { type: Boolean, default: false },
  animate: { type: Boolean, default: true },
})

/* ===== Computed ===== */
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

/* ===== Animaciones ===== */
const aosAttrs = (animation) => {
  return props.animate
    ? { 'data-aos': animation, 'data-aos-duration': '700' }
    : {}
}
</script>

<style lang="less" scoped>
.section-social-7 {
  position: relative;
  background: var(--surface);
  color: var(--text);
  text-align: center;

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

  h2 {
    color: var(--heading-color, var(--text));
  }

  .section-subtitle {
    color: var(--);
  }

  /* ===== Botones verticales ===== */
  .btn {
    border-radius: 0.75rem;
    transition: all 0.3s ease;
    border: none;
    box-shadow: var(--shadow-sm);
    font-size: 1rem;
    width: 100%;
    max-width: 420px;
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
    background: var(--accent);
    color: var(--accent-contrast);
    &:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }
  }

  .btn-email {
    background: var(--surface-2);
    color: var(--text);
    border: 1px solid var(--surface-border);
    &:hover {
      background: var(--accent);
      color: var(--accent-contrast);
      border-color: var(--accent);
      transform: translateY(-2px);
    }
  }

  /* ===== Redes pequeñas ===== */
  .social-btn {
    width: 44px;
    height: 44px;
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    color: var(--text);
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

  @media (max-width: 767px) {
    .vertical-buttons a {
      max-width: 320px;
    }
  }
}
</style>
