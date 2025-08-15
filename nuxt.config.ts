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
    'nuxt-marquee',
    'nuxt-gtag'
  ],
  gtag: {
    id: process.env.G_TAG_ID
  },
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
      APPWRITE_MEMBERS_COLL_ID: process.env.APPWRITE_MEMBERS_COLL_ID,
      CKEDITOR_LICENSE_KEY: process.env.CKEDITOR_LICENSE_KEY,
      APPWRITE_ITINERARIES_COLL_ID: process.env.APPWRITE_ITINERARIES_COLL_ID,
      APPWRITE_BLOGS_COLL_ID: process.env.APPWRITE_BLOGS_COLL_ID,
      APPWRITE_REVIEWS_COLL_ID: process.env.APPWRITE_REVIEWS_COLL_ID,
      EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
      EMAILJS_BOOKING_TEMPLATE_ID: process.env.EMAILJS_BOOKING_TEMPLATE_ID,
      EMAILJS_MESSAGE_TEMPLATE_ID: process.env.EMAILJS_MESSAGE_TEMPLATE_ID,
      EMAILJS_YOUR_PUBLIC_KEY: process.env.EMAILJS_YOUR_PUBLIC_KEY,
    },
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/terms': { prerender: true },
    '/contact': { prerender: true },

    '/reviews': { prerender: true },
    '/reviewBigCatSafaris': { prerender: true },

    '/categories': { prerender: true },
    '/destinations': { prerender: true },
    '/gallery': { prerender: true },

    '/blogs': { prerender: true },
    '/blog/**': { prerender: true }, // Use /** instead of [id]
    '/tour/**': { prerender: true }, // Use /** instead of [id]
    '/admin/**': { ssr: false },
    '/api/**': { cors: true },
  },
  app: {
    head: {
      title: 'Big Cat Safaris', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  }
})