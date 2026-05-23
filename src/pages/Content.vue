<template>
  <div class="page-content">
    <PageNav sticky />
    <!-- Sección 1 -->
  <SectionContent1
      id="section-content-1"
      scheme="default-dark"
      title="Diseño y desarrollo web profesional"
      subtitle="Creamos sitios web, tiendas en línea y aplicaciones para hacer crecer tu negocio en México."
      align="center"
      :animate="false"
      :enableOverlay="false"
      backgroundImg="https://placehold.co/1200x600/jpg?text=Fondo+Orpot"
      :fluid="false"
      :content="content1"
      :ctas="[
        { label: 'Solicitar Cotización', href: '#contacto', icon: 'bi bi-envelope', variant: 'solid' },
        { label: 'Ver Proyectos', href: '#proyectos', icon: 'bi bi-folder', variant: 'outline' }
      ]"
    />

    <!-- Sección 2 -->
    <SectionContent2
      id="section-mission"
      scheme="default-light"
      :fluid="false"
      align="right"
      title="Soluciones digitales para tu negocio"
      :animate="true"
      order="inverted"
      :content="content2"
      :ctas="[
        { label: 'Ver proyectos', href: '#proyectos', icon: 'bi bi-folder', variant: 'solid' }
      ]"
    />

    <!-- Sección 3 -->
    <SectionContent3
      id="section-content-3"
      scheme="rose-dark"
      align="center"
      :fluid="true"
      :animate="true"
      :content="content3"
    />

    <!-- 🆕 Sección 4 -->
    <SectionContent4
      id="section-content-4"
      scheme="default-light"
      title="Todo lo que necesitas para tu presencia web"
      subtitle="Ofrecemos una solución completa para que tu negocio destaque en el mundo digital."
      align="center"
      :fluid="true"
      :animate="false"
      order="normal"
      :features="features4"
      :highlight="highlight4"
    />

    <SectionContent5
      id="section-content-5"
      scheme="default-light"
      title="Calidad, velocidad y seguridad"
      subtitle="Nuestras soluciones web están diseñadas para darte los mejores resultados."
      align="center"
      :fluid="false"
      :animate="false"
      order="normal"
      :content="content5"
    />

      <SectionContent5b
      id="section-content-5b"
      scheme="default-light"
      title="Diseño web que hace crecer tu negocio"
      subtitle="Creamos experiencias digitales únicas para empresas y profesionales en México."
      align="left"
      :fluid="false"
      order="inverted"
      :animate="true"
      :content="content5b"
    />

<SectionContent6
  id="section-content-6"
  scheme="rose-light"
  title="Tecnología moderna para tu sitio web"
  subtitle="Utilizamos las mejores herramientas y frameworks para garantir resultados excepcionales."
  align="left"
  :fluid="false"
  :animate="true"
  :content="content6"
/>

<SectionContent7
  id="section-content-7"
  scheme="default-light"
  title="Una nueva forma de crear tu presencia digital"
  subtitle="Diseñado con las mejores prácticas para impulsar tu negocio al siguiente nivel."
  align="center"
  :fluid="false"
  :animate="true"
  :content="content7"
/>
<SectionContent8
  id="section-content-8"
  scheme="default-dark"
  title="Soluciones web que impulsan tu negocio"
  subtitle="Diseñamos y desarrollamos presencia digital completa para empresas, marcas y profesionales en México."
  align="left"
  :fluid="false"
  order="inverted"

  :animate="true"
  :content="content8"
/>

<SectionContent9
  id="section-content-9"
  scheme="default-dark"
  title="Cómo trabajamos contigo"
  subtitle="Nuestro proceso es simple, transparente y centrado en resultados para tu negocio."
  align="left"
  :fluid="false"

  :animate="true"
  :content="content9"
/>

<SectionContent10
  id="section-content-10"
  scheme="default-dark"
  title="Proyectos realizados"
  align="left"
  :fluid="false"
  order="inverted"
  :animate="true"
  :content="content10"
/>

