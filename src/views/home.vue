<template>
  <div>
    home
    <button @click="$router.push({ name: 'child' })">child</button>
    <button @click="$router.push({ name: 'page11'} )">page11</button>
    <button @click="$router.push({ name: 'ad' })">ad</button>
    <button @click="logout">logout</button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
const logout = () => {
  _userInfo.value = null
}
</script>

<style lang="less" scoped>
</style>