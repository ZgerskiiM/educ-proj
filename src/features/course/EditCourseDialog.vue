<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title>
        <span >Редактирование курса</span>
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

            <draggable
        v-if="!loadingBlocks"
        v-model="blocks"
        item-key="id"
        handle=".drag-handle"
        @end="onBlockOrderChanged"
        :animation="200"
      >
        <template #item="{element: block}">
          <v-list-item
            :title="block.title"
            lines="two"
          >
            <template v-slot:prepend>
              <div class="d-flex align-center">
                <v-icon class="drag-handle mr-2 cursor-move">mdi-drag</v-icon>
                <v-avatar rounded>
                  <v-img :src="fixImageUrl(block.imageFile) || '/images/default-block.jpg'" />
                </v-avatar>
              </div>
            </template>

            <template v-slot:append>
              <div class="d-flex">
                <v-btn icon size="small" class="mr-2" @click="editBlockHandler(block)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon size="small" @click="deleteBlockConfirm(block)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-list-item>
        </template>
      </draggable>

      <!-- Сообщение, если блоков нет -->
      <div v-if="!loadingBlocks && blocks.length === 0" class="text-center my-5">
        <p>У этого курса пока нет блоков</p>
      </div>
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
              <v-btn
                v-if="blockImageFile && editedBlock.id"
                color="primary"
                size="small"
                @click="uploadBlockImageNow"
                :loading="uploadingBlockImage"
                class="mt-2"
              >
                Загрузить изображение
              </v-btn>
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

  <!-- Диалог для редактирования блока -->
  <v-dialog v-model="showEditBlockDialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Редактирование блока</span>
      </v-card-title>
      <v-tabs v-model="blockEditTab">
        <v-tab value="blockInfo">Информация</v-tab>
        <v-tab value="lessons">Уроки</v-tab>
      </v-tabs>

      <v-window v-model="blockEditTab">
        <!-- Вкладка с информацией о блоке -->
        <v-window-item value="blockInfo">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedBlock.title"
                    label="Название блока*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="editBlockImageFile"
                    label="Новое изображение блока"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    @update:model-value="handleEditBlockImageUpload"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
            <small>* обязательные поля</small>
          </v-card-text>
        </v-window-item>

        <!-- Вкладка с уроками -->
        <v-window-item value="lessons">
          <v-card-text>
            <!-- Форма добавления урока -->
            <v-container>
              <h4 class="mb-3">Добавить урок</h4>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="newLesson.title"
                    label="Название урока*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="newLesson.description"
                    label="Описание урока"
                    rows="3"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn
                    color="primary"
                    @click="addLesson"
                    :loading="addingLesson"
                    :disabled="!newLesson.title"
                  >
                    Добавить урок
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>

            <v-divider class="my-3"></v-divider>

            <!-- Список уроков -->
            <v-container>
              <h4 class="mb-3">Уроки блока</h4>

              <!-- Индикатор загрузки уроков -->
              <div v-if="loadingLessons" class="d-flex justify-center my-5">
                <v-progress-circular indeterminate></v-progress-circular>
              </div>

              <!-- Список уроков -->
              <draggable
      v-if="!loadingLessons"
      v-model="blockLessons"
      item-key="lessonId"
      handle=".lesson-drag-handle"
      @end="onLessonOrderChanged"
      :animation="200"
      class="bg-transparent"
      style="max-height: 30vh; overflow-y: auto;"
    >
      <template #item="{element: lesson}">
        <v-list-item :title="lesson.lessonTitle">
          <template v-slot:prepend>
            <v-icon class="lesson-drag-handle mr-2 cursor-move">mdi-drag</v-icon>
          </template>
          <template v-slot:append>
            <div class="d-flex">
              <v-btn icon size="small" class="mr-2" @click="editLessonHandler(lesson)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon size="small" @click="deleteLesson(lesson.id || lesson.lessonId)" :loading="deletingLesson === (lesson.id || lesson.lessonId)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </template>
        </v-list-item>
      </template>
    </draggable>

    <!-- Сообщение, если уроков нет -->
    <div v-if="!loadingLessons && blockLessons.length === 0" class="text-center my-5">
      <p>У этого блока пока нет уроков</p>
    </div>
  </v-container>

          </v-card-text>
        </v-window-item>
      </v-window>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" text @click="showEditBlockDialog = false">
          Отмена
        </v-btn>
        <v-btn color="blue-darken-1" text @click="updateBlock" :loading="updatingBlock">
          Сохранить
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
  <v-dialog v-model="showEditLessonDialog" max-width="600px">
  <v-card>
    <v-card-title>
      <span class="text-h5">Редактирование урока</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="editedLesson.newTitle"
              label="Название урока*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="editedLesson.newDescription"
              label="Описание урока"
              rows="3"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="editedLesson.newSheetUrl"
              label="URL дополнительных материалов"
            ></v-text-field>
          </v-col>

          <!-- Добавляем загрузку изображения урока -->
          <v-col cols="12">
            <v-file-input
              v-model="lessonImageFile"
              label="Изображение урока"
              accept="image/*"
              prepend-icon="mdi-camera"
            ></v-file-input>

            <!-- Кнопка для загрузки изображения -->
            <v-btn
              v-if="lessonImageFile"
              color="primary"
              size="small"
              @click="uploadLessonImageNow"
              :loading="uploadingLessonImage"
              class="mt-2"
            >
              Загрузить изображение
            </v-btn>
          </v-col>

          <!-- Добавляем загрузку видео -->
          <v-col cols="12">
            <v-file-input
              v-model="lessonVideoFile"
              label="Видео урока"
              accept="video/*"
              prepend-icon="mdi-video"
            ></v-file-input>

            <!-- Кнопка для загрузки видео -->
            <v-btn
              v-if="lessonVideoFile"
              color="primary"
              size="small"
              @click="uploadLessonVideoNow"
              :loading="uploadingLessonVideo"
              class="mt-2"
            >
              Загрузить видео
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <small>* обязательные поля</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" text @click="showEditLessonDialog = false">
        Отмена
      </v-btn>
      <v-btn color="blue-darken-1" text @click="updateLesson" :loading="updatingLesson">
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { courseService } from '@/shared/api/courseService';
import draggable from 'vuedraggable';


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
const showEditBlockDialog = ref(false);
const blockEditTab = ref('blockInfo');

