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
  runtimeConfig: {
    public: {
      IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
      IMAGEKIT_ID: process.env.IMAGEKIT_ID,
      APPWRITE_DB_ID: process.env.APPWRITE_DB_ID,
      APPWRITE_DESTINATIONS_COLL_ID: process.env.APPWRITE_DESTINATIONS_COLL_ID,
      APPWRITE_GALLERY_COLL_ID: process.env.APPWRITE_GALLERY_COLL_ID,
      APPWRITE_CATEGORIES_COLL_ID: process.env.APPWRITE_CATEGORIES_COLL_ID,
    },
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})