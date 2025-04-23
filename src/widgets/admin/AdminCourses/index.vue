  <template>
  <div :class="{ 'mobile-layout': mdAndDown }">
    <h2 class="font-weight-regular mb-4">Список курсов</h2>
    
    <div class="d-flex flex-wrap gap-3 mb-6">
      <v-btn 
        color="black" 
        class="text-none font-weight-light"
        variant="outlined"
        :size="mdAndDown ? 'small' : 'default'"
        :class="{'text-body-2': mdAndDown}"
        @click="openDialog">
        Добавить курс
      </v-btn>
    </div>

    <v-text-field
      v-model="courseSearch"
      append-inner-icon="mdi-magnify"
      label="Поиск курса"
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
              v-model="courseSearch"
              label="Поиск курсов"
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
          :headers="courseHeaders"
          :items="courses || []"
          :search="courseSearch"
          :loading="isLoading"
          :items-per-page="itemsPerPage"
          :page.sync="page"
          :footer-props="{
            'items-per-page-options': [5, 10, 15, 20],
            'items-per-page-text': 'Строк на странице'
          }"
          height="500"
          fixed-header
          :class="['elevation-1', 'font-weight-light', 'courses-table', { 'mobile-table': mdAndDown }]"
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
          size="small"
        >
          {{ getStatusText(item.status) }}
        </v-chip>
      </template>
      <template v-slot:item.userCount="{ item }">
        {{ item.userCount || 0 }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn variant="oulined" icon density="compact" size="40" @click="editCourse(item)" class="mr-2 border-sm">
          <v-icon size="small" class="bg-transparent">mdi-pencil</v-icon>
        </v-btn>
        <v-btn variant="oulined" icon density="compact" size="40" color="red" @click="confirmDeleteCourse(item)" class="border">
          <v-icon size="small" class="bg-transparent">mdi-delete</v-icon>
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
import { useDisplay } from 'vuetify';
import { courseService } from '@/shared/api/courseService';
import CreateCourseDialog from '@/features/course/CreateCourseDialog.vue';
import EditCourseDialog from '@/features/course/EditCourseDialog.vue';

const { mdAndDown } = useDisplay();

// Состояние диалогов и фильтров
const newCourseDialog = ref(false);
const editCourseDialog = ref(false);
const deleteDialog = ref(false);
const courseSearch = ref('');

// Пагинация
const page = ref(1);
const itemsPerPage = ref(mdAndDown.value ? 5 : 10);

// Состояние загрузки и уведомлений
const isLoading = ref(false);
const isDemoMode = ref(false);
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


// Обновленные заголовки таблицы - только нужные поля
const courseHeaders = computed(() => {
  const headers = [
    { text: 'Название', value: 'title', width: "30vw" },
    { text: 'Цена', value: 'price', width: mdAndDown.value ? '20%' : null },
    { text: 'Статус', value: 'status', width: mdAndDown.value ? '20%' : null },
  ];
  
  if (!mdAndDown.value) {
    headers.push({ text: 'Количество пользователей', value: 'userCount' });
  }
  
  headers.push({ text: 'Действия', value: 'actions', sortable: false, width: mdAndDown.value ? '30%' : null });
  
  return headers;
});

// Загрузка курсов при монтировании компонента
onMounted(async () => {
  await fetchCourses();
});

// Получение списка всех курсов
const fetchCourses = async () => {
  try {
    isLoading.value = true;
    isDemoMode.value = false;
    
    try {
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
          console.warn('Данные не содержат массив:', response);
          coursesData = getDemoCourses();
          isDemoMode.value = true;
        }
      } else {
        console.warn('Неизвестный формат ответа:', response);
        coursesData = getDemoCourses();
        isDemoMode.value = true;
      }

      // Проверяем наличие ID у каждого курса и выводим предупреждение, если ID отсутствует
      courses.value = coursesData.map(course => {
        if (course.courseId === undefined) {
          console.warn('Курс без ID:', course);
        }
        return course;
      });
    } catch (error) {
      console.warn('Ошибка при загрузке курсов, использую демо-данные:', error);
      courses.value = getDemoCourses();
      isDemoMode.value = true;
    }

  } catch (error) {
    console.error('Критическая ошибка при загрузке курсов:', error);
    courses.value = [];
    showError('Не удалось загрузить список курсов');
  } finally {
    isLoading.value = false;
  }
};

