<template>
  <div>
    <button @click="userLogin">login</button>
  </div>
</template>

<script lang="ts" setup>
import { login } from '@/api'

const router = useRouter()
const route = useRoute()

const userLogin = async () => {
  // 模拟登录
  const data = await login()
  _userInfo.value = data
  const path = route.query.rediect || '/'
  router.push(path as string)
}
</script>

<style scoped>
</style>