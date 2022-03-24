import { h, createApp } from 'vue'
import Main from './core/Main'
import { IDesignerProps } from '../types'
import './styles'

const createInstance = (props?: IDesignerProps) => {
  const app = createApp({
    render: () => h(Main, { materialDataSource: props?.materialSettings })
  })
  return app
}

export const Designer = (
  container: string | Element,
  props?: IDesignerProps
) => {
  const instance = createInstance(props)
  return instance.mount(container)
}

export * from './helper/material'
