import type { LeafNode, TreeStore } from "../type"

export enum ACTIONS {
  EXPAND = 'expand',
  SELECT = 'select',
  NONE = 'none'
}

const stores: Record<string, TreeStore> = {}

export function useTreeStore(id: any) {
  if(!stores[id]) {
    stores[id] = {
      currentAction: ref(ACTIONS.NONE),
      currentNode: ref<LeafNode | null>(null),
      loadMore: null,
      setLoadMoreFn: (fn: any) => {
        if(!fn) {
          return
        }
        stores[id].loadMore = () => Promise.resolve(fn())
      }
    }
  }

  return stores[id]
}

export function removeTreeStore(id: string) {
  if(stores[id]) {
    delete stores[id]
  }
}

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}
