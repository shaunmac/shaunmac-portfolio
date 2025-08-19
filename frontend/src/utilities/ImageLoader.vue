<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';
import LoaderAnimation from './loaderAnimation.vue';

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
let loaderTL;

const onImageLoad = () => {
  //loading.value = false;  // Hide the loading indicator after 5 minutes

  // loaderTL = gsap.timeline();

  // loaderTL.to({
    
  // });
}

const onImageError = (event) => {
  console.error('image src:' + event.target.src );
}

</script>
<template>
  <div class="w-full z-30 h-screen block">

    <loader-animation v-if="loading" ></loader-animation>

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
