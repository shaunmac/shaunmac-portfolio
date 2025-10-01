<script setup>
import { reactive, computed, ref } from 'vue';
import XtApi from '../utilities/XtApi.vue';

var showDM = ref(false);
var quoteData = ref(Object);
// Load the user ID from env
const recipientUserId = import.meta.env.VITE_X_USER_ID;

if (!recipientUserId) {
  console.error('VITE_X_USER_ID is not set in .env file');
}

const baseRates = {
  pageTemplateRate: 400,
  contentPageRate: 150,
  globalElementRate: 300,
  customFunctionalityRate: 500,
  designComplexityMultiplier: 1.2,
  responsiveRate: 200,
}

const quotes = reactive({
  pageTemplates: 1,
  contentPages: 1,
  globalElements: 1,
  customFunctionality: 0,
  designComplexity: 1,
  responsiveBreakpoints: 2,
})

const templateCost = computed(() => quotes.pageTemplates * baseRates.pageTemplateRate)
const contentCost = computed(() => quotes.contentPages * baseRates.contentPageRate)
const globalCost = computed(() => quotes.globalElements * baseRates.globalElementRate)
const functionalityCost = computed(() => quotes.customFunctionality * baseRates.customFunctionalityRate)
const responsiveCost = computed(() => quotes.responsiveBreakpoints * baseRates.responsiveRate)

const subtotal = computed(() => 
  templateCost.value + 
  contentCost.value + 
  globalCost.value + 
  functionalityCost.value + 
  responsiveCost.value
)

