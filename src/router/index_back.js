// =============================
// src/router/index.js
// =============================
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import Index_eventos from '@/pages/Index_eventos.vue'
import Heros from '@/pages/Heros.vue'
import Packages from '@/pages/Packages.vue'
import SocialLinks from '@/pages/SocialLinks.vue'
import Gallery from '@/pages/Gallerys.vue'
import Services from '@/pages/Services.vue'
import Timelines from '@/pages/Timelines.vue'
import Faqs from '@/pages/Faqs.vue'
import Menus from '@/pages/Menus.vue'
import Maps from '@/pages/Maps.vue'
import Calendars from '@/pages/Calendars.vue'
import Content from '@/pages/Content.vue'
import Crearte from '@/pages/Crearte.vue'
import CTAs from '@/pages/CTAs.vue'
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
    path: '/content',
    name: 'content',
    component: Content,
    meta: {
      title: 'content',
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
    path: '/social',
    name: 'social',
    component: SocialLinks,
    meta: {
      title: 'SocialLinks',
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
    path: '/galleries',
    name: 'galleries',
    component: Gallery,
    meta: { title: 'Galleries' },
  },
   {
    path: '/timelines',
    name: 'timelines',
    component: Timelines,
    meta: { title: 'Timelines' },
  },
   {
    path: '/faqs',
    name: 'faqs',
    component: Faqs,
    meta: { title: 'faqs' },
  },
   {
    path: '/menus',
    name: 'menus',
    component: Menus,
    meta: { title: 'menus' },
  },
   {
    path: '/maps',
    name: 'maps',
    component: Maps,
    meta: { title: 'maps' },
  },
   {
    path: '/calendars',
    name: 'calendars',
    component: Calendars,
    meta: { title: 'calendars' },
  },
   {
    path: '/crearte',
    name: 'crearte',
    component: Crearte,
    meta: { title: 'crearte' },
  },
  {
    path: '/ctas',
    name: 'ctas',
    component: CTAs,
    meta: { title: 'CTAs' },
  }
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
