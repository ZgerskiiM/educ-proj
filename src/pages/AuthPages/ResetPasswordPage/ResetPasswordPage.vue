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
        @submit.prevent="handleReset"
        class="align-md-center d-flex flex-column"
        :class="mdAndDown ? 'w-66' : 'w-50'"
      >
      <v-card-title class="align-md-center justify-center d-flex pl-0 pb-0 mb-3 font-weight-regular">
          Воccтановление
        </v-card-title>
      <v-img
      class="responsive-image-second"
      src="/school_вектор.png"
      height="15vh"
      v-show="sm"
      ></v-img>
        <v-text-field
          class="w-100 font-weight-light mb-3"
          v-model="formData.email"
          label="Почта"
          hint="Отправим ссылку восстановления
          на почту"
          persistent-hint
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
        />
        <v-card-text class="w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light ">
            Уже есть аккаунт? &nbsp <router-link to="login"> Войдите</router-link>
        </v-card-text>
        <p v-if="message" class="mt-2">{{ message }}</p>
          <v-btn
            class="text-none mb-2 w-100 font-weight-thin"
            type="submit"
            text="Отправить"
            :disabled="isButtonDisabled"
            flat
          />
      </form>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { AuthService } from '@/app/features/auth/model/Auth'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { mdAndDown, smAndDown, sm, smAndUp } = useDisplay()


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
    const result = await AuthService.resetRequest(formData.email)
    console.log('Данные для сервера:', result)
    router.push('/')
  } catch (error: any) {
    if (error.response) {
      console.log('Данные для сервера:', formData.email)
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
  return !formData.email
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
