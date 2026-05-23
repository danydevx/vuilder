<!-- src/sections/terrazas/gallery/SectionGalleryKenburns.vue -->
<template>
  <section
    :id="id"
    class="section section-gallery-kenburns position-relative overflow-hidden"
    :class="schemeClass"
    ref="sectionRef"
  >
    <!-- Swiper principal -->
    <div ref="swiperEl" class="swiper gallery-swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(item, i) in gallery"
          :key="i"
          class="swiper-slide position-relative"
        >
          <a
            :href="item.image"
            class="gallery-item d-block position-relative glightbox"
            :data-gallery="galleryName"
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

            <!-- Overlay -->
            <div class="gallery-overlay d-flex flex-column justify-content-end p-4">
              <div class="text-overlay">
                <h2 class="fw-semibold mb-1 display-6">{{ item.title }}</h2>
                <p class="small mb-0">{{ item.subtitle }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div v-if="showArrows" class="swiper-button-prev"></div>
      <div v-if="showArrows" class="swiper-button-next"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

const props = defineProps({
  id: { type: String, default: 'gallery-kenburns' },
  scheme: { type: String, default: 'default-neutral' },
  galleryName: { type: String, default: 'gallery-kenburns' },
  gallery: { type: Array, required: true },
  autoplay: { type: Boolean, default: true },
  delay: { type: Number, default: 5000 },
  showArrows: { type: Boolean, default: false },
  kenburnsDuration: { type: Number, default: 12000 },
  slidesPerView: { type: Number, default: 1 },
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
    speed: 1000,
    autoplay: props.autoplay
      ? { delay: props.delay, disableOnInteraction: false }
      : false,
    navigation: props.showArrows
      ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
      : false,
  })

  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    zoomable: true,
  })

  window.addEventListener('scroll', handleParallax)
})
</script>

<style lang="less" scoped>
.section-gallery-kenburns {
  background: var(--surface);
  color: var(--text);
  position: relative;
  --parallax-y: 0px;

  .gallery-swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    height: 100vh;
    overflow: hidden;
    position: relative;

    @media (max-width: 768px) {
      height: 80vh;
    }
  }

  .gallery-item {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--surface-border);
    background: var(--surface-2);
  }

  /* 🔥 Ken Burns + Parallax */
  .kenburns-layer {
    position: absolute;
    inset: 0;
    transform: translateY(var(--parallax-y));
    transition: transform 0.25s ease-out;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: kenburns-zoom linear infinite alternate;
      animation-duration: v-bind('kenburnsDuration + "ms"');
      transform-origin: center center;
      filter: brightness(0.96) contrast(1.03);
    }
  }

  @keyframes kenburns-zoom {
    0% { transform: scale(1.05) translate(0, 0); }
    100% { transform: scale(1.15) translate(1%, -1%); }
  }

  /* Overlay coherente con el scheme */
  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--surface-overlay) 65%, rgba(0, 0, 0, 0.55)) 0%,
      transparent 70%
    );
    color: var(--text-inverse);
    display: flex;
    align-items: flex-end;
    transition: background 0.3s ease;
  }

  .text-overlay {
    h2 {
      color: var(--text-inverse);
      text-shadow: 0 3px 8px color-mix(in srgb, var(--accent) 25%, black 70%);
    }
    p {
      color: color-mix(in srgb, var(--text-inverse) 80%, var(--muted) 20%);
    }
  }

  /* Flechas de navegación */
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--text-inverse);
    background: color-mix(in srgb, var(--surface-overlay) 40%, var(--accent) 10%);
    border: 1px solid var(--surface-border);
    border-radius: 50%;
    width: 46px;
    height: 46px;
    transition: all 0.3s ease;

    &::after {
      font-size: 1.2rem;
    }

    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
      box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 40%, transparent);
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
}
</style>
