import Vue from 'vue';
import VCA, { h } from '@vue/composition-api';
import App from './App.vue';
import { initFederation } from '@softarc/native-federation'
import { RemoteApp } from './remote'

try {
  (async () => {
    await initFederation({
      remote: 'http://localhost:4396/remoteEntry.json',
    });

    console.log('加载远程模块成功')

    init();
  })();
} catch (error) {
  init();
}

async function init() {
  console.log('load VCA')
  Vue.use(VCA);

  // const { RemoteApp } = await import('./remote')
  Vue.component('RemoteApp', RemoteApp)

  const app = new Vue({
    render: () => h(App),
  });

  app.$mount('#app');
}
