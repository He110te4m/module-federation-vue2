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
          verbose: true,
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
      },
    },
  };
});
