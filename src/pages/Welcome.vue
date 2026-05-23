<template>
  <div class="page-welcome">
    <PageNav sticky />

    <div class="py-5 bg-light text-center">
      <div class="container">
        <h1 class="display-5 fw-bold">Welcome Sections</h1>
        <p class="lead text-muted">5 variantes de secciones de bienvenida</p>
      </div>
    </div>

    <div class="py-5">
      <div class="container">
        <div class="mb-5">
          <SectionWelcome
            id="welcome-1"
            scheme="light-purple"
            title="Bienvenido"
            subtitle="Gracias por visitarnos"
            message="Estamos encantados de tenerte aquí. Explora nuestras secciones y descubre todo lo que tenemos para ofrecer."
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionWelcome2
            id="welcome-2"
            scheme="default-light"
            eyebrow="Bienvenidos"
            title="Bienvenido"
            subtitle="Gracias por visitarnos"
            message="Estamos encantados de tenerte aquí."
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionWelcome3
            id="welcome-3"
            scheme="default-light"
            title="Sobre Nosotros"
            subtitle="Conoce nuestra historia"
            message="Somos un equipo apasionado por crear experiencias digitales únicas. Con años de experiencia en el desarrollo web, hemos ayudado a cientos de clientes a alcanzar sus objetivos en línea."
            buttonText="Conocer más"
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionWelcome4
            id="welcome-4"
            scheme="light-purple"
            badge="Nuevo"
            title="Bienvenido a Nuestro Sitio"
            subtitle="Tu destino para todo lo que necesitas"
            :showStats="true"
            :stats="[
              { value: '500+', label: 'Clientes' },
              { value: '1000+', label: 'Proyectos' },
              { value: '50+', label: 'Premios' },
              { value: '10+', label: 'Años' }
            ]"
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionWelcome5
            id="welcome-5"
            scheme="dark-purple"
            eyebrow="NUEVO"
            title="Empezando"
            subtitle="Todo lo que necesitas en un solo lugar"
            message="Explora nuestra plataforma y descubre herramientas poderosas diseñadas para impulsar tu negocio al siguiente nivel."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionWelcome from '@/sections/welcome/SectionWelcome.vue'
import SectionWelcome2 from '@/sections/welcome/SectionWelcome2.vue'
import SectionWelcome3 from '@/sections/welcome/SectionWelcome3.vue'
import SectionWelcome4 from '@/sections/welcome/SectionWelcome4.vue'
import SectionWelcome5 from '@/sections/welcome/SectionWelcome5.vue'
</script>

<style scoped>
.page-welcome {
  min-height: 100vh;
  background: var(--surface);
}
</style>