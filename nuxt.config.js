export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ykw-blog-client',
    htmlAttrs: {
      lang: 'cn'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#1373e2' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/css/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/main.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          type: false,
          maxAge: 60 * 60 * 24
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/user/login', method: 'post' },
          user: { url: '/user/info', method: 'get' }
        }
      }
    },
    redirect: {
      home: '/articles',
      logout: '/articles'
    },
    cookie: {
      options: {
        maxAge: 60 * 60 * 24
      }
    }
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/request.js',
    '@/plugins/api.js',
    '@/plugins/moment.js',
    '@/plugins/passive.js',
    { src: '@/plugins/quill-editor.js', ssr: false },
    { src: '@/plugins/mavon-editor', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.BASE}` }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: process.env.BASE_URL,
    credentials: true
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  },
  server: {
    port: process.env.BASE_PORT,
    host: process.env.BASE_HOST
  }
}
