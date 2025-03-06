<template>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Редактирование курса</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="localCourse.title"
                  label="Название*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="localCourse.blockId"
                  label="ID блока"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="localCourse.description"
                  label="Описание"
                  rows="3"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="localCourse.videoUrl"
                  label="URL видео"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="localCourse.sheetUrl"
                  label="URL материалов"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="closeDialog">
            Отмена
          </v-btn>
          <v-btn color="blue-darken-1" text @click="updateCourse">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    modelValue: Boolean,
    course: Object
  });

  const emit = defineEmits(['update:modelValue', 'update']);

  const dialog = ref(props.modelValue);

  // Инициализация с пустыми данными для редактирования (структура для PUT)
  const defaultEditData = {
    id: 0,
    blockId: 0,
    title: '',
    description: '',
    videoUrl: '',
    sheetUrl: ''
  };

  const localCourse = ref({...defaultEditData});

  watch(() => props.modelValue, (val) => {
    dialog.value = val;
    if (val && props.course) {
      // Копируем существующие данные и дополняем структурой для редактирования
      // Примечание: В реальном приложении вы бы загрузили детали для редактирования через отдельный API
      localCourse.value = {
        id: props.course.id,
        blockId: 0, // Заполнить из данных, если есть
        title: props.course.title,
        description: '', // Заполнить из данных, если есть
        videoUrl: '', // Заполнить из данных, если есть
        sheetUrl: '' // Заполнить из данных, если есть
      };
    }
  });

  watch(dialog, (val) => {
    emit('update:modelValue', val);
  });

  const closeDialog = () => {
    dialog.value = false;
  };

  const updateCourse = () => {
    // Проверка обязательных полей
    if (!localCourse.value.title) {
      alert('Пожалуйста, заполните название курса');
      return;
    }

    emit('update', {...localCourse.value});
    closeDialog();
  };
  </script>
