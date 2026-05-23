<template>
  <div>
    <PageNav sticky />

    <SectionPortfolio1
      id="portfolio-grid"
      scheme="default-light"
      title="Proyectos realizados"
      subtitle="Soluciones digitales que transforman negocios"
      :projects="projects1"
      :cols="3"
      align="center"
      :fluid="true"
    />

    <SectionPortfolio2
      id="portfolio-list"
      scheme="light-pink"
      title="Casos de éxito"
      subtitle="Detalles de cada proyecto realizado"
      :projects="projects2"
      align="center"
      :fluid="true"
    />

    <SectionPortfolio3
      id="portfolio-carousel"
      scheme="default-light"
      title="Nuestros trabajos"
      subtitle="Explora el portafolio de Orpot"
      :projects="projects3"
      :card-width="'320px'"
      align="center"
      :fluid="true"
    />

    <SectionPortfolio4
      id="portfolio-mosaic"
      scheme="dark-purple"
      title="Galería de proyectos"
      subtitle="Variedad de trabajos realizados"
      :projects="projects4"
      :cols="3"
      align="center"
      :fluid="true"
    />

    <SectionPortfolio5
      id="portfolio-alternate"
      scheme="default-light"
      title="Trayectoria profesional"
      subtitle="Proyectos destacados de los últimos años"
      :projects="projects5"
      :image-size="'420px'"
      align="center"
      :fluid="true"
    />

    <SectionPortfolio6
      id="portfolio-stack"
      scheme="light-pink"
      title="Explorar proyectos"
      subtitle="Selecciona para ver más detalles"
      :projects="projects6"
      align="center"
      :fluid="true"
    />

    <SectionPortfolio7
      id="portfolio-minimal"
      scheme="default-light"
      title="Portfolio minimalista"
      subtitle="Diseño limpio y funcional"
      :projects="projects7"
      :cols="4"
      align="center"
      :fluid="true"
    />

    <SectionPortfolio8
      id="portfolio-split"
      scheme="default-light"
      title="Proyectos por área"
      subtitle="Cada proyecto adaptado a sus necesidades"
      :projects="projects8"
      align="center"
      :fluid="true"
    />

    <SectionPortfolio9
      id="portfolio-hero"
      scheme="light-purple"
      title="Proyecto destacado"
      subtitle="Nuestro trabajo más reciente"
      :featured="featuredProject"
      :projects="projects9"
      align="center"
      :fluid="true"
    />

    <SectionPortfolio10
      id="portfolio-expand"
      scheme="default-dark"
      title="Hover para explorar"
      subtitle="Interacciona con cada proyecto"
      :projects="projects10"
      :cols="3"
      align="center"
      :fluid="true"
    />
  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionPortfolio1 from '@/sections/portfolio/SectionPortfolio1.vue'
import SectionPortfolio2 from '@/sections/portfolio/SectionPortfolio2.vue'
import SectionPortfolio3 from '@/sections/portfolio/SectionPortfolio3.vue'
import SectionPortfolio4 from '@/sections/portfolio/SectionPortfolio4.vue'
import SectionPortfolio5 from '@/sections/portfolio/SectionPortfolio5.vue'
import SectionPortfolio6 from '@/sections/portfolio/SectionPortfolio6.vue'
import SectionPortfolio7 from '@/sections/portfolio/SectionPortfolio7.vue'
import SectionPortfolio8 from '@/sections/portfolio/SectionPortfolio8.vue'
import SectionPortfolio9 from '@/sections/portfolio/SectionPortfolio9.vue'
import SectionPortfolio10 from '@/sections/portfolio/SectionPortfolio10.vue'

const projects1 = [
  {
    title: 'Ecommerce TechStore',
    category: 'Tienda online',
    year: '2024',
    client: 'TechStore MX',
    description: 'Plataforma de ventas con más de 5,000 productos, pasarela de pago y gestión de inventario.',
    image: 'https://placehold.co/600x450/jpg?text=TechStore',
    tags: ['Vue 3', 'Laravel', 'Stripe'],
    cta: { label: 'Ver caso', href: '#', icon: 'bi bi-arrow-right', variant: 'solid' }
  },
  {
    title: 'Dashboard Analytics',
    category: 'Aplicación web',
    year: '2024',
    client: 'DataCorp',
    description: 'Sistema de visualización de datos en tiempo real con gráficos interactivos.',
    image: 'https://placehold.co/600x450/jpg?text=Dashboard',
    tags: ['React', 'D3.js', 'Node.js'],
    cta: { label: 'Ver caso', href: '#', icon: 'bi bi-arrow-right', variant: 'outline' }
  },
  {
    title: 'Portal Corporativo',
    category: 'Sitio web',
    year: '2023',
    client: 'Grupo Ventures',
    description: 'Sitio institucional con más de 50 páginas y sistema de gestión de contenidos.',
    image: 'https://placehold.co/600x450/jpg?text=Portal',
    tags: ['WordPress', 'PHP', 'MySQL'],
    cta: { label: 'Ver caso', href: '#', icon: 'bi bi-arrow-right', variant: 'outline' }
  }
]

