import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  minify: false,
  clean: true,
  platform: 'node',
  external: [
    'vite',
    /@softarc\/.*/,
  ],
  noExternal: [
    'mime-types',
  ],
})
