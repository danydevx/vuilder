<!-- src/sections/SectionHeroWeddingGrace.vue -->
<template>
  <section
    id="section-hero-wedding"
    class="section-hero-wedding position-relative overflow-hidden text-center py-5"
    :class="schemeClass"
    ref="sectionRef"
  >
    <!-- Fondo con parallax -->
    <div
      class="hero-bg"
      :style="{
        backgroundImage: `url(${backgroundImg})`,
        transform: parallaxEnabled ? `translate3d(0, ${bgParallaxY}px, 0) scale(1.06)` : 'scale(1.06)'
      }"
      aria-hidden="true"
    ></div>

    <!-- Overlay suave (tokens) -->
    <div class="hero-overlay" aria-hidden="true"></div>

    <!-- Pétalos flotando (imágenes ligeras / emojis en placeholders) -->
    <div class="petals" aria-hidden="true">
      <img
        v-for="(p, i) in petalsToRender"
        :key="i"
        class="petal"
        :class="[`petal-${i % 6}`]"
        :src="p.src"
        :alt="`petal-${i+1}`"
        :style="{
          top: p.top, left: p.left, width: p.size, height: p.size,
          animationDuration: p.dur, animationDelay: p.delay
        }"
        loading="lazy"
      />
    </div>

    <!-- Contenido principal -->
    <div class="inner container position-relative z-1 d-flex flex-column justify-content-center align-items-center min-vh-100">
      <!-- Monograma -->
      <div
        class="monogram-wrap mb-3"
        data-aos="zoom-in"
        data-aos-duration="700"
      >
        <div class="monogram-ring">
          <span class="monogram">{{ monogram }}</span>
        </div>
      </div>

      <!-- Retrato con arco -->
      <figure
        v-if="portraitImg"
        class="portrait mb-4"
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        <div class="portrait-arch">
          <img :src="portraitImg" :alt="namesText" class="portrait-img" />
        </div>
        <figcaption v-if="dateText" class="date-chip">
          <i class="bi bi-calendar-event me-1"></i>{{ dateText }}
        </figcaption>
      </figure>

      <!-- Encabezados -->
      <p class="kicker" data-aos="fade-up" data-aos-duration="600">¡Nos casamos!</p>
      <h1
        class="hero-names  mb-2"
        data-aos="fade-up"
        data-aos-duration="700"
        data-aos-delay="60"
      >
        {{ namesText }}
      </h1>

      <p
        v-if="venueText"
        class="hero-subtitle mb-3"
        data-aos="fade-up"
        data-aos-duration="700"
        data-aos-delay="110"
      >
        {{ venueText }}
      </p>

      <!-- Chip de fecha si no hay retrato -->
      <div
        v-if="dateText && !portraitImg"
        class="date-chip mb-3"
        data-aos="fade-up"
        data-aos-duration="700"
        data-aos-delay="140"
      >
        <i class="bi bi-calendar-event me-1"></i>{{ dateText }}
      </div>

      <!-- Divider -->
      <div
        class="hero-divider my-3"
        data-aos="zoom-in"
        data-aos-duration="600"
        data-aos-delay="170"
        aria-hidden="true"
      >
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      </div>

      <!-- CTA -->
      <a
        v-if="nextTarget"
        :href="nextTarget"
        class="btn btn-scheme rounded-pill px-4 py-3"
        :data-scroll-to="nextTarget"
        @click.prevent="scrollTo(nextTarget)"
        data-aos="fade-up"
        data-aos-duration="700"
        data-aos-delay="210"
      >
        Ver detalles
      </a>
    </div>

    <!-- Separador inferior -->
    
  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  scheme: {
    type: String,
    default: '',
    validator: v => ['', 'light', 'dark', 'default-neutral', 'rose-dark', 'rose-gold', 'rose-vintage', 'rose-berry', 'rose-blush', 'emerald-light', 'emerald-dark'].includes(v)
  },
  names: { type: [String, Array], default: () => ['Nombre 1', 'Nombre 2'] },
  dateText: { type: String, default: '' },
  venueText: { type: String, default: '' },
  nextTarget: { type: String, default: '#section-info' },
  backgroundImg: { type: String, default: 'https://placehold.co/1920x1200/jpg?text=Fondo+Boda' },
  portraitImg: { type: String, default: '' },
  parallax: { type: Boolean, default: true },
  parallaxStrength: { type: Number, default: 0.35 },
  petals: {
    type: Array,
    default: () => ([
      { src: 'https://placehold.co/96x96/png?text=🌸', top: '8%',  left: '12%', size: '52px', dur: '11s', delay: '0s' },
      { src: 'https://placehold.co/96x96/png?text=🌺', top: '18%', left: '82%', size: '56px', dur: '13s', delay: '.2s' },
      { src: 'https://placehold.co/96x96/png?text=💐', top: '28%', left: '6%',  size: '48px', dur: '12s', delay: '.4s' },
      { src: 'https://placehold.co/96x96/png?text=🌸', top: '68%', left: '88%', size: '60px', dur: '14s', delay: '.1s' },
      { src: 'https://placehold.co/96x96/png?text=🌺', top: '76%', left: '18%', size: '50px', dur: '12s', delay: '.6s' },
      { src: 'https://placehold.co/96x96/png?text=💐', top: '12%', left: '50%', size: '44px', dur: '10s', delay: '.3s' }
    ])
  }
})

