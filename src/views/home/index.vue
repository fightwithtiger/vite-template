<template>
  <div>
    <button @click="flag = !flag">change</button>
    <!-- <div class="content">
      <Tree v-if="flag" :data="raw" @action="handleAction"/>
      <Tree v-if="!flag" :data="raw" :NodeComp="Tag" :loadMore="loadMore" @action="handleAction" @customAction="sayHello" />
    </div> -->

    <div class="content">
      <VirtualTree :data="raw" :loadMore="loadMore" @action="handleAction" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tag from './Tag.vue';
import type { Action, LeafNode } from '@/lib/tree'

const flag = ref(false)

const data: any[] = []
const root = 1
const children = 2
const base = 3
for (let i = 0; i < root; i++) {
  data.push({
    id: `${i}`,
    name: `test-${i}`,
    children: []
  });
  for (let j = 0; j < children; j++) {
    data[i].children.push({
      id: `${i}-${j}`,
      name: `test-${i}-${j}`,
      children: []
    });
    for (let k = 0; k < base; k++) {
      data[i].children[j].children.push({
        id: `${i}-${j}-${k}`,
        name: `test-${i}-${j}-${k}`
      });
    }
  }
}

const raw = ref(data)

const loadMore = () => {
  console.log('--------load data ------------')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{
        id: Date.now(),
        name: 'aaaaaaa',
        children: [],
        // isLeaf: true
      }])
    }, 2000)
  })
}

const handleAction = (action: Action, payload: LeafNode) => {
  console.log(action, payload)
}

const sayHello = (data: any) => {
  console.log('hello', data)
}
</script>

<style scoped>
.content {
  width: 400px;
  height: 600px;
  padding: 10px 20px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
}
</style>