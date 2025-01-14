<template>
  <div class="page-container">
    <v-card
      class="auth-card d-flex flex-column justify-center align-md-center w-25 rounded-xl mt-10 pb-10"
    >
      <form
        @submit.prevent="handleVerify"
        class="auth-form d-flex flex-column justify-center align-center w-66"
      >
        <v-card-title class="align-xl-start w-100 ml-0 mr-0 pa-0 mt-10">
          Подтверждение
        </v-card-title>
        <div>Отправили код-подтверждение на {{ formData.email }}</div>
        <v-text-field
          class="mt-4 w-100"
          v-model="formData.verificationCode"
          label="Код-подтверждение"
          variant="outlined"
        />
        <v-btn
          class="mt-0 mb-6 w-100"
          type="submit"
          @click="handleVerify"
        >
          Создать профиль
        </v-btn>

        <v-btn
          class=" mb-6 w-100"
          type="button"
          :disabled="timerState.isResendDisabled"
          @click="resendCode"
        >
          {{ timerState.resendButtonText }}
        </v-btn>
      </form>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { AuthService } from '@/app/features/auth/model/Auth';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

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

const resendCode = async () => {
  try {
    const reset = await AuthService.resend(formData.email);
    console.log('Данные для сервера:', reset);
    startResendTimer();
  } catch (error: any) {
    if (error.response) {
      console.log('Данные для сервера:', formData.email);
      console.error('Ошибка сервера:', error.response.data);
      console.error('Код статуса:', error.response.status);
    } else if (error.request) {
      console.error('Ошибка запроса:', error.request);
    } else {
      console.error('Ошибка:', error.message);
    }
  }
};

const handleVerify = async () => {
  try {
    const result = await AuthService.verify(formData.email, formData.verificationCode);
    console.log('Данные для сервера:', result);
    router.push('/');
  } catch (error: any) {
    if (error.response) {
      console.log('Данные для сервера:', formData.email, formData.verificationCode);
      console.error('Ошибка сервера:', error.response.data);
      console.error('Код статуса:', error.response.status);
    } else if (error.request) {
      console.error('Ошибка запроса:', error.request);
    } else {
      console.error('Ошибка:', error.message);
    }
  }
};

onMounted(() => {
  startResendTimer();
});
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

.v-btn {
  background-color: #4C64FF;
  color: white;
  border-radius: 0.4vw;
  height: 4.5vh;
}

.v-card {
  background-color: white;
}

.info-card {
  background-color: #333333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 0.6vw;
  border-radius: 0.5vw;
}

.info-icon {
  font-size: 24px;
}

.info-text {
  line-height: 1.6;
}

.link {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