<SectionContent11
  id="section-content-11"
  scheme="default-light"
  title="Conoce nuestra plataforma en acción"
  subtitle="Descubre cómo nuestras herramientas pueden transformar tu flujo de trabajo y simplificar tus operaciones diarias."
  align="center"
  :fluid="false"
  order="inverted"
  :animate="false"
  :content="content11"
/>

<SectionContent12
  id="section-content-12"
  scheme="default-light"
  title="Diseño y desarrollo web profesional"
  subtitle="Creamos sitios web modernos, responsivos y optimizados para convertir visitantes en clientes."
  align="center"
  :fluid="false"
  order="inverted"
  :animate="false"
  :content="content12"
/>

<SectionContent13
  id="section-content-13"
  scheme="default-light"
  title="Plataformas y tecnologías que manejamos"
  subtitle="Trabajamos con las herramientas más robustas y utilizadas en la industria web actual."
  :content="content13"
  align="left"
  :fluid="false"
  order="inverted"
  :animate="true"
/>

<SectionContent14
  id="section-content-14"
  scheme="default-light"
  title="Tu puerta de entrada al mundo digital"
  subtitle="Ofrecemos soluciones completas de diseño, desarrollo y posicionamiento web para hacer crecer tu presencia en línea."
  :content="content14"
  align="left"
  :fluid="false"
  :animate="true"
  order="inverted"
  :ctas="[
    { label: 'Solicitar Cotización', href: '#contacto', icon: 'bi bi-envelope', variant: 'solid' }
  ]"
/>
<SectionContent15
  id="section-accounts"
  scheme="default-dark"
  title="Síguenos en redes sociales"
  subtitle="Mantente actualizado e inspirado uniendote a nuestra comunidad en todas las plataformas."
  backgroundImg="https://placehold.co/1200x800/jpg?text=Background"
  :enableOverlay="true"
    align="left"
   :fluid="true"
 
 
  :animate="true"
  :content="content15"
/>


<SectionContent16
  id="section-team-quote"
  scheme="default-light"
  backgroundImg="https://placehold.co/1600x900/jpg?text=Background"
  :enableOverlay="true"
  align="left"
  :fluid="false"
  order="inverted"
  :animate="true"
  :content="content16"
  title=""
  subtitle=""
/>


<SectionContent17
  id="section-services"
  scheme="default-light"
  align="left"
  :fluid="false"
  order="inverted"
  :animate="true"
  title="Las mejores soluciones de desarrollo web"
  subtitle="El poder del diseño nos ayuda a resolver problemas complejos y cultivar soluciones de negocio."
  backgroundImg="https://placehold.co/1600x900/jpg?text=Background"
  :enableOverlay="true"
  :content="content17"
/>

<SectionContent18
  id="section-achievements"
  scheme="default-dark"
  align="left"
  :fluid="false"
  order="inverted"
  :animate="true"
  title="Resultados que hablan por nosotros"
  subtitle="Brindamos ideas efectivas que hacen crecer los negocios de nuestros clientes."
  backgroundImg="https://placehold.co/1600x900/png?text=Background+Dark"
  :enableOverlay="true"
  :content="content18"
/>

<SectionContent19
  id="section-benefits"
  scheme="default-light"
  :fluid="false"
  align="center"
  :animate="true"
  title="¿Por qué elegirnos?"
  backgroundImg="https://placehold.co/1600x900/png?text=Background"
  :enableOverlay="false"
  :content="content19"
/>


<SectionContent20
  id="section-testimonials"
  scheme="default-light"
  :fluid="false"
  align="center"
  :animate="true"
  order="inverted"
  title="Nuestros clientes confían en nosotros"
  subtitle="Más de 500 empresas nos respaldan para entregar soluciones elegantes y efectivas."
  backgroundImg="https://placehold.co/1600x900/jpg?text=Testimonials+Background"
  :enableOverlay="true"
  :content="content20"
/>

<SectionContent21
  id="section-process"
  scheme="default-light"
  :content="content21"
  :fluid="false"
  align="left"
  :animate="true"
  order="inverted"
  title="Nuestro proceso de trabajo"
  subtitle="Así transformamos tu idea en una solución digital exitosa."
  backgroundImg="https://placehold.co/1600x900/jpg?text=Process+Background"
  :enableOverlay="false"
