
import { onUnmounted } from 'vue';

export function useGsapAnimation(timeline) {
  onUnmounted(() => {
    timeline.kill();
  });

  return timeline;
}