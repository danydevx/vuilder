<!-- src/pages/Index.vue -->
<template>
  <div>

    <SectionHero
      scheme="default-light"
      phrase="Transformamos tus ideas en experiencias web"
      :names="['Orpot', 'Diseño y Desarrollo']"
      background-img="https://placehold.co/1920x1080/jpg?text=Orpot+Desarrollo+Web"
      hero-image="https://placehold.co/500x500/jpg?text=Orpot"
      next-target="#section-services"
      :parallax="true"
      :parallax-strength="0.5"
      bottom-texture-img="https://placehold.co/1600x400/png?text=Web+Design"
    />

    <SectionServices
      scheme="default-light"
      title="Nuestros servicios"
      intro="Soluciones web completas para tu negocio"
      :featured-services="featuredServices"
      :other-services="otherServices"
      other-title="Más servicios"
      :featured-columns-md="3"
      :featured-columns-lg="3"
      :compact-columns-md="3"
      :compact-columns-lg="4"
      @cta:click="onServiceCta"
    />

    <SectionPackages
      scheme="default-light"
      title="Planes y precios"
      intro="Elige el plan que mejor se adapte a tu proyecto"
      footnote="Precios en pesos mexicanos. Incluye diseño, desarrollo y soporte básico."
      :columns-md="2"
      :columns-lg="3"
      :packages="packages"
      @cta:click="onPackageCta"
    />

    <SectionGallery
      scheme="default-light"
      title="Proyectos realizados"
      intro="Algunos de nuestros trabajos recientes"
      :tags="['Portfolio', 'Proyectos', 'Trabajos']"
      :metaInfo="[
        { icon: 'bi bi-geo-alt', text: 'Guadalajara, Jalisco' },
        { icon: 'bi bi-briefcase', text: '10+ años de experiencia' }
      ]"
      :images="galleryImages"
      :initialCount="6"
      :showLoadMore="true"
    />

    <SectionFAQ
      scheme="default-light"
      title="Preguntas frecuentes"
      intro="Resolvemos las dudas más comunes sobre nuestros servicios"
      :tags="['FAQ', 'Ayuda']"
      :meta-info="[
        { icon: 'bi bi-clock', text: 'Respuesta en menos de 24h' },
        { icon: 'bi bi-headset', text: 'Soporte incluido' }
      ]"
      :faqs="faqs"
    />

    <SectionTestimonials
      scheme="default-light"
      title="Lo que dicen nuestros clientes"
      intro="Experiencias de empresas que confían en Orpot"
      :testimonials="testimonials"
    />

    <SectionCalendar
      scheme="default-light"
      id="consulta"
      kicker="Agenda tu consulta"
      title="¿Listo para tu proyecto web?"
      subtitle="Reserva una llamada para conocerte y discutir tu proyecto"
      background-img="https://placehold.co/1200x800/jpg?text=Orpot+Oficina"
      side-img="https://placehold.co/1200x800/jpg?text=Reunión"
      side-alt="Reunión de trabajo"
      eventDate="2026-06-15T10:00:00-06:00"
      :icsData="{
        title: 'Consulta Orpot - Proyecto Web',
        description: 'Reunión para discutir proyecto de desarrollo web.',
        location: 'Oficina Orpot - Guadalajara',
        start: '2026-06-15T10:00:00-06:00',
        end: '2026-06-15T11:00:00-06:00'
      }"
      icsFilename="consulta-orpot.ics"
    />

    <SectionCallUs
      scheme="default-light"
      title="¿Listo para empezar?"
      intro="Contáctanos por el medio que prefieras y cotiza tu proyecto"
      phone="+523311234567"
      whatsapp="523311234567"
      email="hola@orpot.com"
    />

    <SectionSocial
      id="contacto"
      title="Síguenos"
      subtitle="Mantente al día con nuestros últimos proyectos y servicios"
      :tags="['Redes', 'Social', 'Orpot']"
      :meta-info="[
        { icon: 'bi bi-hand-thumbs-up', text: 'Contenido exclusivo' },
        { icon: 'bi bi-share', text: 'Comparte con amigos' }
      ]"
      scheme="default-light"
      hashtag="OrpotWeb"
      :links="[
        {
          name: 'Instagram',
          icon: 'bi-instagram',
          url: 'https://instagram.com/orpot',
          ariaLabel: 'Síguenos en Instagram'
        },
        {
          name: 'Facebook',
          icon: 'bi-facebook',
          url: 'https://facebook.com/orpot',
          ariaLabel: 'Síguenos en Facebook'
        },
        {
          name: 'TikTok',
          icon: 'bi-tiktok',
          url: 'https://tiktok.com/@orpot',
          ariaLabel: 'Síguenos en TikTok'
        },
        {
          name: 'WhatsApp',
          icon: 'bi-whatsapp',
          url: 'https://wa.me/523311234567?text=Hola%20Orpot',
          ariaLabel: 'Escríbenos por WhatsApp'
        },
        {
          name: 'LinkedIn',
          icon: 'bi-linkedin',
          url: 'https://linkedin.com/company/orpot',
          ariaLabel: 'Síguenos en LinkedIn'
        }
      ]"
    />

    <SectionThankYou
      scheme="default-light"
      title="¡Gracias por tu interés!"
      subtitle="En Orpot estamos listos para ayudarte con tu proyecto web"
      message="Cada proyecto es una oportunidad para crear algo excepcional. ¡Nous encanta trabajar con empresas que buscan crecer!"
      footer="Escríbenos y te responderemos en menos de 24 horas."
      :actions="[
        { label: 'Ver paquetes', href: '#section-packages', icon: 'bi bi-bag', variant: 'solid' },
        { label: 'Escríbenos por WhatsApp', href: 'https://wa.me/523311234567', icon: 'bi bi-whatsapp', variant: 'outline' }
      ]"
      @action:click="(a) => console.log('Action clicked:', a)"
    />

  </div>
