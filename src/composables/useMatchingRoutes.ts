import type { Page } from '@/lib'
import router, { notFound, generate } from '@/router'

export function useMatchingRoutes(pages: Page[]) {
  try {
    const store = useMainStore()
    store.setPages(pages)
    generate(router, pages)
    router.addRoute(notFound)
  } catch (e) {
  }
}