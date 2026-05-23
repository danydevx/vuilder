<template>
  <section
    :id="id"
    class="section-cta-2 position-relative overflow-hidden py-5 d-flex align-items-center"
    :class="[schemeClass, alignClass]"
  >
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <div class="container position-relative">
      <div class="row align-items-center g-4">
        <div class="col-12 col-lg-7">
          <h2 class="fw-bold display-6 mb-3" data-aos="fade-up">
            {{ title }}
          </h2>
          <p v-if="subtitle" class="mb-4" :class="subtitleClass" data-aos="fade-up" data-aos-delay="100">
            {{ subtitle }}
          </p>

          <div class="d-flex flex-wrap gap-3" :class="justifyClass" data-aos="fade-up" data-aos-delay="200">
            <a
              v-if="phone"
              :href="`tel:${phone}`"
              class="btn btn-outline-light d-flex align-items-center gap-2"
            >
              <i class="bi bi-telephone-fill"></i>
              Llamar
            </a>
            <a
              v-if="whatsapp"
              :href="`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`"
              target="_blank"
              rel="noopener"
              class="btn btn-whatsapp d-flex align-items-center gap-2"
            >
              <i class="bi bi-whatsapp"></i>
              WhatsApp
            </a>
            <a
              v-if="email"
              :href="`mailto:${email}`"
              class="btn btn-outline-light d-flex align-items-center gap-2"
            >
              <i class="bi bi-envelope-fill"></i>
              Email
            </a>
          </div>
        </div>

        <div v-if="$slots.extra" class="col-12 col-lg-5" data-aos="fade-left" data-aos-delay="300">
          <slot name="extra" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-cta-2' },
  scheme: { type: String, default: 'default-dark' },
  title: { type: String, default: 'Cotiza tu proyecto web hoy' },
  subtitle: { type: String, default: 'Contáctanos y recibe una cotización sin compromiso en menos de 24 horas.' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: true },
  align: { type: String, default: 'left' },
  phone: { type: String, default: '523312345678' },
  whatsapp: { type: String, default: '523312345678' },
  whatsappMessage: { type: String, default: 'Hola, me interesa cotizar un proyecto web.' },
  email: { type: String, default: 'hola@orpot.com' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const alignClass = computed(() => `align-${props.align}`)
const subtitleClass = computed(() => {
  const base = 'lead'
  return props.align === 'center' ? `${base} mx-auto` : props.align === 'right' ? `${base} ms-auto me-0` : `${base} me-auto ms-0`
})
const justifyClass = computed(() => ({
  'justify-content-start': props.align === 'left',
  'justify-content-center': props.align === 'center',
  'justify-content-end': props.align === 'right'
}))
</script>

<style lang="less" scoped>
.section-cta-2 {
  min-height: 400px;

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.75);
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 100%);
    pointer-events: none;
  }

  .btn {
    border-radius: 999px;
    padding: 0.65rem 1.3rem;
    font-weight: 600;
    min-width: 140px;
    transition: all 0.25s ease;
  }

  .btn-outline-light {
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.5);
    color: #fff;
    backdrop-filter: blur(4px);
    &:hover {
      background: rgba(255,255,255,0.22);
      border-color: rgba(255,255,255,0.8);
      transform: translateY(-2px);
    }
  }

  &.align-left { text-align: left; }
  &.align-center { text-align: center; .d-flex { justify-content: center; } }
  &.align-right { text-align: right; .d-flex { justify-content: flex-end; } }
}
</style>