// Состояние для блоков
const blocks = ref([]);
const loadingBlocks = ref(false);
const creatingBlock = ref(false);
const deletingBlock = ref(false);
const blockImageFile = ref(null);
const blockToDelete = ref(null);

// Состояние для редактирования блока
const editedBlock = ref({
  id: null,
  title: '',
  imageFile: '',
  courseId: null
});
const editBlockImageFile = ref(null);
const updatingBlock = ref(false);

// Состояние для уроков
const blockLessons = ref([]);
const loadingLessons = ref(false);
const newLesson = ref({
  title: '',
  description: '',
  blockId: null
});
const addingLesson = ref(false);
const deletingLesson = ref(null);

// Опции для селектов
const difficultyOptions = [
  { text: 'Высокая', value: 'HIGH' },
  { text: 'Средняя', value: 'MEDIUM' },
  { text: 'Низкая', value: 'LOW' }
];

const onBlockOrderChanged = async () => {
  try {
    console.log('Старый порядок блоков:', [...blocks.value]);

    // Явно создаем массив с нужными полями
    const reorderedBlocks = [];

    blocks.value.forEach((block, index) => {
      reorderedBlocks.push({
        id: parseInt(block.id, 10),   // Убедимся, что id - числовой
        order: index                  // index гарантированно числовой (0, 1, 2, ...)
      });
    });

    console.log('Новый порядок блоков для отправки:', reorderedBlocks);

    // Отправляем запрос
    await courseService.reorderBlocks(editedCourse.value.id, reorderedBlocks);
    alert('Порядок блоков успешно обновлен');
  } catch (error) {
    console.error('Ошибка при изменении порядка блоков:', error);
    alert('Не удалось обновить порядок блоков');
    // Восстанавливаем исходный порядок
    await fetchBlocks(editedCourse.value.id);
  }
};

