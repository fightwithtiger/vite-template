<template>
  <div>virtual</div>
</template>

<script lang="ts" setup>
import type { LeafNode } from '../type'

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

</script>

<style scoped>
</style>