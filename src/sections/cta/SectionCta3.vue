<template>
  <section
    :id="id"
    class="section-cta-3 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <div class="container position-relative">
      <div class="mx-auto" style="max-width: 560px">
        <div class="card rounded-4 shadow overflow-hidden" data-aos="fade-up">
          <div class="card-body p-4 p-md-5">
            <header class="text-center mb-4">
              <h2 class="fw-bold display-6 mb-3">
                {{ title }}
              </h2>
              <p v-if="subtitle" class="">{{ subtitle }}</p>
            </header>

            <form @submit.prevent="sendWhatsApp" class="d-flex flex-column gap-3">
              <div>
                <input
                  v-model="formData.name"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <input
                  v-model="formData.email"
                  type="email"
                  class="form-control form-control-lg"
                  placeholder="Tu correo electrónico"
                  required
                />
              </div>
              <div>
                <textarea
                  v-model="formData.message"
                  class="form-control"
                  rows="3"
                  :placeholder="messagePlaceholder"
                  required
                ></textarea>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-whatsapp btn-lg d-flex align-items-center justify-content-center gap-2">
                  <i class="bi bi-whatsapp"></i>
                  {{ buttonLabel }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <p class="small  text-center mt-3 mb-0">
          <i class="bi bi-shield-lock me-1"></i>
          Tu información está segura. Solo la usamos para contactarte.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-cta-3' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Solicita tu cotización' },
  subtitle: { type: String, default: 'Completa el formulario y te contactamos en menos de 24 horas.' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  whatsapp: { type: String, default: '523312345678' },
  messagePlaceholder: { type: String, default: 'Cuéntanos sobre tu proyecto web...' },
  buttonLabel: { type: String, default: 'Enviar por WhatsApp' }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const sendWhatsApp = () => {
  const msg = `Hola, me llama ${formData.name} y mi correo es ${formData.email}.\n\nProyecto: ${formData.message}`
  const link = `https://wa.me/${props.whatsapp}?text=${encodeURIComponent(msg)}`
  window.open(link, '_blank')
}
</script>

<style lang="less" scoped>
.section-cta-3 {
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

  .card {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    box-shadow: var(--shadow);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }
  }

  .form-control {
    background: var(--field-bg);
    border: 1px solid var(--field-border);
    color: var(--field-fg);
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: var(--field-placeholder);
    }

    &:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 20%, transparent);
      outline: none;
    }
  }

  .btn-whatsapp {
    border-radius: 999px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
  }
}
</style>