<template>
  <div>
    <AsyncCustomHeader title="首页" content="home"/>
    home
    <button @click="$router.push({ name: 'child' })">child</button>
    <button @click="$router.push({ name: 'page11'} )">page11</button>
    <button @click="$router.push({ name: 'ad' })">ad</button>
    <button @click="logout">logout</button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const logout = () => {
  _userInfo.value = null
  window.location.replace('/')
}
</script>

<style lang="less" scoped>
</style>