<script setup>
import { ref, computed } from "vue";
import apolloClient, { isLocal } from "../utilities/apolloClient";
import { gql } from "@apollo/client/core";
import { BriefcaseIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import ImageLoader from "../utilities/ImageLoader.vue";
import CircuitSvgs from "./CircuitSvgs.vue";

const homeBanner = ref({});
const content = ref("");
const imgSrc = ref("");

const liveBannerQuery = gql`
 query liveBannerQuery {
  pages(where: { id: 487 }) {
   nodes {
    title(format: RENDERED)
    id
    content(format: RENDERED)
    featuredImage {
     node {
      title(format: RAW)
      description(format: RAW)
      sourceUrl(size: LARGE)
      mediaDetails {
       height
       width
      }
     }
    }
   }
  }
 }
`;

const testBannerQuery = gql`
 query testBannerQuery {
  pages(where: { id: 457 }) {
   nodes {
    title(format: RENDERED)
    id
    content(format: RENDERED)
    featuredImage {
     node {
      sourceUrl(size: LARGE)
      mediaDetails {
       width
       height
      }
      title
      description
     }
    }
   }
  }
 }
`;

apolloClient
 .query({ query: isLocal ? testBannerQuery : liveBannerQuery })
 .then((result) => {
  homeBanner.value = result.data.pages.nodes[0];
  content.value = homeBanner.value.content;
  imgSrc.value = isLocal
   ? homeBanner.value.featuredImage.node.sourceUrl
   : homeBanner.value.featuredImage.node.sourceUrl;
 });

const startMaskY = 329; // Y position where masking starts
const endMaskY = 379;   // Y position where image is fully masked

// Reactive variable for clip-path percentage
const maskPercentage = computed(() => {
  // Calculate how far the user has scrolled within the mask range
  const progress = Math.min(Math.max((y.value - startMaskY) / (endMaskY - startMaskY), 0), 1);
  // Convert progress to a percentage for clip-path (100% = fully visible, 0% = fully masked)
  return 100 - progress * 100;
});
</script>

<template>
 <div class="banner-content z-40 mt-24 flex w-full flex-col justify-end">
  <div
   class="mx-6 mt-5 max-w-[952px] rounded-xl border-t-2 border-slate-200/10 p-6 backdrop-blur backdrop-brightness-200 sm:mt-0 lg:mx-auto dark:bg-slate-900/70"
  >
   <CircuitSvgs />

   <div class="rounded-md bg-[#111729] p-6 sm:ml-[15vw] md:ml-[20vw] xl:ml-28">
    <div
     class="relative text-gray-200 lg:min-h-44 lg:max-w-full"
     v-html="content"
    ></div>

    <div
     class="relative mt-6 flex flex-wrap items-center justify-end sm:gap-x-2 md:gap-x-4"
    >
     <a href="/#case-studies" class="secondary-btn">
      <span class="px-1">Learn more</span
      ><ChevronRightIcon
       class="hidden h-2 w-2 md:block md:h-4 md:w-4"
       aria-hidden="true"
      />
     </a>

     <a href="/#connect" class="primary-btn sm:mr-2 md:mr-4 md:px-6 lg:mr-6">
      <BriefcaseIcon
       class="hidden h-2 w-2 md:block md:h-4 md:w-4"
       aria-hidden="true"
      />
      <span class="md:pl-2">Hire me</span>
     </a>
    </div>
   </div>
  </div>
 </div>
 <!--banner-content-->

 <ImageLoader :imageUrl="imgSrc" :imageStyles="imageStyle" />
 
</template>

<style>
.banner-content .circuit-svgs #cont-1,
.banner-content .circuit-svgs #cont-2,
.banner-content .circuit-svgs #cont-3,
.banner-content .circuit-svgs #cont-4 {
  width: 100%;
  position: absolute;
}

.banner-content .circuit-svgs #cont-1 {
  height: 45%;
  top: -2.5rem;
  left: -10.5rem;
}

.banner-content .circuit-svgs #cont-2 {
  height: 100%;
  top: 211px;
  right: -147px;
  transform: scale(2);
}

.banner-content .circuit-svgs #cont-3 {
  height: 100%;
  bottom: -133px;
  left: -94px;
  transform: scale(2) rotateZ(45deg);
}

.banner-content .circuit-svgs #cont-4 {
  height: 100%;
  bottom: -23px;
  left: -330px;
  transform: scale(1.25) rotateZ(45deg);
}

.banner-content .circuit-svgs .circuit-svg {
  fill: #0f172a;
  width: 100%;
}

.banner-content h1.title {
  @apply text-3xl md:text-4xl lg:text-5xl xl:text-6xl;
}

.banner-content h1.title + h2 {
  @apply text-sm mt-4 md:text-base lg:text-lg xl:text-xl;
}

.image-container-image {
  position: absolute;
  bottom: 0;
  left: 0;
  max-height: calc(100vh - (72px + 1.5rem));
}

@keyframes clip-anim {
	from {
		transform: translateX(0%);
   }
	to {
		transform: translateX(-50%);
   }
}


@keyframes color-anim {
    from {
        transform: translateX(0%);
   }
    to {
        transform: translateX(50%);
   }
}
</style>