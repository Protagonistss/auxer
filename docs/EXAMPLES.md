# Auxer Examples

Comprehensive examples demonstrating various use cases and integrations with the Auxer form designer.

## Table of Contents

- [Basic Setup](#basic-setup)
- [Custom Materials](#custom-materials)
- [Form Data Management](#form-data-management)
- [Integration Examples](#integration-examples)
- [Advanced Patterns](#advanced-patterns)
- [Real-world Scenarios](#real-world-scenarios)

## Basic Setup

### Minimal Designer

The simplest way to get started with Auxer Designer.

```vue
<template>
  <div id="designer" style="height: 100vh;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Designer } from '@auxer/designer'

onMounted(() => {
  Designer('#designer')
})
</script>
```

### With Custom Materials

```vue
<template>
  <div id="designer" style="height: 100vh;"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Designer } from '@auxer/designer'

const materials = ref([
  {
    label: 'Basic Controls',
    value: 'basic',
    children: [
      { label: 'Text Input', value: 'text-input' },
      { label: 'Number Input', value: 'number-input' },
      { label: 'Email Input', value: 'email-input' }
    ]
  },
  {
    label: 'Selection Controls',
    value: 'selection',
    children: [
      { label: 'Checkbox', value: 'checkbox' },
      { label: 'Radio Button', value: 'radio' },
      { label: 'Select Dropdown', value: 'select' }
    ]
  }
])

onMounted(() => {
  Designer('#designer', {
    materialSettings: materials.value
  })
})
</script>
```

## Custom Materials

### Dynamic Material Loading

Load materials from an API or configuration file.

```vue
<template>
  <div id="designer" style="height: 100vh;"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Designer } from '@auxer/designer'

const materials = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    // Load materials from API
    const response = await fetch('/api/materials')
    materials.value = await response.json()
    
    // Initialize designer
    Designer('#designer', {
      materialSettings: materials.value
    })
  } catch (error) {
    console.error('Failed to load materials:', error)
  } finally {
    loading.value = false
  }
})
</script>
```

### Custom Material Categories

```typescript
// Custom material configuration
const customMaterials = [
  {
    label: 'User Information',
    value: 'user-info',
    children: [
      { label: 'Full Name', value: 'full-name' },
      { label: 'Email Address', value: 'email' },
      { label: 'Phone Number', value: 'phone' },
      { label: 'Date of Birth', value: 'dob' }
    ]
  },
  {
    label: 'Address Information',
    value: 'address-info',
    children: [
      { label: 'Street Address', value: 'street' },
      { label: 'City', value: 'city' },
      { label: 'State/Province', value: 'state' },
      { label: 'Postal Code', value: 'postal' },
      { label: 'Country', value: 'country' }
    ]
  },
  {
    label: 'Preferences',
    value: 'preferences',
    children: [
      { label: 'Newsletter Subscription', value: 'newsletter' },
      { label: 'Marketing Communications', value: 'marketing' },
      { label: 'Language Preference', value: 'language' },
      { label: 'Time Zone', value: 'timezone' }
    ]
  }
]
```

### Material with Metadata

```typescript
// Enhanced material with additional metadata
const enhancedMaterials = [
  {
    label: 'Form Controls',
    value: 'form-controls',
    children: [
      {
        label: 'Text Input',
        value: 'text-input',
        metadata: {
          icon: 'text',
          description: 'Single-line text input field',
          validation: ['required', 'minLength', 'maxLength'],
          properties: {
            placeholder: 'string',
            maxLength: 'number',
            minLength: 'number'
          }
        }
      },
      {
        label: 'Textarea',
        value: 'textarea',
        metadata: {
          icon: 'textarea',
          description: 'Multi-line text input field',
          validation: ['required', 'minLength', 'maxLength'],
          properties: {
            placeholder: 'string',
            rows: 'number',
            maxLength: 'number'
          }
        }
      }
    ]
  }
]
```

## Form Data Management

### Export Form Configuration

```typescript
import { useMaterialStore } from '@auxer/designer'

function exportFormConfiguration() {
  const materialStore = useMaterialStore()
  
  const formConfig = {
    version: '1.0.0',
    name: 'User Registration Form',
    description: 'Form for user registration',
    materials: materialStore.dataSource,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  // Export as JSON
  const blob = new Blob([JSON.stringify(formConfig, null, 2)], {
    type: 'application/json'
  })
  
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'form-config.json'
  a.click()
  
  URL.revokeObjectURL(url)
}
```

### Import Form Configuration

```typescript
function importFormConfiguration(file: File) {
  const reader = new FileReader()
  
  reader.onload = (e) => {
    try {
      const formConfig = JSON.parse(e.target?.result as string)
      const materialStore = useMaterialStore()
      
      // Validate configuration
      if (formConfig.materials && Array.isArray(formConfig.materials)) {
        materialStore.dataSource = formConfig.materials
        console.log('Form configuration imported successfully')
      } else {
        throw new Error('Invalid form configuration format')
      }
    } catch (error) {
      console.error('Failed to import form configuration:', error)
    }
  }
  
  reader.readAsText(file)
}
```

### Form Data Validation

```typescript
import { isObject, isArray, isString } from '@auxer/shared'

function validateFormData(data: unknown): boolean {
  if (!isObject(data)) {
    throw new Error('Form data must be an object')
  }
  
  const formData = data as Record<string, unknown>
  
  // Validate required fields
  const requiredFields = ['name', 'materials']
  for (const field of requiredFields) {
    if (!(field in formData)) {
      throw new Error(`Missing required field: ${field}`)
    }
  }
  
  // Validate materials array
  if (!isArray(formData.materials)) {
    throw new Error('Materials must be an array')
  }
  
  // Validate each material
  const materials = formData.materials as any[]
  for (const material of materials) {
    if (!isObject(material)) {
      throw new Error('Each material must be an object')
    }
    
    if (!isString(material.label) || !isString(material.value)) {
      throw new Error('Each material must have label and value strings')
    }
  }
  
  return true
}
```

## Integration Examples

### Vue 3 Composition API

```vue
<template>
  <div class="form-designer-container">
    <div class="toolbar">
      <button @click="exportForm">Export Form</button>
      <button @click="importForm">Import Form</button>
      <button @click="clearForm">Clear Form</button>
    </div>
    <div id="designer" ref="designerRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Designer } from '@auxer/designer'
import { useMaterialStore } from '@auxer/designer'

const designerRef = ref<HTMLElement>()
const designerInstance = ref<any>()

const materialStore = useMaterialStore()

onMounted(() => {
  if (designerRef.value) {
    designerInstance.value = Designer(designerRef.value, {
      materialSettings: [
        {
          label: 'Custom Components',
          value: 'custom',
          children: [
            { label: 'My Input', value: 'my-input' },
            { label: 'My Select', value: 'my-select' }
          ]
        }
      ]
    })
  }
})

onUnmounted(() => {
  if (designerInstance.value) {
    designerInstance.value.unmount()
  }
})

const exportForm = () => {
  const formData = {
    materials: materialStore.dataSource,
    timestamp: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(formData, null, 2)], {
    type: 'application/json'
  })
  
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'form-design.json'
  a.click()
  
  URL.revokeObjectURL(url)
}

const importForm = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const formData = JSON.parse(e.target?.result as string)
          materialStore.dataSource = formData.materials || []
        } catch (error) {
          console.error('Failed to import form:', error)
        }
      }
      reader.readAsText(file)
    }
  }
  
  input.click()
}

const clearForm = () => {
  materialStore.dataSource = []
}
</script>

<style scoped>
.form-designer-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.toolbar button {
  margin-right: 10px;
  padding: 8px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.toolbar button:hover {
  background-color: #f0f0f0;
}

#designer {
  flex: 1;
}
</style>
```

### React Integration

```tsx
import React, { useEffect, useRef } from 'react'
import { Designer } from '@auxer/designer'

interface FormDesignerProps {
  materials?: any[]
  onFormChange?: (formData: any) => void
}

const FormDesigner: React.FC<FormDesignerProps> = ({ 
  materials = [], 
  onFormChange 
}) => {
  const designerRef = useRef<HTMLDivElement>(null)
  const designerInstance = useRef<any>(null)

  useEffect(() => {
    if (designerRef.current) {
      designerInstance.current = Designer(designerRef.current, {
        materialSettings: materials
      })
    }

    return () => {
      if (designerInstance.current) {
        designerInstance.current.unmount()
      }
    }
  }, [materials])

  return (
    <div 
      ref={designerRef} 
      style={{ height: '100vh', width: '100%' }}
    />
  )
}

export default FormDesigner
```

### Angular Integration

```typescript
import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core'
import { Designer } from '@auxer/designer'

@Component({
  selector: 'app-form-designer',
  template: '<div #designer></div>',
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class FormDesignerComponent implements OnInit, OnDestroy {
  private designerInstance: any

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const designerElement = this.elementRef.nativeElement.querySelector('#designer')
    
    this.designerInstance = Designer(designerElement, {
      materialSettings: [
        {
          label: 'Angular Components',
          value: 'angular',
          children: [
            { label: 'Angular Input', value: 'angular-input' },
            { label: 'Angular Select', value: 'angular-select' }
          ]
        }
      ]
    })
  }

  ngOnDestroy() {
    if (this.designerInstance) {
      this.designerInstance.unmount()
    }
  }
}
```

## Advanced Patterns

### Custom Material Store

```typescript
import { defineStore } from 'pinia'

export const useCustomMaterialStore = defineStore('customMaterial', {
  state: () => ({
    materials: [],
    categories: [],
    selectedMaterial: null
  }),
  
  getters: {
    getMaterialsByCategory: (state) => (category: string) => {
      return state.materials.filter(m => m.category === category)
    },
    
    getMaterialById: (state) => (id: string) => {
      return state.materials.find(m => m.id === id)
    }
  },
  
  actions: {
    addMaterial(material: any) {
      this.materials.push({
        ...material,
        id: this.generateId(),
        createdAt: new Date().toISOString()
      })
    },
    
    updateMaterial(id: string, updates: any) {
      const index = this.materials.findIndex(m => m.id === id)
      if (index !== -1) {
        this.materials[index] = {
          ...this.materials[index],
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }
    },
    
    removeMaterial(id: string) {
      this.materials = this.materials.filter(m => m.id !== id)
    },
    
    generateId() {
      return Math.random().toString(36).substr(2, 9)
    }
  }
})
```

### Form Schema Generator

```typescript
interface FormSchema {
  type: 'object'
  properties: Record<string, any>
  required: string[]
}

function generateFormSchema(materials: any[]): FormSchema {
  const properties: Record<string, any> = {}
  const required: string[] = []

  materials.forEach(material => {
    const fieldName = material.value
    const fieldType = getFieldType(material.value)
    
    properties[fieldName] = {
      type: fieldType,
      title: material.label,
      description: material.description || ''
    }
    
    if (material.required) {
      required.push(fieldName)
    }
  })

  return {
    type: 'object',
    properties,
    required
  }
}

function getFieldType(materialValue: string): string {
  const typeMap: Record<string, string> = {
    'text-input': 'string',
    'number-input': 'number',
    'email-input': 'string',
    'checkbox': 'boolean',
    'select': 'string',
    'textarea': 'string'
  }
  
  return typeMap[materialValue] || 'string'
}
```

### Validation Rules Engine

```typescript
interface ValidationRule {
  type: string
  value?: any
  message: string
}

interface MaterialWithValidation {
  label: string
  value: string
  validation: ValidationRule[]
}

function validateFormData(data: any, materials: MaterialWithValidation[]): string[] {
  const errors: string[] = []
  
  materials.forEach(material => {
    const value = data[material.value]
    
    material.validation.forEach(rule => {
      if (!validateRule(value, rule)) {
        errors.push(`${material.label}: ${rule.message}`)
      }
    })
  })
  
  return errors
}

function validateRule(value: any, rule: ValidationRule): boolean {
  switch (rule.type) {
    case 'required':
      return value !== null && value !== undefined && value !== ''
    case 'minLength':
      return typeof value === 'string' && value.length >= rule.value
    case 'maxLength':
      return typeof value === 'string' && value.length <= rule.value
    case 'min':
      return typeof value === 'number' && value >= rule.value
    case 'max':
      return typeof value === 'number' && value <= rule.value
    case 'pattern':
      return new RegExp(rule.value).test(value)
    default:
      return true
  }
}
```

## Real-world Scenarios

### User Registration Form

```typescript
const userRegistrationMaterials = [
  {
    label: 'Personal Information',
    value: 'personal-info',
    children: [
      {
        label: 'Full Name',
        value: 'fullName',
        validation: [
          { type: 'required', message: 'Full name is required' },
          { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' }
        ]
      },
      {
        label: 'Email Address',
        value: 'email',
        validation: [
          { type: 'required', message: 'Email is required' },
          { type: 'pattern', value: '^[^@]+@[^@]+\\.[^@]+$', message: 'Invalid email format' }
        ]
      },
      {
        label: 'Phone Number',
        value: 'phone',
        validation: [
          { type: 'pattern', value: '^\\+?[1-9]\\d{1,14}$', message: 'Invalid phone number' }
        ]
      }
    ]
  },
  {
    label: 'Account Security',
    value: 'account-security',
    children: [
      {
        label: 'Password',
        value: 'password',
        validation: [
          { type: 'required', message: 'Password is required' },
          { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
        ]
      },
      {
        label: 'Confirm Password',
        value: 'confirmPassword',
        validation: [
          { type: 'required', message: 'Password confirmation is required' }
        ]
      }
    ]
  }
]
```

### Survey Form Builder

```typescript
const surveyMaterials = [
  {
    label: 'Question Types',
    value: 'question-types',
    children: [
      { label: 'Multiple Choice', value: 'multiple-choice' },
      { label: 'Single Choice', value: 'single-choice' },
      { label: 'Text Response', value: 'text-response' },
      { label: 'Rating Scale', value: 'rating-scale' },
      { label: 'Date/Time', value: 'datetime' },
      { label: 'File Upload', value: 'file-upload' }
    ]
  },
  {
    label: 'Layout Elements',
    value: 'layout-elements',
    children: [
      { label: 'Section Header', value: 'section-header' },
      { label: 'Page Break', value: 'page-break' },
      { label: 'Divider', value: 'divider' },
      { label: 'Text Block', value: 'text-block' }
    ]
  }
]
```

### E-commerce Product Form

```typescript
const productFormMaterials = [
  {
    label: 'Product Information',
    value: 'product-info',
    children: [
      { label: 'Product Name', value: 'productName' },
      { label: 'Product Description', value: 'description' },
      { label: 'SKU', value: 'sku' },
      { label: 'Brand', value: 'brand' },
      { label: 'Category', value: 'category' }
    ]
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing-inventory',
    children: [
      { label: 'Price', value: 'price' },
      { label: 'Compare at Price', value: 'comparePrice' },
      { label: 'Cost per Item', value: 'costPerItem' },
      { label: 'Stock Quantity', value: 'stockQuantity' },
      { label: 'Track Quantity', value: 'trackQuantity' }
    ]
  },
  {
    label: 'Shipping & Tax',
    value: 'shipping-tax',
    children: [
      { label: 'Weight', value: 'weight' },
      { label: 'Requires Shipping', value: 'requiresShipping' },
      { label: 'Taxable', value: 'taxable' },
      { label: 'Tax Code', value: 'taxCode' }
    ]
  }
]
```

### Contact Form Builder

```typescript
const contactFormMaterials = [
  {
    label: 'Contact Information',
    value: 'contact-info',
    children: [
      { label: 'Name', value: 'name' },
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Company', value: 'company' },
      { label: 'Website', value: 'website' }
    ]
  },
  {
    label: 'Message',
    value: 'message',
    children: [
      { label: 'Subject', value: 'subject' },
      { label: 'Message', value: 'message' },
      { label: 'Priority', value: 'priority' },
      { label: 'Department', value: 'department' }
    ]
  },
  {
    label: 'Additional Options',
    value: 'additional-options',
    children: [
      { label: 'Newsletter Subscription', value: 'newsletter' },
      { label: 'Follow-up Requested', value: 'followUp' },
      { label: 'Preferred Contact Method', value: 'contactMethod' }
    ]
  }
]
```

---

## Best Practices

### Performance Optimization

```typescript
// Use readonly for static data
const staticMaterials = readonly([
  { label: 'Static Material', value: 'static' }
])

// Implement lazy loading for large material sets
const loadMaterials = async () => {
  const response = await fetch('/api/materials')
  return response.json()
}

// Use computed properties for derived data
const filteredMaterials = computed(() => {
  return materials.value.filter(m => m.category === selectedCategory.value)
})
```

### Error Handling

```typescript
// Implement proper error handling
const initializeDesigner = async () => {
  try {
    const materials = await loadMaterials()
    Designer('#designer', { materialSettings: materials })
  } catch (error) {
    console.error('Failed to initialize designer:', error)
    // Show user-friendly error message
    showErrorMessage('Failed to load form designer. Please try again.')
  }
}
```

### Accessibility

```typescript
// Ensure proper ARIA labels
const accessibleMaterials = materials.map(material => ({
  ...material,
  'aria-label': `Add ${material.label} to form`,
  'role': 'button'
}))
```

---

## Support

For more examples and help:

- **Documentation**: [API Reference](./API.md)
- **Component Reference**: [Component Guide](./COMPONENT_REFERENCE.md)
- **Quick Start**: [Getting Started](./QUICK_START.md)
- **Issues**: [GitHub Issues](https://github.com/Protagonistss/auxer/issues)