<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Редактирование курса</span>
      </v-card-title>
      <v-tabs v-model="activeTab">
        <v-tab value="courseInfo">Информация о курсе</v-tab>
        <v-tab value="blocks">Блоки курса</v-tab>
      </v-tabs>

      <v-window v-model="activeTab">
        <!-- Вкладка с информацией о курсе -->
        <v-window-item value="courseInfo">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedCourse.title"
                    label="Название курса*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="editedCourse.price"
                    label="Цена (руб.)*"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="editedCourse.difficulty"
                    :items="difficultyOptions"
                    item-title="text"
                    item-value="value"
                    label="Сложность*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="editedCourse.status"
                    :items="statusOptions"
                    item-title="text"
                    item-value="value"
                    label="Статус*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="imageFile"
                    label="Загрузить новое изображение курса"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    @update:model-value="handleImageUpload"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
            <small>* обязательные поля</small>
          </v-card-text>
        </v-window-item>

        <!-- Вкладка с блоками курса -->
        <v-window-item value="blocks">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-4">
              <h3>Блоки курса</h3>
              <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                @click="showNewBlockDialog = true"
              >
                Добавить блок
              </v-btn>
            </div>

            <!-- Загрузка блоков -->
            <div v-if="loadingBlocks" class="d-flex justify-center my-5">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>

            <!-- Список блоков -->
            <v-list v-if="!loadingBlocks" class="bg-transparent">
              <v-list-item
                v-for="block in blocks"
                :key="block.id"
                :title="block.title"
                lines="two"
              >
                <template v-slot:prepend>
                  <v-avatar rounded>
                    <v-img :src="block.imageUrl || '/images/default-block.jpg'" />
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <v-btn icon size="small" @click="deleteBlockConfirm(block)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-list-item>

              <!-- Сообщение, если блоков нет -->
              <div v-if="blocks.length === 0" class="text-center my-5">
                <p>У этого курса пока нет блоков</p>
              </div>
            </v-list>
          </v-card-text>
        </v-window-item>
      </v-window>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" text @click="closeDialog">
          Отмена
        </v-btn>
        <v-btn color="blue-darken-1" text @click="saveCourse" :loading="loading">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Диалог для создания нового блока -->
  <v-dialog v-model="showNewBlockDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Добавление блока</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newBlock.title"
                label="Название блока*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="blockImageFile"
                label="Изображение блока"
                accept="image/*"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
        <small>* обязательные поля</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" text @click="showNewBlockDialog = false">
          Отмена
        </v-btn>
        <v-btn color="blue-darken-1" text @click="createBlock" :loading="creatingBlock">
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Диалог подтверждения удаления блока -->
  <v-dialog v-model="showDeleteBlockDialog" max-width="400px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Удаление блока</span>
      </v-card-title>
      <v-card-text>
        Вы уверены, что хотите удалить блок "{{ blockToDelete?.title }}"?
        Это действие нельзя отменить.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" text @click="showDeleteBlockDialog = false">
          Отмена
        </v-btn>
        <v-btn color="red" text @click="deleteBlock" :loading="deletingBlock">
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { courseService } from '@/shared/api/courseService';

