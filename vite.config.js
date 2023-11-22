import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig((opt) => {
  return {
    root: 'src',
    build: {
      outDir: '../dist/js',
      rollupOptions: {
        input: {
          browserAction: resolve(__dirname, 'src/browserAction/index.tsx')
        },
        output: {
          entryFileNames: '[name].js'
        }
      }
    }
  }
})
