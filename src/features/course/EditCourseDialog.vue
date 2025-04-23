<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="font-weight-medium">Редактирование курса</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-tabs v-model="activeTab"  color="black">
          <v-tab class="font-weight-light" value="basic">Основная информация</v-tab>
          <v-tab class="font-weight-light" value="content">Содержание курса</v-tab>
          <v-tab class="font-weight-light" value="settings">Настройки</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <!-- Основная информация -->
          <v-window-item value="basic">
            <v-container class="py-4">
              <v-row>
                <!-- Основная информация -->
                <v-col cols="12">
                  <h3 class="font-weight-regular mb-4">Основная информация</h3>
                  <v-row>
                    <v-col cols="12" >
                      <v-text-field
                        class="font-weight-light"
                        v-model="editedCourse.title"
                        label="Название курса*"
                        required
                        :rules="[v => !!v || 'Название обязательно']"
                        variant="outlined"
                        density="comfortable"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        class="font-weight-light"
                        v-model="editedCourse.price"
                        label="Цена*"
                        type="number"
                        required
                        :rules="[v => !!v || 'Цена обязательна']"
                        suffix="₽"
                        variant="outlined"
                        density="comfortable"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- Описание курса -->
                <v-col cols="12" >
                  <h3 class="font-weight-regular mb-4">Описание курса</h3>
                  <v-textarea
                    class="font-weight-light"
                    v-model="editedCourse.description"
                    label="Описание"
                    rows="4"
                    auto-grow
                    variant="outlined"
                    density="comfortable"
                    hint="Опишите, чему научатся студенты на вашем курсе"
                    persistent-hint
                  ></v-textarea>
                </v-col>

                <!-- Изображение курса -->
                <v-col cols="12">
                  <h3 class="font-weight-regular mb-4">Изображение курса</h3>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-file-input
                        class="font-weight-light"
                        v-model="imageFile"
                        label="Загрузить изображение"
                        accept="image/*"
                        @update:model-value="handleImageUpload"
                        variant="outlined"
                        density="comfortable"
                        ref="fileInputRef"
                        @click:prepend="openFileDialog"
                        @change="onFileSelected"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" md="6" v-if="editedCourse.imageUrl || editedCourse.imageFile">
                      <div class="image-preview-container">
                        <v-img
                          :src="fixImageUrl(editedCourse.imageUrl || editedCourse.imageFile)"
                          max-height="200"
                          cover
                          class="rounded-lg"
                        ></v-img>
                        <div class="image-preview-overlay">
                          <v-btn icon @click="clearImage">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- Настройки курса -->
                <v-col cols="12">
                  <h3 class="font-weight-regular mb-4">Настройки курса</h3>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        class="font-weight-light"
                        v-model="editedCourse.status"
                        :items="statusOptions"
                        item-title="text"
                        item-value="value"
                        label="Статус курса*"
                        required
                        variant="outlined"
                        density="comfortable"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>

          <!-- Содержание курса -->
          <v-window-item value="content">
            <v-container class="py-4">
              <div class="d-flex justify-space-between align-center mb-4">
                <div class="d-flex align-center flex-column">
                <h3 class="font-weight-regular">Блоки курса</h3>

                  <v-text-field
                    v-model="blockSearch"
                    prepend-icon="mdi-magnify"
                    label="Поиск блоков"
                    single-line
                    hide-details
                    class="mr-4"
                    style="max-width: 300px;"
                  ></v-text-field>
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-plus"
                    @click="showNewBlockDialog = true"
                  >
                    Добавить блок
                  </v-btn>
                </div>
              </div>

              <v-progress-circular
                v-if="loadingBlocks"
                indeterminate
                class="d-flex mx-auto my-4"
              ></v-progress-circular>

              <draggable
                v-else
                v-model="filteredBlocks"
                item-key="id"
                handle=".drag-handle"
                @end="onBlockOrderChanged"
                :animation="200"
                class="blocks-list"
              >
                <template #item="{ element: block }">
                  <v-card class="mb-4">
                    <v-img
                      v-if="block.imageUrl || block.imageFile"
                      :src="fixImageUrl(block.imageUrl || block.imageFile)"
                      height="200"
                      cover
                      class="block-image"
                    >
                      <div class="d-flex fill-height flex-column justify-space-between">
                        <div class="d-flex justify-end pa-2">
                          <v-btn
                            icon
                            color="white"
                            class="elevation-2 mr-2 bg-dark-transparent"
                            @click="editBlockHandler(block)"
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn
                            icon
                            color="white"
                            class="elevation-2 bg-dark-transparent"
                            @click="deleteBlockConfirm(block)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </div>
                        <v-card-title class="text-white text-shadow">
                          {{ block.title }}
                        </v-card-title>
                      </div>
                    </v-img>
                    <v-card-title v-else class="d-flex align-center">
                      <v-icon class="drag-handle mr-2">mdi-drag</v-icon>
                      {{ block.title }}
                      <v-spacer></v-spacer>
                      <v-btn
                        icon
                        @click="editBlockHandler(block)"
                        class="mr-2"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        color="error"
                        @click="deleteBlockConfirm(block)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-list v-if="block.lessons && block.lessons.length > 0">
                        <v-list-item
                          v-for="lesson in block.lessons"
                          :key="lesson.id"
                          :title="lesson.title || lesson.lessonTitle"
                          :subtitle="lesson.description || lesson.lessonDescription"
                          class="lesson-item"
                        >
                          <template v-slot:prepend>
                            <v-avatar
                              size="40"
                              color="primary"
                              class="mr-3"
                            >
                              <v-icon>mdi-play-circle</v-icon>
                            </v-avatar>
                          </template>
                          <template v-slot:append>
                            <div class="d-flex align-center">
                              <v-chip
                                v-if="lesson.videoUrl"
                                size="small"
                                color="success"
                                class="mr-2"
                              >
                                <v-icon start size="small">mdi-video</v-icon>
                                Видео
                              </v-chip>
                              <v-chip
                                v-if="lesson.sheetUrl"
                                size="small"
                                color="info"
                                class="mr-2"
                              >
                                <v-icon start size="small">mdi-file-document</v-icon>
                                Материалы
                              </v-chip>
                              <v-btn
                                icon
                                @click="editLessonHandler(lesson)"
                                class="mr-2"
                              >
                                <v-icon>mdi-pencil</v-icon>
                              </v-btn>
                              <v-btn
                                icon
                                color="error"
                                @click="deleteLesson(lesson.id || lesson.lessonId)"
                              >
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </div>
                          </template>
                        </v-list-item>
                      </v-list>
                      <div v-else class="text-center py-4">
                        <p class="text-grey">В этом блоке пока нет уроков</p>
                      </div>
                      <v-btn
                        block
                        variant="text"
                        prepend-icon="mdi-plus"
                        @click="addLesson(block)"
                        class="mt-2"
                      >
                        Добавить урок
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </template>
              </draggable>
            </v-container>
          </v-window-item>

          <!-- Настройки -->
          <v-window-item value="settings">
            <v-container class="py-4">
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="editedCourse.status"
                    :items="statusOptions"
                    item-title="text"
                    item-value="value"
                    label="Статус курса*"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          variant="text"
          @click="closeDialog"
        >
          Отмена
        </v-btn>
        <v-btn
          color="primary"
          @click="saveCourse"
          :loading="saving"
          :disabled="!isFormValid"
        >
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
                ref="blockFileInputRef"
                @click:prepend="openBlockFileDialog"
                @change="onBlockImageSelected"
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
                    ref="editBlockFileInputRef"
                    @click:prepend="openEditBlockFileDialog"
                    @change="onEditBlockImageSelected"
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
      style="max-height: 20vh; overflow-y: auto;"
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

          <!-- Добавляем загрузку видео -->
          <v-col cols="12">
            <v-file-input
              v-model="lessonVideoFile"
              label="Видео урока"
              accept="video/*"
              prepend-icon="mdi-video"
              ref="lessonVideoInputRef"
              @click:prepend="openLessonVideoDialog"
              @change="onLessonVideoSelected"
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
import { ref, watch, onMounted, computed } from 'vue';
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
const activeTab = ref('basic');
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

