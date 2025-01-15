<template>
  <div class="page-container">
    <v-card
      class="auth-card d-flex flex-column justify-center align-md-center w-25 rounded-xl pb-10"
    >
      <form
        @submit.prevent="handleSignup"
        class="auth-form d-flex flex-column justify-center align-center w-66"
      >
        <v-card-title class="align-xl-start w-100 ml-0 mr-0 pa-0 mt-10">
          Регистрация
        </v-card-title>
        <v-text-field
          class="mt-7 w-100 pa-0"
          v-model="formData.lastName"
          label="Фамилия"
          variant="outlined"
        />
        <v-text-field
          class="w-100"
          v-model="formData.firstName"
          label="Имя"
          variant="outlined"
        />
        <v-text-field
          class="w-100"
          v-model="formData.email"
          label="Почта"
          variant="outlined"
        />
        <v-text-field
          class="w-100 mb-4 pt-0 pb-0"
          label="Пароль"
          hint="Не менее 8 знаков: латинские буквы, цифры, спецсимволы"
          persistent-hint
          variant="outlined"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="formData.password"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        />
        <div class="w-100 align-xl-start pa-0 ma-0">
          Уже есть аккаунт?
          <router-link to="/login">Войдите</router-link>
        </div>
        <p v-if="message" class="mt-2">{{ message }}</p>
        <v-card-actions class="w-100">
          <v-btn
            class="mt-4 mb-2 w-100 pa-0"
            text="Создать профиль"
            type="submit"
            :disabled="isButtonDisabled"
            @click="result"
          />
        </v-card-actions>
        <v-card
          class="info-card d-flex align-center pa-4"
          rounded="xl"
          elevation="2"
        >
          <v-icon class="info-icon mr-4" color="white">
            mdi-information-outline
          </v-icon>
          <div class="info-text">
            Создавая профиль, нажимая на кнопку, вы даёте согласие на обработку персональных данных
            и рассылку информационных сообщений
            <a href="https://www.consultant.ru/document/cons_doc_LAW_61801/" class="link">
              согласно закону</a>О персональных данных от 27.07.2006 №152-ФЗ
          </div>
        </v-card>
      </form>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { AuthService } from '@/app/features/auth/model/Auth'
import { useRouter } from 'vue-router'

const visible = ref<boolean>(false)

const formData = reactive<FormData>({
  password: '',
  email: '',
  firstName: '',
  lastName: '',
})

const router = useRouter()
const message = ref<string | null>(null)

interface FormData {
  firstName: string
  lastName: string
  password: string
  email: string
}

const handleSignup = async () => {
  try {
    const result = await AuthService.signup(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName,
    )
    console.log('Регистрация успешна:', result)
    router.push({ path: '/verify', query: { email: formData.email } })
  } catch (error: any) {
    if (error.response) {
      console.error('Ошибка сервера:', error.response.data)
      console.error('Код статуса:', error.response.status)
    } else if (error.request) {
      console.error('Ошибка запроса:', error.request)
    } else {
      console.error('Ошибка:', error.message)
    }
  }
}

const isButtonDisabled = computed(() => {
  return !formData.email || !formData.password || !formData.firstName || !formData.lastName
})
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
  background-color: #4c64ff;
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
