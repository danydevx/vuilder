<template>
  <section
    :id="id"
    class="section section-map-leaflet2 position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- 🌆 Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- 🧭 Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']">
      <!-- 🪶 Header -->
      <header
        v-if="title || subtitle"
        class="section-header mb-5"
        :class="headerAlignClass"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-duration="700"
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

      <!-- 🌍 Mapa -->
      <div
        ref="mapContainer"
        class="map-leaflet rounded-4 shadow-sm overflow-hidden mb-4"
        :data-aos="animate ? 'fade-up' : null"
      ></div>

      <!-- 🖼️ Galería Swiper -->
      <div
        v-if="Array.isArray(location.gallery) && location.gallery.length"
        class="gallery-carousel mb-5"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-delay="150"
      >
        <swiper-container
          :slides-per-view="slidesPerView"
          :loop="true"
          :space-between="20"
          :navigation="true"
          :pagination="{ clickable: true }"
          :breakpoints="breakpoints"
          class="py-3"
        >
          <swiper-slide
            v-for="(img, i) in location.gallery"
            :key="i"
            class="media-slide rounded-4 overflow-hidden shadow-sm"
          >
            <a
              :href="img"
              class="d-block glightbox"
              :data-gallery="`${id}-gallery`"
              :data-title="`Vista ${i + 1}`"
            >
              <img
                :src="img"
                :alt="`Vista ${i + 1}`"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </a>
          </swiper-slide>
        </swiper-container>
      </div>

      <!-- 🏢 Información -->
      <div
        class="venue-info rounded-4 shadow-sm p-4"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-delay="200"
        :class="{
          'text-center': align === 'center',
          'text-end': align === 'right',
          'text-start': align === 'left',
        }"
      >
        <!-- Datos básicos -->
        <div class="mb-4">
          <h4 class="fw-bold mb-1">{{ location.name }}</h4>
          <p class=" small mb-2">{{ location.address }}</p>

          <!-- Contacto -->
          <ul class="list-unstyled small mb-3">
            <li v-if="location.contact?.phone">
              <i class="bi bi-telephone me-2 text-accent"></i>
              <a :href="`tel:${location.contact.phone}`">{{ location.contact.phone }}</a>
            </li>
            <li v-if="location.contact?.email">
              <i class="bi bi-envelope me-2 text-accent"></i>
              <a :href="`mailto:${location.contact.email}`">{{ location.contact.email }}</a>
            </li>
          </ul>

          <!-- Redes -->
          <div
            v-if="location.social?.length"
            class="d-flex gap-3 mb-4"
            :class="justifyClass"
          >
            <a
              v-for="(s, i) in location.social"
              :key="i"
              :href="s.href"
              target="_blank"
              rel="noopener"
              class="fs-4 text-accent-hover"
            >
              <i :class="s.icon"></i>
            </a>
          </div>
        </div>

        <!-- Tabs -->
        <ul class="nav nav-tabs justify-content-center mb-4" role="tablist">
          <li class="nav-item" v-if="location.schedule?.length">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'schedule' }"
              @click="activeTab = 'schedule'"
            >
              <i class="bi bi-clock me-1"></i> Horarios
            </button>
          </li>
          <li class="nav-item" v-if="location.info?.accessibility?.length">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'accessibility' }"
              @click="activeTab = 'accessibility'"
            >
              <i class="bi bi-universal-access me-1"></i> Accesibilidad
            </button>
          </li>
          <li class="nav-item" v-if="location.transports?.length">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'routes' }"
              @click="activeTab = 'routes'"
            >
              <i class="bi bi-bus-front me-1"></i> Rutas
            </button>
          </li>
        </ul>

        <!-- Contenido de tabs -->
        <div class="tab-content text-start mx-auto" style="max-width: 700px">
          <div
            v-if="activeTab === 'schedule' && location.schedule?.length"
            class="tab-pane show fade active"
          >
            <ul class="list-unstyled mb-0 small">
              <li
                v-for="(day, i) in location.schedule"
                :key="i"
                class="d-flex justify-content-between border-bottom py-1"
              >
                <span>{{ day.day }}</span>
                <span>{{ day.open }} – {{ day.close }}</span>
              </li>
            </ul>
          </div>

          <div
            v-if="activeTab === 'accessibility' && location.info?.accessibility?.length"
            class="tab-pane show fade active"
          >
            <ul class="list-unstyled small mb-0">
              <li
                v-for="(item, i) in location.info.accessibility"
                :key="i"
                class="d-flex align-items-center mb-1"
              >
                <i class="bi bi-check-circle text-accent me-2"></i>{{ item }}
              </li>
            </ul>
          </div>

          <div
            v-if="activeTab === 'routes' && location.transports?.length"
            class="tab-pane show fade active"
          >
            <ul class="list-unstyled small mb-0">
              <li
                v-for="(t, i) in location.transports"
                :key="i"
                class="d-flex align-items-center mb-1"
              >
                <i class="bi bi-geo-alt text-accent me-2"></i>
                <span>{{ t.name }} — {{ t.type }} ({{ t.distance }})</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Botones -->
        <div class="mt-5 d-flex flex-wrap gap-2" :class="justifyClass">
          <button @click="showRoute" class="btn btn-outline mb-2">
            <i class="bi bi-sign-turn-right me-1"></i> Cómo llegar
          </button>
          <a :href="location.mapUrl" target="_blank" class="btn btn-scheme mb-2">
            <i class="bi bi-geo-alt-fill me-1"></i> Ver en Google Maps
          </a>
        </div>

        <!-- Mensaje -->
        <p
          v-if="routeMessage"
          class="small  mt-3 text-center"
          :class="{ 'text-danger': routeError }"
        >
          {{ routeMessage }}
        </p>
      </div>

      <!-- 💬 WhatsApp flotante -->
      <a
        v-if="location.contact?.whatsapp"
        class="whatsapp-float"
        :href="`https://wa.me/${location.contact.whatsapp}`"
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
      >
        <i class="bi bi-whatsapp"></i>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import GLightbox from 'glightbox'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'glightbox/dist/css/glightbox.min.css'
