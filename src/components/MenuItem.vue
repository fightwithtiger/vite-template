<template>
  <div>
    <template v-for="page of pages">
      <template v-if="!page.children || page.children.length === 0">
        <router-link :to="{ name: page.name }">
          <a-menu-item :key="page.name">
            <span>{{ page.zhName }}</span>
          </a-menu-item>
        </router-link>
      </template>
      <template v-else>
        <a-sub-menu :key="page.name">
          <template #title>{{ page.zhName }}</template>
          <MenuItem :pages="page.children" />
        </a-sub-menu>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Page } from '@/lib'

interface Props {
  pages: Page[]
}

const props = withDefaults(defineProps<Props>(), {
  pages: () => []
})

</script>

<style scoped>
</style>