// =============================
// src/router/index.js
// =============================
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import Content from '@/pages/Content.vue'
import Calendars from '@/pages/Calendars.vue'
import Maps from '@/pages/Maps.vue'
import Heros from '@/pages/Heros.vue'
import Gallerys from '@/pages/Gallerys.vue'
import Services from '@/pages/Services.vue'
import Faqs from '@/pages/Faqs.vue'
import Timelines from '@/pages/Timelines.vue'
import Packages from '@/pages/Packages.vue'
import Welcome from '@/pages/Welcome.vue'
import Menus from '@/pages/Menus.vue'
import CTAs from '@/pages/CTAs.vue'
import SocialLinks from '@/pages/SocialLinks.vue'
import Crearte from '@/pages/Crearte.vue'
import Countdowns from '@/pages/Countdowns.vue'
import BuilderDemo from '@/pages/BuilderDemo.vue'
import Preview from '@/pages/Preview.vue'
import Cards from '@/pages/Cards.vue'
import Portfolio from '@/pages/Portfolio.vue'
import Videos from '@/pages/Videos.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index,
    meta: {
      title: 'Inicio',
    },
  },
  {
    path: '/heros',
    name: 'heros',
    component: Heros,
    meta: {
      title: 'Heros',
    },
  },
  {
    path: '/galleries',
    name: 'galleries',
    component: Gallerys,
    meta: {
      title: 'Galleries',
    },
  },
  {
    path: '/services',
    name: 'services',
    component: Services,
    meta: {
      title: 'Services',
    },
  },
  {
    path: '/faqs',
    name: 'faqs',
    component: Faqs,
    meta: {
      title: 'Faqs',
    },
  },
  {
    path: '/timelines',
    name: 'timelines',
    component: Timelines,
    meta: {
      title: 'Timelines',
    },
  },
  {
    path: '/packages',
    name: 'packages',
    component: Packages,
    meta: {
      title: 'Packages',
    },
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome,
    meta: {
      title: 'Welcome',
    },
  },
  {
    path: '/menus',
    name: 'menus',
    component: Menus,
    meta: {
      title: 'Menus',
    },
  },
  {
    path: '/ctas',
    name: 'ctas',
    component: CTAs,
    meta: {
      title: 'CTAs',
    },
  },
  {
    path: '/social-links',
    name: 'social-links',
    component: SocialLinks,
    meta: {
      title: 'Social Links',
    },
  },
  {
    path: '/crearte',
    name: 'crearte',
    component: Crearte,
    meta: {
      title: 'Crearte',
    },
  },
  {
    path: '/countdowns',
    name: 'countdowns',
    component: Countdowns,
    meta: {
      title: 'Countdowns',
    },
  },
  {
    path: '/builder',
    name: 'builder',
    component: BuilderDemo,
    meta: {
      title: 'Builder',
    },
  },
  {
    path: '/preview',
    name: 'preview',
    component: Preview,
    meta: {
      title: 'Preview',
    },
  },
  {
    path: '/content',
    name: 'content',
    component: Content,
    meta: {
      title: 'Content',
    },
  },
  {
    path: '/calendars',
    name: 'calendars',
    component: Calendars,
    meta: {
      title: 'Calendars',
    },
  },
  {
    path: '/maps',
    name: 'maps',
    component: Maps,
    meta: {
      title: 'Maps',
    },
  },
  {
    path: '/cards',
    name: 'cards',
    component: Cards,
    meta: {
      title: 'Cards',
    },
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: Portfolio,
    meta: {
      title: 'Portfolio',
    },
  },
  {
    path: '/videos',
    name: 'videos',
    component: Videos,
    meta: {
      title: 'Videos',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} — Vueilder`
  }
})

export default router
