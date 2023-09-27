import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import App from './App.vue'
import router from './router'

const pinia = createPinia();
const app = createApp(App)



app.use(pinia)
app.use(router)
app.mount('#app')
