<template>
<div v-if="!mdAndDown && !isEditing" class="desktop-buttons mt-2 mb-2 d-flex">
  <div class="d-flex">
    <v-btn
      class="profile-card--button font-weight-light text-none"
      variant="outlined"
      color="#333132"
      prepend-icon="mdi-pencil"
      @click="startEditing"
    >
      Редактировать
    </v-btn>
    <v-btn
      class="profile-card--button font-weight-light text-none ml-3"
      color="error"
      variant="outlined"
      prepend-icon="mdi-logout"
      @click="showLogoutDialog = true"
    >
      Выйти
    </v-btn>
  </div>

  <v-btn
    class="profile-card--button font-weight-light text-none ml-auto"
    color="primary"
    variant="outlined"
    prepend-icon="mdi-face-agent"
    href="https://t.me/babichbaker_course"
    target="_blank"
  >
    Связаться с поддержкой
  </v-btn>
</div>

  <v-card class="profile--card mb-5  rounded-xm">
    <v-card-text>
      <v-row>
        <v-col
          class="d-flex flex-column"
          :class="{
            'justify-center align-center': mdAndDown,
            'align-self-start': !mdAndDown
          }"
        >
          <v-avatar size="180" class="mb-2 mt-2" :class="{ 'align-self-start': !mdAndDown }">
            <v-img
              :src="(fixImageUrl(processImageUrl(modelValue.imageUrl)))"
              alt="Фото профиля"
              @error="handleImageError"
            ></v-img>
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
            :class="{ 'w-25 h-25': mdAndDown, 'max-width-250': !mdAndDown }"
            style="max-height: 50px;"
            @update:model-value="handlePhotoUpload"
          ></v-file-input>
        </v-col>

        <v-col cols="12" md="8">
          <div v-if="!isEditing">
            <div class="d-flex justify-space-between align-center mb-4">
              <div class="profile-card--text">Личная информация</div>
            </div>

            <v-list
              color="#FAFAFA"
              :class="{ 'pa-0 list-left-aligned': !mdAndDown }"
            >
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-account" class="mr-2"></v-icon>
                </template>
                <v-list-item-title>Имя</v-list-item-title>
                <v-list-item-subtitle>{{ modelValue.firstName }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-account-outline" class="mr-2"></v-icon>
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

            <!-- Кнопки только для мобильных устройств -->
            <div
              v-if="mdAndDown"
              class="mt-4 d-flex justify-end"
            >
              <v-btn
                class="profile-card--button font-weight-light text-none"
                color="#31331"
                prepend-icon="mdi-pencil"
                variant="outlined"
                @click="startEditing"
              >
                Редактировать
              </v-btn>
              <v-btn
                class="profile-card--button font-weight-light text-none ml-2"
                color="error"
                variant="outlined"
                prepend-icon="mdi-logout"
                @click="showLogoutDialog = true"
              >
                Выйти
              </v-btn>
            </div>
          </div>

          <v-form v-else>
            <div class="d-flex justify-space-between align-center mb-4">
              <div class="profile-card--text">Редактирование профиля</div>
            </div>

            <v-text-field
              v-model="editedData.firstName"
              label="Имя"
              variant="outlined"
              class="mb-1"
              density="compact"
            ></v-text-field>

            <v-text-field
              v-model="editedData.lastName"
              label="Фамилия"
              variant="outlined"
              class="mb-1"
              density="compact"
            ></v-text-field>

            <v-text-field
              v-model="editedData.email"
              label="Email"
              variant="outlined"
              class="mb-1"
              density="compact"
              disabled
            ></v-text-field>

            <div class="d-flex gap-3">
              <v-btn
                class="profile-card--button font-weight-light text-none"
                color="#333132"
                @click="saveChanges"
              >
                Сохранить
              </v-btn>

              <v-btn
                color="grey"
                variant="outlined"
                @click="cancelEditing"
                class="ml-2 profile-card--button font-weight-light text-none"
              >
                Отмена
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <!-- Кнопки под карточкой (только на десктопе) -->


  <!-- Диалог подтверждения выхода -->
  <v-dialog v-model="showLogoutDialog" max-width="400">
    <v-card>
      <v-card-title>Подтверждение</v-card-title>
      <v-card-text class="font-weight-light">Вы действительно хотите выйти из аккаунта?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        class="profile-card--button font-weight-light text-none"
        variant="outlined"
        text @click="showLogoutDialog = false">Отмена</v-btn>
        <v-btn
        variant="outlined"
        class="profile-card--button font-weight-light text-none"
        color="error" text @click="logout">Выйти</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { AuthService } from '@/app/features/auth/model/Auth';
import axios from 'axios';

const API_URL = 'http://localhost:8080';
const { mdAndDown } = useDisplay();

const router = useRouter();
const props = defineProps({
  modelValue: { type: Object, required: true }
});

const emit = defineEmits(['update:modelValue', 'logout']);

const isEditing = ref(false);
const editedData = ref({ ...props.modelValue });
const showLogoutDialog = ref(false);

const getAuthToken = () => {
  return AuthService.getToken();
};

function handleImageError(e) {
  e.target.src = '/default-avatar.jpg';
}

async function saveChanges() {
  try {
    const token = getAuthToken();
    if (!token) {
      alert('Вы не авторизованы');
      return;
    }

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

    if (imageChanged.value && imageFile.value) {
      const formData = new FormData();
      formData.append('image', imageFile.value);

      const photoResponse = await axios.post(
        `${API_URL}/users/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      editedData.value.imageUrl = photoResponse.data.imageUrl;
    }

    emit('update:modelValue', { ...editedData.value });
    isEditing.value = false;
    alert('Профиль успешно обновлен');

  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    alert('Не удалось обновить профиль');
  }
}

const processImageUrl = (url) => {
  if (!url) return '/default-avatar.jpg';
  if (url.startsWith('/')) return `${API_URL}${url}`;
  if (!url.startsWith('http://') && !url.startsWith('https://')) return `http://${url}`;
  return url;
};

const fixImageUrl = (url) => {
  if (!url) return '/public/default-lesson.jpg';
  let fixedUrl = url.replace(/https:\/\/https:\/\//g, 'https://');
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, 'https://');
  return fixedUrl;
};

watch(() => props.modelValue, (newValue) => {
  if (!isEditing.value) {
    editedData.value = { ...newValue };
  }
}, { deep: true });

function startEditing() {
  editedData.value = { ...props.modelValue };
  isEditing.value = true;
}

const imageFile = ref(null);
const imageChanged = ref(false);

function handlePhotoUpload(file) {
  if (file) {
    imageFile.value = file;
    imageChanged.value = true;

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
  showLogoutDialog.value = false;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  emit('logout');
  router.push('/login');
}
</script>

<style scoped>
.profile-card--text {
  font-size: 1.1rem;
}

.profile-card--button {
  font-size: 0.9rem;
}

.max-width-250 {
  max-width: 250px;
}

/* Стили для кнопок под карточкой */
.desktop-buttons {
  display: flex;
  justify-content: flex-start;
}

/* Стили для больших экранов */
.list-left-aligned .v-list-item {
  padding-left: 0;
}

.profile--card {
  max-height: 35vh; /* Для компьютеров */
}

/* Стили для мобильных устройств */
@media (max-width: 959px) {
  .profile--card {
    max-height: 70vh; /* Для мобильных устройств */
  }
}

@media (min-width: 960px) {
  .profile-card--text {
    text-align: left;
  }
}
</style>
