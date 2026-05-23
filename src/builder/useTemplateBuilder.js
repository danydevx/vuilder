/**
 * ============================================
 * useTemplateBuilder.js
 * ============================================
 * Composable para manejar lógica de templates JSON
 * 
 * Uso:
 * import { useTemplateBuilder } from '@/builder/useTemplateBuilder'
 * const { template, loadTemplate, saveTemplate, sectionsByCategory } = useTemplateBuilder()
 */

import { ref, computed } from 'vue'
import { SectionRegistry, getAllCategories, getSectionsByCategory } from './SectionRegistry.js'

export function useTemplateBuilder() {
  const template = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * Carga un template desde JSON
   * @param {Object|String} jsonData - Objeto JSON o string JSON
   */
  function loadTemplate(jsonData) {
    isLoading.value = true
    error.value = null
    
    try {
      let parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
      
      if (!parsed.page || !parsed.page.sections) {
        throw new Error('Template inválido: debe tener estructura { page: { sections: [] } }')
      }
      
      template.value = parsed
      
      // Validar cada sección
      const invalidSections = []
      parsed.page.sections.forEach((section, index) => {
        if (!SectionRegistry[section.type]) {
          invalidSections.push({ index, type: section.type })
        }
      })
      
      if (invalidSections.length > 0) {
        console.warn('Secciones no reconocidas:', invalidSections)
      }
      
    } catch (e) {
      error.value = e.message
      console.error('Error cargando template:', e)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Obtiene el template actual como JSON
   */
  function getTemplateJSON() {
    return template.value ? JSON.stringify(template.value, null, 2) : null
  }

  /**
   * Actualiza una sección específica
   * @param {number} index - Índice de la sección
   * @param {Object} newData - Datos nuevos
   */
  function updateSection(index, newData) {
    if (!template.value?.page?.sections) return
    if (index < 0 || index >= template.value.page.sections.length) return
    
    template.value.page.sections[index] = {
      ...template.value.page.sections[index],
      ...newData
    }
  }

  /**
   * Agrega una nueva sección
   * @param {Object} section - { type, props, scheme, id }
   */
  function addSection(section) {
    if (!template.value?.page) return
    
    template.value.page.sections.push({
      id: `${section.type}-${Date.now()}`,
      ...section
    })
  }

  /**
   * Elimina una sección
   * @param {number} index - Índice de la sección
   */
  function removeSection(index) {
    if (!template.value?.page?.sections) return
    if (index < 0 || index >= template.value.page.sections.length) return
    
    template.value.page.sections.splice(index, 1)
  }

  /**
   * Reordena secciones
   * @param {number} fromIndex - Índice original
   * @param {number} toIndex - Índice nuevo
   */
  function moveSection(fromIndex, toIndex) {
    if (!template.value?.page?.sections) return
    
    const sections = template.value.page.sections
    const [removed] = sections.splice(fromIndex, 1)
    sections.splice(toIndex, 0, removed)
  }

  /**
   * Genera template en blanco con estructura base
   * @param {String} pageTitle - Título de la página
   * @param {String} scheme - Scheme por defecto
   */
  function createEmptyTemplate(pageTitle = 'Nueva Página', scheme = 'default-light') {
    template.value = {
      page: {
        title: pageTitle,
        scheme: scheme,
        meta: {},
        sections: []
      }
    }
  }

  /**
   * Guarda el template en localStorage
   */
  function saveToStorage() {
    if (!template.value) return
    try {
      localStorage.setItem('vueilder-template', JSON.stringify(template.value))
    } catch (e) {
      console.error('Error guardando en localStorage:', e)
    }
  }

  /**
   * Carga el template desde localStorage
   */
  function loadFromStorage() {
    try {
      const saved = localStorage.getItem('vueilder-template')
      if (saved) {
        loadTemplate(JSON.parse(saved))
        return true
      }
    } catch (e) {
      console.error('Error cargando desde localStorage:', e)
    }
    return false
  }

  /**
   * Obtiene todas las secciones agrupadas por categoría
   */
  const sectionsByCategory = computed(() => {
    return getAllCategories().map(cat => ({
      ...cat,
      sections: getSectionsByCategory(cat.key)
    }))
  })

  /**
   * Valida el template actual
   */
  const isValid = computed(() => {
    if (!template.value?.page?.sections) return false
    if (!Array.isArray(template.value.page.sections)) return false
    if (template.value.page.sections.length === 0) return false
    
    return template.value.page.sections.every(section => {
      return section.type && SectionRegistry[section.type]
    })
  })

  return {
    template,
    isLoading,
    error,
    isValid,
    sectionsByCategory,
    loadTemplate,
    getTemplateJSON,
    updateSection,
    addSection,
    removeSection,
    moveSection,
    createEmptyTemplate,
    saveToStorage,
    loadFromStorage
  }
}

export default useTemplateBuilder