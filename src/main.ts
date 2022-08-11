import { getEnv } from '@/utils/env'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'
import { CustomFooter, FooterContainer } from './components/footer'

const AsyncCustomHeader = defineAsyncComponent(() => import('@/components/CustomHeader.vue'))

console.log('env:', getEnv())

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)

app.component('AsyncCustomHeader', AsyncCustomHeader)
app.component(FooterContainer.name, FooterContainer)
app.component(CustomFooter.name, CustomFooter)

app.mount('#app')
