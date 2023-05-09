<script lang="ts">
import Count from '@/components/Count/index.vue';
import { defineComponent } from '@vue/composition-api';

console.log('load Remote App')

export default defineComponent({
  components: { Count },
});
</script>

<template>
  <div>
    Remote
    <Count />
  </div>
</template>
