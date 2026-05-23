<template>
  <div>
    <PageNav sticky />
    <SectionServices
      id="section-services"
      scheme="default-neutral"
      title="Servicios de desarrollo web"
      subtitle="Todo lo que necesitas para tener presencia profesional en internet."
      :services="services"
      :cols="4"
  align="center"
  :fluid="true"
    />

    <SectionServices1
  id="section-services-1"
  scheme="default-light"
  title="Servicios web"
  subtitle="Soluciones completas para tu negocio en internet"
  :services="services"
   :cols="4"
  align="left"
  :fluid="true"
/>

<SectionServices2
  id="section-services-2"
  scheme="default-neutral"
  title="Servicios adicionales"
  subtitle="Complementos que mejoran tu proyecto web"
  :services="services2"
   :cols="4"
  align="right"
  :fluid="true"
/>

<SectionServices3
  id="section-services-3"
  scheme="default-light"
  title="Servicios de desarrollo"
  subtitle="Explora todo lo que podemos hacer por tu proyecto"
  :services="services"
  :cols="4"
  align="left"
  :fluid="true"
/>

<SectionServices4
  id="section-services-4"
  scheme="default-light"
  title="Infraestructura y soporte"
  subtitle="Lo que necesitas para mantener tu sitio funcionando"
  :services="[
    { title: 'Hosting SSD', text: 'Alta velocidad y rendimiento', icon: 'bi bi-server', short: 'Hosting' },
    { title: 'Certificado SSL', text: 'Seguridad y confianza para tus usuarios', icon: 'bi bi-shield-lock', short: 'SSL' },
    { title: 'Dominio incluido', text: 'Tu dominio .com gratis el primer año', icon: 'bi bi-globe', short: 'Dominio' },
    { title: 'Mantenimiento', text: 'Actualizaciones, respaldos y soporte', icon: 'bi bi-tools', short: 'Mantenimiento' },
    { title: 'Soporte técnico', text: 'Resolución de errores y optimización', icon: 'bi bi-headset', short: 'Soporte' },
    { title: 'Backups automáticos', text: 'Copias de seguridad diarias', icon: 'bi bi-cloud-arrow-up', short: 'Backups' }
  ]"
  :cols="4"
  align="left"
  :fluid="true"
/>

<SectionServices5
  id="section-services-5"
  scheme="default-light"
  title="Servicios destacados"
  subtitle="Soluciones más solicitadas por nuestros clientes"
  :services="services"

  align="center"
  :fluid="true"
  order="inverted"
/>

<SectionServices6
  scheme="default-light"
  title="Proyectos recientes"
  subtitle="Desliza para ver ejemplos de nuestro trabajo"
  :services="services"
/>

<SectionServices7
  scheme="default-neutral"
  title="Proyectos recientes"
  subtitle="Desliza para ver ejemplos de nuestro trabajo"
  :services="services"
   align="center"
  :fluid="true"
  order="inverted"
/>


<SectionServices8
  scheme="default-light"
  title="Proyectos recientes"
  subtitle="Desliza para ver ejemplos de nuestro trabajo"
  :services="services"
/>


<SectionServices9
  scheme="default-light"
  title="Proyectos recientes"
  subtitle="Desliza para ver ejemplos de nuestro trabajo"
  :services="services"
/>


  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionServices from '@/sections/services/SectionServices.vue'
import SectionServices1 from '@/sections/services/SectionServices1.vue'
import SectionServices2 from '@/sections/services/SectionServices2.vue'
import SectionServices3 from '@/sections/services/SectionServices3.vue'
import SectionServices4 from '@/sections/services/SectionServices4.vue'
import SectionServices5 from '@/sections/services/SectionServices5.vue'
import SectionServices6 from '@/sections/services/SectionServices6.vue'
import SectionServices7 from '@/sections/services/SectionServices7.vue'
import SectionServices8 from '@/sections/services/SectionServices8.vue'
import SectionServices9 from '@/sections/services/SectionServices9.vue'

