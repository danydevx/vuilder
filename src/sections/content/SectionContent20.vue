<!-- src/sections/terrazas/content/SectionContent20.vue -->
<template>
  <section
    :id="id"
    class="section section-content-20 position-relative overflow-hidden py-5"
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

    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <!-- Header -->
      <header
        class="mb-5"
        :class="[headerAlignClass]"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-duration="700"
      >
        <p
          v-if="content.overline"
          class="text-uppercase small fw-semibold text-accent mb-2"
        >
          {{ content.overline }}
        </p>
        <h2 class="fw-bold display-6 mb-2">{{ title }}</h2>
        <p
          v-if="subtitle"
          class=" lead mx-auto"
          style="max-width: 600px"
        >
          {{ subtitle }}
        </p>
      </header>

      <!-- Swiper -->
      <div
        class="position-relative"
        :data-aos="animate ? (order === 'inverted' ? 'fade-right' : 'fade-left') : null"
        data-aos-duration="700"
      >
        <div ref="swiperEl" class="swiper testimonials-swiper">
          <div class="swiper-wrapper">
            <div
              v-for="(testimonial, i) in content.testimonials"
              :key="i"
              class="swiper-slide"
            >
              <div class="testimonial-card text-center mx-auto px-3 px-md-5">
                <div class="quote-icon mb-3">
                  <i class="bi bi-quote fs-1 text-accent"></i>
                </div>
                <p class="lead fw-normal mb-4">{{ testimonial.text }}</p>

                <!-- Autor -->
                <div
                  class="author d-flex align-items-center justify-content-center gap-3"
                >
                  <img
                    :src="testimonial.avatar"
                    :alt="testimonial.name"
                    class="rounded-circle"
                    width="56"
                    height="56"
                  />
                  <div class="text-start">
                    <h6 class="fw-semibold mb-0">{{ testimonial.name }}</h6>
                    <p class=" small mb-0">{{ testimonial.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Flechas -->
          <div
            class="nav-buttons d-flex justify-content-center gap-3 mt-4"
          >
            <button class="swiper-button-prev btn-nav">
              <i class="bi bi-arrow-left"></i>
            </button>
            <button class="swiper-button-next btn-nav">
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps({
  id: { type: String, default: 'section-content-20' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  boxed: { type: Boolean, default: false },
  order: { type: String, default: 'normal' },
  animate: { type: Boolean, default: true },
  autoplay: { type: Boolean, default: true },
  delay: { type: Number, default: 5000 },
  content: { type: Object, default: () => ({ testimonials: [] }) },
  ctas: { type: Array, default: () => [] }
})

const swiperEl = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const headerAlignClass = computed(() => {
  switch (props.align) {
    case 'left':
      return 'text-start me-auto'
    case 'right':
      return 'text-end ms-auto'
    default:
      return 'text-center mx-auto'
  }
})

onMounted(async () => {
  await nextTick()

  new Swiper(swiperEl.value, {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    loop: true,
    autoHeight: true,
    autoplay: props.autoplay
      ? { delay: props.delay, disableOnInteraction: false }
      : false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
})
</script>

<style lang="less" scoped>
.section-content-20 {
  position: relative;
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.08;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
  }

  header h2 {
    color: var(--heading-color);
  }

  .testimonial-card {
    max-width: 800px;
    color: var(--text);
    background: transparent;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }

    .quote-icon i {
      color: var(--accent);
    }

    p {
      color: var(--text);
      font-size: 1.1rem;
      line-height: 1.6;
    }

    .author img {
      border: 2px solid var(--surface-border);
    }
  }

  .btn-nav {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--surface-border);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
    }

    i {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    .testimonial-card {
      padding: 1.5rem;
      p {
        font-size: 1rem;
      }
    }

    .btn-nav {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