/>

<SectionContent22
  id="section-features"
  :fluid="true"
  align="left"
  :animate="true"
  order="inverted"
  scheme="default-light"
  title="Plantilla moderna con diseño limpio"
  subtitle="Una estructura flexible para interfaces modernas y elegantes."
  :content="content22"
/>

<SectionContent23
  scheme="default-dark"
  :fluid="false"
  align="center"
  :animate="true"
  order="inverted"
  title='Impulsamos tu negocio con <mark>servicios excepcionales</mark>'
  subtitle="Ayudamos a tu marca a lograr un crecimiento medible a través de estrategias modernas."
  :content="content23"
/>

 <SectionContent24
    id="about"
    scheme="scheme-rose-light"
    :content="content"
    :ctas="[
      { label: 'MORE ABOUT US', href: '#more', variant: 'link' }
    ]"
  />


  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionContent1 from '@/sections/content/SectionContent1.vue'
import SectionContent2 from '@/sections/content/SectionContent2.vue'
import SectionContent3 from '@/sections/content/SectionContent3.vue'
import SectionContent4 from '@/sections/content/SectionContent4.vue'
import SectionContent5 from '@/sections/content/SectionContent5.vue'
import SectionContent5b from '@/sections/content/SectionContent5b.vue'
import SectionContent6 from '@/sections/content/SectionContent6.vue'
import SectionContent7 from '@/sections/content/SectionContent7.vue'
import SectionContent8 from '@/sections/content/SectionContent8.vue'
import SectionContent9 from '@/sections/content/SectionContent9.vue'
import SectionContent10 from '@/sections/content/SectionContent10.vue'
import SectionContent11 from '@/sections/content/SectionContent11.vue'
import SectionContent12 from '@/sections/content/SectionContent12.vue'
import SectionContent13 from '@/sections/content/SectionContent13.vue'
import SectionContent14 from '@/sections/content/SectionContent14.vue'
import SectionContent15 from '@/sections/content/SectionContent15.vue'
import SectionContent16 from '@/sections/content/SectionContent16.vue'
import SectionContent17 from '@/sections/content/SectionContent17.vue'
import SectionContent18 from '@/sections/content/SectionContent18.vue'
import SectionContent19 from '@/sections/content/SectionContent19.vue'
import SectionContent20 from '@/sections/content/SectionContent20.vue'
import SectionContent21 from '@/sections/content/SectionContent21.vue'
import SectionContent22 from '@/sections/content/SectionContent22.vue'
import SectionContent23 from '@/sections/content/SectionContent23.vue'
import SectionContent24 from '@/sections/content/SectionContent24.vue'
/*  Constantes de contenido (solo datos, sin lógica) */
const content1 = {
  title: 'Diseño y desarrollo web en México',
  text: 'Creamos sitios web profesionales, tiendas en línea y aplicaciones web personalizadas para hacer crecer tu negocio.',
  image: 'https://placehold.co/800x600/jpg?text=Diseno+Web+Orpot',
  features: [
    {
      icon: 'bi bi-palette',
      title: 'Diseño personalizado',
      text: 'Creamos interfaces únicas que reflejan la identidad de tu marca.'
    },
    {
      icon: 'bi bi-phone',
      title: 'Resposivo',
      text: 'Tu sitio se verá perfecto en cualquier dispositivo, móvil o escritorio.'
    },
    {
      icon: 'bi bi-speed',
      title: 'Rápido',
      text: 'Optimizamos el rendimiento para que tu sitio cargue en segundos.'
    },
    {
      icon: 'bi bi-shield',
      title: 'Seguro',
      text: 'Implementamos certificados SSL y medidas de seguridad avanzadas.'
    },
    {
      icon: 'bi bi-graph-up',
      title: 'SEO optimizado',
      text: 'Posicionamos tu sitio en los primeros resultados de búsqueda.'
    },
    {
      icon: 'bi bi-headset',
      title: 'Soporte 24/7',
      text: 'Estamos siempre disponibles para ayudarte con cualquier duda.'
    }
  ]
}

