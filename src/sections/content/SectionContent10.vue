<!-- src/sections/terrazas/content/SectionContent10.vue -->
<template>
  <section
    :id="id"
    class="section section-content-10 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <header
        :class="[headerAlignClass, 'mb-5']"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-duration="700"
      >
        <p v-if="content.overline" class="text-uppercase small  text-accent mb-2">
          {{ content.overline }}
        </p>
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p v-if="subtitle" class=" lead mt-2">{{ subtitle }}</p>
      </header>

      <div class="swiper-container-wrapper position-relative">
        <div ref="swiperEl" class="swiper projects-swiper">
          <div class="swiper-wrapper">
            <div
              v-for="(item, i) in content.projects"
              :key="i"
              class="swiper-slide"
            >
              <div
                class="row g-4 align-items-center"
                :class="[{ 'flex-row-reverse': order === 'inverted' && i % 2 !== 0 }]"
                :data-aos="animate ? 'fade-up' : null"
                :data-aos-delay="i * 100"
              >
                <div class="col-lg-6">
                  <div class="project-card rounded-4 shadow-lg p-4 glassy h-100">
                    <div class="icon mb-3">
                      <i :class="[item.icon, 'fs-2 text-accent']"></i>
                    </div>
                    <h4 class="fw-bold mb-1">{{ item.title }}</h4>
                    <p class="small  mb-2">{{ item.category }}</p>
                    <p class=" small mb-4">{{ item.text }}</p>
                    <a
                      :href="item.href || '#'"
                      class="btn btn-scheme fw-semibold rounded-pill px-4 py-2"
                    >
                      {{ item.cta || 'Ver más' }}
                    </a>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="image-frame rounded-4 overflow-hidden shadow-lg">
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-100 h-100 object-fit-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="swiper-controls d-flex align-items-center justify-content-center gap-3 mt-4"
          >
            <button class="swiper-button-prev btn-nav">
              <i class="bi bi-arrow-left"></i>
            </button>
            <div class="swiper-pagination small fw-semibold"></div>
            <button class="swiper-button-next btn-nav">
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="ctas?.length"
        class="d-flex flex-wrap gap-2 mt-5 justify-content-center"
      >
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
              : 'btn-ghost'
          ]"
        >
          <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
          {{ cta.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const props = defineProps({
  id: { type: String, default: 'section-content-10' },
  scheme: { type: String, default: 'default-dark' },
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
  content: { type: Object, default: () => ({}) },
  ctas: { type: Array, default: () => [] }
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const headerAlignClass = computed(() => ({
  'text-center mx-auto': props.align === 'center',
  'text-start me-auto': props.align === 'left',
  'text-end ms-auto': props.align === 'right'
}))
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

const swiperEl = ref(null)
onMounted(() => {
  new Swiper(swiperEl.value, {
    modules: [Navigation, Pagination, EffectFade],
    slidesPerView: 1,
    loop: true,
    spaceBetween: 40,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    speed: 700
  })
})
</script>

<style lang="less" scoped>
.section-content-10 {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.08;
    pointer-events: none;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    pointer-events: none;
  }

  .project-card {
    background: var(--surface);
    border: 1px solid var(--surface-border);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .icon i {
      color: var(--accent);
    }
  }

  .image-frame {
    aspect-ratio: 16 / 10;
    background: var(--surface-2);
    overflow: hidden;

    img {
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .btn-nav {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--surface-border);
    border-radius: 50%;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      transform: translateY(-2px);
    }

    i {
      font-size: 1rem;
    }
  }

  .swiper-pagination {
    color: var(--);
    min-width: 60px;
    text-align: center;
  }

  @media (max-width: 992px) {
    .row {
      flex-direction: column !important;
    }

    .project-card {
      text-align: center;
    }
  }
}
</style>