const projects2 = [
  {
    title: 'App de deliveries',
    category: 'Aplicación móvil',
    year: '2024',
    client: 'FastDelivery SA',
    description: 'Aplicación móvil para pedidos con geolocalización, tracking en tiempo real y pagos integrado.',
    image: 'https://placehold.co/800x500/jpg?text=Delivery',
    tags: ['React Native', 'Firebase', 'Maps API'],
    featured: true,
    cta: { label: 'Conocer más', href: '#', icon: 'bi bi-arrow-right', variant: 'solid' }
  },
  {
    title: 'Plataforma educativa',
    category: 'E-learning',
    year: '2023',
    client: 'LearnHub',
    description: 'Sistema de cursos online con video streaming, evaluaciones y certificados automáticos.',
    image: 'https://placehold.co/800x500/jpg?text=Educativa',
    tags: ['Vue 3', 'Laravel', 'AWS'],
    cta: { label: 'Explorar', href: '#', icon: 'bi bi-play-circle', variant: 'outline' }
  }
]

const projects3 = [
  { title: 'Rediseño web', category: 'UX/UI', year: '2024', client: 'Moda Fashion', image: 'https://placehold.co/400x300/jpg?text=Moda' },
  { title: 'Sistema ERP', category: 'Software', year: '2024', client: 'Industrias ABC', image: 'https://placehold.co/400x300/jpg?text=ERP' },
  { title: 'App bancaria', category: 'Fintech', year: '2023', client: 'Banco Fácil', image: 'https://placehold.co/400x300/jpg?text=Banco' },
  { title: 'Booking hotels', category: 'Turismo', year: '2023', client: 'TravelPlus', image: 'https://placehold.co/400x300/jpg?text=Travel' },
  { title: 'CRM a medida', category: 'Software', year: '2023', client: 'VentasPro', image: 'https://placehold.co/400x300/jpg?text=CRM' },
]

const projects4 = [
  { title: 'Restaurant App', category: 'Food', year: '2024', client: 'El Paladar', description: 'Sistema de pedidos online y reservas.', image: 'https://placehold.co/800x800/jpg?text=Restaurant', size: 'large' },
  { title: 'Fitness Tracker', category: 'Salud', year: '2024', client: 'GymPro', description: 'App de seguimiento de entrenamientos.', image: 'https://placehold.co/400x400/jpg?text=Fitness' },
  { title: 'Real Estate', category: 'Inmuebles', year: '2023', client: 'InmueblesPlus', description: 'Portal de búsqueda de propiedades.', image: 'https://placehold.co/400x400/jpg?text=RealEstate', size: 'tall' },
  { title: 'Pet Shop', category: 'Mascotas', year: '2023', client: 'Mascotilandia', description: 'Tienda online para productos PET.', image: 'https://placehold.co/400x400/jpg?text=Petshop' },
  { title: 'Agency Site', category: 'Marketing', year: '2023', client: 'CreativeLab', description: 'Sitio corporativo creativo.', image: 'https://placehold.co/400x400/jpg?text=Agency' },
]

const projects5 = [
  {
    title: 'Rediseño de plataforma de comercio electrónico',
    category: 'Ecommerce',
    year: '2024',
    client: 'Fashion District',
    description: 'Migración y rediseño completo de tienda online con aumento del 150% en conversiones.',
    image: 'https://placehold.co/500x500/jpg?text=Fashion',
    tags: ['Vue 3', 'Nuxt', 'Stripe', 'SEO'],
    cta: { label: 'Ver proyecto', href: '#', icon: 'bi bi-box-arrow-up-right', variant: 'solid' }
  },
  {
    title: 'Sistema de gestión hospitalaria',
    category: 'Healthcare',
    year: '2023',
    client: 'Clínica San José',
    description: 'Software completo para gestión de pacientes, citas, historias clínicas y facturación.',
    image: 'https://placehold.co/500x500/jpg?text=Hospital',
    tags: ['Laravel', 'Vue 2', 'PostgreSQL'],
    cta: { label: 'Conocer más', href: '#', icon: 'bi bi-heart-pulse', variant: 'outline' }
  },
  {
    title: 'App de reservas para restaurantes',
    category: 'Food Tech',
    year: '2023',
    client: 'ReservaYa',
    description: 'Aplicación que conecta restaurantes con comensales para reservas en tiempo real.',
    image: 'https://placehold.co/500x500/jpg?text=Reservas',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    cta: { label: 'Ver caso', href: '#', icon: 'bi bi-calendar-check', variant: 'solid' }
  }
]

