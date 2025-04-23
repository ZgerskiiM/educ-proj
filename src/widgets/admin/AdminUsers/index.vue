<template>
  <div :class="{ 'mobile-layout': mdAndDown }">
    <h2 class="font-weight-regular mb-4">Список пользователей</h2>
    
    <div class="d-flex flex-wrap gap-3 mb-6">
      <v-btn 
        color="black" 
        class="text-none font-weight-light"
        variant="outlined"
        :size="mdAndDown ? 'small' : 'default'"
        :class="{'text-body-2': mdAndDown}"
        @click="showNewAdminDialog">
        Добавить администратора
      </v-btn>
      
      <v-btn 
        color="black" 
        class="text-none font-weight-light"
        variant="outlined"
        :size="mdAndDown ? 'small' : 'default'"
        :class="{'text-body-2': mdAndDown}"
        @click="showGrantAccessDialog">
        Дать доступ к курсу
      </v-btn>
    </div>

    <v-text-field
      v-model="userSearch"
      append-inner-icon="mdi-magnify"
      label="Поиск пользователя"
      single-line
      hide-details
      variant="outlined"
      density="compact"
      class="mb-4 search-field font-weight-light"
    ></v-text-field>

    <!-- Предупреждение о демо-данных -->
    <v-alert
      v-if="isDemoMode"
      type="info"
      variant="tonal"
      closable
      class="mb-4"
    >
      <strong>Демо-режим:</strong> Отображаются тестовые данные, так как API недоступен. Некоторые функции могут не работать.
    </v-alert>

    <v-card class="mb-6" v-if="false">
      <v-card-text>
        <v-row class="py-2 px-6" :class="{ 'py-1 px-2': mdAndDown }">
            <v-text-field
              v-model="userSearch"
              label="Поиск пользователей"
              prepend-inner-icon="mdi-magnify"
              hide-details
              outlined
              density="compact"
              class="compact-field"
            ></v-text-field>
        </v-row>
      </v-card-text>
    </v-card>
    <v-data-table
          :headers="userHeaders"
          :items="users || []"
          :search="userSearch"
          :loading="isLoading"
          :items-per-page="itemsPerPage"
          :page.sync="page"
          :footer-props="{
            'items-per-page-options': [5, 10, 15, 20],
            'items-per-page-text': 'Строк на странице'
          }"
          height="500"
          fixed-header
          :class="['elevation-1', 'font-weight-light', 'users-table', { 'mobile-table': mdAndDown }]"
      >
      <template v-slot:item.email="{ item }">
        {{ item.email }}
      </template>
      <template v-slot:item.firstName="{ item }">
        {{ item.firstName || '—' }}
      </template>
      <template v-slot:item.lastName="{ item }">
        {{ item.lastName || '—' }}
      </template>
      <template v-slot:item.displayName="{ item }">
        {{ item.displayName || '—' }}
      </template>
      <template v-slot:item.phone="{ item }">
        {{ item.phone || '—' }}
      </template>
      <template v-slot:item.registrationDate="{ item }">
        {{ formatDate(item.registrationDate) }}
      </template>
      <template v-slot:item.role="{ item }">
        <v-chip
          :color="getRoleColor(item.role)"
          size="small"
        >
          {{ getRoleText(item.role) }}
        </v-chip>
      </template>
    </v-data-table>

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

<!-- Диалог подтверждения удаления пользователя -->
<v-dialog v-model="deleteDialogOpen" max-width="400">
  <v-card>
    <v-card-title class="text-h5">Подтверждение удаления</v-card-title>
    <v-card-text>
      Вы уверены, что хотите удалить пользователя "{{ userToDelete?.email }}"? Это действие нельзя отменить.
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="grey darken-1" text @click="deleteDialogOpen = false">Отмена</v-btn>
      <v-btn color="red darken-1" text @click="deleteUser">Удалить</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