import { register } from 'swiper/element/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

register()

/* ===============================
   🔧 Props estándar
=============================== */
const props = defineProps({
  id: { type: String, default: 'section-map-leaflet2' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Ubicación avanzada' },
  subtitle: { type: String, default: 'Encuentra todos los detalles del lugar.' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  animate: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  location: { type: Object, required: true },
})

const schemeClass = computed(() => `component-scheme-${props.scheme}`)
const headerAlignClass = computed(() => ({
  'text-center': props.align === 'center',
  'text-start': props.align === 'left',
  'text-end': props.align === 'right',
}))
const justifyClass = computed(() => {
  const map = {
    start: 'justify-content-start',
    center: 'justify-content-center',
    end: 'justify-content-end',
    between: 'justify-content-between',
    around: 'justify-content-around',
  }
  return map[props.justify] || 'justify-content-center'
})

const mapContainer = ref(null)
const activeTab = ref('schedule')
const routeMessage = ref('')
const routeError = ref(false)
let mapInstance = null
let routeControl = null

// Configuración Swiper
const slidesPerView = computed(() =>
  props.location.gallery?.length > 0 ? Math.min(3, props.location.gallery.length) : 1
)
const breakpoints = {
  320: { slidesPerView: 1, spaceBetween: 10 },
  768: { slidesPerView: 2, spaceBetween: 15 },
  1024: { slidesPerView: slidesPerView.value, spaceBetween: 20 },
}

onMounted(async () => {
  await nextTick()
  initMap()
  GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true })
})
watch(() => props.location, initMap, { deep: true })

function initMap() {
  if (!props.location?.lat || !props.location?.lng) return
  if (mapInstance) mapInstance.remove()

  mapInstance = L.map(mapContainer.value, {
    center: [props.location.lat, props.location.lng],
    zoom: props.location.zoom || 15,
    zoomControl: true,
    scrollWheelZoom: false,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mapInstance)

  const markerIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })

  L.marker([props.location.lat, props.location.lng], { icon: markerIcon })
    .addTo(mapInstance)
    .bindPopup(`<strong>${props.location.name}</strong><br>${props.location.address}`)
}

/* ======================================
   🚀 Cómo llegar + modo demo
====================================== */
function showRoute() {
  if (!navigator.geolocation) return useDemoLocation()

  routeMessage.value = 'Obteniendo tu ubicación actual...'
  routeError.value = false

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      drawRoute(pos.coords.latitude, pos.coords.longitude)
      routeMessage.value = 'Ruta mostrada correctamente ✅'
    },
    (err) => {
      console.warn('Error geolocalización:', err)
      routeError.value = true
      routeMessage.value =
        err.code === 1
          ? 'No diste permiso de ubicación. Mostrando modo demo.'
          : 'No se pudo obtener tu ubicación. Usando modo demo.'
      useDemoLocation()
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
}

function drawRoute(lat, lng) {
  const userLatLng = L.latLng(lat, lng)
  const destLatLng = L.latLng(props.location.lat, props.location.lng)
  if (routeControl) mapInstance.removeControl(routeControl)

  routeControl = L.Routing.control({
    waypoints: [userLatLng, destLatLng],
    lineOptions: { styles: [{ color: '#7c3aed', weight: 5, opacity: 0.8 }] },
    addWaypoints: false,
    draggableWaypoints: false,
    showAlternatives: false,
    routeWhileDragging: false,
    language: 'es',
  }).addTo(mapInstance)
}

function useDemoLocation() {
  const demoLat = 20.6767
  const demoLng = -103.3476
  routeMessage.value = 'Mostrando ruta de demostración desde Guadalajara 🇲🇽'
  routeError.value = false
  drawRoute(demoLat, demoLng)
}
</script>

<style lang="less" scoped>
.section-map-leaflet2 {
  background: var(--surface);
  color: var(--text);

  .bg-media,
  .bg-overlay {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    pointer-events: none;
  }

  .bg-overlay {
    background: var(--surface-overlay);
  }

  .map-leaflet {
    height: 380px;
    border: 1px solid var(--surface-border);
    background: var(--surface-2);
  }

  .venue-info {
    background: color-mix(in srgb, var(--surface) 88%, transparent);
    border: 1px solid var(--surface-border);
    backdrop-filter: blur(10px);
  }

  .nav-tabs {
    border-bottom: 1px solid var(--surface-border);

    .nav-link {
      color: var(--);
      border: none;
      border-bottom: 2px solid transparent;
      background: transparent;
      font-weight: 500;
      transition: all 0.25s ease;

      &.active {
        color: var(--accent);
        border-color: var(--accent);
      }

      &:hover:not(.active) {
        color: color-mix(in srgb, var(--accent) 40%, var(--text));
      }
    }
  }

  :deep(.leaflet-routing-container) {
    background: var(--surface) !important;
    color: var(--text) !important;
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--surface-border);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    line-height: 1.4;
    max-width: 260px;
  }

  .whatsapp-float {
    position: fixed;
    right: 1.25rem;
    bottom: 1.25rem;
    background: #25d366;
    color: #fff;
    font-size: 1.75rem;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
    z-index: 1055;
  }
}
</style>
