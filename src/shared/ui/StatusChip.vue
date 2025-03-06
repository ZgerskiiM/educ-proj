<template>
    <v-chip
      :color="getStatusColor(status)"
      small
    >
      {{ status }}
    </v-chip>
  </template>

  <script setup>
  defineProps({
    status: {
      type: String,
      required: true
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Опубликован': return 'success';
      case 'Черновик': return 'warning';
      case 'Архив': return 'error';
      default: return 'default';
    }
  };
  </script>
