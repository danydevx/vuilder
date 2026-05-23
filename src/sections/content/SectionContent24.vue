<!-- src/sections/terrazas/content/SectionContent2.vue -->
<template>
  <section
    :id="id"
    class="section section-content-2 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']">
      <div
        class="row align-items-center g-5"
        :class="[justifyClass, { 'flex-row-reverse': order === 'inverted' }]"
      >
        <!-- Columna imagen -->
        <div
          class="col-12 col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-left' : 'fade-right') : null"
          data-aos-duration="700"
        >
          <div class="image-box rounded-2 shadow-sm overflow-hidden position-relative">
            <img
              v-if="content.image"
              :src="content.image"
              :alt="content.alt || content.headline || 'Content image'"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />

            <!-- Watermark circular -->
            <div v-if="watermark.show" class="ring-wrap">
              <svg
                class="ring-svg"
                :width="watermark.size"
                :height="watermark.size"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                <defs>
                  <path id="ring-path" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"></path>
                </defs>
                <text class="ring-text">
                  <textPath xlink:href="#ring-path" startOffset="0%">
                    {{ ringText }}
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>

        <!-- Columna texto -->
        <div
          class="col-12 col-lg-6"
          :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
          data-aos-duration="700"
        >
          <div class="content-text">
            <h2 v-if="content.headline" class="headline  lh-sm mb-3">
              {{ content.headline }}
            </h2>

            <p v-if="content.summary" class="lead  mb-3">
              {{ content.summary }}
            </p>

            <p v-if="content.text" class="text-body mb-4">
              {{ content.text }}
            </p>

            <!-- CTAs -->
            <div v-if="ctas?.length" class="d-flex flex-wrap gap-2">
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
                    : cta.variant === 'link'
                    ? 'btn-link-cta'
                    : 'btn-ghost'
                ]"
              >
                <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
                <span>{{ cta.label }}</span>
                <span v-if="cta.variant === 'link'" aria-hidden="true" class="ms-2">›</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-content-2' },
  scheme: { type: String, default: 'default-light' }, // respeta tus tokens
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  order: { type: String, default: 'normal' }, // normal | inverted
  justify: { type: String, default: 'center' },
  animate: { type: Boolean, default: true },
  content: {
    type: Object,
    default: () => ({
      headline: 'Creative Design & Advertising.',
      summary: 'We know that good design mean that good business. Design is so simple.',
      text: 'We help our clients succeed by creating identities, digital experiences, and print materials that communicate clearly, achieve marketing goals, and look fantastic.',
      image: 'https://placehold.co/800x960/jpg?text=400+x+485',
      alt: ''
    })
  },
  ctas: {
    type: Array,
    default: () => ([
      { label: 'MORE ABOUT US', href: '#more', variant: 'link' }
    ])
  },
  watermark: {
    type: Object,
    default: () => ({
      show: true,
      size: 220,
      topText: 'LEWIS PORTFOLIO',
      bottomText: 'DIGITAL STUDIO'
    })
  }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

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

const ringText = computed(() => {
  const dot = ' • '
  return `${props.watermark.topText}${dot}${props.watermark.bottomText}${dot}`
})
</script>

<style lang="less" scoped>
.section-content-2 {
  background: var(--surface);
  color: var(--text);

  /* Fondo */
  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.92);
    pointer-events: none;
  }
  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  /* Titulación editorial */
  .headline {
    color: var(--heading-color);
    font-family: "Playfair Display", ui-serif, serif;
    font-size: clamp(1.9rem, 4vw, 2.75rem);
    letter-spacing: -0.01em;
  }
  .lead { line-height: 1.6; }
  .text-body { color: var(--text); line-height: 1.8; }

  /* Caja de imagen */
  .image-box {
    aspect-ratio: 400 / 485; // mimics the mock
    background: var(--surface-2);
    img { transition: transform .6s ease; }
    &:hover img { transform: scale(1.03); }

    /* Watermark circular */
    .ring-wrap {
      position: absolute;
      left: -40px;
      bottom: -40px;
      pointer-events: none;
      filter: saturate(0) opacity(.6);
    }
    .ring-svg { display: block; }
    .ring-text {
      font-size: 14px;
      fill: color-mix(in oklab, var(--text), transparent 50%);
      letter-spacing: .22em;
      text-transform: uppercase;
    }
  }

  /* Botones */
  .btn-scheme,
  .btn-outline,
  .btn-ghost,
  .btn-link-cta {
    border-radius: 2rem;
    font-size: .92rem;
  }

  .btn-outline {
    border: 1px solid var(--surface-border);
    color: var(--text);
    background: transparent;
    &:hover { background: var(--surface-2); }
  }
  .btn-ghost {
    background: transparent; border: none; color: var(--);
    &:hover { color: var(--text); background: var(--surface-2); }
  }
  .btn-link-cta {
    padding: .25rem .25rem;
    border: none;
    background: transparent;
    color: var(--text);
    font-weight: 700;
    letter-spacing: .04em;
    text-transform: uppercase;
    .ms-2 { transition: transform .25s ease; display: inline-block; }
    &:hover .ms-2 { transform: translateX(4px); }
  }

  @media (max-width: 992px) {
    .image-box { aspect-ratio: 16 / 10; }
    .image-box .ring-wrap { left: -28px; bottom: -28px; }
  }
}
</style>
