<template>
  <div v-if="data" class="wrapper">
    <span class="spread" @click.stop="handleSpread">V</span>
    &nbsp;&nbsp;
    <span @click.stop="handleSelect(data)">{{ data.name }}</span>
    &nbsp;&nbsp;&nbsp;
    <span @click.stop="$emit('customAction', data)">hello</span>
  </div>
</template>

<script lang="ts" setup>
import { LeafNode } from '@/lib/tree';

interface Props {
  data: LeafNode | null
  showSubTree: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: null,
  showSubTree: false
})

const emits = defineEmits(['update:showSubTree', 'selectNode', 'customAction'])

const handleSpread = () => {
  if(props.data?.isLeaf) {
    return
  }
  emits('update:showSubTree', !props.showSubTree)
}

const handleSelect = (data: LeafNode | null) => {
  emits('selectNode', data)
}
</script>

<style scoped>
.wrapper {
  padding: 4px 8px;
  border: 1px solid #000;
  cursor: pointer;
}

.spread {
  
}
</style>