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
        @submit.prevent="handleSignup"
        class="align-md-center d-flex flex-column"
        :class="mdAndDown ? 'w-66' : 'w-50'"
      >
      <v-img
      class="responsive-image-second"
      src="/school_вектор.png"
      height="15vh"
      v-show="smAndDown"
      ></v-img>
        <v-card-title class="align-md-center justify-center d-flex pl-0 mb-3 font-weight-regular">
          Регистрация
        </v-card-title>
        <v-text-field
          class="w-100 font-weight-light"
          v-model="formData.lastName"
          label="Фамилия"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
        />
        <v-text-field
          class="w-100 font-weight-light"
          v-model="formData.firstName"
          label="Имя"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
        />
        <v-text-field
          class="w-100 font-weight-light"
          v-model="formData.email"
          label="Почта"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
        />
        <v-text-field
          class="w-100 mb-0 font-weight-light"
          label="Пароль"
          hint="Не менее 8 знаков: латинские буквы, цифры, спецсимволы"
          persistent
          :density="smAndUp ? 'comfortable' : 'compact'"
          variant="outlined"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="formData.password"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        />
        <v-text-field
          class="w-100 mb-0 font-weight-light"
          label="Повторите пароль"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="formData.password"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        />
        <v-card-text class="w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light ">
          Уже есть аккаунт? &nbsp <router-link to="/login">Войдите </router-link>
        </v-card-text>
        <p v-if="message" class="mt-2">{{ message }}</p>
          <v-btn
            class="text-none mb-2 w-100 font-weight-thin"
            text="Создать профиль"
            type="submit"
            :density="mdAndDown ? 'compact' : 'comfortable'"
            :disabled="isButtonDisabled"
            @click="result"
          />
        <v-card
          class="info-card d-flex align-center mt-3 bg-color-none"
          rounded="xm"
          variant="outlined"
        >
          <v-icon class="info-icon ml-5" color="black">
            mdi-information-outline
          </v-icon>
          <v-card-text class="info--card font-weight-light">
            Создавая профиль, нажимая на кнопку, вы даёте согласие на обработку персональных данных
            и рассылку информационных сообщений
            <a href="https://www.consultant.ru/document/cons_doc_LAW_61801/" class="link">
              согласно закону</a> О персональных данных от 27.07.2006 №152-ФЗ
          </v-card-text>
        </v-card>
      </form>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { AuthService } from '@/app/features/auth/model/Auth'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { mdAndDown, smAndDown, sm, smAndUp } = useDisplay()

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
  background-color: #FAFAFA;
  align-items: center;
  min-height: 100vh;
}

a {
  color: #000000;
}

.main-container {
  display: flex;
  align-items: center;
  align-self:center;
  justify-content: center;

}

.v-btn {
  background-color: #302E2F;
  color: white;
  height: 5vh;
  font-size: 1rem;
}


.v-card-text {
  font-size: 0.8rem;
}

.responsive-image {
  width: 100%;
  height: 100vh;
  max-width: 60vw;
  min-width: 0vw;
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
