<!-- src/pages/Index.vue -->
<template>
  <div>
    <PageNav sticky />

  <SectionHero
  id="section-hero-diseno-web"
  scheme="default-neutral"
  title="Diseño y desarrollo web"
  icon="bi bi-laptop"
  subtitle="Creamos sitios web profesionales, responsivos y optimizados para tu negocio."
  body="En Orpot combinamos diseño visual, desarrollo frontend y backend para entregar proyectos web que convierten visitantes en clientes."
  :ctas="[
    { label: 'Ver servicios', href: '#section-services', variant: 'solid', icon: 'bi bi-grid-3x3-gap' },
    { label: 'Solicitar cotización', href: '#section-contact', variant: 'outline', icon: 'bi bi-chat-dots' }
  ]"
  :params="{
    backgrounds: [
      { image: 'https://placehold.co/1200x1600/jpg?text=Diseno+Web+1', title: 'Diseño profesional' },
      { image: 'https://placehold.co/1200x1600/jpg?text=Diseno+Web+2', title: 'Proyectos personalizados' },
      { image: 'https://placehold.co/1200x1600/jpg?text=Diseno+Web+3', title: 'Resultado final' }
    ],
    texts: [
      { text1: 'Proyectos con garantía de calidad.' },
      { text2: 'Soporte y mantenimiento incluido.' }
    ]
  }"
/>

<SectionHero1
  id="section-hero-ecommerce"
  scheme="default-neutral"
  title="Tiendas en línea"
  icon="bi bi-cart3"
  subtitle="WooCommerce, Laravel y soluciones ecommerce a medida para vender más."
  body="Implementamos tiendas en línea completas: gestión de productos, carrito de compras, pasarelas de pago y control de inventario."
  :ctas="[
    { label: 'Ver proyectos', href: '#section-portfolio', variant: 'solid', icon: 'bi bi-bag' },
    { label: 'Cotizar tienda', href: '#section-contact', variant: 'outline', icon: 'bi bi-currency-dollar' }
  ]"
  :params="{
    backgrounds: [
      { image: 'https://placehold.co/800x600/jpg?text=Ecommerce+1', title: 'Tienda WooCommerce' },
      { image: 'https://placehold.co/800x600/jpg?text=Ecommerce+2', title: 'Panel de administración' },
      { image: 'https://placehold.co/800x600/jpg?text=Ecommerce+3', title: 'Pasarela de pago' }
    ]
  }"
/>

<SectionHero2
  id="section-hero-wordpress"
  scheme="default-neutral"
  logo="https://placehold.co/400x200/png?text=Orpot+Logo"
  subtitle="WordPress, Drupal, ProcessWire y Laravel a tu medida"
  body="Desarrollamos en las tecnologías más robustas del mercado. Themes personalizados, plugins a medida, migraciones y optimizaciones."
  align="left"
  :ctas="[
    { label: 'Ver tecnologías', href: '#section-services', variant: 'solid', icon: 'bi bi-stack' },
    { label: 'Contactar', href: '#section-contact', variant: 'outline', icon: 'bi bi-geo-alt' }
  ]"
  :params="{
    background: 'https://placehold.co/1600x900/jpg?text=WordPress+Development',
    services: [
      { icon: 'bi bi-wordpress', label: 'WordPress' },
      { icon: 'bi bi-cart3', label: 'WooCommerce' },
      { icon: 'bi bi-droplet', label: 'Drupal' },
      { icon: 'bi bi-lightning-charge', label: 'Laravel' },
      { icon: 'bi bi-cpu', label: 'ProcessWire' },
      { icon: 'bi bi-database', label: 'MySQL' }
    ]
  }"
/>

