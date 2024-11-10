import process, { config, env } from 'node:process'

// const isDev = process.env.NODE_ENV === 'development'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
  ],
  routeRules: {
    // '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
    '/**': { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
  },
  icon: {
    clientBundle: {
      scan: true,
    },
    size: '1.5rem',
  },
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY,
    },
  },
  image: {
    maxAge: 3600,
    alias: {
      '/tmdb': 'https://image.tmdb.org/t/p/original/',
      '/youtube': 'https://img.youtube.com/',
    },
    domains: [
      'image.tmdb.org',
      'img.youtube.com',
    ],
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/'],
      cookieRedirect: true,
    },
  },

})
