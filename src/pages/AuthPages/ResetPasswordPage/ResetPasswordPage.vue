<template>
  <div class="page-container">
    <AuthImage />
    <v-container class="main-container">
      <form
        @submit.prevent="handleForgotPassword"
        class="align-md-center d-flex flex-column"
        :class="mdAndDown ? 'w-66' : 'w-50'"
      >
        <AuthMobileImage />
        <v-card-title
          class="align-md-center justify-center d-flex pl-0 pb-0 mb-3 font-weight-regular"
        >
          Воccтановление пароля
        </v-card-title>

        <v-text-field
          class="w-100 font-weight-light mb-3"
          v-model="emailWithoutSpaces"
          label="Почта"
          hint="Отправим ссылку восстановления на почту"
          persistent-hint
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
          :error-messages="error"
          @keydown="preventSpaces"
          @paste="handlePaste"
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

        <v-card-text class="w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light">
          Уже есть аккаунт? &nbsp <router-link to="/login"> Войдите</router-link>
        </v-card-text>

        <v-btn
          class="text-none mb-2 w-100 font-weight-thin"
          type="submit"
          text="Отправить"
          :disabled="isButtonDisabled"
          :loading="isLoading"
          flat
        />
      </form>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref } from 'vue'
import { AuthService } from '@/app/features/auth/model/Auth'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import AuthImage from '@/shared/ui/AuthElements/AuthImages/AuthImage.vue'
import AuthMobileImage from '@/shared/ui/AuthElements/AuthImages/AuthMobileImage.vue'

const { mdAndDown, smAndUp } = useDisplay()
const router = useRouter()
const isLoading = ref(false)
const error = ref('')

const formData = reactive({
  email: ''
})

const message = reactive({
  text: '',
  type: 'info'
})

// Блокировка пробелов в email
const emailWithoutSpaces = computed({
  get: () => formData.email,
  set: (value) => {
    formData.email = value.replace(/\s+/g, '');
    error.value = '';
  }
});

// Предотвращает ввод пробелов
const preventSpaces = (event) => {
  if (event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
  }
};

// Обрабатывает вставку текста и удаляет пробелы
const handlePaste = (event) => {
  event.preventDefault();
  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData('text');
  const cleanText = pastedText.replace(/\s+/g, '');
  formData.email = cleanText;
  error.value = '';
};

const validateEmail = () => {
  error.value = '';

  if (!formData.email) {
    error.value = 'Введите email';
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    error.value = 'Некорректный формат электронной почты';
    return false;
  }

  return true;
}

const handleForgotPassword = async () => {
  if (!validateEmail()) {
    return;
  }

  isLoading.value = true;
  message.text = '';

  try {
    // Используем правильный метод forgotPassword
    await AuthService.forgotPassword(formData.email);
    message.text = 'Инструкции по сбросу пароля отправлены на вашу почту. Проверьте также папку Спам.';
    message.type = 'success';
    formData.email = '';
  } catch (error) {
    console.error('Ошибка при запросе сброса пароля:', error);

    if (error.response?.data?.message) {
      message.text = error.response.data.message;
    } else {
      message.text = 'Произошла ошибка. Пожалуйста, попробуйте еще раз позже.';
    }
    message.type = 'error';
  } finally {
    isLoading.value = false;
  }
}

const isButtonDisabled = computed(() => {
  return !formData.email || isLoading.value;
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
