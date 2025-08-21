<script setup>
import { defineProps } from 'vue';

const { link, linkLabel } = defineProps({
    link: String,
    linkLabel: String,
});

</script>
<template>
<a class="primary-btn" :href="link">{{ linkLabel }}</a>
</template>

<style>
    /* styles for this button are in src/index.css */
</style>