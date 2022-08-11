export const dynamicRoutes = [
  { 
    name: 'about',
    path: 'about',
    component: () => import('@/views/about.vue'),
    meta: {
      title: '关于',
      keepAlive: true
    }
  },
  { 
    name: 'page11',
    path: 'page11',
    component: () => import('@/views/page11.vue'),
    meta: {
      title: 'page11',
      keepAlive: true
    }
  },
  { 
    name: 'page12',
    path: 'page12',
    component: () => import('@/views/page12.vue'),
    meta: {
      title: 'page12',
      keepAlive: true
    }
  },
  { 
    name: 'page21',
    path: 'page21',
    component: () => import('@/views/page21.vue'),
    meta: {
      title: 'page21',
      keepAlive: true
    }
  },
  { 
    name: 'page3',
    path: 'page3',
    component: () => import('@/views/page3.vue'),
    meta: {
      title: 'page3',
      keepAlive: true
    }
  }
]
