<template>
  <div>
    <h1>page11</h1>
    <AsyncCustomHeader title="page11" :content="msg"/>
    <a-button @click="change">change</a-button>
  </div>
</template>

<script lang="ts" setup>
const msg = ref('aaaaaaaaaaaaaa')

const change = () => {
  msg.value = Date.now() + 'bbbbbbb'
} 
</script>

<style scoped>
</style>