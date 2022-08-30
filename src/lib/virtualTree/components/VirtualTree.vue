<template>
  <div>
    <div>
      <Leaf v-for="item of list" :key="item.id" :uid="uid" :data="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LeafNode, NodeItem } from '../type'
import { flatten } from '../../share'
import Leaf from './Leaf.vue'
import { useVirtualTreeStore, removeVirtualTreeStore, guid } from '../composable'

interface Props {
  data: LeafNode[]
  loadMore?: (() => any) | null
  NodeComp?: any
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ([]),
  loadMore: null,
  NodeComp: null
})

const emits = defineEmits(['action'])

const list = ref<NodeItem[]>([])

const uid = ref(guid())
const { currentAction, currentNode, setLoadMoreFn } = useVirtualTreeStore(uid.value)

setLoadMoreFn(props.loadMore)

onUnmounted(() => {
  removeVirtualTreeStore(uid.value)
})


watch(() => props.data, (val) => {
  list.value = flatten<LeafNode, NodeItem>([...val], 0)
}, {
  immediate: true
})

watchEffect(() => {
  emits('action', currentAction.value, currentNode.value)
})



</script>

<style scoped>
</style>