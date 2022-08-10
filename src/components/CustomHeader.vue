<template>
  <Teleport to='.header-content'>
    <div class="wrapper">
      <slot name="title">
        <div class="title m-r10">{{ title }}</div>
      </slot>
      <slot name="content">
        <div class="content m-r10">{{ content }}</div>
      </slot>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
interface Props {
  title: string
  content: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  content: ''
})
</script>

<style scoped>
.m-r10 {
  margin-right: 10px;
}
.wrapper{
  display: flex;
  align-items: baseline;
  padding: 0 16px;
}
.title {
  font-size: 18px;
  font-weight: 600;
}
</style>