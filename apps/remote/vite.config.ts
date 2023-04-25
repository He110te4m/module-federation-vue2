import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig(() => {
  return {
    plugins: [
      createVuePlugin(),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src')
        }
      ],
    },
  }
})
