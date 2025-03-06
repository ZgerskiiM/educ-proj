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
  import { ref, onMounted } from 'vue';
  import AddAdminButton from '@/features/user/AddAdminButton.vue';
  import UsersFilter from '@/features/user/UsersFilter.vue';
  import UsersTable from '@/entities/user/ui/UsersTable.vue';
  import { getUserService } from '@/shared/api/getUserService.ts'

  const userSearch = ref('');
  const userRole = ref('Все роли');

  // Состояние загрузки и уведомлений
  const isLoading = ref(false);
  const snackbar = ref({
    show: false,
    text: '',
    color: 'success'
  });


  const users = ref([]);

  // Заголовки таблицы
  const courseHeaders = ref([
    { text: 'Изображение', value: 'imageUrl', sortable: false },
    { text: 'Название', value: 'title' },
    { text: 'Цена', value: 'price' },
    { text: 'Сложность', value: 'difficulty' },
    { text: 'Статус', value: 'status' },
    { text: 'Действия', value: 'actions', sortable: false }
  ]);

  // Загрузка курсов при монтировании компонента
  onMounted(async () => {
    await fetchUsers();
  });

  // Получение списка всех курсов
  const fetchUsers = async () => {
  try {
    isLoading.value = true;
    const response = await getUserService.fetchAllUsers();

    if (Array.isArray(response)) {
      users.value = response;
    } else if (response && typeof response === 'object') {
      // Проверяем различные структуры ответа API
      if (Array.isArray(response.content)) {
        users.value = response.content;
      } else if (Array.isArray(response.items)) {
        users.value = response.items;
      } else if (Array.isArray(response.data)) {
        users.value = response.data;
      } else {
        // Если не нашли массив в ответе, устанавливаем пустой массив
        console.error('Данные не содержат массив:', response);
        users.value = [];
      }
    } else {
      console.error('Неизвестный формат ответа:', response);
      users.value = [];
    }
  } catch (error) {
    console.error('Ошибка при загрузке курсов:', error);
    users.value = []; // Всегда устанавливаем пустой массив в случае ошибки
  } finally {
    isLoading.value = false;
  }
};


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
