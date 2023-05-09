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

    console.log('init federation success!')

    init();
  })();
} catch (error) {
  init();
}

async function init() {
  Vue.use(VCA);
  console.log('load VCA success')

  Vue.component('RemoteApp', RemoteApp)

  const app = new Vue({
    render: () => h(App),
  });

  app.$mount('#app');
}
