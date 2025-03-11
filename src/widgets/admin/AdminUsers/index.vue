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

  <v-dialog v-model="newAdminDialogOpen" max-width="500px">
  <v-card>
    <v-card-title>Добавить нового администратора</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="newAdminEmail"
        label="Email пользователя"
        placeholder="user@example.com"
        :rules="[v => !!v || 'Email обязателен', v => /.+@.+\..+/.test(v) || 'Email должен быть корректным']"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="newAdminDialogOpen = false">Отмена</v-btn>
      <v-btn color="blue darken-1" text @click="addNewAdmin">Добавить</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddAdminButton from '@/features/user/AddAdminButton.vue';
import UsersFilter from '@/features/user/UsersFilter.vue';
import UsersTable from '@/entities/user/ui/UsersTable.vue';
import GrantAccessDialog from '@/features/course/GrantAccessDialog.vue';
import { getUserService } from '@/shared/api/getUserService.ts';


// Состояние диалога добавления админа
const newAdminDialogOpen = ref(false);
const newAdminEmail = ref('');

// Функция для открытия диалога добавления админа
const openNewAdminDialog = () => {
  newAdminEmail.value = '';
  newAdminDialogOpen.value = true;
};

// Функция для назначения пользователя администратором
const makeAdmin = async (email) => {
  try {
    isLoading.value = true;
    await getUserService.assignAdminRole(email);
    showSuccess(`Пользователь ${email} успешно назначен администратором`);
    await fetchUsers(); // Обновляем список пользователей
  } catch (error) {
    console.error('Ошибка при назначении администратора:', error);
    showError(`Не удалось назначить администратора: ${error.message || 'Неизвестная ошибка'}`);
  } finally {
    isLoading.value = false;
  }
};

// Функция для добавления нового администратора
const addNewAdmin = async () => {
  if (!newAdminEmail.value || !newAdminEmail.value.includes('@')) {
    showError('Пожалуйста, введите корректный email');
    return;
  }

  await makeAdmin(newAdminEmail.value);
  newAdminDialogOpen.value = false;
};

// Функция для удаления прав администратора
const removeAdmin = async (email) => {
  try {
    isLoading.value = true;
    await getUserService.removeAdminRole(email);
    showSuccess(`Права администратора успешно удалены у пользователя ${email}`);
    await fetchUsers(); // Обновляем список пользователей
  } catch (error) {
    console.error('Ошибка при удалении прав администратора:', error);
    showError(`Не удалось удалить права администратора: ${error.message || 'Неизвестная ошибка'}`);
  } finally {
    isLoading.value = false;
  }
};


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
