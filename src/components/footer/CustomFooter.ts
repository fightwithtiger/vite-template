import { DefineComponent, VNode } from 'vue'
import { content } from './store'

export const CustomFooter = defineComponent({
  name: 'CustomFooter',
  inheritAttrs: true,
  props: {},
  setup(props, ctx) {

    const last = ref()

    onBeforeUnmount(() => {
      content.value = undefined
      last.value = undefined
      console.log('11111111')
    })

    onActivated(() => {
      content.value = { ...last.value as VNode }
      console.log(last.value)
    })

    onDeactivated(() => {
      content.value = undefined
    })

    return () => {
      const slots = ctx.slots.default?.()

      if (!slots || slots.length > 1) {
        return
      }

      const slot = slots[0]

      last.value = slot
      content.value = slot

      return h('template', {}, undefined)
    }
  }
}) as DefineComponent<{}>
