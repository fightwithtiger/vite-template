<template>
  <div>
    <div ref="infoRef" class="info">
      <div>{{ info.text }}</div>
      <img v-for="(item, idx) of info.imgs" :key="idx" :src="item" />
    </div>
    <button class="btn" @click="handleClick">info</button>

  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import Clipboard from 'clipboard'

const infoRef = ref(null)
const info = ref({
  text: '',
  imgs: [],
})

const handleClick = () => {
  const i = {
    text: '啦啦啦啦啦l',
    imgs: [
      'http://cdn.qqzby.net/temp/contract/20220705203335894817627.png',
      'http://cdn.qqzby.net/temp/contract/20220705203335894817627.png'
    ]
  }
  info.value = i

  nextTick(() => {
    const clipboard = new Clipboard('.btn', {
      target: function () {
        return infoRef.value
      }
    })
    clipboard.on('success', function (t) {
      console.log('success')
      clipboard.destroy()

    })
    clipboard.on('error', function (t) {
      console.log('error', t)
      clipboard.destroy()
    }) 
  })
}
</script>

<style scoped>
</style>