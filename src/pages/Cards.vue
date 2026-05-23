<template>
  <div>
    <PageNav sticky />

    <SectionCards1
      id="cards-grid"
      scheme="light-pink"
      title="Servicios profesionales"
      subtitle="Soluciones integrales para cada etapa de tu proyecto"
      :cards="cards1"
      :cols="3"
      align="center"
      :fluid="true"
    />

    <SectionCards2
      id="cards-horizontal"
      scheme="light-purple"
      title="Características principales"
      subtitle="Todo lo que necesitas saber sobre nuestra oferta"
      :cards="cards2"
      align="center"
      :fluid="true"
    />

    <SectionCards3
      id="cards-icons"
      scheme="default-light"
      title="Amenidades"
      subtitle="Infraestructura y servicios disponibles"
      :cards="cards3"
      :cols="4"
      align="center"
      :fluid="true"
    />

    <SectionCards4
      id="cards-overlay"
      scheme="default-dark"
      title="Espacios disponibles"
      subtitle="Explora nuestras instalaciones"
      :cards="cards4"
      :cols="3"
      align="center"
      :fluid="true"
    />

    <SectionCards5
      id="cards-compact"
      scheme="light-pink"
      title="Categorias"
      subtitle="Explora por tipo de servicio"
      :cards="cards5"
      :cols="5"
      align="center"
      :fluid="true"
    />

    <SectionCards6
      id="cards-ribbon"
      scheme="default-light"
      title="Ofertas especiales"
      subtitle="Paquetes con descuento por tiempo limitado"
      :cards="cards6"
      :cols="3"
      align="center"
      :fluid="true"
    />

    <SectionCards7
      id="cards-pricing"
      scheme="light-purple"
      title="Planes y precios"
      subtitle="Elige el plan que mejor se adapte a tus necesidades"
      :cards="cards7"
      :cols="3"
      align="center"
      :fluid="true"
    />

    <SectionCards8
      id="cards-steps"
      scheme="default-light"
      title="Como funciona"
      subtitle="Proceso paso a paso para comenzar"
      :cards="cards8"
      align="center"
      :fluid="true"
    />

    <SectionCards9
      id="cards-quotes"
      scheme="light-pink"
      title="Testimonios"
      subtitle="Lo que dicen nuestros clientes"
      :cards="cards9"
      :cols="3"
      align="center"
      :fluid="true"
    />

    <SectionCards10
      id="cards-float"
      scheme="default-light"
      title="Características destacadas"
      subtitle="Ventajas competitivas de nuestra plataforma"
      :cards="cards10"
      :cols="3"
      align="center"
      :fluid="true"
    />
  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionCards1 from '@/sections/cards/SectionCards1.vue'
import SectionCards2 from '@/sections/cards/SectionCards2.vue'
import SectionCards3 from '@/sections/cards/SectionCards3.vue'
import SectionCards4 from '@/sections/cards/SectionCards4.vue'
import SectionCards5 from '@/sections/cards/SectionCards5.vue'
import SectionCards6 from '@/sections/cards/SectionCards6.vue'
import SectionCards7 from '@/sections/cards/SectionCards7.vue'
import SectionCards8 from '@/sections/cards/SectionCards8.vue'
import SectionCards9 from '@/sections/cards/SectionCards9.vue'
import SectionCards10 from '@/sections/cards/SectionCards10.vue'

