<template>
  <section
    :id="id"
    class="section section-gallery-links position-relative overflow-hidden"
    :class="schemeClass"
    ref="sectionRef"
  >
    <div ref="swiperEl" class="swiper gallery-swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(item, i) in gallery"
          :key="i"
          class="swiper-slide position-relative"
          :style="item.height ? { height: item.height + 'px' } : {}"
        >
          <!-- 🔗 Comportamiento dual -->
          <!-- Si hay href, navega -->
          <RouterLink
            v-if="item.href"
            :to="item.href"
            class="gallery-link d-block position-relative"
          >
            <div class="kenburns-layer">
              <img
                :src="item.thumb || item.image"
                :alt="item.title || `Imagen ${i + 1}`"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </div>

            <div class="gallery-overlay d-flex flex-column justify-content-end p-4">
              <div class="text-overlay">
                <h2 class="fw-bold mb-1 display-6">{{ item.title }}</h2>
                <p class="small mb-0">{{ item.subtitle }}</p>
              </div>
            </div>
          </RouterLink>

          <!-- Si no hay href, abre en Lightbox -->
          <a
            v-else
            :href="item.type === 'video' ? item.source : item.image"
            class="gallery-link d-block position-relative glightbox"
            :data-gallery="galleryName"
            :data-type="item.type || 'image'"
            :data-title="item.title"
            :data-description="item.subtitle"
          >
            <div class="kenburns-layer">
              <img
                :src="item.thumb || item.image"
                :alt="item.title || `Imagen ${i + 1}`"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </div>

            <div class="gallery-overlay d-flex flex-column justify-content-end p-4">
              <div class="text-overlay">
                <h2 class="fw-bold mb-1 display-6">{{ item.title }}</h2>
                <p class="small mb-0">{{ item.subtitle }}</p>
              </div>
            </div>

            <div v-if="item.type === 'video'" class="play-overlay">
              <i class="bi bi-play-fill"></i>
            </div>
          </a>
        </div>
      </div>

      <!-- Flechas -->
      <div v-if="showArrows" class="swiper-button-prev"></div>
      <div v-if="showArrows" class="swiper-button-next"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import GLightbox from 'glightbox'
import 'swiper/css'
import 'swiper/css/navigation'
import 'glightbox/dist/css/glightbox.min.css'

const props = defineProps({
  id: { type: String, default: 'gallery-links' },
  scheme: { type: String, default: 'default-neutral' },
  galleryName: { type: String, default: 'gallery-links' },
  gallery: { type: Array, required: true },
  autoplay: { type: Boolean, default: true },
  delay: { type: Number, default: 5000 },
  showArrows: { type: Boolean, default: true },
  kenburnsDuration: { type: Number, default: 12000 },
  slidesPerView: { type: Number, default: 3 },
})

const swiperEl = ref(null)
const sectionRef = ref(null)
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const handleParallax = () => {
  const rect = sectionRef.value?.getBoundingClientRect()
  const y = rect ? rect.top / 6 : 0
  sectionRef.value?.style.setProperty('--parallax-y', `${y}px`)
}

onMounted(async () => {
  await nextTick()

 
  new Swiper(swiperEl.value, {
    modules: [Navigation, Autoplay],
    slidesPerView: props.slidesPerView,
    spaceBetween: 0,
    loop: props.gallery.length > 1,
    speed: 900,
    autoplay: props.autoplay
      ? { delay: props.delay, disableOnInteraction: false }
      : false,
    navigation: props.showArrows
      ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
      : false,
    breakpoints: {
      1400: { slidesPerView: Math.min(props.slidesPerView, 5) },
      1200: { slidesPerView: Math.min(props.slidesPerView, 4) },
      992: { slidesPerView: Math.min(props.slidesPerView, 3) },
      768: { slidesPerView: Math.min(props.slidesPerView, 2) },
      0: { slidesPerView: 1 },
    },
  })

 
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    zoomable: true,
    openEffect: 'fade',
    closeEffect: 'fade',
  })

  window.addEventListener('scroll', handleParallax)
})
</script>

<style lang="less" scoped>
.section-gallery-links {
  background: var(--surface);
  color: var(--text);
  --parallax-y: 0px;

  .gallery-swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    height: 100vh;
    overflow: hidden;
    @media (max-width: 768px) { height: 80vh; }
  }

  .gallery-link {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    color: var(--text-inverse);
    text-decoration: none;
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.01);

      img { transform: scale(1.08); }

      .gallery-overlay {
        background: linear-gradient(
          to top,
          color-mix(in srgb, var(--surface-overlay) 70%, rgba(0, 0, 0, 0.6)) 0%,
          transparent 80%
        );
      }
    }
  }

  /* 🔥 Ken Burns + Parallax */
  .kenburns-layer {
    position: absolute;
    inset: 0;
    transform: translateY(var(--parallax-y));
    transition: transform 0.2s ease-out;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: kenburns-zoom linear infinite alternate;
      animation-duration: v-bind('kenburnsDuration + "ms"');
      transform-origin: center center;
      filter: brightness(0.98) contrast(1.05);
      transition: transform 0.6s ease;
    }
  }

  @keyframes kenburns-zoom {
    0% { transform: scale(1.05) translate(0, 0); }
    100% { transform: scale(1.15) translate(1%, -1%); }
  }

  /* Overlay con tokens */
  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--surface-overlay) 60%, rgba(0, 0, 0, 0.5)) 0%,
      transparent 70%
    );
    color: var(--text-inverse);
    display: flex;
    align-items: flex-end;
    transition: background 0.4s ease;
  }

  .text-overlay {
    h2 {
      font-family: var(--font-heading);
      color: var(--text-inverse);
      text-shadow: 0 2px 10px color-mix(in srgb, var(--accent) 30%, black 70%);
    }
    p {
      color: color-mix(in srgb, var(--text-inverse) 80%, var(--muted) 20%);
    }
  }

  /* Icono de play opcional */
  .play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    i {
      font-size: 3rem;
      color: var(--text-inverse);
      opacity: 0.9;
    }
  }

  /* Flechas con tokens */
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--text-inverse);
    background: color-mix(in srgb, var(--surface-overlay) 40%, var(--accent) 10%);
    border-radius: 50%;
    width: 46px;
    height: 46px;
    transition: all 0.3s ease;

    &::after { font-size: 1.2rem; }

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 40%, transparent);
    }

    @media (max-width: 768px) { display: none; }
  }
}
</style>