// Обработчик изменения порядка уроков в блоке
const onLessonOrderChanged = async () => {
  try {
    const reorderedLessons = blockLessons.value.map((lesson, index) => ({
      id: lesson.lessonId || lesson.id,
      order: index
    }));

    await courseService.reorderLessons(editedBlock.value.id, reorderedLessons);
    // Можно добавить уведомление об успешном сохранении
  } catch (error) {
    console.error('Ошибка при изменении порядка уроков:', error);
    // Опционально: вернуть исходный порядок в случае ошибки
    await fetchLessons(editedBlock.value.id);
  }
};


const uploadingLessonImage = ref(false);
const uploadingLessonVideo = ref(false);

// Метод загрузки изображения урока
const uploadLessonImageNow = async () => {
  if (!lessonImageFile.value || !editedLesson.value.id) {
    alert('Выберите файл и убедитесь, что урок сохранен');
    return;
  }

  uploadingLessonImage.value = true;
  try {
    // Вызываем метод для загрузки изображения урока
    const response = await courseService.uploadLessonImage(editedLesson.value.id, lessonImageFile.value);
    console.log('Изображение урока загружено:', response);

    // Обновляем URL изображения в интерфейсе
    // Исправляем возможное дублирование протокола
    const imageUrl = fixImageUrl(response.imageUrl || response.url || response);
    editedLesson.value.lessonImage = imageUrl;

    // Обновляем изображение в списке уроков
    const lessonIndex = blockLessons.value.findIndex(l =>
      l.id === editedLesson.value.id || l.lessonId === editedLesson.value.id
    );
    if (lessonIndex !== -1) {
      blockLessons.value[lessonIndex].lessonImage = imageUrl;
    }

    alert('Изображение успешно загружено');
  } catch (error) {
    console.error('Ошибка при загрузке изображения урока:', error);
    alert('Ошибка при загрузке изображения: ' + error.message);
  } finally {
    uploadingLessonImage.value = false;
  }
};

// Метод загрузки видео урока
const uploadLessonVideoNow = async () => {
  if (!lessonVideoFile.value || !editedLesson.value.id) {
    alert('Выберите файл и убедитесь, что урок сохранен');
    return;
  }

  uploadingLessonVideo.value = true;
  try {
    // Вызываем метод для загрузки видео урока
    const response = await courseService.uploadLessonVideo(editedLesson.value.id, lessonVideoFile.value);
    console.log('Видео урока загружено:', response);

    alert('Видео успешно загружено');
  } catch (error) {
    console.error('Ошибка при загрузке видео урока:', error);
    alert('Ошибка при загрузке видео: ' + error.message);
  } finally {
    uploadingLessonVideo.value = false;
  }
};


const uploadingBlockImage = ref(false);

// Добавить функцию для явной загрузки изображения
const uploadBlockImageNow = async () => {
  if (!blockImageFile.value || !editedBlock.value.id) {
    alert('Выберите файл и убедитесь, что блок сохранен');
    return;
  }

  uploadingBlockImage.value = true;
  try {
    const response = await courseService.uploadBlockImage(editedBlock.value.id, blockImageFile.value);
    console.log('Изображение успешно загружено:', response);

    // Обновляем URL изображения в интерфейсе
    if (response.imageFile) {
      editedBlock.value.imageFile = response.imageFile;
    } else if (response.url) {
      editedBlock.value.imageFile = response.url;
    }

    alert('Изображение успешно загружено');
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    alert('Ошибка при загрузке изображения: ' + error.message);
  } finally {
    uploadingBlockImage.value = false;
  }
};

const statusOptions = [
  { text: 'Активный', value: 'ACTIVE' },
  { text: 'В ожидании', value: 'PENDING' },
  { text: 'Архивирован', value: 'ARCHIVED' }
];

// Данные курса - инициализация с дефолтными значениями
const editedCourse = ref({
  id: null,
  title: '',
  price: 0,
  difficulty: 'MEDIUM',
  status: 'PENDING',
  imageUrl: ''
});

// Новый блок
const newBlock = ref({
  title: '',
  courseId: null,
  imageUrl: ''
});

