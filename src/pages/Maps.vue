<template>
  <div class="page-maps">
    <PageNav sticky />
    <SectionMapLeaflet
      id="section-map"
      scheme="default-dark"
      title="Nuestra ubicación"
      subtitle="Encuéntranos en Guadalajara, Jalisco. Atendimento presencial y remoto para todo México."
      backgroundImg="https://placehold.co/1200x800/jpg?text=Oficina+Orpot"
      :enableOverlay="true"
      :fluid="false"
      align="left"
      :location="mapConfig"
      :info="{
        title: mapConfig.name,
        address: mapConfig.address,
      }"
      :ctas="[
        {
          label: 'Ver en Google Maps',
          href: mapConfig.mapUrl,
          icon: 'bi bi-geo-alt-fill',
          variant: 'solid',
        },
        {
          label: 'Contactar',
          href: '#contacto',
          icon: 'bi bi-chat-dots',
          variant: 'outline',
        },
      ]"
    />

    <hr class="my-0 border-0" style="height: 4rem;" />

    <SectionMapLeaflet1
      id="section-map-1"
      scheme="default-dark"
      title="Dirección y contacto"
      subtitle="Conoce cómo llegar a nuestra oficina y nuestros horarios de atención"
      :enableOverlay="true"
      :fluid="false"
      :cols="4"
      align="left"
      order="inverted"
      :location="mapConfig"
    />

    <hr class="my-0 border-0" style="height: 4rem;" />

    <SectionMapLeaflet2
      id="section-map-2"
      scheme="default-dark"
      title="Oficina y entorno"
      subtitle="Galería del área de trabajo y rutas de acceso desde cualquier punto de la ciudad"
      backgroundImg="https://placehold.co/1200x800/jpg?text=Mapa+Fondo"
      :enableOverlay="true"
      :fluid="false"
      alignH="left"
      order="inverted"
      :location="mapConfig"
    />

    <SectionMapLeaflet3
      id="section-map-3"
      scheme="default-dark"
      title="Cómo llegar"
      subtitle="Rutas, transporte público y estacionamientos cercanos a nuestra oficina"
      backgroundImg="https://placehold.co/1200x800/jpg?text=Mapa+Fondo"
      :enableOverlay="true"
      :fluid="false"
      alignH="center"
      :location="mapConfig"
    />

     <SectionMapLeaflet4
      id="section-map-4"
      scheme="default-dark"
      title="Información de contacto"
      subtitle="Todos los canales para comunicarte con nuestro equipo de desarrollo web"
      backgroundImg="https://placehold.co/1200x800/jpg?text=Mapa+Fondo"
      :enableOverlay="true"
      :fluid="false"
      align="left"
      order="inverted"
      :animate="false"
      :location="mapConfig"
    />
  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionMapLeaflet from '@/sections/maps/SectionMapLeaflet.vue'
import SectionMapLeaflet1 from '@/sections/maps/SectionMapLeaflet1.vue'
import SectionMapLeaflet2 from '@/sections/maps/SectionMapLeaflet2.vue'
import SectionMapLeaflet3 from '@/sections/maps/SectionMapLeaflet3.vue'
import SectionMapLeaflet4 from '@/sections/maps/SectionMapLeaflet4.vue'

const mapConfig = {
  lat: 20.6339654,
  lng: -103.2422363,
  zoom: 15,
  name: 'Orpot — Diseño y Desarrollo Web',
  address: 'Av. Vallarta 6503, Col. Cd Granja, Guadalajara, Jalisco, México',
  mapUrl: 'https://www.google.com/maps?q=20.6339654,-103.2422363',

  contact: {
    phone: '+52 33 1234 5678',
    email: 'hola@orpot.com',
    whatsapp: '523312345678',
  },

  schedule: [
    { day: 'Lunes', open: '09:00', close: '18:00' },
    { day: 'Martes', open: '09:00', close: '18:00' },
    { day: 'Miércoles', open: '09:00', close: '18:00' },
    { day: 'Jueves', open: '09:00', close: '18:00' },
    { day: 'Viernes', open: '09:00', close: '18:00' },
    { day: 'Sábado', open: '10:00', close: '14:00' },
    { day: 'Domingo', open: 'Cerrado', close: '' },
  ],

  info: {
    accessibility: [
      'Oficina accesible para personas en silla de ruedas',
      'Estacionamiento gratuito para clientes',
      'Sanitarios accesibles',
    ],
    services: ['Oficina', 'Sala de juntas', 'Estacionamiento'],
    minors: [],
  },

  transports: [
    { name: 'Parada Ávila Camacho', type: 'Camión', distance: '200 m' },
    { name: 'Estación Expo ', type: 'Tren ligero', distance: '800 m' },
    { name: 'Parada López Mateos', type: 'Camión', distance: '350 m' },
  ],

  gallery: [
    'https://placehold.co/600x400/jpg?text=Oficina+Principal',
    'https://placehold.co/600x400/jpg?text=Sala+de+Juntas',
    'https://placehold.co/600x400/jpg?text=Área+de+Trabajo',
    'https://placehold.co/600x400/jpg?text=Recepción',
    'https://placehold.co/600x400/jpg?text=Oficina+Principal',
    'https://placehold.co/600x400/jpg?text=Sala+de+Juntas',
    'https://placehold.co/600x400/jpg?text=Área+de+Trabajo',
    'https://placehold.co/600x400/jpg?text=Recepción',
    'https://placehold.co/600x400/jpg?text=Oficina+Principal',
    'https://placehold.co/600x400/jpg?text=Sala+de+Juntas',
    'https://placehold.co/600x400/jpg?text=Área+de+Trabajo',
    'https://placehold.co/600x400/jpg?text=Recepción',
    'https://placehold.co/600x400/jpg?text=Oficina+Principal',
    'https://placehold.co/600x400/jpg?text=Sala+de+Juntas'
  ],

  social: [
    { icon: 'bi bi-facebook', href: 'https://facebook.com/orpot' },
    { icon: 'bi bi-instagram', href: 'https://instagram.com/orpot' },
    { icon: 'bi bi-tiktok', href: 'https://tiktok.com/@orpot' },
  ],
}
</script>

<style scoped lang="less">
 
</style>
