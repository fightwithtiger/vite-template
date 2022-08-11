<template>
  <div>
    <h1>page11</h1>
    <AsyncCustomHeader title="page11" :content="msg"/>
    <a-button class="btn" @click="change">change</a-button>

    <div>{{ msg }}</div>
    <CustomFooter>
      <div>{{msg}}</div>
    </CustomFooter>
  </div>
</template>

<script lang="ts" setup>
const msg = ref('aaaaaaaaaaaaaa')

const change = () => {
  msg.value = Date.now() + ''
} 
</script>

<style scoped>
</style>