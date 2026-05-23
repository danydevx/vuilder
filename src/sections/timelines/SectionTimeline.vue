<!-- src/sections/SectionTimelineElegant.vue -->
<template>
  <section
    :id="id"
    class="section section-timeline-elegant position-relative overflow-hidden"
    :class="schemeClass"
  >
    <div v-if="backgroundImg" class="bg-media" :style="{ backgroundImage: `url('${backgroundImg}')` }" aria-hidden="true"></div>
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <div class="container position-relative py-5">
      <!-- Encabezado -->
      <header class="text-center mb-5" data-aos="fade-up">
        <h2 class="display-6 ">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 600px">{{ subtitle }}</p>
      </header>

      <!-- Timeline -->
      <div class="timeline position-relative">
        <div
          v-for="(event, i) in events"
          :key="i"
          class="timeline-item d-flex flex-column flex-md-row align-items-md-center"
          :class="{ 'flex-md-row-reverse': i % 2 !== 0 }"
          data-aos="fade-up"
          :data-aos-delay="i * 150"
        >
          <!-- Punto y línea -->
          <div class="timeline-marker position-relative">
            <span class="dot"></span>
            <span class="line"></span>
          </div>

          <!-- Contenido -->
          <div class="timeline-content card shadow-sm border-0 rounded-4 p-4 ms-md-4 me-md-4 flex-fill">
            <div class="timeline-meta small  mb-1">
              <i :class="event.icon || 'bi bi-clock'" class="me-1"></i>
              {{ event.time }}
            </div>
            <h3 class="h5  mb-2">{{ event.title }}</h3>
            <p class="mb-0 ">{{ event.description }}</p>

            <div v-if="event.image" class="timeline-image mt-3 rounded-3 overflow-hidden ratio ratio-16x9">
              <img :src="event.image" :alt="event.title" class="w-100 h-100 object-fit-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div v-if="ctas?.length" class="text-center mt-5" data-aos="fade-up">
        <a
          v-for="(cta, i) in ctas"
          :key="i"
          :href="cta.href"
          class="btn me-2 mb-2"
          :class="[
            cta.variant === 'solid' ? 'btn-scheme' :
            cta.variant === 'outline' ? 'btn-outline' : 'btn-ghost'
          ]"
        >
          <i v-if="cta.icon" :class="cta.icon" class="me-1"></i>
          {{ cta.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: 'section-timeline-elegant' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: true },
  ctas: { type: Array, default: () => [] },
  events: {
    type: Array,
    default: () => [
      {
        time: '3:00 PM',
        title: 'Ceremonia Religiosa',
        description: 'En la Parroquia de San José.',
        icon: 'bi bi-heart',
        image: 'https://placehold.co/800x600/jpg?text=Ceremonia',
      },
      {
        time: '5:00 PM',
        title: 'Recepción en Terraza Aurora',
        description: 'Brindis, cena y baile con música en vivo.',
        icon: 'bi bi-music-note-beamed',
        image: 'https://placehold.co/800x600/jpg?text=Recepcion',
      },
    ],
  },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
</script>

<style lang="less" scoped>
.section-timeline-elegant {
  background: var(--surface);
  color: var(--text);

  .bg-media {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.6);
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
  }

  .timeline {
    position: relative;
    margin: 0 auto;
    padding: 0;
    max-width: 900px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 3px;
      height: 100%;
      background: color-mix(in srgb, var(--accent) 60%, var(--text) 20%);
      transform: translateX(-50%);
      border-radius: 3px;
    }
  }

  .timeline-item {
    position: relative;
    margin-bottom: 3rem;

    .timeline-marker {
      position: relative;
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .dot {
        position: absolute;
        width: 18px;
        height: 18px;
        background: var(--accent);
        border-radius: 50%;
        z-index: 3;
        box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 20%, transparent 80%);
      }

      .line {
        position: absolute;
        width: 3px;
        height: 120%;
        background: color-mix(in srgb, var(--accent) 50%, var(--text) 20%);
        z-index: 2;
      }
    }

    .timeline-content {
      background: var(--surface-2);
      color: var(--text);
      border: 1px solid var(--surface-border);
      transition: transform 0.4s ease, box-shadow 0.4s ease;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
      }
    }

    @media (max-width: 768px) {
      flex-direction: column !important;

      .timeline-marker {
        width: 100%;
        margin-bottom: 1rem;

        .line {
          display: none;
        }
      }
    }
  }

  .btn-scheme,
  .btn-outline,
  .btn-ghost {
    transition: all 0.3s ease;
  }
}
</style>
