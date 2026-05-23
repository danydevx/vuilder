<template>
  <section
    :id="id"
    class="section section-hero-terrace-social position-relative overflow-hidden d-flex align-items-center"
    :class="['component-scheme-' + scheme, alignClass]"
  >
    <!-- Fondo -->
    <div
      v-if="params.background"
      class="hero-bg"
      :style="{ backgroundImage: `url('${params.background}')` }"
      aria-hidden="true"
    ></div>
    <div class="hero-overlay" aria-hidden="true"></div>

    <!-- Contenido -->
    <div class="container position-relative py-5">
      <div class="row justify-content-center align-items-center g-4">
        <div class="col-12 col-md-8">
          <!-- Logo o Título -->
          <div data-aos="fade-up" data-aos-duration="700" class="mb-3">
            <img
              v-if="logo"
              :src="logo"
              alt="Logo de la terraza"
              class="hero-logo mb-3"
              loading="lazy"
            />
            <h1 v-else class="hero-title mb-2">
              <i v-if="icon" :class="icon" class="me-2"></i>{{ title }}
            </h1>
          </div>

          <!-- Subtítulo y cuerpo -->
          <p v-if="subtitle" class="hero-subtitle mb-3" data-aos="fade-up" data-aos-delay="100">{{ subtitle }}</p>
          <div v-if="body" class="hero-body mb-4" v-html="body" data-aos="fade-up" data-aos-delay="200"></div>

          <!-- CTA -->
          <div
            v-if="ctas.length"
            class="hero-ctas d-flex flex-wrap gap-2 mb-5"
            :class="ctasAlignClass"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <a
              v-for="(cta, i) in ctas"
              :key="i"
              :href="cta.href"
              class="btn button-rounded"
              :class="cta.variant === 'outline' ? 'btn-outline-secondary' : 'btn-scheme'"
            >
              <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
              {{ cta.label }}
            </a>
          </div>

          <!-- Redes sociales -->
          <div
            v-if="socialLinks && socialLinks.length"
            class="hero-social-links d-flex flex-wrap gap-3"
            :class="socialAlignClass"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <a
              v-for="(link, i) in socialLinks"
              :key="i"
              :href="link.url"
              target="_blank"
              rel="noopener"
              class="social-link d-flex align-items-center gap-2 px-3 py-2 rounded-pill text-decoration-none"
            >
              <i :class="`bi ${link.icon}`" class="fs-5"></i>
              <div class="text-start">
                <span class="fw-semibold">{{ link.name }}</span>
                <div class="small ">{{ link.cta }}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-hero-terrace-social' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  body: { type: String, default: '' },
  icon: { type: String, default: '' },
  logo: { type: String, default: '' },
  align: { type: String, default: 'center' }, // left | center | right
  ctas: {
    type: Array,
    default: () => ([
      { label: 'Ver paquetes', href: '#section-packages', variant: 'solid', icon: 'bi bi-bag' },
      { label: 'Galería', href: '#section-gallery', variant: 'outline', icon: 'bi bi-images' }
    ])
  },
  socialLinks: {
    type: Array,
    default: () => ([
      { name: 'Instagram', icon: 'bi-instagram', url: 'https://instagram.com/terraza', cta: 'Mira fotos de eventos' },
      { name: 'Facebook', icon: 'bi-facebook', url: 'https://facebook.com/terraza', cta: 'Lee reseñas de clientes' },
      { name: 'TikTok', icon: 'bi-tiktok', url: 'https://tiktok.com/@terraza', cta: 'Descubre videos cortos' },
      { name: 'WhatsApp', icon: 'bi-whatsapp', url: 'https://wa.me/5215512345678', cta: 'Cotización rápida' },
      { name: 'YouTube', icon: 'bi-youtube', url: 'https://youtube.com/@terraza', cta: 'Recorridos en video' }
    ])
  },
  params: {
    type: Object,
    default: () => ({
      background: 'https://placehold.co/1600x900/jpg?text=Terraza+Social'
    })
  }
})

const alignClass = computed(() => `align-${props.align}`)
const ctasAlignClass = computed(() => ({
  'justify-content-start': props.align === 'left',
  'justify-content-center': props.align === 'center',
  'justify-content-end': props.align === 'right'
}))
const socialAlignClass = computed(() => ({
  'justify-content-start': props.align === 'left',
  'justify-content-center': props.align === 'center',
  'justify-content-end': props.align === 'right'
}))
</script>

<style lang="less" scoped>
.section-hero-terrace-social {
  position: relative;
  min-height: 90vh;
  background: var(--surface);
  color: var(--text);
  display: flex;
  align-items: center;

  .hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.8) saturate(1.1);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      color-mix(in oklab, var(--surface) 65%, transparent) 10%,
      color-mix(in oklab, var(--surface) 50%, transparent) 60%,
      var(--surface) 95%
    );
    pointer-events: none;
  }

  /* ===== Alineaciones ===== */
  &.align-left { text-align: left; }
  &.align-center { text-align: center; }
  &.align-right { text-align: right; }

  /* ===== Hero base ===== */
  .hero-logo {
    max-width: 200px;
    object-fit: contain;
    background: color-mix(in oklab, var(--surface) 70%, transparent);
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    font-weight: 700;
    color: var(--heading-color);
  }

  .hero-subtitle {
    color: var(--text-secondary);
    font-size: 1.05rem;
  }

  .hero-body {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  /* ===== CTA ===== */
  .hero-ctas {
    .btn {
      border-radius: 999px;
      padding: 0.6rem 1.2rem;
      transition: all 0.25s ease;
    }
  }

  /* ===== Redes sociales ===== */
  .hero-social-links {
    flex-wrap: wrap;

    .social-link {
      background: color-mix(in oklab, var(--surface-2) 85%, transparent);
      border: 1px solid var(--surface-border);
      transition: all 0.3s ease;
      color: var(--text);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

      i {
        color: var(--accent);
      }

      &:hover {
        background: var(--accent);
        color: var(--text-inverse);
        border-color: var(--accent);
        transform: translateY(-2px);
        i {
          color: var(--text-inverse);
        }
      }

      .small {
        font-size: 0.8rem;
        line-height: 1.2;
      }
    }
  }

  @media (max-width: 768px) {
    text-align: center !important;
    .hero-ctas,
    .hero-social-links {
      justify-content: center !important;
    }
    .hero-logo {
      max-width: 160px;
    }
  }
}
</style>
