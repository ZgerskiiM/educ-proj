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
        <div>Отправили код-подтверждение на {{ formData.email }}</div>
        <v-text-field
          class="w-100 font-weight-light"
          v-model="formData.verificationCode"
          label="Код-подтверждение"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
        />
        <v-card-text class="w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light ">
          Забыли пароль? &nbsp <router-link to="reset-password"> Восстановить</router-link>
        </v-card-text>
        <p v-if="message" class="mt-2">{{ message }}</p>
          <v-btn
            class="text-none mb-2 w-100 font-weight-thin"
            text="Создать профиль"
            type="submit"
            @click="handleVerify"
            flat
          />
          <v-btn
            class="text-none mb-2 w-100 font-weight-thin"
            type="button"
            :disabled="timerState.isResendDisabled"
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
import { reactive, onMounted } from 'vue';
import { AuthService } from '@/app/features/auth/model/Auth';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import AuthImage from '@/shared/ui/AuthElements/AuthImages/AuthImage.vue';
import AuthMobileImage from '@/shared/ui/AuthElements/AuthImages/AuthMobileImage.vue';

const { mdAndDown, smAndDown, sm, smAndUp } = useDisplay()

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
