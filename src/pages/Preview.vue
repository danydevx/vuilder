<template>
  <div class="preview-page">
    <TemplateRenderer
      :sections="template.page?.sections || []"
      :pageScheme="template.page?.scheme || 'default-light'"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTemplateBuilder } from '@/builder/useTemplateBuilder.js'
import TemplateRenderer from '@/builder/TemplateRenderer.vue'

const { template, loadFromStorage } = useTemplateBuilder()

onMounted(() => {
  loadFromStorage()
})
</script>

<style scoped>
.preview-page {
  min-height: 100vh;
}
</style>