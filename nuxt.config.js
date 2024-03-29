import path from "path";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  loading: {
    color: '#BFDBFE',
    failedColor: '#F87171',
    height: '3px',
    continuous: true,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'syte.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A better way to study' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond&family=Work+Sans:wght@100;400;900&display=swap'
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  '~/assets/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyD2WdHpRicjVUIup_BvWJ14OKAVWRRgUMU",
          authDomain: "syte-demo.firebaseapp.com",
          databaseURL: "https://syte-demo-default-rtdb.firebaseio.com",
          projectId: "syte-demo",
          storageBucket: "syte-demo.appspot.com",
          messagingSenderId: "578328555870",
          appId: "1:578328555870:web:5e045e6a9eebffce369fcf",
          measurementId: "G-1712FGEEFV"
        },
        services: {
          analytics: {
            collectionEnabled: true // default
          },
          firestore: {
            memoryOnly: false, // default
          },
          database: {
            
          }
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'syte.',
      lang: 'en',
      theme_color:'#FEF8F8',
      background_color:' #FEF8F8',
      display: 'standalone',
      description: "A better way to study",
      icons: [
        {"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},
        {"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}
      ]
    },
  },

  build: {
    /*
     ** Using frontmatter-markdown-loader here to parse md files
     */
    extend(config, ctx) {  
      config.module.rules.push(
      {
          test: /\.md$/,
          loader: "frontmatter-markdown-loader",
          include: path.resolve(__dirname, "content/listings")
      })
    }    
  },

}
