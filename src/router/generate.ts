import { dynamicRoutes } from './dynamic'
import { createRoutesGenerator } from '@/lib'
import type { Router, RouteRecordRaw } from 'vue-router'

const action = (router: Router, matching: RouteRecordRaw[]) => {
  const admin = router.getRoutes().find(i => i.name === 'admin')
  if (admin) {
    const adminRoute = { ...admin }
    adminRoute.children = [...adminRoute.children, ...matching]
    router.addRoute(adminRoute)
  }
}

export const generate = createRoutesGenerator(action)(dynamicRoutes)
