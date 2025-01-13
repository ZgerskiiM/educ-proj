<template>
    <v-card
      class="auth-card d-flex flex-column justify-center align-md-center w-33 rounded-xl mt-10 pt-15 pb-10"
    >
      <form
        @submit.prevent="handleVerify"
        class="auth-form d-flex flex-column justify-center align-center w-66"
      >
        <div>Отправили код-подтверждение на {{ formData.email }}</div>
        <v-text-field
          class="mt-2 w-100"
          v-model="formData.verificationCode"
          label="Код-подтверждение"
          variant="outlined"
        />
        <v-btn
          class="mt-4 mb-6 w-100"
          type="submit"
          @click="result"
        >
          Создать профиль
        </v-btn>
      </form>
    </v-card>
  </template>

  <script lang="ts" setup>
  import { reactive } from 'vue';
  import { AuthService } from '@/app/features/auth/model/Auth';
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router'; // Используем useRouter

  const router = useRouter();
  const route = useRoute();

  const formData = reactive<FormData>({
    email: '',
    verificationCode: '',
  });

  // Получаем email из query параметров маршрута
  const emailFromRoute = route.query.email as string;

  // Записываем email в formData
  formData.email = emailFromRoute;

  interface FormData {
    email: string;
    verificationCode: string;
  }

  const handleVerify = async () => {
    try {
      const result = await AuthService.verify(formData.email, formData.verificationCode);
      console.log('Данные для сервера:', result);
      router.push('/');
    } catch (error: any) {
      if (error.response) {
        // Сервер ответил с кодом ошибки
        console.log('Данные для сервера:', formData.email, formData.verificationCode);
        console.error('Ошибка сервера:', error.response.data); // Вывод JSON ошибки
        console.error('Код статуса:', error.response.status); // Код статуса (например, 400)
      } else if (error.request) {
        // Сервер не ответил, ошибка на уровне сети
        console.error('Ошибка запроса:', error.request);
      } else {
        // Неожиданная ошибка на клиенте
        console.error('Ошибка:', error.message);
      }
    }
  };
  </script>

  <style scoped>
  .auth-card {
    display: flex;
    justify-content: row;
  }

  .logo-img {
    width: 90%;
    margin-top: 50px;
    padding-left: 2vw;
  }

  a {
    color: #3e81ff;
  }

  .v-btn {
    background-color: #3e81ff;
    color: white;
  }

  .v-card {
    background-color: white;
  }
  </style>