const services = [
  {
    title: 'Diseño de sitios web',
    subtitle: 'Diseño responsivo y profesional',
    icon: 'bi bi-palette',
    text: 'Diseño visual personalizado, responsivo y optimizado para móviles. Creamos sitios que representan tu marca.',
    image: 'https://placehold.co/800x600/jpg?text=Diseno+Web',
    features: [
      { text: 'Diseño único' },
      { text: 'Responsivo (móvil)' },
      { text: 'UX/UI profesional' }
    ],
    ctas: [
      { label: 'Ver proyectos', href: '#section-portfolio', icon: 'bi bi-images', variant: 'outline' }
    ]
  },
  {
    title: 'WordPress y WooCommerce',
    subtitle: 'Sitios administrables y tiendas',
    icon: 'bi bi-wordpress',
    text: 'Desarrollamos sitios WordPress a medida, themes personalizados y tiendas WooCommerce completas.',
    image: 'https://placehold.co/800x600/jpg?text=WordPress',
    features: [
      { text: 'Panel administrativo' },
      { text: 'Tienda con WooCommerce' },
      { text: 'Plugins a medida' }
    ],
    ctas: [
      { label: 'Cotizar proyecto', href: '#section-contact', icon: 'bi bi-chat-dots', variant: 'solid' }
    ]
  },
  {
    title: 'Laravel y PHP',
    icon: 'bi bi-lightning-charge',
    text: 'Desarrollamos aplicaciones web robustas con Laravel, sistemas administrativos y APIs REST.',
    image: 'https://placehold.co/800x600/jpg?text=Laravel',
    features: [
      { text: 'Aplicaciones a medida' },
      { text: 'Paneles administrativos' },
      { text: 'APIs REST' }
    ],
    ctas: [
      { label: 'Solicitar cotización', href: '#section-contact', icon: 'bi bi-chat-dots', variant: 'solid' }
    ]
  },
  {
    title: 'Drupal y ProcessWire',
    subtitle: 'CMS empresariales',
    icon: 'bi bi-droplet',
    text: 'Desarrollamos sitios corporativos con Drupal y ProcessWire para proyectos que requieren robustez.',
    image: 'https://placehold.co/800x600/jpg?text=Drupal',
    features: [
      { text: 'Themes personalizados' },
      { text: 'Módulos a medida' },
      { text: 'Migraciones' }
    ],
    ctas: [
      { label: 'Ver más', href: '#section-services', icon: 'bi bi-info-circle', variant: 'outline' }
    ]
  },
  {
    title: 'Ecommerce y tiendas',
    icon: 'bi bi-cart3',
    text: 'Tiendas en línea completas con WooCommerce o Laravel: gestión de productos, carrito y pasarelas de pago.',
    image: 'https://placehold.co/800x600/jpg?text=Ecommerce',
    features: [
      { text: 'Gestión de productos' },
      { text: 'Pasarelas de pago' },
      { text: 'Inventario y pedidos' }
    ],
    ctas: [
      { label: 'Cotizar tienda', href: '#section-contact', icon: 'bi bi-cart3', variant: 'solid' }
    ]
  },
  {
    title: 'SEO y posicionamiento',
    icon: 'bi bi-search',
    text: 'Optimización SEO técnica, velocidad, metadatos y estructura para mejorar tu visibilidad en Google.',
    image: 'https://placehold.co/800x600/jpg?text=SEO',
    features: [
      { text: 'SEO técnico' },
      { text: 'Optimización de velocidad' },
      { text: 'Metadatos' }
    ],
    ctas: [
      { label: 'Auditoría SEO', href: '#section-contact', icon: 'bi bi-search', variant: 'outline' }
    ]
  },
  {
    title: 'Hosting y dominio',
    icon: 'bi bi-server',
    text: 'Hosting SSD de alta velocidad, certificado SSL y dominio gratis el primer año en todos los proyectos.',
    image: 'https://placehold.co/800x600/jpg?text=Hosting',
    features: [
      { text: 'Hosting SSD' },
      { text: 'SSL incluido' },
      { text: 'Dominio gratis' }
    ],
    ctas: [
      { label: 'Ver planes', href: '#section-packages', icon: 'bi bi-server', variant: 'solid' }
    ]
  },
  {
    title: 'Mantenimiento y soporte',
    icon: 'bi bi-headset',
    text: 'Planes de mantenimiento mensual, actualizaciones, respaldos y soporte técnico continuo.',
    image: 'https://placehold.co/800x600/jpg?text=Soporte',
    features: [
      { text: 'Actualizaciones' },
      { text: 'Copias de seguridad' },
      { text: 'Soporte técnico' }
    ],
    ctas: [
      { label: 'Ver planes', href: '#section-packages', icon: 'bi bi-list-check', variant: 'outline' }
    ]
  }
]

const services2 = [
  {
    title: 'Landing pages',
    subtitle: 'Páginas de captura y campañas',
    icon: 'bi bi-rocket',
    text: 'Landing pages optimizadas para conversión, ideales para campañas de Google Ads y redes sociales.',
    features: [
      { text: 'Diseño profesional' },
      { text: 'Formularios integrados' }
    ]
  },
  {
    title: 'Migraciones',
    subtitle: 'Migrate tu sitio existente',
    icon: 'bi bi-arrow-left-right',
    text: 'Migramos sitios de cualquier plataforma manteniendo SEO y sin tiempo de inactividad.',
    features: [
      { text: 'Sin pérdida de datos' },
      { text: 'SEO preservado' }
    ]
  },
  {
    title: 'Optimización',
    subtitle: 'Mejora el rendimiento',
    icon: 'bi bi-speedometer2',
    text: 'Optimizamos sitios lentos para que carguen rápido y tengan mejor posicionamiento.',
    features: [
      { text: 'Velocidad mejorada' },
      { text: 'Mejor SEO' }
    ]
  },
  {
    title: 'Integraciones',
    subtitle: 'Conecta servicios externos',
    icon: 'bi bi-plug',
    text: 'Integraciones con CRMs, email marketing, pasarelas de pago y APIs de terceros.',
    features: [
      { text: 'APIs REST' },
      { text: 'Zapier, Mailchimp, etc.' }
    ]
  }
]

</script>
