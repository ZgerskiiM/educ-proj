<template>
  <v-dialog v-model="dialog" max-width="700px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Создание нового курса</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newCourse.title"
                label="Название курса*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newCourse.price"
                label="Цена (руб.)*"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="newCourse.chat"
                label="Ссылка на поддержку для блока"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                  v-model="newCourse.difficulty"
                  :items="difficultyOptions"
                  item-title="text"
                  item-value="value"
                  label="Сложность*"
                  required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="imageFile"
                label="Загрузить изображение курса"
                accept="image/*"
                prepend-icon="mdi-camera"
                @change="handleImageUpload"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
        <small>* обязательные поля</small>
      </v-card-text>
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
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'save']);

const dialog = ref(props.modelValue);
const imageFile = ref(null);
const loading = ref(false);

const difficultyOptions = [
  { text: 'Высокая', value: 'HIGH' },
  { text: 'Средняя', value: 'MEDIUM' },
  { text: 'Низкая', value: 'LOW' }
];

const defaultCourse = {
  title: '',
  price: 0,
  chat: null,
  difficulty: 'MEDIUM',
  status: 'PENDING',
  imageFile: null
};

const newCourse = ref({...defaultCourse});

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
};

const handleImageUpload = (file) => {
  if (file) {
    // Сохраняем файл для отправки на сервер
    newCourse.value.imageFile = file;
  } else {
    newCourse.value.imageFile = null;
  }
};

const saveCourse = async () => {
  // Проверка обязательных полей
  if (!newCourse.value.title || !newCourse.value.price) {
    alert('Пожалуйста, заполните все обязательные поля');
    return;
  }

  loading.value = true;
  try {
    // Прикрепляем файл изображения
    if (imageFile.value) {
      newCourse.value.imageFile = imageFile.value;
    }

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
