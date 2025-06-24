<script setup>
import { ref } from "vue";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";

import BtnPrime from "./BtnPrime.vue";
import QuoteCalculator from "./QuoteCalculator.vue";

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
    //console.log(cardsData.value);
});

</script>

<template>

    <section id="connect" class="pt-10 pb-10 lg:pt-[30px] lg:pb-20 relative mt-[100vh]">

      <img src="https://shaunmacdougall.com/wp-content/uploads/2024/07/circuit-2.png" class="w-[130vw] top-[0] max-w-[1024px] block absolute left-1/2  -translate-x-1/2 z-0" alt="">

        <div class="mx-auto px-6 max-w-7xl">
          
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

          <div class="relative z-10 w-2/3 ml-[30%]">

            <div class="w-full flex">
                
                <div v-for="(card, index) in cardsData" 
                class="w-full px-6 pt-6 mb-6 rounded relative" >
                    <div class="w-1/3 relative z-10">
                        <div class="w-full pb-12">
                            <h3 class="text-white text-2xl mb-4">{{ card.title }}</h3>
                            <p class=" text-slate-200 font-normal text">{{ card.content }}</p>
                        </div>
                        <div class="w-full flex flex-col justify-end pb-6">
                            <BtnPrime :link=card.url linkLabel="Connect"></BtnPrime>
                        </div>
                    </div>

                </div>

            </div>

            <div class="w-full">

                <div class="backdrop-blur supports-backdrop-blur:bg-white/95 w-full mb-6 border border-slate-700 px-6 py-6 rounded-md">

                  <QuoteCalculator />

                </div>

            </div>
          </div> 



        </div>
    </section>

</template>