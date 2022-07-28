export const dynamicRoutes = [
  { 
    name: 'home',
    path: '/',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页'
      // keepAlive: true
    },
    children: [
      {
        name: 'child',
        path: '/child',
        component: () => import('@/views/child.vue')
      }
    ]
  },
  { 
    name: 'about',
    path: '/about',
    component: () => import('@/views/about.vue'),
    meta: {
      title: '关于'
      // keepAlive: true
    }
  },
  { 
    name: 'page11',
    path: '/page11',
    component: () => import('@/views/page11.vue'),
    meta: {
      title: 'page11'
      // keepAlive: true
    }
  },
  { 
    name: 'page11',
    path: '/page11',
    component: () => import('@/views/page11.vue'),
    meta: {
      title: 'page11'
      // keepAlive: true
    }
  },
  { 
    name: 'page12',
    path: '/page12',
    component: () => import('@/views/page12.vue'),
    meta: {
      title: 'page12',
      keepAlive: true
    }
  },
  { 
    name: 'page21',
    path: '/page21',
    component: () => import('@/views/page21.vue'),
    meta: {
      title: 'page21',
      keepAlive: true
    }
  }
]
