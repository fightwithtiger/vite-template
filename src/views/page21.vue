<template>
  <div>
    <AsyncCustomHeader title="page21" content="content" />
    page21
    <a-button @click="change">change</a-button>
    <CustomFooter>
      <Tip :msg="msg" />
    </CustomFooter>
  </div>
</template>

<script lang="ts" setup>
import Tip from '@/components/Tip.vue'
const msg = ref('ni hao')

const change = () => {
  msg.value = Date.now() + 'ljlj'
}
</script>

<style scoped>
</style>