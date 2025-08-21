<script setup>
import { ref } from "vue";

import {
  // ApolloClient,
  // createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";


// HTTP connection to the API
// const httpLink = createHttpLink({
//   // You should use an absolute URL here
//   uri: "http://shaunmac.local/graphql",
// });

// Cache implementation
const cache = new InMemoryCache();

// // Create the apollo client
// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache,
// });

// const primaryMenuQuery = gql`
//   query primaryMenuQuery {
//     menus {
//       nodes {
//         menuItems {
//           nodes {
//             label
//             id
//             cssClasses
//             url
//           }
//         }
//       }
//     }
//   }
// `;

// const menuItems = ref({});
// apolloClient.query({ query: primaryMenuQuery }).then((result) => {
//   menuItems.value = result.data.menus.nodes[0].menuItems.nodes;
// });
</script>

<template>
  <Popover
    class="fixed top-0 z-50 w-full backdrop-blur backdrop-brightness-200 bg-slate-950/70"
  >
    <div class="mx-auto max-w-7xl px-6 py-2 drop-shadow-2xl">
      <div class="flex items-center justify-between md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#" class="flex items-center justify-center">
            <img
              class="mr-4 h-8 w-auto sm:h-10"
              src="https://shaunmacdougall.com/wp-content/uploads/2024/07/logo.png"
              alt="Shaun MacDougall Web Developer"
            />
            <div class="flex flex-col justify-center">
              <span class="block text-xl text-slate-100">Shaun MacDougall</span>

              <span
                style="margin-top: -6px"
                class="block text-sm font-normal text-cyan-300"
                >Web Developer</span>
            </div>
          </a>
        </div>

        <nav class="hidden items-center justify-end lg:flex lg:w-0 lg:flex-1">
          <!-- todo remove these and preload the colors -->

          <a href="#app" class="hover:text-sky-500 mx-4 min-h-full cursor-pointer py-4 text-base font-medium text-gray-100">Home</a>
          <a href="#case-studies" class="hover:text-blue-500 mx-4 min-h-full cursor-pointer py-4 text-base font-medium text-gray-100">Work</a>
          <a href="#services" class="hover:text-indigo-500 mx-4 min-h-full cursor-pointer py-4 text-base font-medium text-gray-100">Services</a>
          <a href="#connect" class="hover:text-purple-500 mx-4 min-h-full cursor-pointer py-4 text-base font-medium text-gray-100">Contact</a>

          <a href="https://github.com/shaunmac" class="w-16 text-center p-2 text-slate-200 hover:text-cyan-400">
            <font-awesome-icon :icon="['fab', 'github']" /> <span class=" sr-only ">Github</span>
          </a>
          <a href="https://codepen.io/shaunmac" class="w-16 text-center p-2 text-slate-200 hover:text-cyan-400">
            <font-awesome-icon :icon="['fab', 'codepen']" /> <span class=" sr-only ">Codepen</span>
          </a>

          <a href="https://twitter.com/shaunaust" class="w-16 text-center p-2 text-slate-200 hover:text-cyan-400">
            <font-awesome-icon :icon="['fab', 'x-twitter']" /> <span class=" sr-only ">Twitter</span>
          </a>
        </nav>

        <div class="-my-2 -mr-2 lg:hidden">
          <PopoverButton
            class="inline-flex items-center justify-center rounded-md w-10 h-10 text-cyan-50 hover:text-cyan-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-y-95"
      enter-to-class="opacity-100 scale-y-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-y-100"
      leave-to-class="opacity-0 scale-y-95"
    >
      <PopoverPanel
        focus
        class="absolute inset-x-0 top-[51px] origin-top-right transform py-2 m-0 transition "
      >
        <div
          class="w-full shadow-l absolute backdrop-blur bg-zinc-900 supports-backdrop-blur:bg-zinc-900 lg:invisible"
        >
          <div class="px-5 pb-6">
            <div class="flex items-center justify-between relative">
            
              <div class="absolute -right-1 -top-12 md:right-0">
                <PopoverButton
                  class="inline-flex border-white items-center justify-center rounded-md w-10 h-10 text-slate-100 border-2 focus:border-cyan-400 focus:ring-0 focus:ring-inset bg-slate-900"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
              
            </div>
            <div class="mt-6 max-w-md m-auto">
              <nav class="grid gap-y-8">
                <a href="#app" class="hover:text-sky-500 mx-4 min-h-full cursor-pointer py-4 text-base font-medium text-gray-100">Home</a>
                <a href="#case-studies" class="hover:text-blue-500 mx-4 min-h-full cursor-pointer py-4 text-base font-medium text-gray-100">Work</a>
                <a href="#services" class="hover:text-indigo-500 mx-4 min-h-full cursor-pointer py-4 text-base font-medium text-gray-100">Services</a>
                <a href="#connect" class="hover:text-purple-500 mx-4 min-h-full cursor-pointer py-4 text-base font-medium text-gray-100">Contact</a>

              </nav>

              <div class="flex justify-between w-full mt-6 font-normal">
                <a href="https://github.com/shaunmac" class="w-1/3 text-center p-2 border hover:border-cyan-400 rounded-md border-zinc-900 text-slate-500 hover:text-cyan-400">
                  <font-awesome-icon :icon="['fab', 'github']" /> Github
                </a>
                <a href="https://codepen.io/shaunmac" class="w-1/3 text-center p-2 border hover:border-cyan-400 rounded-md border-zinc-900 text-slate-500 hover:text-cyan-400">
                  <font-awesome-icon :icon="['fab', 'codepen']" /> Codepen
                </a>

                <a href="https://twitter.com/shaunaust" class="w-1/3 text-center p-2 border hover:border-cyan-400 rounded-md border-zinc-900 text-slate-500 hover:text-cyan-400">
                  <font-awesome-icon :icon="['fab', 'x-twitter']" /> Twitter
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
