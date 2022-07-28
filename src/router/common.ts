export const commonRoutes = [
  { 
    name: 'login',
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      needLogin: false
    }
  },
  { 
    name: 'ad',
    path: '/ad',
    component: () => import('@/views/ad.vue'),
    meta: {
      title: '活动页面',
      needLogin: false
    }
  }
]