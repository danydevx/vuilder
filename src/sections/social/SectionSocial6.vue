<!-- src/sections/terrazas/social/SectionSocial6.vue -->
<template>
  <section
    :id="id"
    class="section section-social-6 position-relative overflow-hidden"
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
        class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 text-center text-md-start"
      >
        <!-- 🧾 Texto -->
        <div v-bind="aosAttrs('fade-right')">
          <h2 v-if="title" class="section-title  mb-2">{{ title }}</h2>
          <p v-if="subtitle" class="section-subtitle mb-0 ">
            {{ subtitle }}
          </p>
        </div>

        <!-- 🔹 Botones -->
        <div
          class="actions d-flex flex-wrap justify-content-center justify-content-md-end gap-3"
          v-bind="aosAttrs('fade-left')"
        >
          <a
            v-if="params?.whatsapp"
            :href="params.whatsapp"
            target="_blank"
            rel="noopener"
            class="btn btn-whatsapp d-inline-flex align-items-center gap-2 px-4 py-3 fw-semibold"
          >
            <i class="bi bi-whatsapp fs-5"></i>
            <span>WhatsApp</span>
          </a>

          <a
            v-if="params?.phone"
            :href="`tel:${params.phone}`"
            class="btn btn-call d-inline-flex align-items-center gap-2 px-4 py-3 fw-semibold"
          >
            <i class="bi bi-telephone fs-5"></i>
            <span>Llamar</span>
          </a>
        </div>
      </div>

      <!-- 🌐 Redes pequeñas -->
      <div
        v-if="socialLinks?.length"
        class="social-mini d-flex flex-wrap justify-content-center justify-content-md-end gap-2 mt-4"
        v-bind="aosAttrs('fade-up')"
      >
        <a
          v-for="(social, i) in socialLinks"
          :key="i"
          :href="social.url"
          target="_blank"
          rel="noopener"
          class="social-mini-btn d-inline-flex align-items-center justify-content-center rounded-circle"
          :title="social.name"
        >
          <i :class="['bi', social.icon, 'fs-6']"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-social-6' },
  scheme: { type: String, default: 'default-light' },
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
.section-social-6 {
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

  h2 {
    color: var(--heading-color, var(--text));
  }

  .section-subtitle {
    color: var(--);
  }

  /* ===== Botones principales ===== */
  .btn {
    border: none;
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
    background: var(--accent);
    color: var(--accent-contrast);
    &:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }
  }

  /* ===== Redes pequeñas ===== */
  .social-mini-btn {
    width: 38px;
    height: 38px;
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

  /* ===== Responsive ===== */
  @media (max-width: 767px) {
    .actions {
      justify-content: center !important;
    }
  }
}
</style>
