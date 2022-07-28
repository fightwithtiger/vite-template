export * from './useMatchingRoutes'

export const toggle = ref(false)

interface UserInfo {
  id: number
  name: string
  token: string
}
export const _userInfo = useSessionStorage<UserInfo>('userInfo', { id: 0, name: '', token: '' })