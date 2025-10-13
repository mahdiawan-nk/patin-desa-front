// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_PUBLIC_API_BASE,
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  vue: {
    compilerOptions: {
      // biar gak strict nge-cek extends interface
      // suppressWarnings: true,
    },
  },
  hooks: {
    'pages:extend'(pages) {
      // pastikan pages itu array
      if (Array.isArray(pages)) {
        for (const page of pages) {
          if (page.path?.startsWith('/admin')) {
            page.path = page.path.replace('/admin', '/panel')
          }
        }
      }
    }
  },
  // typescript: {
  //   strict: false,
  //   shim: false
  // },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    // 'shadcn-nuxt',
    'reka-ui/nuxt'
  ],
  // shadcn:{
  //   prefix:'',
  //   componentDir:'./components/ui'
  // }
})