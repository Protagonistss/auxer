# Auxer Component Reference

Detailed reference for all Vue components in the Auxer Designer package.

## Table of Contents

- [Main Component](#main-component)
- [Material Component](#material-component)
- [Combination Component](#combination-component)
- [Configure Component](#configure-component)
- [Component Props](#component-props)
- [Component Events](#component-events)
- [Component Slots](#component-slots)
- [Styling Guide](#styling-guide)

## Main Component

The main layout component that orchestrates the entire designer interface.

**File**: `packages/designer/src/core/Main.tsx`  
**Type**: Vue 3 Composition API Component with JSX

### Overview

The Main component provides the complete form designer interface with:
- Responsive layout with collapsible sidebar
- Material library panel
- Design canvas area
- Configuration drawer
- Header with action buttons

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `materialDataSource` | `Array` | `undefined` | Array of material data for the material panel |

### Structure

```typescript
interface MainProps {
  materialDataSource?: Array<any>
}
```

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Header (Configuration Button)                          │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│ Material    │ Design Canvas                            │
│ Panel       │ (Combination Component)                  │
│ (Collapsible)│                                           │
│             │                                           │
└─────────────┴───────────────────────────────────────────┘
│ Configuration Drawer (Slides from right)               │
└─────────────────────────────────────────────────────────┘
```

### Usage Example

```vue
<template>
  <Main :materialDataSource="materials" />
</template>

<script setup lang="ts">
import Main from '@auxer/designer/src/core/Main'
import { ref } from 'vue'

const materials = ref([
  {
    label: 'Form Controls',
    value: 'form-controls',
    children: [
      { label: 'Text Input', value: 'text-input' },
      { label: 'Number Input', value: 'number-input' }
    ]
  }
])
</script>
```

### Internal Components

The Main component uses several child components:
- `Material`: Material library panel
- `Combination`: Design canvas
- `NDrawer`: Configuration panel

### Events

The Main component handles internal events:
- Header button clicks
- Drawer show/hide
- Material data changes

---

## Material Component

Displays the material library with draggable form components.

**File**: `packages/designer/src/core/Material.tsx`  
**Type**: Vue 3 Composition API Component with JSX

### Overview

The Material component provides:
- Categorized material display
- Drag-and-drop functionality
- Integration with vuedraggable
- Material store integration
- Visual feedback for draggable items

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `Array` | `undefined` | Array of material items to display |

### Default Materials

The component includes a default set of materials:

```typescript
const materialPool = [
  { text: '输入框', id: 'input' },
  { text: '下拉框', id: 'select' },
  { text: '数字', id: 'inputNumber' },
  { text: '日期', id: 'datepicker' }
]
```

### Drag and Drop Configuration

```typescript
const dragConfig = {
  group: { 
    name: 'people', 
    pull: 'clone', 
    put: false 
  },
  itemKey: 'name'
}
```

### Usage Example

```vue
<template>
  <Material :dataSource="customMaterials" />
</template>

<script setup lang="ts">
import Material from '@auxer/designer/src/core/Material'
import { ref } from 'vue'

const customMaterials = ref([
  { text: 'Custom Input', id: 'custom-input' },
  { text: 'Custom Select', id: 'custom-select' }
])
</script>
```

### Integration with Store

The Material component integrates with the Pinia material store:

```typescript
import { useMaterialStore } from '../store/index'

const materialStore = useMaterialStore()
console.log('materialStore', materialStore.dataSource)
```

### Styling Classes

- `.dg-material__row`: Individual material item container

---

## Combination Component

The main design canvas where users can drop and arrange form components.

**File**: `packages/designer/src/core/Combination.tsx`  
**Type**: Vue 3 Composition API Component with JSX

### Overview

The Combination component provides:
- Drop zone for material components
- Drag-and-drop reordering
- Visual feedback for dropped items
- Integration with vuedraggable
- Dynamic list management

### Props

No external props - manages internal state.

### State Management

```typescript
const pool = ref([]) // Array of dropped components
```

### Drag and Drop Configuration

```typescript
const dragConfig = {
  group: 'people',
  itemKey: 'name'
}
```

### Usage Example

```vue
<template>
  <Combination />
</template>

<script setup lang="ts">
import Combination from '@auxer/designer/src/core/Combination'
</script>
```

### Event Handling

The component handles drag and drop events:

```typescript
const log = (e: Event) => {
  console.log('Drag event:', e)
}
```

### Visual Feedback

Dropped items are displayed as tags:

```typescript
const slots = {
  item: ({ element }: any) => (
    <NTag type="success" style={{ width: '100%' }}>
      {element.text}
    </NTag>
  )
}
```

---

## Configure Component

Configuration panel for form and component settings.

**File**: `packages/designer/src/core/Configure.tsx`  
**Type**: Vue 3 Composition API Component with JSX

### Overview

The Configure component is currently in development and provides:
- Placeholder for configuration options
- Future form settings panel
- Component property editor

### Current Status

```typescript
render() {
  return <div>configure</div>
}
```

### Planned Features

- Form-level configuration
- Component property editing
- Validation rules setup
- Theme customization
- Export/import options

---

## Component Props

### Common Props Pattern

All components follow Vue 3 Composition API patterns:

```typescript
export default defineComponent({
  name: 'ComponentName',
  props: {
    // Props definition
  },
  setup() {
    // Composition API logic
    return {
      // Exposed properties and methods
    }
  },
  render() {
    // JSX render function
  }
})
```

### Type Safety

Components use TypeScript for type safety:

```typescript
interface ComponentProps {
  dataSource?: Array<any>
  // Other props
}
```

---

## Component Events

### Event Handling Pattern

Components use Vue 3 event handling:

```typescript
const handleEvent = (event: Event) => {
  // Event handling logic
  console.log('Event:', event)
}

// In render function
<SomeComponent onEvent={handleEvent} />
```

### Common Events

- **Drag Events**: Handled by vuedraggable integration
- **Click Events**: Button and interaction handling
- **Change Events**: Data modification events

---

## Component Slots

### Slot Usage

Components use Vue 3 slot patterns:

```typescript
const slots = {
  item: ({ element }: { element: any }) => (
    <div class="custom-item">
      {element.text}
    </div>
  )
}

// In render function
<vuedraggable v-slots={slots} />
```

### Available Slots

- **item**: Custom rendering for draggable items
- **header**: Custom header content
- **footer**: Custom footer content

---

## Styling Guide

### CSS Classes

Components use consistent CSS class naming:

```css
/* Material component */
.dg-material__row {
  /* Material item styling */
}

/* Layout classes */
.n-layout {
  /* Naive UI layout styling */
}

.n-layout-sider {
  /* Sidebar styling */
}

.n-layout-content {
  /* Content area styling */
}
```

### Custom Styling

Override component styles using CSS:

```vue
<style scoped>
/* Override default styles */
:deep(.n-layout-sider) {
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
}

:deep(.dg-material__row) {
  margin-bottom: 8px;
  padding: 4px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
}

:deep(.dg-material__row:hover) {
  background-color: #f0f0f0;
  border-color: #d0d0d0;
}
</style>
```

### Theme Integration

Components integrate with Naive UI theming:

```typescript
// Use Naive UI theme variables
const theme = {
  primaryColor: '#18a058',
  successColor: '#18a058',
  warningColor: '#f0a020',
  errorColor: '#d03050'
}
```

### Responsive Design

Components are responsive and adapt to different screen sizes:

```css
/* Mobile responsiveness */
@media (max-width: 768px) {
  .n-layout-sider {
    width: 100% !important;
    height: auto !important;
  }
  
  .n-layout-content {
    height: auto !important;
  }
}
```

---

## Best Practices

### Component Usage

1. **Always provide proper props**: Ensure required props are provided
2. **Handle events properly**: Implement proper event handling
3. **Use TypeScript**: Leverage type safety for better development experience
4. **Follow Vue 3 patterns**: Use Composition API consistently

### Performance

1. **Use readonly for static data**: Prevent unnecessary reactivity
2. **Implement proper key props**: For list rendering optimization
3. **Avoid deep reactivity**: For large data structures

### Accessibility

1. **Provide proper ARIA labels**: For screen readers
2. **Ensure keyboard navigation**: For accessibility compliance
3. **Use semantic HTML**: For better structure

---

## Troubleshooting

### Common Issues

#### Component Not Rendering

**Solution**: Check prop types and ensure proper imports:

```typescript
// Correct import
import Material from '@auxer/designer/src/core/Material'

// Check prop types
const materials = ref([]) // Ensure it's reactive
```

#### Drag and Drop Issues

**Solution**: Verify vuedraggable configuration:

```typescript
// Ensure proper group configuration
const dragConfig = {
  group: { name: 'people', pull: 'clone', put: false },
  itemKey: 'name'
}
```

#### Styling Problems

**Solution**: Use proper CSS selectors and specificity:

```css
/* Use :deep() for component styling */
:deep(.n-layout-sider) {
  /* Your styles */
}
```

---

## Migration Guide

### From Vue 2 to Vue 3

If migrating from Vue 2:

1. **Update component syntax**: Use Composition API
2. **Update event handling**: Use new event syntax
3. **Update slot usage**: Use new slot syntax
4. **Update TypeScript**: Use Vue 3 types

### Version Updates

When updating Auxer versions:

1. **Check breaking changes**: Review changelog
2. **Update imports**: Check for import changes
3. **Update props**: Check for prop changes
4. **Test functionality**: Verify all features work

---

## Support

For component-specific issues:

- **Documentation**: This reference guide
- **Examples**: Check the examples directory
- **Issues**: Report on GitHub
- **Community**: Join discussions on GitHub