const cards1 = [
  {
    title: 'Diseño web',
    subtitle: 'UX/UI profesional',
    icon: 'bi bi-palette',
    description: 'Creamos sitios visualmente atractivos y funcionales que representan tu marca.',
    image: 'https://placehold.co/600x400/jpg?text=Diseno',
    features: [
      { text: 'Diseño único' },
      { text: 'Responsive' },
      { text: 'Optimizado' }
    ],
    ctas: [
      { label: 'Ver más', href: '#', icon: 'bi bi-arrow-right', variant: 'outline' }
    ]
  },
  {
    title: 'Desarrollo web',
    subtitle: 'Código a medida',
    icon: 'bi bi-code-slash',
    description: 'Aplicaciones web robustas con las mejores tecnologías del mercado.',
    image: 'https://placehold.co/600x400/jpg?text=Desarrollo',
    features: [
      { text: 'Laravel / Vue' },
      { text: 'APIs REST' },
      { text: 'Escalable' }
    ],
    ctas: [
      { label: 'Cotizar', href: '#', icon: 'bi bi-chat-dots', variant: 'solid' }
    ]
  },
  {
    title: 'Ecommerce',
    subtitle: 'Tiendas en línea',
    icon: 'bi bi-cart3',
    description: 'Tiendas virtuales completas con gestión de productos y pagos.',
    image: 'https://placehold.co/600x400/jpg?text=Ecommerce',
    features: [
      { text: 'WooCommerce' },
      { text: 'Pasarelas de pago' },
      { text: 'Inventario' }
    ],
    ctas: [
      { label: 'Ver tienda', href: '#', icon: 'bi bi-bag', variant: 'outline' }
    ]
  }
]

const cards2 = [
  {
    title: 'Rendimiento optimizado',
    subtitle: 'Velocidad y estabilidad',
    icon: 'bi bi-lightning-charge',
    description: 'Sites that load fast and perform well under high traffic conditions.',
    image: 'https://placehold.co/800x500/jpg?text=Rendimiento',
    features: [
      { text: 'CDN incluido' },
      { text: 'Cache avanzado' },
      { text: 'Monitoreo 24/7' }
    ],
    ctas: [
      { label: 'Saber más', href: '#', icon: 'bi bi-info-circle', variant: 'solid' }
    ]
  },
  {
    title: 'Seguridad avanzada',
    subtitle: 'Protección total',
    icon: 'bi bi-shield-lock',
    description: 'SSL, firewalls, backups automáticos y monitoreo contra amenazas.',
    image: 'https://placehold.co/800x500/jpg?text=Seguridad',
    features: [
      { text: 'SSL gratis' },
      { text: 'Backups diarios' },
      { text: 'WAF incluido' }
    ],
    ctas: [
      { label: 'Ver medidas', href: '#', icon: 'bi bi-shield', variant: 'solid' }
    ]
  }
]

const cards3 = [
  {
    title: 'WiFi de alta velocidad',
    icon: 'bi bi-wifi',
    subtitle: 'Conexión estable en todo el espacio',
    ctas: [
      { label: 'Ver detalles', href: '#', variant: 'outline' }
    ]
  },
  {
    title: 'Estacionamiento',
    icon: 'bi bi-car-front',
    subtitle: 'Amplio espacio con vigilancia',
    ctas: [
      { label: 'Ver mapa', href: '#', variant: 'outline' }
    ]
  },
  {
    title: 'Aire acondicionado',
    icon: 'bi bi-snow',
    subtitle: 'Climatización en todas las áreas',
    ctas: [
      { label: 'Consultar', href: '#', variant: 'outline' }
    ]
  },
  {
    title: 'Cocina equipados',
    icon: 'bi bi-cup-hot',
    subtitle: 'Servicio de catering disponible',
    ctas: [
      { label: 'Ver menú', href: '#', variant: 'outline' }
    ]
  }
]

