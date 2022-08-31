import type { TreeStore, NodeItem } from "../type"

export enum ACTIONS {
  EXPAND = 'expand',
  SELECT = 'select',
  PICK_UP = 'pick_up',
  NONE = 'none'
}

const stores: Record<string, TreeStore> = {}

export function useVirtualTreeStore(id: any) {
  if(!stores[id]) {
    stores[id] = {
      currentAction: ref(ACTIONS.NONE),
      currentNode: ref<NodeItem | null>(null),
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

export function removeVirtualTreeStore(id: string) {
  if(stores[id]) {
    delete stores[id]
  }
}

export function guid() {
  return 'xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}
