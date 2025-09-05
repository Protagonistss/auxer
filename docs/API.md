# Auxer API Documentation

Auxer is a comprehensive form designer utility library built with Vue 3, TypeScript, and modern web technologies. This documentation covers all public APIs, functions, and components available in the Auxer ecosystem.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Packages](#packages)
- [Designer API](#designer-api)
- [Shared Utilities](#shared-utilities)
- [Components](#components)
- [State Management](#state-management)
- [Type Definitions](#type-definitions)
- [Examples](#examples)

## Overview

Auxer provides a modular approach to form design and utility functions:

- **@auxer/designer**: A drag-and-drop form designer component
- **@auxer/shared**: Common utility functions and type definitions
- **@auxer/engine**: Form rendering engine (in development)
- **@auxer/parser**: Form schema parser (in development)
- **@auxer/creater**: Form creation utilities (in development)

## Installation

```bash
# Install the designer package
npm install @auxer/designer

# Install shared utilities
npm install @auxer/shared

# Or install all packages
npm install @auxer/designer @auxer/shared
```

### Peer Dependencies

The designer package requires the following peer dependencies:

```bash
npm install vue@^3.2.25 naive-ui@^2.26.4 pinia@^2.0.12 vuedraggable@^4.1.0
```

## Packages

### @auxer/designer

The main form designer package providing a complete drag-and-drop form building interface.

**Main Export**: `Designer` function
**Version**: 0.0.0
**Status**: Active Development

### @auxer/shared

Utility functions and type definitions shared across the Auxer ecosystem.

**Main Exports**: Type checking utilities
**Version**: 0.0.4
**Status**: Stable

### @auxer/engine

Form rendering engine for processing and displaying form schemas.

**Status**: In Development

### @auxer/parser

Form schema parser for converting between different form definition formats.

**Status**: In Development

### @auxer/creater

Form creation utilities and helpers.

**Status**: In Development

---

## Designer API

The Designer component is the main entry point for the form designer functionality.

### Designer Function

```typescript
Designer(container: string | Element, props?: IDesignerProps): ComponentPublicInstance
```

Creates and mounts a new Designer instance to the specified container.

#### Parameters

- `container` (string | Element): CSS selector string or DOM element to mount the designer
- `props` (IDesignerProps, optional): Configuration object for the designer

#### Returns

Vue ComponentPublicInstance of the mounted designer

#### Example

```typescript
import { Designer } from '@auxer/designer'

// Mount to a DOM element
const container = document.getElementById('designer')
const designer = Designer(container, {
  materialSettings: [
    {
      label: 'Basic Components',
      value: 'basic',
      children: [
        { label: 'Input', value: 'input' },
        { label: 'Select', value: 'select' }
      ]
    }
  ]
})

// Mount to a CSS selector
const designer2 = Designer('#designer-container')
```

### IDesignerProps Interface

```typescript
interface IDesignerProps {
  materialSettings: ITree[]
}
```

Configuration object for the Designer component.

#### Properties

- `materialSettings` (ITree[]): Array of material tree structures defining available form components

### ITree Interface

```typescript
interface ITree extends IProp {
  children?: ITree[]
}

interface IProp {
  label: string
  value: string
}
```

Tree structure for organizing material components.

#### Properties

- `label` (string): Display name for the component or category
- `value` (string): Unique identifier for the component or category
- `children` (ITree[], optional): Nested tree items for hierarchical organization

#### Example

```typescript
const materialSettings: ITree[] = [
  {
    label: 'Form Controls',
    value: 'form-controls',
    children: [
      { label: 'Text Input', value: 'text-input' },
      { label: 'Number Input', value: 'number-input' },
      { label: 'Email Input', value: 'email-input' }
    ]
  },
  {
    label: 'Selection Controls',
    value: 'selection-controls',
    children: [
      { label: 'Checkbox', value: 'checkbox' },
      { label: 'Radio Button', value: 'radio' },
      { label: 'Select Dropdown', value: 'select' }
    ]
  }
]
```

---

## Shared Utilities

The @auxer/shared package provides type checking and utility functions.

### Type Checking Functions

All type checking functions follow the `TUnknownReturnBool` type signature:

```typescript
type TUnknownReturnBool = (params: unknown) => boolean
```

#### isObject

```typescript
isObject(arg: unknown): boolean
```

Checks if the argument is a plain object.

```typescript
import { isObject } from '@auxer/shared'

isObject({}) // true
isObject([]) // false
isObject(null) // false
isObject('string') // false
```

#### isArray

```typescript
isArray(arg: unknown): boolean
```

Checks if the argument is an array.

```typescript
import { isArray } from '@auxer/shared'

isArray([]) // true
isArray({}) // false
isArray('string') // false
isArray(null) // false
```

#### isNull

```typescript
isNull(arg: unknown): boolean
```

Checks if the argument is null.

```typescript
import { isNull } from '@auxer/shared'

isNull(null) // true
isNull(undefined) // false
isNull(0) // false
isNull('') // false
```

#### isUndefined

```typescript
isUndefined(arg: unknown): boolean
```

Checks if the argument is undefined.

```typescript
import { isUndefined } from '@auxer/shared'

isUndefined(undefined) // true
isUndefined(null) // false
isUndefined(0) // false
isUndefined('') // false
```

#### isExist

```typescript
isExist(arg: unknown): boolean
```

Checks if the argument exists (not null, undefined, or falsy).

```typescript
import { isExist } from '@auxer/shared'

isExist('hello') // true
isExist(0) // false
isExist('') // false
isExist(null) // false
isExist(undefined) // false
```

#### isString

```typescript
isString(arg: unknown): boolean
```

Checks if the argument is a string.

```typescript
import { isString } from '@auxer/shared'

isString('hello') // true
isString(123) // false
isString(null) // false
isString(undefined) // false
```

#### isNumber

```typescript
isNumber(arg: unknown): boolean
```

Checks if the argument is a number.

```typescript
import { isNumber } from '@auxer/shared'

isNumber(123) // true
isNumber('123') // false
isNumber(NaN) // true
isNumber(Infinity) // true
```

#### isBool

```typescript
isBool(arg: unknown): boolean
```

Checks if the argument is a boolean.

```typescript
import { isBool } from '@auxer/shared'

isBool(true) // true
isBool(false) // true
isBool(1) // false
isBool('true') // false
```

#### isInt

```typescript
isInt(arg: unknown): boolean
```

Checks if the argument is an integer.

```typescript
import { isInt } from '@auxer/shared'

isInt(123) // true
isInt(123.45) // false
isInt('123') // false
isInt(NaN) // false
```

---

## Components

The Designer package includes several Vue components that make up the form designer interface.

### Main Component

The main layout component that orchestrates the entire designer interface.

**File**: `packages/designer/src/core/Main.tsx`

#### Props

- `materialDataSource` (Array): Array of material data for the material panel

#### Features

- Responsive layout with collapsible sidebar
- Header with configuration button
- Main content area for form design
- Drawer for configuration panel

### Material Component

Displays the material library with draggable form components.

**File**: `packages/designer/src/core/Material.tsx`

#### Props

- `dataSource` (Array): Array of material items to display

#### Features

- Drag-and-drop material items
- Categorized material display
- Integration with vuedraggable
- Material store integration

#### Default Materials

The component includes a default set of materials:

```typescript
const materialPool = [
  { text: '输入框', id: 'input' },
  { text: '下拉框', id: 'select' },
  { text: '数字', id: 'inputNumber' },
  { text: '日期', id: 'datepicker' }
]
```

### Combination Component

The main design canvas where users can drop and arrange form components.

**File**: `packages/designer/src/core/Combination.tsx`

#### Features

- Drop zone for material components
- Drag-and-drop reordering
- Visual feedback for dropped items
- Integration with vuedraggable

### Configure Component

Configuration panel for form and component settings.

**File**: `packages/designer/src/core/Configure.tsx`

#### Status

Currently in development - displays placeholder content.

---

## State Management

The Designer uses Pinia for state management.

### Material Store

**File**: `packages/designer/src/store/material.ts`

#### Usage

```typescript
import { useMaterialStore } from '@auxer/designer'

const materialStore = useMaterialStore()
```

#### State

- `dataSource` (Array): Array of material data

#### Example

```typescript
import { useMaterialStore } from '@auxer/designer'

export default {
  setup() {
    const materialStore = useMaterialStore()
    
    // Access material data
    console.log(materialStore.dataSource)
    
    return {
      materialStore
    }
  }
}
```

---

## Type Definitions

### Core Types

#### TUnknownReturnBool

```typescript
type TUnknownReturnBool = (params: unknown) => boolean
```

Type signature for all type checking utility functions.

#### IProp

```typescript
interface IProp {
  label: string
  value: string
}
```

Base interface for properties with label and value.

#### ITree

```typescript
interface ITree extends IProp {
  children?: ITree[]
}
```

Tree structure interface extending IProp with optional children.

#### IDesignerProps

```typescript
interface IDesignerProps {
  materialSettings: ITree[]
}
```

Configuration interface for the Designer component.

#### TReloadSettings

```typescript
type TReloadSettings = (arg: ITree[]) => void
```

Function type for reloading material settings.

---

## Examples

### Basic Usage

```typescript
import { Designer } from '@auxer/designer'

// Simple usage
const designer = Designer('#designer-container')

// With custom material settings
const materialSettings = [
  {
    label: 'Form Controls',
    value: 'form-controls',
    children: [
      { label: 'Text Input', value: 'text-input' },
      { label: 'Number Input', value: 'number-input' }
    ]
  }
]

const designer = Designer('#designer-container', {
  materialSettings
})
```

### Using Shared Utilities

```typescript
import { isObject, isArray, isString } from '@auxer/shared'

function validateFormData(data: unknown) {
  if (!isObject(data)) {
    throw new Error('Form data must be an object')
  }
  
  const formData = data as Record<string, unknown>
  
  for (const [key, value] of Object.entries(formData)) {
    if (!isString(key)) {
      throw new Error('Form keys must be strings')
    }
    
    if (isArray(value)) {
      console.log(`Array field: ${key}`)
    }
  }
}
```

### Custom Material Store Usage

```typescript
import { useMaterialStore } from '@auxer/designer'

export default {
  setup() {
    const materialStore = useMaterialStore()
    
    const addCustomMaterial = (material: any) => {
      materialStore.dataSource.push(material)
    }
    
    const clearMaterials = () => {
      materialStore.dataSource = []
    }
    
    return {
      materialStore,
      addCustomMaterial,
      clearMaterials
    }
  }
}
```

### Integration with Vue 3

```vue
<template>
  <div id="designer-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Designer } from '@auxer/designer'

onMounted(() => {
  const designer = Designer('#designer-container', {
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
})
</script>
```

---

## Development Status

### Active Development

- **@auxer/designer**: Core form designer functionality
- **@auxer/shared**: Utility functions and types

### In Development

- **@auxer/engine**: Form rendering engine
- **@auxer/parser**: Form schema parser
- **@auxer/creater**: Form creation utilities

### Planned Features

- Enhanced configuration panel
- More form component types
- Export/import functionality
- Theme customization
- Plugin system

---

## Contributing

This project is actively developed. For contributing guidelines and development setup, please refer to the main repository documentation.

## License

MIT License - see LICENSE file for details.