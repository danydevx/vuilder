<template>
  <div>
    <PageNav sticky />

  <SectionFaqs
      id="section-faq-accordion"
      scheme="default-neutral"
      title="Preguntas frecuentes"
      subtitle="Respuestas a las dudas más comunes sobre nuestros servicios de desarrollo web."
      :enableOverlay="true"
      backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+FAQ"
      :faqs="faqs"
      :ctas="[
        { label: 'Contáctanos', href: '#section-contact', variant: 'solid', icon: 'bi bi-envelope' }
      ]"
       :cols="2"
      align="left"
      :fluid="false"
      :animate="false"
    />

    <SectionFaqs1
      id="section-faq-cards"
      scheme="default-light"
      title="Preguntas frecuentes"
      subtitle="Respuestas visuales con tarjetas expandibles para cada duda sobre proyectos web."
      backgroundImg="https://placehold.co/1600x900/jpg?text=FAQ+Cards"
      :enableOverlay="true"
      :faqs="faqs"
      :ctas="[
        { label: 'Escríbenos', href: '#section-contact', variant: 'outline', icon: 'bi bi-chat-dots' }
      ]"
        :cols="2"
      align="center"
      :fluid="true"
      :animate="true"
    />

     <SectionFaqs2
      id="section-faq-list"
      scheme="default-neutral"
      title="Preguntas frecuentes"
      subtitle="Información general sobre nuestros servicios de diseño y desarrollo web."
      backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+FAQ+List"
      :enableOverlay="true"
      sideImage="https://placehold.co/600x800/jpg?text=Foto+Equipo+Orpot"
      :faqs="faqs"
      :ctas="[
        { label: 'Escríbenos', href: '#section-contact', variant: 'solid', icon: 'bi bi-envelope' }
      ]"
           order="inverted"
    />

    <SectionFaqs3
      id="section-faq-list-scroll"
      scheme="default-neutral"
      title="Preguntas frecuentes"
      subtitle="Desplázate para ver todas las respuestas sobre proyectos web."
      backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Scrollable"
      :enableOverlay="true"
      sideImage="https://placehold.co/600x800/jpg?text=Imagen+FAQ"
      :faqs="faqs"
      :ctas="[
        { label: 'Contáctanos', href: '#contacto', variant: 'solid', icon: 'bi bi-envelope' }
      ]"
      order="inverted"
    />

      <SectionFaqs4
      id="section-faq-simple"
      scheme="default-neutral"
      title="Preguntas frecuentes"
      subtitle="Desplázate para ver todas las respuestas sobre proyectos web."
      backgroundImg="https://placehold.co/1600x900/jpg?text=Fondo+Scrollable"
      :enableOverlay="true"
      sideImage="https://placehold.co/600x800/jpg?text=Imagen+FAQ"
      :faqs="faqs"
      :ctas="[
        { label: 'Contáctanos', href: '#contacto', variant: 'solid', icon: 'bi bi-envelope' }
      ]"
    />

    <SectionFaqs5
      id="section-faq-columns"
       scheme="default-neutral"
      title="¿Tienes preguntas?"
      subtitle="Respondemos todas tus dudas sobre proyectos web"
      backgroundImg="https://placehold.co/1600x900/jpg?text=FAQ+Columns"
      :enableOverlay="false"
      titleLeft="Preguntas de proyectos"
      titleRight="Preguntas técnicas"
      :faqsLeft="faqsLeft"
      :faqsRight="faqsRight"
      :ctas="[
        { label: 'Contactar', href: '#contact', variant: 'solid', icon: 'bi bi-envelope' }
      ]"
      order="inverted"
    />



