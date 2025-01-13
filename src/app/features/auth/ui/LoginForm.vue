<template>
    <v-card
      class="auth-card d-flex flex-column justify-center align-md-center w-33 rounded-xl mt-10 pt-15 pb-10"
    >
      <div class="logo">
      </div>
      <form
        class="auth-form d-flex flex-column justify-center align-center w-66"
      >
        <v-text-field
          class="mt-12 w-100"
          v-model="formData.login"
          label="Логин"
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
        <v-btn class="mt-4 mb-6 w-100" type="submit">Войти</v-btn>
      </form>
    </v-card>
  </template>

  <script lang="ts" setup>
  import { ref, reactive} from "vue";

  const visible = ref<boolean>(false);


  const formData = reactive<FormData>({
    login: "",
    password: "",
  });

  interface FormData {
    login: string;
    password: string;
  }


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
