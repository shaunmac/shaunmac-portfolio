<script setup>
import { ref, computed } from 'vue';
import { gsap } from 'gsap';
import LoaderAnimation from './loaderAnimation.vue';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { isLocal } from './ApolloClient';

gsap.registerPlugin(CSSPlugin);

// Define the imageUrl prop from the parent
const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  imageStyles: {
    type: Object
  }
});

// Use the prop value directly for the img src
const loading = ref(true);
const loaderContainer = ref(null);
const imageContainer = ref(null);
const highLight = ref(null);
const lighting_1 = ref(null);
const shaunImage = ref(null);
const splash = ref(null);

const onImageLoad = () => {

  loading.value = false;  // Hide the loading indicator after 5 minutes

  gsap.set(loaderContainer.value, { height: '100vh' });
  gsap.set(imageContainer.value, { opacity: 1 });
  gsap.set(shaunImage.value, { opacity: 0 });
  gsap.set(highLight.value, { opacity: 0, y: '84px', x: '-50%', scale: 1.2, });
  gsap.set(lighting_1.value, { opacity: 0 });
  gsap.set(splash.value, { opacity: 0})

  const tl = gsap.timeline();

  // Multiple quick lightning flashes using the lighting overlay
  tl.to(lighting_1.value, { opacity: 1, duration: 0.07 })
    .to(lighting_1.value, { opacity: 0, duration: 0.12 })
    
    .to(lighting_1.value, { opacity: 1, duration: 0.09 })
    .to(lighting_1.value, { opacity: 0, duration: 0.15 })

    .to(highLight.value, {
      duration: 0.25,
      ease:"expo.out",
      y: "-93px",
    }, "-=0.30")

    .to(highLight.value, {
      duration: 0.25,
      opacity: 1,
      scale: 1,
    }, "-=0.25")

    .to(shaunImage.value, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
    }, "-=0.1")

    .to(splash.value, {
      opacity: 1,    
      duration: 0.01,
      delay: 0.1,
    }, "-=0.7")

    .to(loaderContainer.value, {
      height: '70vh',
      duration: 0.7,
      ease: 'circ.out'
    }, "-=0.85")
  ;
};

const onImageError = (event) => {
  console.error('image src:' + event.target.src );
}

</script>
<template>
  <div class="w-full h-full z-30 block relative">

    <div ref="loaderContainer" class="relative w-[calc(100vw-1.5em)] mx-6">
      <loader-animation v-if="loading" ></loader-animation>
    </div>
    
    <div 
      ref="imageContainer" class="image-container w-full h-full" 
      style="bottom: -3em;" :style="imageStyles">
    
      <div ref="highLight" id="shaun-highlight" style="opacity: 0;"></div>

      <div ref="lighting_1" id="lighting_1" ></div>
      
      <div ref="splash" id="splash" style="opacity: 0;"></div>

      <img
        ref="shaunImage"
        :src="imageUrl" 
        @load="onImageLoad" 
        @error="onImageError" 
        alt="An image"
        class="image-container-image"
        style="opacity: 0;"
      />
      
    </div>
    
  </div>
</template>

<style>
#lighting_1 {
  background-image: url("http://shaunmacdougall.com/wp-content/uploads/2025/12/lighting_1.png");
  width: calc(386px / 2);
  height: calc(1004px / 2);
  background-size: contain;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  top: 120px;
}

#splash {
  background-image: url("http://shaunmacdougall.com/wp-content/uploads/2025/12/splash.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  width: 100%;
  height: 100vh;
  min-width: 690px;
  min-height: 525px;
  max-width: 1346px;
  max-height: 1025px;
  display: block;
  position: absolute;
  left: 50%;
  bottom: -375px;
  transform: translateX(-50%) translateY(-60%);
}

.image-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  /* max-height: calc(100vh - (72px + 1.5rem)); */
}

.image-container-image {
    max-width: 476px;
    max-height: 677px;
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 9%;
    z-index: 100;
    left: 50%;
    transform: translateX(-50%);
}

#shaun-highlight {
  width: 122%; 
  max-width: 527px;
  height: 659px;
  display: block;
  position: fixed;
  background-image: url(http://shaunmacdougall.com/wp-content/uploads/2025/09/shaun_highlight.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom center;
  left: 50%;
  bottom: -107px;
  filter: blur(14px);
}

@media screen and (min-width:460px) {
   .image-container-image {
    bottom: 0;
  }
}

@media screen and (max-height:570px) {
  .image-container {
    width: 50% !important;
  }
}

@media screen and (max-height:670px) and (min-width:430px) {
  #shaun-highlight, 
  .image-container-image {
    bottom: unset;
  }
  .image-container-image {
    top: 33px;
  }
  #shaun-highlight {
    top: 70px;
  }
}

</style>