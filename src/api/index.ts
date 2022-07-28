import { pages } from '@/mock/pages'

export function login() {
  return Promise.resolve({
    id: 1,
    name: 'dj',
    token: '123456'
  })
}

export function getPages() {
  console.log('请求页面')
  return Promise.resolve(pages)
}