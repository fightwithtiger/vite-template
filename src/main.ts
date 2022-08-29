import { getEnv } from '@/utils/env';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router';
import '@/assets/less/reset.less'
import 'vant/lib/index.css';
import App from './App.vue'

import { Tree } from './lib/tree'
import { VirtualTree } from './lib/virtualTree'

console.log('env:', getEnv())

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)

app.component('Tree', Tree)
app.component('VirtualTree', VirtualTree)

app.mount('#app')
