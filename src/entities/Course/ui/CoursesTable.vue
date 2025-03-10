<template>
    <v-data-table
      :headers="headers"
      :items="courses"
      :search="search"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.image="{ item }">
        <v-avatar rounded size="40">
          <v-img :src="item.image" alt="Course image"></v-img>
        </v-avatar>
      </template>
      <template v-slot:item.price="{ item }">
        <div v-if="item.discountPrice">
          <span class="text-decoration-line-through">{{ item.price }} ₽</span>
          <span class="ml-2 font-weight-bold">{{ item.discountPrice }} ₽</span>
        </div>
        <div v-else>
          {{ item.price }} ₽
        </div>
      </template>
      <template v-slot:item.status="{ item }">
        <status-chip :status="item.status" />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon small @click="$emit('view-stats', item)" class="mr-2">
          <v-icon small>mdi-chart-line</v-icon>
        </v-btn>
        <v-btn icon small @click="$emit('edit-course', item)" class="mr-2">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small @click="$emit('price-dialog', item)" class="mr-2">
          <v-icon small>mdi-currency-usd</v-icon>
        </v-btn>
        <v-btn icon small color="red" @click="$emit('delete-course', item)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </template>

  <script setup>
  import { ref } from 'vue';
  import StatusChip from '@/shared/ui/StatusChip.vue';

  defineProps({
    courses: Array,
    search: String
  });

  defineEmits(['view-stats', 'edit-course', 'price-dialog', 'delete-course']);

  const headers = ref([
    { text: 'Изображение', value: 'image', sortable: false },
    { text: 'Название', value: 'title' },
    { text: 'Категория', value: 'category' },
    { text: 'Цена', value: 'price' },
    { text: 'Статус', value: 'status' },
    { text: 'Записей', value: 'enrollments' },
    { text: 'Действия', value: 'actions', sortable: false }
  ]);
  </script>
