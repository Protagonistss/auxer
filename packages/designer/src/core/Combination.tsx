import { defineComponent, ref } from 'vue'
import vuedraggable from 'vuedraggable'
import { NTag } from 'naive-ui'

export default defineComponent({
  name: 'Combination',
  components: { vuedraggable, NTag },
  setup() {
    const pool = ref([])
    const log = (e: Event) => {
      console.log('e', e)
    }
    const slots = {
      item: ({ element }: any) => (
        <NTag type="success" style={{ width: '100%' }}>
          {element.text}
        </NTag>
      )
    }
    return {
      pool,
      slots,
      log
    }
  },
  render() {
    return (
      <vuedraggable
        style={{ height: '200px', width: '100%' }}
        list={this.pool}
        group="people"
        onChange={this.log}
        v-slots={this.slots}
        item-key="name"
      ></vuedraggable>
    )
  }
})
