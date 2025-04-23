<template>
    <v-data-table
      :headers="isMobile ? mobileHeaders : userHeaders"
      :items="users"
      :search="search"
      :items-per-page="itemsPerPage"
      :page.sync="page"
      :footer-props="{
        'items-per-page-options': [5, 10, 15, 20],
        'items-per-page-text': 'Строк на странице'
      }"
      height="500"
      fixed-header
      class="elevation-1 users-table"
    >
      <template v-slot:item.avatar="{ item }">
        <v-avatar size="40">
          <v-img :src="item.avatar" alt="User avatar"></v-img>
        </v-avatar>
      </template>

      <template v-slot:item.role="{ item }">
        <v-chip
          :color="item.role === 'Администратор' ? 'primary' : 'default'"
          :size="isMobile ? 'x-small' : 'small'"
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
          @click="$emit('remove-admin', item.email)"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
        <v-btn
          v-else
          icon
          small
          color="#333132"
          @click="$emit('make-admin', item.email)"
        >
          <v-icon small>mdi-account-check</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </template>

  <script lang="ts" setup>
  import { ref, computed } from 'vue';

  const props = defineProps({
    users: Array,
    search: String,
    isMobile: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    itemsPerPage: {
      type: Number,
      default: 10
    }
  });

  defineEmits(['view-details', 'remove-admin', 'make-admin', 'update:page']);

  const userHeaders = ref([
    { text: 'Аватар', value: 'avatar', sortable: false },
    { text: 'Имя', value: 'firstName' },
    { text: 'Фамилия', value: 'lastName' },
    { text: 'Email', value: 'email' },
    { text: 'Роль', value: 'role' },
    { text: 'Действия', value: 'actions', sortable: false }
  ]);

  // Упрощенные заголовки для мобильного вида
  const mobileHeaders = ref([
    { text: 'Аватар', value: 'avatar', sortable: false, width: '15%' },
    { text: 'Имя', value: 'firstName', width: '20%' },
    { text: 'Email', value: 'email', width: '30%' },
    { text: 'Роль', value: 'role', width: '15%' },
    { text: 'Действия', value: 'actions', sortable: false, width: '20%' }
  ]);
  </script>

<style scoped>
  .v-data-table :deep(.v-data-table__wrapper) {
    overflow-x: auto;
  }
  
  .users-table {
    height: auto !important;
  }
</style>
