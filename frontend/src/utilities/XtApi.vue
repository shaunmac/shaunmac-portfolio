<script setup>
import { ref } from "vue";
// Define props for the quote data
const props = defineProps({
  quote: {
    type: Object,
    required: true,
    default: () => ({
      components: {},
      specifications: {},
      total: 0,
      date: ''
    })
  },
  recipientUserId: {
    type: String,
    required: true 
  },
  quoteCloser: {
    type: Boolean,
    required: true
  }
});

var closeQuote = ref(true);

// Function to format the message
const formatMessage = () => {
  let message = `Hi Shaun, I got this quote on your website. When can we discuss your schedule?\n\n`;
  message += `Quote Details (Date: ${props.quote.date})\n`;
  message += `Components:\n`;
  for (const [key, value] of Object.entries(props.quote.components)) {
    message += `- ${key}: $${value}\n`;
  }
  message += `\nSpecifications:\n`;
  for (const [key, value] of Object.entries(props.quote.specifications)) {
    message += `- ${key}: ${value}\n`;
  }
  message += `\nTotal: $${props.quote.total}`;
  return message;
};

// Function to open DM intent
const sendDM = () => {
  const message = formatMessage();
  const encodedMessage = encodeURIComponent(message);
  const dmUrl = `https://x.com/messages/compose?recipient_id=${props.recipientUserId}&text=${encodedMessage}`;
  window.open(dmUrl, '_blank');
};

const closeQuoteNow = () => {
  closeQuote.value = false;
}

</script>
<template>
  <div v-if="quoteCloser" class="absolute w-full h-full backdrop-blur-sm bg-slate-950/80 top-0 left-1/2 -translate-x-1/2">
    <div class="quote-dm-component leading-5">
      <div class="space-y-6">
        <div class="bg-slate-800 p-6">

          <div class="flex justify-between w-full">

            <div>
              <h3 class="h-1 pb-4 text-xl text-cyan-100">Quote Summary</h3>
              <p class="pb-6 text-cyan-200">{{ quote.date }}</p>
            </div>

            <button @click="closeQuoteNow">x</button>

          </div>
        </div>

        <div>
          <p>Hi Shaun, I got this quote on your website. When can we discuss your schedule?</p>
        </div>

        <div>
          <h4 class="h-2 pb-6">Components</h4>
          <ul>
            <li v-for="(value, key) in quote.components" :key="key">
              <p>{{ key }}</p> <p>${{ value }}</p>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="h-2 pb-6">Specifications</h4>
          <ul>
            <li v-for="(value, key) in quote.specifications" :key="key">
              <p>{{ key }}:</p> <p>{{ value }}</p>
            </li>
          </ul>
        </div>
      <div class="w-full flex justify-between">
        <p class="h-1"><strong>Total:</strong></p> <p>${{ quote.total }}</p>
      </div>
      <button @click="sendDM" class="dm-btn">
        Send Quote via X DM
      </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.quote-dm-component {
  @apply w-full max-w-[400px] mx-auto p-5 border-gray-100 border rounded-lg bg-slate-100 absolute bottom-6 left-1/2 -translate-x-1/2 text-cyan-800;
}

.quote-dm-component p {
  @apply font-normal text-base;
}

h3, h4 {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  @apply flex justify-between text-base font-normal;
}

.dm-btn {
  @apply w-full justify-center text-base text-center md:px-3.5 lg:px-1 rounded-full px-3 py-3 font-normal text-cyan-600 shadow-lg border-2 border-cyan-600 hover:bg-cyan-500 hover:text-white hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 active:bg-cyan-600 active:border-cyan-700 transition-all duration-200 ease-in-out flex items-center leading-none;
}

.dm-button:hover {
  background-color: #0c85d0;
}
</style>