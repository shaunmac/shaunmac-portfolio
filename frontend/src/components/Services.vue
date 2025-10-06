<script setup>
import { ref } from "vue";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";

import { isLocal } from '../utilities/ApolloClient';


const envUrl = isLocal ? 'http://shaunmac.local/wp-content/uploads/2024/01/' : 'https://shaunmacdougall.com/wp-content/uploads/2024/07/';


// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://shaunmacdougall.com/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const servicesQuery = gql`
  query services {
    pages(where: {id: 484}) {
      nodes {
        services {
          service {
            name
            knowlegePercentage
            icon {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
    services {
      nodes {
        title
        content
        serveIcon {
          icon
        }
      }
    }
  }
`;

const servicesData = ref({});
const skills = ref([]);
const services = ref({});
const servi= ref([]);

apolloClient.query({ query: servicesQuery }).then((result) => {
  servicesData.value = result.data;
  skills.value = servicesData.value.pages.nodes[0].services.service;
  services.value = servicesData.value.services.nodes;
  services.value.map( x => { servi.value.push(x.serveIcon.icon.split(',')) });
});

</script>

<template>

<section id="services" class="pt-10 pb-10 lg:pt-[30px] lg:pb-20 relative title-bg z-20 mt-[150vw] w-full ">

  <div class="rounded-xl px-6 py-6 mx-6 relative z-10 title-bg backdrop-blur backdrop-brightness-200 dark:bg-slate-900/70 border-t-2 border-slate-200/10">

    <div class="overflow-hidden w-full h-full absolute top-0 left-1/2 -translate-x-1/2" >
      <img :src="envUrl + 'circuit-2.png'" class="w-[130vw] -top-[35vw] block absolute left-1/2 -translate-x-1/2 z-0 max-w-[130vw]" alt="">
    </div>
    
    <div class="w-full z-10">
        
      <div class="w-full ml-6 max-w-[247px] sm:max-w-[360px] relative title-container-bg py-6">
      
          <span class="block text-lg font-normal text-slate-200 ">
            Professional 
          </span>
          <h2
            class="text-3xl font-bold sm:text-4xl md:text-[40px] bg-gradient-to-br from-cyan-400 to-indigo-700 bg-clip-text text-transparent"
          >
            SERVICES
          </h2>
          <p class="font-normal text-slate-300">
            Full Stack Development
          </p>
        
      </div>

      <div class="lg:flex lg:flex-row-reverse w-full bg-slate-800 py-6">

        <div class="w-full lg:w-1/3 md:flex md:flex-wrap relative z-10 mb-6 pb-4">

          <h2 class="text-xl font-normal text-slate-200 ml-6 block w-full">Experience</h2>

          

          <div class="w-1/2 hidden md:flex lg:hidden  px-6 mt-4 h-4 ">
            <div class="w-1/12 block"></div>
            <div class="w-11/12 ml-6 flex justify-between border-b-slate-500/50 border-b rounded-sm">

              <p class="block text-center font-xs font-light text-slate-50 leading-none"><sup>0</sup></p>
              <p class="block text-center font-xs font-light text-slate-50 leading-none"><sup>number of years</sup></p> 
              <p class="block text-center font-xs font-light text-slate-50 leading-none"><sup>25</sup></p>

            </div>
          </div>
         
          <div v-for="skill in skills" :key="skill.name" class="mt-2 md:w-1/2 lg:w-full md:px-1">
            <div class="flex rounded-md px-6 bg-slate-800 justify-start items-center w-full">
              <div class="w-1/12 max-w-[64px]">
                <div class="rounded-full bg-orange-500 p-[2px] lg:p-[1px] flex justify-center items-center w-full">
                  <img :src="skill.icon.node.sourceUrl" :alt="skill.name" />
                </div>
              </div>

              <div class="w-11/12 pl-6">
                <p class="w-full inline-block text-slate-50 font-normal">{{ skill.name }}</p>
                <div class="w-full mt-2">
                  <span class="block h-1 mt-2 -mb-3 rounded w-full bg-gray-900"></span>
                  <span class="block h-1 bg-primary mt-2 rounded" :style="{ width: skill.knowlegePercentage + '%' }"></span>
                </div>
              </div>
            </div>
            
          </div>

          <div class="w-full  md:w-1/2 lg:w-full flex px-6 mt-4 lg:mt-0 h-4">
            <div class="w-1/12  block"></div>
            <div class="w-11/12 ml-6 flex justify-between border-b-slate-500/50 border-b rounded-sm">

              <p class="block text-center font-xs font-light text-slate-50 leading-none"><sup>0</sup></p>
              <p class="block text-center font-xs font-light text-slate-50 leading-none"><sup>number of years</sup></p> 
              <p class="block text-center font-xs font-light text-slate-50 leading-none"><sup>25</sup></p>

            </div>
          </div>
        
        </div>

        <div class="w-full lg:w-2/3 flex flex-wrap gap-6 relative z-10 px-6 lg:pr-0">

          <div v-for="(service, index) in services" class="w-full md:w-[calc(50%-0.8em)] lg:w-">
            <div class="rounded-lg bg-indigo-950 p-6 text-slate-400">

              <div class="flex align-middle items-center">
               
                <div class="rounded-full border border-slate-400 block p-1">
                  <div class="w-6 h-6 flex items-center justify-center">
                    <font-awesome-icon :icon=servi[index] size="lg" />

                   <!-- <p class="bold block"> {{servi[index]}}</p> -->
                  </div>
                </div>

                <h3 class="text-white leading-8 text-2xl pl-6 lg:mt-0">{{ service.title }}</h3>

              </div>

              <div class="w-full mt-6" v-html="service.content">
              </div>

            </div>
          </div><!-- services  -->

        </div>

      </div>
    </div>
  </div>
</section>

</template>