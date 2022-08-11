import { VNode } from 'vue'

type CacheItem = VNode | undefined

export let idx = 0
export const cache: CacheItem[]  = []
export const content = ref<VNode>()

export function addIdx() {
  idx++
}
