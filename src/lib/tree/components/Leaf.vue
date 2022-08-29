<template>
  <div v-if="data">
    <component :is="NodeComp" v-bind="$attrs" :data="data" v-model:showSubTree="showSubTree" :loading="loading" @selectNode="select"></component>
    <div class="sub-leaf" v-if="data.children && showSubTree">
      <Leaf :uid="uid" v-bind="$attrs" v-for="item of data.children" :key="item.id" :data="item" :NodeComp="NodeComp" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTreeStore, ACTIONS } from '../composable'
import type { LeafNode } from '../type'
import Node from './Node.vue'

interface Props {
  data: LeafNode | null
  NodeComp?: any
  uid: string
}

const props = withDefaults(defineProps<Props>(), {
  data: null,
  NodeComp: Node,
  uid: ''
})

const { currentNode, currentAction, loadMore } = useTreeStore(props.uid)

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

const select = (node: LeafNode | null) => {
  currentAction.value = ACTIONS.SELECT
  currentNode.value = {...node!}
}


</script>

<style scoped>
.sub-leaf{
  padding-left: 14px;
  /* box-sizing: border-box; */
}
</style>