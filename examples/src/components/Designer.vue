<script setup lang="ts">
import { Designer } from '../../../packages/designer/src/index'
import { onMounted } from 'vue'

onMounted(() => {
  Designer('#mount-designer')
})
</script>

<template>
  <div id="mount-designer"></div>
</template>

<style scoped></style>
