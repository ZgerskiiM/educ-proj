<template>
    <v-card class="profile--card border-md" flat rounded="xl" color="#FAFAFA">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" class="d-flex flex-column">
            <v-avatar size="160" class="mb-4">
              <v-img :src="modelValue.photo" alt="Фото профиля"></v-img>
            </v-avatar>
            <v-file-input
              v-if="isEditing"
              label="Изменить фото"
              accept="image/*"
              prepend-icon=""
              variant="outlined"
              density="compact"
              hide-details
              class="mb-2"
              style="max-width: 160px;"
              @update:model-value="handlePhotoUpload"
            ></v-file-input>
          </v-col>

          <v-col cols="12" md="8">
            <!-- Просмотр профиля -->
            <div v-if="!isEditing">
              <div class="d-flex justify-space-between align-center mb-4">
                <div class="">Личная информация</div>
                <v-btn
                  color="#31331"
                  prepend-icon="mdi-pencil"
                  size="small"
                  variant="text"
                  @click="isEditing = true"
                >
                  Редактировать
                </v-btn>
              </div>

              <v-list color="#FAFAFA">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon icon="mdi-account" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title>Имя</v-list-item-title>
                  <v-list-item-subtitle>{{ modelValue.name }}</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon icon="mdi-email" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ modelValue.email }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </div>

            <!-- Редактирование профиля -->
            <v-form v-else>
              <div class="d-flex justify-space-between align-center mb-4">
                <div class="">Редактирование профиля</div>
              </div>

              <v-text-field
                v-model="editedData.name"
                label="Имя"
                variant="outlined"
                class="mb-3"
                density="comfortable"
              ></v-text-field>

              <v-text-field
                v-model="editedData.email"
                label="Email"
                variant="outlined"
                class="mb-3"
                density="comfortable"
              ></v-text-field>

              <div class="d-flex gap-3 ga-2">
                <v-btn
                  color="#333132"
                  @click="saveChanges"
                >
                  Сохранить
                </v-btn>

                <v-btn
                  color="grey"
                  variant="outlined"
                  @click="cancelEditing"
                >
                  Отмена
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </template>

  <script setup>
  import { ref, computed } from 'vue';

  const props = defineProps({
    modelValue: { type: Object, required: true }
  });

  const emit = defineEmits(['update:modelValue']);

  const isEditing = ref(false);
  const editedData = ref({ ...props.modelValue });

  function handlePhotoUpload(file) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editedData.value.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  function saveChanges() {
    emit('update:modelValue', { ...editedData.value });
    isEditing.value = false;
  }

  function cancelEditing() {
    editedData.value = { ...props.modelValue };
    isEditing.value = false;
  }
  </script>
