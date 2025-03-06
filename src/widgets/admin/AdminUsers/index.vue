<template>
    <div>
      <div class="d-flex justify-space-between align-center mb-6">
        <h1 class="font-weight-regular">Управление пользователями</h1>
        <add-admin-button @click="openNewAdminDialog" />
      </div>

      <users-filter
        v-model:search="userSearch"
        v-model:role="userRole"
        @apply-filter="applyFilters"
        @grant-access="openGrantAccessDialog"
      />

      <users-table
        :users="users"
        :search="userSearch"
        @view-details="viewUserDetails"
        @remove-admin="removeAdmin"
        @make-admin="makeAdmin"
      />
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import AddAdminButton from '@/features/user/AddAdminButton.vue';
  import UsersFilter from '@/features/user/UsersFilter.vue';
  import UsersTable from '@/entities/user/ui/UsersTable.vue';

  const userSearch = ref('');
  const userRole = ref('Все роли');

  const users = ref([
    {
      id: 1,
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      avatar: '/images/avatars/user1.jpg',
      role: 'Администратор',
      registeredDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      avatar: '/images/avatars/user2.jpg',
      role: 'Пользователь',
      registeredDate: '2023-02-20'
    }
  ]);

  const openNewAdminDialog = () => {
    console.log('Opening new admin dialog');
  };

  const openGrantAccessDialog = () => {
    console.log('Opening grant access dialog');
  };

  const applyFilters = () => {
    console.log('Applying user filters');
  };

  const viewUserDetails = (user) => {
    console.log('View user details:', user.id);
  };

  const removeAdmin = (user) => {
    console.log('Remove admin role from user:', user.id);
  };

  const makeAdmin = (user) => {
    console.log('Make user an admin:', user.id);
  };
  </script>
