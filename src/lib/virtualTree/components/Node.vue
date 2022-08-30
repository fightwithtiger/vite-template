<template>
  <div>
    <div v-if="data" class="leaf">
      <span v-for="i of data.depth" class="indent"></span>
      <span @click.stop="handleSpread">{{ guideSymbol }}</span>
      &nbsp;&nbsp;
      <span @click.stop="handleSelect(data)">{{data.name}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NodeItem } from '../type';

interface Props {
  data: NodeItem | null
  showSubTree: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: null,
  showSubTree: false,
  loading: false
})

const emits = defineEmits(['update:showSubTree', 'selectNode'])

const guideSymbol = computed(() => {
  if(props.loading) {
    return '🔘'
  }

  return props.showSubTree ? '👆' : '👇'
})

const handleSpread = () => {
  if(props.data?.isLeaf || props.loading) {
    return
  }
  emits('update:showSubTree', !props.showSubTree)
}

const handleSelect = (data: NodeItem | null) => {
  emits('selectNode', data)
}
</script>

<style scoped>
.leaf {
  padding: 6px 10px;
  cursor: pointer;
}
.indent{
  display: inline-block;
  width: 12px;
  height: 100%;
}
</style>