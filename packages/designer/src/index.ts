import { h, createApp } from 'vue'
import Main from './components/Main'
import './styles'

const app = createApp({
  render: () => h(Main, { name: 'hs' })
})

export const Designer = (container: string | Element) => {
  app.mount(container)
}
