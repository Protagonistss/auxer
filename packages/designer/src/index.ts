/** @format */

import { h, createApp } from 'vue'

const app = createApp({
  render: () => h('div', 'hello designer')
})

export const Designer = (container: string | Element) => {
  app.mount(container)
}
