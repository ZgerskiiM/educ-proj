<template>
  <v-card class="profile--card d-flex justify-center align-center align-md-center" rounded="xl">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4" class="d-flex flex-column justify-center align-center align-md-center">
          <v-avatar size="160" class="mb-2 mt-2">
            <v-img :src="modelValue.imageUrl" alt="Фото профиля"></v-img>
          </v-avatar>
          <v-file-input
            v-if="isEditing"
            label="Изменить фото"
            accept="image/*"
            prepend-icon=""
            variant="outlined"
            density="compact"
            hide-details
            class="mb-2 w-25 h-25"
            style="max-height: 50px;"
            @update:model-value="handlePhotoUpload"
          ></v-file-input>
        </v-col>

        <v-col cols="12" md="8">
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
                <v-list-item-subtitle>{{ modelValue.firstName }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon  class="mr-2"></v-icon>
                </template>
                <v-list-item-title>Фамилия</v-list-item-title>
                <v-list-item-subtitle>{{ modelValue.lastName }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-email" class="mr-2"></v-icon>
                </template>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{ modelValue.email }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <!-- Кнопка выхода из аккаунта -->
            <div class="d-flex justify-end mt-4">
              <v-btn
                color="error"
                variant="text"
                prepend-icon="mdi-logout"
                size="small"
                @click="logout"
              >
                Выйти из аккаунта
              </v-btn>
            </div>
          </div>

          <v-form v-else>
            <div class="d-flex justify-space-between align-center mb-4">
              <div class="">Редактирование профиля</div>
            </div>

            <v-text-field
              v-model="editedData.firstName"
              label="Имя"
              variant="outlined"
              class="mb-3"
              density="comfortable"
            ></v-text-field>

            <v-text-field
              v-model="editedData.lastName"
              label="Фамилия"
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
              disabled
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '@/app/features/auth/model/Auth';
import axios from 'axios';

const API_URL = 'http://localhost:8080';


const router = useRouter();
const props = defineProps({
  modelValue: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue', 'logout']);

const isEditing = ref(false);
const editedData = ref({ ...props.modelValue });

const getAuthToken = () => {
  return AuthService.getToken();
};

async function saveChanges() {
  try {
    // Получаем токен авторизации
    const token = getAuthToken();

    if (!token) {
      alert('Вы не авторизованы');
      return;
    }

    // 1. Сначала обновляем имя и фамилию
    await axios({
      method: 'POST',
      url: `${API_URL}/users/update-user`,
      params: {
        newFirstName: editedData.value.firstName,
        newLastName: editedData.value.lastName
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // 2. Если изображение было изменено, загружаем его
    if (imageChanged.value && imageFile.value) {
      const formData = new FormData();
      formData.append('file', imageFile.value);

      const photoResponse = await axios.post(
        `${API_URL}/users/me/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Обновляем URL изображения из ответа
      editedData.value.imageUrl = photoResponse.data.imageUrl;
    }

    // Обновляем модель в родительском компоненте
    emit('update:modelValue', { ...editedData.value });
    isEditing.value = false;
    alert('Профиль успешно обновлен');

  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    alert('Не удалось обновить профиль');
  }
}

// Для отслеживания изменения изображения
const imageFile = ref(null);
const imageChanged = ref(false);

// Обновленная функция загрузки фото
function handlePhotoUpload(file) {
  if (file) {
    imageFile.value = file;
    imageChanged.value = true;

    // Для предпросмотра
    const reader = new FileReader();
    reader.onload = (e) => {
      editedData.value.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function cancelEditing() {
  editedData.value = { ...props.modelValue };
  isEditing.value = false;
}

function logout() {
  // Очищаем токен из localStorage
  localStorage.removeItem('token');

  // Очищаем другие данные пользователя, если они есть
  localStorage.removeItem('user');

  // Emit событие для уведомления родительского компонента
  emit('logout');

  // Перенаправляем на страницу входа
  router.push('/login');
}
</script>
