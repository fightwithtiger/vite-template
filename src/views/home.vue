<template>
  <div>
    home
    <button @click="$router.push('/child')">child</button>
    <button @click="$router.push('/page11')">page11</button>
    <button @click="$router.push('/ad')">ad</button>
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