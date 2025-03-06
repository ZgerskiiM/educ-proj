<template>
    <v-data-table
      :headers="headers"
      :items="lessons"
      :items-per-page="5"
      class="elevation-1 mb-5"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon small @click="$emit('edit', item)" class="mr-2">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small color="red" @click="$emit('delete', item)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </template>

  <script setup>
  import { ref } from 'vue';

  defineProps({
    lessons: {
      type: Array,
      default: () => []
    }
  });

  defineEmits(['edit', 'delete']);

  const headers = ref([
    { text: 'Порядок', value: 'order' },
    { text: 'Название', value: 'title' },
    { text: 'Тип', value: 'type' },
    { text: 'Действия', value: 'actions', sortable: false }
  ]);
  </script>
