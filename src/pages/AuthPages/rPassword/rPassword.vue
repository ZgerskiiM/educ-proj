<template>
  <div class="page-container">
    <v-card class="auth-card d-flex flex-column justify-center align-md-center w-25 rounded-xl">
      <form
        @submit.prevent="handlePasswordChange"
        class="auth-form d-flex flex-column justify-center align-center w-66"
      >
        <v-card-title class="align-xl-start w-100 ml-0 mr-0 pa-0">
          Сброс пароля
        </v-card-title>
        <v-card-subtitle class="align-xl-start w-100 ml-0 mr-0 mt-1 pa-0">
          Введите новый пароль
        </v-card-subtitle>
        <v-text-field
          v-model="newPassword"
          type="password"
          label="Новый пароль"
          variant="outlined"
          class="mt-7 mb-0 w-100"
          :error-messages="errorMessage"
          required
        />
        <v-btn
          class="mb-2 w-100"
          type="submit"
          text="Сменить пароль"
          :disabled="!newPassword"
          :loading="loading"
        />
      </form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AuthService } from '@/app/features/auth/model/Auth'

const route = useRoute()
const router = useRouter()

const newPassword = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handlePasswordChange = async () => {
  if (!newPassword.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const token = route.query.token as string
    if (!token) {
      errorMessage.value = 'Токен не предоставлен'
      return
    }

    await AuthService.resetPassword(token, newPassword.value)
    alert('Пароль успешно изменён!')
    router.push('/login')
  } catch (error: any) {
    if (error.response) {
      errorMessage.value = error.response.data || 'Ошибка смены пароля'
    } else {
      errorMessage.value = 'Ошибка сервера. Попробуйте позже.'
    }
  } finally {
    loading.value = false
  }
}

// Проверяем наличие токена при монтировании компонента
onMounted(() => {
  const token = route.query.token
  if (!token) {
    errorMessage.value = 'Токен не предоставлен'
  }
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
  padding: 2rem;
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