// Добавляем состояние для поиска
const blockSearch = ref('');

// Добавляем вычисляемое свойство для фильтрации блоков
const filteredBlocks = computed(() => {
  if (!blockSearch.value) return blocks.value;
  
  const searchTerm = blockSearch.value.toLowerCase();
  return blocks.value.filter(block => 
    block.title.toLowerCase().includes(searchTerm)
  );
});

const onBlockOrderChanged = async () => {
  try {
    // Явно создаем массив с нужными полями
    const reorderedBlocks = [];
    blocks.value.forEach((block, index) => {
      reorderedBlocks.push({
        id: parseInt(block.id, 10),   // Убедимся, что id - числовой
        order: index                  // index гарантированно числовой (0, 1, 2, ...)
      });
    });
    await courseService.reorderBlocks(editedCourse.value.id, reorderedBlocks);
  } catch (error) {
    console.error('Ошибка при изменении порядка блоков:', error);
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
  } catch (error) {
    console.error('Ошибка при загрузке изображения урока:', error);
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
];

const editedCourse = ref({
  id: null,
  title: '',
  price: 0,
  difficulty: 'MEDIUM',
  status: 'PENDING',
  imageUrl: '',
  imageFile: ''
});

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
    imageUrl: props.course.imageUrl || '',
    imageFile: props.course.imageFile || ''
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
      imageUrl: newCourse.imageUrl || '',
      imageFile: newCourse.imageFile || ''
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
    
    // Загружаем уроки для каждого блока
    for (const block of blocks.value) {
      try {
        const lessons = await courseService.getLessonsByBlockId(block.id);
        block.lessons = Array.isArray(lessons) ? lessons : [];
      } catch (error) {
        console.error(`Ошибка при загрузке уроков для блока ${block.id}:`, error);
        block.lessons = [];
      }
    }
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
            .replace(/https:\/\/https:\/\//, 'https://')
            .replace(/^\/\//, 'https://');
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
    newDescription: lesson.description || lesson.lessonDescription,
    newSheetUrl: lesson.sheetUrl || '',
    videoUrl: lesson.videoUrl || '',
    lessonImage: lesson.lessonImage || ''
  };

  // Загружаем детали урока
  try {
    const lessonDetails = await courseService.getLessonDetails(lessonId);

    // Обновляем форму с полными данными
    editedLesson.value = {
      ...editedLesson.value,
      newDescription: lessonDetails.description || lessonDetails.lessonDescription || '',
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

// Обновление урока
const updateLesson = async () => {
  if (!editedLesson.value.newTitle) {
    alert('Введите название урока');
    return;
  }

  updatingLesson.value = true;
  try {
    // Обновляем урок
    await courseService.updateLesson(
      editedLesson.value.id,
      {
        title: editedLesson.value.newTitle,
        description: editedLesson.value.newDescription,
        sheetUrl: editedLesson.value.newSheetUrl
      }
    );

    // Обновляем список уроков в блоке
    const block = blocks.value.find(b => b.lessons.some(l => l.id === editedLesson.value.id));
    if (block) {
      await fetchBlocks(editedCourse.value.id);
    }

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
const addLesson = async (block) => {
  // Устанавливаем ID блока для нового урока
  newLesson.value.blockId = block.id;
  // Показываем диалог редактирования урока
  showEditLessonDialog.value = true;
  // Сбрасываем форму
  editedLesson.value = {
    id: null,
    newTitle: '',
    newDescription: '',
    newSheetUrl: '',
    videoUrl: '',
    lessonImage: ''
  };
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
        courseId: editedCourse.value.id,
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
// Обновляем функцию handleImageUpload
const handleImageUpload = async (file) => {
  if (!file) return;

  // Убедитесь, что у курса есть ID
  const courseId = editedCourse.value.id;
  if (!courseId) {
    alert('Ошибка: ID курса не определен');
    return;
  }

  try {
    const response = await courseService.uploadCourseImage(courseId, file);
    // Обновляем URL изображения в форме
    if (response.imageUrl) {
      editedCourse.value.imageUrl = response.imageUrl;
    } else if (response.url) {
      editedCourse.value.imageUrl = response.url;
    } else if (response.imageFile) {
      editedCourse.value.imageFile = response.imageFile;
    }
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    alert('Не удалось загрузить изображение');
  }
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

// Добавляем обработчик изменения вкладки
watch(activeTab, async (newTab) => {
  if (newTab === 'content' && editedCourse.value.id) {
    // Загружаем блоки и уроки при открытии вкладки "Содержание курса"
    await fetchBlocks(editedCourse.value.id);
  }
});
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

.blocks-list {
  max-height: 60vh;
  overflow-y: auto;
  padding: 8px;
}

.block-image {
  position: relative;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.lesson-item {
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: rgba(0, 0, 0, 0.02);
}

.lesson-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.rounded-lg {
  border-radius: 8px;
}

.image-preview-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.image-preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.bg-dark-transparent {
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(2px);
}
</style>