</div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionFaqs from '@/sections/faqs/SectionFaqs.vue'
 import SectionFaqs1 from '@/sections/faqs/SectionFaqs1.vue'
 import SectionFaqs2 from '@/sections/faqs/SectionFaqs2.vue'
 import SectionFaqs3 from '@/sections/faqs/SectionFaqs3.vue'
  import SectionFaqs4 from '@/sections/faqs/SectionFaqs4.vue'
  import SectionFaqs5 from '@/sections/faqs/SectionFaqs5.vue'

   const faqs = [
  { question: '¿Cuánto cuesta un sitio web?', answer: 'El costo depende de la complejidad y funcionalidades requeridas. Una landing page comienza desde $8,000 MXN y un sitio corporativo desde $15,000 MXN.', icon: 'bi bi-currency-dollar' },
  { question: '¿En cuánto tiempo entregan un proyecto?', answer: 'Los tiempos varían según el alcance. Una landing page toma 2-3 semanas, un sitio corporativo 4-6 semanas, y una tienda en línea 6-10 semanas.', icon: 'bi bi-clock' },
  { question: '¿Incluyen hosting?', answer: 'Sí, todos nuestros proyectos incluyen hosting SSD de alta velocidad, certificado SSL y dominio gratis el primer año.', icon: 'bi bi-server' },
  { question: '¿Puedo actualizar el contenido yo mismo?', answer: 'Sí, todos nuestros sitios incluyen un panel administrativo intuitivo para que puedas modificar contenido sin conocimientos técnicos.', icon: 'bi bi-person-standing' },
  { question: '¿Trabajan con WordPress?', answer: 'Sí, somos especialistas en WordPress, WooCommerce, Drupal, ProcessWire y Laravel. Elegimos la tecnología que mejor se adapte a tu proyecto.', icon: 'bi bi-wordpress' },
  { question: '¿Dan soporte después de entregar?', answer: 'Sí, todos nuestros proyectos incluyen 30 días de soporte gratuito. Después puedes contratar un plan de mantenimiento mensual.', icon: 'bi bi-headset' },
  { question: '¿Hacen SEO?', answer: 'Sí, implementamos SEO técnico, optimización de velocidad, metadatos y estructura optimizada para Google. El SEO avanzado se cotiza por separado.', icon: 'bi bi-search' },
  { question: '¿Qué pasa si ya tengo un sitio?', answer: 'Podemos rediseñar, migrar o optimizar tu sitio existente. Ofrecemos auditorías gratuitas para evaluar el estado actual.', icon: 'bi bi-tools' },
  { question: '¿Trabajan con clientes fuera de Guadalajara?', answer: 'Sí, trabajamos con clientes en todo México y Latinoamérica de forma remota. La comunicación es por email, WhatsApp y videollamada.', icon: 'bi bi-globe' },
  { question: '¿Cómo funciona el pago?', answer: 'Recibimos transferencia, SPEI y PayPal. Solicitamos 50% anticipo y 50% contra entrega del proyecto.', icon: 'bi bi-credit-card' },
]


const faqsLeft = [
  { question: '¿Cuánto cuesta un sitio web?', answer: 'El costo depende de la complejidad. Una landing page desde $8,000 MXN, sitio corporativo desde $15,000 MXN.' },
  { question: '¿En cuánto tiempo entregan?', answer: 'Landing page: 2-3 semanas. Sitio corporativo: 4-6 semanas. Tienda en línea: 6-10 semanas.' },
  { question: '¿Incluyen hosting y dominio?', answer: 'Sí, hosting SSD, certificado SSL y dominio gratis el primer año incluido en todos los proyectos.' },
  { question: '¿Puedo modificar el contenido?', answer: 'Sí, todos los sitios incluyen panel administrativo para que actualices textos, imágenes y productos.' },
  { question: '¿Ofrecen mantenimiento?', answer: 'Sí, tenemos planes de mantenimiento desde $1,500 MXN/mes que incluyen actualizaciones, respaldos y soporte.' },
]

const faqsRight = [
  { question: '¿Trabajan con WordPress?', answer: 'Sí, somos especialistas en WordPress, WooCommerce, Drupal, ProcessWire y Laravel.' },
  { question: '¿Hacen tiendas en línea?', answer: 'Sí, desarrollamos tiendas WooCommerce y Laravel con pasarelas de pago, inventario y envío integrados.' },
  { question: '¿Qué incluye el SEO?', answer: 'SEO técnico, velocidad, metadatos, estructura y móvil optimizado. SEO avanzado (contenido, linkbuilding) cotizado aparte.' },
  { question: '¿Migrarán mi sitio existente?', answer: 'Sí, migramos sitios de cualquier plataforma manteniendo SEO y sin tiempo de inactividad.' },
  { question: '¿Dan garantía?', answer: 'Sí, todos los proyectos incluyen garantía de 30 días contra errores de desarrollo.' },
]
</script>
