<template>
  <div ref="contentRef" @scroll="handleScroll" :class="['leaf-list', 'fix-height']"
    :style="{ '--wrapper-height': leafsHeight ? `${leafsHeight}px`: 'auto' }">
    <div ref="leafRef" class="list" :style="{ top: top + 'px' }">
      <Leaf v-for="item of visibleData" :key="item.id" :uid="uid" :data="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NodeItem } from '../type'
import { markDelte } from '../../share'
import Leaf from './Leaf.vue'
import { useVirtualTreeStore, removeVirtualTreeStore, guid, ACTIONS } from '../composable'

interface Props {
  data: NodeItem[]
  loadMore?: (() => any) | null
  NodeComp?: any
  height?: number
  count?: number
}

let timer = null

const props = withDefaults(defineProps<Props>(), {
  data: () => ([]),
  loadMore: null,
  NodeComp: null,
  height: 0,
  count: 10
})

const emits = defineEmits(['action'])

const leafRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()

const list = ref<NodeItem[]>([...props.data])
const startIndex = ref(0)

const leafsHeight = ref(0)

const visibleData = computed(() => {
  if(props.height === 0) {
    return list.value.slice()
  }
  const endIndex = startIndex.value + props.count
  return list.value.slice(startIndex.value, endIndex)
})

const top = ref(0)

const uid = ref(guid())
const { currentAction, currentNode, setLoadMoreFn } = useVirtualTreeStore(uid.value)

setLoadMoreFn(props.loadMore)

watch(() => props.height, (val) => {
  if (val !== 0) {
    leafsHeight.value = val
  }
}, {
  immediate: true
})

onUnmounted(() => {
  removeVirtualTreeStore(uid.value)
})


watch(() => props.data, (val) => {
  list.value = val.map(i => ({
    ...i,
    depth: 0
  }))
}, {
  immediate: true
})

watchEffect(() => {
  emits('action', currentAction.value, currentNode.value)
  switch (currentAction.value) {
    case ACTIONS.EXPAND:
      expandLeafs(currentNode.value as NodeItem)
      break
    case ACTIONS.PICK_UP:
      pickUp(currentNode.value as NodeItem)
      break
    default:
      break
  }
})


const deleteLeafs = (parentId: number, leafs: NodeItem[]): NodeItem[] => {
  markDelte(parentId, leafs)
  return leafs.filter(i => !i.isDelete)
}

const expandLeafs = (node: NodeItem) => {
  const leafs = node.children
  const depth = node.depth
  leafs.forEach(i => {
    i.depth = depth! + 1
    i.parentId = node.id
    i.isDelete = false
    i.isActive = false
  })
  const idx = list.value.findIndex(i => i.id === node.id)
  if (idx !== -1) {
    list.value = [...list.value.slice(0, idx + 1), ...leafs, ...list.value.slice(idx + 1)]
  }
}

const pickUp = (node: NodeItem) => {
  list.value = deleteLeafs(node.id, list.value)
}

const updateVisibleData = (scrollTop: number, direction: string) => {
  if (leafRef.value?.children && leafRef.value.children.length > 0) {
    const leaf = leafRef.value.children[0]
    const leafHeight = leaf.getBoundingClientRect().height

    if (direction === 'down') {
      if (scrollTop > leafHeight * 2) {
        if (list.value.length - startIndex.value > props.count) {
          startIndex.value += 1
        }
      }
    } else {
      if (scrollTop <= leafHeight || scrollTop === 0) {
        if (startIndex.value > 0) {
          startIndex.value -= 1
        }
      }
    }
  }
}

const oldScrollTop = ref(0)
const handleScroll = (e: any) => {
  if(props.height === 0) {
    return
  }
  const scrollTop = e.target.scrollTop || 0
  const direction = scrollTop - oldScrollTop.value > 0 ? 'down' : 'up'
  oldScrollTop.value = scrollTop
  updateVisibleData(scrollTop, direction)
}


</script>

<style scoped>
.fix-height {
  height: var(--wrapper-height);
  overflow-y: auto;
}

.item {
  width: 100%;
  height: 2px;
  background-color: red;
}
</style>