<SectionHero3
  id="section-hero-seo"
  scheme="default-neutral"
  logo="https://placehold.co/400x150/png?text=Orpot+SEO"
  subtitle="Posicionamiento SEO para que te encuentren en Google"
  body="Implementamos SEO técnico, optimización de velocidad, metadatos y estrategia On Page para mejorar tu visibilidad orgánicamente."
  :ctas="[
    { label: 'Auditoría SEO', href: '#section-contact', variant: 'solid', icon: 'bi bi-search' },
    { label: 'Ver caso de éxito', href: '#section-portfolio', variant: 'outline', icon: 'bi bi-graph-up-arrow' }
  ]"
  :params="{
    backgrounds: [
      { image: 'https://placehold.co/1600x900/jpg?text=SEO+1' },
      { image: 'https://placehold.co/1600x900/jpg?text=SEO+2' },
      { image: 'https://placehold.co/1600x900/jpg?text=SEO+3' },
      { image: 'https://placehold.co/1600x900/jpg?text=SEO+4' }
    ],
    services: [
      { icon: 'bi bi-google', label: 'Google SEO' },
      { icon: 'bi bi-speedometer2', label: 'Velocidad' },
      { icon: 'bi bi-file-code', label: 'SEO Técnico' },
      { icon: 'bi bi-file-earmark-text', label: 'Metadatos' },
      { icon: 'bi bi-phone', label: 'Móvil' },
      { icon: 'bi bi-bar-chart', label: 'Analytics' },
      { icon: 'bi bi-link-45deg', label: 'Backlinks' },
      { icon: 'bi bi-trophy', label: 'Competitors' },
      { icon: 'bi bi-share', label: 'Social' },
      { icon: 'bi bi-heart', label: 'UX SEO' }
    ]
  }"
/>

<SectionHero4
  id="section-hero-hosting"
  scheme="default-neutral"
  align="center"
  logo="https://placehold.co/400x200/png?text=Orpot+Hosting"
  subtitle="Hosting SSD, SSL y cPanel incluido en todos nuestros planes"
  body="Todos nuestros proyectos incluyen hosting de alta velocidad, certificado SSL, respaldos automáticos y soporte técnico especializado."
  :ctas="[
    { label: 'Ver planes', href: '#section-services', variant: 'solid', icon: 'bi bi-server' }
  ]"
  :social-links="[
    { name: 'Instagram', icon: 'bi-instagram', url: 'https://instagram.com/orpot', cta: 'Proyectos web' },
    { name: 'Facebook', icon: 'bi-facebook', url: 'https://facebook.com/orpot', cta: 'Reseñas de clientes' },
    { name: 'TikTok', icon: 'bi-tiktok', url: 'https://tiktok.com/@orpot', cta: 'Tutoriales rápidos' },
    { name: 'WhatsApp', icon: 'bi-whatsapp', url: 'https://wa.me/5215512345678', cta: 'Cotización directa' },
    { name: 'YouTube', icon: 'bi-youtube', url: 'https://youtube.com/@orpot', cta: 'Demo de proyectos' }
  ]"
  :params="{
    background: 'https://placehold.co/1600x900/jpg?text=Hosting+Server'
  }"
/>
<SectionHero5
  id="section-hero-proyectos"
  scheme="default-neutral"
  logo="https://placehold.co/400x200/png?text=Orpot+Proyectos"
  :show-dots="true"
  :show-arrows="true"
  :delay="6000"
  :slides="[
    {
      image: 'https://placehold.co/1600x900/jpg?text=Sitios+Web',
      text: 'Sitios web profesionales',
      subtext: 'Diseño responsivo y optimización SEO',
      ctas: [
        { label: 'Ver proyectos', href: '#section-portfolio', variant: 'solid', icon: 'bi bi-bag' },
        { label: 'Cotizar', href: '#section-contact', variant: 'outline', icon: 'bi bi-chat-dots' }
      ]
    },
    {
      image: 'https://placehold.co/1600x900/jpg?text=Tiendas+Online',
      text: 'Tiendas en línea',
      subtext: 'WooCommerce y Laravel para ecommerce potente',
      ctas: [
        { label: 'Ver tiendas', href: '#section-portfolio', variant: 'solid', icon: 'bi bi-cart3' }
      ]
    },
    {
      image: 'https://placehold.co/1600x900/jpg?text=Soporte+Tecnico',
      text: 'Soporte y mantenimiento',
      subtext: 'Actualizaciones, optimización y copias de seguridad',
      ctas: [
        { label: 'Ver planes', href: '#section-services', variant: 'solid', icon: 'bi bi-headset' }
      ]
    }
  ]"
/>

<SectionHero6
  id="section-hero-video-banner"
  scheme="default-neutral"
  title="Proyectos web que convierten"
  subtitle="Diseño, desarrollo y posicionamiento para tu negocio en internet"
  video-src="https://www.w3schools.com/html/mov_bbb.mp4"
  :background-images="[
    'https://placehold.co/1600x900/jpg?text=Proyecto+1',
    'https://placehold.co/1600x900/jpg?text=Proyecto+2',
    'https://placehold.co/1600x900/jpg?text=Proyecto+3'
  ]"
  :ctas="[
    { label: 'Ver proyectos', href: '#section-portfolio', variant: 'solid', icon: 'bi bi-bag' },
    { label: 'Contactar', href: '#section-contact', variant: 'outline', icon: 'bi bi-chat-dots' }
  ]"
  :interval="5000"