// Заполняем формы при открытии диалога
const initializeFormData = () => {
  // Заполняем форму курса текущими данными
  editedCourse.value = {
    id: props.course.courseId || props.course.id,
    title: props.course.title || '',
    price: props.course.price || 0,
    difficulty: props.course.difficulty || 'MEDIUM',
    status: props.course.status || 'PENDING',
    imageUrl: props.course.imageUrl || ''
  };

  // Инициализируем данные для нового блока
  newBlock.value.courseId = props.course.courseId || props.course.id;
}

// Вызываем инициализацию сразу при монтировании компонента
onMounted(() => {
  initializeFormData();
});

// Обновляем данные при изменении входящих пропсов
watch(() => props.course, (newCourse) => {
  if (newCourse) {
    // Заполняем данные формы
    editedCourse.value = {
      id: newCourse.courseId || newCourse.id,
      title: newCourse.title || '',
      price: newCourse.price || 0,
      difficulty: newCourse.difficulty || 'MEDIUM',
      status: newCourse.status || 'PENDING',
      imageUrl: newCourse.imageUrl || ''
    };

    // Обновляем courseId для нового блока
    newBlock.value.courseId = newCourse.courseId || newCourse.id;

    // Загружаем блоки если курс имеет ID
    const courseId = newCourse.courseId || newCourse.id;
    if (courseId) {
      fetchBlocks(courseId);
    }
  }
}, { deep: true });

// Следим за открытием/закрытием диалога
watch(() => props.modelValue, (val) => {
  dialog.value = val;
  if (val) {
    // Инициализируем данные при открытии диалога
    initializeFormData();

    const courseId = props.course.courseId || props.course.id;
    if (courseId) {
      fetchBlocks(courseId);
    }
  }
});

const uploadingEditBlockImage = ref(false);

// Метод для загрузки изображения при редактировании блока
const uploadEditBlockImageNow = async () => {
  if (!editBlockImageFile.value || !editedBlock.value.id) {
    alert('Выберите файл и убедитесь, что блок сохранен');
    return;
  }

  uploadingEditBlockImage.value = true;
  try {
    const response = await courseService.uploadBlockImage(editedBlock.value.id, editBlockImageFile.value);
    console.log('Изображение блока загружено:', response);

    // Исправляем URL перед установкой
    const imageUrl = fixImageUrl(response.imageUrl || response.url || response);
    editedBlock.value.imageUrl = imageUrl;

    alert('Изображение успешно загружено');
  } catch (error) {
    console.error('Ошибка при загрузке изображения блока:', error);
    alert('Ошибка при загрузке изображения: ' + error.message);
  } finally {
    uploadingEditBlockImage.value = false;
  }
};

const handleEditBlockImageUpload = () => {
  if (editBlockImageFile.value && editedBlock.value.id) {
    uploadEditBlockImageNow();
  }
};

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
    alert('Не удалось загрузить блоки курса');
  } finally {
    loadingBlocks.value = false;
  }
};

// Загрузка уроков блока
const fetchLessons = async (blockId) => {
  if (!blockId) return;

  loadingLessons.value = true;
  try {
    const response = await courseService.getLessonsByBlockId(blockId);
    blockLessons.value = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Ошибка при загрузке уроков:', error);
    alert('Не удалось загрузить уроки блока');
  } finally {
    loadingLessons.value = false;
  }
};

// Обработчик для редактирования блока
const editBlockHandler = (block) => {
  // Заполняем форму данными блока
  editedBlock.value = {
    id: block.id,
    title: block.title || '',
    imageUrl: block.imageUrl || '',
    courseId: block.courseId || editedCourse.value.id
  };

  // Сбрасываем файл изображения
  editBlockImageFile.value = null;

  // Устанавливаем ID блока для новых уроков
  newLesson.value.blockId = block.id;

  // Загружаем уроки блока
  fetchLessons(block.id);

  // Показываем диалог редактирования
  showEditBlockDialog.value = true;
  blockEditTab.value = 'blockInfo'; // Сбрасываем вкладку на первую
};

