export const notFound = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/notFound.vue'),
  meta: {
    title: '404页面不存在'
  }
}
