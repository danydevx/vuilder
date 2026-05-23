<template>
  <div>

    <SectionVideo
      scheme="default-light"
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      poster="https://placehold.co/1200x800/jpg?text=Orpot+Desarrollo+Web"
      title="Nuestra experiencia"
      subtitle="Conoce cómo transformamos ideas en proyectos web exitosos"
      :autoplay="true"
      :muted="true"
      :loop="true"
      :controls="false"
      :ctas="[
        { label: 'Ver proyectos', href: '#section-gallery', icon: 'bi bi-briefcase', variant: 'solid' },
        { label: 'Agendar consulta', href: '#contact', icon: 'bi bi-calendar-check', variant: 'outline' }
      ]"
    />
    <SectionWelcome
      scheme="default-light"
      :headline="['Bienvenido a Orpot', 'Diseño y desarrollo web profesional']"
      intro="Creamos experiencias web que ayudan a empresas a crecer y alcanzar sus objetivos."
      image-src="https://placehold.co/1200x800/jpg?text=Orpot+Oficina"
      image-alt="Oficina Orpot"
      background-img="https://placehold.co/1600x1200/jpg?text=Background"
      :links="[
        { label: 'Ver servicios', href: '#section-services', icon: 'bi bi-gear', variant: 'solid' },
        { label: 'Ver paquetes', href: '#section-packages', icon: 'bi bi-bag', variant: 'outline' },
        { label: 'Contactar', href: '#contact', icon: 'bi bi-whatsapp', variant: 'ghost' }
      ]"
      align="center"
      @link:click="onWelcomeLink"
    />

    <SectionPackages
      scheme="default-light"
      title="Planes y precios"
      intro="Elige el plan que mejor se adapte a tu proyecto web"
      footnote="Precios en pesos mexicanos. Todos incluyen soporte básico y SSL."
      :columns-md="2"
      :columns-lg="3"
      :packages="packages"
      @cta:click="onPackageCta"
    />

    <SectionServices
      scheme="default-light"
      title="Servicios"
      intro="Soluciones web completas para tu negocio"
      :featured-services="featuredServices"
      :other-services="otherServices"
      other-title="Otros servicios"
      :featured-columns-md="3"
      :featured-columns-lg="3"
      :compact-columns-md="3"
      :compact-columns-lg="4"
      @cta:click="onServiceCta"
    />

    <SectionFAQ
      scheme="default-light"
      title="Preguntas frecuentes"
      intro="Resolvemos las dudas más comunes sobre nuestros servicios y proyectos."
      :faqs="faqs"
    />
    <SectionGallery
      scheme="default-light"
      title="Proyectos realizados"
      intro="Algunos de nuestros trabajos recientes en diseño y desarrollo web."
      :images="galleryImages"
      :autoplay="true"
      :autoplay-delay="3500"
    />

    <SectionTestimonials
      scheme="default-light"
      title="Lo que dicen nuestros clientes"
      intro="Experiencias de empresas que confían en Orpot para su presencia web."
      :testimonials="testimonials"
    />

    <SectionCalendar
      scheme="default-light"
      title="Agenda tu consulta"
      intro="Selecciona el día y horario para platicar sobre tu proyecto."
      :slots="['9:00 AM','11:00 AM','2:00 PM','4:00 PM']"
      @book="onBook"
    />

    <SectionCallUs
      scheme="default-light"
      title="¿Listo para tu proyecto web?"
      intro="Contáctanos directamente por el medio que prefieras."
      phone="+523311234567"
      whatsapp="523311234567"
      email="hola@orpot.com"
    />

    <SectionWhatsappForm
      scheme="default-light"
      title="Escríbenos por WhatsApp"
      subtitle="Cuéntanos sobre tu proyecto y te responderemos lo antes posible."
      phone="5213312345678"
      :max-guests="1"
    />

    <SectionSocial
      scheme="default-light"
      title="Síguenos"
      subtitle="Mantente al día con nuestros últimos proyectos"
      hashtag="OrpotWeb"
      :links="socialLinks"
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

    <SectionExtras
      scheme="default-light"
      title="Servicios adicionales"
      intro="Agrega funcionalidades extra a tu proyecto web."
      :extras="[
        { name: 'SEO avanzado', icon: 'bi-search', description: 'Estrategia completa de posicionamiento en Google.', badge: 'Popular', contact: 'hola@orpot.com' },
        { name: 'Mantenimiento mensual', icon: 'bi-tools', description: 'Actualizaciones, respaldos y soporte continuo.', contact: 'hola@orpot.com' },
        { name: 'Integración CRM', icon: 'bi-diagram-3', description: 'Conecta tu sitio con tu sistema de gestión.', badge: 'Nuevo' },
        { name: 'Capacitación', icon: 'bi-mortarboard', description: 'Capacitación completa para tu equipo.', url: 'https://wa.me/523311234567' }
      ]"
    />

    <SectionPlaceCard
      scheme="default-light"
      title="Nuestra oficina"
      venue="Orpot — Guadalajara"
      image="https://placehold.co/1280x720/jpg?text=Orpot+Oficina"
      date-text="Lunes a Viernes"
      time-text="9:00 AM - 6:00 PM"
      address="Av. Vallarta 6503, Guadalajara, Jalisco, México"
      :tags="['Oficina principal', 'Atención a clientes']"
      :meta-info="[
        { icon: 'bi bi-geo-alt', text: 'Guadalajara, Jalisco' },
        { icon: 'bi bi-envelope', text: 'hola@orpot.com' },
        { icon: 'bi bi-telephone', text: '+52 33 1123 4567' }
      ]"
      :map="{
        googleUrl: 'https://maps.google.com/?q=Orpot+Guadalajara',
        osmUrl: 'https://www.openstreetmap.org/',
        embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...'
      }"
      :ctas="[
        { label: 'Agendar cita', target: '#section-calendar' },
        { label: 'Contactar', target: '#contact' }
      ]"
    />

  </div>
