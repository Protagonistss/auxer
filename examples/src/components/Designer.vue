<script setup lang="ts">
import { Designer, reloadSettings } from '../../../packages/designer/src/index'
import type { ITree } from '../../../packages/designer/types'
import { onMounted } from 'vue'

onMounted(() => {
  const settings: ITree[] = [
    {
      label: '基础组件',
      value: 'baseCmp',
      children: [{ label: '输入框', value: 'input' }]
    }
  ]
  Designer('#mount-designer', { materialSettings: settings })
  reloadSettings(settings)
})
</script>

<template>
  <div id="mount-designer"></div>
</template>

<style scoped></style>
