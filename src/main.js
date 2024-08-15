import { createApp } from "vue"
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/css/global.css'

import BootstrapVue3 from "bootstrap-vue-3"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS 불러오기
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS 불러오기

import piniaPluginPersitedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersitedstate)

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(BootstrapVue3);
app.mount("#app");
