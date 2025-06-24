<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import HeaderNav from "./components/HeaderNav.vue";
import HomePage from "./components/HomePage.vue";
import CaseStudies from "./components/CaseStudies.vue";
import Services from "./components/Services.vue";
import Connect from "./components/Connect.vue";
import Footer from "./components/Footer.vue";

</script>

<template>
  <HeaderNav />
  <HomePage />
  <CaseStudies />
  <Services />
  <Connect />
  <Footer />
</template>

<style>
@import url("https://use.typekit.net/dhb1cnz.css");

html {
  font-family: Arial, Helvetica, sans-serif;
}

#app {
  font-family: fira-sans, sans-serif;
  font-style: normal;
  font-weight: 900;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-repeat: repeat;
  background-size: 230px;
  background-color: #181d2e;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
}

.shadow {
  width: 100vw;
  height: 100vh;
  display: block;
  position: absolute;
  z-index: 1;
  overflow: hidden;
}

.shadow > div {
  transform: rotateZ(40deg);
}

.title-bg {
  background-color: transparent;
}
</style>
