<template>
<div class="container">
  about
  <div>
    test vueuse
    <div>
      x: {{ x }}
      y: {{ y }}
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
const { x, y } = useMouse()
</script>

<style scoped>
</style>