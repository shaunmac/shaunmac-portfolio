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
  <div class="loader-animation">

    <!-- SVGs go here -->
    <div ref="shapeContainer" class="w-full h-full absolute left-0 top-0">

     <svg width="0" height="0" style="position: absolute;">
      <defs>
        <mask id="circuitMask">
          <path
            fill="white"
            stroke="none"
            d="m69 365 1-2 12-12c2-2 3-3 3-5l1-53 2-5 75-74 12-12 4-1 6-1c1-4-1-5-4-5-4 0-7-1-8-4-2-4-1-7 3-9 1-1 4 0 4-3l-2-5v-3l3-2 3 2c1 1 0 2-1 3-2 3-2 6 0 8s3 4 6 3c3 0 5 0 8-2 2-2 4-3 4-7l1-2 14-13 11-11 2-4 1-32c0-2 0-3-2-4-4-3-3-7 1-10l1-3v-9c0-3 1-4 2-5l9-10 5 7m0 0-12 12c-2 3-2 6 0 9 3 2 3 6 0 9-2 1-2 2-2 4a3566 3566 0 0 0-3 37l-23 24-3 2c-1 1 0 4 2 4 5 2 8 5 8 9 1 6-4 12-11 13-5 1-11-4-11-9l1-6h-9l-1 1 3 2c2 0 3 1 3 3 0 8 8 14 15 13 9-2 15-10 13-18 0-3-1-5-3-8h4l32-1 5-2c10-8 10-8 10-21v-8c0-4 1-7 5-10a584 584 0 0 0 21-24l1-10c1-3 5-5 8-8l37-35v-3c1-5 3-7 7-8 3-1 7 2 8 5 1 4-3 8-7 9l-4 2-39 38c-2 2-3 5-3 8 1 6-1 10-6 14l-20 20-2 4-1 25c0 3-1 6-4 9-5 5-10 7-17 7h-24l-3 2-1 4 3 1a1610 1610 0 0 0 41-4l13-12 2-4 1-28 1-5h1l1 2c-3 4-2 8-2 13l-1 20-1 3-11 11-1 2c4 0 8 1 11-3 3-3 7-6 9-10 2-3 1-8 1-12-1-5 1-10 6-14l22-21a15353 15353 0 0 1 41-43c-2-6 1-12 7-14s12 1 14 7c1 6-3 12-9 14h-3c-3 0-5 1-7 3l-41 41-20 20-1 3-1 23-2 3a541 541 0 0 1-17 14l-44 1-51 2-4 3-33 32-45 45c-2 2-4 4-4 8l-1 47c0 5-2 9-6 12l-8 8c-1 2-3 1-4 0l-4-4v1l5 6-31 30-24 24-1 3c-3 6-9 9-14 7-5-1-7-5-6-9 0-6 3-9 8-10h6c2 0 3 0 4-2l45-44 4-3c-1 2 1 3 3 5l1-1-4-4m196-193-2 2-8 7-5 2-25 1c-3 0-4 1-4 4 0 2 2 2 3 1h31l2-1c5-4 10-8 8-16M13 417c-3-1-6 0-7 3v2h2l5-5m145-187-3-1-2 2 2 1 3-2m165-94-2-2-2 2 2 2 2-2M66 375l2-3-2-2-1 2c-1 1 0 2 1 3m135-188-2-1-3 2 1 1 4-2M55 383l-2 3 2 2 2-2-2-3m7-4c2-3 2-3 0-4-2 1-2 2 0 4m15-20-1 1c1 2 3 4 5 3l-4-4M242 73l16-16 2-5 1-30c0-2 0-4-2-5-3-4-3-8 0-12s9-5 13-3c3 2 5 7 4 11l-4 4c-2 1-2 3-2 4l-1 35-2 4-12 13-1-1-5-4-1 1 6 4-3 2-5-5-1 1 5 6-2 2-6-6c-1 0 0 0 0 0"
            transform="rotate(-135 176 129)"
          />
        </mask>
      </defs>
    </svg>
    <div
      class="relative overflow-hidden"
      style="width: 480px; height: 480px; mask: url(#myMask); -webkit-mask: url(#myMask);"
    >
      <div
        ref="maskedDiv"
        class="bg-cyan-200 blur-lg backdrop-blur left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style="width: 200px; height: 200px; transform-origin: center;"
      >
      </div>
    </div>
      
    </div>
  <!-- Other SVGs go here -->

    <h2 ref="textRef" id="loading-text" class="w-full text-xl text-nowrap text-center absolute -bottom-10 text-cyan-600">Loading...</h2>
  </div>
</template>



<style scoped>
.loader-animation {
  /* Styles for loader animation */
}
</style>