</template>

<script setup>

import SectionHero from '@/sections/terrazas/hero/SectionHero.vue'
import SectionServices from '@/sections/terrazas/SectionServices.vue'
import SectionServicesChips from '@/sections/terrazas/SectionServicesChips.vue'
import SectionPackages from '@/sections/terrazas/SectionPackages.vue'
import SectionGallery from '@/sections/terrazas/SectionGallery.vue'
import SectionFAQ from '@/sections/terrazas/SectionFaqs.vue'
import SectionTestimonials from '@/sections/terrazas/SectionTestimonials.vue'
import SectionCalendar from '@/sections/terrazas/SectionCalendar.vue'
import SectionCallUs from '@/sections/terrazas/SectionCallUs.vue'
import SectionWhatsappForm from '@/sections/terrazas/SectionWhatsappForm.vue'
import SectionSocial from '@/sections/terrazas/SectionSocial.vue'
import SectionThankYou from '@/sections/terrazas/SectionThankYou.vue'
import SectionVideo from '@/sections/terrazas/SectionVideo.vue'
import SectionExtras from '@/sections/terrazas/SectionExtras.vue'

const onServiceCta = ({ service, cta }) => {
  console.log('Service CTA:', service?.title, cta?.label)
}
const onPackageCta = ({ pkg, cta }) => {
  console.log('Package CTA clicked:', pkg.name, cta.label)
}