const content2 = {
  headline: 'Soluciones web que transforman tu negocio',
  summary:
    'En Orpot combinamos creatividad y tecnología para crear experiencias digitales que conectan con tus clientes y generan resultados.',
  text: 'Con más de 15 años de experiencia en el mercado mexicano, hemos desarrollado soluciones web para cientos de empresas que buscan destacar en el mundo digital.',
  image: 'https://placehold.co/900x900/png?text=Equipo+Orpot'
}

const content3 = {
  headline: 'La mejor opción en desarrollo web',
  icon: 'bi bi-star-fill',
  text: 'Por la calidad de nuestro trabajo, por la rapidez en la implementación, y por la inversión accesible que ofrecemos, estamos seguros de ser la mejor opción para tu proyecto web en México.',
  footer: 'México y Latinoamérica'
}

/* Contenido para SectionContent4 */
const features4 = [
  {
    icon: 'bi bi-laptop',
    title: 'Diseño web responsivo',
    text: 'Sitios que se adaptan perfectamente a cualquier dispositivo'
  },
  {
    icon: 'bi bi-cart',
    title: 'Tiendas en línea',
    text: 'E-commerce completo con WooCommerce y pasarelas de pago'
  },
  {
    icon: 'bi bi-phone',
    title: 'Aplicaciones móviles',
    text: 'Soluciones web apps que funcionan como apps nativas'
  },
  {
    icon: 'bi bi-shield-check',
    title: 'Seguridad avanzada',
    text: 'Protección SSL, firewalls y monitoreo constante'
  },
  {
    icon: 'bi bi-graph-up',
    title: 'SEO profesional',
    text: 'Posicionamiento en buscadores para atraer más clientes'
  },
  {
    icon: 'bi bi-headset',
    title: 'Soporte 24/7',
    text: 'Asistencia técnica permanente para tu tranquilidad'
  }
]

const highlight4 = {
  title: 'Orpot',
  text: 'Tu socio en soluciones digitales',
  cta: {
    label: 'Lleva tu negocio al siguiente nivel',
    href: '#contacto'
  }
}

const content5 = {
  image: 'https://placehold.co/1200x600/png?text=Diseno+Web+Profesional',
  features: [
    {
      icon: 'bi bi-speedometer',
      title: 'Implementación rápida',
      text: 'Tu sitio listo en tiempo récord sin sacrificar calidad.'
    },
    {
      icon: 'bi bi-lightning-charge-fill',
      title: 'Rendimiento óptimo',
      text: 'Sites optimizados para cargar en menos de 3 segundos.'
    },
    {
      icon: 'bi bi-headset',
      title: 'Soporte constante',
      text: 'Equipo de soporte técnico disponible cuando lo necesites.'
    },
    {
      icon: 'bi bi-shield-lock-fill',
      title: 'Seguridad garantizada',
      text: 'Certificados SSL y protección contra amenazas digitales.'
    }
  ]
}

const content5b = {
  image: 'https://placehold.co/1000x700/jpg?text=Servicios+Orpot',
  features: [
    {
      icon: 'bi bi-palette',
      title: 'Diseño a medida',
      text: 'Creamos diseños únicos adaptados a la identidad de tu marca.'
    },
    {
      icon: 'bi bi-globe',
      title: 'Alcance global',
      text: 'Tu sitio accesible desde cualquier parte del mundo, 24/7.'
    },
    {
      icon: 'bi bi-people-fill',
      title: 'Enfoque colaborativo',
      text: 'Trabajamos de cerca contigo para asegurar los mejores resultados.'
    },
    {
      icon: 'bi bi-graph-up-arrow',
      title: 'Crecimiento medible',
      text: 'Optimiza tiempos, reduce costos y aumenta tus ventas con un sitio web profesional.'
    }
  ],
  cta: {
    label: 'Solicita tu cotización',
    href: '#contacto',
    icon: 'bi bi-chat-dots'
  }
}

