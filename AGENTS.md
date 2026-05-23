# AGENTS.md — VueBuilder de Secciones Configurables

## Objetivo del proyecto

Este proyecto es un VueBuilder basado en componentes de secciones reutilizables. Cada sección representa un bloque visual completo de una página: calendarios, mapas, galerías, héroes, testimonios, contacto, precios, menús, etc.

El objetivo del agente es revisar, corregir, normalizar y crear componentes manteniendo coherencia visual, técnica y estructural en todo el builder.

## Stack obligatorio

- Vue 3
- Composition API con `<script setup>`
- JavaScript, no TypeScript
- Bootstrap 5.3 como base visual
- Bootstrap Icons para iconos
- LESS para estilos
- Pinia para estado global cuando aplique
- Vue Router para páginas
- AOS para animaciones simples al hacer scroll
- No agregar librerías nuevas sin justificarlo

## Estructura esperada

Los componentes deben vivir agrupados por tipo de sección:

```txt
src/
  sections/
    calendars/
      SectionCalendar.vue
      SectionCalendar2.vue
    maps/
      SectionMap.vue
      SectionMap2.vue
    galleries/
      SectionGallery.vue
    heroes/
      HeroInterior.vue
    testimonials/
      SectionTestimonials.vue
  pages/
    calendars.vue
    maps.vue
    agency.vue
  styles/
    scheme.less
    scheme-colors.less
    theme.less
    buttons.less
    fonts.less
```

Las páginas en `src/pages/` deben importar secciones y pasarles configuración mediante props. La sección no debe depender de una página específica.

Ejemplo de uso esperado:

```vue
<template>
  <main>
    <SectionCalendar v-bind="calendarProps" />
    <SectionMap v-bind="mapProps" />
  </main>
</template>

<script setup>
import SectionCalendar from '@/sections/calendars/SectionCalendar.vue'
import SectionMap from '@/sections/maps/SectionMap.vue'

const calendarProps = {
  id: 'agenda-principal',
  scheme: 'rose-light',
  title: 'Agenda su cita',
  subtitle: 'Seleccione una fecha disponible.',
}
</script>
```

## Principio central

Cada sección debe ser configurable desde el padre. El componente debe traer defaults razonables, pero el contenido final, textos, imágenes, acciones, datos y comportamiento deben poder controlarse desde la página.

No hardcodear contenido de negocio dentro del componente, salvo textos de fallback o demos claramente marcadas.

## Convención de carpetas

Cada tipo de sección debe tener su carpeta propia:

```txt
sections/calendars/
sections/maps/
sections/about/
sections/gallery/
sections/contact/
sections/services/
sections/testimonials/
```

Si una sección es una variación del mismo tipo, debe conservar el grupo:

```txt
sections/calendars/SectionCalendar.vue
sections/calendars/SectionCalendarGrid.vue
sections/calendars/SectionCalendarInline.vue
```

Evitar mezclar secciones diferentes en una misma carpeta.

## Nombres de componentes

Usar nombres descriptivos y consistentes:

```txt
SectionCalendar.vue
SectionMap.vue
SectionGallery.vue
SectionTestimonials.vue
HeroInterior.vue
HeroLanding.vue
```

Evitar nombres genéricos como:

```txt
Component1.vue
NewSection.vue
Test.vue
```

## Props base recomendadas

Toda sección nueva o refactorizada debe intentar respetar estas props cuando apliquen:

```js
const props = defineProps({
  id: { type: String, default: undefined },
  scheme: { type: String, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  description: { type: String, default: '' },
  backgroundImg: { type: String, default: '' },
  enableOverlay: { type: Boolean, default: false },
  fluid: { type: Boolean, default: false },
  align: { type: String, default: 'center' },
  boxed: { type: Boolean, default: false },
  ctas: { type: Array, default: () => [] },
  items: { type: Array, default: () => [] },
  config: { type: Object, default: () => ({}) },
})
```

No todas las secciones necesitan todas estas props, pero deben usarse los mismos nombres cuando el concepto sea el mismo.

## Schemes de color