const packages = [
  {
    id: 'landing',
    name: 'Landing page',
    subtitle: 'Ideal para proyectos rápidos',
    price: 8000,
    period: 'proyecto',
    image: 'https://placehold.co/800x500/jpg?text=Landing',
    badge: 'Más popular',
    badgeIcon: 'bi bi-rocket',
    meta: [
      { text: '2-3 semanas', icon: 'bi bi-clock' },
      { text: '1 página', icon: 'bi bi-file-earmark' },
    ],
    features: [
      { text: 'Diseño personalizado', icon: 'bi bi-check2-circle' },
      { text: 'Responsivo', icon: 'bi bi-check2-circle' },
      { text: 'SEO básico', icon: 'bi bi-check2-circle' },
    ],
    description: 'Perfecta para captar leads y dar a conocer tu negocio.',
    ctas: [
      { label: 'Ver detalles', href: '#contact', icon: 'bi bi-list-check', variant: 'outline' },
      { label: 'Cotizar', href: '#contact', icon: 'bi bi-calendar2-check', variant: 'solid' }
    ]
  },
  {
    id: 'corporativo',
    name: 'Sitio corporativo',
    subtitle: 'Para presencia profesional',
    price: 15000,
    period: 'proyecto',
    image: 'https://placehold.co/800x500/jpg?text=Corporativo',
    featured: true,
    meta: [
      { text: '4-6 semanas', icon: 'bi bi-clock' },
      { text: '5-10 páginas', icon: 'bi bi-files' },
    ],
    features: [
      { text: 'WordPress / ProcessWire', icon: 'bi bi-wordpress' },
      { text: 'Panel administrable', icon: 'bi bi-gear' },
      { text: 'SSL incluido', icon: 'bi bi-shield-lock' },
    ],
    description: 'La mejor opción para empresas que necesitan una presencia web completa.',
    ctas: [
      { label: 'Ver detalles', href: '#contact', icon: 'bi bi-list-check', variant: 'outline' },
      { label: 'Cotizar', href: '#contact', icon: 'bi bi-calendar2-check', variant: 'solid' }
    ]
  },
  {
    id: 'ecommerce',
    name: 'Tienda en línea',
    subtitle: 'Para vender tus productos',
    price: 25000,
    period: 'proyecto',
    image: 'https://placehold.co/800x500/jpg?text=Ecommerce',
    badge: 'Recomendado',
    badgeIcon: 'bi bi-cart3',
    meta: [
      { text: '6-10 semanas', icon: 'bi bi-clock' },
      { text: 'Catalogo ilimitado', icon: 'bi bi-database' },
    ],
    features: [
      { text: 'WooCommerce', icon: 'bi bi-cart3' },
      { text: 'Pasarela de pago', icon: 'bi bi-credit-card' },
      { text: 'Inventario y pedidos', icon: 'bi bi-box-seam' },
    ],
    description: 'Tu tienda online lista para recibir pagos y gestionar envíos.',
    ctas: [
      { label: 'Solicitar cotización', href: '#contact', icon: 'bi bi-currency-dollar', variant: 'solid' }
    ]
  },
  {
    id: 'webapp',
    name: 'Aplicación web',
    subtitle: 'Para proyectos complejos',
    price: 35000,
    period: 'proyecto',
    image: 'https://placehold.co/800x500/jpg?text=WebApp',
    badge: 'Enterprise',
    badgeIcon: 'bi bi-grid-3x3',
    meta: [
      { text: '8-12 semanas', icon: 'bi bi-clock' },
      { text: 'Dashboards y CRUDs', icon: 'bi bi-gear' },
    ],
    features: [
      { text: 'Laravel / PHP', icon: 'bi bi-code-square' },
      { text: 'Panel administrativo', icon: 'bi bi-sliders' },
      { text: 'APIs personalizadas', icon: 'bi bi-plug' },
    ],
    description: 'Sistemas web a medida para automatizar procesos de tu negocio.',
    ctas: [
      { label: 'Solicitar cotización', href: '#contact', icon: 'bi bi-currency-dollar', variant: 'solid' }
    ]
  }
]

const featuredServices = [
  { title: 'WordPress / WooCommerce', text: 'Themes, plugins y tiendas online con WooCommerce.' },
  { title: 'Drupal / ProcessWire', subtitle: 'CMs robustos', text: 'Módulos, templates y migraciones.' },
  { title: 'Laravel', text: 'Aplicaciones web a medida con framework PHP moderno.' },
  { title: 'Ecommerce', text: 'Tiendas en línea completas con gestión de productos.' },
  { title: 'SEO y posicionamiento', text: 'Optimización para que tu sitio aparezca en Google.' },
  { title: 'Hosting y soporte', text: 'Hosting SSD, certificados SSL y soporte técnico continuo.' },
]

const otherServices = [
  { title: 'Diseño UX/UI' },
  { title: 'Landing pages' },
  { title: 'Integración de APIs' },
  { title: 'Dashboards admin' },
  { title: 'Mantenimiento' },
  { title: 'Optimización de velocidad' },
  { title: 'SSL y seguridad' },
  { title: 'Responsive design' },
  { title: 'Formularios de contacto' },
  { title: 'Pasarelas de pago' },
]

