<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
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
      const message = ref("");

      const handleLogin = async () => {
        try {
          const result = await AuthService.login(email.value, password.value);
          localStorage.setItem("token", result.token); // Сохраняем токен в LocalStorage
          localStorage.setItem("expiresAt", result.expiresAt); // Сохраняем время действия токена
          message.value = "Login successful!";
        } catch (error: any) {
          message.value = error.response?.data?.message || "Login failed.";
        }
      };

      return {
        email,
        password,
        message,
        handleLogin,
      };
    },
  };
  </script>