const total = computed(() => {
  const complexityMultiplier = 1 + ((quotes.designComplexity - 1) * 0.2)
  return Math.round(subtotal.value * complexityMultiplier)
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const exportQuote = () => {
  quoteData.value = {
    components: {
      'Template Development': templateCost.value,
      'Content Pages': contentCost.value,
      'Global Elements': globalCost.value,
      'Custom Functionality': functionalityCost.value,
      'Responsive Design': responsiveCost.value,
    },
    specifications: {
      'Page Templates': quotes.pageTemplates,
      'Content Pages': quotes.contentPages,
      'Global Elements': quotes.globalElements,
      'Custom Features': quotes.customFunctionality,
      'Design Complexity': quotes.designComplexity,
      'Responsive Breakpoints': quotes.responsiveBreakpoints,
    },
    total: total.value,
    date: new Date().toLocaleDateString()
  }

  showDM.value = true;
  
  // You can customize this to save to a file, send to an API, etc.
  // console.log('Quote Data:', quoteData)
}
</script>

<template>
  <div class="space-y-6 mt-3">
    <!-- Page Templates -->
    <div class="form-control">
      <h2 class="card-title text-2xl text-white ">Initial Quote Calculator</h2>
      <h3 class="font-normal text-cyan-50 pb-3">Let's get an overview of your project.</h3>
    </div>

    <div class="form-control">

      <label class="label">
        <div class="label__left">
          <span class="label-text block">Unique Page Templates</span>
          <span class="label-text-alt text-cyan-50 font-normal leading-tight">This could be a custom landing or a single page,<br /> products plural, etc. </span>
        </div>
        <div class="label__right">
          <span class="label-text">{{ quotes.pageTemplates }}</span>
        </div>
      </label>

      <input
        type="range"
        v-model="quotes.pageTemplates"
        min="1"
        max="10"
        step="1"
        class="range range-primary"
      />
      
    </div>

    <div class="form-control">

      <label class="label flex justify-between">
        <div class="label__left">
          <span class="label-text block">Content Pages</span>
          <span class="label-text-alt text-cyan-50 font-normal leading-tight">Content like blog posts and articles.</span>
        </div> 
        <div class="label__right">
          <span class="label-text">{{ quotes.contentPages }}</span>
        </div>
      </label>

      <input
        type="range"
        v-model="quotes.contentPages"
        min="1"
        max="20"
        step="1"
        class="range range-primary"
      />
      
    </div>

    <!-- Global Elements -->
    <div class="form-control">
      
      <label class="label flex justify-between">

        <div class="label__left">
          <span class="label-text block">Global Elements</span>
          <span class="label-text-alt text-cyan-50 font-normal leading-tight">Header, footer, sidebar, navigation, galleries etc.</span>
        </div> 
        <div class="label__right">
          <span class="label-text">{{ quotes.globalElements }}</span>
        </div>

      </label>

      <input
        type="range"
        v-model="quotes.globalElements"
        min="1"
        max="5"
        step="1"
        class="range range-primary"
      />
      
    </div>

    <!-- Custom Functionality -->
    <div class="form-control">
      <label class="label flex justify-between">
        <div class="label__left">
          <span class="label-text block">Custom Functionality Features</span>
          <span class="label-text-alt text-cyan-50 font-normal leading-tight">Calculators, shopping carts, customer relationship management.</span>
        </div>
        <div class="label__right">
          <span class="label-text">{{ quotes.customFunctionality }}</span>
        </div>
      </label>
      <input
        type="range"
        v-model="quotes.customFunctionality"
        min="0"
        max="5"
        step="1"
        class="range range-primary"
      />
      
    </div>

    <!-- Design Complexity -->
    <div class="form-control">
      <label class="label flex justify-between">
        <div class="label__left">
          <span class="label-text block">Design Complexity</span>
          <span class="label-text-alt text-cyan-50 font-normal leading-tight">Graphical elements, videos, animation.</span>
        </div> 
        <div class="label__right">
          <span class="label-text">{{ quotes.designComplexity }}</span>
        </div>
      </label>
      <input
        type="range"
        v-model="quotes.designComplexity"
        min="1"
        max="5"
        step="1"
        class="range range-primary"
      />
      
    </div>

    <!-- Responsive Breakpoints -->
    <div class="form-control">
      <label class="label flex justify-between">
        <div class="label__left">
          <span class="label-text block">Responsive Breakpoints</span>
          <span class="label-text-alt text-cyan-50 font-normal leading-tight">Mobile first screen sizes including tablet, desktop, extra large or small.</span>
        </div>
        <div class="label__right">
          <span class="label-text">{{ quotes.responsiveBreakpoints }}</span>
        </div>
      </label>
      <input
        type="range"
        v-model="quotes.responsiveBreakpoints"
        min="1"
        max="6"
        step="1"
        class="range range-primary"
      />
    </div>
  </div>
    <!-- Cost Breakdown -->
  <div class="bg-stone-900 -ml-6 -mr-6 p-6 mt-6">

    <div class="space-y-4">

      <div class="flex justify-between">
        <span class="text-xl font-bold text-white">Estimated Total</span>
        <span class="text-2xl font-bold  text-white">{{ formatCurrency(total) }}</span>
      </div>

      <div class="space-y-2 text-cyan-300 font-normal text-sm">
        <h3 class="text-lg font-semibold text-slate-200">Cost Breakdown</h3>
        <div class="flex justify-between items-center">
          <span>Unique Templates</span>
          <span class="badge badge-primary">{{ formatCurrency(templateCost) }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span>Content Pages</span>
          <span class="badge badge-primary">{{ formatCurrency(contentCost) }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span>Global Elements</span>
          <span class="badge badge-primary">{{ formatCurrency(globalCost) }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span>Custom Functionality</span>
          <span class="badge badge-primary">{{ formatCurrency(functionalityCost) }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span>Responsive Design</span>
          <span class="badge badge-primary">{{ formatCurrency(responsiveCost) }}</span>
        </div>
      </div>

    </div>  
  </div>

  <div id="#quote" class="bg-stone-900 -ml-6 -mr-6 p-6 -mt-3">
    <!-- Optional: Export Quote Button -->
    <button class="btn primary-btn w-full bg-stone-900" @click="exportQuote">
      Next
    </button>

  </div>
  <div :class="[showDM ? 'block' : 'hidden']" >
    <XtApi :recipientUserId="recipientUserId" :quote="quoteData" v-model="showDM"></XtApi>
  </div>
</template>

<style>
.range-primary {
  position: relative;
  margin-bottom: 0.5rem;
}

.range-primary::before {
  width: 100%;
  height: 24px;
  display: block;
  content: "";
  background-color: black;
  position: absolute;
  left: 0;
  top: 0;
}

.range::-webkit-slider-thumb {
  color: rgb(6,182,212) !important;
  box-shadow: 0 0 0 3px rgb(6 182 212) inset, var(--focus-shadow, 0 0), calc(var(--filler-size) * -1 - var(--filler-offset)) 0 0 var(--filler-size) !important;
}

span.label-text {
  color: #fff;
}

.space-y-6 div.form-control {
  @apply pb-6 relative;
}

.space-y-6 div.form-control::before {
  height: 1px;
  width: calc(100% + 3em);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  content: '';
  @apply bg-slate-700 block;
}

.space-y-6.mt-3 div.form-control:nth-child(7) {
  margin-bottom: -1.5em !important;
}

.form-control .label {
  @apply flex justify-between relative items-start;
}

.form-control .label .label__left {
  @apply w-11/12 mb-3;
}

.form-control .label .label__left .label-text {
  @apply mb-3;
}

.form-control .label .label__right {
  @apply w-1/12 justify-end flex;
}


</style>