El proyecto maneja schemes globales y schemes por componente.

Un scheme global puede aplicarse al `body`:

```html
<body class="scheme-rose-light">
```

Un scheme por sección debe aplicarse al componente:

```html
<section class="component-scheme-rose-light">
```

Regla para componentes:

```js
const schemeClass = computed(() => props.scheme ? `component-scheme-${props.scheme}` : '')
```

No usar:

```js
const schemeClass = computed(() => `component-scheme-${props.scheme}`)
```

porque genera `component-scheme-undefined` cuando no se pasa scheme.

## Variables CSS obligatorias

Los componentes deben consumir variables CSS del sistema. No usar colores fijos salvo casos muy justificados.

Usar:

```less
background: var(--surface);
color: var(--text);
border-color: var(--surface-border);
box-shadow: var(--shadow-sm);
```

Evitar:

```less
background: #ffffff;
color: #222222;
border-color: #dddddd;
```

Variables principales esperadas:

```less
--surface
--surface-2
--surface-muted
--surface-border
--surface-overlay
--text
--text-muted
--text-inverse
--accent
--accent-hover
--accent-muted
--accent-contrast
--shadow
--shadow-sm
--shadow-lg
--card-stroke
--card-bg-glass
--field-bg
--field-fg
--field-border
```

Si un scheme no tiene una variable que ya usan otros componentes, agregarla al scheme en lugar de meter un color fijo en el componente.

## Compatibilidad entre schemes

Al revisar componentes, validar que funcionen en:

- `scheme-rose-light`
- `scheme-rose-dark`
- `scheme-esmerald`
- `scheme-esmerald-dark`
- cualquier scheme global aplicado en `body`
- cualquier scheme local aplicado en la sección con `component-scheme-*`

El componente debe verse bien si no recibe `scheme`, tomando los valores heredados del body.

## LESS scoped

Todos los componentes deben usar:

```vue
<style lang="less" scoped>
```

La raíz visual debe tener una clase única:

```html
<section class="section section-calendar">
```

Y los estilos deben anidarse dentro de esa clase:

```less
.section-calendar {
  background: var(--surface);
  color: var(--text);

  .calendar-grid {
    display: grid;
  }
}
```

## Clases base de sección

Toda sección debe iniciar con una estructura parecida:

```vue
<section
  :id="id"
  class="section section-name position-relative overflow-hidden"
  :class="schemeClass"
>
  <div
    v-if="backgroundImg"
    class="section__bg"
    :style="{ backgroundImage: `url('${backgroundImg}')` }"
    aria-hidden="true"
  />

  <div v-if="enableOverlay" class="section__overlay" aria-hidden="true" />

  <div :class="containerClass">
    <!-- contenido -->
  </div>
</section>
```

Contenedor recomendado:

```js
const containerClass = computed(() => [
  props.fluid ? 'container-fluid px-3 px-md-5' : 'container',
  'position-relative',
])
```

## Header de sección

Usar estructura coherente:

```vue
<header v-if="title || subtitle || eyebrow" class="section__header text-center mb-5">
  <p v-if="eyebrow" class="section__eyebrow">{{ eyebrow }}</p>
  <h2 v-if="title" class="section__title">{{ title }}</h2>
  <p v-if="subtitle" class="section__subtitle">{{ subtitle }}</p>
</header>
```

Evitar estilos inline como:

```html
<p style="max-width: 42rem">
```

Moverlos a LESS:

```less
.section__subtitle {
  max-width: 42rem;
  margin-inline: auto;
}
```

## Botones y CTAs

Los botones deben usar las utilidades globales del proyecto:

```txt
btn-scheme
btn-outline
btn-ghost
btn-secondary-accent
```

CTAs esperados:

```js
ctas: [
  {
    label: 'Ver más',
    href: '/contacto',
    variant: 'solid',
    icon: 'bi bi-arrow-right',
  },
]
```

Resolver clase así:

```js
function getCtaClass(variant = 'solid') {
  const variants = {
    solid: 'btn-scheme',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    secondary: 'btn-secondary-accent',
  }

  return variants[variant] ?? variants.solid
}
```

