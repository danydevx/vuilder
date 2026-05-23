<!-- src/sections/terrazas/content/SectionContent3.vue -->
<template>
  <section
    :id="id"
    class="section section-content-3 position-relative overflow-hidden py-5"
    :class="[schemeClass]"
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
      :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']"
      :data-aos="animate ? 'fade-up' : null"
      data-aos-duration="700"
    >
      <!-- 🔹 Título y texto -->
      <header
        v-if="content.headline || content.text || content.footer"
        class="section-header mb-5"
        :class="headerAlignClass"
      >
        <h2 v-if="content.headline" class="headline  text-uppercase mb-4">
          {{ content.headline }}
        </h2>

        <!-- Icono -->
        <div v-if="content.icon" class="icon-wrapper mb-4">
          <i :class="[content.icon, 'fs-2']"></i>
        </div>

        <!-- Texto principal -->
        <p
          v-if="content.text"
          class="lead fw-semibold mb-3"
          :class="{ 'mx-auto': align === 'center' }"
          style="max-width: 52rem"
        >
          {{ content.text }}
        </p>

        <!-- Línea divisoria -->
        <div v-if="content.text" class="divider mx-auto my-3"></div>

        <!-- Subtexto -->
        <p
          v-if="content.footer"
          class="small fw-semibold text-uppercase mt-3"
        >
          {{ content.footer }}
        </p>
      </header>

      <!-- CTA opcional -->
      <div
        v-if="ctas?.length"
        class="d-flex flex-wrap gap-2 mt-4"
        :class="[justifyClass, headerAlignClass]"
      >
        <a
          v-for="(cta, i) in ctas"
          :key="i"
          :href="cta.href"
          class="btn"
          :class="[
            cta.variant === 'solid'
              ? 'btn-scheme'
              : cta.variant === 'outline'
              ? 'btn-outline'
              : 'btn-ghost'
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
  id: { type: String, default: 'section-content-3' },
  scheme: { type: String, default: 'rose-dark' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  content: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const headerAlignClass = computed(() => ({
  'text-center': props.align === 'center',
  'text-start': props.align === 'left',
  'text-end': props.align === 'right'
}))

const justifyClass = computed(() => {
  const map = {
    start: 'justify-content-start',
    center: 'justify-content-center',
    end: 'justify-content-end',
    between: 'justify-content-between',
    around: 'justify-content-around'
  }
  return map[props.justify] || 'justify-content-center'
})
</script>

<style lang="less" scoped>
.section-content-3 {
  background: var(--accent);
  color: var(--text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.25;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
  }

  .headline {
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    letter-spacing: 0.02em;
    color: var(--text-inverse);
  }

  .icon-wrapper {
    i {
      color: var(--text-inverse);
      background: color-mix(in srgb, var(--text-inverse) 10%, transparent);
      border-radius: 50%;
      padding: 0.6rem 0.8rem;
    }
  }

  .divider {
    width: 60px;
    height: 3px;
    background: var(--text-inverse);
    border-radius: 2px;
    opacity: 0.9;
  }

  p {
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .headline {
      font-size: 1.6rem;
    }
  }
}
</style>
