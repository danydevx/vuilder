<template>
  <section
    :id="id"
    class="section section-map-route position-relative overflow-hidden py-5"
    :class="schemeClass"
  >
    <!-- 🌄 Fondo -->
    <div
      v-if="backgroundImg"
      class="bg-media"
      :style="{ backgroundImage: `url('${backgroundImg}')` }"
      aria-hidden="true"
    />
    <div v-if="enableOverlay" class="bg-overlay" aria-hidden="true" />

    <!-- 🧭 Contenedor -->
    <div :class="[fluid ? 'container-fluid px-3 px-md-5' : 'container', 'position-relative']">
      <!-- Header -->
      <header
        v-if="title || subtitle"
        class="section-header mb-5"
        :class="headerAlignClass"
        :data-aos="animate ? 'fade-up' : null"
      >
        <h2 class="fw-bold display-6">{{ title }}</h2>
        <p
          v-if="subtitle"
          class="section-subtitle  mt-2"
          style="max-width: 42rem"
          :class="{ 'mx-auto': align === 'center' }"
        >
          {{ subtitle }}
        </p>
      </header>

      <!-- 🗺️ Mapa -->
      <div
        ref="mapContainer"
        class="map-leaflet rounded-4 shadow-sm overflow-hidden mb-4"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-delay="100"
      ></div>

      <!-- ℹ️ Información -->
      <div
        class="map-info mt-4 rounded-4 shadow-sm"
        :class="{
          'text-center': align === 'center',
          'text-end': align === 'right',
          'text-start': align === 'left',
        }"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-delay="200"
      >
        <h4 class="fw-bold mb-1">{{ location.name }}</h4>
        <p class=" mb-2 small">{{ location.address }}</p>

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

        <!-- Botones -->
        <div class="d-flex flex-wrap gap-2" :class="justifyClass">
          <button @click="showRoute" class="btn btn-scheme mb-2">
            <i class="bi bi-sign-turn-right me-1"></i> Cómo llegar
          </button>
          <a :href="location.mapUrl" target="_blank" class="btn btn-outline mb-2">
            <i class="bi bi-geo-alt-fill me-1"></i> Ver en Google Maps
          </a>
        </div>

        <!-- Mensaje -->
        <p
          v-if="routeMessage"
          class="small mt-3"
          :class="[routeError ? 'text-danger' : '']"
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
import { ref, computed, onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

/* ===============================
   🔧 Props estándar
=============================== */
const props = defineProps({
  id: { type: String, default: 'section-map-route' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Cómo llegar al lugar' },
  subtitle: { type: String, default: 'Calcula la ruta desde tu ubicación actual hasta la terraza.' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  justify: { type: String, default: 'center' },
  animate: { type: Boolean, default: true },
  order: { type: String, default: 'normal' },
  location: { type: Object, required: true },
})

/* ===============================
   🧠 Computed
=============================== */
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

/* ===============================
   🗺️ Lógica Leaflet
=============================== */
const mapContainer = ref(null)
let mapInstance = null
let routeControl = null

const routeMessage = ref('')
const routeError = ref(false)

onMounted(() => initMap())
watch(() => props.location, () => initMap(), { deep: true })

function initMap() {
  if (!props.location?.lat || !props.location?.lng) return
  if (mapInstance) mapInstance.remove()

  mapInstance = L.map(mapContainer.value, {
    center: [props.location.lat, props.location.lng],
    zoom: props.location.zoom || 15,
    scrollWheelZoom: false,
    zoomControl: true,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(mapInstance)

  const markerIcon = L.icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })

  L.marker([props.location.lat, props.location.lng], { icon: markerIcon })
    .addTo(mapInstance)
    .bindPopup(`<strong>${props.location.name}</strong><br>${props.location.address}`)
}

/* ======================================
   🚀 Cómo llegar con modo demo
====================================== */
function showRoute() {
  if (!navigator.geolocation) {
    useDemoLocation()
    return
  }

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

/* ======================================
   🧭 Dibuja ruta real o simulada
====================================== */
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
    formatter: new L.Routing.Formatter({ language: 'es', units: 'metric' }),
    summaryTemplate:
      '<div class="route-summary"><h6>Ruta encontrada</h6><p>{distance}, {time}</p></div>',
    createMarker: (i, wp) =>
      i === 0
        ? L.marker(wp.latLng, { title: 'Ubicación actual (simulada)' })
        : L.marker(wp.latLng, { title: props.location.name }),
  }).addTo(mapInstance)
}

/* ======================================
   🚗 Modo demo
====================================== */
function useDemoLocation() {
  const demoLat = 20.6767
  const demoLng = -103.3476
  routeMessage.value = 'Mostrando ruta de demostración desde Guadalajara 🇲🇽'
  routeError.value = false
  drawRoute(demoLat, demoLng)
}
</script>

<style lang="less" scoped>
.section-map-route {
  background: var(--surface);
  color: var(--text);

  .bg-media,
  .bg-overlay {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }
  .bg-overlay {
    background: var(--surface-overlay);
  }

  .map-leaflet {
    height: 420px;
    background: var(--surface-2);
    border: 1px solid var(--surface-border);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }

  .map-info {
    background: color-mix(in srgb, var(--surface) 88%, transparent);
    border: 1px solid var(--surface-border);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);

    a {
      color: var(--accent);
      text-decoration: none;
      &:hover {
        color: var(--accent-hover);
        text-decoration: underline;
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
    max-width: 260px;
  }

  .route-summary * {
    color: var(--text) !important;
  }

  .btn-outline {
    border-color: var(--surface-border);
    color: var(--text);
    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
    }
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
    transition: transform 0.25s ease;
    &:hover {
      transform: scale(1.08);
    }
  }
}
</style>
