<template>
  <nav class="page-nav" :class="[`scheme-${scheme}`, { sticky }]">
    <div class="nav-container" :class="{ fluid }">
      <router-link
        v-for="page in pages"
        :key="page.path"
        :to="page.path"
        class="nav-item"
        :class="{ active: isActive(page.path) }"
      >
        <i v-if="page.icon" :class="page.icon"></i>
        <span>{{ page.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineProps({
  scheme: {
    type: String,
    default: 'dark'
  },
  sticky: {
    type: Boolean,
    default: false
  },
  fluid: {
    type: Boolean,
    default: true
  }
})

const route = useRoute()

const pages = [
  { path: '/', label: 'Inicio', icon: 'bi bi-house' },
  { path: '/heros', label: 'Heros', icon: 'bi bi-image' },
  { path: '/galleries', label: 'Galleries', icon: 'bi bi-images' },
  { path: '/services', label: 'Services', icon: 'bi bi-gear' },
  { path: '/packages', label: 'Packages', icon: 'bi bi-box-seam' },
  { path: '/menus', label: 'Menus', icon: 'bi bi-list-ul' },
  { path: '/timelines', label: 'Timelines', icon: 'bi bi-clock' },
  { path: '/faqs', label: 'Faqs', icon: 'bi bi-question-circle' },
  { path: '/ctas', label: 'CTAs', icon: 'bi bi-cursor' },
  { path: '/social-links', label: 'Social', icon: 'bi bi-share' },
  { path: '/welcome', label: 'Welcome', icon: 'bi bi-star' },
  { path: '/countdowns', label: 'Countdowns', icon: 'bi bi-hourglass' },
  { path: '/content', label: 'Content', icon: 'bi bi-justify' },
  { path: '/calendars', label: 'Calendars', icon: 'bi bi-calendar' },
  { path: '/maps', label: 'Maps', icon: 'bi bi-geo-alt' },
  { path: '/cards', label: 'Cards', icon: 'bi bi-grid-3x3' },
  { path: '/portfolio', label: 'Portfolio', icon: 'bi bi-briefcase' },
  { path: '/videos', label: 'Videos', icon: 'bi bi-play-circle' },
]

const isActive = (path) => route.path === path
</script>

<style scoped>
.page-nav {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.page-nav.scheme-dark {
  background: #1a1a2e;
  color: #fff;
}

.page-nav.scheme-light {
  background: #f8f9fa;
  color: #333;
}

.page-nav.sticky {
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-container.fluid {
  max-width: 100%;
  padding: 0.75rem 1.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  background: transparent;
  color: inherit;
}

.page-nav.scheme-dark .nav-item:hover,
.page-nav.scheme-dark .nav-item.active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.page-nav.scheme-light .nav-item:hover,
.page-nav.scheme-light .nav-item.active {
  background: rgba(0, 0, 0, 0.08);
  color: #333;
}

.nav-item.active {
  background: #3b82f6;
  color: #fff;
}

.nav-item i {
  font-size: 0.875rem;
}
</style>