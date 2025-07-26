<script setup>
import { ref, onMounted } from "vue";
import { useGsapAnimation } from '../composables/useGsapAnimation';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";

import BtnPrime from "./BtnPrime.vue";
import QuoteCalculator from "./QuoteCalculator.vue";
import { isLocal } from '../utilities/apolloClient';
import CircuitSvgs from "./CircuitSvgs.vue";

const contributionUrl = ref(
  'https://ghchart.rshah.org/shaunmac'
);

const contributions = ref(null);

onMounted(() => {
  useGsapAnimation(contributions, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
  });
});

const envUrl = isLocal ? 'http://shaunmac.local/wp-content/uploads/2024/01/' : 'https://shaunmacdougall.com/wp-content/uploads/2024/07/';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://shaunmacdougall.com/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const connectQuery = gql`
query connect{
    pages(where: {title: "Connect"}) {
        nodes {
          connect {
            card {
              background {
                node {
                	sourceUrl
                }
              }
              content
              title
              url
            }
        }
      }
    }
  }
`;

const cardsData = ref({});

apolloClient.query({ query: connectQuery }).then((result) => {
    cardsData.value = result.data.pages.nodes[0].connect.card;
});

</script>

<template>

    <section id="connect" class="pt-10 pb-10 lg:pt-[30px] lg:pb-20 relative mt-[100vh]">

      <CircuitSvgs />

        <div class="mx-auto px-6 w-full">
          
          <div class="flex flex-wrap justify-center relative z-10">

            <div class="w-full px-4">
              <div class="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span class="block text-lg font-normal text-slate-200">
                  We Should  
                </span>
                <h2
                  class="text-3xl uppercase font-bold sm:text-4xl md:text-[40px] bg-gradient-to-br from-cyan-400 to-indigo-700 bg-clip-text text-transparent"
                >
                  Connect
                </h2>
                <p class="font-normal text-slate-300">
                  The best place to get in touch
                </p>
              </div>
            </div>
          </div>

          <div class="relative z-10 md:flex gap-6">

            <div class="w-full flex-col md:w-1/2">
                
              <div v-for="(card, index) in cardsData" 
                class="w-full mb-6 rounded-xl p-6 pt-4 relative z-10 title-bg backdrop-blur backdrop-brightness-200 dark:bg-slate-900/70 border-t-2 border-slate-200/10 box-border" >
                  <div class="relative z-10 bg-slate-800 p-6 rounded-md">
                    <div class="w-full pb-6">
                        <h3 class="text-white text-2xl mb-4">{{ card.title }}</h3>
                        <p class=" text-slate-200 font-normal text">{{ card.content }}</p>
                    </div>

                    <h4 v-if="card.title === 'Github'" class=" font-normal text-slate-300 mb-2">Contributions</h4>

                    <div 
                      v-if="card.title === 'Github'"
                      class="github-contributions flex justify-center mb-6 w-full relative bg-slate-900 rounded-md border-t border-t-slate-950 border-b border-b-slate-600 overflow-hidden"  
                      ref="contributions"
                      role="img"
                      aria-label="GitHub contributions graph for username"
                    >
                      <img
                        :src="contributionUrl"
                        alt="GitHub Contributions Graph"
                      />
                    </div>

                    <div v-if="card.title ==='Codepen'">
                      
                    </div>

                    <div class="w-full flex flex-col justify-end">
                        <BtnPrime :link=card.url linkLabel="Connect"></BtnPrime>
                    </div>

                  </div>

              </div>

            </div>

            <div class="w-full md:w-1/2">

                <div class="backdrop-blur supports-backdrop-blur:bg-white/95 w-full mb-6 border border-slate-700 px-6 py-6 rounded-md">

                  <QuoteCalculator />

                </div>

            </div>
          </div> 



        </div>
    </section>

</template>

<style>
  #connect .circuit-svgs {
    transform: translateY(-300px);
  }

  #connect .cont-1,
  #connect .cont-2,
  #connect .cont-3,
  #connect .cont-4 {
    position: absolute;
  }

  #connect .cont-1 {
    right: -225px;
    transform: rotateZ(270deg) rotateY(180deg) scale(1.2);
    top: 228px;
  }

  #connect .cont-1 svg, 
  #connect .cont-2 svg,
  #connect .cont-3 svg,
  #coonect .cont-4 svg {
    @apply fill-cyan-900;
  }

  #connect .cont-2 {
    top: 200vh;
    transform: scale(2.3);
  }

  #connect .cont-3 {
    top: 800px;
    transform: rotateY(90deg);
    right: 0;
  }

  #connect .cont-4 {
    top: 1200px;
  }

  .github-contributions img {
    width: 131.1vw;
    top: -1.5vw;
    left: -1.5vw;
    height: 11.6vw;
    max-width: unset;
    position: relative;
    z-index: 0;
    filter: hue-rotate(110deg);
  }

  @media (min-width:768px) {
    .github-contributions img {
        width: 103.1%;
        top: -0.6vw;
        left: -0.6vw;
        height: 6.2vw;
    }
  }

</style>