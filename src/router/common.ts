export const commonRoutes = [
  { 
    name: 'login',
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      needLogin: false
    }
  }
]