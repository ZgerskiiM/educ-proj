<template>
  <div class="page-container">
    <AuthImage />
    <v-container class="main-container">
      <form
        @submit.prevent="handleLogin"
        class="align-md-center d-flex flex-column"
        :class="mdAndDown ? 'w-66' : 'w-50'"
      >
        <AuthMobileImage />
        <v-card-title class="align-md-center justify-center d-flex pl-0 mb-3 font-weight-regular">
          Вход
        </v-card-title>

        <v-text-field
          class="w-100 font-weight-light"
          v-model="formData.email"
          label="Логин"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
          :error-messages="formErrors.email"
          @input="formErrors.email = ''; $event.target.value = $event.target.value.replace(/\s/g, '')"
          />
          <v-text-field
            class="w-100 mb-0 font-weight-light"
            label="Пароль"
            :density="smAndUp ? 'comfortable' : 'compact'"
            variant="outlined"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            v-model="passwordWithoutSpaces"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            :error-messages="formErrors.password"
            @paste="handlePaste"
            @keydown="preventSpaces"
          />
        <v-card-text class="w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light">
          Забыли пароль? &nbsp
          <router-link to="reset-password">
            Восстановить
          </router-link>
        </v-card-text>

        <v-alert
          v-if="serverError"
          type="error"
          variant="tonal"
          closable
          class="mb-3 w-100 font-weight-light"
          @click:close="serverError = ''"
        >
          {{ serverError }}
        </v-alert>

        <v-btn
          class="text-none mb-2 w-100 font-weight-thin"
          type="submit"
          text="Войти"
          :loading="loading"
          :disabled="isButtonDisabled"
          flat
        />
        <v-btn
          class="text-none mb-2 w-100 font-weight-thin"
          text="Создать аккаунт"
          @click="navigateToRegister()"
          flat
        />
      </form>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { AuthService } from '@/app/features/auth/model/Auth'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import AuthImage from '@/shared/ui/AuthElements/AuthImages/AuthImage.vue'
import AuthMobileImage from '@/shared/ui/AuthElements/AuthImages/AuthMobileImage.vue'

const { mdAndDown, smAndUp } = useDisplay()
const router = useRouter()
const visible = ref<boolean>(false)
const loading = ref<boolean>(false)
const serverError = ref<string>('')

const passwordWithoutSpaces = computed({
  get: () => formData.password,
  set: (value) => {
    formData.password = value.replace(/\s+/g, '');
    formErrors.password = '';
  }
});
const preventSpaces = (event) => {
  if (event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
  }
};
const handlePaste = (event) => {
  event.preventDefault();
  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData('text');
  const cleanText = pastedText.replace(/\s+/g, '');
  formData.password = cleanText;
  formErrors.password = '';
};


const formData = reactive<FormData>({
  password: '',
  email: '',
})

const formErrors = reactive<FormErrors>({
  password: '',
  email: '',
})

interface FormData {
  password: string
  email: string
}

interface FormErrors {
  password: string
  email: string
}

const navigateToRegister = () => {
  router.push('/register')
}

const validateForm = (): boolean => {
  let isValid = true

  if (!formData.email.trim()) {
    formErrors.email = 'Введите email'
    isValid = false
  }
  // Проверка на валидность email удалена

  if (!formData.password) {
    formErrors.password = 'Введите пароль'
    isValid = false
  }

  return isValid
}

const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.error('Error accessing localStorage:', e)
    return null
  }
}

const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.error('Error writing to localStorage:', e)
  }
}

const safeRemoveItem = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.error('Error removing from localStorage:', e)
  }
}

const handleLogin = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    serverError.value = ''
    formErrors.email = ''
    formErrors.password = ''

    // Вход пользователя
    const result = await AuthService.login(formData.email, formData.password)

    // Получаем URL для перенаправления
    const redirectUrl = safeGetItem('redirectAfterLogin')
    safeRemoveItem('redirectAfterLogin')

    // Если у нас есть сохраненный URL, пытаемся перейти на него
    if (redirectUrl) {
      // Проверяем, имеет ли пользователь доступ к целевому URL
      if (redirectUrl.includes('/admin') && !AuthService.isAdmin()) {
        // Если нет доступа к админке, перенаправляем на домашнюю страницу
        router.push('/lk')
        safeSetItem('accessError', 'Доступ к административной панели запрещен')
      } else {
        // Если имеет доступ, перенаправляем на сохраненный URL
        router.push(redirectUrl)
      }
    } else {
      // Если нет сохраненного URL, перенаправляем в зависимости от роли
      if (AuthService.isAdmin()) {
        router.push('/admin')
      } else {
        router.push('/lk')
      }
    }
  } catch (error: any) {
    // Добавлена детальная обработка ошибок
    if (error.response) {
      // Ошибки от сервера
      if (error.response.status === 401) {
        serverError.value = 'Неверный логин или пароль'
      } else if (error.response.status === 403) {
        serverError.value = 'Доступ запрещен'
      } else if (error.response.data?.message) {
        serverError.value = error.response.data.message
      } else if (error.response.data?.errors) {
        // Обработка ошибок отдельных полей
        const fieldErrors = error.response.data.errors
        if (fieldErrors.email) formErrors.email = fieldErrors.email
        if (fieldErrors.password) formErrors.password = fieldErrors.password
      } else {
        serverError.value = `Ошибка сервера: ${error.response.status}`
      }
      console.error('Ошибка сервера:', error.response.data)
    } else if (error.request) {
      // Ошибки сетевого соединения
      serverError.value = 'Не удалось связаться с сервером. Проверьте подключение к интернету.'
      console.error('Ошибка запроса:', error.request)
    } else {
      // Прочие ошибки
      serverError.value = `Произошла ошибка: ${error.message}`
      console.error('Ошибка:', error.message)
    }
  } finally {
    loading.value = false
  }
}

const isButtonDisabled = computed(() => {
  return !formData.email || !formData.password || loading.value
})
</script>

<style scoped>
.page-container {
  display: flex;
  background-color: #fafafa;
  align-items: center;
  min-height: 100vh;
}

a {
  color: #000000;
}

.main-container {
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
}

.v-btn {
  background-color: #302e2f;
  color: white;
  height: 5vh;
  font-size: 1rem;
}

.v-card-text {
  font-size: 0.8rem;
}

/* Стиль для сообщения об ошибке */
.error-message {
  color: #ff5252;
  background-color: rgba(255, 82, 82, 0.12);
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
}

@media (max-width: 1200px) {
  .responsive-image {
    width: 0;
  }
  .info--card {
    font-size: 0.6rem;
  }
}
</style>
