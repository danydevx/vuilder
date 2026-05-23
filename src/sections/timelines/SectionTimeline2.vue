<!-- src/sections/terrazas/timelines/SectionTimelineCards.vue -->
<template>
  <section
    :id="id"
    class="section section-timeline-cards position-relative overflow-hidden"
    :class="schemeClass"
  >
    <!-- Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    ></div>
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true"></div>

    <div class="container position-relative py-5">
      <!-- Encabezado -->
      <header class="text-center mb-5" data-aos="fade-up">
        <h2 class="display-6 ">{{ title }}</h2>
        <p v-if="subtitle" class=" mx-auto" style="max-width: 700px">
          {{ subtitle }}
        </p>
      </header>

      <!-- Timeline grid -->
      <div class="timeline-grid position-relative">
        <div
          v-for="(event, i) in events"
          :key="i"
          class="timeline-event card border-0 shadow-sm rounded-4 overflow-hidden"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <div class="timeline-marker">
            <div class="dot"></div>
            <div class="line"></div>
          </div>

          <div class="card-body">
            <div class="d-flex align-items-center mb-2">
              <i :class="event.icon" class="me-2 fs-5 text-accent"></i>
              <strong class="small text-uppercase ">
                {{ event.time }}
              </strong>
            </div>

            <h3 class="h5  mb-2">{{ event.title }}</h3>
            <p class=" mb-3">{{ event.description }}</p>

            <div v-if="event.image" class="ratio ratio-16x9 mb-2">
              <img
                :src="event.image"
                :alt="event.title"
                class="w-100 h-100 object-fit-cover rounded-3"
                loading="lazy"
              />
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
            cta.variant === 'solid'
              ? 'btn-scheme'
              : cta.variant === 'outline'
              ? 'btn-outline'
              : 'btn-ghost',
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
  id: { type: String, default: 'section-timeline-cards' },
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
.section-timeline-cards {
  background: var(--surface);
  color: var(--text);
  overflow: hidden;

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

  .timeline-grid {
    position: relative;
    max-width: 800px;
    margin: 0 auto;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 32px;
      width: 3px;
      height: 100%;
      background: color-mix(in srgb, var(--accent) 50%, var(--text) 20%);
      border-radius: 2px;
    }

    .timeline-event {
      position: relative;
      margin-left: 80px;
      margin-bottom: 3rem;
      background: var(--surface-2);
      border: 1px solid var(--surface-border);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      }

      .timeline-marker {
        position: absolute;
        top: 2rem;
        left: -52px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .dot {
          width: 16px;
          height: 16px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 20%, transparent 80%);
        }

        .line {
          width: 2px;
          flex: 1;
          background: color-mix(in srgb, var(--accent) 50%, var(--text) 20%);
          margin-top: 8px;
        }
      }
    }

    @media (max-width: 768px) {
      &::before {
        left: 16px;
      }
      .timeline-event {
        margin-left: 60px;
        .timeline-marker {
          left: -36px;
        }
      }
    }
  }

  .text-accent {
    color: var(--accent);
  }
}
</style>
