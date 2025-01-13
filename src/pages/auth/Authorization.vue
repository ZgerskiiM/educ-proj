<template>
    <div class="auth-page">
      <h1>Авторизация</h1>
      <LoginForm />
    </div>
  </template>

<script setup lang="ts">
import LoginForm from '@/app/features/auth/ui/LoginForm.vue';
</script>

<style scoped>
.auth-page {
    padding-top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: flex-end;
    gap: 5vh;
}
</style>
