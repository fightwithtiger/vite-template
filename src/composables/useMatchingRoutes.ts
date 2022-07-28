import type { Page } from '@/router/type'
import { generator } from '@/router/generate'

export function useMatchingRoutes(pages: Page[]) {
  try {
    const store = useMainStore()
    store.setPages(pages)
    generator(pages)
  } catch (e) {
  }
}