/** @format */

import { h, createApp } from 'vue'
import Main from './components/Main'

const app = createApp({
  render: () => h(Main)
})

export const Designer = (container: string | Element) => {
  app.mount(container)
}
