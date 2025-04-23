<template>
  <v-dialog v-model="dialog" max-width="800" persistent transition="dialog-bottom-transition">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center py-3">
        <span class="font-weight-regular">Создание нового курса</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="px-3 pt-0">
        <v-container class="py-2">
          <v-row dense>
            <!-- Основная информация -->
            <v-col cols="12" class="mb-2">
              <h3 class="font-weight-regular mb-2">Основная информация</h3>
              <v-row dense>
                <v-col cols="12" md="8">
                  <v-text-field
                    class="font-weight-light"
                    v-model="newCourse.title"
                    label="Название курса*"
                    required
                    :error-messages="titleError ? 'Название обязательно' : ''"
                    variant="outlined"
                    density="compact"
                    @blur="validateTitle"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    class="font-weight-light"
                    v-model="newCourse.price"
                    label="Цена*"
                    type="number"
                    required
                    :error-messages="priceError ? 'Цена должна быть больше 0' : ''"
                    suffix="₽"
                    variant="outlined"
                    density="compact"
                    @blur="validatePrice"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <!-- Настройки (перенесено из вкладки настройки) -->
            <v-col cols="12" class="mb-2">
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-select
                    class="font-weight-light"
                    v-model="newCourse.difficulty"
                    :items="difficultyOptions"
                    item-title="text"
                    item-value="value"
                    label="Сложность курса*"
                    required
                    variant="outlined"
                    density="compact"
                    :error-messages="difficultyError ? 'Выберите сложность курса' : ''"
                    @blur="validateDifficulty"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    class="font-weight-light"
                    v-model="newCourse.status"
                    :items="statusOptions"
                    item-title="text"
                    item-value="value"
                    label="Статус курса*"
                    required
                    variant="outlined"
                    density="compact"
                    :error-messages="statusError ? 'Выберите статус курса' : ''"
                    @blur="validateStatus"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>

            <!-- Описание курса -->
            <v-col cols="12" class="mb-2">
              <h3 class="font-weight-regular mb-2">Описание курса</h3>
              <v-textarea
                class="font-weight-light"
                v-model="newCourse.description"
                label="Описание"
                rows="3"
                auto-grow
                variant="outlined"
                density="compact"
                hint="Опишите, чему научатся студенты на вашем курсе"
                persistent-hint
              ></v-textarea>
            </v-col>

            <!-- Изображение курса -->
            <v-col cols="12" class="mb-2">
              <h3 class="font-weight-regular mb-2">Изображение курса</h3>
              <v-row dense>
                <v-col cols="12" md="6">
                  <input 
                    type="file" 
                    accept="image/*" 
                    style="display: none"
                    @change="onFileSelected"
                    ref="fileInputRef"
                  >
                  <v-btn 
                    variant="outlined" 
                    @click="openFileDialog"
                    class="mb-2 font-weight-light text-none"
                    density="comfortable"
                  >
                    Выбрать изображение
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6" v-if="newCourse.imageUrl || newCourse.imageFile">
                  <v-hover v-slot="{ isHovering, props }">
                    <div class="image-preview-container" v-bind="props">
                      <v-img
                        :src="fixImageUrl(newCourse.imageUrl || newCourse.imageFile)"
                        max-height="160"
                        cover
                        class="rounded-lg"
                      ></v-img>
                      <div v-if="isHovering" class="image-preview-overlay">
                        <v-btn icon size="small" color="error" @click="clearImage">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-hover>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn
          class="text-none"
          color="grey"
          variant="outlined"
          @click="closeDialog"
          density="comfortable"
        >
          Отмена
        </v-btn>
        <v-btn
          class="text-none"
          variant="outlined"
          color="black"
          @click="saveCourse"
          :loading="loading"
          :disabled="!isFormValid"
          density="comfortable"
        >
          Создать
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';

// Определяем интерфейс для курса
interface Course {
  id?: string | number;
  courseId?: string | number;
  title: string;
  price: number;
  description: string;
  difficulty: string;
  status: string;
  imageUrl: string;
  imageFile: File | null;
}

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'save']);

const dialog = ref(props.modelValue);
const fileInputRef = ref<HTMLInputElement | null>(null);
const imageFile = ref<File | null>(null);
const loading = ref(false);

// Состояние для валидации
const titleError = ref(false);
const priceError = ref(false);
const difficultyError = ref(false);
const statusError = ref(false);

const difficultyOptions = [
  { text: 'Высокая', value: 'HIGH' },
  { text: 'Средняя', value: 'MEDIUM' },
  { text: 'Низкая', value: 'LOW' }
];

const statusOptions = [
  { text: 'Активный', value: 'ACTIVE' },
  { text: 'В ожидании', value: 'PENDING' }
];

const defaultCourse: Course = {
  id: undefined,
  courseId: undefined,
  title: '',
  price: 0,
  description: '',
  difficulty: 'MEDIUM',
  status: 'PENDING',
  imageUrl: '',
  imageFile: null
};

const newCourse = ref<Course>({...defaultCourse});

// Функции валидации
const validateTitle = () => {
  titleError.value = !newCourse.value.title;
};

const validatePrice = () => {
  priceError.value = !newCourse.value.price || newCourse.value.price <= 0;
};

const validateDifficulty = () => {
  difficultyError.value = !newCourse.value.difficulty;
};

const validateStatus = () => {
  statusError.value = !newCourse.value.status;
};

const validateAll = () => {
  validateTitle();
  validatePrice();
  validateDifficulty();
  validateStatus();
};

// Проверка валидности формы
const isFormValid = computed(() => {
  return newCourse.value.title && 
         newCourse.value.price > 0 &&
         newCourse.value.difficulty &&
         newCourse.value.status;
});

watch(() => props.modelValue, (val) => {
  dialog.value = val;
});

watch(dialog, (val) => {
  emit('update:modelValue', val);
});

const closeDialog = () => {
  dialog.value = false;
  newCourse.value = {...defaultCourse};
  imageFile.value = null;
  resetValidation();
};

const resetValidation = () => {
  titleError.value = false;
  priceError.value = false;
  difficultyError.value = false;
  statusError.value = false;
};

const fixImageUrl = (url: string | File | null): string => {
  if (!url) return '';
  
  if (url instanceof File) {
    return URL.createObjectURL(url);
  }
  
  // Исправляем различные варианты дублирования протокола
  return url.replace(/https:\/\/https\/\//, 'https://')
            .replace(/https:\/\/https:\/\//, 'https://')
            .replace(/^\/\//, 'https://');
};

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    imageFile.value = file;
    handleImageUpload(file);
  }
};

const handleImageUpload = (file: File | null): void => {
  if (file) {
    // Создаем URL для предпросмотра
    const imageUrl = URL.createObjectURL(file);
    newCourse.value.imageUrl = imageUrl;
    newCourse.value.imageFile = file;
  } else {
    newCourse.value.imageUrl = '';
    newCourse.value.imageFile = null;
  }
};

const openFileDialog = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};

const clearImage = () => {
  newCourse.value.imageUrl = '';
  newCourse.value.imageFile = null;
  imageFile.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};

const saveCourse = async () => {
  validateAll();
  
  if (!isFormValid.value) {
    return;
  }

  loading.value = true;
  try {
    emit('save', {...newCourse.value});
    closeDialog();
  } catch (error) {
    console.error('Ошибка при сохранении курса:', error);
    alert('Не удалось сохранить курс. Попробуйте еще раз.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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
</style>
