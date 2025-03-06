<template>
    <v-btn
      color="#333132"
      prepend-icon="mdi-account-plus"
      @click="$emit('click')"
    >
      Добавить администратора
    </v-btn>
  </template>

  <script setup>
  defineEmits(['click']);
  </script>