import AddAdminButton from '@/features/user/AddAdminButton.vue';
import UsersFilter from '@/features/user/UsersFilter.vue';
import UsersTable from '@/entities/User/ui/UsersTable.vue';
import GrantAccessDialog from '@/features/course/GrantAccessDialog.vue';
import { getUserService } from '@/shared/api/getUserService.ts';

const { mdAndDown } = useDisplay();

// Состояние диалога добавления админа
const newAdminDialogOpen = ref(false);
const newAdminEmail = ref('');

// Пагинация
const page = ref(1);
const itemsPerPage = ref(mdAndDown.value ? 5 : 10);

// Определение заголовков таблицы
const userHeaders = computed(() => {
  const headers = [
    { text: 'Email', value: 'email', width: mdAndDown.value ? '30%' : null },
    { text: 'Имя', value: 'firstName', width: mdAndDown.value ? '20%' : null },
    { text: 'Фамилия', value: 'lastName', width: mdAndDown.value ? '20%' : null },
    { text: 'Роль', value: 'role', width: mdAndDown.value ? '15%' : null },
    { text: 'Действия', value: 'actions', sortable: false, width: mdAndDown.value ? '15%' : null }
  ];
  
  return headers;
});

// Данные для редактирования и удаления
const userToEdit = ref(null);
const userToDelete = ref(null);
const deleteDialogOpen = ref(false);
const editDialogOpen = ref(false);

// Функция для редактирования пользователя
const editUser = (user) => {
  userToEdit.value = { ...user };
  editDialogOpen.value = true;
  console.log('Редактирование пользователя:', user);
  // Здесь можно добавить логику для открытия диалога редактирования
};

// Функция для подтверждения удаления пользователя
const confirmDeleteUser = (user) => {
  userToDelete.value = { ...user };
  deleteDialogOpen.value = true;
  console.log('Подтверждение удаления пользователя:', user);
};

// Функция для удаления пользователя
const deleteUser = async () => {
  try {
    if (isDemoMode.value) {
      showInfo('В демо-режиме удаление пользователей недоступно');
      deleteDialogOpen.value = false;
      return;
    }
    
    if (!userToDelete.value || !userToDelete.value.id) {
      showError('Ошибка: пользователь не содержит ID');
      return;
    }

    isLoading.value = true;
    await getUserService.deleteUser(userToDelete.value.id);
    
    // Удаляем пользователя из списка
    users.value = users.value.filter(user => user.id !== userToDelete.value.id);
    
    showSuccess('Пользователь успешно удален');
    deleteDialogOpen.value = false;
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    showError('Ошибка при удалении пользователя: ' + (error.response?.data?.message || error.message));
  } finally {
    isLoading.value = false;
  }
};

// Функция для получения цвета метки роли
const getRoleColor = (role) => {
  switch (role) {
    case 'ADMIN': return 'red';
    case 'TEACHER': return 'indigo';
    case 'STUDENT': return 'success';
    default: return 'success';
  }
};

// Функция для получения текста роли
const getRoleText = (role) => {
  switch (role) {
    case 'ADMIN': return 'Администратор';
    case 'TEACHER': return 'Преподаватель';
    case 'USER': return 'Пользователь';
    default: return role || 'Неизвестно';
  }
};

// Функция для открытия диалога добавления админа
const showNewAdminDialog = () => {
  newAdminEmail.value = '';
  newAdminDialogOpen.value = true;
};

