<!-- src/sections/terrazas/social/SectionSocial5.vue -->
<template>
  <section
    :id="id"
    class="section section-social-5 position-relative overflow-hidden"
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
        class="row align-items-center g-5 flex-column-reverse flex-lg-row"
        :class="{ 'flex-lg-row-reverse': order === 'inverted' }"
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
            <h2 v-if="title" class="section-title  mb-2">{{ title }}</h2>
            <p v-if="subtitle" class="section-subtitle  mb-3">
              {{ subtitle }}
            </p>
            <p v-if="body" class="lead fw-medium mb-4">{{ body }}</p>

            <!-- 🔹 Botones principales -->
            <div
              class="main-actions d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-4"
              :class="{ 'justify-content-lg-end': align === 'right' }"
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
              class="social-links d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mt-3"
              :class="{ 'justify-content-lg-end': align === 'right' }"
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

        <!-- 🖼️ Imagen lateral -->
        <div class="col-12 col-lg-6" v-bind="aosAttrs('zoom-in')" data-aos-delay="150">
          <div class="media-wrap rounded-4 overflow-hidden shadow-lg ratio ratio-1x1 ratio-lg-4x3">
            <img
              v-if="params?.image"
              :src="params.image"
              alt="Imagen lateral"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-social-5' },
  scheme: { type: String, default: 'default-light' },
  logo: String,
  title: String,
  subtitle: String,
  body: String,
  align: { type: String, default: 'left' },
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

/* ===== AOS ===== */
const aosAttrs = (animation) => {
  return props.animate
    ? { 'data-aos': animation, 'data-aos-duration': '700' }
    : {}
}
</script>

<style lang="less" scoped>
.section-social-5 {
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

  .section-title {
    color: var(--heading-color, var(--text));
  }

  .section-subtitle {
    color: var(--);
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
    background: var(--accent);
    color: var(--accent-contrast);
    &:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow);
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

  /* ===== Variantes visuales ===== */
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

  /* ===== Responsive ===== */
  @media (max-width: 767px) {
    .content-block {
      text-align: center !important;
    }
    .main-actions {
      flex-direction: column;
      align-items: center;
      .btn {
        width: 100%;
        max-width: 320px;
      }
    }
    .social-links {
      justify-content: center !important;
    }
  }
}
</style>
