// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    'nuxt-appwrite',
    '@pinia/nuxt',
    'nuxt-swiper',
  ],
  appwrite: {
    endpoint: 'https://fra.cloud.appwrite.io/v1',
    project: '68906804002d6a211f76',
    locale: 'en'
  },
  css: ['assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})