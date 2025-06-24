<script>
export default {
  data() {
    return {
      currentYear: null
    };
  },
  mounted() {
    // Get the current year and assign it to the 'currentYear' data property
    this.currentYear = new Date().getFullYear();
  }
};
</script>

<template>
    <div class="w-full text-center bg-gray-900 text-slate-300 font-normal py-4 text-xs relative z-30">
        <p>&copy; All rights reserved {{ currentYear }} shaunmacdougall.com</p>
    </div>
</template>