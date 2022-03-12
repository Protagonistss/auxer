/** @format */

import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Auxer',
  description: 'Auxer',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    [
      'link',
      {
        rel: 'alternate icon',
        href: '/favicon.ico',
        type: 'image/png',
        sizes: '16x16'
      }
    ]
  ],
  themeConfig: {
    nav: [{ text: 'Guide', link: '/guide/' }]
  }
})
