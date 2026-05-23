<template>
  <section
    :id="id"
    class="section-cta-1 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <div class="container position-relative text-center">
      <div class="mx-auto" style="max-width: 640px">
        <h2 class="fw-bold display-6 mb-3" data-aos="fade-up">
          {{ title }}
        </h2>
        <p v-if="subtitle" class=" lead mb-4" data-aos="fade-up" data-aos-delay="100">
          {{ subtitle }}
        </p>

        <div class="d-flex flex-wrap justify-content-center gap-3" data-aos="zoom-in" data-aos-delay="200">
          <a
            v-if="whatsapp"
            :href="`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`"
            target="_blank"
            rel="noopener"
            class="btn btn-whatsapp d-flex align-items-center gap-2"
          >
            <i class="bi bi-whatsapp"></i>
            {{ whatsappLabel }}
          </a>
          <a
            v-if="contactHref"
            :href="contactHref"
            class="btn btn-scheme d-flex align-items-center gap-2"
          >
            <i class="bi bi-chat-dots"></i>
            {{ contactLabel }}
          </a>
          <a
            v-if="cotizarHref"
            :href="cotizarHref"
            class="btn btn-outline d-flex align-items-center gap-2"
          >
            <i class="bi bi-currency-dollar"></i>
            {{ cotizarLabel }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-cta-1' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '¿Tienes un proyecto en mente?' },
  subtitle: { type: String, default: 'Escríbenos y cotiza tu sitio web sin compromiso.' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  whatsapp: { type: String, default: '523312345678' },
  whatsappMessage: { type: String, default: 'Hola, me interesa cotizar un proyecto web.' },
  whatsappLabel: { type: String, default: 'WhatsApp' },
  contactHref: { type: String, default: '#contact' },
  contactLabel: { type: String, default: 'Contactar' },
  cotizarHref: { type: String, default: '#cotizar' },
  cotizarLabel: { type: String, default: 'Cotizar' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-cta-1 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .btn {
    border-radius: 999px;
    padding: 0.7rem 1.4rem;
    font-weight: 600;
    font-size: 0.95rem;
    min-width: 150px;
    transition: all 0.25s ease;
  }
}
</style>