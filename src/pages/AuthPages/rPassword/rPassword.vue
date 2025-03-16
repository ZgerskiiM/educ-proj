<template>
  <div class="page-container">
    <AuthImage />
    <v-container class="main-container">
      <form
        @submit.prevent="handlePasswordChange"
        class="align-md-center d-flex flex-column"
        :class="mdAndDown ? 'w-66' : 'w-50'"
      >
        <AuthMobileImage />
        <v-card-title
          class="align-md-center justify-center d-flex pl-0 pb-0 mb-3 font-weight-regular"
        >
          Установка нового пароля
        </v-card-title>

        <v-text-field
          class="w-100 mb-0 font-weight-light"
          label="Новый пароль"
          hint="Не менее 8 знаков: латинские буквы, цифры, спецсимволы"
          persistent-hint
          :density="smAndUp ? 'comfortable' : 'compact'"
          variant="outlined"
          :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="passwordWithoutSpaces"
          :type="visiblePassword ? 'text' : 'password'"
          @click:append-inner="visiblePassword = !visiblePassword"
          :error-messages="errors.password"
          @input="validatePassword"
          @keydown="preventSpaces"
          @paste="handlePaste"
        />

        <v-text-field
          class="w-100 mb-3 font-weight-light mt-3"
          label="Повторите пароль"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
          :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="confirmPasswordWithoutSpaces"
          :type="visibleConfirm ? 'text' : 'password'"
          @click:append-inner="visibleConfirm = !visibleConfirm"
          :error-messages="passwordMatchError"
          @input="validatePasswordMatch"
          @keydown="preventSpaces"
          @paste="handlePasteConfirm"
        />

        <v-alert
          v-if="message.text"
          :type="message.type"
          variant="tonal"
          closable
          class="mb-3 w-100"
          @click:close="message.text = ''"
        >
          {{ message.text }}
        </v-alert>

        <v-btn
          class="text-none mb-2 w-100 font-weight-thin"
          type="submit"
          text="Сохранить новый пароль"
          :disabled="isButtonDisabled"
          :loading="isLoading"
          flat
        />
      </form>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { AuthService } from '@/app/features/auth/model/Auth'
import { useRouter, useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import AuthImage from '@/shared/ui/AuthElements/AuthImages/AuthImage.vue'
import AuthMobileImage from '@/shared/ui/AuthElements/AuthImages/AuthMobileImage.vue'

const { mdAndDown, smAndUp } = useDisplay()
const router = useRouter()
const route = useRoute()

const visiblePassword = ref(false)
const visibleConfirm = ref(false)
const passwordMatchError = ref('')
const isLoading = ref(false)
const token = ref('')

const formData = reactive({
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  password: '',
})

const message = reactive({
  text: '',
  type: 'info'
})

// Получаем токен из URL при загрузке страницы
onMounted(() => {
  token.value = route.query.token?.toString() || '';
  if (!token.value) {
    message.text = 'Ссылка недействительна. Запросите восстановление пароля заново.';
    message.type = 'error';
  }
})

// Вычисляемое свойство для блокировки пробелов в пароле
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

// Обрабатывает вставку текста и удаляет пробелы для поля пароля
const handlePaste = (event) => {
  event.preventDefault();
  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData('text');
  const cleanText = pastedText.replace(/\s+/g, '');
  formData.password = cleanText;
  errors.password = '';
};

// Обрабатывает вставку текста для поля подтверждения пароля
const handlePasteConfirm = (event) => {
  event.preventDefault();
  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData('text');
  const cleanText = pastedText.replace(/\s+/g, '');
  formData.confirmPassword = cleanText;
  validatePasswordMatch();
};

const validatePassword = () => {
  errors.password = '';

  if (!formData.password) return;

  // Проверка длины пароля
  if (formData.password.length < 8) {
    errors.password = 'Пароль должен содержать не менее 8 символов';
    return;
  }

  // Проверка наличия латинских букв
  if (!/[a-zA-Z]/.test(formData.password)) {
    errors.password = 'Пароль должен содержать латинские буквы';
    return;
  }

  // Проверка наличия цифр
  if (!/\d/.test(formData.password)) {
    errors.password = 'Пароль должен содержать цифры';
    return;
  }

  // Проверка наличия спецсимволов
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
    errors.password = 'Пароль должен содержать специальные символы';
    return;
  }

  validatePasswordMatch();
};

const validatePasswordMatch = () => {
  if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
    passwordMatchError.value = 'Пароли не совпадают';
  } else {
    passwordMatchError.value = '';
  }
};

const handlePasswordChange = async () => {
  // Проверяем наличие токена
  if (!token.value) {
    message.text = 'Отсутствует токен для сброса пароля. Запросите восстановление пароля заново.';
    message.type = 'error';
    return;
  }

  // Валидация перед отправкой
  validatePassword();
  validatePasswordMatch();

  if (errors.password || passwordMatchError.value) {
    return;
  }

  isLoading.value = true;
  message.text = '';

  try {
    await AuthService.resetPassword(token.value, formData.password);

    message.text = 'Пароль успешно изменен!';
    message.type = 'success';

    // Перенаправляем на страницу входа через 2 секунды
    setTimeout(() => {
      router.push('/login');
    }, 2000);

  } catch (error) {
    console.error('Ошибка при изменении пароля:', error);

    if (error.response?.status === 400) {
      message.text = 'Ссылка для восстановления пароля недействительна или срок её действия истек.';
    } else if (error.response?.data?.message) {
      message.text = error.response.data.message;
    } else {
      message.text = 'Произошла ошибка при смене пароля. Попробуйте запросить новую ссылку.';
    }

    message.type = 'error';
  } finally {
    isLoading.value = false;
  }
};

const isButtonDisabled = computed(() => {
  return !formData.password ||
         !formData.confirmPassword ||
         formData.password !== formData.confirmPassword ||
         !!errors.password ||
         !!passwordMatchError.value ||
         !token.value ||
         isLoading.value;
});
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
