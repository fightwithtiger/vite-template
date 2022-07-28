<template>
<div class="child">
  child
  <button @click.stop="$router.go(-1)">back</button>
</div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.child{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: aquamarine;
}
</style>