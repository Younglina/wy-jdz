import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { ElMessage } from 'element-plus'
import router from './router/index'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
app.use(router)
app.use(ElMessage)
app.use(createPinia())
app.mount('#app')
