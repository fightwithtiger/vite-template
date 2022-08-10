import { createRouter, createWebHashHistory } from 'vue-router'
import { commonRoutes } from './common'
export * from './notFound'
export * from './generate'
import { getPages } from '@/api'

const routes = [
  ...commonRoutes,
  {
    name: 'in',
    path: '/',
    redirect: '/admin/home'
  },
  {
    name: 'admin',
    path: '/admin',
    component: () => import('@/layout/AdminLayout.vue'),
    redirect: '/admin/home',
    meta: {
      title: '后台管理系统',
      keepAlive: true
    },
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
          needLogin: true
        },
        children: [
          {
            name: 'child',
            path: 'child',
            component: () => import('@/views/child.vue'),
            meta: {
              title: 'child',
              keepAlive: true
            }
          }
        ]
      },
      { 
        name: 'ad',
        path: 'ad',
        component: () => import('@/views/ad.vue'),
        meta: {
          title: '活动页面',
          needLogin: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  try {
    if (_userInfo.value && _userInfo.value.token) {
      if(to.name === 'login') {
        next({ path: _from.path })
        return
      }
      const store = useMainStore()
      if (!store.pages) {
        const data = await getPages()
        useMatchingRoutes(data)
        next({ ...to, replace: true })
      } else {
        document.title = to.meta.title as string || ''
        next()
      }
    } else {
      if(to.name !== undefined && !to.meta.needLogin) {
        next()
      }else {
        next({ path: '/login', query: { rediect: to.fullPath }})
      }
    }
  } catch (e) {
    console.log(e)
  }
})

export default router
