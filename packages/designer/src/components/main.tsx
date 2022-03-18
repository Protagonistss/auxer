/** @format */

import { defineComponent } from 'vue'
import { NLayout, NLayoutSider, NMenu, NSpace } from 'naive-ui'

export default defineComponent({
  name: 'Main',
  components: { NLayout, NLayoutSider, NMenu },
  props: {},
  setup() {
    return {}
  },
  render() {
    return (
      <NSpace>
        <NLayout hasSider={ true } siderPlacement='right'>
          <NLayoutSider 
            bordered 
            show-trigger 
            collapse-mode="width"
            width={240}
            native-scrollbar={false}
            style="max-height: 320px"
            collapsed-width={64}>
            <NMenu collapsedWidth={64} collapsedIconSize={22}>
            </NMenu>
          </NLayoutSider>
        </NLayout>
      </NSpace>
    )
  }
})
