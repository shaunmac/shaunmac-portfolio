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
  <div class="loader-animation-container">

    <!-- SVGs go here -->
    <div ref="shapeContainer" class="w-full h-full absolute left-0 top-0">

     <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" version="1.2" viewBox="0 0 510.9 159.2" style="position: absolute;">
      <defs>
        <mask id="circuitMask">
          <path d="M91.9 114.2h16.9q5.3-1.1 6.4-6.4c-.7-3.5 2.1-6.4 6.4-6.4 2.1.7 2.8 0 4.2-1.4q3.5-3 7.1-6 3.5-3 7.1-6l7-6q3.6-3 7.1-6l33.2-.7 3.5.7c1.5 0 2.9-2.9 1.5-4.3-2.2-4.9-2.2-9.2.7-12 3.5-4.9 11.3-5.7 16.9-1.4 4.3 2.8 5 10.6 1.5 14.1l-5 3.6 6.4 6.3h1.4l-.7-3.5q-2.1-2.1 0-4.2c5.6-5.7 4.2-15.6-1.4-19.8-7.8-5-17.7-3.6-22 3.5-2.1 2.1-2.8 4.2-3.5 7.8l-2.8-2.9-23.4-21.9-4.9-2.1c-12.7-1.4-12.7-1.4-21.9 7.8l-5.7 5.6c-2.8 2.9-5.6 4.3-10.6 3.6q-4 .1-8 .3-3.9.2-7.9.5l-8 .6q-3.9.3-7.9.7l-7.8 6.4c-2.8 1.4-7.1 0-11.3 0l-50.9-1.5-2.1 2.2c-4.3 2.8-7.1 2.8-10.6.7-2.9-1.4-3.6-6.4-2.2-9.2 2.2-3.6 7.8-3.6 11.4-1.4l4.2 1.4 54.4.7c2.9 0 5.7-1.4 7.8-3.6 3.6-4.9 7.8-6.3 14.2-5.6h28.2l4.3-1.4 18.4-17c2.1-2.1 4.9-3.5 9.2-3.5 7 0 12 2.1 16.9 7l17 17 3.5.7 3.6-2.1-1.4-2.8q-4-3.4-7.9-6.6l-8-6.6q-3.9-3.3-7.9-6.5-4-3.3-8.1-6.5l-17.6-.7-4.3 1.4L118 39.9l-4.2 2.8-.7-.7.7-2.1c4.9-.7 7-4.2 10.6-7.8l14.8-13.4 2.9-1.4h15.5l2.1-.7c-2.8-2.9-4.9-6.4-9.9-5.7-4.2 0-9.2-.7-13.4.7-3.5.7-6.4 5-9.2 7.8-2.8 4.2-7.8 6.4-14.1 5.7l-30.4-.8q-7.5.2-14.9.4l-14.8.4q-7.5.2-14.9.3l-14.8.4c-2.9 5.6-9.2 7.7-14.9 4.9-5.6-2.8-7.8-9.2-4.9-14.8 3.5-5 10.6-6.4 16.2-3.6l2.2 2.1c2.1 2.2 4.2 2.9 7 2.9h86.3l2.8-1.4L135 .3l3.5-.7q2.8.2 5.5.4 2.8.3 5.5.5 2.7.3 5.5.6l5.4.6 31.9 30.4 37.4 34.7 5 .7 46 .7h63.6c2.8 0 5.6 0 8.5-2.8l33.9-32.6q5.3-5.3 12.7-4.2h11.4c2.1-.7 2.8 1.4 2.8 2.8v5.7l.7-.7.7-7.8 43.1.7h34l2.8-1.4c6.4-2.1 12.7 0 14.9 4.9 2.8 4.3 1.4 8.5-2.2 10.6-4.2 4.3-8.5 4.3-12.7 1.5l-4.2-4.3c-1.5-1.4-2.2-2.1-4.3-1.4l-62.9-.7-5-.7c2.2-.7 1.5-2.8 1.5-5.7h-1.5v5.7m0 0-2.1.7h-17c-2.8 0-4.2 0-5.6 1.4l-38.2 36.8-4.9 2.1-105.4-.7h-17l-3.5-2.1-5-3.6c-3.5 2.2-2.8 4.3-.7 6.4 2.9 2.8 4.3 5.7 2.9 8.5q-2.2 6.3-8.5 4.2c-1.4 0-2.9-2.8-5-.7l-2.1 5-2.1 2.1-3.6-.7-.7-3.6c0-1.4 1.5-1.4 2.9-1.4 3.5-.7 5.6-2.8 5.6-5.6 0-2.9.7-5-2.1-6.4-2.1-2.1-3.5-3.5-7.1-4.2-2.8 0-4.9-.7-7.7 2.1l-2.2.7-19.1-.7h-15.5l-4.3 1.4-23.3 21.9c-1.4 1.4-2.1 2.1-1.4 4.3.7 4.9-2.8 7-7.8 6.3l-2.8 1.4-6.4 6.4c-2.1 2.1-3.5 2.1-4.9 2.1l-13.5.7 1.5-8.4m51.6-78.5h2.8l10.6.7 5 2.1 18.3 17c2.2 2.1 3.6 2.1 5.7 0 1.4-1.5 0-2.9-1.4-2.9l-21.9-21.9-2.2-.7c-6.3-.7-12.7-1.4-16.9 5.7zm351.4 4.9c1.4 2.8 4.2 4.3 7.1 2.8l1.4-1.4-1.4-1.4zM260.1 70.3l1.4 2.8h2.9l-.7-2.1zM76.9 20.1v2.8h2.8v-2.8zm350.8 12.7-3.6.7v2.9l2.2-.7c1.4 0 1.4-1.4 1.4-2.9zM199.3 70.3l.7 2.1 3.5.7v-1.4zM441.1 35l3.6-.7v-2.9h-2.9zm-7.7-2.1c-3.6.7-3.6.7-2.9 2.8 2.2.8 2.9 0 2.9-2.8zm-24.8 3.6h1.4c.7-2.2.7-5-1.4-5.7zM89.7 122.1H67.1l-5 2.1-21.9 20.5c-1.4 1.4-2.8 2.8-2.1 4.9q-1.1 7.5-8.5 8.5c-4.9.7-9.9-2.8-11.3-7.1-.7-3.5 1.4-8.4 4.9-10.6h5.7c2.1.7 3.5-.7 4.2-1.4l25.5-24 4.2-1.4 17.7-.7v1.4l.7 6.3h1.4l-1.4-7 3.6.7v7.1h1.4l.7-7.8h2.8v8.5c.7.7 0 0 0 0z" style="fill:#181d2e"/>
          />
        </mask>
      </defs>
    </svg>
    <div
      class="relative overflow-hidden"
      style="width: 469px; height: 145px; mask: url(#myMask) ; -webkit-mask: url(#myMask) ;"
    >
      <div
        ref="maskedDiv"
        class="bg-cyan-200 blur-lg rounded backdrop-blur left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style="width: 60px; height: 60px; transform-origin: center;"
      >
      </div>
    </div>
      
    </div>
  <!-- Other SVGs go here -->

    <h2 ref="textRef" id="loading-text" class="w-full text-xl text-nowrap text-center absolute -bottom-10 text-cyan-600">Loading...</h2>

  </div>
</template>



<style scoped>
.loader-animation-container {
  @apply opacity-100 h-screen flex justify-center items-center;
}
</style>
