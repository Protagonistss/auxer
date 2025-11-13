import {
  defineComponent,
  ref,
  reactive,
  computed,
  onBeforeUnmount
} from 'vue'
import vuedraggable from 'vuedraggable'
import { NTag } from 'naive-ui'

export default defineComponent({
  name: 'Combination',
  components: { vuedraggable, NTag },
  setup() {
    const pool = ref([])
    const canvasRef = ref<HTMLElement | null>(null)

    const GRID_SIZE = 40
    const canvasState = reactive({
      offsetX: 0,
      offsetY: 0,
      scale: 1
    })

    const isPanning = ref(false)
    const pointerStart = { x: 0, y: 0 }
    const offsetStart = { x: 0, y: 0 }

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max)

    const surfaceStyle = computed(() => ({
      transform: `translate3d(${canvasState.offsetX}px, ${canvasState.offsetY}px, 0) scale(${canvasState.scale})`
    }))

    const canvasStyle = computed(() => ({
      backgroundPosition: `${canvasState.offsetX}px ${canvasState.offsetY}px`,
      backgroundSize: `${GRID_SIZE * canvasState.scale}px ${
        GRID_SIZE * canvasState.scale
      }`
    }))

    const log = (e: Event) => {
      console.log('e', e)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isPanning.value) return
      const deltaX = event.clientX - pointerStart.x
      const deltaY = event.clientY - pointerStart.y
      canvasState.offsetX = offsetStart.x + deltaX
      canvasState.offsetY = offsetStart.y + deltaY
    }

    const stopPanning = () => {
      if (!isPanning.value) return
      isPanning.value = false
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopPanning)
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      const target = event.target as HTMLElement
      if (target.closest('.dg-canvas__node')) return
      event.preventDefault()
      isPanning.value = true
      pointerStart.x = event.clientX
      pointerStart.y = event.clientY
      offsetStart.x = canvasState.offsetX
      offsetStart.y = canvasState.offsetY
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', stopPanning)
    }

    const handleWheel = (event: WheelEvent) => {
      if (!canvasRef.value) return
      event.preventDefault()
      const nextScale = clamp(
        canvasState.scale * (event.deltaY < 0 ? 1.1 : 0.9),
        0.25,
        4
      )
      const rect = canvasRef.value.getBoundingClientRect()
      const pointerX = event.clientX - rect.left
      const pointerY = event.clientY - rect.top
      const contentX = (pointerX - canvasState.offsetX) / canvasState.scale
      const contentY = (pointerY - canvasState.offsetY) / canvasState.scale
      canvasState.scale = nextScale
      canvasState.offsetX = pointerX - contentX * canvasState.scale
      canvasState.offsetY = pointerY - contentY * canvasState.scale
    }

    onBeforeUnmount(() => {
      stopPanning()
    })

    const slots = {
      item: ({ element }: any) => (
        <div class="dg-canvas__node">
          <NTag type="success" style={{ width: '100%' }}>
            {element.text}
          </NTag>
        </div>
      )
    }
    return {
      pool,
      slots,
      log,
      handlePointerDown,
      handleWheel,
      surfaceStyle,
      canvasStyle,
      isPanning,
      canvasRef
    }
  },
  render() {
    return (
      <div
        class={['dg-canvas', { 'is-panning': this.isPanning }]}
        ref="canvasRef"
        style={this.canvasStyle}
        onPointerdown={this.handlePointerDown}
        onWheel={this.handleWheel}
      >
        <div class="dg-canvas__surface" style={this.surfaceStyle}>
          <vuedraggable
            class="dg-canvas__board"
            list={this.pool}
            group="people"
            onChange={this.log}
            v-slots={this.slots}
            item-key="name"
          ></vuedraggable>
        </div>
      </div>
    )
  }
})
