import { defineConfig } from 'vite'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [VueJsx()],
  build: {
    outDir: 'dist',
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: 'designer-bundle'
    },
    minify: 'esbuild',
    rollupOptions: {
      external: ['vue', 'naive-ui', 'pinia']
    }
  }
})
