<template>
  <div>
    <PageNav sticky />

    <SectionTimeline
      id="section-timeline-elegant"
      scheme="default-neutral"
      title="Proceso de trabajo"
      subtitle="Así transformamos tu idea en un proyecto web profesional."
      backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Proceso"
      :enableOverlay="true"
      :ctas="[
        { label: 'Cotizar proyecto', href: '#section-contact', variant: 'solid', icon: 'bi bi-chat-dots' },
        { label: 'Ver servicios', href: '#section-services', variant: 'outline', icon: 'bi bi-grid-3x3-gap' }
      ]"
      :events="events"
    />

 <SectionTimeline1
      id="section-timeline-scroll"
      scheme="default-neutral"
      title="Nuestra historia"
      subtitle="Años de experiencia creando proyectos web exitosos."
      backgroundImg="https://placehold.co/1600x900/jpg?text=Historia+Orpot"
      :enableOverlay="true"
      :autoplay="true"
      :delay="4500"
      :showArrows="true"
      :events="events"
      :ctas="[
        { label: 'Ver proyectos', href: '#section-gallery', variant: 'solid', icon: 'bi bi-images' }
      ]"
    />


     <SectionTimeline2
      id="section-timeline-cards"
      scheme="default-light"
      title="Fases del proyecto"
      subtitle="Cada etapa diseñada para entregar resultados."
      backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Fases"
      :enableOverlay="true"
      :ctas="[
        { label: 'Contactar', href: '#section-map', variant: 'solid', icon: 'bi bi-chat-dots' },
      ]"
      :events="events"
    />
    <SectionTimeline3
      id="section-timeline-3"
      scheme="default-light"
      title="Fases del proyecto"
      subtitle="Cada etapa diseñada para entregar resultados."
      backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Fases"
      :enableOverlay="true"
      :ctas="[
        { label: 'Contactar', href: '#section-map', variant: 'solid', icon: 'bi bi-chat-dots' },
      ]"
      :events="events"
    />

      <SectionTimeline4
      id="section-timeline-4"
      scheme="default-light"
      title="Fases del proyecto"
      subtitle="Cada etapa diseñada para entregar resultados."
      backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Fases"
      :enableOverlay="true"
      :ctas="[
        { label: 'Contactar', href: '#section-map', variant: 'solid', icon: 'bi bi-chat-dots' },
      ]"
      :events="events"
    />

     <SectionTimeline5
      id="timeline-cards-stack"
      scheme="default-neutral"
      title="Momentos clave"
      subtitle="Desliza las tarjetas para descubrir cómo trabajamos"
      backgroundImg="https://placehold.co/1600x900/jpg?text=Cards+Proceso"
      :enableOverlay="true"
      :events="events"
      :ctas="[
        { label: 'Ver galería', href: '#section-gallery', variant: 'solid', icon: 'bi bi-images' }
      ]"
    />

      <SectionTimeline6
      id="section-timeline-gallery"
      scheme="default-neutral"
      title="Proyectos realizados"
      subtitle="Explora los resultados más destacados de nuestro trabajo"
      backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Proyectos"
      :enableOverlay="true"
      :events="events"
      :ctas="[
        { label: 'Ver ubicación', href: '#section-map', variant: 'solid', icon: 'bi bi-geo-alt' }
      ]"
    />
</div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionTimeline from '@/sections/timelines/SectionTimeline.vue'
import SectionTimeline1 from '@/sections/timelines/SectionTimeline1.vue'
import SectionTimeline2 from '@/sections/timelines/SectionTimeline2.vue'
import SectionTimeline3 from '@/sections/timelines/SectionTimeline3.vue'
import SectionTimeline4 from '@/sections/timelines/SectionTimeline4.vue'
import SectionTimeline5 from '@/sections/timelines/SectionTimeline5.vue'
import SectionTimeline6 from '@/sections/timelines/SectionTimeline6.vue'
const events =[
        {
          time: 'Día 1-3',
          title: 'Discovery',
          description: 'Reunión inicial para entender tu negocio, objetivos y requerimientos del proyecto.',
          icon: 'bi bi-chat-dots',
          image: 'https://placehold.co/800x600/jpg?text=Discovery'
        },
        {
          time: 'Día 4-7',
          title: 'Propuesta y Wireframes',
          description: 'Presentamos la arquitectura del sitio, wireframes y presupuesto detallado.',
          icon: 'bi bi-pen',
          image: 'https://placehold.co/800x600/jpg?text=Wireframes'
        },
        {
          time: 'Semana 2-3',
          title: 'Diseño',
          description: 'Creamos el diseño visual profesional, mockups y revisions.',
          icon: 'bi bi-palette',
          image: 'https://placehold.co/800x600/jpg?text=Diseno'
        },
        {
          time: 'Semana 4-6',
          title: 'Desarrollo',
          description: 'Programación frontend, backend, integraciones y pruebas.',
          icon: 'bi bi-code-slash',
          image: 'https://placehold.co/800x600/jpg?text=Desarrollo'
        },
        {
          time: 'Semana 7-8',
          title: 'Lanzamiento',
          description: 'Deploy, capacitación, configuración de hosting y entrega final.',
          icon: 'bi bi-rocket',
          image: 'https://placehold.co/800x600/jpg?text=Lanzamiento'
        }
      ]
</script>
