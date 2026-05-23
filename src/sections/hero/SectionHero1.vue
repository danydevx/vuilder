<template>
  <section
    :id="id"
    class="section section-hero-terrace-carousel position-relative overflow-hidden"
    :class="['component-scheme-' + scheme]"
  >
    <div class="container position-relative py-5">
      <div class="row align-items-center g-5">
        <!-- Carrusel de imágenes -->
        <div class="col-12 col-md-6">
          <div
            ref="swiperEl"
            class="swiper terrace-swiper"
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            <div class="swiper-wrapper">
              <div
                v-for="(item, i) in params.backgrounds"
                :key="i"
                class="swiper-slide"
              >
                <figure
                  class="hero-image-card rounded-4 overflow-hidden shadow-sm position-relative"
                >
                  <img
                    :src="item.image"
                    :alt="item.title || `Imagen ${i + 1}`"
                    class="w-100 h-100 object-fit-cover"
                    loading="lazy"
                  />
                  <figcaption
                    v-if="item.title"
                    class="caption small  text-center py-2"
                  >
                    {{ item.title }}
                  </figcaption>
                </figure>
              </div>
            </div>
            <div class="swiper-pagination mt-3"></div>
          </div>
        </div>

        <!-- Contenido -->
        <div class="col-12 col-md-6 text-md-start text-center">
          <div class="hero-content" data-aos="fade-up" data-aos-duration="700">
            <h1 class="hero-title mb-2">
              <i v-if="icon" :class="icon" class="me-2"></i>{{ title }}
            </h1>
            <p v-if="subtitle" class="hero-subtitle mb-3">{{ subtitle }}</p>
            <div v-if="body" class="hero-body mb-4" v-html="body"></div>

            <!-- Botones -->
            <div
              class="hero-ctas d-flex flex-wrap gap-2 justify-content-md-start justify-content-center"
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const props = defineProps({
  id: { type: String, default: 'section-hero-terrace-carousel' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  body: { type: String, default: '' },
  icon: { type: String, default: '' },
  ctas: {
    type: Array,
    default: () => ([
      { label: 'Reservar fecha', href: '#section-rsvp', variant: 'solid', icon: 'bi bi-calendar-heart' },
      { label: 'Ver galería', href: '#section-gallery', variant: 'outline', icon: 'bi bi-images' }
    ])
  },
  params: {
    type: Object,
    default: () => ({
      backgrounds: [
        { image: 'https://placehold.co/1200x800/jpg?text=Terraza+1', title: 'Vista principal' },
        { image: 'https://placehold.co/1200x800/jpg?text=Terraza+2', title: 'Evento nocturno' },
        { image: 'https://placehold.co/1200x800/jpg?text=Terraza+3', title: 'Decoración elegante' }
      ]
    })
  }
})

const swiperEl = ref(null)

onMounted(() => {
  new Swiper(swiperEl.value, {
    modules: [Pagination, Autoplay],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    autoplay: { delay: 4200, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      768: { slidesPerView: 1 },
      992: { slidesPerView: 1 }
    }
  })
})
</script>

<style lang="less" scoped>
.section-hero-terrace-carousel {
  background: var(--surface);
  color: var(--text);

  .terrace-swiper {
    .hero-image-card {
      aspect-ratio: 4 / 3;
      background: var(--surface-2);

      img {
        transition: transform 0.6s ease;
      }
      &:hover img {
        transform: scale(1.05);
      }

      .caption {
        background: var(--surface-overlay);
      }
    }

    .swiper-pagination-bullet {
      background: var(--accent-muted);
      opacity: 0.6;
      &-active {
        background: var(--accent);
        opacity: 1;
      }
    }
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: clamp(1.8rem, 5vw, 2.8rem);
    font-weight: 700;
    color: var(--heading-color);
  }

  .hero-subtitle {
    color: var(--text-secondary);
    font-size: 1.05rem;
  }

  .hero-body {
    color: var(--muted);
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .hero-ctas {
    .btn-outline-secondary {
      border-color: var(--surface-border);
      color: var(--text);
      &:hover {
        background-color: var(--accent-muted);
        border-color: var(--accent);
        transform: translateY(-1px);
      }
    }
  }

  @media (max-width: 768px) {
    .row {
      text-align: center;
    }

    .hero-title {
      font-size: clamp(1.6rem, 6vw, 2.3rem);
    }

    .hero-ctas {
      justify-content: center;
      margin-top: 1rem;
    }
  }
}
</style>
