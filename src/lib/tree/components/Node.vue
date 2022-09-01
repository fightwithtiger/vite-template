<template>
  <div class="sub-leaf">
    <div v-if="data" class="wrapper">
      <span class="spread" @click.stop="handleSpread">{{ guideSymbol }}</span>
      <span @click.stop="handleSelect(data)">{{ data.name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LeafNode } from '../type';

interface Props {
  data: LeafNode | null
  showSubTree: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: null,
  showSubTree: false,
  loading: false,
})

const emits = defineEmits(['update:showSubTree', 'selectNode'])

const guideSymbol = computed(() => {
  if (props.loading) {
    return '🔘'
  }

  return props.showSubTree ? '👆' : '👇'
})

const handleSpread = () => {
  if (props.data?.isLeaf || props.loading) {
    return
  }
  emits('update:showSubTree', !props.showSubTree)
}

const handleSelect = (data: LeafNode | null) => {
  emits('selectNode', data)
}
</script>

<style scoped>
.sub-leaf {
  /* padding-left: 14px; */
  /* margin-left: 14px; */
  display: flex;
}
.indent {
  /* display: inline-block; */
  width: 14px;
  height: 20px;
}

.wrapper {
  padding: 4px 8px;
  cursor: pointer;
}

.spread {
  padding: 0px 4px;
}
</style>