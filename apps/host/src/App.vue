<script lang="ts">
import Count from '@/components/Count/index.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: { Count },
});
</script>

<template>
  <div>
    Host
    <Count />
    <RemoteApp />
  </div>
</template>
