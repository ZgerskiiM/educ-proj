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

    <!-- Диалог предоставления доступа -->
    <grant-access-dialog
      v-model="grantAccessDialogOpen"
      :email="selectedUserEmail"
      @access-granted="onAccessGranted"
    />

    <!-- Снэкбар для уведомлений -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddAdminButton from '@/features/user/AddAdminButton.vue';
import UsersFilter from '@/features/user/UsersFilter.vue';
import UsersTable from '@/entities/user/ui/UsersTable.vue';
import GrantAccessDialog from '@/features/course/GrantAccessDialog.vue';
import { getUserService } from '@/shared/api/getUserService.ts';

const userSearch = ref('');
const userRole = ref('Все роли');

// Состояние загрузки и уведомлений
const isLoading = ref(false);
const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
});

// Состояние диалога предоставления доступа
const grantAccessDialogOpen = ref(false);
const selectedUserEmail = ref('');

const users = ref([]);

// Загрузка пользователей при монтировании компонента
onMounted(async () => {
  await fetchUsers();
});

// Получение списка всех пользователей
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
        console.error('Данные не содержат массив:', response);
        users.value = [];
      }
    } else {
      console.error('Неизвестный формат ответа:', response);
      users.value = [];
    }
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
    users.value = [];
  } finally {
    isLoading.value = false;
  }
};

const openNewAdminDialog = () => {
  console.log('Opening new admin dialog');
};

const openGrantAccessDialog = (email = '') => {
  selectedUserEmail.value = email;
  grantAccessDialogOpen.value = true;
};

const onAccessGranted = ({ email, courseId, courseName }) => {
  showSuccess(`Доступ к курсу "${courseName}" успешно предоставлен пользователю ${email}`);
};



// Вспомогательные функции для отображения уведомлений
const showSuccess = (text) => {
  snackbar.value = {
    show: true,
    text,
    color: 'success'
  };
};

const showError = (text) => {
  snackbar.value = {
    show: true,
    text,
    color: 'error'
  };
};
</script>
