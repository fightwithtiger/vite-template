import { Ref } from "vue"

export interface NodeItem {
  id: number
  name: string
  children: NodeItem[]
  isLeaf?: boolean
  depth?: number
  parentId?: number
  isDelete?: boolean
  isActive?: boolean
  index?: number | string
}

export type Action = 'expand' | 'select' | 'none' | 'pick_up'

export interface TreeStore {
  currentAction: Ref<Action>
  currentNode: Ref<NodeItem | null>
  loadMore: (() => any) | null
  setLoadMoreFn: (fn: (() => any) | null) => void
}

// export interface NodeItem extends LeafNode {
//   depth?: number
// }