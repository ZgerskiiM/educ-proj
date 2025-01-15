<template>
  <div class="page-container">
    <v-card
      class="auth-card d-flex flex-column justify-center align-md-center w-25 rounded-xl pt-5"
    >
      <form
        @submit.prevent="handleLogin"
        class="auth-form d-flex flex-column justify-center align-center w-66"
      >
        <v-card-title class="align-xl-start w-100 ml-0 mr-0 mt-7 pa-0">
          Войти
        </v-card-title>
        <v-text-field
          class="mt-7 mb-0 w-100"
          v-model="formData.email"
          label="Логин"
          variant="outlined"
        />
        <v-text-field
          class="mb-1 w-100"
          label="Пароль"
          variant="outlined"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="formData.password"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        />
        <div class="w-100 align-xl-start pa-0 ma-0 mb-4">
          <router-link to="reset-password">Не помню пароль</router-link>
        </div>
        <v-btn
          class="mt-2 mb-2 w-100"
          type="submit"
          text="Войти"
          :disabled="isButtonDisabled"
        />
        <v-btn
            class="mt-2 mb-12 w-100"
            type="submit"
            text="Создать аккаунт"
            @click="navigateToLogin()"
        />
      </form>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { AuthService } from '@/app/features/auth/model/Auth'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const navigateToLogin = () => {
  router.push('/register')
}

const handleLogin = async () => {
  try {
    const result = await AuthService.login(formData.email, formData.password) // Используем данные из formData
    localStorage.setItem('token', result.token) // Сохраняем токен в LocalStorage
    localStorage.setItem('expiresAt', result.expiresAt) // Сохраняем время действия токена
  } catch (error) {}
}

const isButtonDisabled = computed(() => {
  return !formData.email || !formData.password
})
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  margin: 0;
}

.auth-card {
  display: flex;
  justify-content: row;
}

a {
  color: #000000;
}

.v-btn {
  background-color: #4c64ff;
  color: white;
  border-radius: 0.4vw;
  height: 4.5vh;
}

.v-card {
  background-color: white;
}
</style>
