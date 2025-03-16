<template>
    <v-chip
      :color="getStatusColor(status)"
      small
    >
      {{ status }}
    </v-chip>
  </template>

  <script lang="ts" setup>
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
      default: return 'default';
    }
  };
  </script>
