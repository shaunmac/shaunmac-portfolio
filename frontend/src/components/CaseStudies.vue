<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

import apolloClient, { isLocal } from '../utilities/apolloClient';

import {
  gql
} from "@apollo/client/core";

const envUrl = isLocal ? 'http://shaunmac.local/wp-content/uploads/2024/01/' : 'https://shaunmacdougall.com/wp-content/uploads/2024/07/';

const liveCaseStudiesQuery = gql`
  query liveCaseStudiesQuery {
    caseStudies {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
            mediaDetails {
              height
              width
            }
          }
        }
        caseStudyImages {
          externalUrl
          mobileImage {
            node {
              sourceUrl
            }
          }
          tabletImage {
            node {
              sourceUrl
            }
          }
        }
        content
        caseId
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const testCaseStudiesQuery = gql`
  query testCaseStudiesQuery {
    caseStudies {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        caseStudyImages {
          externalUrl
          mobileImage {
            node {
              sourceUrl
              title(format: RAW)
            }
          }
          tabletImage {
            node {
              title
              sourceUrl(size: MEDIUM)
            }
          }
        }
        content
        caseId
        tags {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

const caseStudies = ref({});
const isVisible = ref([]);
const isLoading = ref(true);

const fetchCaseStudies = async () => {
  try {
    const query = isLocal ? testCaseStudiesQuery : liveCaseStudiesQuery;
    const result = await apolloClient.query({ query });
    caseStudies.value = result.data.caseStudies.nodes;
    caseStudies.value.map(() => {
      isVisible.value.push(false);
    });
  } catch (error) {
    console.error('Error fetching case studies:', error);
  } finally {
    isLoading.value = false;
  }
};

// Tailwind breakpoints
const breakpoints = {
  xs: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536
};

// Reactive viewport size
const viewport = ref(getViewportSize());

// Function to get current viewport size
function getViewportSize() {

  const width = window.innerWidth;
  if (width < breakpoints.sm) return 'xs';
  else if (width < breakpoints.md) return 'sm';
  else if (width < breakpoints.lg) return 'md';
  else if (width < breakpoints.xl) return 'lg';
  else if (width < breakpoints.xxl) return 'xl';
  else return 'xxl';
}

const toggleVisibility = (index) => {
  isVisible.value[index] = !isVisible.value[index];
};

// Define a ref for the active slide index
const activeSlideIndex = ref(1);

// Define a computed property for the active slide ID
const activeSlideId = computed( () => `caseStudySlide+${activeSlideIndex.value}` );

// Define card count based on viewport
const cardCount = ref(getCardSlideCount());

function getCardSlideCount() {
  switch (viewport.value) {
    case 'xs':
      return [1];
    case 'sm':
      return [1,2];
    case 'md':
      return [1,2,3];
    case 'lg':
      return [1,2,3,4];
    case 'xl':
      return [1,2,3,4,5];
    case 'xxl':
      return [1,2,3,4,5];
    default:
      return [1];// default to medium size
  }
}

// Define a function to set the active slide index
const setActiveSlide = (index) => {
  activeSlideIndex.value = index ;
};

// Define functions to go to the previous and next slides
const goToPrevSlide = () => {
  
  if(activeSlideIndex.value <= 1) {
    activeSlideIndex.value = caseStudies.value.length ;
  }else {
    activeSlideIndex.value = (activeSlideIndex.value - cardCount.value.length) <= 1 ? 1 : activeSlideIndex.value - cardCount.value.length ;
  }

  console.log('card count: ' + cardCount.value.length);

};

const goToNextSlide = () => {

  const caseStudiesCounter = caseStudies.value.length,
        cardCounter = cardCount.value.length;


  if (activeSlideIndex.value >= caseStudiesCounter) {
    activeSlideIndex.value = 1;
  }else {
    activeSlideIndex.value = (activeSlideIndex.value + cardCounter) >= caseStudiesCounter ? caseStudiesCounter : activeSlideIndex.value + cardCounter;
  }

  console.log('card count: ' + cardCounter);

};

onMounted(() => {
  fetchCaseStudies();
  // Watcher to update viewport on resize
  window.addEventListener('resize', updateViewport);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateViewport);
});

function updateViewport() {
  viewport.value = getViewportSize();
}

// Watch viewport changes and update card count
watch(viewport, (newViewport) => {
  cardCount.value = getCardSlideCount();
});


</script>

<template>
  
  <section id="case-studies" class="">

    <div class="rounded-xl px-6 md:px-12 py-6 mx-6 relative z-10 title-bg backdrop-blur backdrop-brightness-200 dark:bg-slate-900/70 border-t-2 border-slate-200/10">
      
      <div class="overflow-hidden w-full h-full absolute top-0 left-0">
        <img :src="envUrl + 'circuit-2.png'" class="w-[130vw] -top-[35vw] block absolute left-1/2 -translate-x-1/2 z-0 max-w-[130vw]" alt="">
      </div>

      <div class="w-full">
            
        <div class="case-studies__title-container ml-6 mb-6 max-w-[190px] sm:max-w-[360px] relative pt-5">
          <h3 class="text-lg sm:text-xl font-normal text-slate-200 leading-[0.8em] inline-block">
            Work
          </h3><br />
          <h2
            class="font-bold text-xl sm:text-3xl bg-gradient-to-br from-cyan-400 to-indigo-600 bg-clip-text text-transparent text-shadow-lg/30"
          >
            CASE STUDIES
          </h2>
        </div>

        <div class="case-studies__carousel-bg p-6 relative z-0">

          <div class="w-10 h-10 rounded-l-full absolute top-1/2 z-40 -left-10 bg-slate-800 border-2 border-slate-800">
            <a class="w-[calc(100%-6px)] h-[calc(100%-6px)] ml-[3px] mt-[3px] rounded-full border-cyan-400 border-2 text-cyan-400 flex align-middle justify-center items-center font-normal" :href="'#caseStudySlide' + activeSlideIndex" @click="goToPrevSlide">«<span class="hidden">Prev</span></a>
          </div>

          <div class="w-10 h-10 rounded-r-full absolute top-1/2 z-40 -right-10 bg-slate-800 border-2 border-slate-800">
            <a class="w-[calc(100%-6px)] h-[calc(100%-6px)] ml-[3px] mt-[3px] rounded-full border-cyan-400 border-2 text-cyan-400 flex align-middle justify-center items-center font-normal" :href="'#caseStudySlide' + activeSlideIndex" @click="goToNextSlide"><span class="hidden">Next</span>»</a>
          </div>
          
          <div class="carousel sm:space-x-6 relative md:scroll-pl-6 snap-x mt-6 pt-6">
                  <!-- // v-if="isLoading" -->
            <div v-if="isLoading" v-for="(caseStudy, index) in caseStudies" class="py-3 w-2/3 md:w-2/5 lg:w-1/5 carousel-item relative box-border max-w-[338px]flex justify-center items-center h-80 ml-6">
              <div class="mx-auto rounded-md bg-slate-800 p-6 relative w-full block flex justify-center">
                <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status">
                    <span
                      class="absolute -m-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                      >Loading...</span
                    >
                </div>
              </div>

            </div>

            <div v-else v-for="(caseStudy, index) in caseStudies" :key="caseStudy.caseId" class="snap-start pt-20 pb-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 carousel-item box-border" :id="'caseStudySlide'+(index+1)" >

              <div class="mx-auto rounded-md bg-slate-800 pb-0">
                
                <div v-if="!isVisible[index]" 
                  class="case-study__images overflow-hidden relative bg-slate-200"
                >
                  <div class="case-study__desktop rounded overflow-hidden relative z-0 border-4 border-white w-full">
                    <img
                      class="case-study__image case-study__image--lg"
                      v-if="caseStudy.featuredImage"
                      :src="caseStudy.featuredImage.node.sourceUrl"
                      :alt="caseStudy.title"
                    />
                  </div>

                  <div class="case-study__tablet rounded overflow-hidden absolute bottom-0 right-0 z-10 w-4/5 shadow-2xl shadow-black border-4 border-white">
                    <img
                      class="overflow-hidden"
                      v-if="caseStudy.caseStudyImages.tabletImage"
                      :src="isLocal ? caseStudy.caseStudyImages.tabletImage.node.sourceUrl : caseStudy.caseStudyImages.tabletImage.node.sourceUrl"
                      :alt="`${caseStudy.title} Tablet Image`"
                    />
                  </div>

                  <div class="case-study__mobile rounded absolute overflow-hidden bottom-0 right-0 w-2/5 z-20 shadow-2xl shadow-black border-4 border-white"> 
                    <img
                      class="overflow-hidden rounded"
                      v-if="caseStudy.caseStudyImages.mobileImage"
                      :src="isLocal ? caseStudy.caseStudyImages.mobileImage.node.sourceUrl : caseStudy.caseStudyImages.mobileImage.node.sourceUrl"
                      :alt="`${caseStudy.title} Mobile Image`"
                    />
                  </div>

                </div>

                <div class="case-study__content">

                  <div v-if="!isVisible[index]" class="pt-6">

                    <h3 class="text-xl text-white">{{ caseStudy.title }}</h3>

                  </div>
                  <div v-else class="">
                    <h3 class="text-xl text-white pb-4 border-b border-slate-700">{{ caseStudy.title }}</h3>
                    <div class="font-normal text-slate-300 mt-4 mb-4 pb-4 border-b border-slate-700"  v-html="caseStudy.content"></div>
                    <div class="border-b border-slate-700 case-study__tags flex flex-wrap items-center align-middle justify-start pt-2 -mt-1 -mx-1 pb-4">
                      <div v-for="tag in caseStudy.tags.edges" class="leading-6 text-slate-200 rounded-full px-2 text-xs bg-zinc-600 font-normal my-1 mx-1 h-6" >{{ tag.node.name }}</div>
                    </div>
                  </div>

                  <div class="mt-6 flex space-x-6 md:space-x-4 lg:space-x-6 md:text-xs md:tracking-tighter">
                    <button 
                      class="primary-btn w-1/2 lg:text-base"
                      @click="toggleVisibility(index)"
                      >
                      Read {{ isVisible[index] ? "Less" : "More" }}
                    </button>

                    <a :href="caseStudy.caseStudyImages.externalUrl" target="_blank" class="secondary-btn w-1/2 ">View Site</a>
                  </div>

                </div>
                <!-- Content -->

              </div>

            </div>

          </div>
      
          <div class="carousel-navigation relative bg-slate-800 pt-2 pb-0" aria-label="Carousel Pagination">
            
            <div class="left-1/2 -translate-x-1/2 w-full sm:max-w-64 md:max-w-44 xl:max-w-16 relative flex justify-around align-middle space-x-2 md:space-x-4 lg:space-x-3 xl:space-x-2 2xl:space-x-1 join bg-slate-900 p-2 rounded-full border-t border-t-black border-b border-slate-500 border-b-slate-500">

              <a 
                v-for="(caseStudy, index) in caseStudies" 
                :key="caseStudy.caseId" 
                @click="setActiveSlide(index + 1)" 
                :href="'#caseStudySlide'+(index + 1)" 
                class="rounded-full border hover:border-cyan-500 join-item md:w-3 md:h-3 sm:w-4 sm:h-4 w-5 h-5 block"
                :class="[ activeSlideIndex == (index + 1) ? 'bg-cyan-500 border-cyan-200 active-item' : 'bg-gray-800 border-l-gray-900 border-r-gray-900 border-b-black border-t-gray-600' ]"
              >  
                <span class="hidden">{{index+1}}</span>
              </a>
              
            </div>
            
          </div>

        </div>

      </div>

    </div>
    

  </section>
  
</template>

<style>

.loader {
  border-top-color: #3490dc;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

#case-studies {
  @apply w-screen z-50;
}

.case-studies__carousel-bg::before {
  content: "";
  top: 124px;
  height: calc(100% - 124px);

  @apply bg-slate-800 absolute w-full left-0 rounded-md;
}

.case-studies__title-container:before {
  width: 100%;
  height: calc(100% + 0.3em);
  aspect-ratio: 3/2;
  clip-path: polygon(0 0,calc(100% - 25%) 0,100% 100%,0 100%);
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  top: 0;
  left: -1.5em;

  @apply bg-slate-800 rounded-t-lg;
}

.carousel-navigation > .flex.align-middle a:last-child {
  display: block !important;
}

@media screen and (min-width: 640px) and (max-width: 767px){
  .carousel-navigation > .flex a:nth-child(2n) {
    display: none;
  }
}

/* VIEW PORT = md */
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .carousel-navigation > .flex a:nth-child(2),
  .carousel-navigation > .flex a:nth-child(3),
  .carousel-navigation > .flex a:nth-child(5),
  .carousel-navigation > .flex a:nth-child(6),
  .carousel-navigation > .flex a:nth-child(8),
  .carousel-navigation > .flex a:nth-child(10),
  .carousel-navigation > .flex a:nth-child(11){
    display: none;
  }
}

/* VIEW PORT = lg */
@media screen and (min-width: 1024px) and (max-width: 1279px) {
  .carousel-navigation > .flex a:nth-child(2),
  .carousel-navigation > .flex a:nth-child(3),
  .carousel-navigation > .flex a:nth-child(4),
  .carousel-navigation > .flex a:nth-child(6),
  .carousel-navigation > .flex a:nth-child(7),
  .carousel-navigation > .flex a:nth-child(8),
  .carousel-navigation > .flex a:nth-child(10),
  .carousel-navigation > .flex a:nth-child(11){
    display: none;
  }
}

/* VIEW PORT = xl */
@media screen and (min-width: 1280px) {
  /* Hide all <a> tags between first and last by default */
  .carousel-navigation > .flex a:not(:first-child):not(:last-child):not(.active-item) {
    display: none;
  }

  /* Always show first and last <a> tags */
  .carousel-navigation > .flex a:first-child,
  .carousel-navigation > .flex a:last-child {
    display: block;
  }

  /* Always show <a> tags with active-item class */
  .carousel-navigation > .flex a.active-item {
    display: block;
  }

  /* If active-item is on first or last, show the first middle <a> tag (if it exists) */
  .carousel-navigation > .flex a.active-item:first-child ~ a:not(:last-child):not(.active-item):first-of-type,
  .carousel-navigation > .flex a.active-item:last-child ~ a:not(:first-child):not(.active-item):first-of-type {
    display: block;
  }
}


</style>