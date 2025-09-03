<script setup>
import { ref, computed } from 'vue';
import { gsap } from 'gsap';
import LoaderAnimation from './loaderAnimation.vue';
import { CSSPlugin } from 'gsap/CSSPlugin';

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

const flicker = computed(() => {
  gsap.to(highLight.value, {
    opacity: Math.random() * 1 + 0.3, // Random opacity between 0 and 1
    duration: 0.05, // Random duration between 0.05s and 0.35s for flicker speed
    ease: "none", // No easing for abrupt changes
  });
  console.log('flicker')
});

flicker;

const onImageLoad = () => {
  loading.value = false;  // Hide the loading indicator after 5 minutes

  gsap.to( loaderContainer.value, 
    {
      height: '70vh',
      duration: 0.7,
      ease: 'circ.out',
      delay: 1
    }
  );

  gsap.to(imageContainer.value, {
    duration:0.4,
    opacity: 1,
    bottom: 0,
    ease: 'expo.out'
  });

  gsap.fromTo(highLight.value, 
    {
      y: '10px',
      opacity: 0,
      scale: 0.95
    },
    {
      y: 0,
      duration: 1,
      opacity: 1,
      scale: 1,
      ease: 'sine.inOut',
      delay: 0.4
    }
  );
};

const onImageError = (event) => {
  console.error('image src:' + event.target.src );
}

</script>
<template>
  <div class="w-full h-full z-30 block relative">

    <div ref="loaderContainer" class="relative w-[calc(100vw-1.5em)] mx-6" style="height: 100vh;">
      <loader-animation v-if="loading" ></loader-animation>
    </div>
    
    <div 
      ref="imageContainer" class="image-container w-full h-full" 
      style="bottom: -3em; opacity: 0;">
    
      <div ref="highLight" id="shaun-highlight" :style="imageStyles"></div>
      
      <img 
        :src="imageUrl" 
        @load="onImageLoad" 
        @error="onImageError" 
        alt="An image"
        class="image-container-image"
        :style="imageStyles"
      />
      
    </div>
    
  </div>
</template>

<style>
.image-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  max-height: calc(100vh - (72px + 1.5rem));
}

.image-container-image {
    max-width: 476px;
    max-height: 677px;
    width: 100%;
    height: auto;
    position: absolute;
    bottom: -60px;
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
  background-image: url(http://shaunmac.local/wp-content/uploads/2025/08/shaun_highlight.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom center;
  left: calc(50% + 3px);
  bottom: -50px;
  transform: translateX(-50%);
  filter: blur(14px);
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
    top: 0;
  }
}

</style>