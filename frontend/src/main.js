import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { def } from "@vue/shared";

import { library } from '@fortawesome/fontawesome-svg-core';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faLifeRing, faHandshake, faRuler, faCodeBranch, faMicrochip, faCalculator, faPeoplePulling, faRoad } from "@fortawesome/free-solid-svg-icons";

import { faGithub, faCodepen, faXTwitter } from "@fortawesome/free-brands-svg-icons";

library.add( faLifeRing, faHandshake, faRuler, faCodeBranch, faMicrochip, faCalculator, faPeoplePulling, faRoad, faGithub, faCodepen, faXTwitter );

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
