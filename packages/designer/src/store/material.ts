import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMaterialStore = defineStore({
  id: 'material',
  state: () => ({
    dataSource: []
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMaterialStore, import.meta.hot))
}