/>

<SectionHero7
  id="section-hero-video-bg"
  scheme="default-neutral"
  align="center"
  title="Tu proyecto web en las mejores manos"
  subtitle="Diseño profesional, desarrollo robusto y soporte continuo"
  video-src="https://www.w3schools.com/html/mov_bbb.mp4"
  poster="https://placehold.co/1600x900/jpg?text=Orpot+Desarrollo"
  :ctas="[
    { label: 'Solicitar cotización', href: '#section-contact', variant: 'solid', icon: 'bi bi-chat-dots' },
    { label: 'Ver servicios', href: '#section-services', variant: 'outline', icon: 'bi bi-grid-3x3-gap' }
  ]"
/>

<SectionHero8
  id="section-hero-gallery"
  scheme="default-neutral"
  gallery-name="orpot-gallery"
  :show-dots="false"
  :show-arrows="true"
  :autoplay="true"
  :delay="5000"
  :gallery="[
    {
      image: 'https://placehold.co/600x1200/jpg?text=Sitio+Corporativo',
      thumb: 'https://placehold.co/600x1400/jpg?text=Sitio+Corporativo',
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
      image: 'https://placehold.co/1200x800/jpg?text=Sistema+Admin',
      thumb: 'https://placehold.co/600x400/jpg?text=Sistema+Admin',
      title: 'Panel administrativo',
      subtitle: 'Laravel + dashboard personalizado'
    },
    {
      image: 'https://placehold.co/1200x800/jpg?text=Landing+Page',
      thumb: 'https://placehold.co/600x400/jpg?text=Landing+Page',
      title: 'Landing page SEO',
      subtitle: 'Optimizada para Google Ads'
    },
    {
      image: 'https://placehold.co/1200x800/jpg?text=Migracion+Drupal',
      thumb: 'https://placehold.co/600x400/jpg?text=Migracion+Drupal',
      title: 'Migración Drupal',
      subtitle: 'De Drupal 7 a Drupal 10'
    }
    ,
    {
      image: 'https://placehold.co/1200x800/jpg?text=Blog+WordPress',
      thumb: 'https://placehold.co/600x400/jpg?text=Blog+WordPress',
      title: 'Blog WordPress',
      subtitle: 'Theme + optimización SEO'
    }
    ,
    {
      image: 'https://placehold.co/1200x800/jpg?text=Ecommerce+Laravel',
      thumb: 'https://placehold.co/600x400/jpg?text=Ecommerce+Laravel',
      title: 'Ecommerce Laravel',
      subtitle: 'Carrito + Stripe + inventario'
    }
    ,
    {
      image: 'https://placehold.co/1200x800/jpg?text=Portal+Empresas',
      thumb: 'https://placehold.co/600x400/jpg?text=Portal+Empresas',
      title: 'Portal empresarial',
      subtitle: 'CRM + panel de métricas'
    }
  ]"
 />




  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionHero from '@/sections/hero/SectionHero.vue'
import SectionHero1 from '@/sections/hero/SectionHero1.vue'
import SectionHero2 from '@/sections/hero/SectionHero2.vue'
import SectionHero3 from '@/sections/hero/SectionHero3.vue'
import SectionHero4 from '@/sections/hero/SectionHero4.vue'
import SectionHero5 from '@/sections/hero/SectionHero5.vue'
import SectionHero6 from '@/sections/hero/SectionHero6.vue'
import SectionHero7 from '@/sections/hero/SectionHero7.vue'
import SectionHero8 from '@/sections/hero/SectionHero8.vue'

 const onWelcomeLink = (link) => {
  console.log('Welcome link clicked:', link)
}