const faqs = [
  { q: '¿Cuánto cuesta un sitio web?', a: 'Depende de la complejidad. Una landing page inicia desde $8,000 MXN, un sitio corporativo desde $15,000 y una tienda en línea desde $25,000.' },
  { q: '¿Cuánto tiempo toma desarrollar un proyecto?', a: 'Una landing toma 2-3 semanas, un sitio corporativo 4-6 semanas y una tienda en línea 6-10 semanas aproximadamente.' },
  { q: '¿Ofrecen hosting?', a: 'Sí, manejamos hosting SSD con SSL incluido, cPanel y respaldos automáticos desde $199 MXN mensuales.' },
  { q: '¿Pueden trabajar con mi hosting existente?', a: 'Sí, podemos configurar y optimizar tu proyecto en cualquier hosting que tengas.' },
  { q: '¿Qué tecnologías usan?', a: 'Trabajamos con WordPress, WooCommerce, Drupal, ProcessWire, Laravel, PHP, JavaScript y Bootstrap.' },
  { q: '¿Incluyen SEO?', a: 'Todos nuestros proyectos incluyen SEO básico técnico. Para estrategias completas de posicionamiento cobramos aparte.' },
  { q: '¿Dan soporte después de entregar?', a: 'Sí, ofrecemos planes de soporte mensual que incluyen actualizaciones, optimización y atención a incidentes.' },
  { q: '¿Pueden hacer una tienda como Shopify?', a: 'Sí, con WooCommerce podemos crear tiendas igual de potentes que Shopify, con menor costo de plataforma.' },
  { q: '¿Qué incluye el desarrollo de una landing page?', a: 'Diseño personalizado, responsivo, SEO básico, formulario de contacto e integración con WhatsApp.' },
  { q: '¿Hacemos el diseño desde cero o usan plantillas?', a: 'Creamos diseños desde cero según tus necesidades. No usamos templates pre-hechos.' }
]

const galleryImages = [
  { src: 'https://placehold.co/1200x800/jpg?text=Sitio+Corporativo', caption: 'Sitio corporativo' },
  { src: 'https://placehold.co/1200x800/jpg?text=Tienda+WooCommerce', caption: 'Tienda WooCommerce' },
  { src: 'https://placehold.co/1200x800/jpg?text=Landing+Page', caption: 'Landing page' },
  { src: 'https://placehold.co/1200x800/jpg?text=Panel+Admin', caption: 'Panel administrativo' },
  { src: 'https://placehold.co/1200x800/jpg?text=Proyecto+Web', caption: 'Proyecto web' },
  { src: 'https://placehold.co/1200x800/jpg?text= Drupal+Site', caption: 'Sitio Drupal' },
  { src: 'https://placehold.co/1200x800/jpg?text=ProcessWire', caption: 'Sitio ProcessWire' },
  { src: 'https://placehold.co/1200x800/jpg?text=Web+App', caption: 'Aplicación web' },
  { src: 'https://placehold.co/1200x800/jpg?text=Ecommerce+Setup', caption: 'Configuración ecommerce' },
]

const testimonials = [
  {
    name: 'Roberto Mendoza',
    role: 'CEO, TechSolutions',
    avatar: 'https://placehold.co/100x100/jpg?text=R',
    text: 'Un trabajo excelente. Nuestro nuevo sitio aumentó nuestras ventas en un 40%.',
    stars: 5
  },
  {
    name: 'Laura González',
    role: 'Directora de Marketing',
    avatar: 'https://placehold.co/100x100/jpg?text=L',
    text: 'Profesionalismo y calidad. El proyecto se entregó en tiempo y forma.',
    stars: 5
  },
  {
    name: 'Carlos Díaz',
    role: 'Dueño, Tienda Naturista',
    avatar: 'https://placehold.co/100x100/jpg?text=C',
    text: 'Nuestra tienda en línea funciona perfectamente. Soporte muy atento.',
    stars: 4
  }
]

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/orpot', icon: 'bi-instagram', username: 'orpot' },
  { name: 'Facebook', url: 'https://facebook.com/orpot', icon: 'bi-facebook' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@orpot', icon: 'bi-tiktok', username: 'orpot' },
  { name: 'WhatsApp', url: 'https://wa.me/523311234567?text=Hola%20Orpot', icon: 'bi-whatsapp' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/orpot', icon: 'bi-linkedin' },
]

function handleRsvpChange(payload) { console.log('RSVP change:', payload) }
function handleConfirmedYes(payload) { console.log('RSVP yes:', payload) }
function handleMaybe(payload) { console.log('RSVP maybe:', payload) }
function handleNotifiedNo(payload) { console.log('RSVP no:', payload) }

</script>