const content6 = {
  image: 'https://placehold.co/900x700/jpg?text=WordPress+ WooCommerce',
  icon: 'bi bi-wordpress',
  badge: 'Tecnología moderna',
  features: [
    {
      icon: 'bi bi-speedometer2',
      title: 'Carga rápida',
      text: 'Optimizamos cada sitio para un rendimiento excepcional.'
    },
    {
      icon: 'bi bi-diagram-3',
      title: 'Escalabilidad',
      text: 'Tu sitio crece junto con tu negocio sin complicaciones.'
    },
    {
      icon: 'bi bi-bar-chart-line-fill',
      title: 'Métricas claras',
      text: 'Integración con herramientas de análisis para tomar decisiones.'
    }
  ],
  cta: {
    label: 'Conoce más sobre WordPress',
    href: '#servicios',
    icon: 'bi bi-arrow-right'
  }
}

const content7 = {
  features: [
    {
      icon: 'bi bi-palette',
      title: 'Diseño UX/UI',
      text: 'Interfaces intuitivas diseñadas para la mejor experiencia de usuario.'
    },
    {
      icon: 'bi bi-lightning-charge-fill',
      title: 'Rápido y eficiente',
      text: 'Sites optimizados para cargar en tiempo récord y posicionar en buscadores.'
    },
    {
      icon: 'bi bi-shield-lock',
      title: 'Seguridad robusta',
      text: 'Protección de datos con certificados SSL y las mejores prácticas.'
    },
    {
      icon: 'bi bi-people',
      title: 'Trabajo en equipo',
      text: 'Colaboración cercana con tu empresa para lograr los mejores resultados.'
    },
    {
      icon: 'bi bi-bar-chart-line',
      title: 'Analítica web',
      text: 'Reports detallados para conocer el comportamiento de tus visitantes.'
    },
    {
      icon: 'bi bi-cloud-check',
      title: 'Hosting incluido',
      text: 'Alojamiento web seguro y rápido incluido en todos nuestros servicios.'
    }
  ],
  cta: {
    label: 'Ver todos nuestros servicios',
    href: '#servicios',
    icon: 'bi bi-arrow-right'
  }
}

const content8 = {
  overline: 'Sobre nosotros',
  imageMain: 'https://placehold.co/800x600/jpg?text=Equipo+Orpot',
  imageSecondary: 'https://placehold.co/400x300/jpg?text=Oficina',
  badge: {
    value: '15+',
    label: 'Años de experiencia'
  },
  features: [
    'Diseño web responsivo y moderno',
    'Desarrolladores certificados',
    'Equipo de expertos en soluciones digitales'
  ],
  contact: {
    label: 'Contáctanos en cualquier momento',
    value: '(33) 1234-5678'
  },
  signature: {
    image: 'https://placehold.co/180x60/png?text=Firma',
    name: 'Equipo Orpot',
    role: 'Fundadores y directores'
  }
}


const content9 = {
  overline: 'Nuestros servicios',
  image: 'https://placehold.co/800x800/jpg?text=Equipo+Orpot',
  steps: [
    {
      icon: 'bi bi-people',
      title: 'Análisis y diagnóstico',
      text: 'Comenzamos entendiendo tus necesidades, metas y visión del proyecto para crear una estrategia que se adapte a ti.'
    },
    {
      icon: 'bi bi-lightbulb',
      title: 'Diseño y planificación',
      text: 'Analizamos tu mercado para identificar oportunidades, tendencias y el mejor enfoque para tu éxito.'
    },
    {
      icon: 'bi bi-graph-up',
      title: 'Desarrollo y lanzamiento',
      text: 'Nuestro equipo desarrolla un plan de acción detallado enfocado en el crecimiento medible y la optimización del rendimiento.'
    }
  ]
}

