<template>
  <a-layout :class="['layout', { collapsed }]">
    <a-layout-sider class="layout-sider" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" @click="$router.push({ name: 'home' })">首页</div>
      <a-menu class="menu-list" theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <MenuItem :pages="pages" />
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding-left: 14px;">
        <div class="header">
          <div>
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </div>
          <div @click="logout">退出</div>
        </div>
      </a-layout-header>
      <a-layout :style="{ height: 'calc(100vh - 64px)', overflow: 'auto' }">
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff' }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>

    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'
import { getPages } from '@/api'
import type { Page } from '@/lib'

const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const pages = ref<any[]>([])

onMounted(async () => {
  try {
    console.log('layout rerender')
    const data = await getPages()
    pages.value = data
  } catch (e) {
  }
})

const logout = () => {
  _userInfo.value = null
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>

<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  padding-left: 200px;
  transition: all 0.2s;

  &.collapsed {
    padding-left: 80px;
  }

  .layout-sider {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;

    .logo {
      height: 100px;
      color: #fff;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
    }

    .menu-list {
      height: calc(100vh - 100px);
      overflow: auto;
    }

    .header{
      display: flex;
      justify-content: space-between;
    }

    .content {
      height: calc(100vh - 64px);
      overflow: auto;
    }
  }
}
</style>
