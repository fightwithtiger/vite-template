import { getEnv } from '@/utils/env'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'

const AsyncCustomHeader = defineAsyncComponent(() => import('@/components/CustomHeader.vue'))

console.log('env:', getEnv())

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)

app.component('AsyncCustomHeader', AsyncCustomHeader)

app.mount('#app')
