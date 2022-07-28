import type { RouteRecordRaw } from 'vue-router'
import type { Page, PageName } from './type'
import { dynamicRoutes } from './dynamic'
import { notFound } from './notFound'
import router from '.'

export const generator = createRoutesGenerator(dynamicRoutes)

function createRoutesGenerator(dynamicRoutes: RouteRecordRaw[]) {

  return function (pages: Page[]) {
    const matching = getMatchingRoutes(pages, dynamicRoutes)

    for (let route of matching) {
      router.addRoute(route)
    }
    router.addRoute(notFound)
  }
}

function getMatchingRoutes(pages: Page[], dynamicRoutes: RouteRecordRaw[]) {
  const routeNames = resolvePages(pages)
  const matching = []
  for(let item of routeNames) {
    const route = dynamicRoutes.find(i => i.name === item.name)
    if(route) {
      if(!route.meta) {
        route.meta = { title: '' }
      }
      route.meta.title = item.zhName || route.meta.title
      route.meta.needLogin = true
      matching.push(route)
    }
  }

  return matching
}

function resolvePages(pages: Page[]) {
  const routeNames: PageName[] = []

  for(let page of pages) {
    resolvePage(page)
  }

  return routeNames

  function resolvePage(page: Page) {
    if(!page.children || page.children.length === 0) {
      routeNames.push({
        name: page.name,
        zhName: page.zhName
      })
      return
    }

    for(let p of page.children) {
      resolvePage(p)
    }
  }
}