const projects6 = [
  { title: 'Ecommerce TechStore', category: 'Tienda online', year: '2024', client: 'TechStore MX', image: 'https://placehold.co/100x100/jpg?text=TS' },
  { title: 'Dashboard Analytics', category: 'Analytics', year: '2024', client: 'DataCorp', image: 'https://placehold.co/100x100/jpg?text=DC' },
  { title: 'Portal Corporativo', category: 'Web', year: '2023', client: 'Grupo Ventures', image: 'https://placehold.co/100x100/jpg?text=GV' },
  { title: 'App de deliveries', category: 'Mobile', year: '2024', client: 'FastDelivery', image: 'https://placehold.co/100x100/jpg?text=FD' },
  { title: 'Plataforma educativa', category: 'E-learning', year: '2023', client: 'LearnHub', image: 'https://placehold.co/100x100/jpg?text=LH' },
  { title: 'Sistema ERP', category: 'Software', year: '2024', client: 'Industrias ABC', image: 'https://placehold.co/100x100/jpg?text=ABC' },
]

const projects7 = [
  { title: 'Webinar Pro', category: '2024', year: 'Plataforma', client: 'GoWebinar', image: 'https://placehold.co/400x300/jpg?text=Webinar' },
  { title: 'Crypto Wallet', category: '2024', year: 'Fintech', client: 'CryptoSafe', image: 'https://placehold.co/400x300/jpg?text=Crypto' },
  { title: 'Task Manager', category: '2023', year: 'SaaS', client: 'TaskFlow', image: 'https://placehold.co/400x300/jpg?text=Task' },
  { title: 'Fitness App', category: '2023', year: 'Mobile', client: 'FitLife', image: 'https://placehold.co/400x300/jpg?text=Fitness' },
]

const projects8 = [
  {
    title: 'Rediseño de marca completa',
    category: 'Branding',
    year: '2024',
    client: 'Café Origen',
    description: 'Nueva identidad visual, packaging y sitio web para cadena de cafeterías artesanales.',
    image: 'https://placehold.co/600x500/jpg?text=Cafe',
    tags: ['Branding', 'Web', 'UX/UI'],
    cta: { label: 'Ver caso', href: '#', variant: 'solid' }
  },
  {
    title: 'Plataforma de crowdfunding',
    category: 'Fintech',
    year: '2024',
    client: 'Fondea',
    description: 'Plataforma para financiar proyectos creativos con pagos integrados y gestión de recompensas.',
    image: 'https://placehold.co/600x500/jpg?text=Crowdfunding',
    tags: ['Vue 3', 'Node.js', 'Stripe'],
    cta: { label: 'Ver caso', href: '#', variant: 'outline' }
  }
]

const featuredProject = {
  title: 'Transformación digital de Cadena Hotelera',
  category: 'Hospitality',
  year: '2024',
  client: 'Hoteles Vista',
  description: 'Sistema integral de reservas, gestión de habitaciones, punto de venta y app para huéspedes. Implementamos una solución que redujo costos operativos en 35% y aumentó reservas directas en un 80%.',
  image: 'https://placehold.co/800x600/jpg?text=Hoteles',
  tags: ['Laravel', 'Vue 3', 'PWA', 'AWS', 'Stripe'],
  cta: { label: 'Ver caso completo', href: '#', icon: 'bi bi-building', variant: 'solid' }
}

const projects9 = [
  { title: 'App de livraison', image: 'https://placehold.co/300x200/jpg?text=Livraison' },
  { title: 'Marketplace local', image: 'https://placehold.co/300x200/jpg?text=Marketplace' },
  { title: 'Sistema de routing', image: 'https://placehold.co/300x200/jpg?text=Routing' },
  { title: 'CRM de ventas', image: 'https://placehold.co/300x200/jpg?text=CRM' },
]

const projects10 = [
  {
    title: 'Ecommerce de moda',
    category: 'Ecommerce',
    year: '2024',
    client: 'StyleHub',
    description: 'Tienda online con más de 10,000 productos, filtros avanzados y recomendaciones personalizadas.',
    image: 'https://placehold.co/600x450/jpg?text=Moda',
    tags: ['Vue 3', 'Laravel', 'IA'],
    cta: { label: 'Visitar', href: '#', variant: 'outline' }
  },
  {
    title: 'Plataforma de telemedicina',
    category: 'Healthtech',
    year: '2024',
    client: 'MediConnect',
    description: 'Sistema de videoconsultas, prescripciones digitales y gestión de pacientes.',
    image: 'https://placehold.co/600x450/jpg?text=Telehealth',
    tags: ['React', 'WebRTC', 'Node.js'],
    cta: { label: 'Visitar', href: '#', variant: 'outline' }
  },
  {
    title: 'Dashboard inmobiliario',
    category: 'PropTech',
    year: '2023',
    client: 'Propiedades MX',
    description: 'Visualización de datos de mercado, valoración automática y gestión de carteras.',
    image: 'https://placehold.co/600x450/jpg?text=Proptech',
    tags: ['Vue 3', 'D3.js', 'Laravel'],
    cta: { label: 'Visitar', href: '#', variant: 'outline' }
  }
]
</script>