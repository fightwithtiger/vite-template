<template>
  <button @click="flag = !flag">change</button>
  <div :style="{display: 'flex'}">
    <div class="content">
      <Tree v-if="flag" :data="raw" @action="handleAction"/>
      <!-- <Tree v-if="!flag" :data="raw" :NodeComp="Tag" :loadMore="loadMore" @action="handleAction" @customAction="sayHello" /> -->
    </div>

    <!-- <div class="content">
      <VirtualTree v-if="flag" :data="raw" :height="240" :count="15" :loadMore="loadMore" @action="handleAction" />
      <VirtualTree v-if="!flag" :NodeComp="Tag" :data="raw" :loadMore="loadMore" @action="handleAction" :height="240" :count="15" @customAction="sayHello" />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import Tag from './Tag.vue';
import type { Action, LeafNode } from '@/lib/tree'

const flag = ref(true)

const data: any[] = []
const root = 60
const children = 200
const base = 100
for (let i = 0; i < root; i++) {
  data.push({
    id: `${i+1}`,
    name: `test-${i+1}`,
    children: []
  });
  for (let j = 0; j < children; j++) {
    data[i].children.push({
      id: `${i+1}-${j}`,
      name: `test-${i+1}-${j}`,
      children: []
    });
    for (let k = 0; k < base; k++) {
      data[i].children[j].children.push({
        id: `${i+1}-${j}-${k}`,
        name: `test-${i+1}-${j}-${k}`
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
    }, 600)
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
  /* width: 400px; */
  height: 600px;
  padding: 10px 20px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
}
</style>