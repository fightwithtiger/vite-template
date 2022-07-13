import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { 
    name: 'home',
    path: '/',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  { 
    name: 'about',
    path: '/about',
    component: () => import('@/views/about.vue'),
    meta: {
      title: '关于',
      keepAlive: true
    }
  },
  { 
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/notFound.vue'),
    meta: {
      title: '404页面不存在'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, _from) => {
  document.title = to.meta.title as string || ''
  return true
})

export default router
