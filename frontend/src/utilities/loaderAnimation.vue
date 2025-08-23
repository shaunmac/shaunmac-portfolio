<script setup>
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { onMounted, ref } from 'vue';
import { isLocal } from '../utilities/apolloClient';

const envUrl = isLocal ? 'http://shaunmac.local/wp-content/themes/shaunmacdougall2025/frontend' : 'https://shaunmacdougall.com/wp-content/themes/shaunmacdougall2025/frontend';


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
    { scale: 1, xPercent:  -100},
    { scale: 3.5, duration: 2, repeat: -1, yoyo: false, ease: 'power1.inOut', xPercent:  150}
  );

});
</script>   
<template>
  <div class="loader-animation-container w-full h-full relative">

    <!-- SVGs go here -->
    <div ref="shapeContainer" class="w-full h-full absolute left-0 flex justify-center items-center">

      <div class="relative overflow-hidden mx-6"
        style="margin: 0 auto; max-width: 469px; width: 100%; height: 145px;"
        :style="'mask: url(' + envUrl + '/src/assets/circuit/001-01.svg); ' + envUrl + '-webkit-mask: url(/src/assets/circuit/001-01.svg);'"
      >
        <div ref="maskedDiv"
          class="bg-cyan-400 blur-lg rounded backdrop-blur left-0 top-1/2 -translate-y-1/2 absolute"
          style="width: 60px; height: 60px;"
        >
        </div>
      </div>
      
    </div>
  <!-- Other SVGs go here -->

    <h2 ref="textRef" id="loading-text" class="w-full text-xl text-nowrap text-center absolute bottom-[calc(50%+25px)] left-1/4 text-cyan-300">Loading...</h2>

  </div>
</template>



<style scoped>
.loader-animation-container {
  @apply opacity-100 h-screen flex justify-center items-center;
}
</style>
