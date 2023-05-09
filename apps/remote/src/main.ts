import Vue from 'vue';
import VCA, { h } from '@vue/composition-api';
import App from './App.vue';
import { initFederation } from "@softarc/native-federation";

try {
  (async () => {
    await initFederation()
    init()
  })()
} catch (error) {
  init();
}

function init() {
  Vue.use(VCA);

  const app = new Vue({
    render: () => h(App),
  });

  app.$mount('#app');
}
