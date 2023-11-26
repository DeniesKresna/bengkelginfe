import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
// import toast from "vue-toastification";
import App from './App.vue'

import './css/style.css'
import 'vue-select/dist/vue-select.css';
// import "vue-toastification/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router)
app.use(pinia)
// app.use(toast, {})
app.mount('#app')
