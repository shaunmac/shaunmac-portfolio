<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        'your-name': '',
        'your-email': '',
        'your-message': ''
      },
      isLoading: false,
      message: ''
    };
  },
  methods: {
    async sendEmail() {
      this.isLoading = true;
      this.message = '';

      const formData = new FormData();
      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key]);
      });

      try {
        const response = await axios.post(
          'https://your-wp-site.com/wp-json/contact-form-7/v1/contact-forms/{form_id}/feedback',  // Replace with your WP URL and form ID
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        if (response.data.status === 'mail_sent') {
          this.message = response.data.message;  // e.g., "Thank you for your message."
          // Reset form if needed
          this.form = { 'your-name': '', 'your-email': '', 'your-message': '' };
        } else {
          this.message = response.data.message;  // e.g., Validation errors
          // Handle specific field errors: response.data.invalid_fields
        }
      } catch (error) {
        this.message = 'Failed to send email. Please try again.';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
<template>
  <form @submit.prevent="sendEmail">
    <label>Name</label>
    <input v-model="form['your-name']" type="text" required>
    <label>Email</label>
    <input v-model="form['your-email']" type="email" required>
    <label>Message</label>
    <textarea v-model="form['your-message']" required></textarea>
    <button type="submit" :disabled="isLoading">Send</button>
    <p v-if="message">{{ message }}</p>
  </form>
</template>

