<template>
    <div>
      <div class="d-flex justify-space-between align-center mb-6">
        <h1 class="font-weight-regular">Управление курсами</h1>
        <v-btn
          color="#333132"
          prepend-icon="mdi-plus"
          @click="newCourseDialog = true"
        >
          Создать курс
        </v-btn>
      </div>

      <!-- Поиск и фильтры -->
      <v-card class="mb-6">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="courseSearch"
                label="Поиск курсов"
                prepend-inner-icon="mdi-magnify"
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="courseDifficulty"
                :items="difficultyOptions"
                label="Сложность"
                outlined
                dense
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn color="#333132" block @click="applyFilters">
                Применить
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Таблица курсов -->
      <v-data-table
            :headers="courseHeaders"
            :items="courses || []"
            :search="courseSearch"
            :loading="isLoading"
            :items-per-page="10"
            class="elevation-1"
        >
        <template v-slot:item.imageUrl="{ item }">
          <v-avatar rounded size="40">
            <v-img :src="item.imageUrl" alt="Course image"></v-img>
          </v-avatar>
        </template>

        <template v-slot:item.price="{ item }">
          {{ item.price }} ₽
        </template>

        <template v-slot:item.difficulty="{ item }">
          <v-chip
            :color="getDifficultyColor(item.difficulty)"
            small
          >
            {{ getDifficultyText(item.difficulty) }}
          </v-chip>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            small
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn icon small @click="editCourse(item)" class="mr-2">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small color="red" @click="confirmDeleteCourse(item)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <!-- Диалоговые окна -->
      <create-course-dialog
        v-model="newCourseDialog"
        @save="createCourse"
      />

      <edit-course-dialog
        v-model="editCourseDialog"
        :course="editedCourse"
        @update="updateCourse"
      />

      <!-- Диалог подтверждения удаления -->
      <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Подтверждение удаления</v-card-title>
          <v-card-text>
            Вы уверены, что хотите удалить курс "{{ courseToDelete?.title }}"? Это действие нельзя отменить.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" text @click="deleteDialog = false">Отмена</v-btn>
            <v-btn color="red darken-1" text @click="deleteCourse">Удалить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Индикатор загрузки -->
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

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
  import { ref, computed, onMounted } from 'vue';
  import { courseService } from '@/shared/api/courseService';
  import CreateCourseDialog from '@/features/course/CreateCourseDialog.vue';
  import EditCourseDialog from '@/features/course/EditCourseDialog.vue';

  // Состояние диалогов и фильтров
  const newCourseDialog = ref(false);
  const editCourseDialog = ref(false);
  const deleteDialog = ref(false);
  const courseSearch = ref('');
  const courseDifficulty = ref(null);

  // Состояние загрузки и уведомлений
  const isLoading = ref(false);
  const snackbar = ref({
    show: false,
    text: '',
    color: 'success'
  });

  // Данные для редактирования и удаления
  const editedCourse = ref({});
  const courseToDelete = ref(null);

  // Данные курсов
  const courses = ref([]);

  // Опции для выбора сложности
  const difficultyOptions = [
    { text: 'Все уровни', value: null },
    { text: 'Высокая', value: 'HIGH' },
    { text: 'Средняя', value: 'MEDIUM' },
    { text: 'Низкая', value: 'LOW' }
  ];

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
    await fetchCourses();
  });

  // Получение списка всех курсов
  const fetchCourses = async () => {
  try {
    isLoading.value = true;
    const response = await courseService.fetchAllCourses();

    if (Array.isArray(response)) {
      courses.value = response;
    } else if (response && typeof response === 'object') {
      // Проверяем различные структуры ответа API
      if (Array.isArray(response.content)) {
        courses.value = response.content;
      } else if (Array.isArray(response.items)) {
        courses.value = response.items;
      } else if (Array.isArray(response.data)) {
        courses.value = response.data;
      } else {
        // Если не нашли массив в ответе, устанавливаем пустой массив
        console.error('Данные не содержат массив:', response);
        courses.value = [];
      }
    } else {
      console.error('Неизвестный формат ответа:', response);
      courses.value = [];
    }
  } catch (error) {
    console.error('Ошибка при загрузке курсов:', error);
    courses.value = []; // Всегда устанавливаем пустой массив в случае ошибки
  } finally {
    isLoading.value = false;
  }
};

  // Применение фильтров
  const applyFilters = () => {
    // Здесь можно добавить логику для фильтрации на сервере, если API поддерживает
    console.log('Применяем фильтры');
  };

  // Получение цвета для отображения сложности
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'HIGH': return 'red';
      case 'MEDIUM': return 'orange';
      case 'LOW': return 'green';
      default: return 'grey';
    }
  };

  // Получение текста для отображения сложности
  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'HIGH': return 'Высокая';
      case 'MEDIUM': return 'Средняя';
      case 'LOW': return 'Низкая';
      default: return difficulty;
    }
  };

  // Получение цвета для отображения статуса
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'PENDING': return 'warning';
      case 'ARCHIVED': return 'error';
      default: return 'default';
    }
  };

  // Редактирование курса
  const editCourse = (course) => {
    editedCourse.value = { ...course };
    editCourseDialog.value = true;
  };

  // Подтверждение удаления курса
  const confirmDeleteCourse = (course) => {
    courseToDelete.value = course;
    deleteDialog.value = true;
  };

  // Создание нового курса
  const createCourse = async (course) => {
    try {
      isLoading.value = true;
      const newCourse = await courseService.createCourse(course);
      courses.value.push(newCourse);
      showSuccess('Курс успешно создан');
    } catch (error) {
      showError('Ошибка при создании курса: ' + (error.response?.data?.message || error.message));
    } finally {
      isLoading.value = false;
    }
  };

  // Обновление курса
  const updateCourse = async (updatedCourse) => {
    try {
      isLoading.value = true;
      const result = await courseService.updateCourse(updatedCourse.id, updatedCourse);

      // В зависимости от ответа API, вам может потребоваться обновить список курсов
      // или загрузить данные заново
      await fetchCourses();

      showSuccess('Курс успешно обновлен');
    } catch (error) {
      showError('Ошибка при обновлении курса: ' + (error.response?.data?.message || error.message));
    } finally {
      isLoading.value = false;
    }
  };

  // Удаление курса
  const deleteCourse = async () => {
    if (!courseToDelete.value) return;

    try {
      isLoading.value = true;
      await courseService.deleteCourse(courseToDelete.value.id);

      // Удаляем курс из списка
      courses.value = courses.value.filter(c => c.id !== courseToDelete.value.id);

      showSuccess('Курс успешно удален');
      deleteDialog.value = false;
    } catch (error) {
      showError('Ошибка при удалении курса: ' + (error.response?.data?.message || error.message));
    } finally {
      isLoading.value = false;
      courseToDelete.value = null;
    }
  };

  // Вспомогательные функции для уведомлений
  const showSuccess = (text) => {
    snackbar.value = {
      show: true,
      text: text,
      color: 'success'
    };
  };

  const showError = (text) => {
    snackbar.value = {
      show: true,
      text: text,
      color: 'error'
    };
  };
  </script>
