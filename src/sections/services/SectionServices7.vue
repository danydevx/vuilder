<template>
  <section
    :id="id"
    class="section section-services-split position-relative overflow-hidden py-5"
    :class="['component-scheme-' + scheme]"
  >
    <!-- 🧭 Header -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']" data-aos="fade-up">
      <header
        class="section-header mb-5"
        :class="headerAlignClass"
      >
        <h2 class="section-title ">{{ title }}</h2>
        <p
          v-if="subtitle"
          class="section-subtitle mt-2"
          :class="{
            'mx-auto': align === 'center',
            'ms-auto me-0': align === 'right',
            'me-auto ms-0': align === 'left'
          }"
        >
          {{ subtitle }}
        </p>
      </header>
    </div>

    <!-- 🧩 Lista de servicios -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container']">
      <div
        v-for="(svc, i) in services"
        :key="i"
        class="service-row row align-items-center g-0 mb-5 overflow-hidden rounded-4 shadow-sm"
        :class="{
          'flex-row-reverse': order === 'inverted' ? i % 2 === 0 : i % 2 !== 0
        }"
        data-aos="fade-up"
        :data-aos-delay="i * 80"
      >
        <!-- 📸 Imagen -->
        <div class="col-12 col-lg-6 service-media position-relative">
          <div
            class="media-bg"
            :style="svc.image ? { backgroundImage: `url('${svc.image}')` } : {}"
          ></div>
          <div class="media-overlay"></div>
        </div>

        <!-- 📋 Contenido -->
        <div class="col-12 col-lg-6 p-4 p-md-5 service-content">
          <div class="content-inner">
            <div class="icon-wrap mb-3">
              <i v-if="svc.icon" :class="svc.icon" class="fs-3"></i>
            </div>
            <h4 class="fw-bold mb-2">{{ svc.title }}</h4>
            <p v-if="svc.subtitle" class="text-accent small mb-3">
              {{ svc.subtitle }}
            </p>
            <p v-if="svc.text" class=" small mb-4">
              {{ svc.text }}
            </p>

            <ul v-if="svc.features?.length" class="list-unstyled small  mb-4">
              <li
                v-for="(feat, f) in svc.features"
                :key="f"
                class="d-flex align-items-center mb-1"
              >
                <i :class="feat.icon || 'bi bi-check-circle'" class="me-2 text-accent"></i>
                {{ feat.text || feat }}
              </li>
            </ul>

            <div v-if="svc.ctas?.length" class="d-flex flex-wrap gap-2">
              <a
                v-for="(cta, c) in svc.ctas"
                :key="c"
                :href="cta.href"
                class="btn"
                :class="cta.variant === 'outline'
                  ? 'btn-outline-secondary'
                  : 'btn-scheme'"
              >
                <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
                {{ cta.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-services-7' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Servicios destacados' },
  subtitle: { type: String, default: 'Experiencias únicas en cada detalle' },
  services: { type: Array, required: true },
  fluid: { type: Boolean, default: false },
  cols: { type: Number, default: 2 }, // 🔸 aplica en secciones de dos columnas
  align: { type: String, default: 'center' }, // left | center | right
  justify: { type: String, default: 'center' }, // start | center | end | between | around
  order: { type: String, default: 'normal' } // normal | inverted
})

const headerAlignClass = computed(() => ({
  'text-center': props.align === 'center',
  'text-start': props.align === 'left',
  'text-end': props.align === 'right'
}))
</script>

<style lang="less" scoped>
.section-services-split {
  background: var(--surface);
  color: var(--text);

  .section-title {
    color: var(--heading-color);
  }
  .section-subtitle {
    color: var(--muted);
    max-width: 38rem;
  }

  .service-row {
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    transition: transform 0.25s ease, box-shadow 0.25s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 18px color-mix(in oklab, var(--accent), transparent 85%);
    }
  }

  .service-media {
    position: relative;
    height: 280px;

    @media (min-width: 992px) {
      height: 100%;
      min-height: 320px;
    }

    .media-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transition: transform 0.4s ease;
    }

    .media-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom right,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.1)
      );
      z-index: 1;
    }

    &:hover .media-bg {
      transform: scale(1.05);
    }
  }

  .service-content {
    background: var(--surface);
    position: relative;
    z-index: 2;

    .icon-wrap {
      color: var(--accent);
    }
    h4 {
      color: var(--heading-color);
    }
  }

  .btn-outline-secondary {
    color: var(--text);
    border-color: var(--surface-border);
    transition: all 0.18s ease;
    &:hover {
      background-color: var(--accent-muted);
      border-color: var(--accent);
    }
  }
}
</style>