const cards4 = [
  {
    title: 'Salón principal',
    subtitle: 'Hasta 200 personas',
    icon: 'bi bi-building',
    description: 'Espacio amplio con escenario, iluminación profesional y sonido.',
    image: 'https://placehold.co/800x600/jpg?text=Salon',
    ctas: [
      { label: 'Reservar', href: '#', variant: 'solid' },
      { label: 'Ver fotos', href: '#', variant: 'outline' }
    ]
  },
  {
    title: 'Jardín exterior',
    subtitle: 'Hasta 150 personas',
    icon: 'bi bi-flower1',
    description: 'Área al aire libre con vegetación, perfecta para eventos nocturnos.',
    image: 'https://placehold.co/800x600/jpg?text=Jardin',
    ctas: [
      { label: 'Reservar', href: '#', variant: 'solid' },
      { label: 'Ver fotos', href: '#', variant: 'outline' }
    ]
  },
  {
    title: 'Sala de reuniones',
    subtitle: 'Hasta 30 personas',
    icon: 'bi bi-people',
    description: 'Espacio cerrado climatizado con proyector y pantalla.',
    image: 'https://placehold.co/800x600/jpg?text=Sala',
    ctas: [
      { label: 'Reservar', href: '#', variant: 'solid' },
      { label: 'Ver fotos', href: '#', variant: 'outline' }
    ]
  }
]

const cards5 = [
  { title: 'Diseño', icon: 'bi bi-palette' },
  { title: 'Desarrollo', icon: 'bi bi-code' },
  { title: 'Marketing', icon: 'bi bi-megaphone' },
  { title: 'SEO', icon: 'bi bi-search' },
  { title: 'Hosting', icon: 'bi bi-server' },
  { title: 'Dominio', icon: 'bi bi-globe' },
  { title: 'Email', icon: 'bi bi-envelope' },
  { title: 'Seguridad', icon: 'bi bi-shield' }
]

const cards6 = [
  {
    title: 'Plan Mensual',
    subtitle: 'Ideal para comenzar',
    icon: 'bi bi-calendar',
    description: 'Acceso completo a todas las funcionalidades básicas.',
    ribbon: '-20%',
    image: 'https://placehold.co/600x400/jpg?text=Mensual',
    ctas: [
      { label: 'Obtener', href: '#', variant: 'solid' }
    ]
  },
  {
    title: 'Plan Anual',
    subtitle: 'Mejor valor',
    icon: 'bi bi-calendar-check',
    description: 'Ahorra un 40% con facturación anual.',
    ribbon: 'Popular',
    ribbonPosition: 'left',
    image: 'https://placehold.co/600x400/jpg?text=Anual',
    ctas: [
      { label: 'Obtener', href: '#', variant: 'solid' }
    ]
  },
  {
    title: 'Plan Corporativo',
    subtitle: 'Para equipos grandes',
    icon: 'bi bi-building',
    description: 'Características avanzadas y soporte priorizado.',
    ribbon: 'Nuevo',
    image: 'https://placehold.co/600x400/jpg?text=Corp',
    ctas: [
      { label: 'Contactar', href: '#', variant: 'outline' }
    ]
  }
]

const cards7 = [
  {
    title: 'Básico',
    subtitle: 'Para proyectos personales',
    icon: 'bi bi-person',
    price: '$9',
    period: 'mes',
    description: 'Todo lo esencial para comenzar.',
    features: [
      { text: '5 proyectos' },
      { text: '1 GB almacenamiento' },
      { text: 'Soporte por email' },
      { text: 'Actualizaciones mensuales', included: false }
    ],
    ctas: [
      { label: 'Comenzar', href: '#', variant: 'outline' }
    ]
  },
  {
    title: 'Profesional',
    subtitle: 'Más popular',
    icon: 'bi bi-briefcase',
    price: '$29',
    period: 'mes',
    description: 'Para profesionales y pequeñas empresas.',
    badge: 'Recomendado',
    featured: true,
    features: [
      { text: 'Proyectos ilimitados' },
      { text: '50 GB almacenamiento' },
      { text: 'Soporte prioritario' },
      { text: 'Integraciones avanzadas' }
    ],
    ctas: [
      { label: 'Comenzar', href: '#', variant: 'solid' }
    ]
  },
  {
    title: 'Empresarial',
    subtitle: 'Para grandes equipos',
    icon: 'bi bi-building',
    price: '$99',
    period: 'mes',
    description: 'Solución completa para empresas.',
    features: [
      { text: 'Todo lo de Pro' },
      { text: '500 GB almacenamiento' },
      { text: 'Soporte 24/7' },
      { text: 'API personalizada' }
    ],
    ctas: [
      { label: 'Contactar', href: '#', variant: 'outline' }
    ]
  }
]

