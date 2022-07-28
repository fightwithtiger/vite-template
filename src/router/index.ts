import { createRouter, createWebHashHistory } from 'vue-router'
import { commonRoutes } from './common'
import { getPages } from '@/api'

const routes = [...commonRoutes]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  try {
    if (_userInfo.value && _userInfo.value.token) {
      if(to.name === 'login') {
        console.log('111111')
        next({ path: _from.path })
        return
      }
      const store = useMainStore()
      if (!store.pages) {
        const data = await getPages()
        useMatchingRoutes(data)
        console.log('222222')
        next({ ...to, replace: true })
      } else {
        document.title = to.meta.title as string || ''
        console.log(_userInfo.value && _userInfo.value.token, '3333')
        next()
      }
    } else {
      console.log(to)
      if(to.name !== undefined && !to.meta.needLogin ) {
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
