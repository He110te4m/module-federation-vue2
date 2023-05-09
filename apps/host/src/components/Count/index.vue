<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useCount } from './useCount'

export default defineComponent({
  setup() {
    const { count, add, sub } = useCount();
    return { count, add, sub };
  },
});
</script>

<template>
  <div>
    <div>
      count: {{ count }}
    </div>
    <div>
      <button @click="add">add</button>
      <button @click="sub">sub</button>
    </div>
  </div>
</template>
