<!-- src/pages/Index.vue -->
<template>
  <div>
    <PageNav sticky />

    <section class="hero-section text-center py-5 bg-light">
      <div class="container">
        <h1 class="display-4 fw-bold">Vueilder</h1>
        <p class="lead text-muted">Sistema de secciones para construir templates con IA</p>
      </div>
    </section>

    <section class="py-5">
      <div class="container">
        <div class="row g-4">
          <div
            v-for="category in categories"
            :key="category.key"
            class="col-md-6 col-lg-4"
          >
            <router-link
              :to="{ name: category.route || category.key }"
              class="text-decoration-none"
            >
              <div class="card h-100 shadow-sm hover-lift">
                <div class="card-body">
                  <h5 class="card-title">{{ category.name }}</h5>
                  <p class="card-text text-muted">
                    {{ category.count }} {{ category.count === 1 ? 'sección' : 'secciones' }}
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="text-center mt-5">
          <h3 class="mb-4">Ir al Builder</h3>
          <router-link to="/builder" class="btn btn-primary btn-lg">
            Abrir Builder Demo
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import PageNav from '@/components/PageNav.vue'
import { getAllCategories } from '@/builder/SectionRegistry.js'

const categories = getAllCategories()
</script>

<style scoped>
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.hero-section {
  border-bottom: 1px solid var(--surface-border, #dee2e6);
}
</style>