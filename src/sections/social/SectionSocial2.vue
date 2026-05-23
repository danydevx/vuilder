<!-- src/sections/terrazas/social/SectionSocial2.vue -->
<template>
  <section
    :id="id"
    class="section section-social-2 position-relative overflow-hidden"
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
      :class="[
        fluid ? 'container-fluid px-3 px-md-5' : 'container',
        boxed ? 'p-4 p-md-5' : 'p-0 py-5',
        'position-relative',
      ]"
      :style="{ zIndex: 2 }"
    >
      <!-- 🧾 Header -->
      <header
        v-if="title || subtitle || logo"
        class="section-header mb-5"
        :class="headerAlignClass"
        v-bind="aosAttrs('fade-up')"
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
        <p
          v-if="subtitle"
          class="section-subtitle mb-0 "
          :class="textAlignClass"
        >
          {{ subtitle }}
        </p>
      </header>

      <!-- 🌐 Redes (GRID o INLINE) -->
      <div
        v-if="socialLinks?.length"
        :class="[
          params?.layout === 'inline'
            ? ['d-flex flex-wrap gap-3', socialAlignClass]
            : 'row g-4 justify-content-center',
        ]"
        v-bind="aosAttrs('fade-up')"
      >
        <!-- GRID -->
        <template v-if="params?.layout !== 'inline'">
          <div
            v-for="(social, i) in socialLinks"
            :key="i"
            class="col-6 col-md-4 col-lg-3"
          >
            <a
              :href="social.url"
              target="_blank"
              rel="noopener"
              class="social-card d-flex flex-column align-items-center justify-content-center text-center text-decoration-none p-4 h-100 rounded-4"
              :class="cardStyleClass"
              v-bind="aosAttrs('zoom-in')"
              :data-aos-delay="i * 100"
            >
              <div class="icon-wrap mb-3 d-flex align-items-center justify-content-center">
                <i :class="['bi', social.icon, 'fs-2']"></i>
              </div>
              <h3 class="h6 fw-semibold mb-1">{{ social.name }}</h3>
              <p v-if="social.cta" class="small  mb-0">
                {{ social.cta }}
              </p>
            </a>
          </div>
        </template>

        <!-- INLINE -->
        <template v-else>
          <a
            v-for="(social, i) in socialLinks"
            :key="i"
            :href="social.url"
            target="_blank"
            rel="noopener"
            class="social-inline d-flex align-items-center gap-2 text-decoration-none py-2 px-3 rounded-pill shadow-sm"
            :class="cardStyleClass"
            v-bind="aosAttrs('fade-up')"
            :data-aos-delay="i * 100"
          >
            <i :class="['bi', social.icon, 'fs-5']"></i>
            <span class="fw-semibold small">{{ social.name }}</span>
          </a>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-social-2' },
  scheme: { type: String, default: 'default-light' },
  logo: String,
  title: String,
  subtitle: String,
  socialLinks: { type: Array, default: () => [] },
  params: { type: Object, default: () => ({}) },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  boxed: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
})

/* ===== Computed ===== */
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const headerAlignClass = computed(() => {
  return props.align === 'left'
    ? 'text-start align-left'
    : props.align === 'right'
    ? 'text-end align-right'
    : 'text-center align-center'
})

const textAlignClass = computed(() => {
  return props.align === 'left'
    ? 'me-auto'
    : props.align === 'right'
    ? 'ms-auto'
    : 'mx-auto'
})

const socialAlignClass = computed(() => {
  return props.align === 'left'
    ? 'justify-content-start'
    : props.align === 'right'
    ? 'justify-content-end'
    : 'justify-content-center'
})

const cardStyleClass = computed(() => {
  switch (props.params?.cardStyle) {
    case 'outline':
      return 'card-outline'
    case 'soft':
      return 'card-soft'
    case 'solid':
    default:
      return 'card-solid'
  }
})

/* ===== Animaciones ===== */
const aosAttrs = (animation) => {
  if (!props.animate) return { 'data-aos': null }
  return { 'data-aos': animation, 'data-aos-duration': '700' }
}
</script>

<style lang="less" scoped>
.section-social-2 {
  background: var(--surface);
  color: var(--text);
  position: relative;

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

  .section-header {
    position: relative;
    z-index: 2;
  }

  /* ===== Tarjetas GRID ===== */
  .social-card {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--surface-border);
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow);
    }

    .icon-wrap {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--surface-2);
      i {
        color: var(--accent);
        transition: color 0.3s ease;
      }
    }

    &:hover .icon-wrap {
      background: var(--accent);
      i {
        color: var(--text-inverse);
      }
    }
  }

  /* ===== Variantes ===== */
  .card-solid {
    background: var(--surface-2);
    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      border-color: var(--accent);
    }
  }

  .card-outline {
    background: transparent;
    border: 2px solid var(--accent);
    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
    }
  }

  .card-soft {
    background: var(--surface-muted);
    &:hover {
      background: var(--accent-hover);
      color: var(--text-inverse);
    }
  }

  /* ===== INLINE ===== */
  .social-inline {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--surface-border);
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    i {
      color: var(--accent);
      transition: color 0.3s ease;
    }

    &:hover i {
      color: var(--text-inverse);
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