## Animaciones

Se permite AOS, pero debe usarse con moderación.

Correcto:

```html
<div data-aos="fade-up" data-aos-duration="700">
```

Evitar animar cada elemento pequeño si afecta rendimiento.

## Reglas para refs en template

En Vue templates los refs se desenvuelven automáticamente. No usar `.value` en el template.

Incorrecto:

```vue
:disabled="sent.value"
```

Correcto:

```vue
:disabled="sent"
```

En `<script setup>` sí se usa `.value`.

## Validaciones de revisión obligatoria

Al revisar un componente existente, el agente debe buscar y corregir:

1. Props sin default cuando deberían tenerlo.
2. Arrays u objetos con default directo en vez de función.
3. `component-scheme-undefined`.
4. Uso de `.value` dentro del template.
5. Estilos inline que deberían estar en LESS.
6. Colores hardcodeados que deberían ser variables CSS.
7. Iconos que no sean Bootstrap Icons.
8. Comentarios con emojis o ruido innecesario.
9. Dependencia de una página específica.
10. Duplicación de lógica entre secciones similares.
11. Falta de accesibilidad básica en botones, modales e imágenes.
12. Uso excesivo de alertas nativas cuando convenga un estado visual.
13. Imports no usados.
14. Clases globales definidas dentro de estilos scoped sin necesidad.

## Notas específicas detectadas en SectionCalendar.vue

Al refactorizar `SectionCalendar.vue`, revisar especialmente:

- Cambiar `sent.value` por `sent` en el template.
- Evitar `component-scheme-undefined` cuando no se pase `scheme`.
- Convertir comentarios visuales con emojis a comentarios limpios o eliminarlos.
- Mover estilos inline a LESS.
- Reemplazar `alert()` por estados visibles o eventos emitidos cuando sea posible.
- Separar mejor la lógica demo de envío y reserva para que el componente sea reusable.
- Validar que `sendBy="whatsapp"` permita configurar número destino.
- Evitar bloquear scroll del body sin restaurarlo también si el componente se desmonta.
- Agregar `aria-label` al botón de cerrar modal.
- Agregar fallback cuando `config.generateTimeSlotsForDate` no exista.

## Eventos recomendados

Las secciones interactivas deben emitir eventos en lugar de acoplarse a una API o flujo específico.

Ejemplo:

```js
const emit = defineEmits(['submit', 'select-day', 'select-time', 'close', 'open'])
```

Uso:

```js
emit('submit', {
  day: selectedDay.value,
  time: selectedTime.value,
  form: form.value,
})
```

La página decide si guarda en API, manda WhatsApp, envía correo o muestra toast.

## Axios y llamadas API

No importar `axios` dentro de una sección si no se usa.

Si la sección necesita enviar datos, preferir una de estas opciones:

1. Emitir evento y que la página lo maneje.
2. Recibir una función por `config.onSubmit`.
3. Usar un servicio externo en `src/services/` si es un patrón global.

Ejemplo:

```js
if (props.config?.onSubmit) {
  await props.config.onSubmit(payload)
}
```

## LocalStorage

Si una sección usa localStorage:

- La key debe derivarse del `id`.
- Debe tener fallback.
- Debe estar documentado.
- No debe impedir reutilizar el componente en varias páginas.

Ejemplo:

```js
const storageKey = computed(() => {
  const cleanId = props.id?.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase()
  return `vuebuilder:${cleanId || 'section-calendar'}`
})
```

## Modales

Si una sección tiene modal:

- Debe cerrar con click en backdrop si aplica.
- Debe tener botón de cerrar con `aria-label`.
- Debe restaurar el scroll del body.
- Debe considerar tecla Escape si el modal es importante.
- Debe evitar depender únicamente de `alert()`.

Botón correcto:

```html
<button class="btn btn-ghost" type="button" aria-label="Cerrar modal" @click="closeModal">
  <i class="bi bi-x" aria-hidden="true"></i>
</button>
```

## Imágenes y fondos

Para imágenes normales:

