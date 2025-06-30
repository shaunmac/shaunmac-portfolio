<script setup>
import { ref, computed } from "vue";
import { useWindowScroll } from '@vueuse/core';
import apolloClient, { isLocal } from '../utilities/apolloClient';
import { gql } from "@apollo/client/core";
import { BriefcaseIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import ImageLoader from "../utilities/ImageLoader.vue";
import ShadowEl from "../utilities/ShadowEl.vue";
import CircuitSvgs from "./CircuitSvgs.vue";

const { y } = useWindowScroll();
const homeBanner = ref({});
const content = ref("");
const imgDim = ref({});
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
    pages(where: {id: 457}) {
      nodes {
        title(format: RENDERED)
        id
        content(format: RENDERED)
        imageFeatured {
          featuredImage {
            sourceUrl
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

apolloClient.query({ query: isLocal ? testBannerQuery : liveBannerQuery }).then((result) => {
  homeBanner.value = result.data.pages.nodes[0];
  content.value = homeBanner.value.content;
  imgSrc.value = isLocal ? homeBanner.value.imageFeatured.featuredImage.sourceUrl : homeBanner.value.featuredImage.node.sourceUrl;
  imgDim.value = isLocal ? homeBanner.value.imageFeatured.featuredImage.mediaDetails : homeBanner.value.featuredImage.node.mediaDetails;
});

// Define the scroll thresholds
const startMaskY = 329; // Y position where masking starts
const endMaskY = 379;   // Y position where image is fully masked

// Reactive variable for clip-path percentage
const maskPercentage = computed(() => {
  // Calculate how far the user has scrolled within the mask range
  const progress = Math.min(Math.max((y.value - startMaskY) / (endMaskY - startMaskY), 0), 1);
  // Convert progress to a percentage for clip-path (100% = fully visible, 0% = fully masked)
  return 100 - progress * 100;
});

// Dynamic style for the ImageLoader
const imageStyle = computed(() => ({
  clipPath: `inset(0 ${100 - maskPercentage.value}% 0 0)`,
}));

</script>

<template>

  <div class="relative z-10 placeholder-cyan-100 h-screen mt-16 w-screen overflow-hidden">
      <main class="main">
          <div class="w-screen overflow-hidden h-screen">

              <ShadowEl class="shadow-el-2 z-20 fixed top-0 right-0" :color="'#4d4e58'" />

              <div class="rail fixed w-full h-screen top-0 left-0 z-0">
                <div class="rail_container ">
                  <div class="rail_clip" :style="{ transform: `translate(${y * 3 * -1}px)` }">
                    <div class="rail_color" :style="{ transform: `translate(${y * 3}px)` }">
                      <div class="rail_gradients">

                      <!-- /* Blurred images go here */ -->
                        <img
                        src="../assets/gradient-core.png"
                        width="50"
                        height="50"
                        alt="Core Gradient"
                        class="rail_gradient -core"
                        />

                        <img
                        src="../assets/gradient-pro.png"
                        width="50"
                        height="50"
                        alt="Pro Gradient"
                        class="rail_gradient -pro"
                        />

                      </div>
                    </div>
                  </div>

                  <!-- /* Rail sizing used for precise aspect ratio */ -->
                  <svg
                  width="1137"
                  height="46"
                  viewBox="0 0 1137 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="rail_sizing"
                  ></svg>

                  <!-- /* SVG Mask */ -->
                  <svg class="rail_mask">
                  <clipPath id="contentTitle" clipPathUnits="objectBoundingBox">
                    <path
                    d="M0.047,0.025 L0.041,0.975 H0.028 L0.024,0.271 L0.019,0.975 H0.006 L0,0.025 H0.01 L0.014,0.788 L0.018,0.025 H0.029 L0.034,0.788 L0.037,0.025 H0.047 M0.076,0.025 L0.074,0.204 H0.061 V0.406 H0.073 V0.58 H0.061 V0.796 H0.075 V0.975 H0.051 V0.025 H0.076 M0.102,0.472 C0.105,0.485,0.107,0.508,0.108,0.542 C0.11,0.575,0.111,0.627,0.111,0.696 C0.111,0.799,0.109,0.872,0.106,0.914 C0.103,0.955,0.099,0.975,0.093,0.975 H0.08 V0.025 H0.092 C0.097,0.025,0.102,0.044,0.105,0.082 C0.108,0.119,0.109,0.182,0.109,0.269 C0.109,0.325,0.109,0.37,0.107,0.404 C0.106,0.436,0.104,0.459,0.102,0.472 M0.091,0.201 V0.399 H0.093 C0.095,0.399,0.096,0.391,0.097,0.375 C0.098,0.358,0.099,0.332,0.099,0.295 C0.099,0.262,0.098,0.238,0.097,0.223 C0.096,0.208,0.095,0.201,0.093,0.201 H0.091 M0.093,0.795 C0.096,0.795,0.097,0.787,0.098,0.772 C0.1,0.755,0.1,0.725,0.1,0.681 C0.1,0.639,0.1,0.609,0.099,0.591 C0.097,0.572,0.096,0.562,0.094,0.562 H0.091 V0.795 H0.093 M0.14,0.025 C0.146,0.025,0.151,0.059,0.154,0.127 C0.158,0.195,0.16,0.318,0.16,0.497 C0.16,0.816,0.154,0.975,0.14,0.975 H0.128 V0.025 H0.14 M0.138,0.205 V0.795 H0.141 C0.144,0.795,0.146,0.773,0.147,0.729 C0.149,0.685,0.149,0.608,0.149,0.497 C0.149,0.42,0.149,0.361,0.148,0.319 C0.148,0.276,0.147,0.246,0.146,0.23 C0.144,0.213,0.143,0.205,0.141,0.205 H0.138 M0.189,0.025 L0.188,0.204 H0.175 V0.406 H0.187 V0.58 H0.175 V0.796 H0.189 V0.975 H0.165 V0.025 H0.189 M0.225,0.025 L0.214,0.975 H0.201 L0.19,0.025 H0.201 L0.208,0.791 L0.214,0.025 H0.225 M0.251,0.025 L0.25,0.204 H0.237 V0.406 H0.249 V0.58 H0.237 V0.796 H0.251 V0.975 H0.226 V0.025 H0.251 M0.266,0.025 V0.778 H0.281 L0.28,0.975 H0.256 V0.025 H0.266 M0.299,0 C0.305,0,0.309,0.044,0.312,0.131 C0.315,0.219,0.317,0.342,0.317,0.499 C0.317,0.602,0.316,0.692,0.315,0.767 C0.314,0.842,0.311,0.9,0.309,0.94 C0.306,0.98,0.303,1,0.299,1 C0.293,1,0.289,0.956,0.286,0.869 C0.283,0.781,0.281,0.658,0.281,0.499 C0.281,0.396,0.282,0.307,0.283,0.233 C0.285,0.158,0.287,0.1,0.289,0.06 C0.292,0.02,0.295,0,0.299,0 M0.299,0.182 C0.297,0.182,0.295,0.207,0.294,0.256 C0.293,0.305,0.292,0.386,0.292,0.499 C0.292,0.612,0.293,0.694,0.294,0.744 C0.295,0.793,0.297,0.818,0.299,0.818 C0.302,0.818,0.303,0.793,0.304,0.744 C0.306,0.695,0.306,0.613,0.306,0.499 C0.306,0.386,0.306,0.305,0.304,0.256 C0.303,0.207,0.302,0.182,0.299,0.182 M0.335,0.025 C0.34,0.025,0.344,0.052,0.347,0.105 C0.35,0.158,0.352,0.236,0.352,0.339 C0.352,0.447,0.35,0.529,0.347,0.585 C0.345,0.641,0.341,0.669,0.336,0.669 H0.332 V0.975 H0.322 V0.025 H0.335 M0.335,0.488 C0.337,0.488,0.338,0.477,0.339,0.453 C0.34,0.429,0.341,0.392,0.341,0.341 C0.341,0.249,0.339,0.202,0.335,0.202 H0.332 V0.488 H0.335 M0.394,0.975 H0.384 L0.383,0.621 L0.383,0.562 C0.383,0.508,0.383,0.466,0.383,0.438 C0.383,0.369,0.383,0.301,0.383,0.233 L0.378,0.877 H0.368 L0.362,0.233 C0.363,0.339,0.363,0.433,0.363,0.514 C0.363,0.561,0.363,0.596,0.363,0.621 L0.362,0.975 H0.352 L0.355,0.025 H0.368 L0.373,0.655 L0.378,0.025 H0.391 L0.394,0.975 M0.423,0.025 L0.422,0.204 H0.409 V0.406 H0.42 V0.58 H0.409 V0.796 H0.423 V0.975 H0.398 V0.025 H0.423 M0.459,0.975 H0.446 L0.436,0.26 L0.436,0.289 C0.436,0.352,0.437,0.411,0.437,0.466 C0.437,0.521,0.437,0.584,0.437,0.654 V0.975 H0.428 V0.025 H0.441 L0.451,0.743 C0.45,0.674,0.45,0.613,0.45,0.558 C0.45,0.503,0.449,0.44,0.449,0.369 V0.025 H0.459 V0.975 M0.493,0.025 L0.492,0.218 H0.482 V0.975 H0.472 V0.218 H0.462 V0.025 H0.493 M0.555,0.025 L0.549,0.975 H0.535 L0.531,0.271 L0.526,0.975 H0.513 L0.507,0.025 H0.518 L0.521,0.788 L0.526,0.025 H0.537 L0.541,0.788 L0.545,0.025 H0.555 M0.583,0.025 L0.582,0.204 H0.569 V0.406 H0.58 V0.58 H0.569 V0.796 H0.583 V0.975 H0.558 V0.025 H0.583 M0.609,0.472 C0.612,0.485,0.614,0.508,0.616,0.542 C0.617,0.575,0.618,0.627,0.618,0.696 C0.618,0.799,0.617,0.872,0.614,0.914 C0.611,0.955,0.606,0.975,0.601,0.975 H0.588 V0.025 H0.599 C0.605,0.025,0.609,0.044,0.612,0.082 C0.615,0.119,0.617,0.182,0.617,0.269 C0.617,0.325,0.616,0.37,0.615,0.404 C0.613,0.436,0.611,0.459,0.609,0.472 M0.598,0.201 V0.399 H0.601 C0.603,0.399,0.604,0.391,0.605,0.375 C0.606,0.358,0.606,0.332,0.606,0.295 C0.606,0.262,0.606,0.238,0.605,0.223 C0.604,0.208,0.602,0.201,0.6,0.201 H0.598 M0.601,0.795 C0.603,0.795,0.605,0.787,0.606,0.772 C0.607,0.755,0.607,0.725,0.607,0.681 C0.607,0.639,0.607,0.609,0.606,0.591 C0.605,0.572,0.603,0.562,0.601,0.562 H0.598 V0.795 H0.601 M0.647,0.025 C0.653,0.025,0.658,0.059,0.662,0.127 C0.666,0.195,0.667,0.318,0.667,0.497 C0.667,0.816,0.661,0.975,0.648,0.975 H0.635 V0.025 H0.647 M0.646,0.205 V0.795 H0.648 C0.651,0.795,0.653,0.773,0.655,0.729 C0.656,0.685,0.657,0.608,0.657,0.497 C0.657,0.42,0.656,0.361,0.656,0.319 C0.655,0.276,0.654,0.246,0.653,0.23 C0.652,0.213,0.65,0.205,0.648,0.205 H0.646 M0.697,0.025 L0.696,0.204 H0.682 V0.406 H0.694 V0.58 H0.682 V0.796 H0.697 V0.975 H0.672 V0.025 H0.697 M0.732,0.025 L0.722,0.975 H0.708 L0.697,0.025 H0.708 L0.715,0.791 L0.721,0.025 H0.732 M0.759,0.025 L0.758,0.204 H0.744 V0.406 H0.756 V0.58 H0.744 V0.796 H0.759 V0.975 H0.734 V0.025 H0.759 M0.774,0.025 V0.778 H0.789 L0.788,0.975 H0.763 V0.025 H0.774 M0.806,0 C0.812,0,0.817,0.044,0.82,0.131 C0.823,0.219,0.824,0.342,0.824,0.499 C0.824,0.602,0.824,0.692,0.822,0.767 C0.821,0.842,0.819,0.9,0.816,0.94 C0.813,0.98,0.81,1,0.806,1 C0.801,1,0.796,0.956,0.793,0.869 C0.79,0.781,0.789,0.658,0.789,0.499 C0.789,0.396,0.789,0.307,0.791,0.233 C0.792,0.158,0.794,0.1,0.797,0.06 C0.799,0.02,0.803,0,0.806,0 M0.806,0.182 C0.804,0.182,0.802,0.207,0.801,0.256 C0.8,0.305,0.799,0.386,0.799,0.499 C0.799,0.612,0.8,0.694,0.801,0.744 C0.802,0.793,0.804,0.818,0.806,0.818 C0.809,0.818,0.811,0.793,0.812,0.744 C0.813,0.695,0.814,0.613,0.814,0.499 C0.814,0.386,0.813,0.305,0.812,0.256 C0.811,0.207,0.809,0.182,0.806,0.182 M0.842,0.025 C0.848,0.025,0.852,0.052,0.855,0.105 C0.857,0.158,0.859,0.236,0.859,0.339 C0.859,0.447,0.858,0.529,0.855,0.585 C0.852,0.641,0.848,0.669,0.843,0.669 H0.839 V0.975 H0.829 V0.025 H0.842 M0.842,0.488 C0.844,0.488,0.846,0.477,0.847,0.453 C0.848,0.429,0.848,0.392,0.848,0.341 C0.848,0.249,0.846,0.202,0.842,0.202 H0.839 V0.488 H0.842 M0.901,0.975 H0.891 L0.891,0.621 L0.891,0.562 C0.89,0.508,0.89,0.466,0.89,0.438 C0.89,0.369,0.891,0.301,0.891,0.233 L0.885,0.877 H0.876 L0.87,0.233 C0.87,0.339,0.87,0.433,0.87,0.514 C0.87,0.561,0.87,0.596,0.87,0.621 L0.87,0.975 H0.86 L0.862,0.025 H0.875 L0.881,0.655 L0.885,0.025 H0.898 L0.901,0.975 M0.931,0.025 L0.929,0.204 H0.916 V0.406 H0.928 V0.58 H0.916 V0.796 H0.93 V0.975 H0.906 V0.025 H0.931 M0.966,0.975 H0.953 L0.943,0.26 L0.943,0.289 C0.944,0.352,0.944,0.411,0.944,0.466 C0.944,0.521,0.944,0.584,0.944,0.654 V0.975 H0.935 V0.025 H0.948 L0.958,0.743 C0.958,0.674,0.957,0.613,0.957,0.558 C0.957,0.503,0.957,0.44,0.957,0.369 V0.025 H0.966 V0.975 M1,0.025 L0.999,0.218 H0.99 V0.975 H0.979 V0.218 H0.97 V0.025 H1"
                    ></path>
                  </clipPath>
                  </svg>

                </div>
              </div> <!--rail -->

              <div class="banner-wrap w-full h-screen flex flex-col md:flex-row z-50 relative">
                
                <div class="banner-content w-full flex flex-col justify-end z-40 sm:absolute md:right-0 sm:bottom-12">

                  <div class="mx-6 mt-5 sm:mt-0 max-w-[952px] lg:mx-auto p-6 rounded-xl backdrop-blur backdrop-brightness-200 dark:bg-slate-900/70 border-t-2 border-slate-200/10">
                    
                    <CircuitSvgs />

                    <div class="bg-[#111729] sm:ml-[15vw] md:ml-[20vw] rounded-md p-6">
                      <div
                        class="text-gray-200 relative lg:min-h-44 lg:max-w-full"
                        v-html="content"
                      ></div>

                      <div class="justify-end flex items-center sm:gap-x-2 md:gap-x-4 mt-6 relative flex-wrap">
                        
                        <a
                          href="/#case-studies"
                          class="secondary-btn"
                          >
                            <span class="px-1">Learn more</span><ChevronRightIcon class="w-2 h-2 md:h-4 md:w-4 hidden md:block" aria-hidden="true" />
                        </a>

                        <a
                          href="/#connect"
                          class="primary-btn sm:mr-2 md:mr-4 lg:mr-6 md:px-6"
                          >
                            <BriefcaseIcon class="w-2 h-2 md:h-4 md:w-4 hidden md:block" aria-hidden="true" />
                            <span class="md:pl-2">Hire me</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div> <!--banner-content-->

                <ImageLoader 
                    class="profile-img z-50 w-[100%] max-w-[300px] md:max-w-[400px] lg:max-w-[550px] lg:ml-[8vw] xl:ml-[8vw] min-h-full h-auto bottom-0 md:bottom-1/2 md:translate-y-1/2 -left-12 md:-left-16 fixed transition-all"
                    :imageUrl="imgSrc"
                    :style="imageStyle"
                />

              </div> <!--banner-wrap-->
            
          </div>

      </main>
    </div>
</template>

<style>

.rail_gradient.-pro {
  position: absolute;
  top: 40vh;
  left: 40vw;
  transform: translate(-50%, -50%) scale(9);
}

.rail_gradient.-core {
  position: absolute;
  top: 60vh;
  left: 60vw;
  transform: translate(-50%, -50%) scale(9);
}

.main .container {
  min-height: 690px;
}

.shadow-el-2 {
  top: 0;
}

.rail_clip {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2338vh;
    top: 50px;
    height: 95vh;
    -webkit-clip-path: url("#contentTitle");
    clip-path: url("#contentTitle");
    /* animation: clip-anim 20s linear infinite; */
}

.rail_sizing {
	position: relative;
	opacity: 0;
	height: auto;
	width: 200vw;
}

.rail_color {
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	background-color: #181d2e;
	/* animation: color-anim 20s linear infinite; */
}

.circuit-svgs #cont-1 {
  width: 100%;
  height: 45%;
  position: absolute;
  top: -2.5rem;
  left: -10.5rem;
}

.circuit-svgs #cont-1 .circuit-svg {
  fill: #0f172a;
  width: 100%;
  height: 144px;
}

.banner-content h1.title {
  @apply text-3xl md:text-4xl;
}

.banner-content h1.title + h2 {
  @apply text-sm mt-4 md:text-base;
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

@media (min-width: 768px) {

}

@media (min-width: 1024px) {
}

</style>