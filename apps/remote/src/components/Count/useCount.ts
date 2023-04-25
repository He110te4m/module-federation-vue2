import { ref } from '@vue/composition-api';

export function useCount(initCount = 0) {
  const count = ref(initCount);
  const add = () => {
    count.value += 1;
  };
  const sub = () => {
    count.value -= 1;
  };

  return {
    count,
    add,
    sub,
  };
}
