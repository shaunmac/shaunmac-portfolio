<script setup>
import { ref, computed } from "vue";
import ApolloClient, { isLocal } from "../utilities/ApolloClient";
import { gql } from "@apollo/client/core";
import { BriefcaseIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import ImageLoader from "../utilities/ImageLoader.vue";
const homeBanner = ref({});
const content = ref("");
const imgSrc = ref("");
import { useWindowScroll } from '@vueuse/core';
                                                            
const envUrl = isLocal ? 'http://shaunmac.local/wp-content/uploads/2024/01/' : 'https://shaunmacdougall.com/wp-content/uploads/2024/07/';

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
  pages(where: {id: 852}) {
    nodes {
      title(format: RENDERED)
      id
      content(format: RENDERED)
      imageFeatured {
        featuredImage {
          node {
            sourceUrl(size: LARGE)
            title
            mediaDetails {
              width
              height
            }
            description
          }
        }
      }
    }
  }
 }
`;

ApolloClient
 .query({ query: isLocal ? testBannerQuery : liveBannerQuery })
 .then((result) => {
  homeBanner.value = result.data.pages.nodes[0];
  content.value = homeBanner.value.content;
  imgSrc.value = isLocal
   ? homeBanner.value.imageFeatured.featuredImage.node.sourceUrl
   : homeBanner.value.featuredImage.node.sourceUrl;
 });

const startMaskY = 329; // Y position where masking starts
const endMaskY = 379;   // Y position where image is fully masked

const { y } = useWindowScroll();

// Reactive variable for clip-path percentage
const maskPercentage = computed(() => {
  // Calculate how far the user has scrolled within the mask range
  const progress = Math.min(Math.max((y.value - startMaskY) / (endMaskY - startMaskY), 0), 1);
  // Convert progress to a percentage for clip-path (100% = fully visible, 0% = fully masked)
  return 100 - progress * 100;
});

// Dynamic style for the ImageLoader
const imageStyle = computed(() => ({
  clipPath: `inset(0 ${100 - maskPercentage.value}% 0 0)`
}));


</script>

<template>

<div id="hero" class="flex-col-reverse flex w-full h-[cacl(100vh+315px)] relative z-0">
  <div class="banner-content z-40 flex w-full flex-col justify-end items-center">
    <div class="mx-6 mt-5 max-w-[639px] rounded-xl border-t-2 border-slate-200/10 p-6 backdrop-blur backdrop-brightness-200 sm:mt-0 lg:mx-auto dark:bg-slate-900/70 relative">
      <div class="rounded-md bg-[#111729] p-6 z-10 relative">
        <div class="relative text-gray-200 lg:min-h-44 lg:max-w-full" v-html="content"></div>
        <div class="relative mt-6 flex flex-wrap items-center justify-end gap-x-2 md:gap-x-4">
          <a href="/#case-studies" class="secondary-btn w-full md:w-auto mb-4 md:mb-0">
            <span class="px-1">Learn more</span>
            <ChevronRightIcon
              class="w-4 h-4"
              aria-hidden="true"
            />
          </a>
          <a href="/#quote-calculator" class="primary-btn w-full md:w-auto md:px-6">
            <BriefcaseIcon
              class="h-4 w-4"
              aria-hidden="true"
            />
            <span class="pl-2">Free Quote</span>
          </a>
        </div>
      </div>

      <div class="overflow-hidden w-full h-full absolute top-0 left-0 z-0">
        <img :src="envUrl + 'circuit-2.png'" class="w-[130%] top-1/2 -translate-y-1/2 block absolute left-1/2 -translate-x-1/2 z-0 max-w-[1819px]" alt="">
      </div>

    </div>

  </div>
  <!--banner-content-->

  <ImageLoader :imageUrl="imgSrc" :imageStyles="imageStyle" />

</div>
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
  font-size: 3rem;
  min-height: 3.5rem;
  line-height: 1;
}

.banner-content h1.title + h2 {
  @apply text-sm mt-4 md:text-base lg:text-lg xl:text-xl;
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