// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@pinia/nuxt',
    'nuxt-lucide-icons',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/eslint'
  ],
  css: ['~/style.css'],
  shadcn: {
    prefix: 'shad',
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  googleFonts: {
    families: {
      'Tektur': [400, 500, 600, 700],
    }
  }
})