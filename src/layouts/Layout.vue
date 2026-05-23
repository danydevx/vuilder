<!-- src/components/layout/Layout.vue -->
<template>
  <div :class="layoutClasses">
    <!-- Botón de audio global -->
 

    <!-- Navegación móvil (extraída a componente) -->
 
    <!-- Contenido principal -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
 
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import AudioToggle from '@/components/AudioToggle.vue'
import Navbar from '@/components/Navbar.vue'
import { useUiStore } from '@/stores/ui'

const props = defineProps({
  audioSrc: {
    type: String,
    default:
      'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/ytH3i0m4bLq8e8cdYy7Rw5aM1xTaXoY2PHa2Vv7l.mp3',
  },
})

const ui = useUiStore()

// Clases dinámicas para el layout
const layoutClasses = computed(() => [
  'layout',
  ui.theme, // p. ej. 'invite-basic'
  `scheme-${ui.scheme}`, // p. ej. 'scheme-rose-dark'
  `font-scheme-${ui.font}`, // p. ej. 'font-scheme-elegant'
  ...ui.bodyExtraClasses,
])

// Links del menú móvil
const jumpLinks = [
  { to: '#section-hero', icon: 'bi bi-stars', label: 'Inicio' },
  { to: '#section-event', icon: 'bi bi-calendar-event', label: 'Evento' },
  { to: '#section-ceremony', icon: 'bi bi-balloon-heart', label: 'Ceremonia' },
  { to: '#section-gallery', icon: 'bi bi-images', label: 'Galería' },
]

const HEADER_OFFSET = 64

// Scroll suave global (para otros botones o triggers)
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function smoothScrollTo(
  target,
  { offset = HEADER_OFFSET, duration = 600, updateHash = true } = {}
) {
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
      const id =
        typeof target === 'string' && target.startsWith('#')
          ? target
          : `#${el.id}`
      if (id) history.replaceState(null, '', id)
    }
  }

  requestAnimationFrame(step)
}

function onDocumentClick(e) {
  const link = e.target.closest('a[href^="#"], [data-scroll-to]')
  if (!link) return
  const sel = link.getAttribute('data-scroll-to') || link.getAttribute('href')
  if (!sel || sel === '#') return
  if (sel.startsWith('#')) {
    e.preventDefault()
    smoothScrollTo(sel)
  }
}

function onAppScrollTo(e) {
  const { target, options } = e.detail || {}
  if (!target) return
  smoothScrollTo(target, options)
}

onMounted(() => {
  AOS.init({ duration: 600, once: true, offset: 80 })
  document.addEventListener('click', onDocumentClick, { passive: false })
  window.addEventListener('app:scrollTo', onAppScrollTo)
  window.appScrollTo = (selector, options) =>
    smoothScrollTo(selector, options)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  window.removeEventListener('app:scrollTo', onAppScrollTo)
  delete window.appScrollTo
})
</script>

<style scoped>
html,
:host {
  scroll-behavior: auto;
}
</style>