const props = defineProps({
  modelValue: Boolean,
  course: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue', 'update']);

// Состояние диалогов и вкладок
const dialog = ref(props.modelValue);
const activeTab = ref('courseInfo');
const imageFile = ref(null);
const loading = ref(false);
const showNewBlockDialog = ref(false);
const showDeleteBlockDialog = ref(false);

// Состояние для блоков
const blocks = ref([]);
const loadingBlocks = ref(false);
const creatingBlock = ref(false);
const deletingBlock = ref(false);
const blockImageFile = ref(null);
const blockToDelete = ref(null);

// Новый блок
const newBlock = ref({
  title: '',
  courseId: props.course.id || 0,
  imageUrl: ''
});

// Опции для селектов
const difficultyOptions = [
  { text: 'Высокая', value: 'HIGH' },
  { text: 'Средняя', value: 'MEDIUM' },
  { text: 'Низкая', value: 'LOW' }
];

const statusOptions = [
  { text: 'Активный', value: 'ACTIVE' },
  { text: 'В ожидании', value: 'PENDING' },
  { text: 'Архивирован', value: 'ARCHIVED' }
];

// Данные курса
const editedCourse = ref({
  id: props.course.id,
  title: props.course.title || '',
  price: props.course.price || 0,
  difficulty: props.course.difficulty || 'MEDIUM',
  status: props.course.status || 'PENDING',
  imageUrl: props.course.imageUrl || ''
});

// Обновляем данные при изменении входящих пропсов
watch(() => props.course, (newCourse) => {
  if (newCourse && newCourse.id) {
    editedCourse.value = {
      id: newCourse.id,
      title: newCourse.title || '',
      price: newCourse.price || 0,
      difficulty: newCourse.difficulty || 'MEDIUM',
      status: newCourse.status || 'PENDING',
      imageUrl: newCourse.imageUrl || ''
    };

    // Обновляем courseId для нового блока
    newBlock.value.courseId = newCourse.id;

    // Загружаем блоки при открытии диалога
    fetchBlocks(newCourse.id);
  }
}, { deep: true });

watch(() => props.modelValue, (val) => {
  dialog.value = val;
  if (val && props.course.id) {
    fetchBlocks(props.course.id);
  }
});

watch(dialog, (val) => {
  emit('update:modelValue', val);
});

// Загрузка блоков курса
const fetchBlocks = async (courseId) => {
  if (!courseId) return;

  loadingBlocks.value = true;
  try {
    const response = await courseService.getBlocksByCourseId(courseId);
    blocks.value = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Ошибка при загрузке блоков:', error);
    showError('Не удалось загрузить блоки курса');
  } finally {
    loadingBlocks.value = false;
  }
};

// Создание нового блока
const createBlock = async () => {
  if (!newBlock.value.title) {
    alert('Введите название блока');
    return;
  }

  creatingBlock.value = true;
  try {
    // Создаем объект с данными блока
    const blockData = {
      title: newBlock.value.title,
      courseId: props.course.id
    };

    // Создаем блок с изображением, если оно есть
    let response;
    if (blockImageFile.value) {
      response = await courseService.createBlockWithImage(blockData, blockImageFile.value);
    } else {
      response = await courseService.createBlock(blockData);
    }

    // Добавляем новый блок в список
    blocks.value.push(response);

    // Сбрасываем форму
    newBlock.value.title = '';
    blockImageFile.value = null;

    showNewBlockDialog.value = false;
  } catch (error) {
    console.error('Ошибка при создании блока:', error);
    alert('Не удалось создать блок: ' + (error.response?.data?.message || error.message));
  } finally {
    creatingBlock.value = false;
  }
};

// Подготовка к удалению блока
const deleteBlockConfirm = (block) => {
  blockToDelete.value = block;
  showDeleteBlockDialog.value = true;
};

// Удаление блока
const deleteBlock = async () => {
  if (!blockToDelete.value || !blockToDelete.value.id) {
    alert('Ошибка: не указан ID блока для удаления');
    return;
  }

  deletingBlock.value = true;
  try {
    await courseService.deleteBlock(blockToDelete.value.id);

    // Удаляем блок из списка
    blocks.value = blocks.value.filter(b => b.id !== blockToDelete.value.id);

    showDeleteBlockDialog.value = false;
  } catch (error) {
    console.error('Ошибка при удалении блока:', error);
    alert('Не удалось удалить блок: ' + (error.response?.data?.message || error.message));
  } finally {
    deletingBlock.value = false;
    blockToDelete.value = null;
  }
};

// Загрузка изображения для курса
// Загрузка изображения для курса
// Загрузка изображения для курса
const handleImageUpload = () => {
  // Получаем файл из модели v-model
  const file = imageFile.value;

  if (!file) {
    console.log('Файл не выбран');
    return;
  }

  console.log('Загрузка файла:', file.name, 'размер:', file.size);

  // Убедитесь, что у курса есть ID
  const courseId = editedCourse.value.id;
  if (!courseId) {
    alert('Ошибка: ID курса не определен');
    return;
  }

  courseService.uploadCourseImage(courseId, file)
    .then(response => {
      console.log('Изображение загружено успешно:', response);
      // Обновляем URL изображения в форме
      editedCourse.value.imageUrl = response.imageUrl || response.url || response;
    })
    .catch(error => {
      console.error('Ошибка загрузки:', error);
      alert('Не удалось загрузить изображение');
    });
};

// Закрытие диалога
const closeDialog = () => {
  dialog.value = false;
  imageFile.value = null;
  activeTab.value = 'courseInfo';
};

// Сохранение данных курса
const saveCourse = async () => {
  // Проверка обязательных полей
  if (!editedCourse.value.title ||
      editedCourse.value.price === undefined ||
      !editedCourse.value.difficulty ||
      !editedCourse.value.status) {
    alert('Пожалуйста, заполните все обязательные поля');
    return;
  }

  loading.value = true;
  try {
    // Подготовка данных для отправки
    const courseToUpdate = {
      id: editedCourse.value.id,
      title: editedCourse.value.title,
      price: Number(editedCourse.value.price),
      difficulty: editedCourse.value.difficulty,
      status: editedCourse.value.status
    };

    // Добавляем imageUrl, если он есть и не загружается новое изображение
    if (editedCourse.value.imageUrl && !imageFile.value) {
      courseToUpdate.imageUrl = editedCourse.value.imageUrl;
    }

    // Если есть файл изображения, добавляем его
    if (imageFile.value) {
      courseToUpdate.imageFile = imageFile.value;
    }

    // Отправляем данные родительскому компоненту для сохранения
    emit('update', courseToUpdate);
    closeDialog();
  } catch (error) {
    console.error('Ошибка при подготовке данных курса:', error);
    alert('Не удалось обновить курс. Попробуйте еще раз.');
  } finally {
    loading.value = false;
  }
};

// Функция отображения ошибки (для примера)
const showError = (message) => {
  alert(message);
};
</script>
