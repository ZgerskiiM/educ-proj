<template>
    <v-card
      class="auth-card d-flex flex-column justify-center align-md-center w-33 rounded-xl mt-10 pt-15 pb-10"
    >
      <form
        @submit.prevent="handleSignup"
        class="auth-form d-flex flex-column justify-center align-center w-66"
      >
        <v-text-field
          class="mt-2 w-100"
          v-model="formData.lastName"
          label="Фамилия"
          variant="outlined"
        />
        <v-text-field
          class="mt-2 w-100"
          v-model="formData.firstName"
          label="Имя"
          variant="outlined"
        />
        <v-text-field
          class="mt-2 w-100"
          v-model="formData.email"
          label="Почта"
          variant="outlined"
        />
        <v-text-field
          class="mt-4 w-100"
          label="Пароль"
          variant="outlined"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="formData.password"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        />
        <p v-if="message" class="mt-2">{{ message }}</p>
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
  import { ref, reactive } from 'vue';
  import { AuthService } from '@/app/features/auth/model/Auth';
  import { useRouter } from 'vue-router'; // Используем useRouter


  const visible = ref<boolean>(false);

  const formData = reactive<FormData>({
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  const router = useRouter();
  const message = ref<string | null>(null);

  interface FormData {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }

  const handleSignup = async () => {
  try {
    const result = await AuthService.signup(formData.email, formData.password, formData.firstName, formData.lastName);
    console.log('Регистрация успешна:', result);
    router.push({ path: '/verify', query: { email: formData.email } });  // Передаем почту как query параметр
  } catch (error: any) {
    if (error.response) {
      // Сервер ответил с кодом ошибки
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
