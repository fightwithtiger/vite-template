<template>
  <div>{{ msg }}</div>
</template>

<script lang="ts" setup>
interface Props {
  msg: string
}

withDefaults(defineProps<Props>(), {
  msg: 'hello'
})
</script>

<style scoped>
</style>