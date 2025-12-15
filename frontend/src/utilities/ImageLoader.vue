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
const lighting_1 = ref(null);


const onImageLoad = () => {

  loading.value = false;  // Hide the loading indicator after 5 minutes

  gsap.fromTo(lighting_1.value,
    {
      opacity: 0
    },
    {
      opacity: 0.8,
      duration: 1,
      delay: 0.5
    }
  );

  gsap.to(loaderContainer.value, 
    {
      height: '70vh',
      duration: 0.7,
      ease: 'circ.out',
      delay: 16
    }
  );

  gsap.to(imageContainer.value, {
    duration:0.4,
    opacity: 1,
    bottom: 0,
    ease: 'expo.out',
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
    
      <div ref="highLight" id="shaun-highlight"></div>

      <div ref="lighting_1" id="lighting_1" ></div>
      
      <img 
        :src="imageUrl" 
        @load="onImageLoad" 
        @error="onImageError" 
        alt="An image"
        class="image-container-image"
      />
      
    </div>
    
  </div>
</template>

<style>
#lighting_1 {
  background-image: url("http://shaunmac.local/wp-content/uploads/2025/12/lighting_1.png");
  width: calc(386px / 2);
  height: calc(1004px / 2);
  background-size: contain;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

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
  background-image: url(http://shaunmacdougall.com/wp-content/uploads/2025/09/shaun_highlight.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom center;
  left: calc(50% - 13px);
  bottom: -92px;
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