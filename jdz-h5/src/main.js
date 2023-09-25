import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Lazyload } from 'vant';
import './style.css';
import 'vant/es/toast/style';
const app = createApp(App)

app.use(router)
app.use(Lazyload)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')
