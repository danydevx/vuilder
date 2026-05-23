<template>
  <section
    :id="id"
    class="section-cta-4 position-relative overflow-hidden py-5"
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
      <div class="mx-auto" style="max-width: 600px">
        <div v-if="icon" class="mb-3" data-aos="zoom-in">
          <i :class="icon" class="accent-icon"></i>
        </div>

        <h2 class="fw-bold display-6 mb-3" data-aos="fade-up">
          {{ title }}
        </h2>
        <p v-if="subtitle" class=" lead mb-4" data-aos="fade-up" data-aos-delay="100">
          {{ subtitle }}
        </p>

        <a
          v-if="whatsapp"
          :href="`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`"
          target="_blank"
          rel="noopener"
          class="btn btn-whatsapp btn-lg d-inline-flex align-items-center gap-2"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <i class="bi bi-whatsapp fs-5"></i>
          {{ whatsappLabel }}
        </a>

        <div v-if="phone || email" class="mt-4 d-flex flex-wrap justify-content-center gap-4 small" data-aos="fade-up" data-aos-delay="300">
          <a v-if="phone" :href="`tel:${phone}`" class="contact-link">
            <i class="bi bi-telephone me-1"></i>{{ phone }}
          </a>
          <a v-if="email" :href="`mailto:${email}`" class="contact-link">
            <i class="bi bi-envelope me-1"></i>{{ email }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-cta-4' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '¿Listo para empezar?' },
  subtitle: { type: String, default: 'Escríbenos directamente por WhatsApp y recibe atención personalizada.' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  icon: { type: String, default: 'bi bi-chat-dots-fill' },
  whatsapp: { type: String, default: '523312345678' },
  whatsappMessage: { type: String, default: 'Hola, me interesa cotizar un proyecto web.' },
  whatsappLabel: { type: String, default: 'Escríbenos por WhatsApp' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-cta-4 {
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

  .accent-icon {
    font-size: 3rem;
    color: var(--accent);
    line-height: 1;
  }

  .btn-whatsapp {
    border-radius: 999px;
    padding: 0.85rem 2.2rem;
    font-weight: 700;
    font-size: 1.05rem;
    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25);
  }
}
</style>