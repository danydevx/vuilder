<template>
  <div>
    <PageNav sticky />

    <SectionVideos1
      v-if="sections.includes('videos1')"
      v-bind="videos1Props"
      @play="handlePlay"
    />
    <SectionVideos2
      v-if="sections.includes('videos2')"
      v-bind="videos2Props"
      @select="handleVideoSelect"
    />
    <SectionVideos3
      v-if="sections.includes('videos3')"
      v-bind="videos3Props"
      @select="handleVideoSelect"
    />
    <SectionVideos4
      v-if="sections.includes('videos4')"
      v-bind="videos4Props"
      @select="handleVideoSelect"
    />
    <SectionVideos5
      v-if="sections.includes('videos5')"
      v-bind="videos5Props"
      @select="handleVideoSelect"
    />
    <SectionVideos6
      v-if="sections.includes('videos6')"
      v-bind="videos6Props"
      @select="handleVideoSelect"
    />
    <SectionVideos7
      v-if="sections.includes('videos7')"
      v-bind="videos7Props"
      @select="handleVideoSelect"
    />
    <SectionVideos8
      v-if="sections.includes('videos8')"
      v-bind="videos8Props"
      @select="handleVideoSelect"
    />
    <SectionVideos9
      v-if="sections.includes('videos9')"
      v-bind="videos9Props"
      @select="handleVideoSelect"
    />
    <SectionVideos10
      v-if="sections.includes('videos10')"
      v-bind="videos10Props"
      @select="handleVideoSelect"
    />
  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SectionVideos1 from '@/sections/videos/SectionVideos1.vue'
import SectionVideos2 from '@/sections/videos/SectionVideos2.vue'
import SectionVideos3 from '@/sections/videos/SectionVideos3.vue'
import SectionVideos4 from '@/sections/videos/SectionVideos4.vue'
import SectionVideos5 from '@/sections/videos/SectionVideos5.vue'
import SectionVideos6 from '@/sections/videos/SectionVideos6.vue'
import SectionVideos7 from '@/sections/videos/SectionVideos7.vue'
import SectionVideos8 from '@/sections/videos/SectionVideos8.vue'
import SectionVideos9 from '@/sections/videos/SectionVideos9.vue'
import SectionVideos10 from '@/sections/videos/SectionVideos10.vue'

const route = useRoute()
const sections = computed(() => route.query.sections?.split(',') || ['videos1', 'videos2', 'videos3', 'videos4', 'videos5', 'videos6', 'videos7', 'videos8', 'videos9', 'videos10'])

const videos1Props = {
  id: 'videos-hero',
  scheme: 'esmerald',
  title: 'Nuestros Trabajos',
  subtitle: 'Descubre la calidad de nuestro contenido audiovisual',
  eyebrow: 'Portafolio Visual',
 
  headerAlignClass:'text-center mx-auto',
  video: {
    embedId: 'dQw4w9WgXcQ',
    poster: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80',
    title: 'Producción audiovisual profesional',
    description: 'Creamos contenido visual que destaca tu marca.',
    duration: '2:30',
  },
}

