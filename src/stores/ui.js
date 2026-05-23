// =============================
// src/stores/ui.js
// =============================
import { defineStore } from 'pinia'
import { watch, nextTick } from 'vue'

// util: aplica clases/attrs al <body>
function applyBody({ theme, scheme, font, extraClasses = [], attrs = {} }) {
  const body = document.body
  if (!body) return

  // Limpia clases anteriores que empiecen con estos prefijos
  const classPrefixes = ['scheme-', 'font-scheme-', 'invite-', 'has-']
  body.classList.forEach(c => {
    if (classPrefixes.some(p => c.startsWith(p))) {
      body.classList.remove(c)
    }
  })

  // Aplica nuevas clases
  if (scheme) body.classList.add(`scheme-${scheme}`)
  if (font) body.classList.add(`font-scheme-${font}`)
  if (theme) body.classList.add(theme)
  extraClasses.forEach(c => body.classList.add(c))

  // Aplica atributos data-* si se definen
  Object.entries(attrs).forEach(([k, v]) => {
    if (v === false || v == null) body.removeAttribute(k)
    else body.setAttribute(k, String(v))
  })
}


export const useUiStore = defineStore('ui', {
  state: () => ({
    // Valores globales por defecto
    theme: 'invite-basic', // clase de tema (para <div.layout> y opcional en body)
    scheme: 'light',       // light|dark|rose-dark|etc (gobierna variables CSS)
    font: 'classic',        // modern|serif|handwritten...
    // Config extra para body
    bodyExtraClasses: [],  // p.ej. ['has-sticky-nav']
    bodyAttrs: {           // p.ej. { 'data-page': 'home', 'data-scheme': 'dark' }
      'data-page': 'home',
    },
  }),
  actions: {
    setTheme(val) { this.theme = val },
    setScheme(val) { this.scheme = val },
    setFont(val) { this.font = val },
    setBodyExtraClasses(list = []) { this.bodyExtraClasses = list },
    setBodyAttrs(obj = {}) { this.bodyAttrs = obj },

    // Aplica todo al body
    async applyToBody() {
      await nextTick()
      applyBody({
        theme: this.theme,
        scheme: this.scheme,
        font: this.font,
        extraClasses: this.bodyExtraClasses,
        attrs: this.bodyAttrs,
      })
    },

    // Lee overrides desde route.meta.ui (si existieran)
    applyFromRouteMeta(meta = {}) {
      const ui = meta?.ui
      if (!ui) return

      if (ui.theme) this.theme = ui.theme
      if (ui.scheme) this.scheme = ui.scheme
      if (ui.font) this.font = ui.font
      if (ui.bodyExtraClasses) this.bodyExtraClasses = ui.bodyExtraClasses
      if (ui.bodyAttrs) this.bodyAttrs = ui.bodyAttrs
    },
  },
})

// Hook que conecta el store con el body de forma reactiva
export function bindUiToBody(ui) {
  // Aplica inicial
  ui.applyToBody()

  // Reaplica cuando cambien propiedades clave
  watch(
    () => [ui.theme, ui.scheme, ui.font, ui.bodyExtraClasses, ui.bodyAttrs],
    () => ui.applyToBody(),
    { deep: true }
  )
}
