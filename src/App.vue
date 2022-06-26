<script setup lang="ts">
</script>

<template>
  <div>
    <div>
      <router-link to="/" style="color: rgb(67, 154, 67)">home</router-link>
      <router-link to="/about" style="color: rgb(67, 154, 67); margin-left: 10px;">about</router-link>
    </div>
    <router-view v-slot="{ Component }">
      <template v-if="$route.meta.keepAlive">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </template>
      <template v-else>
        <component :is="Component" />
      </template>
    </router-view>
  </div>
</template>

<style lang="less" scoped>
</style>
