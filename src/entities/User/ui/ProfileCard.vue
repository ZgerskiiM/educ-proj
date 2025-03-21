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

  <v-card class="profile--card mb-5 rounded-lg">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4" lg="3"
          class="d-flex"
          :class="{
            'justify-center align-center flex-column': mdAndDown,
            'align-self-start flex-row': !mdAndDown,
          }"
        >
          <v-avatar size="160" class="mb-2 mt-4"
          :class="{
            'justify-center align-center flex-column ': mdAndDown,
            'align-self-start ml-4': !mdAndDown,
          }">
            <v-img
              :src="currentImageUrl"
              alt="Фото профиля"
              fallback="/default-avatar.jpg"
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
            style="max-height: 50px"
            @update:model-value="handlePhotoUpload"
          ></v-file-input>
        </v-col>

        <v-col cols="12" md="7" lg="8">
          <div v-if="!isEditing">
            <div class="d-flex justify-start align-start mb-4">
              <div class="profile-card--text font-weight-light">Личная информация</div>
            </div>

            <v-list color="#FAFAFA" :class="{ 'pa-0 list-left-aligned': !mdAndDown }">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-account"></v-icon>
                </template>
                <v-list-item-title class="font-weight-light" >Имя</v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">{{ modelValue.firstName }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-account-outline"></v-icon>
                </template>
                <v-list-item-title class="font-weight-light" >Фамилия</v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">{{ modelValue.lastName }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-email"></v-icon>
                </template>
                <v-list-item-title class="font-weight-light">Email</v-list-item-title>
                <v-list-item-subtitle class="font-weight-light">{{ modelValue.email }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <div v-if="mdAndDown" class="mt-4 d-flex justify-end">
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
  <v-dialog v-model="showLogoutDialog" max-width="400">
    <v-card>
      <v-card-title>Подтверждение</v-card-title>
      <v-card-text class="font-weight-light"
        >Вы действительно хотите выйти из аккаунта?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="profile-card--button font-weight-light text-none"
          variant="outlined"
          @click="showLogoutDialog = false"
          >Отмена</v-btn
        >
        <v-btn
          variant="outlined"
          class="profile-card--button font-weight-light text-none"
          color="error"
          @click="logout"
          >Выйти</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { AuthService } from '@/app/features/auth/model/Auth'
import { userApi } from '@/shared/api/api'

const { mdAndDown } = useDisplay()

const router = useRouter()
const props = defineProps({
  modelValue: { type: Object, required: true },
})

const emit = defineEmits(['update:modelValue', 'logout'])

const isEditing = ref(false)
const editedData = ref({ ...props.modelValue })
const showLogoutDialog = ref(false)

const getAuthToken = () => {
  return AuthService.getToken()
}

async function saveChanges() {
  try {
    // Получение токена авторизации
    const token = getAuthToken();
    if (!token) {
      emit('error', 'Вы не авторизованы');
      return false;
    }

    // Обновление профиля пользователя
    await userApi.post('/users/update-user', null, {
      params: {
        newFirstName: editedData.value.firstName,
        newLastName: editedData.value.lastName
      }
    });

    // Загрузка изображения, если оно было изменено
    if (imageChanged.value && imageFile.value) {
      const formData = new FormData();
      formData.append('image', imageFile.value);

      const photoResponse = await userApi.post('/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Обновление URL изображения в данных
      if (photoResponse.data && photoResponse.data.imageUrl) {
        editedData.value.imageUrl = photoResponse.data.imageUrl;
      }
    }

    // Обновление родительского компонента и сброс состояния редактирования
    emit('update:modelValue', { ...editedData.value });
    isEditing.value = false;

    // Уведомление об успешном обновлении
    emit('success', 'Профиль успешно обновлен');
    return true;
  } catch (error) {
    // Детализированная обработка ошибок
    const errorMessage = error.response?.data?.message || 'Не удалось обновить профиль';
    console.error('Ошибка при обновлении профиля:', error);
    emit('error', errorMessage);
    return false;
  }
}

const currentImageUrl = computed(() => {
  // Если нет URL изображения в данных пользователя
  if (!props.modelValue.imageUrl) {
    return '/public/EmptyAvatar.png';
  }

  // Обработка существующего URL
  try {
    const processedUrl = processImageUrl(props.modelValue.imageUrl);
    return fixImageUrl(processedUrl);
  } catch (e) {
    // Если произошла ошибка при обработке URL
    console.error('Ошибка обработки URL изображения:', e);
    return '/public/EmptyAvatar.png';
  }
});

// Упростите и исправьте функцию processImageUrl
const processImageUrl = (url) => {
  if (!url || url === 'null' || url === 'undefined') {
    return '/public/EmptyAvatar.png';
  }

  if (url.startsWith('/')) {
    return `${userApi}${url}`;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;  // Лучше использовать https
  }

  return url;
};

const fixImageUrl = (url) => {
  if (!url) return '/public/default-lesson.jpg'
  let fixedUrl = url.replace(/https:\/\/https:\/\//g, 'https://')
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, 'https://')
  return fixedUrl
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (!isEditing.value) {
      editedData.value = { ...newValue }
    }
  },
  { deep: true },
)

function startEditing() {
  editedData.value = { ...props.modelValue }
  isEditing.value = true
}

const imageFile = ref(null)
const imageChanged = ref(false)

function handlePhotoUpload(file) {
  if (file) {
    imageFile.value = file
    imageChanged.value = true

    const reader = new FileReader()
    reader.onload = (e) => {
      editedData.value.imageUrl = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function cancelEditing() {
  editedData.value = { ...props.modelValue }
  isEditing.value = false
}



function logout() {
  showLogoutDialog.value = false
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  emit('logout')
  router.push('/login')
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
  max-height: 35vh;
  overflow-y: auto;

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
