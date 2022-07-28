import type { Page } from '@/router/type'
import { defineStore } from 'pinia'

interface MainState {
  counter: number
  pages: Page[] | null
}

export const useMainStore = defineStore('main', {
  state: (): MainState => ({
    counter: 0,
    pages: null
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
    setPages(data: Page[]) {
      this.pages = [...data]
    }
  }
})