<template>
  <div>
    <AsyncCustomHeader title="page12" content="content"/>
    page12
    <a-button class="btn" @click="change">change</a-button>
    <CustomFooter>
      <div class="tip">内容是：{{msg}}</div>
    </CustomFooter>
  </div>
</template>

<script lang="ts" setup>
const msg = ref('aaaaaaaaaaaaaa')

const change = () => {
  msg.value = Date.now() + ''
} 
</script>

<style>
.tip{
  background-color: aqua;
}
</style>
<style scoped>
</style>