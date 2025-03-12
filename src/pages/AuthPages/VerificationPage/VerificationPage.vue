<template>
  <div class="page-container">
    <AuthImage />

    <v-container class="main-container">
      <form
        @submit.prevent="handleVerify"
        class="align-md-center d-flex flex-column"
        :class="mdAndDown ? 'w-66' : 'w-50'"
      >
        <AuthMobileImage />
        <div class="email-sent-text mb-4">Отправили код-подтверждение на {{ formData.email }}</div>
        <v-text-field
          class="w-100 font-weight-light"
          v-model="formData.verificationCode"
          label="Код-подтверждение"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
          :error-messages="codeError"
          @input="codeError = ''"
        />
        <v-card-text class="w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light ">
          Забыли пароль? &nbsp <router-link to="reset-password"> Восстановить</router-link>
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

        <v-alert
          v-if="successMessage"
          type="error"
          variant="tonal"
          closable
          class="mb-3 w-100 font-weight-light"
          @click:close="successMessage = ''"
        >
          {{ successMessage}}
        </v-alert>

        <v-btn
          class="text-none mb-2 w-100 font-weight-thin"
          text="Подтвердить"
          type="submit"
          :loading="isLoading"
          :disabled="isButtonDisabled"
          flat
        />
        <v-btn
          class="text-none mb-2 w-100 font-weight-thin"
          type="button"
          :disabled="timerState.isResendDisabled || isLoading"
          @click="resendCode"
          flat
        >
        {{ timerState.resendButtonText }}
        </v-btn>
      </form>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref, computed } from 'vue';
import { AuthService } from '@/app/features/auth/model/Auth';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import AuthImage from '@/shared/ui/AuthElements/AuthImages/AuthImage.vue';
import AuthMobileImage from '@/shared/ui/AuthElements/AuthImages/AuthMobileImage.vue';

const { mdAndDown, smAndUp } = useDisplay()

const router = useRouter();
const route = useRoute();

const serverError = ref<string>('');
const successMessage = ref<string>('');
const codeError = ref<string>('');
const isLoading = ref<boolean>(false);

const formData = reactive<FormData>({
  email: '',
  verificationCode: '',
});

const emailFromRoute = route.query.email as string;
formData.email = emailFromRoute;

interface FormData {
  email: string;
  verificationCode: string;
}

const timerState = reactive({
  remainingTime: 10,
  resendButtonText: 'Отправить повторно',
  isResendDisabled: false,
  timer: null as number | null,
});

const startResendTimer = () => {
  timerState.isResendDisabled = true;
  timerState.resendButtonText = `Повторно через ${timerState.remainingTime} сек`;

  timerState.timer = setInterval(() => {
    timerState.remainingTime--;
    timerState.resendButtonText = `Повторно через ${timerState.remainingTime} сек`;

    if (timerState.remainingTime <= 0) {
      if (timerState.timer) clearInterval(timerState.timer);
      timerState.isResendDisabled = false;
      timerState.resendButtonText = 'Отправить повторно';
      timerState.remainingTime = 10;
    }
  }, 1000);
};

const validateCode = (): boolean => {
  // Сбрасываем ошибку
  codeError.value = '';

  // Проверяем, введен ли код
  if (!formData.verificationCode.trim()) {
    codeError.value = 'Введите код подтверждения';
    return false;
  }

  // Проверяем, что код содержит только цифры и имеет правильную длину (обычно 6 цифр)

  return true;
};

const resendCode = async () => {
  try {
    serverError.value = '';
    successMessage.value = '';
    isLoading.value = true;

    const reset = await AuthService.resend(formData.email);
    startResendTimer();
    successMessage.value = 'Код успешно отправлен повторно';
  } catch (error: any) {
    if (error.response) {
      if (error.response.data?.message) {
        serverError.value = error.response.data.message;
      } else {
        serverError.value = `Ошибка сервера: ${error.response.status}`;
      }
      console.error('Ошибка сервера:', error.response.data);
      console.error('Код статуса:', error.response.status);
    } else if (error.request) {
      serverError.value = 'Не удалось связаться с сервером. Проверьте подключение к интернету.';
      console.error('Ошибка запроса:', error.request);
    } else {
      serverError.value = `Произошла ошибка: ${error.message}`;
      console.error('Ошибка:', error.message);
    }
  } finally {
    isLoading.value = false;
  }
};

const handleVerify = async () => {
  // Если код не прошел валидацию, прекращаем выполнение
  if (!validateCode()) return;

  try {
    serverError.value = '';
    successMessage.value = '';
    isLoading.value = true;

    const result = await AuthService.verify(formData.email, formData.verificationCode);
    successMessage.value = 'Почта успешно подтверждена!';

    // Перенаправляем на страницу входа через небольшую задержку
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        codeError.value = 'Неверный код подтверждения';
      } else if (error.response.data?.message) {
        serverError.value = error.response.data.message;
      } else {
        serverError.value = `Ошибка сервера: ${error.response.status}`;
      }
      console.error('Ошибка сервера:', error.response.data);
      console.error('Код статуса:', error.response.status);
    } else if (error.request) {
      serverError.value = 'Не удалось связаться с сервером. Проверьте подключение к интернету.';
      console.error('Ошибка запроса:', error.request);
    } else {
      serverError.value = `Произошла ошибка: ${error.message}`;
      console.error('Ошибка:', error.message);
    }
  } finally {
    isLoading.value = false;
  }
};

const isButtonDisabled = computed(() => {
  return !formData.verificationCode || isLoading.value;
});

onMounted(() => {
  startResendTimer();
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

/* Стиль для сообщения об ошибке */
.error-message {
  color: #ff5252;
  background-color: rgba(255, 82, 82, 0.12);
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* Стиль для сообщения об успехе */
.success-message {
  color: #4caf50;
  background-color: rgba(76, 175, 80, 0.12);
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 0.875rem;
}

.email-sent-text {
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
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
