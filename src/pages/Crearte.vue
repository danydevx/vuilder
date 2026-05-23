<template>
  <div class="page-welcomes">
  <Header1
    scheme="scheme-rose-light"
    :sticky="true"
    :nav="[
      { label: 'Servicios', href: '#services', active: true },
      { label: 'Proyectos', href: '#works' },
      { label: 'Nosotros', href: '#news' },
      { label: 'Contacto', href: '#contact' }
    ]"
  />

  </div>

  <SectionHero6
    scheme="scheme-rose-light"
    overline="ORPOT"
    title="Diseño y desarrollo web"
    subtitle="Creamos sitios profesionales, tiendas en línea y aplicaciones a la medida de tu negocio."
    :cta="{ href: '#works', label: 'Ver proyectos' }"
    watermark="Orpot Web"
  />

   <SectionContent24
    id="about"
    scheme="scheme-rose-light"
    :content="content24"
    :ctas="[
      { label: 'CONOCE MÁS', href: '#more', variant: 'link' }
    ]"
  />

</template>

<script setup>
import Header1 from '@/headers/Header1.vue'
import SectionHero6 from '@/sections/hero/SectionHero6.vue'
import SectionContent24 from '@/sections/content/SectionContent24.vue'
 

 const content24 = {
  headline: 'Diseño y desarrollo web profesional.',
  summary: 'Creamos sitios web, tiendas en línea y aplicaciones con WordPress, WooCommerce, Laravel y Drupal.',
  text: 'Ayudamos a negocios y empresas a tener presencia profesional en internet mediante proyectos web que generan resultados.',
  image: 'https://placehold.co/800x960/jpg?text=400+x+485',
  alt: 'Mock image'
}
</script>

<style scoped>
.page-welcomes {
  background: var(--surface);
}
</style>
