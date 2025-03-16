<template>
  <div class="page-container">
    <AuthImage />
    <v-container class="main-container">
      <form
        @submit.prevent="handleSignup"
        class="align-md-center d-flex flex-column"
        :class="mdAndDown ? 'w-66' : 'w-50'"
      >
        <AuthMobileImage />
        <v-card-title class="align-md-center justify-center d-flex pl-0 mb-3 font-weight-regular">
          Регистрация
        </v-card-title>
        <!-- Поле Фамилия -->
        <v-text-field
          class="w-100 font-weight-light"
          v-model="lastNameWithoutSpaces"
          label="Фамилия"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
          :error-messages="errors.lastName"
          @keydown="preventSpaces"
          @paste="(e) => handlePaste(e, 'lastName')"
        />
        <!-- Поле Имя -->
        <v-text-field
          class="w-100 font-weight-light"
          v-model="firstNameWithoutSpaces"
          label="Имя"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
          :error-messages="errors.firstName"
          @keydown="preventSpaces"
          @paste="(e) => handlePaste(e, 'firstName')"
        />
        <!-- Поле Email -->
        <v-text-field
          class="w-100 font-weight-light"
          v-model="emailWithoutSpaces"
          label="Почта"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
          :error-messages="errors.email"
          @input="validateEmail"
          @keydown="preventSpaces"
          @paste="(e) => handlePaste(e, 'email')"
        />
        <!-- Поле Пароль -->
        <v-text-field
          class="w-100 mb-0 font-weight-light"
          label="Пароль"
          hint="Не менее 8 знаков: латинские буквы, цифры, спецсимволы"
          persistent
          :density="smAndUp ? 'comfortable' : 'compact'"
          variant="outlined"
          :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="passwordWithoutSpaces"
          :type="visiblePassword ? 'text' : 'password'"
          @click:append-inner="visiblePassword = !visiblePassword"
          :error-messages="errors.password"
          @input="validatePassword"
          @keydown="preventSpaces"
          @paste="(e) => handlePaste(e, 'password')"
        />
        <!-- Поле Повторите пароль -->
        <v-text-field
          class="w-100 mb-0 font-weight-light"
          label="Повторите пароль"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
          :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="confirmPasswordWithoutSpaces"
          :type="visibleConfirm ? 'text' : 'password'"
          @click:append-inner="visibleConfirm = !visibleConfirm"
          :error-messages="passwordMatchError"
          @input="validatePassword"
          @keydown="preventSpaces"
          @paste="(e) => handlePaste(e, 'confirmPassword')"
        />
        <!-- Остальной код остается без изменений -->
        <v-card-text class="w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light">
          Уже есть аккаунт? &nbsp
          <router-link to="/login">
            Войдите
          </router-link>
        </v-card-text>
        <v-alert
          v-if="serverError"
          type="error"
          variant="tonal"
          closable
          class="mb-3 w-100"
          @click:close="serverError = ''"
        >
          {{ serverError }}
        </v-alert>

        <v-btn
          class="text-none mb-2 w-100 font-weight-thin"
          text="Создать профиль"
          type="submit"
          :density="mdAndDown ? 'compact' : 'comfortable'"
          :disabled="isButtonDisabled"
          :loading="isLoading"
        />
        <v-card
          class="info-card d-flex align-center mt-3 bg-color-none"
          rounded="xm"
          variant="outlined"
        >
          <v-icon
            class="info-icon ml-5"
            color="black"
          >
            mdi-information-outline
          </v-icon>
          <v-card-text
            class="info--card font-weight-light px-3 py-2 mr-2"
          >
            Создавая профиль, нажимая на кнопку, вы даёте
            <a href="Согласие на обработку персональных данных">
              согласие на обработку персональных данных
            </a>
            и рассылку информационных сообщений
            <a href="https://www.consultant.ru/document/cons_doc_LAW_61801/" class="link">
              согласно закону</a> О персональных данных от 27.07.2006 №152-ФЗ
          </v-card-text>
        </v-card>
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

const visiblePassword = ref<boolean>(false)
const visibleConfirm = ref<boolean>(false)
const passwordMatchError = ref<string>('')
const serverError = ref<string>('')
const isLoading = ref<boolean>(false)

