<script setup>
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
  }
});

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
</script>
<template>
  <div>
  <div class="quote-dm-component">
    <h3>Quote Summary</h3>
    <p>Date: {{ quote.date }}</p>
    
    <h4>Components</h4>
    <ul>
      <li v-for="(value, key) in quote.components" :key="key">
        {{ key }}: ${{ value }}
      </li>
    </ul>
    
    <h4>Specifications</h4>
    <ul>
      <li v-for="(value, key) in quote.specifications" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
    
    <p><strong>Total: ${{ quote.total }}</strong></p>
    
    <button @click="sendDM" class="dm-button">
      Send Quote via X DM
    </button>
  </div>
  </div>
</template>
<style scoped>
.quote-dm-component {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
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
}

.dm-button {
  padding: 10px 20px;
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dm-button:hover {
  background-color: #0c85d0;
}
</style>