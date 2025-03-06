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

        <!-- Сообщение об ошибке -->
        <v-alert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          class="mb-4 w-100"
          closable
          @click:close="errorMessage = ''"
        >
          {{ errorMessage }}
        </v-alert>

        <v-text-field
          class="w-100 font-weight-light"
          v-model="formData.email"
          label="Логин"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
          :error-messages="formErrors.email"
          @input="formErrors.email = ''"
        />
        <v-text-field
          class="w-100 mb-0 font-weight-light"
          label="Пароль"
          :density="smAndUp ? 'comfortable' : 'compact'"
          variant="outlined"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="formData.password"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
          :error-messages="formErrors.password"
          @input="formErrors.password = ''"
        />
        <v-card-text class="w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light">
          Забыли пароль? &nbsp
          <router-link to="reset-password">
            Восстановить
          </router-link>
        </v-card-text>
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
          @click="navigateToLogin()"
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
const errorMessage = ref<string>('')

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

const navigateToLogin = () => {
  router.push('/register')
}

const validateForm = (): boolean => {
  let isValid = true

  if (!formData.email.trim()) {
    formErrors.email = 'Введите email'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    formErrors.email = 'Введите корректный email'
    isValid = false
  }

  if (!formData.password) {
    formErrors.password = 'Введите пароль'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    errorMessage.value = ''

    // Вход пользователя
    const result = await AuthService.login(formData.email, formData.password)

    // Получаем URL для перенаправления (если пользователь пытался получить доступ
    // к защищенной странице перед тем, как был перенаправлен на страницу входа)
    const redirectUrl = localStorage.getItem('redirectAfterLogin');
    localStorage.removeItem('redirectAfterLogin');

    // Если у нас есть сохраненный URL, пытаемся перейти на него
    if (redirectUrl) {
      // Проверяем, имеет ли пользователь доступ к целевому URL
      if (redirectUrl.includes('/admin') && !AuthService.isAdmin()) {
        // Если нет доступа к админке, перенаправляем на домашнюю страницу
        router.push('/');
        localStorage.setItem('accessError', 'Доступ к административной панели запрещен');
      } else {
        // Если имеет доступ, перенаправляем на сохраненный URL
        router.push(redirectUrl);
      }
    } else {
      // Если нет сохраненного URL, перенаправляем в зависимости от роли
      if (AuthService.isAdmin()) {
        router.push('/admin');
      } else {
        router.push('/course');
      }
    }
  } catch (error) {
    // Обработка ошибок...
  } finally {
    loading.value = false;
  }
}

// Функция для получения данных пользователя, включая роль

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

@media (max-width: 1200px) {
  .responsive-image {
    width: 0;
  }
  .info--card {
    font-size: 0.6rem;
  }
}
</style>
