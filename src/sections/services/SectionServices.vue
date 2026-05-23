<template>
  <section
    :id="id"
    class="section section-services py-5 position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🌄 Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <!-- 🧭 Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']">
      <!-- Header -->
      <header
        class="section-header mb-5"
        :class="headerAlignClass"
        data-aos="fade-up"
      >
        <h2 class="section-title ">{{ title }}</h2>
        <p
          v-if="subtitle"
          class="section-subtitle mt-2"
          :class="{
            'mx-auto': align === 'center',
            'ms-auto me-0': align === 'right',
            'me-auto ms-0': align === 'left'
          }"
        >
          {{ subtitle }}
        </p>
      </header>

      <!-- 🧩 Servicios -->
      <div class="row g-4 align-items-stretch justify-content-center">
        <div
          v-for="(svc, i) in services"
          :key="i"
          :class="serviceColClass"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <article
            class="service-card h-100 rounded-4 shadow-sm overflow-hidden position-relative"
          >
            <!-- Imagen -->
            <div v-if="svc.image" class="ratio ratio-4x3 service-media">
              <img
                :src="svc.image"
                :alt="svc.title"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </div>

            <!-- Contenido -->
            <div class="service-body p-4 d-flex flex-column">
              <div class="d-flex align-items-center mb-3">
                <i
                  v-if="svc.icon"
                  :class="svc.icon"
                  class="text-accent fs-4 me-2 flex-shrink-0"
                ></i>
                <h3 class="h6 fw-semibold mb-0 flex-grow-1">{{ svc.title }}</h3>
              </div>

              <p v-if="svc.text" class="small  mb-3 flex-grow-1">
                {{ svc.text }}
              </p>

              <ul
                v-if="svc.features?.length"
                class="list-unstyled small  mb-3"
              >
                <li
                  v-for="(feat, f) in svc.features"
                  :key="f"
                  class="d-flex align-items-center mb-1"
                >
                  <i
                    :class="feat.icon || 'bi bi-check-circle'"
                    class="me-2 text-accent"
                  ></i>
                  {{ feat.text || feat }}
                </li>
              </ul>

              <!-- Botones -->
              <div v-if="svc.ctas?.length" class="d-flex flex-wrap gap-2 mt-auto">
                <a
                  v-for="(cta, c) in svc.ctas"
                  :key="c"
                  :href="cta.href"
                  class="btn button-rounded"
                  :class="cta.variant === 'outline'
                    ? 'btn-outline-secondary'
                    : 'btn-scheme'"
                >
                  <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
                  {{ cta.label }}
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { computed, ref, onMounted, nextTick, watch } from 'vue'
const props = defineProps({
  id: { type: String, default: 'section-services' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Nuestros servicios' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 3 }, // columnas en desktop
  align: { type: String, default: 'center' }, // left | center | right
  services: {
    type: Array,
    default: () => [
      {
        title: 'Banquetes y Catering',
        icon: 'bi bi-egg-fried',
        text: 'Sabores que harán de tu evento una experiencia inolvidable.',
        image: 'https://placehold.co/600x400/jpg?text=Catering',
        features: [
          { text: 'Menús personalizados' },
          { text: 'Pruebas de menú incluidas' }
        ],
        ctas: [
          { label: 'Ver menú', href: '#', icon: 'bi bi-list', variant: 'solid' }
        ]
      },
      {
        title: 'Decoración y ambientación',
        icon: 'bi bi-brightness-high',
        text: 'Creamos atmósferas únicas para cada ocasión.',
        image: 'https://placehold.co/600x400/jpg?text=Decoración',
        features: [
          { text: 'Temas personalizados' },
          { text: 'Iluminación ambiental' }
        ],
        ctas: [
          { label: 'Cotizar', href: '#', icon: 'bi bi-chat-dots', variant: 'outline' }
        ]
      },
      {
        title: 'Música y entretenimiento',
        icon: 'bi bi-music-note-beamed',
        text: 'DJ, grupos en vivo y más para animar tu celebración.',
        image: 'https://placehold.co/600x400/jpg?text=Música',
        features: [
          { text: 'DJ profesional' },
          { text: 'Escenario e iluminación' }
        ],
        ctas: [
          { label: 'Reservar', href: '#', icon: 'bi bi-calendar-event', variant: 'solid' }
        ]
      }
    ]
  }
})

const headerAlignClass = computed(() => {
  return {
    'text-center': props.align === 'center',
    'text-start': props.align === 'left',
    'text-end': props.align === 'right'
  }
})

const serviceColClass = computed(() => {
  // Ajusta el número de columnas solo en desktop
  const colMap = {
    2: 'col-12 col-sm-6 col-lg-6',
    3: 'col-12 col-sm-6 col-lg-4',
    4: 'col-12 col-sm-6 col-lg-3'
  }
  return colMap[props.cols] || 'col-12 col-sm-6 col-lg-4'
})
</script>

<style lang="less" scoped>
.section-services {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.9);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      color-mix(in oklab, var(--surface) 70%, transparent),
      var(--surface)
    );
    z-index: 1;
  }

  .container,
  .container-fluid {
    position: relative;
    z-index: 2;
  }

  .section-title {
    color: var(--heading-color);
    font-family: var(--font-heading);
  }

  .section-subtitle {
    color: var(--);
    max-width: 38rem;
  }

  .service-card {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;

    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 28px color-mix(in oklab, var(--accent), transparent 80%);
    }
  }

  .service-media img {
    transition: transform 0.6s ease;
  }

  .service-card:hover .service-media img {
    transform: scale(1.05);
  }

  .text-accent {
    color: var(--accent);
  }

  .btn-outline-secondary {
    border-color: var(--surface-border);
    color: var(--text);
    transition: all 0.2s ease;

    &:hover {
      background-color: color-mix(in oklab, var(--accent), transparent 90%);
      border-color: var(--accent);
      transform: translateY(-1px);
    }
  }
}
</style>
