<template>
  <div class="builder-demo">
    <PageNav sticky />
    
    <div class="container py-5">
      <h1 class="mb-4">Template Builder</h1>
      
      <!-- Controls -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="d-flex gap-2 flex-wrap mb-3">
            <button class="btn btn-primary" @click="loadDemoTemplate">
              <i class="bi bi-download me-1"></i> Cargar Demo
            </button>
            <button class="btn btn-outline-secondary" @click="createNewTemplate">
              <i class="bi bi-file-plus me-1"></i> Nuevo
            </button>
            <button class="btn btn-outline-secondary" @click="showJSON = !showJSON">
              <i class="bi bi-code-slash me-1"></i> {{ showJSON ? 'Ocultar' : 'Ver' }} JSON
            </button>
            <button class="btn btn-success" @click="openPreview">
              <i class="bi bi-eye me-1"></i> Ver Preview!
            </button>
          </div>
          
          <div v-if="error" class="alert alert-danger mt-2">
            {{ error }}
          </div>
        </div>
      </div>
      
      <!-- JSON Viewer -->
      <div v-if="showJSON" class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">JSON</h5>
          <pre class="bg-dark text-light p-3 rounded" style="max-height: 300px; overflow: auto;"><code>{{ templateJSON }}</code></pre>
        </div>
      </div>
      
      <!-- Sections Catalog -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title mb-3">Secciones</h5>
          
          <!-- Category Tabs -->
          <div class="d-flex gap-1 flex-wrap mb-3">
            <button 
              v-for="cat in sectionsByCategory" 
              :key="cat.key"
              class="btn btn-sm"
              :class="selectedCategory === cat.key ? 'btn-primary' : 'btn-outline-secondary'"
              @click="selectedCategory = cat.key"
            >
              {{ cat.name }} ({{ cat.count }})
            </button>
          </div>
          
          <!-- Section Grid -->
          <div class="row g-2">
            <div v-for="section in currentCategorySections" :key="section.key" class="col-6 col-md-4 col-lg-3">
              <div 
                class="card h-100 section-card"
                :class="{ 'selected': selectedSectionKey === section.key }"
                @click="addSectionToTemplate(section.key)"
              >
                <div class="card-body p-2 text-center">
                  <h6 class="mb-1 small">{{ section.name }}</h6>
                  <small class="text-muted">{{ section.key }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Template Sections List -->
      <div v-if="template" class="card mb-4">
        <div class="card-body">
          <h5 class="card-title mb-3">Secciones en Template ({{ template.page?.sections?.length || 0 }})</h5>
          
          <div v-if="template.page?.sections?.length" class="sections-list">
            <div 
              v-for="(section, index) in template.page.sections" 
              :key="section.id || index"
              class="section-item card mb-2"
              :class="{ 'border-primary': selectedSectionIndex === index }"
              @click="selectedSectionIndex = index"
            >
              <div class="card-body p-2 d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary">{{ index + 1 }}</span>
                  <strong>{{ section.type }}</strong>
                  <span class="badge" :class="getSchemeBadge(section.scheme)">{{ section.scheme || 'default' }}</span>
                </div>
                <div class="d-flex gap-1">
                  <button class="btn btn-sm btn-outline-secondary" @click.stop="moveSectionUp(index)" :disabled="index === 0">
                    <i class="bi bi-arrow-up"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-secondary" @click.stop="moveSectionDown(index)" :disabled="index === template.page.sections.length - 1">
                    <i class="bi bi-arrow-down"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" @click.stop="removeSection(index)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              
              <!-- Section Editor (inline) -->
              <div v-if="selectedSectionIndex === index" class="px-3 pb-3 pt-0">
                <div class="border-top pt-2 mt-2">
                  <div class="mb-2">
                    <label class="form-label small fw-bold">ID</label>
                    <input type="text" class="form-control form-control-sm" v-model="section.id" placeholder="ID opcional">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Scheme</label>
                    <div class="scheme-selector">
                      <button
                        v-for="s in schemes"
                        :key="s"
                        class="scheme-btn"
                        :class="{ active: section.scheme === s }"
                        @click.stop="section.scheme = s"
                        :title="s"
                      >
                        <span class="scheme-preview" :class="'preview-' + s"></span>
                        <span class="scheme-name">{{ s }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="alert alert-info mb-0">
            <i class="bi bi-info-circle me-1"></i> Sin secciones. Click en una sección del catálogo para agregar.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import PageNav from '@/components/PageNav.vue'
import { useTemplateBuilder } from '@/builder/useTemplateBuilder.js'
import { getAllCategories, getSectionsByCategory } from '@/builder/SectionRegistry.js'
import defaultTemplate from '@/builder/schemas/templates/default.json'

const schemes = ['default-light', 'default-dark', 'light-purple', 'dark-purple']

const { 
  template, 
  error, 
  isValid,
  sectionsByCategory,
  loadTemplate, 
  addSection, 
  removeSection,
  moveSection,
  createEmptyTemplate,
  saveToStorage 
} = useTemplateBuilder()

const showJSON = ref(false)
const selectedCategory = ref('hero')
const selectedSectionKey = ref(null)
const selectedSectionIndex = ref(null)

const templateJSON = computed(() => {
  return template.value ? JSON.stringify(template.value, null, 2) : '{}'
})

const currentCategorySections = computed(() => {
  return getSectionsByCategory(selectedCategory.value)
})

watch(template, () => {
  saveToStorage()
}, { deep: true })

function loadDemoTemplate() {
  loadTemplate(defaultTemplate)
  showJSON.value = true
}

function createNewTemplate() {
  createEmptyTemplate('Nueva Página', 'default-light')
  showJSON.value = true
}

function addSectionToTemplate(type) {
  selectedSectionKey.value = type
  addSection({ type, props: {} })
  selectedSectionIndex.value = (template.value?.page?.sections?.length || 1) - 1
}

function moveSectionUp(index) {
  moveSection(index, index - 1)
}

function moveSectionDown(index) {
  moveSection(index, index + 1)
}

function openPreview() {
  saveToStorage()
  window.open('/preview', '_blank')
}

function getSchemeBadge(scheme) {
  if (!scheme) return 'bg-secondary'
  if (scheme.includes('purple')) return 'bg-success'
  if (scheme.includes('dark')) return 'bg-dark'
  if (scheme.includes('light')) return 'bg-light text-dark border'
  return 'bg-secondary'
}
</script>

<style scoped>
.builder-demo {
  min-height: 100vh;
  background: #f8f9fa;
}

.sections-list {
  max-height: 500px;
  overflow-y: auto;
}

.section-item {
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  border: 1px solid #dee2e6;
}

.section-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section-item.border-primary {
  border-width: 2px;
  border-color: #0d6efd;
  background: #f8f9fa;
}

.section-card {
  cursor: pointer;
  transition: all 0.15s;
  background: white;
  border: 1px solid #dee2e6;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.section-card.selected {
  border: 2px solid #0d6efd;
  background: #e7f1ff;
}

.scheme-selector {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.scheme-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 2px solid #dee2e6;
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 100px;
}

.scheme-btn:hover {
  border-color: #0d6efd;
  background: #f8f9fa;
}

.scheme-btn.active {
  border-color: #0d6efd;
  background: #e7f1ff;
  box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.25);
}

.scheme-preview {
  width: 48px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.preview-default-light {
  background: linear-gradient(135deg, #ffffff 50%, #f3f4f6 50%);
}

.preview-default-dark {
  background: linear-gradient(135deg, #141416 50%, #1c1d20 50%);
}

.preview-light-purple {
  background: linear-gradient(135deg, #faf5ff 50%, #ede9fe 50%);
}

.preview-dark-purple {
  background: linear-gradient(135deg, #3b1a6d 50%, #4c2685 50%);
}

.scheme-name {
  font-size: 0.7rem;
  color: #6c757d;
  text-transform: none;
}

.scheme-btn.active .scheme-name {
  color: #0d6efd;
  font-weight: 600;
}
</style>