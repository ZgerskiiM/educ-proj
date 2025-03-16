import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './app/providers/router'
import '@/app/styles/main.scss';
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app')
