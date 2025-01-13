<template>
    <div>
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSignup">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input v-model="name" type="text" placeholder="Name" required />
        <button type="submit">Sign Up</button>
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
      const password = ref("");
      const name = ref("");
      const message = ref("");

      const handleSignup = async () => {
        try {
          const result = await AuthService.signup(email.value, password.value, name.value);
          message.value = result.message || "Verification code sent to your email.";
        } catch (error: any) {
          message.value = error.response?.data?.message || "Signup failed.";
        }
      };

      return {
        email,
        password,
        name,
        message,
        handleSignup,
      };
    },
  };
  </script>
