<template>
  <div class="page-container">
    <v-img
      class="responsive-image d-none d-sm-flex"
      src="/public/main--menu3.png"
      :aspect-ratio="16/9"
      cover
    ></v-img>
    <v-container class="main-container">
      <form
        @submit.prevent="handleVerify"
        class="align-md-center d-flex flex-column"
        :class="mdAndDown ? 'w-66' : 'w-50'"
      >
      <v-img
      class="responsive-image-second"
      src="/school_вектор.png"
      height="15vh"
      v-show="sm"
      ></v-img>
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
import { useDisplay } from 'vuetify'

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