const content10 = {
  overline: 'Proyectos destacados',
  projects: [
    {
      icon: 'bi bi-laptop',
      title: 'Tienda en línea WooCommerce',
      category: 'E-commerce, Tienda virtual',
      text: 'Desarrollamos tu tienda en línea completa con WooCommerce, integrando pasarelas de pago, gestión de inventario y una experiencia de usuario optimizada para conversión.',
      image: 'https://placehold.co/1000x700/jpg?text=Tienda+Online',
      href: '#',
      cta: 'Ver proyecto'
    },
    {
      icon: 'bi bi-building',
      title: 'Sitio corporativo WordPress',
      category: 'Corporativo, WordPress',
      text: 'Creamos sitios web corporativos profesionales con WordPress, diseñados para reflejar la identidad de tu marca y atraer clientes potenciales.',
      image: 'https://placehold.co/1000x700/jpg?text=Sitio+Corporativo',
      href: '#',
      cta: 'Ver proyecto'
    },
    {
      icon: 'bi bi-phone',
      title: 'Aplicación web a medida',
      category: 'Aplicación, Desarrollo personalizado',
      text: 'Construimos aplicaciones web personalizadas que automatizan procesos, mejoran la eficiencia y se adaptan perfectamente a las necesidades de tu negocio.',
      image: 'https://placehold.co/1000x700/jpg?text=Aplicacion+Web',
      href: '#',
      cta: 'Ver proyecto'
    }
  ]
}
const content11 = {
  overline: 'Video de presentación',
  thumb: 'https://placehold.co/1200x700/jpg?text=Video+Orpot',
  videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
  ctaText: 'Ver video aquí'
}

const content12 = {
  imageMain: 'https://placehold.co/800x600/jpg?text=Dashboard+Orpot',
  imageOverlay: 'https://placehold.co/300x180/jpg?text=Soporte',
  imageMini: 'https://placehold.co/300x180/jpg?text=Estadisticas',
  icon: 'bi bi-briefcase',
  featureTitle: 'Desarrollo web profesional',
  featureText:
    'Creamos soluciones digitales personalizadas para tu negocio, desde sitios web hasta aplicaciones complejas.',
  experience: { value: '15+', label: 'Años de experiencia' },
  benefits: [
    'Sitios responsivos',
    'Optimización SEO',
    'Soporte 24/7',
    'Hosting incluido',
    'Certificados SSL'
  ],
  cta: { label: 'Saber más', href: '#servicios' }
}

const content13 = {
  metrics: [
    { label: 'Proyectos completados exitosamente', value: '500+' },
    { label: 'Clientes satisfechos en México', value: '350+' },
    { label: 'Años de experiencia', value: '15+' },
  ],
  cards: [
    {
      image: 'https://placehold.co/180x120/jpg?text=WordPress',
      title: 'WordPress',
      text: 'El CMS más utilizado del mundo. Ideal para blogs, sitios corporativos y tiendas en línea.',
    },
    {
      image: 'https://placehold.co/180x120/jpg?text=WooCommerce',
      title: 'WooCommerce',
      text: 'La plataforma de comercio electrónico más popular para WordPress.',
    },
    {
      image: 'https://placehold.co/180x120/jpg?text=Drupal',
      title: 'Drupal',
      text: 'Framework robusto para aplicaciones web complejas y sitios de alta seguridad.',
    },
    {
      image: 'https://placehold.co/180x120/jpg?text=Laravel',
      title: 'Laravel',
      text: 'Framework PHP moderno para desarrollo de aplicaciones web a medida.',
    },
  ],
}

const content14 = {
  blocks: [
    {
      title: 'Diseño web profesional',
      text: 'Creamos sitios web visualmente atractivos y optimizados para conversión, adaptados a tu marca y audiencia.'
    },
    {
      title: 'Tiendas en línea',
      text: 'Desarrollamos comercio electrónico completo con WooCommerce, incluyendo pasarelas de pago y gestión de inventario.'
    },
    {
      title: 'Aplicaciones web a medida',
      text: 'Construimos sistemas personalizados, paneles administrativos y herramientas que automatizan tus procesos de negocio.'
    }
  ],
  benefits: [
    'Diseño responsivo',
    'Optimización SEO',
    'Alta seguridad',
    'Soporte técnico'
  ],
  image: 'https://placehold.co/600x400/jpg?text=Servicios+Web',
  cta: {
    title: 'Impulsa tu negocio en línea',
    text: 'Ofrecemos soluciones digitales completas para hacer crecer tu presencia y ventas.',
    button: { label: 'Solicitar cotización', href: '#contacto' }
  }
}

