<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

import apolloClient, { isLocal } from '../utilities/apolloClient';

import {
  gql
} from "@apollo/client/core";

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
            mediaDetails {
              sizes {
                sourceUrl
                name
              }
            }
          }
        }
        caseStudyImages {
          externalUrl
          mobileImage {
            sourceUrl
          }
          tabletImage {
            sourceUrl
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



const toggleVisibility = (index) => {
  isVisible.value[index] = !isVisible.value[index];
};

// Define a ref for the active slide index
const activeSlideIndex = ref(1);

// Define a computed property for the active slide ID
const activeSlideId = computed( () => `caseStudySlide+${activeSlideIndex.value + 1}` );


// Define a function to set the active slide index
const setActiveSlide = (index) => {
  activeSlideIndex.value = index + 1;
};

// Define functions to go to the previous and next slides
const goToPrevSlide = () => {
  if (activeSlideIndex.value > 0) {
    activeSlideIndex.value = activeSlideIndex.value - 1;
  }
};

const goToNextSlide = () => {
  if (activeSlideIndex.value < caseStudies.value.length - 1 ) {
    activeSlideIndex.value = activeSlideIndex.value + 1;
  }
};

// Tailwind breakpoints
const breakpoints = {
  xs: 0,
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

// Define card count based on viewport
const cardCount = ref(getCardSlideCount());

function getCardSlideCount() {
  switch (viewport.value) {
    case 'xs':
      return [1,2];
    case 'sm':
      return [1,2];
    case 'md':
      return [1,2,3];
    case 'lg':
      return [1,2,3,4,5];
    case 'xl':
      return [1,2,3,4,5];
    case 'xxl':
      return [1,2,3,4,5];
    default:
      return [1,2,3,4,5];// default to medium size
  }
}

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
  <!-- ====== Blog Section Start -->
  <section id="case-studies" class="pt-20 pb-10 mt-[150vh] lg:pt-[120px] lg:pb-20 relative z-10 title-bg w-full">
    
    <img src="https://shaunmacdougall.com/wp-content/uploads/2024/07/circuit-2.png" class="w-[130vw] -top-[35vw] block absolute left-1/2 -translate-x-1/2 z-0 max-w-[130vw]" alt="">

    <img src="https://shaunmacdougall.com/wp-content/uploads/2024/07/circuit-2.png" class="w-[130vw] -bottom-[35vw] block absolute left-1/2 -translate-x-1/2 z-0 max-w-[130vw] lg:hidden" alt="">

    <div class="w-full">
      
      <div class="flex flex-wrap justify-center">

        <div class="w-full relative">
          
          <div class="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20 z-10 relative">
            <span class="block text-lg font-normal text-slate-200">
              Work
            </span>
            <h2
              class="text-3xl font-bold sm:text-4xl md:text-[40px] bg-gradient-to-br from-cyan-400 to-indigo-700 bg-clip-text text-transparent"
            >
              CASE STUDIES
            </h2>
            <p class="font-normal text-slate-300">
              Built with care and pixel perfection
            </p>
          </div>

        </div>
      </div>

      <div class="carousel space-x-6 relative bg-slate-800 py-6 scroll-pl-6 snap-x">
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

        <div v-else v-for="(caseStudy, index) in caseStudies" :key="caseStudy.caseId" class="snap-start py-3 w-2/3 md:w-2/5 lg:w-1/5 carousel-item relative box-border max-w-[338px] " :id="'caseStudySlide'+(index+1)" >

          <div class="mx-auto rounded-md bg-slate-800 relative">
            
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
                  :src="isLocal ? caseStudy.caseStudyImages.tabletImage.sourceUrl : caseStudy.caseStudyImages.tabletImage.node.sourceUrl"
                  :alt="`${caseStudy.title} Tablet Image`"
                />
              </div>

              <div class="case-study__mobile rounded absolute overflow-hidden bottom-0 right-0 w-2/5 z-20 shadow-2xl shadow-black border-4 border-white"> 
                <img
                  class="overflow-hidden rounded"
                  v-if="caseStudy.caseStudyImages.mobileImage"
                  :src="isLocal ? caseStudy.caseStudyImages.mobileImage.sourceUrl : caseStudy.caseStudyImages.mobileImage.node.sourceUrl"
                  :alt="`${caseStudy.title} Mobile Image`"
                />
              </div>

            </div>

            <div class="case-study__content">

              <div v-if="!isVisible[index]" class="pt-6">

                <h3 class="text-3xl min-h-[4.5rem] text-white">{{ caseStudy.title }}</h3>

              </div>
              <div v-else class="">
                <h3 class="text-xl text-white pb-4 border-b border-slate-700">{{ caseStudy.title }}</h3>
                <div class="font-normal text-slate-300 mt-4 mb-4 pb-4 border-b border-slate-700"  v-html="caseStudy.content"></div>
                <div class="border-b border-slate-700 case-study__tags flex flex-wrap items-center align-middle justify-start pt-2 -mt-1 -mx-1 pb-4">
                  <div v-for="tag in caseStudy.tags.edges" class="text-sm leading-6 text-slate-200 rounded-full px-2 text-xs bg-zinc-600 font-normal my-1 mx-1 h-6" >{{ tag.node.name }}</div>
                </div>
              </div>

              <div class="mt-6 flex space-x-6">
                <button 
                  class="primary-btn w-1/2"
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

    
      <div class="carousel-navigation relative w-full h-16 flex justify-around align-middle items-center bg-slate-800 pb-12" aria-label="Carousel Pagination">
        
        <div class="flex justify-center align-middle space-x-1 md:space-x-2 lg:space-x-3 join">
          <a class="btn join-item font-normal" :href="'#caseStudySlide' + (activeSlideIndex + 1)" @click="goToPrevSlide">«<span class=" hidden">Prev</span></a>

          <a v-for="(caseStudy, index) in caseStudies" :key="caseStudy.caseId" @click="setActiveSlide(index + 1)" :href="'#caseStudySlide'+(index + 1)" class="btn join-item hidden md:flex">{{index+1}}</a>

          <a class="btn join-item font-normal" :href="'#caseStudySlide' + (activeSlideIndex + 1)" @click="goToNextSlide"><span class="hidden">Next</span> »</a>
          
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


</style>