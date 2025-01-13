<template>
    <div>
      <h1>Verify Email</h1>
      <form @submit.prevent="handleVerify">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="code" type="text" placeholder="Verification Code" required />
        <button type="submit">Verify</button>
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
      const code = ref("");
      const message = ref("");

      const handleVerify = async () => {
        try {
          const result = await AuthService.verify(email.value, code.value);
          message.value = result.message || "Email verified successfully!";
        } catch (error: any) {
          message.value = error.response?.data?.message || "Verification failed.";
        }
      };

      return {
        email,
        code,
        message,
        handleVerify,
      };
    },
  };
  </script>
