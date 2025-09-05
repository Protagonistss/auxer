# Auxer Quick Start Guide

Get up and running with Auxer form designer in minutes.

## Prerequisites

- Node.js 16.14.0 or higher
- Vue 3.2.25 or higher
- Basic knowledge of Vue 3 and TypeScript

## Installation

### 1. Install Auxer Designer

```bash
npm install @auxer/designer
```

### 2. Install Peer Dependencies

```bash
npm install vue@^3.2.25 naive-ui@^2.26.4 pinia@^2.0.12 vuedraggable@^4.1.0
```

### 3. Install Shared Utilities (Optional)

```bash
npm install @auxer/shared
```

## Basic Setup

### 1. Create a Vue Application

```bash
npm create vue@latest my-form-designer
cd my-form-designer
npm install
```

### 2. Install Auxer

```bash
npm install @auxer/designer @auxer/shared
npm install naive-ui pinia vuedraggable
```

### 3. Configure Your App

Update your `main.ts`:

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

### 4. Create the Designer Component

Create `src/components/FormDesigner.vue`:

```vue
<template>
  <div id="form-designer" style="height: 100vh;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Designer } from '@auxer/designer'

onMounted(() => {
  // Basic usage
  Designer('#form-designer')
})
</script>
```

### 5. Use in Your App

Update `App.vue`:

```vue
<template>
  <div id="app">
    <h1>My Form Designer</h1>
    <FormDesigner />
  </div>
</template>

<script setup lang="ts">
import FormDesigner from './components/FormDesigner.vue'
</script>
```

## Advanced Configuration

### Custom Material Settings

```vue
<template>
  <div id="form-designer" style="height: 100vh;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Designer } from '@auxer/designer'

const materialSettings = [
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
]

onMounted(() => {
  Designer('#form-designer', {
    materialSettings
  })
})
</script>
```

### Using Shared Utilities

```typescript
import { isObject, isArray, isString } from '@auxer/shared'

// Type checking in your components
function validateData(data: unknown) {
  if (!isObject(data)) {
    throw new Error('Data must be an object')
  }
  
  const obj = data as Record<string, unknown>
  
  for (const [key, value] of Object.entries(obj)) {
    if (!isString(key)) {
      throw new Error('Keys must be strings')
    }
    
    if (isArray(value)) {
      console.log(`Array field: ${key}`)
    }
  }
}
```

## Common Patterns

### 1. Dynamic Material Loading

```typescript
import { ref, onMounted } from 'vue'
import { Designer } from '@auxer/designer'

const materialSettings = ref([])

onMounted(async () => {
  // Load materials from API
  const response = await fetch('/api/materials')
  materialSettings.value = await response.json()
  
  // Initialize designer with loaded materials
  Designer('#form-designer', {
    materialSettings: materialSettings.value
  })
})
```

### 2. Form Data Export

```typescript
import { useMaterialStore } from '@auxer/designer'

function exportFormData() {
  const materialStore = useMaterialStore()
  
  // Get current form configuration
  const formData = {
    materials: materialStore.dataSource,
    timestamp: new Date().toISOString()
  }
  
  // Export as JSON
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
```

### 3. Custom Styling

```vue
<template>
  <div class="custom-designer">
    <div id="form-designer"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Designer } from '@auxer/designer'

onMounted(() => {
  Designer('#form-designer')
})
</script>

<style scoped>
.custom-designer {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

/* Override default styles */
:deep(.n-layout-sider) {
  background-color: #f5f5f5;
}

:deep(.n-layout-content) {
  background-color: #ffffff;
}
</style>
```

## Troubleshooting

### Common Issues

#### 1. "Designer is not a function"

**Solution**: Ensure you're importing from the correct package:

```typescript
// Correct
import { Designer } from '@auxer/designer'

// Incorrect
import Designer from '@auxer/designer'
```

#### 2. "Cannot resolve module"

**Solution**: Check your package.json and ensure all dependencies are installed:

```bash
npm install @auxer/designer @auxer/shared
npm install vue naive-ui pinia vuedraggable
```

#### 3. Styling Issues

**Solution**: Import Naive UI styles in your main.ts:

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(naive)
app.mount('#app')
```

#### 4. Drag and Drop Not Working

**Solution**: Ensure vuedraggable is properly installed and the container has proper dimensions:

```vue
<template>
  <div id="form-designer" style="height: 100vh; width: 100%;"></div>
</template>
```

## Next Steps

1. **Explore the API**: Read the [complete API documentation](./API.md)
2. **Customize Materials**: Add your own form components
3. **Integrate Backend**: Connect to your form processing API
4. **Add Validation**: Implement form validation rules
5. **Export Forms**: Generate form schemas for your backend

## Examples

Check out the `examples/` directory in the repository for complete working examples:

- Basic form designer setup
- Custom material integration
- Form data export/import
- Theme customization

## Support

- **Documentation**: [API Reference](./API.md)
- **Issues**: [GitHub Issues](https://github.com/Protagonistss/auxer/issues)
- **Repository**: [GitHub Repository](https://github.com/Protagonistss/auxer)

## License

MIT License - see LICENSE file for details.