const formData = reactive<FormData>({
  password: '',
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const router = useRouter()

interface FormData {
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  email: string
}

// Вычисляемые свойства для всех полей с блокировкой пробелов
const firstNameWithoutSpaces = computed({
  get: () => formData.firstName,
  set: (value) => {
    formData.firstName = value.replace(/\s+/g, '');
    errors.firstName = '';
  }
});

const lastNameWithoutSpaces = computed({
  get: () => formData.lastName,
  set: (value) => {
    formData.lastName = value.replace(/\s+/g, '');
    errors.lastName = '';
  }
});

const emailWithoutSpaces = computed({
  get: () => formData.email,
  set: (value) => {
    formData.email = value.replace(/\s+/g, '');
    errors.email = '';
  }
});

const passwordWithoutSpaces = computed({
  get: () => formData.password,
  set: (value) => {
    formData.password = value.replace(/\s+/g, '');
    errors.password = '';
  }
});

const confirmPasswordWithoutSpaces = computed({
  get: () => formData.confirmPassword,
  set: (value) => {
    formData.confirmPassword = value.replace(/\s+/g, '');
    validatePasswordMatch();
  }
});

// Предотвращает ввод пробелов
const preventSpaces = (event) => {
  if (event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
  }
};

// Обрабатывает вставку текста и удаляет пробелы
const handlePaste = (event, field) => {
  event.preventDefault();

  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData('text');
  const cleanText = pastedText.replace(/\s+/g, '');

  // Обновляем соответствующее поле
  formData[field] = cleanText;

  // Сбрасываем ошибки если они есть
  if (errors[field]) {
    errors[field] = '';
  }

  // Если это поле пароля, также проверяем совпадение
  if (field === 'password' || field === 'confirmPassword') {
    validatePasswordMatch();
  }
};

const validatePasswordMatch = () => {
  if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
    passwordMatchError.value = 'Пароли не совпадают'
  } else {
    passwordMatchError.value = ''
  }
}

const validateEmail = () => {
  errors.email = ''

  if (!formData.email) return

  // Проверка формата email с помощью регулярного выражения
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    errors.email = 'Некорректный формат электронной почты'
  }
}

const validatePassword = () => {
  errors.password = ''

  if (!formData.password) return

  // Проверка длины пароля
  if (formData.password.length < 8) {
    errors.password = 'Пароль должен содержать не менее 8 символов'
    return
  }

  // Проверка наличия латинских букв
  if (!/[a-zA-Z]/.test(formData.password)) {
    errors.password = 'Пароль должен содержать латинские буквы'
    return
  }

  // Проверка наличия цифр
  if (!/\d/.test(formData.password)) {
    errors.password = 'Пароль должен содержать цифры'
    return
  }

  // Проверка наличия спецсимволов
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
    errors.password = 'Пароль должен содержать специальные символы'
    return
  }

  // Если есть ранее введенный пароль для подтверждения, проверим совпадение
  validatePasswordMatch();
}

const handleSignup = async () => {
  // Сбрасываем все ошибки
  serverError.value = ''

  // Проверяем валидность данных перед отправкой
  validateEmail()
  validatePassword()
  validatePasswordMatch()

  if (errors.email || errors.password || passwordMatchError.value) {
    return
  }

  isLoading.value = true

  try {
    const result = await AuthService.signup(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName,
    )
    router.push({ path: '/verify', query: { email: formData.email } })
  } catch (error: any) {
    // Обработка ошибок без изменений
    if (error.response) {
      if (error.response.data?.message) {
        serverError.value = error.response.data.message
      } else if (error.response.data?.errors) {
        const fieldErrors = error.response.data.errors
        if (fieldErrors.email) errors.email = fieldErrors.email
        if (fieldErrors.password) errors.password = fieldErrors.password
        if (fieldErrors.firstName) errors.firstName = fieldErrors.firstName
        if (fieldErrors.lastName) errors.lastName = fieldErrors.lastName
      } else {
        serverError.value = `Ошибка сервера: ${error.response.status}`
      }
      console.error('Ошибка сервера:', error.response.data)
      console.error('Код статуса:', error.response.status)
    } else if (error.request) {
      serverError.value = 'Не удалось связаться с сервером. Проверьте подключение к интернету.'
      console.error('Ошибка запроса:', error.request)
    } else {
      serverError.value = `Произошла ошибка: ${error.message}`
      console.error('Ошибка:', error.message)
    }
  } finally {
    isLoading.value = false
  }
}

const isButtonDisabled = computed(() => {
  return !formData.email ||
         !formData.password ||
         !formData.firstName ||
         !formData.lastName ||
         formData.password !== formData.confirmPassword ||
         !!passwordMatchError.value ||
         !!errors.email ||
         !!errors.password ||
         isLoading.value
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
