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
        @submit.prevent="handleLogin"
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
          Вход
        </v-card-title>
        <v-text-field
          class="w-100 font-weight-light"
          v-model="formData.email"
          label="Логин"
          variant="outlined"
          :density="smAndUp ? 'comfortable' : 'compact'"
        />
        <v-text-field
          class="w-100 mb-0 font-weight-light"
          label="Пароль"
          :density="smAndUp ? 'comfortable' : 'compact'"
          variant="outlined"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="formData.password"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        />
        <v-card-text class="w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light ">
          Забыли пароль? &nbsp <router-link to="reset-password"> Восстановить</router-link>
        </v-card-text>
        <p v-if="message" class="mt-2">{{ message }}</p>
          <v-btn
            class="text-none mb-2 w-100 font-weight-thin"
            type="submit"
            text="Войти"
            :disabled="isButtonDisabled"
            flat
          />
          <v-btn
            class="text-none mb-2 w-100 font-weight-thin"
            type="submit"
            text="Создать аккаунт"
            @click="navigateToLogin()"
            flat
          />
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

const router = useRouter()

const visible = ref<boolean>(false)

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

const navigateToLogin = () => {
  router.push('/register')
}

const handleLogin = async () => {
  try {
    const result = await AuthService.login(formData.email, formData.password)
    localStorage.setItem('token', result.token)
    localStorage.setItem('expiresAt', result.expiresAt)
  } catch (error) {}
}

const isButtonDisabled = computed(() => {
  return !formData.email || !formData.password
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
