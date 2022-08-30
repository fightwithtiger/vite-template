<template>
  <div>
    <component :is="Node" v-bind="$attrs" :data="data" v-model:showSubTree="showSubTree" :loading="loading" @selectNode="select"></component>
  </div>
</template>

<script lang="ts" setup>
import { NodeItem } from '../type';
import Node from './Node.vue'
import { useVirtualTreeStore, ACTIONS } from '../composable'

interface Props {
  data: NodeItem | null
  uid: string
}

const props = withDefaults(defineProps<Props>(), {
  data: null,
  uid: ''
})

const { currentNode, currentAction, loadMore } = useVirtualTreeStore(props.uid)

const showSubTree = ref(false)

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
    currentAction.value = ACTIONS.EXPAND
    currentNode.value = {...props.data!}
  }
})

const select = (node: NodeItem | null) => {
  currentAction.value = ACTIONS.SELECT
  currentNode.value = {...node!}
}


</script>

<style scoped>
</style>