// Функция для назначения пользователя администратором
const makeAdmin = async (email) => {
  try {
    if (isDemoMode.value) {
      showInfo('В демо-режиме эта функция недоступна');
      return;
    }
    
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

  if (isDemoMode.value) {
    showInfo('В демо-режиме добавление администраторов недоступно');
    newAdminDialogOpen.value = false;
    return;
  }

  await makeAdmin(newAdminEmail.value);
  newAdminDialogOpen.value = false;
};

// Функция для удаления прав администратора
const removeAdmin = async (email) => {
  try {
    if (isDemoMode.value) {
      showInfo('В демо-режиме эта функция недоступна');
      return;
    }
    
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
const isDemoMode = ref(false);
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
    isDemoMode.value = false;
    
    try {
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
          console.warn('Данные не содержат массив:', response);
          users.value = getDemoUsers();
          isDemoMode.value = true;
        }
      } else {
        console.warn('Неизвестный формат ответа:', response);
        users.value = getDemoUsers();
        isDemoMode.value = true;
      }
    } catch (error) {
      console.warn('Ошибка при загрузке пользователей, использую демо-данные:', error);
      users.value = getDemoUsers();
      isDemoMode.value = true;
    }
    
  } catch (error) {
    console.error('Критическая ошибка при загрузке пользователей:', error);
    users.value = [];
    showError('Не удалось загрузить список пользователей');
  } finally {
    isLoading.value = false;
  }
};

// Генерация демо-данных для тестирования интерфейса
const getDemoUsers = () => {
  return [
    {
      id: 1,
      email: 'admin@example.com',
      firstName: 'Иван',
      lastName: 'Петров',
      displayName: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      registrationDate: '2023-01-15',
      role: 'ADMIN'
    },
    {
      id: 2,
      email: 'teacher@example.com',
      firstName: 'Мария',
      lastName: 'Иванова',
      displayName: 'Мария Иванова',
      phone: '+7 (999) 987-65-43',
      registrationDate: '2023-02-20',
      role: 'TEACHER'
    },
    {
      id: 3,
      email: 'student@example.com',
      firstName: 'Алексей',
      lastName: 'Смирнов',
      displayName: 'Алексей Смирнов',
      phone: '+7 (999) 456-78-90',
      registrationDate: '2023-03-10',
      role: 'STUDENT'
    },
    {
      id: 4,
      email: 'student2@example.com',
      firstName: 'Екатерина',
      lastName: 'Васильева',
      displayName: 'Екатерина Васильева',
      phone: '+7 (999) 111-22-33',
      registrationDate: '2023-04-05',
      role: 'STUDENT'
    },
    {
      id: 5,
      email: 'support@example.com',
      firstName: 'Сергей',
      lastName: 'Козлов',
      displayName: 'Сергей Козлов',
      phone: '+7 (999) 555-44-33',
      registrationDate: '2023-05-12',
      role: 'ADMIN'
    }
  ];
};

// Функция для применения фильтров
const applyFilters = () => {
  // Логика фильтрации реализована в компоненте таблицы
  console.log('Применение фильтров:', { search: userSearch.value, role: userRole.value });
};

// Функция для просмотра деталей пользователя
const viewUserDetails = (user) => {
  console.log('Просмотр деталей пользователя:', user);
  // Здесь можно добавить логику для отображения деталей пользователя
};

const showGrantAccessDialog = () => {
  if (isDemoMode.value) {
    showInfo('В демо-режиме предоставление доступа к курсам недоступно');
    return;
  }
  
  selectedUserEmail.value = '';
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

const showInfo = (text) => {
  snackbar.value = {
    show: true,
    text,
    color: 'info'
  };
};

// Функция форматирования даты
const formatDate = (dateString) => {
  if (!dateString) return '—';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Ошибка при форматировании даты:', error);
    return dateString || '—';
  }
};
</script>

<style scoped>
.mobile-layout h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.search-field {
  max-width: 400px;
}

.mobile-layout .v-btn {
  font-size: 0.8125rem;
}

.mobile-layout .v-icon {
  font-size: 18px;
}

.mobile-layout h1 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.mobile-layout .v-card {
  border-radius: 0.25rem;
}

.mobile-table {
  font-size: 0.85rem;
}

.gap-3 {
  gap: 0.75rem;
}

.users-table {
  height: auto !important; 
}

.compact-field {
  height: 40px;
}

.smaller-text {
  font-size: 0.85rem;
}
</style>
