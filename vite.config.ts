import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue(), svgLoader()],
  base: (mode === 'development') ? '/' : '/reka-test/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/assets/scss/variables' as vars;`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
