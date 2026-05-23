<template>
  <div>
    <PageNav sticky />
  <SectionSocial1
    id="section-social-one"
    scheme="default-light"
    logo="https://placehold.co/400x200/png?text=Orpot+Logo"
    title="Síguenos y descubre más"
    subtitle="Proyectos, tutoriales y tips de desarrollo web"
    align="center"
    :socialLinks="socialLinks"
    :params="{
      background: 'https://placehold.co/1600x900/jpg?text=Fondo+Orpot',
      overlay: true,
      buttonStyle: 'text'
    }"
     :cols="2"
      :fluid="true"
      :animate="true"
  />
 <SectionSocial2
    id="section-social-two"
    scheme="default-neutral"
    logo="https://placehold.co/400x200/png?text=Orpot+Logo"
    title="Síguenos y comparte"
    subtitle="Contenido sobre desarrollo web, WordPress y Laravel"
    :socialLinks="socialLinks"
    align="center"
    :cols="2"
      :fluid="true"
      :animate="true"
    :params="{
      layout: 'grid',
      cardStyle: 'soft',
      background: 'https://placehold.co/1600x900/jpg?text=Fondo+Orpot',
      overlay: true
    }"
  />

 <SectionSocial3
      id="section-social-three"
      scheme="default-neutral"
      title="Conecta con nosotros"
      subtitle="Síguenos para descubrir más sobre desarrollo web"
      body="Comparte tus proyectos con el hashtag #OrpotWeb y descubre ideas para tu próximo desarrollo web."
     align="left"
     :cols="2"
      :fluid="false"
      :animate="true"
      :socialLinks="socialLinks"
      :params="{ buttonStyle: 'text', background: 'https://placehold.co/1600x900/jpg?text=Fondo+Orpot', overlay: true }"
    />

     <SectionSocial4
    id="section-social-four"
    scheme="default-neutral"
    title="¡Hablemos de tu proyecto!"
    subtitle="Contáctanos por WhatsApp o llámanos directamente"
    :socialLinks="socialLinks"
    :params="{
      background: 'https://placehold.co/1600x900/jpg?text=Fondo+Orpot',
      overlay: true,
      whatsapp: 'https://wa.me/5215512345678?text=Hola%20quiero%20cotizar%20un%20proyecto',
      phone: '5551234567',
      buttonStyle: 'rounded'
    }"
  />

  <SectionSocial5
    id="section-social-five"
    scheme="default-light"
    title="Conéctate con nosotros"
    subtitle="Tu proyecto web empieza con una conversación"
    body="Estamos listos para ayudarte a planear tu sitio. Escríbenos o llámanos para cotizar tu proyecto en minutos."
    align="left"
    :socialLinks="socialLinks"
    :params="{
      image: 'https://placehold.co/800x600/jpg?text=Oficina+Orpot',
      whatsapp: 'https://wa.me/5215512345678?text=Hola%20quiero%20cotizar',
      phone: '5551234567',
      buttonStyle: 'square'
    }"
  />

   <SectionSocial6
    id="section-social-six"
    scheme="default-light"
    title="¿Listo para iniciar tu proyecto?"
    subtitle="Envíanos un mensaje o llámanos, ¡te atenderemos enseguida!"
    :socialLinks="socialLinks"
    :params="{
      background: 'https://placehold.co/1600x400/jpg?text=Banner+Orpot',
      overlay: true,
      whatsapp: 'https://wa.me/5215512345678?text=Hola%20quiero%20cotizar%20un%20proyecto',
      phone: '5551234567'
    }"
  />

   <SectionSocial7
    id="section-social-seven"
    scheme="default-neutral"
    logo="https://placehold.co/400x200/png?text=Orpot+Logo"
    title="¿Listo para contactarnos?"
    subtitle="Elige tu medio favorito para comunicarte con nosotros"
    :socialLinks="socialLinks"
    :params="{
      background: 'https://placehold.co/1600x900/jpg?text=Fondo+Vertical',
      overlay: true,
      whatsapp: 'https://wa.me/5215512345678?text=Hola%20quiero%20cotizar',
      phone: '5551234567',
      email: 'hola@orpot.com'
    }"
  />

  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionSocial1 from '@/sections/social/SectionSocial1.vue'
import SectionSocial2 from '@/sections/social/SectionSocial2.vue'
import SectionSocial3 from '@/sections/social/SectionSocial3.vue'
import SectionSocial4 from '@/sections/social/SectionSocial4.vue'
import SectionSocial5 from '@/sections/social/SectionSocial5.vue'
import SectionSocial6 from '@/sections/social/SectionSocial6.vue'
import SectionSocial7 from '@/sections/social/SectionSocial7.vue'
const socialLinks = [
  { name: 'Instagram', icon: 'bi-instagram', url: 'https://instagram.com/orpot', cta: 'Proyectos web' },
  { name: 'Facebook', icon: 'bi-facebook', url: 'https://facebook.com/orpot', cta: 'Reseñas de clientes' },
  { name: 'TikTok', icon: 'bi-tiktok', url: 'https://tiktok.com/@orpot', cta: 'Tutoriales rápidos' },
  { name: 'WhatsApp', icon: 'bi-whatsapp', url: 'https://wa.me/5215512345678', cta: 'Cotización directa' },
  { name: 'YouTube', icon: 'bi-youtube', url: 'https://youtube.com/@orpot', cta: 'Demo de proyectos' }
]
</script>
