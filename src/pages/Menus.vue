<template>
  <div>
    <PageNav sticky />

  <SectionMenu1
    id="section-menu"
    scheme="dark-blue"
    title="Planes de hosting"
    subtitle="Todos incluyen SSL, dominio y soporte técnico"
    backgroundImg="https://placehold.co/1600x900/jpg?text=Menu+Fondo"
    :enableOverlay="true"
    :menus="menus"
    :cols="3"
    :fluid="true"
    :ctas="[
      { label: 'Solicitar Cotización', href: '#contacto', variant: 'solid', icon: 'bi bi-envelope' }
    ]"
  />

 <SectionMenu2
    id="section-menu-vertical"
       scheme="dark-pink"
    title="Planes de hosting"
    subtitle="Infraestructura SSD de alta velocidad"
    backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Menus"
    :enableOverlay="true"
    :menus="menus"
    :cols="4"
    :fluid="true"
    :ctas="[
      { label: 'Cotizar', href: '#contacto', variant: 'solid', icon: 'bi bi-envelope' }
    ]"
  />
 
 <SectionMenu3
    id="section-menu-vertical"
    scheme="default-neutral"
    title="Planes de hosting"
    subtitle="Todos incluyen certificado SSL y soporte técnico"
    backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Menus"
    :enableOverlay="true"
    :menus="menus"
    :cols="2"
    :fluid="true"
    :ctas="[
      { label: 'Solicitar Cotización', href: '#contacto', variant: 'solid', icon: 'bi bi-envelope' }
    ]"
  />

 <SectionMenu4
    id="section-menu-4"
    scheme="default-neutral"
    title="Planes de hosting"
    subtitle="Infraestructura optimizada para proyectos web"
    backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Menus"
    :enableOverlay="true"
    :menus="menus"
    :cols="3"
    :fluid="true"
    :ctas="[
      { label: 'Cotizar', href: '#contacto', variant: 'solid', icon: 'bi bi-envelope' },
      { label: 'Ver galería', href: '#galeria', variant: 'outline', icon: 'bi bi-images' }
    ]"
  />

 <SectionMenu5
    id="section-menu-5"
    scheme="default-neutral"
    title="Planes de hosting"
    subtitle="Conoce todas nuestras opciones de infraestructura"
    backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Menus"
    :enableOverlay="true"
    :fluid="true"
    :menus="menus"
    :ctas="[
      { label: 'Solicitar Cotización', href: '#contacto', variant: 'solid', icon: 'bi bi-envelope' }
    ]"
  />

   <SectionMenu6
    scheme="default-neutral"
    title="Planes de hosting"
    subtitle="Infraestructura SSD, SSL y soporte incluido"
    :menus="menus"
    :fluid="true"
    backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Menus"
    :enableOverlay="true"
  />

      <SectionMenu7
    scheme="default-light"
    title="Planes de hosting"
    subtitle="Todas las opciones con soporte técnico incluido"
    :menus="menus"
     :cols="6"
    :fluid="true"
 
    backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Menus"
    :enableOverlay="true"
  />

       <SectionMenu8
    scheme="default-light"
    title="Planes de hosting"
    subtitle="Infraestructura de alta velocidad para tu proyecto"
    :menus="menus"
     :cols="2"
    :fluid="true"
 
    backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Menus"
    :enableOverlay="true"
  />

          <SectionMenu9
    scheme="default-light"
    title="Planes de hosting"
    subtitle="Todas incluyen SSL y dominio el primer año"
    :menus="menus"
     :cols="2"
    :fluid="true"
 
    backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Menus"
    :enableOverlay="true"
  />


<SectionMenu10
  :menus="menus"
  title="Planes de hosting"
  subtitle="Elige el plan que mejor se adapte a tu proyecto"
  scheme="rose-light"
  :fluid="true"
  :swiper-options-mobile="{
    slidesPerView: 'auto',
    spaceBetween: 16,
    freeMode: true,
    centeredSlides: false,
    pagination: false
  }"
/>

<SectionMenu11
  :menus="menus"
  title="Planes de hosting"
  subtitle="Todos incluyen SSL, dominio y soporte técnico"
  scheme="rose-light"
  :fluid="false"
  :swiper-options="{
    slidesPerView: 'auto',
    spaceBetween: 20,
    freeMode: true,
    grabCursor: true,
    pagination: false
  }"
/>

<SectionMenu12
  :menus="menus"
  title="Planes de hosting"
  subtitle="Infraestructura optimizada para proyectos web"
  scheme="rose-light"
  :fluid="true"
  :cols="3"
  :swiper-options="{
    centeredSlides: true,
    slidesPerView: 1.1,
    spaceBetween: 16,
    loop: true,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 3,
      stretch: 0,
      depth: 120,
      modifier: 1,
      slideShadows: false
    },
    breakpoints: {
      576: { slidesPerView: 1.3 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 }
    }
  }"
/>

