<template>
    <v-card rounded="lg" class="cabinet-card" elevation="1">
      <v-img
        :src="certificate.image"
        height="200"
        cover
        contain
        class="bg-grey-lighten-4 mb-5"
        :alt="`Сертификат: ${certificate.courseName}`"
      ></v-img>

      <v-card-title class="text-truncate">{{ certificate.courseName }}</v-card-title>

      <v-card-subtitle class="py-1">
        Выдан: {{ certificate.issueDate }}
      </v-card-subtitle>

      <v-card-actions class="mt-3">
        <v-btn
          color="#333132"
          prepend-icon="mdi-download"
          variant="tonal"
          size="small"
          @click="$emit('download', certificate.id)"
        >
          Скачать
        </v-btn>

        <v-btn
          color="#333132"
          prepend-icon="mdi-open-in-new"
          size="small"
          @click="$emit('open', certificate.id)"
        >
          Открыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

  <script setup>
  defineProps({
    certificate: { type: Object, required: true }
  });

  defineEmits(['download', 'open']);
  </script>
