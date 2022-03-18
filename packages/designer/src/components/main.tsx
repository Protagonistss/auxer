/** @format */

import { defineComponent, ref } from 'vue'
import { NLayout, NLayoutSider, NMenu, NSpace, NLayoutContent, NLayoutHeader, NButton, NDrawer, NDrawerContent } from 'naive-ui'
import Materials from './Materials'
import Combination from './Combination'

type THeaderButton = 'setting'

export default defineComponent({
  name: 'Main',
  components: { NLayout, NLayoutSider, NMenu, NLayoutContent, Materials, NLayoutHeader, NButton, Combination, NDrawer, NDrawerContent },
  props: {},
  setup() {
    let showDraw = ref(false)
    const handleClickHeader = (arg: THeaderButton) => {
      switch (arg) {
        case 'setting':
          showDraw.value = true
          break
        default:
          break
      }
    }
    return {
      handleClickHeader,
      showDraw
    }
  },
  render() {
    const { handleClickHeader } = this
    return (
      <NSpace vertical size="large">
        <NLayout has-sider>
          <NLayoutSider
            bordered 
            show-trigger
            collapse-mode="width"
            show-collapsed-content={ false }
            width={ 240 }
            style={{ height: "100vh" }}
            collapsed-width={ 64 }>
              <Materials></Materials>
          </NLayoutSider>
          <NLayoutContent>
            <NLayout>
              <NLayoutHeader 
                style={{ padding: "0px 12px 0px 12px", height: "32px", lineHeight: "32px", textAlign: "right" }} 
                bordered>
                <NButton onClick={ () => handleClickHeader('setting') } type="primary" size="small">配置</NButton>
              </NLayoutHeader>
              <NLayoutContent 
                style={{ height: "calc(100vh - 32px)" }}>
                <Combination></Combination>
              </NLayoutContent>
            </NLayout>
          </NLayoutContent>
          <NDrawer v-model:show={ this.showDraw } width="600">
            <NDrawerContent title="配置面板" closable>
              敬请期待
            </NDrawerContent>
          </NDrawer>
        </NLayout>
      </NSpace>
    )
  }
})
