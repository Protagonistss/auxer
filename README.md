<!-- @format -->

# Auxer

A comprehensive form designer utility library built with Vue 3, TypeScript, and modern web technologies. Auxer provides a modular approach to form design with drag-and-drop functionality, customizable materials, and extensive utility functions.

## 🚀 Quick Start

Get up and running with Auxer in minutes:

```bash
npm install @auxer/designer @auxer/shared
npm install vue@^3.2.25 naive-ui@^2.26.4 pinia@^2.0.12 vuedraggable@^4.1.0
```

```typescript
import { Designer } from '@auxer/designer'

// Basic usage
Designer('#designer-container')

// With custom materials
Designer('#designer-container', {
  materialSettings: [
    {
      label: 'Form Controls',
      value: 'form-controls',
      children: [
        { label: 'Text Input', value: 'text-input' },
        { label: 'Number Input', value: 'number-input' }
      ]
    }
  ]
})
```

## 📦 Packages

| Package | Version | Status | Description |
|---------|---------|--------|-------------|
| [@auxer/designer](./docs/API.md#designer-api) | 0.0.0 | 🚧 Active Development | Main form designer component with drag-and-drop interface |
| [@auxer/shared](./docs/API.md#shared-utilities) | 0.0.4 | ✅ Stable | Utility functions and type definitions |
| @auxer/engine | - | 🚧 In Development | Form rendering engine |
| @auxer/parser | - | 🚧 In Development | Form schema parser |
| @auxer/creater | - | 🚧 In Development | Form creation utilities |

## 📚 Documentation

### Core Documentation

- **[API Reference](./docs/API.md)** - Complete API documentation with all functions, components, and types
- **[Quick Start Guide](./docs/QUICK_START.md)** - Get up and running in minutes
- **[Component Reference](./docs/COMPONENT_REFERENCE.md)** - Detailed component documentation
- **[Examples](./docs/EXAMPLES.md)** - Comprehensive examples and real-world scenarios

### Key Features

- 🎨 **Drag & Drop Interface** - Intuitive form building with visual feedback
- 🧩 **Modular Architecture** - Use only what you need
- 🔧 **Customizable Materials** - Define your own form components
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎯 **TypeScript Support** - Full type safety and IntelliSense
- 🏪 **State Management** - Built-in Pinia store integration
- 🎨 **Theme Support** - Integrates with Naive UI theming

## 🛠️ Development

### Prerequisites

- Node.js 16.14.0 or higher
- pnpm 6.32.2 or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/Protagonistss/auxer.git
cd auxer

# Install dependencies
pnpm install

# Start development
pnpm dev

# Build packages
pnpm build

# Run tests
pnpm test
```

### Project Structure

```
auxer/
├── packages/
│   ├── designer/          # Main form designer package
│   ├── shared/            # Shared utilities and types
│   ├── engine/            # Form rendering engine (in development)
│   ├── parser/            # Form schema parser (in development)
│   └── creater/           # Form creation utilities (in development)
├── docs/                  # Documentation
├── examples/              # Usage examples
└── scripts/               # Build and development scripts
```

## 🎯 Use Cases

- **Form Builders** - Create dynamic forms for any application
- **Survey Tools** - Build custom surveys and questionnaires
- **Data Collection** - Design forms for data entry and collection
- **User Registration** - Create registration and profile forms
- **Contact Forms** - Build contact and inquiry forms
- **E-commerce** - Design product forms and checkout flows

## 🔧 Integration

### Vue 3

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

### React

```tsx
import { useEffect, useRef } from 'react'
import { Designer } from '@auxer/designer'

const FormDesigner = () => {
  const designerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (designerRef.current) {
      Designer(designerRef.current)
    }
  }, [])

  return <div ref={designerRef} style={{ height: '100vh' }} />
}
```

### Angular

```typescript
import { Component, ElementRef, OnInit } from '@angular/core'
import { Designer } from '@auxer/designer'

@Component({
  selector: 'app-form-designer',
  template: '<div #designer></div>'
})
export class FormDesignerComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const designerElement = this.elementRef.nativeElement.querySelector('#designer')
    Designer(designerElement)
  }
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Status

- ✅ **Documentation** - Comprehensive API and usage documentation
- 🚧 **Designer Package** - Core functionality in active development
- 🚧 **Shared Utilities** - Stable utility functions
- 📋 **Engine Package** - Planned for form rendering
- 📋 **Parser Package** - Planned for schema parsing
- 📋 **Creater Package** - Planned for form creation utilities

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository**: [https://github.com/Protagonistss/auxer](https://github.com/Protagonistss/auxer)
- **Issues**: [https://github.com/Protagonistss/auxer/issues](https://github.com/Protagonistss/auxer/issues)
- **Documentation**: [./docs/API.md](./docs/API.md)

## 🙏 Acknowledgments

Built with ❤️ using Vue 3, TypeScript, Naive UI, and Pinia.
