<template>
  <div class="template-renderer" :class="[`scheme-${pageScheme}`]">
    <slot name="header" />
    
    <SectionRenderer
      v-for="(section, index) in sections"
      :key="section.id || `${section.type}-${index}`"
      :type="section.type"
      :props="section.props || {}"
      :id="section.id"
      :scheme="section.scheme || pageScheme"
    />
    
    <slot name="footer" />
  </div>
</template>

<script setup>
import SectionRenderer from './SectionRenderer.vue'

defineProps({
  sections: {
    type: Array,
    required: true,
    description: 'Array de secciones [{ type, props, scheme, id }]'
  },
  pageScheme: {
    type: String,
    default: 'default-light',
    description: 'Scheme por defecto para todas las secciones'
  }
})
</script>

<style scoped>
.template-renderer {
  min-height: 100vh;
  background: var(--surface);
  color: var(--text);
}
</style>