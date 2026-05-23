<template>
  <header
    class="lw-header w-100 position-relative"
    :class="[{ 'is-sticky': sticky }, schemeClass]"
  >
    <div class="container py-3 d-flex align-items-center justify-content-between">
      <!-- Izquierda: Redes -->
      <nav class="header-left d-none d-md-flex align-items-center gap-3">
        <a v-for="(item, i) in socials" :key="i" :href="item.href" class="link-muted small" :aria-label="item.label">
          <i :class="item.icon"></i>
        </a>
      </nav>

      <!-- Centro: Logo / monograma -->
      <a :href="homeHref" class="header-logo text-decoration-none">
        <div class="logo-ring mx-auto">
          <span class="logo-top text-uppercase tracking-tight">{{ logoRingTop }}</span>
          <span class="logo-mark fw-semibold">{{ logoText }}</span>
          <span class="logo-bottom text-uppercase tracking-tight">{{ logoRingBottom }}</span>
        </div>
      </a>

      <!-- Derecha: Idiomas -->
      <nav class="header-right d-none d-md-flex align-items-center gap-3">
        <a
          v-for="lang in languages"
          :key="lang.code"
          :href="lang.href"
          class="link-muted small"
          :class="{ active: lang.code === currentLang }"
        >{{ lang.label }}</a>
      </nav>
    </div>

    <!-- Menú centrado -->
    <div class="container pb-2">
      <nav class="main-nav d-flex justify-content-center gap-4 gap-md-5 text-uppercase">
        <a
          v-for="(item, i) in nav"
          :key="i"
          :href="item.href"
          class="nav-link"
          :class="{ active: item.active }"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  scheme: { type: String, default: '' },
  sticky: { type: Boolean, default: false },
  homeHref: { type: String, default: '/' },
  logoText: { type: String, default: 'LW' },
  logoRingTop: { type: String, default: 'LEWIS PORTFOLIO' },
  logoRingBottom: { type: String, default: 'DIGITAL STUDIO' },
  nav: {
    type: Array,
    default: () => ([
      { label: 'Studio', href: '#studio', active: true },
      { label: 'Works', href: '#works' },
      { label: 'News', href: '#news' },
      { label: 'Contact', href: '#contact' },
    ])
  },
  socials: {
    type: Array,
    default: () => ([
      { icon: 'bi bi-twitter-x', href: '#', label: 'Twitter' },
      { icon: 'bi bi-behance', href: '#', label: 'Behance' },
      { icon: 'bi bi-instagram', href: '#', label: 'Instagram' },
    ])
  },
  languages: {
    type: Array,
    default: () => ([
      { code: 'en', label: 'ENG', href: '#lang-en' },
      { code: 'fr', label: 'FRA', href: '#lang-fr' },
    ])
  },
  currentLang: { type: String, default: 'en' }
})

const schemeClass = computed(() => {
  const s = (props.scheme || '').trim()
  if (!s) return ''
  if (s.startsWith('scheme-')) return s
  if (s === 'light' || s === 'dark') return `scheme-${s}`
  return `component-scheme-${s}`
})
</script>

<style lang="less" scoped>
.lw-header {
  --header-text: var(--text-muted);
  --header-active: var(--text);
  --ring-bg: color-mix(in oklab, var(--surface), #000 5%);
  --ring-border: var(--surface-border);

  .link-muted {
    color: var(--header-text);
    &:hover { color: var(--header-active); }
    &.active { color: var(--header-active); font-weight: 600; }
  }

  .main-nav .nav-link {
    color: var(--header-text);
    letter-spacing: .08em;
    font-size: .85rem;
    text-decoration: none;
    position: relative;
    &.active { color: var(--accent); }
    &:hover { color: var(--header-active); }
    &::after {
      content: "";
      position: absolute;
      left: 0; right: 0; bottom: -6px;
      height: 2px;
      background: currentColor;
      opacity: 0; transform: scaleX(0);
      transition: all .25s ease;
    }
    &:hover::after, &.active::after { opacity: .6; transform: scaleX(1); }
  }

  .logo-ring {
    position: relative;
    width: 72px; height: 72px;
    border-radius: 50%;
    background: var(--ring-bg);
    border: 1px solid var(--ring-border);
    display: grid; place-items: center;
    text-align: center;
    .logo-mark { font-size: 1.25rem; line-height: 1; }
    .logo-top, .logo-bottom {
      position: absolute; left: 0; right: 0;
      font-size: .55rem; color: var(--header-text);
      letter-spacing: .18em;
    }
    .logo-top { top: 6px; }
    .logo-bottom { bottom: 6px; }
  }

  &.is-sticky {
    position: sticky; top: 0; z-index: 50;
    backdrop-filter: blur(6px);
    background: color-mix(in oklab, var(--surface), transparent 10%);
    border-bottom: 1px solid var(--surface-border);
  }
}

/* Helpers */
.tracking-tight { letter-spacing: .12em; }
</style>
