import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig((opt) => {
  return {
    root: 'src',
    build: {
      outDir: '../dist/js',
      emptyOutDir: false,
      rollupOptions: {
        input: {
          contentScript: resolve(__dirname, 'src/contentScript/index.ts')
        },
        output: {
          entryFileNames: '[name].js',
          inlineDynamicImports: true,
          format: 'iife'
        }
      }
    }
  }
})
