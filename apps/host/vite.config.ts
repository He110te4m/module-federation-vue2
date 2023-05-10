import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { moduleFederationPlugin } from 'federation';
// import { federation as moduleFederationPlugin } from '@module-federation/vite';
import { createEsBuildAdapter } from '@softarc/native-federation-esbuild';
import pluginVue from 'esbuild-vue';
// import pluginVue from 'esbuild-plugin-vue-next';

export default defineConfig(async ({ command }) => {
  return {
    plugins: [
      await moduleFederationPlugin({
        options: {
          workspaceRoot: __dirname,
          outputPath: 'dist',
          tsConfig: 'tsconfig.json',
          federationConfig: 'module-federation/federation.config.js',
          verbose: false,
          dev: command === 'serve',
        },
        // adapter: createEsBuildAdapter({ plugins: [createVuePlugin()] }),
        adapter: createEsBuildAdapter({ plugins: [pluginVue()] }),
      }),
      createVuePlugin(),
    ],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        ...getResolves(command)
      },
    },
  };
});

function getResolves(command: string): { [find: string]: string; } {
  return command === 'serve'
    ? {
      vue: resolve(
        __dirname,
        './node_modules/vue/dist/vue.esm.js'
      ),
      '@vue/composition-api': resolve(
        __dirname,
        './node_modules/@vue/composition-api/dist/vue-composition-api.mjs'
        // './node_modules/@vue/composition-api/index.js'
      ),
    }
    : [];
}
