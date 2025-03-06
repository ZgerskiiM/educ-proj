<template>
    <v-data-table
      :headers="userHeaders"
      :items="users"
      :search="search"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.avatar="{ item }">
        <v-avatar size="40">
          <v-img :src="item.avatar" alt="User avatar"></v-img>
        </v-avatar>
      </template>

      <template v-slot:item.role="{ item }">
        <v-chip
          :color="item.role === 'Администратор' ? 'primary' : 'default'"
          small
        >
          {{ item.role }}
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon small @click="$emit('view-details', item)" class="mr-2">
          <v-icon small>mdi-eye</v-icon>
        </v-btn>
        <v-btn
          v-if="item.role === 'Администратор'"
          icon
          small
          color="#333132"
          @click="$emit('remove-admin', item)"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
        <v-btn
          v-else
          icon
          small
          color="#333132"
          @click="$emit('make-admin', item)"
        >
          <v-icon small>mdi-account-check</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </template>

  <script setup>
  import { ref } from 'vue';

  defineProps({
    users: Array,
    search: String
  });

  defineEmits(['view-details', 'remove-admin', 'make-admin']);

  const userHeaders = ref([
    { text: 'Аватар', value: 'avatar', sortable: false },
    { text: 'Имя', value: 'firstName' },
    { text: 'Имя', value: 'lastName' },
    { text: 'Email', value: 'email' },
    { text: 'Роль', value: 'role' },
    { text: 'Действия', value: 'actions', sortable: false }
  ]);
  </script>
