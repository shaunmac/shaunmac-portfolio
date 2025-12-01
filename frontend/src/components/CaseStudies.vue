<script setup>
import { ref, onMounted } from "vue";

import apolloClient, { isLocal } from '../utilities/ApolloClient';

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
          shortDiscription
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
          technical {
            category
            tools
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

import CaseStudyTable from './CaseStudyTable.vue';

// Tailwind breakpoints
// const breakpoints = {
//   xs: 360,
//   sm: 640,
//   md: 768,
//   lg: 1024,
//   xl: 1280,
//   xxl: 1536
// };

// // Reactive viewport size
// const viewport = ref(getViewportSize());

// // Function to get current viewport size
// function getViewportSize() {

//   const width = window.innerWidth;
//   if (width < breakpoints.sm) return 'xs';
//   else if (width < breakpoints.md) return 'sm';
//   else if (width < breakpoints.lg) return 'md';
//   else if (width < breakpoints.xl) return 'lg';
//   else if (width < breakpoints.xxl) return 'xl';
//   else return 'xxl';
// }

const toggleVisibility = (index) => {
  isVisible.value[index] = !isVisible.value[index];
};

// Define a ref for the active slide index
// const activeSlideIndex = ref(1);

// Define a computed property for the active slide ID
// const activeSlideId = computed( () => `caseStudySlide+${activeSlideIndex.value}` );

// Define card count based on viewport
// const cardCount = ref(getCardSlideCount());

// function getCardSlideCount() {
//   switch (viewport.value) {
//     case 'xs':
//       return [1];
//     case 'sm':
//       return [1,2];
//     case 'md':
//       return [1,2,3];
//     case 'lg':
//       return [1,2,3,4];
//     case 'xl':
//       return [1,2,3,4,5];
//     case 'xxl':
//       return [1,2,3,4,5];
//     default:
//       return [1];// default to medium size
//   }
// }

// // Define a function to set the active slide index
// const setActiveSlide = (index) => {
//   activeSlideIndex.value = index ;
// };

// Define functions to go to the previous and next slides
// const goToPrevSlide = () => {
  
//   if(activeSlideIndex.value <= 1) {
//     activeSlideIndex.value = caseStudies.value.length ;
//   }else {
//     activeSlideIndex.value = (activeSlideIndex.value - cardCount.value.length) <= 1 ? 1 : activeSlideIndex.value - cardCount.value.length ;
//   }

//   console.log('card count: ' + cardCount.value.length);

// };

// const goToNextSlide = () => {

//   const caseStudiesCounter = caseStudies.value.length,
//         cardCounter = cardCount.value.length;


//   if (activeSlideIndex.value >= caseStudiesCounter) {
//     activeSlideIndex.value = 1;
//   }else {
//     activeSlideIndex.value = (activeSlideIndex.value + cardCounter) >= caseStudiesCounter ? caseStudiesCounter : activeSlideIndex.value + cardCounter;
//   }

//   console.log('card count: ' + cardCounter);

// };

onMounted(() => {
  fetchCaseStudies();
  // Watcher to update viewport on resize
});


</script>

<template>
  
  <section id="case-studies" class="">

    <div class="p-6 relative z-10 w-full max-w-7xl lg:mx-auto">

      <div class="w-full">
            
        <div class="case-studies__title-container -mb-8 sm:max-w-[360px] relative pt-5">
          <h3 class="text-lg sm:text-xl font-normal text-slate-200 leading-[0.8em] inline-block">
            Work Experience
          </h3><br />
          <h2
            class="font-bold text-3xl sm:text-4xl bg-gradient-to-br from-cyan-400 to-indigo-600 bg-clip-text text-transparent text-shadow-lg/30"
          >
            CASE STUDIES
          </h2>
        </div>

        <div class="case-studies__carousel-bg relative z-0">
          
          <div class="relative mt-6 pt-6">
                  <!-- // v-if="isLoading" -->
            <div v-if="isLoading" v-for="(caseStudy, index) in caseStudies" class="py-3 w-2/3 md:w-2/5 lg:w-1/5 carousel-item relative box-border max-w-[338px]flex justify-center items-center h-80 ml-6">
              <div class="mx-auto rounded-md bg-slate-800 p-6 relative w-full flex justify-center">
                <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status">
                    <span
                      class="absolute -m-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                      >Loading...</span
                    >
                </div>
              </div>

            </div>

            <div v-else v-for="(caseStudy, index) in caseStudies" :key="caseStudy.caseId" class="pt-6 px-6 pb-3 mb-8 w-full box-border border border-slate-700/50 bg-slate-700/20 rounded-3xl backdrop-blur-sm" :id="'caseStudySlide'+(index+1)" >

              <div class="mx-auto md:flex md:space-x-6 pb-0">
                
                <div class="w-full md:w-1/2">
                  
                  <div class="case-study__images w-full overflow-hidden bg-slate-200 h-fit rounded-3xl relative">
                    <div class="case-study__desktop rounded-3xl overflow-hidden relative z-0 border-4 border-white w-full">
                      <img
                        class="case-study__image case-study__image--lg"
                        v-if="caseStudy.featuredImage"
                        :src="caseStudy.featuredImage.node.sourceUrl"
                        :alt="caseStudy.title"
                      />
                    </div>

                    <div class="case-study__tablet rounded-3xl overflow-hidden absolute bottom-0 right-0 z-10 w-4/5 shadow-2xl shadow-black border-4 border-white">
                      <img
                        class="overflow-hidden"
                        v-if="caseStudy.caseStudyImages.tabletImage"
                        :src="isLocal ? caseStudy.caseStudyImages.tabletImage.node.sourceUrl : caseStudy.caseStudyImages.tabletImage.node.sourceUrl"
                        :alt="`${caseStudy.title} Tablet Image`"
                      />
                    </div>

                    <div class="case-study__mobile rounded-3xl absolute overflow-hidden bottom-0 right-0 w-2/5 z-20 shadow-2xl shadow-black border-4 border-white"> 
                      <img
                        class="overflow-hidden rounded"
                        v-if="caseStudy.caseStudyImages.mobileImage"
                        :src="isLocal ? caseStudy.caseStudyImages.mobileImage.node.sourceUrl : caseStudy.caseStudyImages.mobileImage.node.sourceUrl"
                        :alt="`${caseStudy.title} Mobile Image`"
                      />
                    </div>
                  </div><!-- ///.case-study__images -->

                   
                </div>

                <div class="case-study__content w-full md:w-1/2 pb-6">

                  <div v-if="!isVisible[index]" class="pt-6 md:pt-0">

                    <h3 class="text-white text-4xl">{{ caseStudy.title }}</h3>

                    <div v-html="caseStudy.caseStudyImages.shortDiscription" class="font-normal text-slate-300 mt-6 mb-0"></div>

                    <CaseStudyTable :catsntools=caseStudy.caseStudyImages.technical ></CaseStudyTable>

                  </div>

                  <div v-else class="w-full">
                    <h3 class="text-4xl text-white py-6 md:pt-0 pb-6 border-b border-slate-700">{{ caseStudy.title }}</h3>
                    
                    <div class="font-normal text-slate-300 mt-6 mb-6" v-html="caseStudy.content"></div>
                    
                    <h4 class=" text-white pb-4">Technologies</h4>
                    <div class="case-study__tags flex flex-wrap items-center justify-start md:pr-4 ">
                      <div v-if="isLocal==='live'" v-for="tag in caseStudy.tags.nodes" class="leading-6 text-slate-200 rounded-full px-4 text-xs bg-zinc-800 font-normal m-1" >{{ tag.name }}</div>

                      <div v-else v-for="tag in caseStudy.tags.edges" class="leading-6 text-slate-200 rounded-full px-4 text-xs bg-zinc-800 font-normal m-1" >{{ tag.node.name }}</div>
                    </div>
                  </div>

                  <div class="mt-6 flex flex-row md:text-xs md:tracking-tighter space-x-6">
                    <button 
                      class="primary-btn w-1/2 lg:text-base mb-6"
                      @click="toggleVisibility(index)"
                      >
                      Read {{ isVisible[index] ? "Less" : "More" }}
                    </button>

                    <a :href="caseStudy.caseStudyImages.externalUrl" target="_blank" class="secondary-btn w-1/2 lg:text-base">View Site</a>
                  </div>

                </div>
                <!-- Content -->

              </div>

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

.carousel-navigation > .flex.align-middle a:last-child {
  display: block !important;
}

@media screen and (min-width: 640px) and (max-width: 767px){
  .carousel-navigation > .flex a:nth-child(2n) {
    display: none;
  }
}

.case-study__content h2.wp-block-heading {
  @apply font-bold text-3xl mb-6 text-white;
}

.case-study__content h3.wp-block-heading {
  @apply font-bold text-2xl mt-4 mb-4 text-white;
}

.case-study__content > p {
  @apply mb-8;
}

.case-study__content .wp-block-list {
  @apply pl-6;
}

.case-study__content .wp-block-list li {
  @apply list-none pl-2 mb-4 relative;
}

.case-study__content .wp-block-list li:before {
  width: 0.75em;
  height: 0.75em;
  left: -1.25em;
  top: 0.5em;
  content: " ";
  @apply bg-cyan-400 block rounded-full absolute;
}

/* .case-study__content .wp-block-list li:not(:first-child) {
  @apply pt-0;
} */

.case-study__content .wp-block-list li strong {
  @apply block mt-8 mb-4 text-slate-100 text-lg;
}

/* VIEW PORT = md */
@media screen and (min-width: 768px) and (max-width: 1023px) {
}

/* VIEW PORT = lg */
@media screen and (min-width: 1024px) and (max-width: 1279px) {
}

/* VIEW PORT = xl */
@media screen and (min-width: 1280px) {

}
</style>