const packages = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'Perfect for small gatherings',
    price: 9500,
    period: 'event',
    image: 'https://placehold.co/800x500/jpg?text=Basic',
    badge: 'Most Affordable',
    badgeIcon: 'bi bi-piggy-bank',
    meta: [
      { text: '4 hours', icon: 'bi bi-clock' },
      { text: 'Up to 60 guests', icon: 'bi bi-people' },
    ],
    features: [
      { text: 'Space rental', icon: 'bi bi-check2-circle' },
      { text: 'Basic furniture', icon: 'bi bi-check2-circle' },
      { text: 'Cleaning service', icon: 'bi bi-check2-circle' },
    ],
    description: 'Ideal for birthdays and family events.',
    ctas: [
      { label: 'See details', href: '#contact', icon: 'bi bi-list-check', variant: 'outline' },
      { label: 'Book now', href: '#contact', icon: 'bi bi-calendar2-check', variant: 'solid' }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'Balanced for most events',
    price: 15500,
    period: 'event',
    image: 'https://placehold.co/800x500/jpg?text=Premium',
    featured: true,
    meta: [
      { text: '6 hours', icon: 'bi bi-clock' },
      { text: 'Up to 100 guests', icon: 'bi bi-people' },
    ],
    features: [
      { text: 'Decor lighting', icon: 'bi bi-lightbulb' },
      { text: 'Premium furniture', icon: 'bi bi-lamp' },
      { text: 'Cleaning + staff', icon: 'bi bi-broom' },
    ],
    description: 'Our most popular package for social events.',
    ctas: [
      { label: 'See details', href: '#contact', icon: 'bi bi-list-check', variant: 'outline' },
      { label: 'Book now', href: '#contact', icon: 'bi bi-calendar2-check', variant: 'solid' }
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate',
    subtitle: 'For business events',
    price: 'From $18,000',
    period: 'event',
    image: 'https://placehold.co/800x500/jpg?text=Corporate',
    badge: 'Customizable',
    badgeIcon: 'bi bi-sliders2',
    meta: [
      { text: 'Up to 150 guests', icon: 'bi bi-people' },
      { text: 'Audio included', icon: 'bi bi-speaker' },
    ],
    features: [
      { text: 'Projector & screen', icon: 'bi bi-easel' },
      { text: 'Wi-Fi high speed', icon: 'bi bi-wifi' },
      { text: 'Staff support', icon: 'bi bi-person-gear' },
    ],
    description: 'Tailor-made solutions for conferences and launches.',
    ctas: [
      { label: 'Request quote', href: '#contact', icon: 'bi bi-currency-dollar', variant: 'solid' }
    ]
  }
]

const onPackageCta = ({ pkg, cta }) => {
  console.log('CTA clicked:', pkg.name, cta.label)
}

const services = [
  {
    title: 'Asador / Parrilla',
    text: 'Área designada para asados con parrilla segura.',
    // icon omitido -> se detecta por keywords y usa 'bi bi-fire'
    features: ['Utensilios básicos', 'Zona ventilada']
  },
  {
    title: 'Estacionamiento',
    subtitle: 'Capacidad para 20 autos',
    text: 'Acceso directo y vigilancia.',
    // icon omitido -> 'bi bi-car-front'
    meta: [{ text: 'Tarifa incluida', icon: 'bi bi-cash-coin' }]
  },
  {
    title: 'Wi-Fi',
    text: 'Conexión estable para tus invitados.',
    // icon omitido -> 'bi bi-wifi'
    ctas: [{ label: 'Solicitar clave', href: '#contact', icon: 'bi bi-key', variant: 'outline' }]
  },
  {
    title: 'Iluminación ambiental',
    text: 'Luces cálidas para crear el ambiente perfecto.',
    // icon omitido -> 'bi bi-lightbulb'
  },
  {
    title: 'Música / Audio',
    text: 'Conexión auxiliar para tu playlist.',
    // icon omitido -> 'bi bi-music-note-beamed'
    features: [
      { text: 'Volumen controlado', icon: 'bi bi-volume-up' }
    ]
  },
  {
    title: 'Seguridad',
    text: 'Personal de apoyo durante el evento.',
    // icon omitido -> 'bi bi-shield-check'
  }
]


const featuredServices = [
  { title: 'Asador / Parrilla', text: 'Área de asado con parrilla segura.' },
  { title: 'Estacionamiento', subtitle: 'Capacidad 20 autos', text: 'Acceso directo y vigilancia.' },
  { title: 'Wi-Fi', text: 'Conexión estable para tus invitados.' },
  { title: 'Iluminación ambiental', text: 'Luces cálidas para crear el mood ideal.' },
  { title: 'Música / Audio', text: 'Conexión auxiliar para tu playlist.' },
  { title: 'Seguridad', text: 'Personal de apoyo durante el evento.' },
]

const otherServices = [
  { title: 'Sillas y mesas' },
  { title: 'Sombrillas / Toldo' },
  { title: 'Baños' },
  { title: 'Decoración básica' },
  { title: 'Staff de apoyo' },
  { title: 'Extensiones eléctricas' },
  { title: 'Área techada' },
  { title: 'Vistas panorámicas' },
  { title: 'Cocineta' },
  { title: 'Bar' },
  // … agrega todos los que necesites (50+ sin problema)
]

