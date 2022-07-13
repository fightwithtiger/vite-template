<template>
  <div class="container">
    home
    <div>
      <input type="text" />
    </div>
    <div class="content">
      <div>
        {{ isDev() ? 'hello dev' : 'hello test' }}
        {{ BASE_URL }}
      </div>
      
      <div>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </div>
      <div>
        {{ store.counter }}
        {{ store.doubleCount }}
        <van-button type="primary" @click="add">add</van-button>
        <van-button type="primary" @click="randomizeCounter">randomizeCounter</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isDev } from '@/utils/env'
import { BASE_URL } from '@/config/host'

const store = useMainStore()

const value1 = ref(0)
const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 }
]

const add = () => {
  store.counter++
}

const randomizeCounter = () => {
  store.randomizeCounter()
}
</script>

<style lang="less" scoped>
.content {
  color: @colorError;
  width: 375px;
  height: 400px;
  background-color: antiquewhite;
  font-size: 16px;
}
</style>