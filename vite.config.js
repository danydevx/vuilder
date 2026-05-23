import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
//import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "src/styles/main.less";`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@sections': fileURLToPath(new URL('./src/sections', import.meta.url)),
      '@partials': fileURLToPath(new URL('./src/partials', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
    },
  },
})
