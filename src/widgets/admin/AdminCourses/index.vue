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
    <v-card class="mb-6">
      <v-card-text>
        <v-row class="py-6 px-6">
            <v-text-field
              v-model="courseSearch"
              label="Поиск курсов"
              prepend-inner-icon="mdi-magnify"
              hide-details
              outlined
              dense
            ></v-text-field>
        </v-row>
      </v-card-text>
    </v-card>
    <v-data-table
          :headers="courseHeaders"
          :items="courses || []"
          :search="courseSearch"
          :loading="isLoading"
          :items-per-page="10"
          class="elevation-1"
      >
      <template v-slot:item.title="{ item }">
        {{ item.title }}
      </template>
      <template v-slot:item.price="{ item }">
        {{ item.price }} ₽
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="getStatusColor(item.status)"
          small
        >
          {{ getStatusText(item.status) }}
        </v-chip>
      </template>
      <template v-slot:item.userCount="{ item }">
        {{ item.userCount || 0 }}
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

// Обновленные заголовки таблицы - только нужные поля
const courseHeaders = ref([
  { text: 'Название', value: 'title' },
  { text: 'Цена', value: 'price' },
  { text: 'Сложность', value: 'difficulty' },
  { text: 'Статус', value: 'status' },
  { text: 'Количество пользователей', value: 'userCount' },
  { text: 'Действия', value: 'actions', sortable: false }
]);

// Загрузка курсов при монтировании компонента
onMounted(async () => {
  await fetchCourses();
});

// Получение списка всех курсов - оставляем как есть
const fetchCourses = async () => {
  try {
    isLoading.value = true;
    const response = await courseService.fetchAllCourses();

    let coursesData = [];

    if (Array.isArray(response)) {
      coursesData = response;
    } else if (response && typeof response === 'object') {
      if (Array.isArray(response.content)) {
        coursesData = response.content;
      } else if (Array.isArray(response.items)) {
        coursesData = response.items;
      } else if (Array.isArray(response.data)) {
        coursesData = response.data;
      } else {
        console.error('Данные не содержат массив:', response);
        coursesData = [];
      }
    }

    // Проверяем наличие ID у каждого курса и выводим предупреждение, если ID отсутствует
    courses.value = coursesData.map(course => {
      if (course.courseId === undefined) {
        console.warn('Курс без ID:', course);
      }
      return course;
    });

  } catch (error) {
    console.error('Ошибка при загрузке курсов:', error);
    courses.value = [];
  } finally {
    isLoading.value = false;
  }
};


// Вспомогательные функции
const getStatusText = (status) => {
  switch (status) {
    case 'ACTIVE': return 'Активный';
    case 'PENDING': return 'В ожидании';
    case 'ARCHIVED': return 'Архивирован';
    default: return status;
  }
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'HIGH': return 'red';
    case 'MEDIUM': return 'orange';
    case 'LOW': return 'green';
    default: return 'grey';
  }
};

const getDifficultyText = (difficulty) => {
  switch (difficulty) {
    case 'HIGH': return 'Высокая';
    case 'MEDIUM': return 'Средняя';
    case 'LOW': return 'Низкая';
    default: return difficulty;
  }
};

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

  if (!course || course.courseId === undefined) {
    showError('Ошибка: курс не содержит ID');
    console.error('Курс без ID:', course);
    return;
  }

  courseToDelete.value = {...course}; // Создаем копию объекта курса
  deleteDialog.value = true;
};

// Создание нового курса
const createCourse = async (course) => {
  try {
    isLoading.value = true;

    // Создаем курс и получаем ответ сервера
    const newCourse = await courseService.createCourseWithImage(course, course.imageFile);

    // Важно! Добавляем новый курс в список с ID, полученным от сервера
    if (newCourse && newCourse.id !== undefined) {
      // Добавляем курс в список без перезагрузки всего списка
      courses.value.push(newCourse);
      showSuccess('Курс успешно создан');
    } else {
      console.error('Сервер не вернул ID для созданного курса:', newCourse);
      showError('Ошибка: не удалось получить данные созданного курса');
      // Перезагружаем весь список курсов
      await fetchCourses();
    }
  } catch (error) {
    console.error('Ошибка при создании курса:', error);
    showError('Ошибка при создании курса: ' + (error.response?.data?.message || error.message));
  } finally {
    isLoading.value = false;
  }
};

// Обновление курса в родительском компоненте
const updateCourse = async (updatedCourse) => {
  try {
    if (!updatedCourse || updatedCourse.id === undefined) {
      showError('Ошибка: не указан ID курса для обновления');
      return;
    }

    isLoading.value = true;

    // Обновляем метод в courseService
    const result = await courseService.updateCourse(updatedCourse.id, updatedCourse);
    console.log('', result);

    // Обновляем список курсов
    await fetchCourses();

    showSuccess('Курс успешно обновлен');
  } catch (error) {
    console.error('Ошибка при обновлении курса:', error);
    showError('Ошибка при обновлении курса: ' + (error.response?.data?.message || error.message));
  } finally {
    isLoading.value = false;
  }
};
// Удаление курса
const deleteLoading = ref(false);


// Удаление курса - исправленная функция
// Функция для удаления курса
// Функция для удаления курса
// Удаление курса - исправленная функция
const deleteCourse = async () => {
  if (!courseToDelete.value) {
    showError('Ошибка: курс для удаления не выбран');
    return;
  }

  const courseId = courseToDelete.value.courseId;

  // Проверка ID
  if (!courseId) {
    console.error('Данные курса:', courseToDelete.value);
    showError('Ошибка: не указан ID курса для удаления');
    return;
  }

  try {
    isLoading.value = true;

    await courseService.deleteCourse(courseId);

    // Закрываем диалог
    deleteDialog.value = false;

    // Обновляем список курсов
    await fetchCourses();

    showSuccess('Курс успешно удален');
  } catch (error) {
    console.error('Ошибка при удалении курса:', error);
    showError('Не удалось удалить курс: ' + (error.response?.data?.message || error.message));
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
