export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  nitro: { compatibilityDate: '2025-05-12' },
  postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },
  devtools: { enabled: true },
})