const fixImageUrl = (url) => {
  if (!url) return '';
  // Исправляем различные варианты дублирования протокола
  return url.replace(/https:\/\/https\/\//, 'https://')
            .replace(/https:\/\/https:\/\//, 'https://');
};

// Обновление блока
const updateBlock = async () => {
  if (!editedBlock.value.title) {
    alert('Введите название блока');
    return;
  }

  updatingBlock.value = true;
  try {
    // Обновляем блок
    const blockData = {
      id: editedBlock.value.id,
      title: editedBlock.value.title,
      courseId: editedBlock.value.courseId
    };



    let response;
    if (editBlockImageFile.value) {
      response = await courseService.updateBlockWithImage(blockData, editBlockImageFile.value);
    } else {
      response = await courseService.updateBlock(blockData.id, blockData);
    }

    // Обновляем блок в списке
    const index = blocks.value.findIndex(b => b.id === response.id);
    if (index !== -1) {
      blocks.value[index] = response;
    }

    // Закрываем диалог редактирования
    showEditBlockDialog.value = false;
  } catch (error) {
    console.error('Ошибка при обновлении блока:', error);
    alert('Не удалось обновить блок: ' + (error.response?.data?.message || error.message));
  } finally {
    updatingBlock.value = false;
  }
};

const showEditLessonDialog = ref(false);
const editedLesson = ref({
  id: null,
  newTitle: '',
  newDescription: '',
  newSheetUrl: '',
  videoUrl: '',
  lessonImage: ''
});
const lessonVideoFile = ref(null);
const lessonImageFile = ref(null);
const updatingLesson = ref(false);
const uploadingVideo = ref(false);
const uploadingImage = ref(false);

// Обработчик для редактирования урока
const editLessonHandler = async (lesson) => {
  // Получаем ID урока
  const lessonId = lesson.id || lesson.lessonId;

  // Инициализируем форму с базовыми данными урока
  editedLesson.value = {
    id: lessonId,
    newTitle: lesson.title || lesson.lessonTitle,
    newDescription: '',
    newSheetUrl: '',
    videoUrl: '',
    lessonImage: lesson.lessonImage || ''
  };

  // Загружаем детали урока
  try {
    const lessonDetails = await courseService.getLessonDetails(lessonId);

    // Обновляем форму с полными данными
    editedLesson.value = {
      ...editedLesson.value,
      newDescription: lessonDetails.description || '',
      newSheetUrl: lessonDetails.sheetUrl || '',
      videoUrl: lessonDetails.videoUrl || ''
    };

    // Показываем диалог редактирования
    showEditLessonDialog.value = true;
  } catch (error) {
    console.error('Ошибка при загрузке деталей урока:', error);
    alert('Не удалось загрузить детали урока');
  }
};

// Обработчик загрузки видео
const handleLessonVideoUpload = async () => {
  console.log('handleLessonVideoUpload вызван');
  console.log('Файл:', lessonVideoFile.value);
  console.log('ID урока:', editedLesson.value.id);

  if (!lessonVideoFile.value) {
    alert('Пожалуйста, выберите файл видео');
    return;
  }

  if (!editedLesson.value.id) {
    alert('ID урока не определен. Сначала сохраните урок.');
    return;
  }

  uploadingVideo.value = true;
  try {
    const response = await courseService.uploadLessonVideo(editedLesson.value.id, lessonVideoFile.value);
    console.log('Видео успешно загружено:', response);
    alert('Видео успешно загружено');

    // Обновляем данные урока, чтобы отобразить новое видео
    const updatedLessonDetails = await courseService.getLessonDetails(editedLesson.value.id);
    editedLesson.value.videoUrl = updatedLessonDetails.videoUrl;
  } catch (error) {
    console.error('Ошибка при загрузке видео:', error);
    alert('Не удалось загрузить видео. Проверьте консоль для деталей.');
  } finally {
    uploadingVideo.value = false;
  }
};

// Обработчик загрузки изображения
const handleLessonImageUpload = async () => {
  if (!lessonImageFile.value || !editedLesson.value.id) return;

  uploadingImage.value = true;
  try {
    await courseService.uploadLessonImage(editedLesson.value.id, lessonImageFile.value);
    alert('Изображение успешно загружено');
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    alert('Не удалось загрузить изображение');
  } finally {
    uploadingImage.value = false;
  }
};

// Обновление урока
// Обновление урока
const updateLesson = async () => {
  if (!editedLesson.value.newTitle) {
    alert('Введите название урока');
    return;
  }

  updatingLesson.value = true;
  try {
    // Обновляем основные данные урока, передавая blockId из компонента
    await courseService.updateLesson(
      editedLesson.value.id,
      {
        newTitle: editedLesson.value.newTitle,
        newDescription: editedLesson.value.newDescription,
        newSheetUrl: editedLesson.value.newSheetUrl
      },
      editedBlock.value.id // Передаем blockId из компонента
    );

    // Обновляем список уроков
    await fetchLessons(editedBlock.value.id);

    // Закрываем диалог
    showEditLessonDialog.value = false;
  } catch (error) {
    console.error('Ошибка при обновлении урока:', error);
    alert('Не удалось обновить урок: ' + (error.response?.data?.message || error.message));
  } finally {
    updatingLesson.value = false;
  }
};



watch(blockEditTab, (newTab) => {
  if (newTab === 'lessons' && editedBlock.value.id) {
    fetchLessons(editedBlock.value.id);
  }
});

// Добавление урока
const addLesson = async () => {
  if (!newLesson.value.title) {
    alert('Введите название урока');
    return;
  }



  addingLesson.value = true;
  try {
    const lessonData = {
      title: newLesson.value.title,
      description: newLesson.value.description || '',
      blockId: newLesson.value.blockId
    };

    await courseService.createLesson(lessonData);

    // Перезагружаем список уроков после добавления
    await fetchLessons(newLesson.value.blockId);

    // Сбрасываем форму
    newLesson.value.title = '';
    newLesson.value.description = '';
  } catch (error) {
    console.error('Ошибка при добавлении урока:', error);
    alert('Не удалось добавить урок: ' + (error.response?.data?.message || error.message));
  } finally {
    addingLesson.value = false;
  }
};

// Удаление урока
const deleteLesson = async (lessonId) => {
  if (!lessonId) return;

  deletingLesson.value = lessonId;
  try {
    await courseService.deleteLesson(lessonId);

    // Удаляем урок из списка
    blockLessons.value = blockLessons.value.filter(l => l.id !== lessonId);
  } catch (error) {
    console.error('Ошибка при удалении урока:', error);
    alert('Не удалось удалить урок: ' + (error.response?.data?.message || error.message));
  } finally {
    deletingLesson.value = null;
  }
};

// Закрытие диалога
const closeDialog = () => {
  dialog.value = false;
  // Сбрасываем загруженный файл изображения
  imageFile.value = null;
};

const saveCourse = async () => {
  loading.value = true;
  try {
    // Проверка обязательных полей
    if (!editedCourse.value.title || !editedCourse.value.price) {
      alert('Заполните все обязательные поля');
      loading.value = false;
      return;
    }

    // Передаем id курса первым параметром, а данные курса - вторым
    const response = await courseService.updateCourse(
      editedCourse.value.id,
      {
        courseId: editedCourse.value.id, // Добавляем courseId в данные
        title: editedCourse.value.title,
        price: editedCourse.value.price,
        difficulty: editedCourse.value.difficulty,
        status: editedCourse.value.status
      }
    );

    emit('update', response);
    closeDialog();
  } catch (error) {
    console.error("Ошибка при сохранении курса:", error);
  } finally {
    closeDialog();
    loading.value = false;
  }
};
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
      console.log('Изображение успешно загружено', response);
      // Обновляем URL изображения в форме
      editedCourse.value.imageFile = response.imageFile;
    })
    .catch(error => {
      console.error('Ошибка при загрузке изображения:', error);
      alert('Не удалось загрузить изображение');
    });
};

// Создание нового блока
const createBlock = async () => {
  if (!newBlock.value.title) {
    alert('Введите название блока');
    return;
  }

  // Проверяем ID курса перед отправкой
  const courseId = editedCourse.value.id;
  if (!courseId) {
    alert('Ошибка: ID курса не определен');
    return;
  }

  creatingBlock.value = true;
  try {
    // Создаем объект с данными блока
    const blockData = {
      title: newBlock.value.title,
      courseId: Number(courseId)
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
</script>

<style scoped>
.cursor-move {
  cursor: move;
}

.drag-handle, .lesson-drag-handle {
  cursor: grab;
}

.drag-handle:active, .lesson-drag-handle:active {
  cursor: grabbing;
}
</style>