```html
<img :src="image.src" :alt="image.alt || ''" class="img-fluid" loading="lazy" />
```

Para fondos decorativos:

```html
<div class="section__bg" aria-hidden="true"></div>
```

No dejar imágenes sin `alt`, salvo decorativas con `alt=""`.

## Accesibilidad mínima

Todo componente debe cuidar:

- Botones con `type="button"` cuando no envían formulario.
- Iconos decorativos con `aria-hidden="true"`.
- Formularios con `label` asociado cuando sea posible.
- Estados de error visibles.
- Modales con cierre claro.
- Links reales para navegación; botones para acciones.

## Páginas como configuradoras

Las páginas en `src/pages/` deben funcionar como composición de secciones. Deben contener datos y configuración, no estilos profundos ni lógica interna de cada sección.

Correcto:

```vue
<SectionCalendar v-bind="calendarProps" @submit="handleCalendarSubmit" />
```

Incorrecto:

```vue
<SectionCalendar title="..." subtitle="..." background-img="..." />
```

cuando la configuración se vuelve larga o difícil de leer. En ese caso, usar objetos `const`.

## Meta por ruta

El proyecto puede aplicar UI desde `route.meta`, por ejemplo:

```js
meta: {
  title: 'Calendario',
  scheme: 'rose-light',
  theme: 'invite-wedding',
  font: 'classic',
}
```

Las secciones deben poder respetar el scheme global si no reciben `scheme` propio.

## main.js y UI global

El proyecto inicializa Bootstrap, AOS, Pinia, Router, MasonryWall y estilos globales desde `main.js`.

No repetir estos imports dentro de cada componente:

```js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'aos/dist/aos.css'
```

Los componentes solo deben importar lo estrictamente necesario.

## Orden recomendado dentro de un componente

```vue
<template>
  <!-- markup -->
</template>

<script setup>
// imports
// props
// emits
// computed
// refs
// watchers
// lifecycle
// methods
</script>

<style lang="less" scoped>
// estilos
</style>
```

## Estilo de código

- Usar comillas simples en JS.
- Usar punto y coma solo si el archivo ya lo usa de forma consistente.
- Mantener indentación de 2 espacios.
- Evitar lógica compleja dentro del template.
- Crear computed para clases y datos derivados.
- Evitar comentarios obvios.
- No usar emojis en comentarios ni mensajes técnicos.

## Checklist antes de terminar una tarea

Antes de entregar cambios, el agente debe validar:

```bash
npm run dev
npm run build
```

Si no puede ejecutar comandos, debe revisar manualmente:

- Que no haya imports sin usar.
- Que el template compile.
- Que todas las props usadas existan.
- Que los schemes no rompan contraste.
- Que no haya `.value` en template.
- Que no se haya agregado una dependencia innecesaria.
- Que los estilos estén dentro de `<style lang="less" scoped>`.

## Modo de trabajo del agente

Cuando el agente reciba una tarea, debe seguir este flujo:

1. Revisar el componente actual.
2. Detectar patrones repetidos con otras secciones si existen.
3. Normalizar props, clases, schemes y estructura.
4. Corregir errores de Vue, LESS y accesibilidad.
5. Mantener el comportamiento actual salvo que el cambio sea solicitado.
6. Entregar archivos completos listos para copiar y pegar.
7. Explicar brevemente qué cambió.

## No hacer

- No migrar a TypeScript.
- No cambiar Bootstrap por Tailwind.
- No meter UI frameworks nuevos.
- No hardcodear textos finales de negocio dentro de componentes genéricos.
- No crear estilos globales desde un componente sin necesidad.
- No romper la compatibilidad con schemes globales del body.
- No meter lógica de API dentro de secciones reutilizables si puede manejarse con eventos.
- No duplicar el mismo componente con cambios mínimos si se puede resolver con props.

## Resultado esperado

El VueBuilder debe quedar como un sistema de secciones limpio, coherente y reutilizable, donde cada página solo compone bloques y pasa configuración, mientras cada componente mantiene una estructura visual consistente, compatible con schemes globales y locales, y fácil de extender para nuevos tipos de landing pages.
