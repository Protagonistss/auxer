/** @format */

import { defineConfig } from 'vite'
import unpluginComponents from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    unpluginComponents({
      include: [/\.vue/, /\.md/],
      dts: true
    })
  ]
})
