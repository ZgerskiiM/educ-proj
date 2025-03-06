<template>
    <v-btn
      color="#333132"
      prepend-icon="mdi-plus"
      @click="$emit('click')"
    >
      Создать курс
    </v-btn>
  </template>

  <script setup>
  defineEmits(['click']);
  </script>