<SectionMenuMosaic
   :menus="menus"
  title="Planes de hosting"
  subtitle="Cada plan se adapta a diferentes tipos de proyecto"
  scheme="rose-light"
  :fluid="true"
  :cols="3"
/>

</div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionMenu1 from '@/sections/menus/SectionMenu1.vue'
import SectionMenu2 from '@/sections/menus/SectionMenu2.vue'
import SectionMenu3 from '@/sections/menus/SectionMenu3.vue'
import SectionMenu4 from '@/sections/menus/SectionMenu4.vue'
import SectionMenu5 from '@/sections/menus/SectionMenu5.vue'
import SectionMenu6 from '@/sections/menus/SectionMenu6.vue'
import SectionMenu7 from '@/sections/menus/SectionMenu7.vue'
import SectionMenu8 from '@/sections/menus/SectionMenu8.vue'
import SectionMenu9 from '@/sections/menus/SectionMenu9.vue'
import SectionMenu10 from '@/sections/menus/SectionMenu10.vue'
import SectionMenu11 from '@/sections/menus/SectionMenu11.vue'
import SectionMenu12 from '@/sections/menus/SectionMenu12.vue'
import SectionMenuMosaic from '@/sections/menus/SectionMenuMosaic.vue'
const menus = [
  {
    id: 'basico',
    title: 'Hosting Básico',
    subtitle: 'Ideal para landing pages y sitios pequeños.',
    image: 'https://placehold.co/800x600/jpg?text=Hosting+Basico',
    price: '$199/mes',
    items: [
      'Hosting SSD 5 GB',
      'Dominio .com gratis (1er año)',
      'Certificado SSL',
      'Correos corporativos (3)',
      'CPanel'
    ],
    includes: [
      'Soporte por email',
      'Respaldos semanales',
      'SSL incluido'
    ],
    extras: ['CPanel adicional $50', 'Email extra $20/cuenta'],
    conditions: 'Renovación anual. No incluye dominio.',
  },
  {
    id: 'profesional',
    title: 'Hosting Profesional',
    subtitle: 'Para sitios corporativos y tiendas pequeñas.',
    image: 'https://placehold.co/800x600/jpg?text=Hosting+Profesional',
    price: '$399/mes',
    items: [
      'Hosting SSD 20 GB',
      'Dominio .com gratis',
      'Certificado SSL',
      'Correos corporativos (10)',
      'LiteSpeed',
      'CPanel'
    ],
    includes: [
      'Soporte prioritario',
      'Respaldos diarios',
      'SSL y CDN básico'
    ],
    extras: ['Staging incluido', 'Email extra $15/cuenta'],
    conditions: 'Renovación anual. Dominio incluido.',
  },
  {
    id: 'avanzado',
    title: 'Hosting Avanzado',
    subtitle: 'Alto rendimiento para ecommerce y aplicaciones.',
    image: 'https://placehold.co/800x600/jpg?text=Hosting+Avanzado',
    price: '$699/mes',
    items: [
      'Hosting SSD 50 GB',
      'Dominio .com gratis',
      'Certificado SSL premium',
      'Correos corporativos (50)',
      'LiteSpeed',
      'CPanel',
      'Staging'
    ],
    includes: [
      'Soporte 24/7',
      'Respaldos diarios',
      'SSL, CDN yoptimización'
    ],
    extras: ['Servidor dedicado $1,500', 'Email ilimitado'],
    conditions: 'Renovación anual. Dominio incluido.',
  },
  {
    id: 'wordpress',
    title: 'Hosting WordPress',
    subtitle: 'Optimizado para sitios WordPress.',
    image: 'https://placehold.co/800x600/jpg?text=Hosting+WordPress',
    price: '$299/mes',
    items: [
      'Hosting SSD 15 GB',
      'Dominio .com gratis',
      'SSL',
      'WordPress preinstalado',
      'Themes profesionales',
      'Plugins de seguridad'
    ],
    includes: [
      'Actualizaciones automáticas',
      'Soporte WordPress',
      'Respaldos diarios'
    ],
    extras: ['Migración gratis', 'Themes premium'],
    conditions: 'Ideal para blogs y sitios corporativos.',
  },
  {
    id: 'ecommerce',
    title: 'Hosting Ecommerce',
    subtitle: 'Para tiendas WooCommerce y Laravel.',
    image: 'https://placehold.co/800x600/jpg?text=Hosting+Ecommerce',
    price: '$899/mes',
    items: [
      'Hosting SSD 100 GB',
      'Dominio .com gratis',
      'SSL premium',
      'Correos ilimitados',
      'LiteSpeed',
      'Staging',
      'Backup diario'
    ],
    includes: [
      'Soporte 24/7',
      'Optimización WooCommerce',
      'SSL y CDN'
    ],
    extras: ['Pasarela de pago', 'Integración shipping'],
    conditions: 'Incluye asesoría de ecommerce inicial.',
  }
]
</script>

 