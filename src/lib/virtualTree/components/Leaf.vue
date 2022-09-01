<template>
  <component :is="NodeComp" v-bind="$attrs" :data="data" v-model:showSubTree="showSubTree" :loading="loading" @selectNode="select"></component>
</template>

<script lang="ts" setup>
import { NodeItem } from '../type';
import Node from './Node.vue'
import { useVirtualTreeStore, ACTIONS } from '../composable'

interface Props {
  data: NodeItem | null
  uid: string
  NodeComp?: any
}

const props = withDefaults(defineProps<Props>(), {
  data: null,
  uid: '',
  NodeComp: Node
})

const { currentNode, currentAction, loadMore } = useVirtualTreeStore(props.uid)

const showSubTree = ref(props.data?.isActive || false)

const loading = ref(false)

watch(showSubTree, async (val) => {
  if(val) {
    if(loadMore && (!props.data?.children || props.data.children.length === 0)) {
      if(loading.value) {
        return
      }
      loading.value = true
      const children = await loadMore()
      loading.value = false
      props.data!.children = children
    }
    props.data!.isActive = true
    currentAction.value = ACTIONS.EXPAND
  }else {
    props.data!.isActive = false
    currentAction.value = ACTIONS.PICK_UP
  }
  currentNode.value = {...props.data!}
})

const select = (node: NodeItem | null) => {
  currentAction.value = ACTIONS.SELECT
  currentNode.value = {...node!}
}


</script>

<style scoped>
</style>