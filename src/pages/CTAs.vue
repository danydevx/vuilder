<template>
  <div class="page-ctas">
    <PageNav sticky />
    <SectionCta1
      id="section-cta-1"
      scheme="default-light"
      title="¿Tienes un proyecto en mente?"
      subtitle="Escríbenos y cotiza tu sitio web sin compromiso. Respuesta en menos de 24 horas."
      :enableOverlay="false"
    />

    <hr class="my-0 border-0" style="height: 4rem;" />

    <SectionCta2
      id="section-cta-2"
      scheme="default-dark"
      title="Cotiza tu proyecto web hoy"
      subtitle="Contáctanos directamente y recibe una cotización personalizada sin compromiso."
      backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+CTA"
      :enableOverlay="true"
      align="left"
    />

    <hr class="my-0 border-0" style="height: 4rem;" />

    <SectionCta3
      id="section-cta-3"
      scheme="default-light"
      title="Solicita tu cotización"
      subtitle="Completa el formulario y te contactamos en menos de 24 horas."
      buttonLabel="Enviar mensaje por WhatsApp"
      messagePlaceholder="Cuéntanos sobre tu proyecto web: tipo de sitio, funcionalidades, plazo..."
    />

    <hr class="my-0 border-0" style="height: 4rem;" />

    <SectionCta5
      id="section-cta-5"
      scheme="light-purple"
      title="¿Listo para empezar?"
      subtitle="Únete a miles de personas que ya están creando"
      primaryText="Comenzar"
      secondaryText="Saber más"
    />

    <hr class="my-0 border-0" style="height: 4rem;" />

    <SectionCta6
      id="section-cta-6"
      scheme="dark-purple"
      title="Transforma tu negocio hoy"
      subtitle="Comienza en minutos, sin conocimientos técnicos"
      buttonText="Prueba gratis"
    />
  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionCta1 from '@/sections/cta/SectionCta1.vue'
import SectionCta2 from '@/sections/cta/SectionCta2.vue'
import SectionCta3 from '@/sections/cta/SectionCta3.vue'
import SectionCta4 from '@/sections/cta/SectionCta4.vue'
import SectionCta5 from '@/sections/cta/SectionCta5.vue'
import SectionCta6 from '@/sections/cta/SectionCta6.vue'
</script>