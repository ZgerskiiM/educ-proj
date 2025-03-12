<template>
    <v-app-bar app color="#F48A21" dark>
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
      <div class="logo">
        <v-btn>
          <img src="/public/school_вектор_полный_w.png" class="logo__img" />
        </v-btn>
      </div>
      <v-toolbar-title>Панель администратора</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
              color="white"
              @click="handleProfileClick"
              class="profile-btn"
              variant="text"
            >
              <div class="d-flex align-center">
                <v-img
                  src="/user.png"
                  height="35"
                  width="35"
                  class="black-icon"
                ></v-img>
              </div>
            </v-btn>
    </v-app-bar>
  </template>

  <script setup>
  defineEmits(['toggle-drawer']);

  import { useRouter } from 'vue-router'

const router = useRouter()

const handleProfileClick = () => {
  router.push('/LK');
}
  </script>



  <style scoped>
  .logo__img {
    height: 30px;
  }

  .black-icon {
  filter: invert(1);
}
  </style>
