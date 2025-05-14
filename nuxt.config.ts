import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],

  components: [
    { path: '~/components', extensions: ['.vue'], pathPrefix: false },
  ],

  nitro: { compatibilityDate: '2025-05-12' },

  postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },

  devtools: { enabled: true },

  vite: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  },
})
