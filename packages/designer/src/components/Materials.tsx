/** @format */

import { defineComponent } from 'vue'
import { NLayout, NLayoutHeader, NLayoutContent, NTag } from 'naive-ui'

export default defineComponent({
  name: 'Materials',
  components: { NTag },
  setup() {
    return {}
  },
  render() {
    return (
      <NLayout>
        <NLayoutHeader bordered style={{ height: '32px', lineHeight: '32px' }}>
          物料区域
        </NLayoutHeader>
        <NLayoutContent style={{ height: 'calc(100vh - 32px)' }}>
          <section class={'dg-material__row'}>
            <NTag type="success" style={{ width: '100%' }}>
              输入框
            </NTag>
            <NTag type="success" style={{ width: '100%' }}>
              下拉框
            </NTag>
          </section>
          <section class={'dg-material__row'}>
            <NTag type="success" style={{ width: '100%' }}>
              数字
            </NTag>
            <NTag type="success" style={{ width: '100%' }}>
              日期
            </NTag>
          </section>
        </NLayoutContent>
      </NLayout>
    )
  }
})
