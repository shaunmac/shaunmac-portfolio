<script setup>
import { ref } from 'vue';
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

const onImageLoad = () => {
  //loading.value = false;  // Hide the loading indicator after 5 minutes

  // gsap.to( loaderContainer.value, {
  //   height: '70vh',
  //   duration: 0.7,
  //   ease: 'elastic.out'
  // });
}

const onImageError = (event) => {
  console.error('image src:' + event.target.src );
}

</script>
<template>
  <div class="w-full z-30 block">

    <div ref="loaderContainer" class="h-screen relative" style="height: 100vh;">
      <loader-animation v-if="loading" ></loader-animation>
    </div>

    <img 
      :src="imageUrl" 
      @load="onImageLoad" 
      @error="onImageError" 
      alt="An image"
      :class="['image-container-image', { 'opacity-0': loading }]"
      :style="imageStyles"
    />
    
  </div>
</template>



<style scoped>

.image-container-image {
  @apply block fixed bottom-0 left-0;
}

</style>
