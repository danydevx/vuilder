<template>
  <section
    :id="id"
    class="section section-map-leaflet position-relative overflow-hidden py-5"
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

      <!-- 🗺️ Mapa -->
      <div
        ref="mapContainer"
        class="map-leaflet rounded-4 shadow-sm overflow-hidden mb-4"
        :data-aos="animate ? 'fade-up' : null"
      ></div>

      <!-- ℹ️ Información -->
      <div
        v-if="info"
        class="map-info position-relative mt-4 rounded-4 shadow-sm"
        :class="{
          'text-center': align === 'center',
          'text-end': align === 'right',
          'text-start': align === 'left',
        }"
        :data-aos="animate ? 'fade-up' : null"
        data-aos-delay="150"
      >
        <h5 class="fw-bold mb-1">{{ info.title }}</h5>
        <p v-if="info.address" class="small  mb-3">{{ info.address }}</p>

        <!-- 📍 Botones -->
        <div class="d-flex flex-wrap gap-2" :class="justifyClass">
          <button @click="showRoute" class="btn btn-scheme">
            <i class="bi bi-sign-turn-right me-1"></i> Cómo llegar
          </button>

          <a :href="location.mapUrl" target="_blank" class="btn btn-outline">
            <i class="bi bi-geo-alt-fill me-1"></i> Ver en Google Maps
          </a>
        </div>

        <!-- 📨 Mensaje -->
        <p
          v-if="routeMessage"
          class="small mt-3"
          :class="routeError ? 'text-danger' : ''"
        >
          {{ routeMessage }}
        </p>
      </div>
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
  id: { type: String, default: 'section-map-leaflet' },
  scheme: { type: String, default: 'default-light' },
  title: { type: String, default: 'Ubicación del Evento' },
  subtitle: {
    type: String,
    default: 'Encuentra fácilmente cómo llegar al lugar de la celebración.',
  },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' }, // left | center | right
  justify: { type: String, default: 'center' }, // start | center | end | between | around
  animate: { type: Boolean, default: true },
  location: { type: Object, required: true },
  info: { type: Object, default: () => ({}) },
})

/* ===============================
   🧮 Computed y referencias
=============================== */
const schemeClass = computed(() => `component-scheme-${props.scheme}`)

const headerAlignClass = computed(() => ({
  'text-center': props.align === 'center',
  'text-start': props.align === 'left',
  'text-end': props.align === 'right'
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
let mapInstance = null
let routeControl = null
const routeMessage = ref('')
const routeError = ref(false)

/* ===============================
   🗺️ Inicialización del mapa
=============================== */
onMounted(initMap)
watch(() => props.location, initMap, { deep: true })

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

/* ===============================
   🚀 Función "Cómo llegar"
=============================== */
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

/* ===============================
   🧭 Dibuja la ruta real o demo
=============================== */
function drawRoute(lat, lng) {
  const userLatLng = L.latLng(lat, lng)
  const destLatLng = L.latLng(props.location.lat, props.location.lng)
  if (routeControl) mapInstance.removeControl(routeControl)

  routeControl = L.Routing.control({
    waypoints: [userLatLng, destLatLng],
    lineOptions: {
      styles: [{ color: '#7c3aed', weight: 5, opacity: 0.8 }],
    },
    addWaypoints: false,
    draggableWaypoints: false,
    showAlternatives: false,
    routeWhileDragging: false,
    language: 'es',
    formatter: new L.Routing.Formatter({ language: 'es', units: 'metric' }),
  }).addTo(mapInstance)
}

/* ===============================
   🚗 Modo demostración
=============================== */
function useDemoLocation() {
  const demoLat = 20.6767
  const demoLng = -103.3476
  routeMessage.value = 'Mostrando ruta de demostración desde Guadalajara 🇲🇽'
  routeError.value = false
  drawRoute(demoLat, demoLng)
}
</script>

<style lang="less" scoped>
.section-map-leaflet {
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
    width: 100%;
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
    padding: 2rem;
    border-radius: 1rem;
    backdrop-filter: blur(10px);
  }

  .btn-outline {
    border-color: var(--surface-border);
    color: var(--text);
    &:hover {
      background: var(--accent);
      color: var(--text-inverse);
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

  .section-title {
    color: var(--heading-color);
  }

  .section-subtitle {
    color: var(--);
  }

  @media (max-width: 768px) {
    .map-leaflet {
      height: 320px;
    }
    .map-info {
      padding: 1.25rem;
    }
  }
}
</style>
