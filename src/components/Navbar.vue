<!-- src/components/JumpNav.vue -->
<template>

  <nav
    v-if="computedLinks.length"
    class="jump-nav position-sticky top-0 d-md-none"
    :class="[{ 'has-border': showBorder }, schemeClass]"
    :style="{ zIndex }"
    role="navigation"
    aria-label="Secciones de la invitación"
  >
    <div class="container py-2">
      <div class="jump-links">
        <a
          v-for="link in computedLinks"
          :key="link.to"
          class="btn btn-outline-secondary btn-sm button-rounded"
          :href="link.to"
          @click.prevent="handleClick(link.to)"
        >
          <i :class="[link.icon || 'bi bi-dot', 'me-1']" />
          {{ link.label || link.to }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  links: {
    type: Array,
    default: () => ([
      { to: '#section-hero',     icon: 'bi bi-stars',          label: 'Inicio' },
      { to: '#section-event',    icon: 'bi bi-calendar-event', label: 'Evento' },
      { to: '#section-ceremony', icon: 'bi bi-balloon-heart',  label: 'Ceremonia' },
      { to: '#section-gallery',  icon: 'bi bi-images',         label: 'Galería' },
    ])
  },
  offset: { type: Number, default: 64 },
  duration: { type: Number, default: 600 },
  updateHash: { type: Boolean, default: true },
  zIndex: { type: [Number, String], default: 1030 },
  showBorder: { type: Boolean, default: true },
  /** Acepta: 'light' | 'dark' | 'rose' | 'rose-dark' | 'emerald' | 'scheme-*' */
  scheme: { type: String, default: '' },
})

const computedLinks = computed(() =>
  (props.links || []).filter(l => l && typeof l.to === 'string' && l.to.startsWith('#'))
)

const schemeClass = computed(() => {
  const s = (props.scheme || '').trim()
  return s ? (s.startsWith('scheme-') ? s : `scheme-${s}`) : null
})

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function smoothScrollTo(target, { offset = props.offset, duration = props.duration, updateHash = props.updateHash } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  const startY = window.pageYOffset
  const rect = el.getBoundingClientRect()
  const destY = Math.max(0, rect.top + window.pageYOffset - offset)
  const startTime = performance.now()

  function step(now) {
    const elapsed = now - startTime
    const t = Math.min(1, elapsed / duration)
    const eased = easeInOutCubic(t)
    window.scrollTo(0, startY + (destY - startY) * eased)
    if (t < 1) requestAnimationFrame(step)
    else if (updateHash && typeof history !== 'undefined') {
      const id = typeof target === 'string' && target.startsWith('#') ? target : `#${el.id}`
      if (id) history.replaceState(null, '', id)
    }
  }

  requestAnimationFrame(step)
}

function handleClick(selector) {
  smoothScrollTo(selector)
}

/* Delegado global opcional: respeta tu patrón window.appScrollTo */
function onAppScrollTo(e) {
  const { target, options } = e.detail || {}
  if (!target) return
  smoothScrollTo(target, options)
}

onMounted(() => {
  window.addEventListener('app:scrollTo', onAppScrollTo)
  if (!window.appScrollTo) {
    window.appScrollTo = (selector, options) => smoothScrollTo(selector, options)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('app:scrollTo', onAppScrollTo)
  // no eliminamos window.appScrollTo si otro componente lo usa
})
</script>

<style lang="less" scoped>
.jump-nav {
  background: var(--surface);
  color: var(--text);

  &.has-border {
    border-bottom: 1px solid color-mix(in oklab, var(--border), transparent 10%);
  }

  .jump-links {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;

    .btn {
      /* Mantén tu estética general */
      border-radius: 999px;
      font-weight: 600;
      --_bd: color-mix(in oklab, var(--text), transparent 70%);
      --_fg: color-mix(in oklab, var(--text), transparent 5%);
      --_fg-hover: var(--text);

      border-color: var(--_bd);
      color: var(--_fg);
      background: color-mix(in oklab, var(--surface), transparent 0%);

      &:hover,
      &:focus {
        color: var(--_fg-hover);
        border-color: color-mix(in oklab, var(--accent), transparent 35%);
        background: color-mix(in oklab, var(--accent), transparent 92%);
        box-shadow: var(--shadow-sm, 0 2px 8px rgba(0,0,0,.08));
      }
    }
  }
}

/* Soporte dark / rose-dark mejorando contraste */
:global(.scheme-rose-dark) .jump-nav,
.jump-nav.scheme-rose-dark {
  background: color-mix(in oklab, var(--surface), white 2%);
  .jump-links .btn:hover,
  .jump-links .btn:focus {
    background: color-mix(in oklab, var(--accent), transparent 85%);
  }
}
</style>
