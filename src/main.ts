import { createApp } from "vue"
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/css/global.css'

import BootstrapVue3 from "bootstrap-vue-3"
import 'bootstrap/dist/css/bootstrap.css'


const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(BootstrapVue3)
app.use(router)
app.mount("#app");
