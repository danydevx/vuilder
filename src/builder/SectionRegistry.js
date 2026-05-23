/**
 * ============================================
 * SectionRegistry.js
 * ============================================
 * Mapa central de todas las secciones disponibles.
 * Usado por SectionRenderer para renderizar desde JSON.
 *
 * Para agregar una sección:
 * 1. Importar el componente
 * 2. Importar el schema de ejemplo (opcional)
 * 3. Agregar entrada al objeto sections
 */

import { defineAsyncComponent } from 'vue'

export const SectionRegistry = {
  // ==========================================
  // HERO Sections
  // ==========================================
  hero: {
    component: () => defineAsyncComponent(() => import('@/sections/hero/SectionHero.vue')),
    name: 'Hero Principal',
    category: 'hero',
    defaultProps: { title: 'Título del Hero', subtitle: 'Subtítulo', scheme: 'default-light' }
  },
  hero1: {
    component: () => defineAsyncComponent(() => import('@/sections/hero/SectionHero1.vue')),
    name: 'Hero 1',
    category: 'hero',
    defaultProps: { title: 'Título', subtitle: 'Subtítulo', scheme: 'default-light' }
  },
  hero2: {
    component: () => defineAsyncComponent(() => import('@/sections/hero/SectionHero2.vue')),
    name: 'Hero 2',
    category: 'hero',
    defaultProps: { title: 'Título', subtitle: 'Subtítulo', scheme: 'default-light' }
  },
  hero3: {
    component: () => defineAsyncComponent(() => import('@/sections/hero/SectionHero3.vue')),
    name: 'Hero 3',
    category: 'hero',
    defaultProps: { title: 'Título', subtitle: 'Subtítulo', scheme: 'default-light' }
  },
  hero4: {
    component: () => defineAsyncComponent(() => import('@/sections/hero/SectionHero4.vue')),
    name: 'Hero 4',
    category: 'hero',
    defaultProps: { title: 'Título', subtitle: 'Subtítulo', scheme: 'default-light' }
  },
  hero5: {
    component: () => defineAsyncComponent(() => import('@/sections/hero/SectionHero5.vue')),
    name: 'Hero 5',
    category: 'hero',
    defaultProps: { title: 'Título', subtitle: 'Subtítulo', scheme: 'default-light' }
  },
  hero6: {
    component: () => defineAsyncComponent(() => import('@/sections/hero/SectionHero6.vue')),
    name: 'Hero 6',
    category: 'hero',
    defaultProps: { title: 'Título', subtitle: 'Subtítulo', scheme: 'default-light' }
  },
  hero7: {
    component: () => defineAsyncComponent(() => import('@/sections/hero/SectionHero7.vue')),
    name: 'Hero 7 (Video)',
    category: 'hero',
    defaultProps: { title: 'Título', subtitle: 'Subtítulo', scheme: 'default-light' }
  },
  hero8: {
    component: () => defineAsyncComponent(() => import('@/sections/hero/SectionHero8.vue')),
    name: 'Hero 8 (Galería)',
    category: 'hero',
    defaultProps: { title: 'Título', subtitle: 'Subtítulo', scheme: 'default-light' }
  },
  heroGrace: {
    component: () => defineAsyncComponent(() => import('@/sections/hero/SectionHeroWeddingGrace.vue')),
    name: 'Hero Wedding Grace',
    category: 'hero',
    defaultProps: { title: 'Título', subtitle: 'Subtítulo', scheme: 'light-purple' }
  },

  // ==========================================
  // GALLERY Sections
  // ==========================================
  gallery1: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery1.vue')),
    name: 'Gallery 1',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery2: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery2.vue')),
    name: 'Gallery 2',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery3: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery3.vue')),
    name: 'Gallery 3',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery4: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery4.vue')),
    name: 'Gallery 4',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery5: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery5.vue')),
    name: 'Gallery 5',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery6: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery6.vue')),
    name: 'Gallery 6',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery7: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery7.vue')),
    name: 'Gallery 7',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery8: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery8.vue')),
    name: 'Gallery 8',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery9: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery9.vue')),
    name: 'Gallery 9',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery10: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery10.vue')),
    name: 'Gallery 10',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery11: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery11.vue')),
    name: 'Gallery 11',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  gallery12: {
    component: () => defineAsyncComponent(() => import('@/sections/gallery/SectionGallery12.vue')),
    name: 'Gallery 12',
    category: 'gallery',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },

  // ==========================================
  // SERVICES Sections
  // ==========================================
  services: {
    component: () => defineAsyncComponent(() => import('@/sections/services/SectionServices.vue')),
    name: 'Services Principal',
    category: 'services',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  services1: {
    component: () => defineAsyncComponent(() => import('@/sections/services/SectionServices1.vue')),
    name: 'Services 1',
    category: 'services',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  services2: {
    component: () => defineAsyncComponent(() => import('@/sections/services/SectionServices2.vue')),
    name: 'Services 2',
    category: 'services',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  services3: {
    component: () => defineAsyncComponent(() => import('@/sections/services/SectionServices3.vue')),
    name: 'Services 3',
    category: 'services',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  services4: {
    component: () => defineAsyncComponent(() => import('@/sections/services/SectionServices4.vue')),
    name: 'Services 4',
    category: 'services',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  services5: {
    component: () => defineAsyncComponent(() => import('@/sections/services/SectionServices5.vue')),
    name: 'Services 5',
    category: 'services',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  services6: {
    component: () => defineAsyncComponent(() => import('@/sections/services/SectionServices6.vue')),
    name: 'Services 6',
    category: 'services',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  services7: {
    component: () => defineAsyncComponent(() => import('@/sections/services/SectionServices7.vue')),
    name: 'Services 7',
    category: 'services',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  services8: {
    component: () => defineAsyncComponent(() => import('@/sections/services/SectionServices8.vue')),
    name: 'Services 8',
    category: 'services',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  services9: {
    component: () => defineAsyncComponent(() => import('@/sections/services/SectionServices9.vue')),
    name: 'Services 9',
    category: 'services',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },

  // ==========================================
  // FAQS Sections
  // ==========================================
  faqs: {
    component: () => defineAsyncComponent(() => import('@/sections/faqs/SectionFaqs.vue')),
    name: 'Faqs Principal',
    category: 'faqs',
    defaultProps: { title: 'Preguntas Frecuentes', scheme: 'default-light' }
  },
  faqs1: {
    component: () => defineAsyncComponent(() => import('@/sections/faqs/SectionFaqs1.vue')),
    name: 'Faqs 1',
    category: 'faqs',
    defaultProps: { title: 'Preguntas Frecuentes', scheme: 'default-light' }
  },
  faqs2: {
    component: () => defineAsyncComponent(() => import('@/sections/faqs/SectionFaqs2.vue')),
    name: 'Faqs 2',
    category: 'faqs',
    defaultProps: { title: 'Preguntas Frecuentes', scheme: 'default-light' }
  },
  faqs3: {
    component: () => defineAsyncComponent(() => import('@/sections/faqs/SectionFaqs3.vue')),
    name: 'Faqs 3',
    category: 'faqs',
    defaultProps: { title: 'Preguntas Frecuentes', scheme: 'default-light' }
  },
  faqs4: {
    component: () => defineAsyncComponent(() => import('@/sections/faqs/SectionFaqs4.vue')),
    name: 'Faqs 4',
    category: 'faqs',
    defaultProps: { title: 'Preguntas Frecuentes', scheme: 'default-light' }
  },
  faqs5: {
    component: () => defineAsyncComponent(() => import('@/sections/faqs/SectionFaqs5.vue')),
    name: 'Faqs 5',
    category: 'faqs',
    defaultProps: { title: 'Preguntas Frecuentes', scheme: 'default-light' }
  },

  // ==========================================
  // PACKAGES Sections
  // ==========================================
  packages: {
    component: () => defineAsyncComponent(() => import('@/sections/packages/SectionPackages.vue')),
    name: 'Packages Principal',
    category: 'packages',
    defaultProps: { title: 'Paquetes', scheme: 'default-light' }
  },
  packages2: {
    component: () => defineAsyncComponent(() => import('@/sections/packages/SectionPackages2.vue')),
    name: 'Packages 2',
    category: 'packages',
    defaultProps: { title: 'Paquetes', scheme: 'default-light' }
  },
  packages3: {
    component: () => defineAsyncComponent(() => import('@/sections/packages/SectionPackages3.vue')),
    name: 'Packages 3',
    category: 'packages',
    defaultProps: { title: 'Paquetes', scheme: 'default-light' }
  },
  packages4: {
    component: () => defineAsyncComponent(() => import('@/sections/packages/SectionPackages4.vue')),
    name: 'Packages 4',
    category: 'packages',
    defaultProps: { title: 'Paquetes', scheme: 'default-light' }
  },
  packages5: {
    component: () => defineAsyncComponent(() => import('@/sections/packages/SectionPackages5.vue')),
    name: 'Packages 5',
    category: 'packages',
    defaultProps: { title: 'Paquetes', scheme: 'default-light' }
  },
  packages6: {
    component: () => defineAsyncComponent(() => import('@/sections/packages/SectionPackages6.vue')),
    name: 'Packages 6',
    category: 'packages',
    defaultProps: { title: 'Paquetes', scheme: 'default-light' }
  },
  packages7: {
    component: () => defineAsyncComponent(() => import('@/sections/packages/SectionPackages7.vue')),
    name: 'Packages 7',
    category: 'packages',
    defaultProps: { title: 'Paquetes', scheme: 'default-light' }
  },

  // ==========================================
  // MENUS Sections
  // ==========================================
  menu1: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu1.vue')),
    name: 'Menu 1',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu2: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu2.vue')),
    name: 'Menu 2',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu3: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu3.vue')),
    name: 'Menu 3',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu4: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu4.vue')),
    name: 'Menu 4',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu5: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu5.vue')),
    name: 'Menu 5',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu6: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu6.vue')),
    name: 'Menu 6',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu7: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu7.vue')),
    name: 'Menu 7',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu8: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu8.vue')),
    name: 'Menu 8',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu9: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu9.vue')),
    name: 'Menu 9',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu10: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu10.vue')),
    name: 'Menu 10',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu11: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu11.vue')),
    name: 'Menu 11',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },
  menu12: {
    component: () => defineAsyncComponent(() => import('@/sections/menus/SectionMenu12.vue')),
    name: 'Menu 12',
    category: 'menus',
    defaultProps: { title: 'Menú', scheme: 'default-light' }
  },

  // ==========================================
  // TIMELINES Sections
  // ==========================================
  timeline: {
    component: () => defineAsyncComponent(() => import('@/sections/timelines/SectionTimeline.vue')),
    name: 'Timeline Principal',
    category: 'timelines',
    defaultProps: { title: 'Cronograma', scheme: 'default-light' }
  },
  timeline1: {
    component: () => defineAsyncComponent(() => import('@/sections/timelines/SectionTimeline1.vue')),
    name: 'Timeline 1',
    category: 'timelines',
    defaultProps: { title: 'Cronograma', scheme: 'default-light' }
  },
  timeline2: {
    component: () => defineAsyncComponent(() => import('@/sections/timelines/SectionTimeline2.vue')),
    name: 'Timeline 2',
    category: 'timelines',
    defaultProps: { title: 'Cronograma', scheme: 'default-light' }
  },
  timeline3: {
    component: () => defineAsyncComponent(() => import('@/sections/timelines/SectionTimeline3.vue')),
    name: 'Timeline 3',
    category: 'timelines',
    defaultProps: { title: 'Cronograma', scheme: 'default-light' }
  },
  timeline4: {
    component: () => defineAsyncComponent(() => import('@/sections/timelines/SectionTimeline4.vue')),
    name: 'Timeline 4',
    category: 'timelines',
    defaultProps: { title: 'Cronograma', scheme: 'default-light' }
  },
  timeline5: {
    component: () => defineAsyncComponent(() => import('@/sections/timelines/SectionTimeline5.vue')),
    name: 'Timeline 5',
    category: 'timelines',
    defaultProps: { title: 'Cronograma', scheme: 'default-light' }
  },
  timeline6: {
    component: () => defineAsyncComponent(() => import('@/sections/timelines/SectionTimeline6.vue')),
    name: 'Timeline 6',
    category: 'timelines',
    defaultProps: { title: 'Cronograma', scheme: 'default-light' }
  },

  // ==========================================
  // CTA Sections
  // ==========================================
  cta1: {
    component: () => defineAsyncComponent(() => import('@/sections/cta/SectionCta1.vue')),
    name: 'CTA 1',
    category: 'cta',
    defaultProps: { title: 'Call to Action', scheme: 'default-light' }
  },
  cta2: {
    component: () => defineAsyncComponent(() => import('@/sections/cta/SectionCta2.vue')),
    name: 'CTA 2',
    category: 'cta',
    defaultProps: { title: 'Call to Action', scheme: 'default-dark' }
  },
  cta3: {
    component: () => defineAsyncComponent(() => import('@/sections/cta/SectionCta3.vue')),
    name: 'CTA 3',
    category: 'cta',
    defaultProps: { title: 'Call to Action', scheme: 'default-light' }
  },
  cta4: {
    component: () => defineAsyncComponent(() => import('@/sections/cta/SectionCta4.vue')),
    name: 'CTA 4',
    category: 'cta',
    defaultProps: { title: 'Call to Action', scheme: 'default-light' }
  },
  cta5: {
    component: () => defineAsyncComponent(() => import('@/sections/cta/SectionCta5.vue')),
    name: 'CTA 5 (Centrado)',
    category: 'cta',
    defaultProps: { title: '¿Listo para empezar?', subtitle: 'Únete a miles de personas', scheme: 'default-light' }
  },
  cta6: {
    component: () => defineAsyncComponent(() => import('@/sections/cta/SectionCta6.vue')),
    name: 'CTA 6 (Split)',
    category: 'cta',
    defaultProps: { title: 'Transforma tu negocio hoy', subtitle: 'Comienza en minutos', scheme: 'default-light' }
  },

  // ==========================================
  // CONTENT Sections
  // ==========================================
  content1: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent1.vue')),
    name: 'Content 1',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content2: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent2.vue')),
    name: 'Content 2',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content3: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent3.vue')),
    name: 'Content 3',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content4: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent4.vue')),
    name: 'Content 4',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content5: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent5.vue')),
    name: 'Content 5',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content5b: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent5b.vue')),
    name: 'Content 5b',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content6: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent6.vue')),
    name: 'Content 6',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content7: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent7.vue')),
    name: 'Content 7',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content8: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent8.vue')),
    name: 'Content 8',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content9: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent9.vue')),
    name: 'Content 9',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content10: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent10.vue')),
    name: 'Content 10',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-dark' }
  },
  content11: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent11.vue')),
    name: 'Content 11',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content12: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent12.vue')),
    name: 'Content 12',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content13: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent13.vue')),
    name: 'Content 13',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content14: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent14.vue')),
    name: 'Content 14',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content15: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent15.vue')),
    name: 'Content 15',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content16: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent16.vue')),
    name: 'Content 16',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content17: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent17.vue')),
    name: 'Content 17',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content18: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent18.vue')),
    name: 'Content 18',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content19: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent19.vue')),
    name: 'Content 19',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content20: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent20.vue')),
    name: 'Content 20',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content21: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent21.vue')),
    name: 'Content 21',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content22: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent22.vue')),
    name: 'Content 22',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content23: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent23.vue')),
    name: 'Content 23',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },
  content24: {
    component: () => defineAsyncComponent(() => import('@/sections/content/SectionContent24.vue')),
    name: 'Content 24',
    category: 'content',
    defaultProps: { title: 'Contenido', scheme: 'default-light' }
  },

  // ==========================================
  // COUNTDOWN Sections
  // ==========================================
  countdown: {
    component: () => defineAsyncComponent(() => import('@/sections/countdown/SectionCountdown.vue')),
    name: 'Countdown Principal',
    category: 'countdown',
    defaultProps: { title: 'Cuenta Regresiva', scheme: 'light-purple', eventDate: '2026-12-31T00:00:00' }
  },
  countdown1: {
    component: () => defineAsyncComponent(() => import('@/sections/countdown/SectionCountdown1.vue')),
    name: 'Countdown 1 (Detallado)',
    category: 'countdown',
    defaultProps: { title: 'Cuenta Regresiva Detallada', scheme: 'light-purple', eventDate: '2026-12-31T00:00:00' }
  },
  countdown2: {
    component: () => defineAsyncComponent(() => import('@/sections/countdown/SectionCountdown2.vue')),
    name: 'Countdown 2 (Circular)',
    category: 'countdown',
    defaultProps: { title: 'Tiempo Remaining', scheme: 'default-light', eventDate: '2026-12-31T00:00:00' }
  },
  countdown3: {
    component: () => defineAsyncComponent(() => import('@/sections/countdown/SectionCountdown3.vue')),
    name: 'Countdown 3 (Flip Clock)',
    category: 'countdown',
    defaultProps: { title: 'Flip Clock Countdown', scheme: 'default-light', eventDate: '2026-12-31T00:00:00' }
  },
  countdown4: {
    component: () => defineAsyncComponent(() => import('@/sections/countdown/SectionCountdown4.vue')),
    name: 'Countdown 4 (Split)',
    category: 'countdown',
    defaultProps: { title: 'Our Event Starts In', scheme: 'default-light', eventDate: '2026-12-31T00:00:00' }
  },
  countdown5: {
    component: () => defineAsyncComponent(() => import('@/sections/countdown/SectionCountdown5.vue')),
    name: 'Countdown 5 (Minimal)',
    category: 'countdown',
    defaultProps: { title: '', eventDate: '2026-12-31T00:00:00' }
  },
  countdown6: {
    component: () => defineAsyncComponent(() => import('@/sections/countdown/SectionCountdown6.vue')),
    name: 'Countdown 6 (Cajas)',
    category: 'countdown',
    defaultProps: { title: 'Cuenta Regresiva', eyebrow: 'Evento próximo', eventDate: '2026-12-31T00:00:00' }
  },
  countdown7: {
    component: () => defineAsyncComponent(() => import('@/sections/countdown/SectionCountdown7.vue')),
    name: 'Countdown 7 (Split)',
    category: 'countdown',
    defaultProps: { title: 'El evento comienza en', eventDate: '2026-12-31T00:00:00' }
  },
  countdown8: {
    component: () => defineAsyncComponent(() => import('@/sections/countdown/SectionCountdown8.vue')),
    name: 'Countdown 8 (Anillos)',
    category: 'countdown',
    defaultProps: { title: 'Tiempo Remaining', eventDate: '2026-12-31T00:00:00' }
  },

  // ==========================================
  // CALENDARS Sections
  // ==========================================
  calendar: {
    component: () => defineAsyncComponent(() => import('@/sections/calendars/SectionCalendar.vue')),
    name: 'Calendar Principal',
    category: 'calendars',
    defaultProps: { title: 'Agenda tu Cita', scheme: 'default-light' }
  },
  calendar1: {
    component: () => defineAsyncComponent(() => import('@/sections/calendars/SectionCalendar1.vue')),
    name: 'Calendar 1',
    category: 'calendars',
    defaultProps: { title: 'Agenda tu Cita', scheme: 'default-light' }
  },
  calendar2: {
    component: () => defineAsyncComponent(() => import('@/sections/calendars/SectionCalendar2.vue')),
    name: 'Calendar 2',
    category: 'calendars',
    defaultProps: { title: 'Agenda tu Cita', scheme: 'default-light' }
  },

  // ==========================================
  // MAPS Sections
  // ==========================================
  map: {
    component: () => defineAsyncComponent(() => import('@/sections/maps/SectionMap.vue')),
    name: 'Map Principal',
    category: 'maps',
    defaultProps: { title: 'Ubicación', scheme: 'default-light' }
  },
  mapLeaflet: {
    component: () => defineAsyncComponent(() => import('@/sections/maps/SectionMapLeaflet.vue')),
    name: 'Map Leaflet',
    category: 'maps',
    defaultProps: { title: 'Ubicación', scheme: 'default-light' }
  },
  mapLeaflet1: {
    component: () => defineAsyncComponent(() => import('@/sections/maps/SectionMapLeaflet1.vue')),
    name: 'Map Leaflet 1',
    category: 'maps',
    defaultProps: { title: 'Ubicación', scheme: 'default-light' }
  },
  mapLeaflet2: {
    component: () => defineAsyncComponent(() => import('@/sections/maps/SectionMapLeaflet2.vue')),
    name: 'Map Leaflet 2',
    category: 'maps',
    defaultProps: { title: 'Ubicación', scheme: 'default-light' }
  },
  mapLeaflet3: {
    component: () => defineAsyncComponent(() => import('@/sections/maps/SectionMapLeaflet3.vue')),
    name: 'Map Leaflet 3',
    category: 'maps',
    defaultProps: { title: 'Ubicación', scheme: 'default-light' }
  },

  // ==========================================
  // SOCIAL Sections
  // ==========================================
  social1: {
    component: () => defineAsyncComponent(() => import('@/sections/social/SectionSocial1.vue')),
    name: 'Social 1',
    category: 'social',
    defaultProps: { title: 'Síguenos', scheme: 'default-light' }
  },
  social2: {
    component: () => defineAsyncComponent(() => import('@/sections/social/SectionSocial2.vue')),
    name: 'Social 2',
    category: 'social',
    defaultProps: { title: 'Síguenos', scheme: 'default-light' }
  },
  social3: {
    component: () => defineAsyncComponent(() => import('@/sections/social/SectionSocial3.vue')),
    name: 'Social 3',
    category: 'social',
    defaultProps: { title: 'Síguenos', scheme: 'default-light' }
  },
  social4: {
    component: () => defineAsyncComponent(() => import('@/sections/social/SectionSocial4.vue')),
    name: 'Social 4',
    category: 'social',
    defaultProps: { title: 'Síguenos', scheme: 'default-light' }
  },
  social5: {
    component: () => defineAsyncComponent(() => import('@/sections/social/SectionSocial5.vue')),
    name: 'Social 5',
    category: 'social',
    defaultProps: { title: 'Síguenos', scheme: 'default-light' }
  },
  social6: {
    component: () => defineAsyncComponent(() => import('@/sections/social/SectionSocial6.vue')),
    name: 'Social 6',
    category: 'social',
    defaultProps: { title: 'Síguenos', scheme: 'default-light' }
  },
  social7: {
    component: () => defineAsyncComponent(() => import('@/sections/social/SectionSocial7.vue')),
    name: 'Social 7',
    category: 'social',
    defaultProps: { title: 'Síguenos', scheme: 'default-light' }
  },

  // ==========================================
  // CARDS Sections
  // ==========================================
  cards1: {
    component: () => defineAsyncComponent(() => import('@/sections/cards/SectionCards1.vue')),
    name: 'Cards 1 (Grid)',
    category: 'cards',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  cards2: {
    component: () => defineAsyncComponent(() => import('@/sections/cards/SectionCards2.vue')),
    name: 'Cards 2 (Horizontal)',
    category: 'cards',
    defaultProps: { title: 'Características', scheme: 'default-light' }
  },
  cards3: {
    component: () => defineAsyncComponent(() => import('@/sections/cards/SectionCards3.vue')),
    name: 'Cards 3 (Iconos)',
    category: 'cards',
    defaultProps: { title: 'Amenidades', scheme: 'default-light' }
  },
  cards4: {
    component: () => defineAsyncComponent(() => import('@/sections/cards/SectionCards4.vue')),
    name: 'Cards 4 (Overlay)',
    category: 'cards',
    defaultProps: { title: 'Espacios', scheme: 'default-light' }
  },
  cards5: {
    component: () => defineAsyncComponent(() => import('@/sections/cards/SectionCards5.vue')),
    name: 'Cards 5 (Compact)',
    category: 'cards',
    defaultProps: { title: 'Categorías', scheme: 'default-light' }
  },
  cards6: {
    component: () => defineAsyncComponent(() => import('@/sections/cards/SectionCards6.vue')),
    name: 'Cards 6 (Ribbon)',
    category: 'cards',
    defaultProps: { title: 'Servicios', scheme: 'default-light' }
  },
  cards7: {
    component: () => defineAsyncComponent(() => import('@/sections/cards/SectionCards7.vue')),
    name: 'Cards 7 (Pricing)',
    category: 'cards',
    defaultProps: { title: 'Planes', scheme: 'default-light' }
  },
  cards8: {
    component: () => defineAsyncComponent(() => import('@/sections/cards/SectionCards8.vue')),
    name: 'Cards 8 (Steps)',
    category: 'cards',
    defaultProps: { title: 'Proceso', scheme: 'default-light' }
  },
  cards9: {
    component: () => defineAsyncComponent(() => import('@/sections/cards/SectionCards9.vue')),
    name: 'Cards 9 (Quotes)',
    category: 'cards',
    defaultProps: { title: 'Testimonios', scheme: 'default-light' }
  },
  cards10: {
    component: () => defineAsyncComponent(() => import('@/sections/cards/SectionCards10.vue')),
    name: 'Cards 10 (Float)',
    category: 'cards',
    defaultProps: { title: 'Características', scheme: 'default-light' }
  },

  // ==========================================
  // PORTFOLIO Sections
  // ==========================================
  portfolio1: {
    component: () => defineAsyncComponent(() => import('@/sections/portfolio/SectionPortfolio1.vue')),
    name: 'Portfolio 1 (Grid)',
    category: 'portfolio',
    defaultProps: { title: 'Proyectos', scheme: 'default-light' }
  },
  portfolio2: {
    component: () => defineAsyncComponent(() => import('@/sections/portfolio/SectionPortfolio2.vue')),
    name: 'Portfolio 2 (List)',
    category: 'portfolio',
    defaultProps: { title: 'Casos de éxito', scheme: 'default-light' }
  },
  portfolio3: {
    component: () => defineAsyncComponent(() => import('@/sections/portfolio/SectionPortfolio3.vue')),
    name: 'Portfolio 3 (Carousel)',
    category: 'portfolio',
    defaultProps: { title: 'Proyectos', scheme: 'default-light' }
  },
  portfolio4: {
    component: () => defineAsyncComponent(() => import('@/sections/portfolio/SectionPortfolio4.vue')),
    name: 'Portfolio 4 (Mosaic)',
    category: 'portfolio',
    defaultProps: { title: 'Galería', scheme: 'default-light' }
  },
  portfolio5: {
    component: () => defineAsyncComponent(() => import('@/sections/portfolio/SectionPortfolio5.vue')),
    name: 'Portfolio 5 (Alternate)',
    category: 'portfolio',
    defaultProps: { title: 'Trayectoria', scheme: 'default-light' }
  },
  portfolio6: {
    component: () => defineAsyncComponent(() => import('@/sections/portfolio/SectionPortfolio6.vue')),
    name: 'Portfolio 6 (Stack)',
    category: 'portfolio',
    defaultProps: { title: 'Proyectos', scheme: 'default-light' }
  },
  portfolio7: {
    component: () => defineAsyncComponent(() => import('@/sections/portfolio/SectionPortfolio7.vue')),
    name: 'Portfolio 7 (Minimal)',
    category: 'portfolio',
    defaultProps: { title: 'Portfolio', scheme: 'default-light' }
  },
  portfolio8: {
    component: () => defineAsyncComponent(() => import('@/sections/portfolio/SectionPortfolio8.vue')),
    name: 'Portfolio 8 (Split)',
    category: 'portfolio',
    defaultProps: { title: 'Proyectos', scheme: 'default-light' }
  },
  portfolio9: {
    component: () => defineAsyncComponent(() => import('@/sections/portfolio/SectionPortfolio9.vue')),
    name: 'Portfolio 9 (Hero)',
    category: 'portfolio',
    defaultProps: { title: 'Proyecto destacado', scheme: 'default-light' }
  },
  portfolio10: {
    component: () => defineAsyncComponent(() => import('@/sections/portfolio/SectionPortfolio10.vue')),
    name: 'Portfolio 10 (Expand)',
    category: 'portfolio',
    defaultProps: { title: 'Explorar proyectos', scheme: 'default-light' }
  },

  // ==========================================
  // VIDEOS Sections
  // ==========================================
  videos1: {
    component: () => defineAsyncComponent(() => import('@/sections/videos/SectionVideos1.vue')),
    name: 'Videos 1 (Hero)',
    category: 'videos',
    defaultProps: { title: 'Nuestros Trabajos', scheme: 'default-light' }
  },
  videos2: {
    component: () => defineAsyncComponent(() => import('@/sections/videos/SectionVideos2.vue')),
    name: 'Videos 2 (Grid)',
    category: 'videos',
    defaultProps: { title: 'Galería de Videos', scheme: 'default-light' }
  },
  videos3: {
    component: () => defineAsyncComponent(() => import('@/sections/videos/SectionVideos3.vue')),
    name: 'Videos 3 (Carousel)',
    category: 'videos',
    defaultProps: { title: 'Playlist Destacada', scheme: 'default-light' }
  },
  videos4: {
    component: () => defineAsyncComponent(() => import('@/sections/videos/SectionVideos4.vue')),
    name: 'Videos 4 (Compact)',
    category: 'videos',
    defaultProps: { title: 'Novedades Recientes', scheme: 'default-light' }
  },
  videos5: {
    component: () => defineAsyncComponent(() => import('@/sections/videos/SectionVideos5.vue')),
    name: 'Videos 5 (Minimal)',
    category: 'videos',
    defaultProps: { title: 'Colección Visual', scheme: 'default-light' }
  },
  videos6: {
    component: () => defineAsyncComponent(() => import('@/sections/videos/SectionVideos6.vue')),
    name: 'Videos 6 (Split)',
    category: 'videos',
    defaultProps: { title: 'Historia del Proyecto', scheme: 'default-light' }
  },
  videos7: {
    component: () => defineAsyncComponent(() => import('@/sections/videos/SectionVideos7.vue')),
    name: 'Videos 7 (Before/After)',
    category: 'videos',
    defaultProps: { title: 'Proceso Creativo', scheme: 'default-light' }
  },
  videos8: {
    component: () => defineAsyncComponent(() => import('@/sections/videos/SectionVideos8.vue')),
    name: 'Videos 8 (Parallax)',
    category: 'videos',
    defaultProps: { title: 'Momentos Destacados', scheme: 'default-light' }
  },
  videos9: {
    component: () => defineAsyncComponent(() => import('@/sections/videos/SectionVideos9.vue')),
    name: 'Videos 9 (Stack)',
    category: 'videos',
    defaultProps: { title: 'Serie: Herramientas Creativas', scheme: 'default-light' }
  },
  videos10: {
    component: () => defineAsyncComponent(() => import('@/sections/videos/SectionVideos10.vue')),
    name: 'Videos 10 (Float)',
    category: 'videos',
    defaultProps: { title: 'Testimonios en Video', scheme: 'default-light' }
  },

  // ==========================================
  // WELCOME Section
  // ==========================================
  welcome: {
    component: () => defineAsyncComponent(() => import('@/sections/welcome/SectionWelcome.vue')),
    name: 'Welcome 1 (Hero)',
    category: 'welcome',
    defaultProps: { title: 'Bienvenido', subtitle: 'Gracias por visitarnos', scheme: 'light-purple' }
  },
  welcome2: {
    component: () => defineAsyncComponent(() => import('@/sections/welcome/SectionWelcome2.vue')),
    name: 'Welcome 2 (Centrado)',
    category: 'welcome',
    defaultProps: { title: 'Bienvenido', eyebrow: 'Bienvenidos', scheme: 'default-light' }
  },
  welcome3: {
    component: () => defineAsyncComponent(() => import('@/sections/welcome/SectionWelcome3.vue')),
    name: 'Welcome 3 (Split)',
    category: 'welcome',
    defaultProps: { title: 'Sobre Nosotros', subtitle: 'Conoce nuestra historia', scheme: 'default-light' }
  },
  welcome4: {
    component: () => defineAsyncComponent(() => import('@/sections/welcome/SectionWelcome4.vue')),
    name: 'Welcome 4 (Card)',
    category: 'welcome',
    defaultProps: { title: 'Bienvenido a Nuestro Sitio', badge: 'Nuevo', scheme: 'default-light' }
  },
  welcome5: {
    component: () => defineAsyncComponent(() => import('@/sections/welcome/SectionWelcome5.vue')),
    name: 'Welcome 5 (Background)',
    category: 'welcome',
    defaultProps: { title: 'Empezando', eyebrow: 'NUEVO', scheme: 'dark-purple' }
  }
}

export const CategoryNames = {
  hero: 'Hero',
  gallery: 'Galería',
  services: 'Servicios',
  faqs: 'FAQs',
  packages: 'Paquetes',
  menus: 'Menús',
  timelines: 'Cronogramas',
  cta: 'CTAs',
  content: 'Contenido',
  countdown: 'Countdown',
  calendars: 'Calendarios',
  maps: 'Mapas',
  social: 'Social',
  welcome: 'Welcome',
  cards: 'Cards',
  portfolio: 'Portfolio',
  videos: 'Videos'
}

export function getSectionsByCategory(category) {
  return Object.entries(SectionRegistry)
    .filter(([_, data]) => data.category === category)
    .map(([key, data]) => ({ key, ...data }))
}

export function getAllCategories() {
  const routeMap = {
    hero: 'heros',
    gallery: 'galleries',
    services: 'services',
    faqs: 'faqs',
    packages: 'packages',
    menus: 'menus',
    timelines: 'timelines',
    cta: 'ctas',
    content: 'content',
    countdown: 'countdowns',
    calendars: 'calendars',
    maps: 'maps',
    social: 'social-links',
    welcome: 'welcome',
    cards: 'cards',
    portfolio: 'portfolio',
    videos: 'videos'
  }
  
  const categories = new Set()
  Object.values(SectionRegistry).forEach(section => {
    categories.add(section.category)
  })
  
  return Array.from(categories).map(cat => ({
    key: cat,
    name: CategoryNames[cat] || cat,
    count: Object.values(SectionRegistry).filter(s => s.category === cat).length,
    route: routeMap[cat] || cat
  }))
}

export function getSectionInfo(type) {
  return SectionRegistry[type] || null
}

export function getDefaultProps(type) {
  const section = SectionRegistry[type]
  return section ? { ...section.defaultProps } : {}
}