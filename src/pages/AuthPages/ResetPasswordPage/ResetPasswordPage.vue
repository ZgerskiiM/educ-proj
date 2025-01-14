<template>
  <div class="page-container">
    <v-card
      class="auth-card d-flex flex-column justify-center align-md-center w-25 rounded-xl "
    >
      <form
        @submit.prevent="handleReset"
        class="auth-form d-flex flex-column justify-center align-center w-66"
      >
        <v-card-title class="align-xl-start w-100 ml-0 mr-0 pa-0">
        Воccтановление
        </v-card-title>
        <v-card-subtitle class="align-xl-start w-100 ml-0 mr-0 mt-1 pa-0">
          Отправим ссылку восстановления <br> на почту
        </v-card-subtitle>
        <v-text-field
          class="mt-7 mb-0 w-100"
          v-model="formData.email"
          label="Почта"
          variant="outlined"
        />
        <v-btn
          class="mb-2 w-100"
          type="submit"
          text="Отправить"
          :disabled="isButtonDisabled"
        />
        <div class="w-100 pa-0 ma-0 mb-4 d-flex justify-center mt-12">
          Уже есть аккаунт? <router-link to="login">  Войдите </router-link>
      </div>
      </form>
    </v-card>
  </div>
</template>


<script lang="ts" setup>
  import { ref, reactive, computed} from 'vue'
  import { AuthService } from '@/app/features/auth/model/Auth'
  import { useRouter } from 'vue-router';

  const router = useRouter()

  const formData = reactive<FormData>({
    username: '',
    surname: '',
    password: '',
    email: '',

  })

  interface FormData {
    username: string
    surname: string
    password: string
    email: string
  }

  const handleReset = async () => {
  try {
    const result = await AuthService.resetRequest(formData.email);
    console.log('Данные для сервера:', result);
    router.push('/');
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

    const isButtonDisabled = computed(() => {
  return !formData.email ;
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

  a {
    color: #000000;
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
  </style>
