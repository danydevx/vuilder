<template>
  <div class="page-galleries">
    <PageNav sticky />
    <SectionGallery1
      id="section-gallery-hero"
      scheme="default-dark"
      title="Proyectos web"
      subtitle="Explora nuestros trabajos más recientes en diseño y desarrollo"
      galleryName="gallery-hero"
      :gallery="gallery"
    />

        <SectionGallery2
      id="section-gallery-grid"
      scheme="default-dark"
      title="Proyectos web"
      subtitle="Sitios, tiendas y aplicaciones que hemos desarrollado"
      galleryName="gallery-grid"
      :gallery="gallery"
    />

<SectionGallery3
  id="section-gallery-slides"
  scheme="default-dark"
  title="Proyectos recientes"
  subtitle="Desliza o toca para ver más trabajos"
  :gallery="gallery"
  :slidesPerView="2"
  :autoplay="true"
  :loop="true"
  :dots="false"
  :enableLightbox="true"   
/>

<SectionGallery4
  id="section-gallery-justified"
  scheme="default-dark"
  title="Portafolio"
  subtitle="Diseño responsivo, tiendas en línea y aplicaciones web"
  :gallery="gallery"
  :enableLightbox="true"
  :rowHeight="220"
  gap="1rem"
/>
 <SectionGallery6
     scheme="default-dark"
     title="Multimedia"
     subtitle="Explora fotos y videos de nuestros proyectos web"
     :gallery="gallery"
   />

   <SectionGallery7
     id="section-gallery7"
     scheme="default-light"
     :gallery="gallery"
     :autoplay="true"
     :showDots="false"
     :showArrows="true"
   />
  <SectionGallery8
     scheme="default-neutral"
     :gallery="gallery"
     :autoplay="true"
     :showArrows="true"
     :slidesPerView="3"   
     :kenburnsDuration="15000"
   />
  <SectionGallery9
     scheme="default-dark"
     :gallery="gallery1"
     :slidesPerView="3"
     :autoplay="true"
     :showArrows="true"
   />

<SectionGallery10
  id="section-gallery-masonry-vue"
  scheme="rose-dark"
  title="Proyectos web"
  subtitle="Diseño fluido y rápido con CSS nativo"
  :gallery="gallery1"
  :enableOverlay="true"
/>

<SectionGallery11
  id="section-gallery-11"
  scheme="rose-dark"
  title="Proyectos web"
  subtitle="Diseño fluido y rápido con CSS nativo"
  :gallery="gallery1"
  :enableOverlay="true"
/>

<SectionGallery12
  id="section-gallery-12"
  scheme="rose-dark"
  title="Proyectos web"
  subtitle="Diseño fluido y rápido con CSS nativo"
  :gallery="gallery"
  :enableOverlay="true"
/>

  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionGallery1 from '@/sections/gallery/SectionGallery1.vue'
import SectionGallery2 from '@/sections/gallery/SectionGallery2.vue'
import SectionGallery3 from '@/sections/gallery/SectionGallery3.vue'
import SectionGallery4 from '@/sections/gallery/SectionGallery4.vue'
import SectionGallery5 from '@/sections/gallery/SectionGallery5.vue'
import SectionGallery6 from '@/sections/gallery/SectionGallery6.vue'
import SectionGallery7 from '@/sections/gallery/SectionGallery7.vue'
import SectionGallery8 from '@/sections/gallery/SectionGallery8.vue'
import SectionGallery9 from '@/sections/gallery/SectionGallery9.vue'
import SectionGallery10 from '@/sections/gallery/SectionGallery10.vue'
import SectionGallery11 from '@/sections/gallery/SectionGallery11.vue'
import SectionGallery12 from '@/sections/gallery/SectionGallery12.vue'


