/// <reference types="vite/client" />

import type { ComponentPublicInstance } from 'vue'
import { TReloadSettings } from './material'

export declare const Designer: (
  container: string | Element
) => ComponentPublicInstance

export declare const reloadSettings: TReloadSettings

export * from './designer'
export * from './material'