/* ===== State ===== */
const sectionRef = ref(null)
const bgParallaxY = ref(0)
let rAF = null
let ticking = false
let parallaxEnabled = true

const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const namesText = computed(() =>
  Array.isArray(props.names) ? props.names.join(' & ') : props.names
)

/** Monograma: primeras letras de los dos nombres más visibles */
const monogram = computed(() => {
  const arr = Array.isArray(props.names) ? props.names : String(props.names).split('&')
  const pick = s => (s?.trim?.()[0] || '').toUpperCase()
  const first = pick(arr[0] || '')
  const second = pick(arr[1] || '')
  return `${first}${second ? '•' : ''}${second}`
})

function scrollTo(selector) {
  const el = document.querySelector(selector)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* Parallax */
const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  : false

onMounted(() => {
  parallaxEnabled = props.parallax && !prefersReduced
  if (!parallaxEnabled) return
  const onScroll = () => {
    if (ticking) return
    ticking = true
    rAF = requestAnimationFrame(updateParallax)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  onScroll()

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (rAF) cancelAnimationFrame(rAF)
  })
})

function updateParallax() {
  ticking = false
  const el = sectionRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || 1
  const progress = 1 - (rect.top + rect.height / 2) / (vh + rect.height / 2)
  const maxShift = 70
  const shift = Math.max(-maxShift, Math.min(maxShift, progress * (props.parallaxStrength * 200)))
  bgParallaxY.value = Math.round(shift)
}

/* Pétalos a renderizar */
const petalsToRender = computed(() => props.petals || [])
</script>

<style lang="less" scoped>
.section-hero-wedding {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  color: var(--text);
  --overlay: rgba(0, 0, 0, 0.26);
  --shape-fill: var(--surface);
}

/* Fondo */
.hero-bg {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
  will-change: transform;
  transform: scale(1.06);
  transition: transform .9s cubic-bezier(.22,1,.36,1);
}

/* Overlay */
.hero-overlay {
  position: absolute; inset: 0; z-index: 1;
  background:
    radial-gradient(900px 480px at 50% -160px,
      color-mix(in oklab, var(--surface), transparent 90%) 0%,
      transparent 60%),
    linear-gradient(135deg,
      var(--overlay) 0%,
      color-mix(in oklab, var(--overlay), transparent 28%) 52%,
      color-mix(in oklab, var(--overlay), transparent 60%) 100%);
}