const cards8 = [
  {
    title: 'Registro rápido',
    subtitle: 'Crea tu cuenta en minutos',
    icon: 'bi bi-person-plus',
    description: 'Regístrate con tu email o redes sociales. Sin tarjeta de crédito requerida.',
    ctas: [
      { label: 'Registrarse', href: '#', variant: 'solid' }
    ]
  },
  {
    title: 'Configura tu perfil',
    subtitle: 'Personaliza tu experiencia',
    icon: 'bi bi-gear',
    description: 'Añade tu información, logo y preferencias de configuración.',
    ctas: [
      { label: 'Configurar', href: '#', variant: 'outline' }
    ]
  },
  {
    title: 'Publica tu contenido',
    subtitle: 'Llega a tu audiencia',
    icon: 'bi bi-send',
    description: 'Crea y publica tu contenido de forma rápida y sencilla.',
    ctas: [
      { label: 'Publicar', href: '#', variant: 'outline' }
    ]
  },
  {
    title: 'Analiza resultados',
    subtitle: 'Mide tu impacto',
    icon: 'bi bi-graph-up',
    description: 'Accede a estadísticas detalladas y reportes de rendimiento.',
    ctas: [
      { label: 'Ver analytics', href: '#', variant: 'outline' }
    ]
  }
]

const cards9 = [
  {
    quote: 'El mejor servicio que he probado. La calidad es excepcional y el soporte siempre está disponible.',
    author: 'María García',
    role: 'CEO, TechStart',
    authorImage: 'https://placehold.co/100x100/jpg?text=MG',
    rating: 5
  },
  {
    quote: 'Transformó completamente nuestra presencia digital. Resultados visibles en solo 2 semanas.',
    author: 'Carlos Rodríguez',
    role: 'Director de Marketing, InnovaLab',
    authorImage: 'https://placehold.co/100x100/jpg?text=CR',
    rating: 5
  },
  {
    quote: 'Profesionalismo y dedicación. Definitivamente recomiendo sus servicios a cualquiera.',
    author: 'Ana Martínez',
    role: 'Fundadora, DesignHub',
    authorImage: 'https://placehold.co/100x100/jpg?text=AM',
    rating: 4
  }
]

const cards10 = [
  {
    title: 'Velocidad ultra rápida',
    subtitle: 'Performance optimizada',
    icon: 'bi bi-lightning-charge',
    description: 'Tiempos de carga inferiores a 1 segundo con nuestra infraestructura de alto rendimiento.',
    image: 'https://placehold.co/600x400/jpg?text=Velocidad',
    ctas: [
      { label: 'Saber más', href: '#', variant: 'outline' }
    ]
  },
  {
    title: 'Escalabilidad automática',
    subtitle: 'Crece sin límites',
    icon: 'bi bi-arrow-up-circle',
    description: 'infraestructura que se adapta automáticamente a picos de tráfico sin intervención.',
    image: 'https://placehold.co/600x400/jpg?text=Escala',
    ctas: [
      { label: 'Saber más', href: '#', variant: 'outline' }
    ]
  },
  {
    title: 'Seguridad de nivel enterprise',
    subtitle: 'Protección total',
    icon: 'bi bi-shield-check',
    description: 'Encriptación de datos, WAF, DDoS protection y cumplimiento GDPR incluidas.',
    image: 'https://placehold.co/600x400/jpg?text=Seguridad',
    ctas: [
      { label: 'Saber más', href: '#', variant: 'outline' }
    ]
  }
]
</script>