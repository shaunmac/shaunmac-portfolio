<script setup>
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { onBeforeMount, onMounted, ref } from 'vue';

gsap.registerPlugin(SplitText);

let timeline;
const maskedDiv = ref(null);
const shapeContainer = ref(null);

const textRef = ref(null);

onMounted(() => {

  const split = new SplitText(textRef.value, { type: 'chars,words' });

  timeline = gsap.timeline({ repeat: -1 }); // Create a paused timeline
  
  timeline.from(split.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.03,
    duration: 0.5,
    ease: 'power2.out',
    repeat: -1, // Infinite loop
    repeatDelay: 1 // Optional: 1 second delay between loops
  });

  timeline.fromTo(
    maskedDiv.value,
    { scale: 0.5 },
    { scale: 1.5, duration: 2, repeat: -1, yoyo: false, ease: 'power1.inOut' }
  );

});
</script>   
<template>
  <div class="loader-animation-container w-full h-full relative">

    <!-- SVGs go here -->
    <div ref="shapeContainer" class="w-full h-full absolute left-0 top-0">

    <div
      class="relative overflow-hidden"
      style="margin: 0 auto; max-width: 469px; width: 100%; height: 145px; mask: url(#myMask) ; -webkit-mask: url(#myMask);"
    >
      <div
        ref="maskedDiv"
        class="bg-cyan-200 blur-lg rounded backdrop-blur left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 relative"
        style="width: 60px; height: 60px; transform-origin: center;"
      >
      </div>
    </div>
      
    </div>
  <!-- Other SVGs go here -->

    <h2 ref="textRef" id="loading-text" class="w-full text-xl text-nowrap text-center absolute bottom-1/2 text-cyan-600">Loading...</h2>

  </div>
</template>



<style scoped>
.loader-animation-container {
  @apply opacity-100 h-screen flex justify-center items-center;
}
</style>