/* Pétalos */
.petals { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.petal {
  position: absolute; object-fit: contain; opacity: .9;
  filter:
    drop-shadow(0 4px 10px var(--shadow-sm))
    saturate(.96);
  animation-name: petal-fall;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
  border-radius: 12px;
  border: 1px solid color-mix(in oklab, var(--accent-muted), transparent 60%);
  background: color-mix(in oklab, var(--surface), transparent 12%);
}
.petal-0 { animation-duration: 12s; }
.petal-1 { animation-duration: 13s; }
.petal-2 { animation-duration: 14s; }
.petal-3 { animation-duration: 15s; }
.petal-4 { animation-duration: 16s; }
.petal-5 { animation-duration: 17s; }

@keyframes petal-fall {
  0%   { transform: translate3d(0, -20px, 0) rotate(-6deg) scale(1);   opacity: .0; }
  10%  { opacity: .9; }
  40%  { transform: translate3d(8px, 60px, 0) rotate(6deg)  scale(1.02); }
  70%  { transform: translate3d(-10px, 120px, 0) rotate(-4deg) scale(1.01); }
  100% { transform: translate3d(0, 180px, 0) rotate(2deg)   scale(1);   opacity: .0; }
}

/* Monograma */
.monogram-wrap { display: grid; place-items: center; }
.monogram-ring {
  display: grid; place-items: center;
  width: 104px; height: 104px;
  border-radius: 999px;
  background:
    radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--surface), transparent 6%) 0%, transparent 100%),
    var(--card-bg-glass);
  border: 1px solid var(--card-stroke);
  box-shadow:
    inset 0 0 0 6px color-mix(in oklab, var(--accent-muted), transparent 78%),
    var(--shadow);
}
.monogram {
  font-family: var(--font-heading, inherit);
  font-weight: 700;
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  color: var(--heading-color);
  letter-spacing: .12em;
}

/* Retrato con arco */
.portrait { position: relative; display: inline-block; }
.portrait-arch {
  position: relative; width: min(520px, 78vw);
  aspect-ratio: 4 / 5;
  border-radius: 24px 24px 0 0 / 28px 28px 0 0; /* arco sutil */
  overflow: hidden;
  background: var(--shape-fill);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--surface-border);
}
.portrait-arch::after {
  /* “marco” interior con tokens */
  content: "";
  position: absolute; inset: 10px 10px 0 10px;
  border-radius: 20px 20px 0 0 / 24px 24px 0 0;
  border: 1px solid color-mix(in oklab, var(--accent-muted), transparent 65%);
  pointer-events: none;
}
.portrait-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover;
  filter: saturate(1) contrast(1);
}

/* Chip fecha */
.date-chip {
  display: inline-flex; align-items: center; gap: .4rem;
  margin-top: .75rem;
  padding: .4rem .7rem;
  border-radius: 999px;
  background: var(--card-bg-glass);
  color: var(--text);
  border: 1px solid var(--card-stroke);
  box-shadow: var(--shadow-sm);
  font-size: .9rem;
}

/* Textos */
.kicker {
  color: var(--text-secondary);
  letter-spacing: .08em;
  text-transform: uppercase;
  font-size: .8rem;
  margin-bottom: .25rem;
}
.hero-names {
  color: var(--heading-color);
  font-size: var(--h1-size);
  line-height: var(--heading-line-height);
  letter-spacing: var(--heading-letter-spacing);
  font-weight: var(--heading-weight);
}
.hero-subtitle {
  color: var(--text-secondary);
  font-size: var(--subtitle-size);
  line-height: var(--subtitle-line-height);
}

/* Divider */
.hero-divider { display: inline-flex; gap: .45rem; align-items: center; }
.hero-divider .dot {
  width: 6px; height: 6px; border-radius: 999px;
  background: color-mix(in oklab, var(--accent), transparent 30%);
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--accent), transparent 88%);
}

/* Separador inferior */
.shape-separator {
  position: absolute; left: 0; right: 0; bottom: -1px; height: 70px; z-index: 2; line-height: 0;
}
.shape-path {
  fill: var(--shape-fill);
  filter: drop-shadow(0 -4px 8px var(--shadow-sm));
}

/* Responsive */
@media (max-width: 768px) {
  .monogram-ring { width: 84px; height: 84px; }
  .portrait-arch { width: min(360px, 86vw); }
  .shape-separator { height: 56px; }
}

/* Accesibilidad motion */
@media (prefers-reduced-motion: reduce) {
  .hero-bg { transition: none; transform: none !important; }
  .petal { animation: none !important; }
}
</style>
