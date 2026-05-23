<!-- src/pages/Index.vue -->
<template>
  <div>
    <PageNav sticky />

    <SectionPackages
      id="section-packages"
      scheme="dark-blue"
      title="Planes y precios"
      subtitle="Soluciones a la medida para cada tipo de proyecto web"
      :packages="packages"
      :cols="2"
  align="left"
  :fluid="true"
    />

        <SectionPackages2
      scheme="default-neutral"
      title="Planes de desarrollo"
      subtitle="Elige el plan que mejor se adapte a tus necesidades"
      :packages="packages"
         :cols="4"
  align="left"
  :fluid="true"
    />

     <SectionPackages3
      scheme="default-light"
      title="Planes de desarrollo web"
      subtitle="WordPress, WooCommerce, Laravel y más"
      :packages="packages"
      order="inverted" 
    />

     <SectionPackages4
      scheme="default-light"
      title="Planes de desarrollo web"
      subtitle="Sitios, tiendas y aplicaciones personalizadas"
      :packages="packages"
       order="inverted" 
        :cols="4"
      align="left"
      :fluid="true"
    />


    <SectionPackages5
      scheme="default-light"
      title="Planes de desarrollo"
      subtitle="Conoce nuestras opciones para cada tipo de proyecto"
      :packages="packages"
      :cols="4"
  align="left"
  :fluid="true"
    />

      <SectionPackages6
      scheme="default-light"
      :packages="packages"
      title="Planes de desarrollo web"
       order="inverted" 
      align="center"
       :fluid="false"
    />

<SectionPackages7
      scheme="default-light"
      title="Planes de desarrollo web"
      intro="Soluciones personalizadas para sitios corporativos, tiendas en línea y aplicaciones web."
      :packages="packages"
       align="left"
    />

  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionPackages from '@/sections/packages/SectionPackages.vue'
import SectionPackages2 from '@/sections/packages/SectionPackages2.vue'
import SectionPackages3 from '@/sections/packages/SectionPackages3.vue'
import SectionPackages4 from '@/sections/packages/SectionPackages4.vue'
import SectionPackages5 from '@/sections/packages/SectionPackages5.vue'
import SectionPackages6 from '@/sections/packages/SectionPackages6.vue'
import SectionPackages7 from '@/sections/packages/SectionPackages7.vue'
const packages = [
  {
    id: 'landing',
    name: 'Landing page',
    subtitle: 'Ideal para campañas y captura de leads',
    price: 8000,
    period: 'por proyecto',
    image: 'https://placehold.co/800x500/jpg?text=Landing+Page',
    badge: 'Más popular',
    badgeIcon: 'bi bi-rocket',
    meta: [
      { text: '1 página', icon: 'bi bi-file-earmark' },
      { text: '3-5 días entrega', icon: 'bi bi-clock' }
    ],
    features: [
      { text: 'Diseño responsivo profesional', icon: 'bi bi-check2-circle' },
      { text: 'Formulario de contacto', icon: 'bi bi-check2-circle' },
      { text: 'SEO básico incluido', icon: 'bi bi-check2-circle' },
      { text: 'Hosting y SSL incluidos', icon: 'bi bi-check2-circle' }
    ],
    description: 'Landing page optimizada para conversión, con diseño profesional y seguimiento de analytics.',
    ctas: [
      { label: 'Solicitar cotización', href: '#contact', icon: 'bi bi-chat-dots', variant: 'outline' },
      { label: 'Ver demo', href: '#contact', icon: 'bi bi-eye', variant: 'solid' }
    ]
  },
  {
    id: 'corporativo',
    name: 'Sitio corporativo',
    subtitle: 'Presencia profesional en internet',
    price: 15000,
    period: 'por proyecto',
    image: 'https://placehold.co/800x500/jpg?text=Sitio+Corporativo',
    featured: true,
    badge: 'Mejor valor',
    badgeIcon: 'bi bi-star',
    meta: [
      { text: 'Hasta 8 páginas', icon: 'bi bi-file-earmark' },
      { text: '3-4 semanas', icon: 'bi bi-clock' }
    ],
    features: [
      { text: 'Diseño personalizado', icon: 'bi bi-check2-circle' },
      { text: 'Panel administrativo', icon: 'bi bi-check2-circle' },
      { text: 'SEO técnico incluido', icon: 'bi bi-check2-circle' },
      { text: 'Dominio y hosting incluidos', icon: 'bi bi-check2-circle' }
    ],
    description: 'Sitio web profesional con diseño único, panel de administración e integración con redes sociales.',
    ctas: [
      { label: 'Ver detalles', href: '#contact', icon: 'bi bi-list-check', variant: 'outline' },
      { label: 'Cotizar proyecto', href: '#contact', icon: 'bi bi-chat-dots', variant: 'solid' }
    ]
  },
  {
    id: 'ecommerce',
    name: 'Tienda en línea',
    subtitle: 'Vende tus productos en internet',
    price: 25000,
    period: 'por proyecto',
    image: 'https://placehold.co/800x500/jpg?text=Tienda+Online',
    badge: 'Plus',
    badgeIcon: 'bi bi-cart3',
    meta: [
      { text: 'Productos ilimitados', icon: 'bi bi-box' },
      { text: '6-8 semanas', icon: 'bi bi-clock' }
    ],
    features: [
      { text: 'WooCommerce o Laravel', icon: 'bi bi-check2-circle' },
      { text: 'Pasarela de pago integrada', icon: 'bi bi-check2-circle' },
      { text: 'Gestión de inventario', icon: 'bi bi-check2-circle' },
      { text: 'Soporte y mantenimiento', icon: 'bi bi-check2-circle' }
    ],
    description: 'Tienda en línea completa con carrito de compras, pasarela de pago y panel de administración.',
    ctas: [
      { label: 'Ver detalles', href: '#contact', icon: 'bi bi-list-check', variant: 'outline' },
      { label: 'Cotizar tienda', href: '#contact', icon: 'bi bi-cart3', variant: 'solid' }
    ]
  },
  {
    id: 'webapp',
    name: 'Aplicación web',
    subtitle: 'Sistemas personalizados a tu medida',
    price: 35000,
    period: 'desde',
    image: 'https://placehold.co/800x500/jpg?text=Aplicacion+Web',
    badge: 'Enterprise',
    badgeIcon: 'bi bi-diagram-3',
    meta: [
      { text: 'Dashboard admin', icon: 'bi bi-speedometer2' },
      { text: '8+ semanas', icon: 'bi bi-clock' }
    ],
    features: [
      { text: 'CRUD personalizado', icon: 'bi bi-check2-circle' },
      { text: 'Paneles y métricas', icon: 'bi bi-check2-circle' },
      { text: 'APIs REST', icon: 'bi bi-check2-circle' },
      { text: 'Mantenimiento incluido', icon: 'bi bi-check2-circle' }
    ],
    description: 'Aplicaciones web a medida, sistemas administrativos, CRMs y dashboards con Laravel.',
    ctas: [
      { label: 'Solicitar cotización', href: '#contact', icon: 'bi bi-chat-dots', variant: 'outline' },
      { label: 'Agendar reunión', href: '#contact', icon: 'bi bi-calendar2-check', variant: 'solid' }
    ]
  }
]

</script>
