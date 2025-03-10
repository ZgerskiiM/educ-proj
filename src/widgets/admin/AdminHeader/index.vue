<template>
    <v-app-bar app color="#F48A21" dark>
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
      <div class="logo">
        <v-btn>
          <img src="/public/logo-another.png" class="logo__img" />
        </v-btn>
      </div>
      <v-toolbar-title>Панель администратора</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </template>

  <script setup>
  defineEmits(['toggle-drawer']);
  </script>

  <style scoped>
  .logo__img {
    height: 30px;
  }
  </style>
