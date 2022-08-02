import type { Router, RouteRecordRaw } from 'vue-router'

export interface Page {
  id: number
  name: string
  zhName: string
  isMenu: boolean
  children: Page[]
}

export type PageName = Pick<Page, 'name' | 'zhName'>

export type ActionType = (router: Router, mathing: RouteRecordRaw[]) => void

let _action: ActionType | null = null

export function createRoutesGenerator(action?: ActionType) {
  _action = action ? action : defaultAction

  const generator = (dynamicRoutes: RouteRecordRaw[]) => {
    return function (router: Router, pages: Page[]) {
      const matching = getMatchingRoutes(pages, dynamicRoutes)
      _action!(router, matching)
    }
  }

  return generator
}

function defaultAction(router: Router, matching: RouteRecordRaw[]) {
  for (let route of matching) {
    router.addRoute(route)
  }
}

function getMatchingRoutes(pages: Page[], dynamicRoutes: RouteRecordRaw[]) {
  const routeNames = resolvePages(pages)
  const matching = []
  for (let item of routeNames) {
    const route = dynamicRoutes.find(i => i.name === item.name)
    if (route) {
      if (!route.meta) {
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

  for (let page of pages) {
    resolvePage(page)
  }

  return routeNames

  function resolvePage(page: Page) {
    if (!page.children || page.children.length === 0) {
      routeNames.push({
        name: page.name,
        zhName: page.zhName
      })
      return
    }

    for (let p of page.children) {
      resolvePage(p)
    }
  }
}