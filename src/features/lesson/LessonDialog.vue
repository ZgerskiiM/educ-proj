<template>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isNew ? 'Новый урок' : 'Редактирование урока' }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="localLesson.title"
                  label="Название урока*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="localLesson.description"
                  label="Описание урока"
                  rows="3"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="localLesson.order"
                  label="Порядковый номер*"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="localLesson.type"
                  :items="['Видео', 'Текст', 'Тест', 'Интерактив']"
                  label="Тип урока*"
                  required
                ></v-select>
              </v-col>

              <!-- Видео URL или загрузка, если тип "Видео" -->
              <v-col cols="12" v-if="localLesson.type === 'Видео'">
                <v-text-field
                  v-model="localLesson.videoUrl"
                  label="URL видео"
                ></v-text-field>
              </v-col>

              <!-- Содержание урока для типа "Текст" -->
              <v-col cols="12" v-if="localLesson.type === 'Текст'">
                <v-textarea
                  v-model="localLesson.content"
                  label="Содержание урока"
                  rows="10"
                ></v-textarea>
              </v-col>

              <!-- Материалы для скачивания -->
              <v-col cols="12">
                <v-file-input
                  v-model="localLesson.attachments"
                  label="Дополнительные материалы"
                  multiple
                  prepend-icon="mdi-paperclip"
                ></v-file-input>
              </v-col>

              <!-- Дополнительные настройки -->
              <v-col cols="12">
                <v-switch
                  v-model="localLesson.isFree"
                  label="Бесплатный урок"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="closeDialog">
            Отмена
          </v-btn>
          <v-btn color="blue-darken-1" text @click="saveLesson">
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
    lesson: Object,
    isNew: {
      type: Boolean,
      default: true
    }
  });

  const emit = defineEmits(['update:modelValue', 'save']);

  const dialog = ref(props.modelValue);
  const localLesson = ref({...props.lesson});

  watch(() => props.modelValue, (val) => {
    dialog.value = val;
    if (val) {
      localLesson.value = JSON.parse(JSON.stringify(props.lesson));
    }
  });

  watch(dialog, (val) => {
    emit('update:modelValue', val);
  });

  const closeDialog = () => {
    dialog.value = false;
  };

  const saveLesson = () => {
    // Проверка обязательных полей
    if (!localLesson.value.title || !localLesson.value.order) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    emit('save', {...localLesson.value});
    closeDialog();
  };
  </script>
