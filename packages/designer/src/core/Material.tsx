import { defineComponent, ref, readonly } from 'vue'
import { NLayout, NLayoutHeader, NLayoutContent, NTag } from 'naive-ui'
import vuedraggable from 'vuedraggable'
import { useMaterialStore } from '../store/index'

export default defineComponent({
  name: 'Materials',
  components: { NTag, vuedraggable },
  props: {
    dataSource: {
      type: Array
    }
  },
  setup() {
    const materialStore = useMaterialStore()
    console.log('materialStore', materialStore.dataSource)
    const materialPool = readonly(
      ref([
        { text: '输入框', id: 'input' },
        { text: '下拉框', id: 'select' },
        { text: '数字', id: 'inputNumber' },
        { text: '日期', id: 'datepicker' }
      ])
    )
    const vuedraggableSlots = {
      item: ({ element }: { element: { text: string } }) => (
        <section class={'dg-material__row'}>
          <NTag type="success" style={{ width: '100%' }}>
            {element.text}
          </NTag>
        </section>
      )
    }

    const log = (e: Event) => {
      console.log('e', e)
    }
    return {
      materialPool,
      vuedraggableSlots,
      log
    }
  },
  render() {
    console.log('material', this.dataSource)
    // reloadSettings()
    const { log } = this
    return (
      <NLayout>
        <NLayoutHeader bordered style={{ height: '32px', lineHeight: '32px' }}>
          物料区域
        </NLayoutHeader>
        <NLayoutContent style={{ height: 'calc(100vh - 32px)' }}>
          <vuedraggable
            onChange={log}
            item-key="name"
            v-slots={this.vuedraggableSlots}
            group={{ name: 'people', pull: 'clone', put: false }}
            list={this.materialPool}
          ></vuedraggable>
        </NLayoutContent>
      </NLayout>
    )
  }
})