const content15 = {
  overline: 'Síguenos en redes',
  cards: [
    {
      title: 'Facebook',
      text: 'Síguenos para tips de diseño web y noticias sobre nuestros servicios.',
      image: 'https://placehold.co/600x400/jpg?text=Facebook+Orpot',
    },
    {
      title: 'Instagram',
      text: 'Contenido visual sobre nuestros proyectos y tendencias en desarrollo web.',
      image: 'https://placehold.co/600x400/jpg?text=Instagram+Orpot',
    },
    {
      title: 'LinkedIn',
      text: 'Conéctate con nosotros para oportunidades de negocio y colaboraciones.',
      image: 'https://placehold.co/600x400/jpg?text=LinkedIn+Orpot',
    },
    {
      title: 'YouTube',
      text: 'Tutoriales y demos de nuestros trabajos y proyectos web.',
      image: 'https://placehold.co/600x400/jpg?text=YouTube+Orpot',
    },
  ],
}


const content16 = {
  quote: 'Somos un equipo comprometido que transforma ideas innovadoras en soluciones digitales de alto impacto.',
  author: 'Equipo Orpot',
  role: 'Diseño y desarrollo web',
  team: [
    {
      name: 'María González',
      role: 'Directora de proyectos',
      image: 'https://placehold.co/600x800/jpg?text=Maria+Gonzalez',
    },
    {
      name: 'Carlos Hernández',
      role: 'Desarrollador senior',
      image: 'https://placehold.co/600x800/jpg?text=Carlos+Hernandez',
    },
    {
      name: 'Ana López',
      role: 'Diseñadora UX/UI',
      image: 'https://placehold.co/600x800/jpg?text=Ana+Lopez',
    },
  ],
}

const content17 = {
  overline: 'Nuestros servicios',
  services: [
    {
      name: 'Diseño web',
      description:
        'Creamos sitios web responsivos y modernos que reflejan la identidad de tu marca y atraen a tus clientes.',
      image: 'https://placehold.co/600x800/jpg?text=Diseno+Web',
    },
    {
      name: 'Tiendas en línea',
      description:
        'Desarrollamos comercio electrónico completo con WooCommerce, integrando pasarelas de pago y gestión de productos.',
      image: 'https://placehold.co/600x800/jpg?text=Tienda+Online',
    },
    {
      name: 'Aplicaciones web',
      description:
        'Construimos sistemas personalizados, paneles administrativos y aplicaciones que automatizan tus procesos.',
      image: 'https://placehold.co/600x800/jpg?text=Aplicacion+Web',
    },
    {
      name: 'SEO y posicionamiento',
      description:
        'Optimizamos tu sitio para que aparezca en los primeros resultados de búsqueda y atraigas más tráfico orgánico.',
      image: 'https://placehold.co/600x800/jpg?text=SEO',
    },
  ],
}


const content18 = {
  overline: 'Nuestros resultados',
  cta: {
    label: 'Solicitar cotización',
    href: '#contacto',
    variant: 'solid',
  },
  stats: [
    { value: '500+', text: 'Proyectos web completados exitosamente.' },
    { value: '350+', text: 'Clientes satisfechos en toda México.' },
    { value: '15+', text: 'Años de experiencia en desarrollo web.' },
    { value: '98%', text: 'Tasa de satisfacción de nuestros clientes.' },
  ],
}

const content19 = {
  overline: 'Beneficios principales',
  benefits: [
    {
      icon: 'bi bi-palette',
      title: 'Diseño único',
      text: 'Creamos interfaces a medida que reflejan la personalidad de tu marca.',
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Código de calidad',
      text: 'Desarrollamos con las mejores prácticas para un rendimiento óptimo.',
    },
    {
      icon: 'bi bi-rocket',
      title: 'Rápido y eficiente',
      text: 'Sitios optimizados para cargar en segundos y posicionar en buscadores.',
    },
  ],
}