const gallery = [
  {
    image: 'https://placehold.co/1200x800/jpg?text=Sitio+Corporativo',
    thumb: 'https://placehold.co/600x400/jpg?text=Sitio+Corporativo',
    title: 'Sitio corporativo',
    subtitle: 'WordPress + theme personalizado'
  },
  {
    image: 'https://placehold.co/1200x800/jpg?text=Tienda+WooCommerce',
    thumb: 'https://placehold.co/600x400/jpg?text=Tienda+WooCommerce',
    title: 'Tienda WooCommerce',
    subtitle: '+500 productos, pasarela PayPal'
  },
  {
    image: 'https://placehold.co/1200x800/jpg?text=Landing+Page',
    thumb: 'https://placehold.co/600x400/jpg?text=Landing+Page',
    title: 'Landing page',
    subtitle: 'Optimizada para SEO y conversión'
  },
  {
    image: 'https://placehold.co/1200x800/jpg?text=Panel+Admin',
    thumb: 'https://placehold.co/600x400/jpg?text=Panel+Admin',
    title: 'Panel administrativo',
    subtitle: 'Laravel + dashboard personalizado'
  },
  {
    image: 'https://placehold.co/1200x800/jpg?text=Blog+WordPress',
    thumb: 'https://placehold.co/600x400/jpg?text=Blog+WordPress',
    title: 'Blog WordPress',
    subtitle: 'Theme + optimización SEO'
  },
  {
    image: 'https://placehold.co/1200x800/jpg?text=Ecommerce+Laravel',
    thumb: 'https://placehold.co/600x400/jpg?text=Ecommerce+Laravel',
    title: 'Ecommerce Laravel',
    subtitle: 'Carrito + Stripe + inventario'
  }
]

const gallery1 = [
  {
    image: 'https://www.orpot.com/site-orpot/assets/files/1808/maos-cnc-1.jpg',
    thumb: 'https://placehold.co/400x600/jpg?text=Sitio+Corporativo',
    title: 'Sitio corporativo',
    subtitle: 'WordPress + theme personalizado',
    href: '',
    height: 420,
  },
  {
    image: 'https://placehold.co/1200x800/jpg?text=Tienda+WooCommerce',
    thumb: 'https://placehold.co/600x400/jpg?text=Tienda+WooCommerce',
    title: 'Tienda WooCommerce',
    subtitle: '+500 productos, pasarela PayPal',
    href: '/tienda-woo',
    height: 300,
  },
  {
    image: 'https://placehold.co/900x1000/jpg?text=Landing+Page+SEO',
    thumb: 'https://placehold.co/450x500/jpg?text=Landing+Page+SEO',
    title: 'Landing page SEO',
    subtitle: 'Optimizada para Google Ads',
    href: '/landing-seo',
    height: 380,
  },
  {
    image: 'https://placehold.co/1000x1400/jpg?text=Panel+Laravel',
    thumb: 'https://placehold.co/500x700/jpg?text=Panel+Laravel',
    title: 'Panel Laravel',
    subtitle: 'Dashboard + métricas en tiempo real',
    href: '/panel-laravel',
    height: 460,
  },
  {
    image: 'https://placehold.co/1000x750/jpg?text=Migracion+Drupal',
    thumb: 'https://placehold.co/500x375/jpg?text=Migracion+Drupal',
    title: 'Migración Drupal',
    subtitle: 'De Drupal 7 a Drupal 10',
    href: '/migracion-drupal',
    height: 320,
  },
  {
    image: 'https://placehold.co/700x950/jpg?text=Blog+WordPress',
    thumb: 'https://placehold.co/350x475/jpg?text=Blog+WordPress',
    title: 'Blog WordPress',
    subtitle: 'Theme + optimización SEO',
    href: '/blog-wordpress',
    height: 400,
  },
  {
    image: 'https://placehold.co/900x600/jpg?text=Portal+Empresas',
    thumb: 'https://placehold.co/450x300/jpg?text=Portal+Empresas',
    title: 'Portal empresarial',
    subtitle: 'CRM + panel de métricas',
    href: '/portal-empresas',
    height: 280,
  },
  {
    image: 'https://placehold.co/800x1300/jpg?text=Carrito+WooCommerce',
    thumb: 'https://placehold.co/400x650/jpg?text=Carrito+WooCommerce',
    title: 'Carrito WooCommerce',
    subtitle: 'Checkout personalizado',
    href: '/carrito-woo',
    height: 440,
  },
  {
    image: 'https://placehold.co/900x1000/jpg?text=Sitio+ProcessWire',
    thumb: 'https://placehold.co/450x500/jpg?text=Sitio+ProcessWire',
    title: 'Sitio ProcessWire',
    subtitle: 'Plantilla personalizada + módulos',
    href: '/sitio-processwire',
    height: 360,
  },
]
</script>

 