// Генерация демо-данных для тестирования интерфейса
const getDemoCourses = () => {
  return [
    {
      courseId: 1,
      title: 'Введение в вязание',
      price: 5000,
      status: 'ACTIVE',
      userCount: 45
    },
    {
      courseId: 2,
      title: 'Мастер-класс по шитью',
      price: 7500,
      status: 'ACTIVE',
      userCount: 32
    },
    {
      courseId: 3,
      title: 'Декорирование интерьера',
      price: 8900,
      status: 'PENDING',
      userCount: 0
    },
    {
      courseId: 4,
      title: 'Вязание для продвинутых',
      price: 9500,
      status: 'ACTIVE',
      userCount: 28
    },
    {
      courseId: 5,
      title: 'Старые техники шитья',
      price: 4500,
      status: 'ARCHIVED',
      userCount: 15
    }
  ];
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


const getStatusColor = (status) => {
  switch (status) {
    case 'ACTIVE': return 'success';
    case 'PENDING': return 'warning';
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
  // Создаем копию объекта курса
  const courseCopy = {...course};
  
  // Если courseId не определен, но есть id, используем id как courseId
  if (courseCopy.courseId === undefined && courseCopy.id !== undefined) {
    courseCopy.courseId = courseCopy.id;
  }

  if (!courseCopy || courseCopy.courseId === undefined) {
    showError('Ошибка: курс не содержит ID');
    console.error('Курс без ID:', course);
    return;
  }

  courseToDelete.value = courseCopy;
  deleteDialog.value = true;
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

// Создание нового курса
const createCourse = async (course) => {
  try {
    if (isDemoMode.value) {
      showInfo('В демо-режиме добавление курсов недоступно');
      newCourseDialog.value = false;
      return;
    }
    
    isLoading.value = true;
    // Создаем курс и получаем ответ сервера
    const newCourse = await courseService.createCourseWithImage(course, course.imageFile);
    // Важно! Добавляем новый курс в список с ID, полученным от сервера
    if (newCourse && newCourse.id !== undefined) {
      // Убедимся, что courseId также установлен
      if (newCourse.courseId === undefined) {
        newCourse.courseId = newCourse.id;
      }
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
    newCourseDialog.value = false;
  }
};

// Обновление существующего курса
const updateCourse = async (course) => {
  try {
    if (isDemoMode.value) {
      showInfo('В демо-режиме обновление курсов недоступно');
      editCourseDialog.value = false;
      return;
    }
    
    isLoading.value = true;
    // Обновляем курс и получаем ответ сервера
    const updatedCourse = await courseService.updateCourseWithImage(course, course.imageFile);
    
    // Находим индекс курса в массиве и обновляем его
    const index = courses.value.findIndex(c => c.id === course.id || c.courseId === course.courseId);
    if (index !== -1) {
      // Заменяем курс на обновленный
      courses.value[index] = updatedCourse || course;
      showSuccess('Курс успешно обновлен');
    } else {
      console.error('Курс не найден в списке:', course);
      showError('Ошибка: не удалось найти курс в списке');
      // Перезагружаем весь список
      await fetchCourses();
    }
  } catch (error) {
    console.error('Ошибка при обновлении курса:', error);
    showError('Ошибка при обновлении курса: ' + (error.response?.data?.message || error.message));
  } finally {
    isLoading.value = false;
    editCourseDialog.value = false;
  }
};

// Удаление курса
const deleteCourse = async () => {
  try {
    if (isDemoMode.value) {
      showInfo('В демо-режиме удаление курсов недоступно');
      deleteDialog.value = false;
      return;
    }
    
    if (!courseToDelete.value || courseToDelete.value.courseId === undefined) {
      throw new Error('Курс для удаления не содержит ID');
    }

    isLoading.value = true;
    await courseService.deleteCourse(courseToDelete.value.courseId);
    
    // Исправленная логика фильтрации - оставляем курсы, которые НЕ совпадают с удаляемым
    courses.value = courses.value.filter(course => {
      // Проверяем совпадение по id
      const idMatch = course.id !== undefined && 
                     courseToDelete.value.id !== undefined && 
                     course.id === courseToDelete.value.id;
      
      // Проверяем совпадение по courseId
      const courseIdMatch = course.courseId !== undefined && 
                           course.courseId === courseToDelete.value.courseId;
      
      // Оставляем курс только если он НЕ совпадает ни по id, ни по courseId
      return !idMatch && !courseIdMatch;
    });
    
    showSuccess('Курс успешно удален');
    deleteDialog.value = false;
  } catch (error) {
    console.error('Ошибка при удалении курса:', error);
    showError('Ошибка при удалении курса: ' + (error.response?.data?.message || error.message));
  } finally {
    isLoading.value = false;
  }
};

// Функция для открытия диалога добавления курса
const openDialog = () => {
  if (isDemoMode.value) {
    showInfo('В демо-режиме добавление курсов недоступно');
    return;
  }
  
  newCourseDialog.value = true;
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

.mobile-layout .v-card {
  border-radius: 0.25rem;
}

.mobile-table {
  font-size: 0.85rem;
}

.gap-3 {
  gap: 0.75rem;
}

.courses-table {
  height: auto !important; 
}

.compact-field {
  height: 40px;
}

.smaller-text {
  font-size: 0.85rem;
}
</style>
