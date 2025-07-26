import { gsap } from 'gsap';
import { onUnmounted } from 'vue';

export function useGsapAnimation(element, options) {
  const timeline = gsap.timeline();

  if (element.value) {
    timeline.from(element.value.children, {
      ...options,
    });
  }

  onUnmounted(() => {
    timeline.kill();
  });

  return timeline;
}