const content20 = {
  testimonials: [
    {
      text: "Orpot desarrolló nuestra tienda en línea en tiempo récord. El resultado fue espectacular y las ventas aumentaron un 40% desde el lanzamiento.",
      name: "Roberto Mendoza",
      role: "Director general, Tienda MX",
      avatar: "https://placehold.co/100x100/jpg?text=RM",
    },
    {
      text: "Profesionales y comprometidos. Nos ayudaron a modernizar nuestro sitio web con un diseño limpio y funcional que nuestros clientes aman.",
      name: "Patricia Ramírez",
      role: "Coordinadora de marketing, Grupo Azul",
      avatar: "https://placehold.co/100x100/jpg?text=PR",
    },
    {
      text: "La mejor inversión que hicimos fue confiar en Orpot para nuestro sitio web. El soporte técnico es excepcional y siempre están disponibles.",
      name: "Jorge Vázquez",
      role: "CEO, Servicios Integrales GDL",
      avatar: "https://placehold.co/100x100/jpg?text=JV",
    },
  ],
}

const content21 = {
  images: [
    'https://placehold.co/400x400/png?text=Diseno+Web',
    'https://placehold.co/800x800/png?text=Desarrollo',
    'https://placehold.co/400x400/png?text=Lanzamiento',
  ],
  steps: [
    {
      number: '01.',
      title: 'Reunión y análisis',
      text: 'Comenzamos entendiendo tus necesidades, metas y visión del proyecto.',
    },
    {
      number: '02.',
      title: 'Diseño y prototipos',
      text: 'Creamos diseños visuales alineados con la identidad de tu marca.',
    },
    {
      number: '03.',
      title: 'Desarrollo',
      text: 'Nuestro equipo desarrolla tu proyecto con código limpio y eficiente.',
    },
    {
      number: '04.',
      title: 'Lanzamiento',
      text: 'Probamos, optimizamos y lanzamos tu proyecto con total calidad.',
    },
  ],
  cta: { label: 'Iniciar un proyecto', href: '#contacto' },
}


const content22 = {
  overline: 'Nuestros servicios',
  features: [
    {
      icon: 'bi bi-palette',
      title: 'Diseño personalizado',
      text: 'Creamos diseños únicos adaptados a la identidad visual de tu marca.',
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Código seguro',
      text: 'Implementamos las mejores prácticas de seguridad en todos nuestros desarrollos.',
    },
    {
      icon: 'bi bi-rocket',
      title: 'Rendimiento rápido',
      text: 'Optimizamos cada proyecto para cargar en tiempo record y posicionar en buscadores.',
    },
    {
      icon: 'bi bi-gear',
      title: 'Fácil personalización',
      text: 'Diseñamos paneles de administración intuitivos para que manages tu contenido.',
    },
  ],
  images: [
    'https://placehold.co/400x400/jpg?text=Diseno+1',
    'https://placehold.co/400x400/jpg?text=Diseno+2',
  ],
}

const content23 = {
    overline: 'Servicios',
    services: [
      {
        title: 'Diseño web',
        subtitle: 'Diseño visual responsivo',
        text: 'Creamos sitios web profesionales con diseños únicos y optimizados para todos los dispositivos.',
        href: '#'
      },
      {
        title: 'Tiendas en línea',
        subtitle: 'E-commerce con WooCommerce',
        text: 'Desarrollamos comercio electrónico completo con pasarelas de pago y gestión de inventario.',
        href: '#'
      },
      {
        title: 'Aplicaciones web',
        subtitle: 'Desarrollo a medida',
        text: 'Construimos sistemas personalizados, paneles administrativos y herramientas de negocio.',
        href: '#'
      },
      {
        title: 'SEO y posicionamiento',
        subtitle: 'Optimización para buscadores',
        text: 'Posicionamos tu sitio web en los primeros resultados de búsqueda para atraer más clientes.',
        href: '#'
      }
    ]
  }


const content24 = {
  headline: 'Diseño y publicidad que impulsan tu negocio.',
  summary: 'Sabemos que un buen diseño significa un buen negocio. El diseño es así de importante.',
  text: 'Ayudamos a nuestros clientes a succeeder mediante la creación de identidades, experiencias digitales y materiales que comunican claramente, alcanzan objetivos de marketing y se ven fantásticos.',
  image: 'https://placehold.co/800x960/jpg?text=400+x+485',
  alt: 'Diseño web profesional Orpot'
}

</script>
