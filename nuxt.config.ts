import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    googleBooksApiKey: process.env.GOOGLE_BOOKS_API_KEY || '',
  },
  devtools: { enabled: true },
})