const onServiceCta = ({ service, cta }) => {
  console.log('Service CTA:', service?.title, cta?.label)
}
const onCta = (cta) => {
  console.log('Hero CTA clicked:', cta)
}

const faqs = [
  { q: '¿Cuál es el horario de renta de la terraza?', a: 'El horario estándar es de 12:00 a 20:00 horas. Puede extenderse con costo adicional.' },
  { q: '¿Qué capacidad máxima tiene la terraza?', a: 'La capacidad máxima es de 150 personas cómodamente instaladas.' },
  { q: '¿Está permitido llevar alimentos y bebidas?', a: 'Sí, puedes traer tu propio catering y bebidas, o contratar proveedores sugeridos.' },
  { q: '¿La terraza cuenta con estacionamiento?', a: 'Sí, contamos con espacio para 20 vehículos y seguridad incluida.' },
  { q: '¿Se puede llevar música en vivo o DJ?', a: 'Sí, está permitido. El volumen debe respetar la normativa local de ruido.' },
  { q: '¿Tienen área techada en caso de lluvia?', a: 'Sí, la terraza cuenta con un área techada y opción de carpas adicionales.' },
  { q: '¿Hay restricciones para decoración?', a: 'Se permite decoración personalizada, excepto pirotecnia, fuego abierto y confeti metálico.' },
  { q: '¿Incluye mobiliario básico?', a: 'Sí, incluimos mesas, sillas y servicio de limpieza básica.' },
  { q: '¿Se requiere anticipo para reservar?', a: 'Sí, se solicita un anticipo del 30% para confirmar la fecha.' },
  { q: '¿Qué pasa si cancelo mi evento?', a: 'Las cancelaciones con más de 30 días de anticipación permiten reprogramación sin penalización.' }
]

const galleryImages = [
  { src: 'https://placehold.co/1200x800/jpg?text=Entrada', caption: 'Entrada principal' },
  { src: 'https://placehold.co/1200x800/jpg?text=Decoración', caption: 'Decoración principal' },
  { src: 'https://placehold.co/1200x800/jpg?text=Ambiente', caption: 'Ambiente nocturno' },
  { src: 'https://placehold.co/1200x800/jpg?text=Vista', caption: 'Vista panorámica' },
  { src: 'https://placehold.co/1200x800/jpg?text=Montaje', caption: 'Montaje de mesas' },
]

const testimonials = [
  {
    name: 'Carlos Ramírez',
    role: 'Boda',
    avatar: 'https://placehold.co/100x100/jpg?text=C',
    text: 'Un servicio excelente y un lugar mágico. ¡Recomendado al 100%!',
    stars: 5
  },
  {
    name: 'Fernanda López',
    role: 'XV Años',
    avatar: 'https://placehold.co/100x100/jpg?text=F',
    text: 'El montaje fue espectacular y la terraza increíble.',
    stars: 5
  },
  {
    name: 'Eduardo Díaz',
    role: 'Evento empresarial',
    avatar: 'https://placehold.co/100x100/jpg?text=E',
    text: 'Perfecto para un evento corporativo, todos quedaron fascinados.',
    stars: 4
  }
]

const onBook = ({ date, slot }) => {
  console.log('Reserva seleccionada:', date, slot)
  // Aquí luego llamas a n8n vía fetch/Axios:
  // fetch('https://mi-webhook-de-n8n', { method: 'POST', body: JSON.stringify({ date, slot }) })
}
const availableSlots = [
  '10:00 AM',
  '12:00 PM',
  '3:00 PM',
  '6:00 PM'
]

const socialLinks = [
  { name: 'Instagram', icon: 'bi-instagram', url: 'https://instagram.com/terraza', cta: 'Mira fotos de eventos' },
  { name: 'Facebook', icon: 'bi-facebook', url: 'https://facebook.com/terraza', cta: 'Lee reseñas de clientes' },
  { name: 'TikTok', icon: 'bi-tiktok', url: 'https://tiktok.com/@terraza', cta: 'Descubre videos cortos' },
  { name: 'WhatsApp', icon: 'bi-whatsapp', url: 'https://wa.me/5215512345678', cta: 'Cotización rápida' },
  { name: 'YouTube', icon: 'bi-youtube', url: 'https://youtube.com/@terraza', cta: 'Recorridos en video' }
]
 
</script>
