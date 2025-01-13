<template>
    <div>
      <h1>Resend Verification Code</h1>
      <form @submit.prevent="handleResend">
        <input v-model="email" type="email" placeholder="Email" required />
        <button type="submit">Resend Code</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>

  <script lang="ts">
  import { ref } from "vue";
  import { AuthService } from "./Auth";

  export default {
    setup() {
      const email = ref("");
      const message = ref("");

      const handleResend = async () => {
        try {
          const result = await AuthService.resend(email.value);
          message.value = result.message || "Verification code sent again.";
        } catch (error: any) {
          message.value = error.response?.data?.message || "Failed to resend code.";
        }
      };

      return {
        email,
        message,
        handleResend,
      };
    },
  };
  </script>
