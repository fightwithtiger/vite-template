import { isObject } from '@vueuse/core'
import { DefineComponent, isVNode } from 'vue'
import { content } from './store'

export const FooterContainer = defineComponent({
  name: 'FooterContainer',
  inheritAttrs: true,
  props: {},
  setup(props, ctx) {

    return () => {
      return h('div', {
        style: 'text-align: center; height: 40px'
      }, content.value ? h(content.value) : undefined)
    }
  }
}) as DefineComponent<{}>
