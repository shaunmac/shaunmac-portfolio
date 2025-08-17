<script setup>
import { ref } from 'vue';
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

const onImageLoad = () => {
  loading.value = false;  // Hide the loading indicator after 5 minutes
}

const onImageError = (event) => {
  console.error('image src:' + event.target.src );
}

</script>
<template>
  <div class="fixed bottom-1/2 w-full z-60 z-50">

    <loader-animation v-if="loading" :styles="{ opacity: 1 }"></loader-animation>

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
  display: block;
}

</style>
