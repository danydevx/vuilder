<template>
  <div class="page-countdowns">
    <PageNav sticky />

    <div class="py-5 bg-light text-center">
      <div class="container">
        <h1 class="display-5 fw-bold">Countdown Sections</h1>
        <p class="lead text-muted">8 variantes de cuenta regresiva</p>
      </div>
    </div>

    <div class="py-5">
      <div class="container">

        <div class="mb-5">
          <SectionCountdown
            title="Faltan pocos días"
            subtitle="El gran día se acerca"
            :eventDate="eventDate"
            scheme="light-purple"
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionCountdown1
            title="Cuenta Regresiva Detallada"
            subtitle="Cada segundo cuenta para nuestro día especial"
            :eventDate="eventDate"
            location="Guadalajara, Jalisco"
            :showProgress="true"
            :showShare="true"
            scheme="light-purple"
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionCountdown2
            title="Tiempo Remaining"
            subtitle="Cada momento nos acerca más"
            :eventDate="eventDate"
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionCountdown3
            title="Flip Clock Countdown"
            subtitle="El tiempo no se detiene"
            :eventDate="eventDate"
            location="Auditorio Central"
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionCountdown4
            title="Our Event Starts In"
            subtitle="Mark your calendar and join us"
            :eventDate="eventDate"
            location="Centro de Convenciones"
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionCountdown5
            :eventDate="eventDate"
            message="El gran día está cada vez más cerca"
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionCountdown6
            title="Cuenta Regresiva"
            eyebrow="Evento próximo"
            :eventDate="eventDate"
            targetText="15 de Junio, 2026"
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionCountdown7
            title="El evento comienza en"
            subtitle="Prepárate para algo especial"
            :eventDate="eventDate"
          />
        </div>

        <hr class="my-5">

        <div class="mb-5">
          <SectionCountdown8
            title="Tiempo Remaining"
            subtitle="Cada momento cuenta"
            :eventDate="eventDate"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import SectionCountdown from '@/sections/countdown/SectionCountdown.vue'
import SectionCountdown1 from '@/sections/countdown/SectionCountdown1.vue'
import SectionCountdown2 from '@/sections/countdown/SectionCountdown2.vue'
import SectionCountdown3 from '@/sections/countdown/SectionCountdown3.vue'
import SectionCountdown4 from '@/sections/countdown/SectionCountdown4.vue'
import SectionCountdown5 from '@/sections/countdown/SectionCountdown5.vue'
import SectionCountdown6 from '@/sections/countdown/SectionCountdown6.vue'
import SectionCountdown7 from '@/sections/countdown/SectionCountdown7.vue'
import SectionCountdown8 from '@/sections/countdown/SectionCountdown8.vue'

const eventDate = '2026-06-15T18:00:00'
</script>

<style scoped>
.page-countdowns {
  min-height: 100vh;
  background: var(--surface);
}
</style>