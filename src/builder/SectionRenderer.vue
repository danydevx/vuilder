<template>
  <div class="section-renderer">
    <component
      :is="componentComponent"
      v-if="componentComponent"
      v-bind="mergedProps"
      :key="sectionKey"
    />
    <div v-else class="alert alert-warning">
      Sección no encontrada: <strong>{{ type }}</strong>
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { SectionRegistry, getDefaultProps } from './SectionRegistry.js'

const props = defineProps({
  type: {
    type: String,
    required: true,
    description: 'Tipo de sección (ej: hero, content1, countdown, etc)'
  },
  props: {
    type: Object,
    default: () => ({}),
    description: 'Props para la sección'
  },
  id: {
    type: String,
    default: null,
    description: 'ID override para la sección'
  },
  scheme: {
    type: String,
    default: null,
    description: 'Scheme override'
  }
})

const sectionInfo = computed(() => SectionRegistry[props.type])
const componentComponent = computed(() => {
  if (!sectionInfo.value) return null
  return sectionInfo.value.component
})

const sectionKey = computed(() => props.id || `${props.type}-${Math.random().toString(36).substr(2, 9)}`)

const defaultProps = computed(() => getDefaultProps(props.type))

const mergedProps = computed(() => {
  const base = { ...defaultProps.value }
  const overrides = { ...props.props }
  
  if (props.scheme) {
    overrides.scheme = props.scheme
  }
  
  return { ...base, ...overrides }
})
</script>

<style scoped>
.section-renderer {
  position: relative;
}

.alert-warning {
  padding: 1rem;
  border-radius: 0.5rem;
  background: color-mix(in oklab, var(--warning, #ca8a04), transparent 90%);
  color: var(--warning-text, #92400e);
  border: 1px solid var(--warning, #ca8a04);
}
</style>