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
                class="w-full mb-6 rounded-xl p-6 pt-6 relative z-10 title-bg backdrop-blur backdrop-brightness-200 bg-slate-900/70 border-t-2 border-slate-200/10 box-border" >
                  <div class="relative z-10 bg-slate-800 p-6 rounded-md overflow-hidden">

                    <div class="absolute w-[calc(100%+150px)] h-full block card-icon z-0 -left-1/4 -top-1/4">
                      <div v-if="card.title === 'Github'" class="w-full h-full">
                        <font-awesome-icon :icon="['fab', 'fa-github']" />
                      </div>
                      <div v-else-if="card.title === 'Codepen'" class="w-full h-full">
                        <font-awesome-icon :icon="['fab', 'fa-codepen']" />
                      </div>
                      <div v-else-if="card.title === 'Formally twitter'" class="w-full h-full">
                        <font-awesome-icon :icon="['fab', 'fa-x-twitter']" />
                      </div>
                    </div>

                    <div class="w-full pb-6 z-20 relative">
                        <h3 class="text-white text-2xl mb-4">{{ card.title }}</h3>
                        <p class=" text-slate-200 font-normal text">{{ card.content }}</p>
                    </div>

                    <h4 v-if="card.title === 'Github'" class=" font-bold text-slate-200 mb-4 z-20 relative">Contributions</h4>

                    <div 
                      v-if="card.title === 'Github'"
                      class="github-contributions relative z-20"  
                      ref="contributions"
                      role="img"
                      aria-label="GitHub contributions graph for shaunmac"
                    >
                      <div class="github-contributions__img relative z-20">
                        <img
                          :src="contributionUrl"
                          alt="GitHub Contributions Graph"
                          width="413px"
                          height="65px"
                        />
                      </div>
                    </div>
                    <h4 v-if="card.title === 'Codepen'" class="font-bold text-slate-200 mb-4 z-10 relative">Code Examples</h4>
                    <div v-if="card.title === 'Codepen'" id="codepen">
                      <div class="example">
                        <a href="https://codepen.io/shaunmac/pen/BvMmgg"></a>
                        <div class="icon">
                          <font-awesome-icon :icon="['fab', 'square-js']" />
                        </div>
                        <p>jQuery accordion</p>
                      </div>
                      <div class="example">
                        <a href="https://codepen.io/shaunmac/pen/wvvaGjM"></a>
                        <div class="icon">
                          <font-awesome-icon :icon="['fab', 'css3']" />
                        </div>
                        <p>Tailwindcss layout</p>
                      </div>
                      <div class="example">
                        <a href="https://codepen.io/shaunmac/pen/mvMPgr"></a>
                        <div class="icon">
                          <font-awesome-icon :icon="['fab', 'react']" />
                        </div>
                        <p>React accordion</p>
                      </div>
                    </div>

                    <div v-else class="w-full flex flex-col justify-end z-20 relative">
                        <BtnPrime :link=card.url linkLabel="Connect"></BtnPrime>
                    </div>

                  </div>

              </div>

            </div>

            <div class="w-full md:w-1/2">

                <div class="backdrop-blur backdrop-brightness-100 supports-backdrop-blur:bg-white bg-slate-700/50 w-full mb-6 px-6 py-6 rounded-lg">
                  <div class=" bg-slate-800 p-6 rounded-md">

                  <QuoteCalculator />

                  </div>
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

  .card-icon > div > svg {
    width: 100%;
    height: 100%;
    opacity: 0.4;
  }

  .card-icon > div > svg > path {
    @apply fill-neutral-700;
  }

  .github-contributions {
    @apply p-6 flex justify-center mb-6 w-full relative bg-slate-900 rounded-md border-t border-t-slate-950 border-b border-b-slate-600 overflow-hidden;
  }

  .github-contributions__img {
    width: 100%;
    height: 10vw;
    max-width: unset;
    position: relative;
    z-index: 0;
    overflow: hidden;
  }

  .github-contributions__img img {
    position: absolute;
    top: -2.3vw;
    left: -3.1vw;
    max-width: unset;
    width: calc(100% + 3.3vw);
    filter: hue-rotate(110deg);
  }



  @media (min-width:768px) {
    .github-contributions__img {
      height: 5.5vw;
    }

    .github-contributions img {
        width: 103.1%;
        top: -1.2vw;
        left: -01.3vw;
        height: 6.9vw;
    }
  }

  #codepen {
    @apply flex gap-1;
  }

  #codepen .example {
    @apply w-1/3 relative;
  }

  #codepen .example a {
    @apply rounded-md absolute w-full h-[6.5rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100 block border-2 border-cyan-400 opacity-0 hover:opacity-100 hover:scale-105 transition-all;
  }

  #codepen .example a:hover + .icon .svg-inline--fa path{
    @apply fill-cyan-400;
  }

  #codepen .example a:hover + .icon + p {
    @apply text-cyan-400;
  }

  #codepen .icon {
    @apply w-full flex justify-center items-center h-24 rounded bg-slate-900;
  }

  #codepen .icon .svg-inline--fa {
    @apply w-1/3 h-auto;
  }

  #codepen p {
    @apply text-slate-400 mt-3 truncate text-ellipsis font-normal;
  }

  @media (min-width:640px) {
     #codepen {
      @apply gap-4;
     }
  }

  @media (min-width:768px) {
     #codepen {
      @apply gap-6;
     }
  }

  @media (min-width:1280px) {
    #codepen {
      @apply flex-row;
    }

    #codepen .example {
    }

    #codepen .example a {
      @apply h-[14.75rem];
    }

    #codepen .icon {
      @apply h-44;
    }
  }

</style>