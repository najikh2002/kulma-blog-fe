const axios = require('axios')

export default {
  // Target Deployment
  target: 'server',

  // SSR
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cms-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/js/jquery/jquery.min.js' },
      { src: '/js/bootstrap/js/bootstrap.bundle.min.js' },
      { src: '/js/adminlte.min.js' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/fontawesome-free/css/all.min.css',
    '@/assets/css/adminlte.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    //https://github.com/maulayyacyber/nuxt-vue-multiselect
    'nuxt-multiselect',
    //https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
    // Simple Usage
    ['nuxt-highlightjs', { style: 'obsidian' }],
    // sitemap
    // '@funken-studio/sitemap-nuxt-3',
    '@nuxtjs/sitemap',
    // simple robots.txt
    // 'nuxt-simple-robots'
    '@nuxtjs/robots'
  ],

  robots: {
    userAgent: '*',
    allow: '/'
  },

  // Sitemap Configuration
  sitemap: {
    hostname: 'https://blog.kuliahmatematika.online',
    cacheTime: 1,
    exclude: [
      '/admin/**',
      '/login'
    ],
    routes: async() => {
      let page = 1;
      let routes = ['/'];
      let hasMoreData = true;
      while (hasMoreData) {
        try {
          let response = await axios.get(`https://dev.bisalulustes.com/api/web/posts?page=${page}`);
          let data = response.data.data.data;

          if (data.length === 0) {
            hasMoreData = false;
            break;
          }

          data.forEach(post => {
            routes.push(`/post/${post.slug}`);
          });
        } catch(error) {
          console.error(error);
        }

        return routes;
      }


    },
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
    },
  },


  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: '/api/admin/login',
            method: 'post'
          },
          logout: {
            url: '/api/admin/logout',
            method: 'post'
          },
          user: {
            url: '/api/admin/user',
            method: 'get'
          }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/admin/dashboard'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://dev.bisalulustes.com',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
