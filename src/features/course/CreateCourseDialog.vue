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
                <v-text-field
                  v-model="newCourse.imageUrl"
                  label="URL изображения"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="imageFile"
                  label="Загрузить изображение"
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
          <v-btn color="blue-darken-1" text @click="saveCourse">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    modelValue: Boolean
  });

  const emit = defineEmits(['update:modelValue', 'save']);

  const dialog = ref(props.modelValue);
  const imageFile = ref(null);

  const difficultyOptions = [
    { text: 'Высокая', value: 'HIGH' },
    { text: 'Средняя', value: 'MEDIUM' },
    { text: 'Низкая', value: 'LOW' }
  ];

  const defaultCourse = {
    title: '',
    price: 0,
    difficulty: 'MEDIUM',
    status: 'PENDING',
    imageUrl: ''
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
    // Здесь обычно загружаете изображение на сервер и получаете URL
    // Для примера, мы просто устанавливаем фиктивный URL
    if (file) {
      newCourse.value.imageUrl = URL.createObjectURL(file);
    }
  };

  const saveCourse = () => {
    // Проверка обязательных полей
    if (!newCourse.value.title || !newCourse.value.price) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    emit('save', {...newCourse.value});
    closeDialog();
  };
  </script>
