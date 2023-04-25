<script lang="ts">
import Count from '@/components/Count/index.vue';
import { defineComponent } from '@vue/composition-api';

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
