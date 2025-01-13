<template>
  <v-card
    class="auth-card d-flex flex-column justify-center align-md-center w-33 rounded-xl mt-10 pt-15 pb-10"
  >
    <div class="logo"></div>
    <form
      @submit.prevent="handleLogin"
      class="auth-form d-flex flex-column justify-center align-center w-66"
    >
      <v-text-field class="mt-12 w-100" v-model="formData.email" label="Логин" variant="outlined" />
      <v-text-field
        class="mt-4 w-100"
        label="Пароль"
        variant="outlined"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        v-model="formData.password"
        :type="visible ? 'text' : 'password'"
        @click:append-inner="visible = !visible"
      />
      Не помню пароль
      <v-btn class="mt-4 mb-6 w-100" type="submit">Войти</v-btn>
      <v-btn class="mt-4 mb-6 w-100" type="submit">Создать аккаунт</v-btn>
    </form>
  </v-card>
  </template>

  <script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { AuthService } from '@/app/features/auth/model/Auth'

  const visible = ref<boolean>(false)

  const formData = reactive<FormData>({
    username: '',
    surname: '',
    password: '',
    email: '',

  })

  interface FormData {
    username: string
    surname: string
    password: string
    email: string
  }

    const handleLogin = async () => {
      try {
        const result = await AuthService.login(formData.email, formData.password) // Используем данные из formData
        localStorage.setItem('token', result.token) // Сохраняем токен в LocalStorage
        localStorage.setItem('expiresAt', result.expiresAt) // Сохраняем время действия токена
      } catch (error) {
      }
    }

  </script>

  <style scoped>
  .auth-card {
    display: flex;
    justify-content: row;
  }

  .logo-img {
    width: 90%;
    margin-top: 50px;
    padding-left: 2vw;
  }

  a {
    color: #3e81ff;
  }

  .v-btn {
    background-color: #3e81ff;
    color: white;
  }

  .v-card {
    background-color: white;
  }
  </style>