</template>

<script setup>
import SectionVideo from '@/sections/terrazas/SectionVideo.vue'
import SectionWelcome from '@/sections/terrazas/SectionWelcome.vue'
import SectionPackages from '@/sections/terrazas/SectionPackages.vue'
import SectionServices from '@/sections/terrazas/SectionServices.vue'
import SectionServicesChips from '@/sections/terrazas/SectionServicesChips.vue'
import SectionGallery from '@/sections/terrazas/SectionGallery.vue'
import SectionFAQ from '@/sections/terrazas/SectionFaqs.vue'
import SectionTestimonials from '@/sections/terrazas/SectionTestimonials.vue'
import SectionCalendar from '@/sections/terrazas/SectionCalendar.vue'
import SectionCallUs from '@/sections/terrazas/SectionCallUs.vue'
import SectionWhatsappForm from '@/sections/terrazas/SectionWhatsappForm.vue'
import SectionSocial from '@/sections/terrazas/SectionSocial.vue'
import SectionThankYou from '@/sections/terrazas/SectionThankYou.vue'
import SectionExtras from '@/sections/terrazas/SectionExtras.vue'
import SectionPlaceCard from '@/sections/terrazas/SectionPlaceCard.vue'

const onWelcomeLink = (link) => {
  console.log('Welcome link clicked:', link)
}

const packages = [
  {
    id: 'landing',
    name: 'Landing page',
    subtitle: 'Ideal para proyectos rápidos',
    price: 8000,
    period: 'proyecto',
    image: 'https://placehold.co/800x500/jpg?text=Landing',
    featured: true,
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
      { text: 'Catálogo ilimitado', icon: 'bi bi-database' },
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
  }
]

const onPackageCta = ({ pkg, cta }) => {
  console.log('CTA clicked:', pkg.name, cta.label)
}

const services = [
  {
    title: 'WordPress / WooCommerce',
    text: 'Desarrollo de themes, plugins y tiendas online con WooCommerce.',
    features: ['Themes personalizados', 'Tiendas completas']
  },
  {
    title: 'Drupal / ProcessWire',
    subtitle: 'CMs robustos para proyectos escalables',
    text: 'Desarrollo de módulos, templates y migraciones.',
    meta: [{ text: 'Soporte técnico incluido', icon: 'bi bi-headset' }]
  },
  {
    title: 'Laravel',
    text: 'Aplicaciones web a medida con framework PHP moderno.',
    ctas: [{ label: 'Cotizar proyecto', href: '#contact', icon: 'bi bi-lightning', variant: 'outline' }]
  },
  {
    title: 'Ecommerce',
    text: 'Tiendas en línea completas con gestión de productos y pedidos.',
  },
  {
    title: 'SEO y posicionamiento',
    text: 'Optimización para que tu sitio aparezca en Google.',
    features: [
      { text: 'SEO técnico', icon: 'bi bi-graph-up' }
    ]
  },
  {
    title: 'Hosting y soporte',
    text: 'Hosting SSD, certificados SSL y soporte técnico continuo.',
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

const onServiceCta = ({ service, cta }) => {
  console.log('Service CTA:', service?.title, cta?.label)
}

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

const onBook = ({ date, slot }) => {
  console.log('Cita seleccionada:', date, slot)
}

const socialLinks = [
  { name: 'Instagram', icon: 'bi-instagram', url: 'https://instagram.com/orpot', cta: 'Síguenos' },
  { name: 'Facebook', icon: 'bi-facebook', url: 'https://facebook.com/orpot', cta: 'Dale like' },
  { name: 'TikTok', icon: 'bi-tiktok', url: 'https://tiktok.com/@orpot', cta: 'Videos' },
  { name: 'WhatsApp', icon: 'bi-whatsapp', url: 'https://wa.me/523311234567', cta: 'Cotizar' },
  { name: 'LinkedIn', icon: 'bi-linkedin', url: 'https://linkedin.com/company/orpot', cta: 'Perfil' }
]

const onCta = (cta) => {
  console.log('Hero CTA clicked:', cta)
}

const ctas = [
  { label: 'Ver servicios', target: '#section-services' },
  { label: 'Cotizar proyecto', target: '#contact' },
]
</script>