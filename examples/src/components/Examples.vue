<!-- @format -->

<script setup lang="ts">
import { Designer } from '@auxer/designer'
import { onMounted } from 'vue'

onMounted(() => {
  Designer('#mount-designer')
})
</script>

<template>
  <h1>Hello Examples</h1>
  <div id="mount-designer"></div>
</template>

<style scoped></style>
