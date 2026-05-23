// =============================
// src/main.js
// =============================
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
 
// Estilos globales
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


// Bootstrap JS expuesto al global
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap


 
 

 import MasonryWall from '@yeger/vue-masonry-wall'

import 'animate.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '@/styles/fonts.less'
 
import '@/styles/scheme.less'
 
import '@/styles/theme.less'
import '@/styles/buttons.less'
import '@/styles/scheme-colors.less'

// Layout raíz
import Layout from '@/layouts/Layout.vue'

// Store UI
import { useUiStore, bindUiToBody } from '@/stores/ui'

const app = createApp(Layout)
const pinia = createPinia()
app.use(pinia)
app.use(MasonryWall)
app.use(router)

const ui = useUiStore()

 
ui.setTheme('invite-wedding')          // Clase del wrapper
ui.setScheme('dark-purple')           // Cambia esquema completo (body + wrapper)
ui.setFont('classic')                // Fuente principal
ui.setBodyAttrs({ 'data-page': 'home', 'data-scheme': ui.scheme })

// Vincula reactividad de UI con el <body>
bindUiToBody(ui)

// Rutas: aplicar UI antes de cargar página
router.beforeEach((to, _from, next) => {
  ui.applyFromRouteMeta(to.meta)
  if (to.meta?.title) document.title = `${to.meta.title} – Invitados.vip`
  next()
})

router.isReady().then(() => {
  app.mount('#app')

  AOS.init({
    duration: 800,
    once: true,
    offset: 40,
    easing: 'ease-out',
    mirror: false,
  })

  router.afterEach(() => {
    setTimeout(() => AOS.refreshHard(), 0)
  })
})

console.info('%cInvitados.vip – Versión 1.0.0', 'color: #0ea5e9; font-weight: bold;')
