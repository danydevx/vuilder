<template>
  <section
    :id="id"
    class="section-menu-masonry position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div :class="[fluid ? 'container-fluid px-3 px-md-4' : 'container']">
      <!-- Header -->
      <header
        v-if="title || subtitle"
        class="text-center mb-5"
        data-aos="fade-up"
      >
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 40rem">
          {{ subtitle }}
        </p>
      </header>

      <!-- 🔹 Masonry grid -->
      <div
        class="menu-masonry"
        :style="masonryStyle"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <article
          v-for="(menu, i) in menus"
          :key="menu.id || i"
          class="menu-card card shadow-sm rounded-4 overflow-hidden position-relative mb-4"
        >
          <!-- Imagen -->
          <figure
            v-if="menu.image"
            class="menu-image ratio ratio-4x3 m-0 position-relative"
          >
            <img
              :src="menu.image"
              :alt="menu.title"
              class="w-100 h-100 object-fit-cover"
              loading="lazy"
            />
            <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>
          </figure>

          <!-- Contenido -->
          <div class="card-body p-4 d-flex flex-column">
            <h5 class="fw-bold mb-1">{{ menu.title }}</h5>
            <p class="text-accent fw-semibold mb-2">{{ menu.price }}</p>
            <p v-if="menu.subtitle" class=" small mb-3">
              {{ menu.subtitle }}
            </p>

            <ul class="list-unstyled small  mb-3">
              <li
                v-for="(item, j) in menu.items.slice(0, 6)"
                :key="j"
                class="d-flex align-items-center mb-1"
              >
                <i class="bi bi-check2-circle text-accent me-2"></i>{{ item }}
              </li>
            </ul>

            <div v-if="menu.includes?.length" class="small mb-3">
              <h6 class="fw-semibold mb-1">Incluye:</h6>
              <ul class="list-unstyled small  mb-0">
                <li v-for="(inc, k) in menu.includes" :key="k">
                  <i class="bi bi-dot me-1"></i>{{ inc }}
                </li>
              </ul>
            </div>

            <div v-if="menu.extras?.length" class="small mb-3">
              <h6 class="fw-semibold mb-1">Extras:</h6>
              <ul class="list-unstyled small  mb-0">
                <li v-for="(extra, l) in menu.extras" :key="l">
                  <i class="bi bi-plus-circle me-1 text-accent"></i>{{ extra }}
                </li>
              </ul>
            </div>

            <p
              v-if="menu.conditions"
              class="small  mt-auto border-top pt-2"
            >
              {{ menu.conditions }}
            </p>

            <!-- CTA -->
           
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-menu-masonry' },
  title: { type: String, default: 'Menús Estilo Masonry' },
  subtitle: {
    type: String,
    default: 'Una distribución fluida que resalta cada platillo a su manera.',
  },
  scheme: { type: String, default: 'default-light' },
  menus: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 3 }, // ✅ control de columnas base
})

// Clases de color
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

// Columnas dinámicas basadas en props
const masonryStyle = computed(() => {
  const base = Math.min(Math.max(props.cols, 1), 6)
  return {
    columnCount: base,
  }
})
</script>

<style lang="less" scoped>
.section-menu-masonry {
  background: var(--surface);
  color: var(--text);

  .menu-masonry {
    column-gap: 1.5rem;
    width: 100%;

    @media (max-width: 1200px) {
      column-count: 3 !important;
    }
    @media (max-width: 992px) {
      column-count: 2 !important;
    }
    @media (max-width: 576px) {
      column-count: 1 !important;
    }

    .menu-card {
      display: inline-block;
      width: 100%;
      break-inside: avoid;
      background: var(--surface-2);
      border: 1px solid var(--surface-border);
      margin: 0 0 1.5rem;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 28px color-mix(in srgb, var(--accent) 25%, transparent);

        .overlay {
          opacity: 1;
        }

        img {
          transform: scale(1.05);
        }
      }

      .menu-image {
        overflow: hidden;
        img {
          transition: transform 0.4s ease;
        }

        .overlay {
          background: linear-gradient(
            to top,
            color-mix(in srgb, var(--accent), black 60%) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }
      }

      .card-body {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .btn-outline {
        border-color: var(--surface-border);
        color: var(--text);
        transition: all 0.25s ease;

        &:hover {
          background: var(--accent);
          color: var(--accent-contrast);
          border-color: var(--accent);
        }
      }
    }
  }
}
</style>
