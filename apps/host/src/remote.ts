import { defineAsyncComponent } from '@vue/composition-api';
import { loadRemoteModule } from '@softarc/native-federation';

export const RemoteApp = defineAsyncComponent(() => loadRemoteModule('remote', './remote-app'));
