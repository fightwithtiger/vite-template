import { Ref } from "vue"

export interface LeafNode {
  id: number
  name: string
  children: LeafNode[]
  isLeaf?: boolean
}

export type Action = 'expand' | 'select' | 'none'

export interface TreeStore {
  currentAction: Ref<Action>
  currentNode: Ref<LeafNode | null>
  loadMore: (() => any) | null
  setLoadMoreFn: (fn: (() => any) | null) => void
}

export interface NodeItem extends LeafNode {
  depth: number
}