const videos2Props = {
  id: 'videos-grid',
  scheme: 'rose-light',
  title: 'Galería de Videos',
  subtitle: 'Explora nuestra colección de proyectos',
  eyebrow: 'Explorar',
   headerAlignClass:'text-center mr-auto ',
  videos: [
    { id: 'v1', embedId: 'dQw4w9WgXcQ', title: 'Producción Corporativa', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=640&q=80', duration: '3:45', category: 'Corporativo' },
    { id: 'v2', embedId: 'jNQXAC9IVRw', title: 'Documental Nature', thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=640&q=80', duration: '12:30', category: 'Documental' },
    { id: 'v3', embedId: '9bZkp7q19f0', title: 'Spot Publicitario', thumbnail: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=640&q=80', duration: '0:30', category: 'Publicidad' },
    { id: 'v4', embedId: '-video4', title: 'Evento Musical', thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=640&q=80', duration: '5:20', category: 'Musical' },
    { id: 'v5', embedId: 'video5', title: 'Tutorial de Marca', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&q=80', duration: '8:15', category: 'Tutorial' },
    { id: 'v6', embedId: 'video6', title: 'Video Promocional', thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=640&q=80', duration: '2:10', category: 'Promocional' },
  ],
}

const videos3Props = {
  id: 'videos-carousel',
  scheme: 'dark',
  title: 'Playlist Destacada',
  subtitle: 'Videos seleccionados de nuestro archivo',
  eyebrow: 'Destacados',
  headerAlignClass: 'text-center',
  videos: [
    { id: 'v1', embedId: 'dQw4w9WgXcQ', title: 'Making Of: Sesión Photo', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=640&q=80', duration: '15:00' },
    { id: 'v2', embedId: 'jNQXAC9IVRw', title: 'Entrevista Behind Scenes', thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=640&q=80', duration: '22:45' },
    { id: 'v3', embedId: '9bZkp7q19f0', title: 'Proceso Creativo', thumbnail: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b5ee1c?w=640&q=80', duration: '10:30' },
    { id: 'v4', embedId: 'video4', title: 'Final Cut Analysis', thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=640&q=80', duration: '18:20' },
    { id: 'v5', embedId: 'video5', title: 'BTS Commercial', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=640&q=80', duration: '8:00' },
  ],
}

const videos4Props = {
  id: 'videos-compact',
  scheme: 'rose-light',
  title: 'Novedades Recientes',
  subtitle: 'Los últimos contenidos publicados',
  eyebrow: 'Recientes',
  headerAlignClass: 'text-center',
  videos: [
    { id: 'v1', title: 'Lanzamiento Producto X', duration: '2:30', category: 'Producto' },
    { id: 'v2', title: 'Evento Anual 2025', duration: '4:15', category: 'Evento' },
    { id: 'v3', title: 'Entrevista CEO', duration: '18:00', category: 'Corporativo' },
    { id: 'v4', title: 'Tutorial Avanzado', duration: '25:30', category: 'Educativo' },
    { id: 'v5', title: 'Showreel 2025', duration: '3:00', category: 'Reel' },
    { id: 'v6', title: 'Case Study Cliente', duration: '12:45', category: 'Testimonio' },
    { id: 'v7', title: 'Webinar Completo', duration: '45:00', category: 'Webinar' },
  ],
}

const videos5Props = {
  id: 'videos-minimal',
  scheme: 'esmerald',
  title: 'Colección Visual',
  subtitle: 'Mosaico de nuestros mejores momentos',
  headerAlignClass: 'text-center',
  videos: [
    { id: 'v1', thumbnail: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80', title: 'Corto 1' },
    { id: 'v2', thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&q=80', title: 'Corto 2' },
    { id: 'v3', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80', title: 'Corto 3' },
    { id: 'v4', thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80', title: 'Corto 4' },
    { id: 'v5', thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80', title: 'Corto 5' },
    { id: 'v6', thumbnail: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&q=80', title: 'Corto 6' },
    { id: 'v7', thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80', title: 'Corto 7' },
    { id: 'v8', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80', title: 'Corto 8' },
    { id: 'v9', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80', title: 'Corto 9' },
  ],
}

const videos6Props = {
  id: 'videos-split',
  scheme: 'rose-dark',
  title: 'Historia del Proyecto',
  subtitle: 'Cómo nace y evoluciona cada trabajo',
  eyebrow: 'Behind The Scenes',
  headerAlignClass: 'text-center',
  video: {
    embedId: 'dQw4w9WgXcQ',
    poster: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1280&q=80',
    title: 'Cortometraje "Luz de Ciudad"',
  },
  info: {
    category: 'Cortometraje',
    year: '2024',
    duration: '14:30',
    director: 'María González',
    description: 'Una historia sobre la vida nocturna urbana y los encuentros que cambian el destino de sus protagonistas.',
  },
}

const videos7Props = {
  id: 'videos-beforeafter',
  scheme: 'dark',
  title: 'Proceso Creativo',
  subtitle: 'Antes y después de nuestros proyectos',
  eyebrow: 'Transformación',
  headerAlignClass: 'text-center',
  videos: [
    {
      id: 'v1',
      title: 'Edición Video Promocional',
      beforeThumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
      afterThumb: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80',
      beforeLabel: 'Raw Footage',
      afterLabel: 'Final Cut',
    },
    {
      id: 'v2',
      title: 'Color Grading',
      beforeThumb: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80',
      afterThumb: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
      beforeLabel: 'Sin color',
      afterLabel: 'Color corregido',
    },
  ],
}

const videos8Props = {
  id: 'videos-parallax',
  scheme: 'esmerald',
  title: 'Momentos Destacados',
  subtitle: 'Escenas que definen nuestra narrativa',
  eyebrow: 'Highlights',
  headerAlignClass: 'text-center',
  videos: [
    { id: 'v1', embedId: 'dQw4w9WgXcQ', title: 'Amanecer en el Desierto', thumbnail: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', category: 'Naturaleza', duration: '5:00' },
    { id: 'v2', embedId: 'jNQXAC9IVRw', title: 'Ritmo Urbano', thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', category: 'Ciudad', duration: '3:30' },
    { id: 'v3', embedId: '9bZkp7q19f0', title: 'Conexión Humana', thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', category: 'Documental', duration: '8:45' },
  ],
}

const videos9Props = {
  id: 'videos-stack',
  scheme: 'rose-light',
  title: 'Serie: Herramientas Creativas',
  subtitle: 'Aprende con nuestra serie educativa',
  eyebrow: 'Serie Educativa',
  headerAlignClass: 'text-center',
  featured: {
    embedId: 'dQw4w9WgXcQ',
    title: 'Introducción al Montaje',
    description: 'Aprende los fundamentos del montaje audiovisual desde cero.',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80',
    duration: '12:00',
    lessons: 8,
  },
  episodes: [
    { id: 'e1', title: 'Conceptos Básicos', thumbnail: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=300&q=80', duration: '15:00', order: 1 },
    { id: 'e2', title: 'Corte y Transición', thumbnail: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b5ee1c?w=300&q=80', duration: '18:00', order: 2 },
    { id: 'e3', title: 'Audio y Música', thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=80', duration: '20:00', order: 3 },
    { id: 'e4', title: 'Color y Filtros', thumbnail: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=300&q=80', duration: '22:00', order: 4 },
  ],
}

const videos10Props = {
  id: 'videos-float',
  scheme: 'esmerald-dark',
  title: 'Testimonios en Video',
  subtitle: 'Lo que dicen nuestros clientes',
  eyebrow: 'Clientes',
  headerAlignClass: 'text-center',
  videos: [
    { id: 'v1', embedId: 'dQw4w9WgXcQ', title: 'María López - CEO TechCorp', thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', company: 'TechCorp' },
    { id: 'v2', embedId: 'jNQXAC9IVRw', title: 'Carlos Ruiz - Dir. Marketing', thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', company: 'MarketPro' },
    { id: 'v3', embedId: '9bZkp7q19f0', title: 'Ana Martínez - Founder', thumbnail: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', company: 'StartupXYZ' },
    { id: 'v4', embedId: 'video4', title: 'Pedro Sánchez - Manager', thumbnail: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80', company: 'GlobalSA' },
  ],
}

function handlePlay(video) {
  console.log('Play video:', video)
}

function handleVideoSelect(video) {
  console.log('Selected video:', video)
}
</script>

<style lang="less" scoped>
.page-videos {
  min-height: 100vh;
}
</style>