<script setup>
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { onMounted, ref } from 'vue';
import { isLocal } from '../utilities/apolloClient';

const envUrl = isLocal ? 'http://shaunmac.local/wp-content/themes/shaunmacdougall2025/frontend' : 'https://shaunmacdougall.com/wp-content/themes/shaunmacdougall2025/frontend';


gsap.registerPlugin(SplitText);

let circuitTL;
let textTL;
const maskedDiv = ref(null);
const shapeContainer = ref(null);

const textRef = ref(null);

onMounted(() => {

  const split = new SplitText(textRef.value, { type: 'chars,words' });

  textTL = gsap.timeline({ repeat: -1 }); // Create a paused timeline
  
  textTL.fromTo(
    split.chars,
    {
      opacity: 0, 
      y: 0,
    },
    { 
      opacity: 1,
      y: -20,
      stagger: 0.03,
      ease: 'power2.out',
      duration: 0.75,
      repeatDelay: 0.25
    }
  );

  circuitTL = gsap.timeline({ repeat: -1 }); // Create a paused timeline

  circuitTL.to(
    maskedDiv.value,
    { scale: 3.5, repeat: -1, yoyo: false, ease: 'power2.Out', xPercent:  -500, duration: 1, delay: 0.75}
  );

});
</script>   
<template>
  <div class="loader-animation-container w-full h-full relative flex flex-col justify-center">

    <!-- SVGs go here -->
    <div ref="shapeContainer" class="w-[calc(100%-9rem)] h-auto -top-16 left-28 flex justify-start items-center">

      <div class="relative overflow-hidden mask-circuit"
        style="margin: 0 auto; max-width: 469px; width: 100%; height: 158px; transform: rotateZ(180deg);"
        :style="'mask: url(' + envUrl + '/src/assets/circuit/001-01.svg); ' + envUrl + '-webkit-mask: url(/src/assets/circuit/001-01.svg);'"
      >
        <div ref="maskedDiv"
          class="bg-cyan-400 blur-lg rounded backdrop-blur right-0 top-1/2 -translate-y-1/2 absolute"
          style="width: 60px; height: 60px;"
        >
        </div>
      </div>
      
    </div>
    <!-- Other SVGs go here -->

    <h2 ref="textRef" id="loading-text" class="w-full text-sm text-nowrap absolute bottom-[calc(50%+25px)] left-0 md:left-[25vw] text-cyan-300">Loading...</h2>

  </div>
</template>

<style scoped>
.loader-animation-container {
  @apply opacity-100 h-screen flex justify-center items-center;
}

.mask-circuit {
  mask-size: contain; 
  -webkit-mask-size: contain;
}
</style>
