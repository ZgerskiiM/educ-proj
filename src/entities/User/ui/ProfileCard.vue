<template>
  <div v-if="!smAndDown && !isEditing" class="desktop-buttons mt-2 mb-2 d-flex">
    <div class="d-flex">
      <v-btn
        class="profile-card--button font-weight-light text-none"
        variant="flat"
        color="#333132"
        text="Редактировать"
        @click="startEditing"
      />
      <v-btn
        class="profile-card--button font-weight-light text-none ml-3"
        color="error"
        variant="outlined"
        text="Выйти"
        @click="showLogoutDialog = true"
      />
      <v-btn
        v-if="isAdmin"
        class="profile-card--button font-weight-light text-none ml-3"
        color="warning"
        variant="outlined"
        text="Админка"
        @click="goToAdmin"
      />
    </div>
    <v-btn
      class="profile-card--button font-weight-light text-none ml-auto"
      color="primary"
      variant="outlined"
      text="Связаться с поддержкой"
      href="https://t.me/babichbaker_course"
      target="_blank"
    />
  </div>

  <v-card class="profile--card mb-5 rounded-lg">
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          md="3"
          lg="3"
          xl="2"
          class="d-flex mr-0 pr-0 pl-0 ml-0"
          :class="{
            'justify-center align-center flex-column': smAndDown,
            'align-self-start flex-row': !smAndDown,
          }"
        >
          <v-avatar
            size="160"
            class="mb-2 mt-4"
            :class="{
              'justify-center align-center flex-column ': smAndDown,
              'align-self-start ml-4': !smAndDown,
            }"
          >
            <v-img
              :src="currentImageUrl"
              alt="Фото профиля"
              fallback="/EmptyAvatar.png"
              cover
              :width="160"
              :height="160"
              :aspect-ratio="1"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  />
                </v-row>
              </template>
            </v-img>
          </v-avatar>
        </v-col>

        <v-col
          cols="12"
          md="8"
          lg="8"
          xl="9"
          class="d-flex align-center"
          :class="{ 'pl-6': !smAndDown }"
        >
          <div v-if="!isEditing">
            <v-list
              color="#FAFAFA"
              :class="{ 'pa-0 list-left-aligned': !smAndDown }"
            >
              <v-list-item class="mb-0 pb-0">
                <v-list-item-title class="font-weight-regular">
                  {{modelValue.firstName}}
                </v-list-item-title>
              </v-list-item>

              <v-list-item class="mt-0 pt-0">
                <v-list-item-title class="font-weight-regular mt-0 pt-0">
                  {{modelValue.lastName }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item class="mail--text">
                <v-list-item-title class="mail--text font-weight-light">
                  {{modelValue.email }}
                </v-list-item-title>
              </v-list-item>
            </v-list>

            <div v-if="smAndDown" class="mt-4 d-flex flex-wrap gap-2 justify-center">
              <v-btn
                class="profile-card--button font-weight-light text-none"
                color="#31331"
                prepend-icon="mdi-pencil"
                variant="outlined"
                text="Редактировать"
                @click="startEditing"
              />
              <v-btn
                class="profile-card--button font-weight-light text-none"
                color="error"
                variant="outlined"
                text="Выйти"
                prepend-icon="mdi-logout"
                @click="showLogoutDialog = true"
              />
              <v-btn
                v-if="isAdmin"
                class="profile-card--button font-weight-light text-none"
                color="warning"
                variant="outlined"
                text="Админка"
                prepend-icon="mdi-shield-account"
                @click="goToAdmin"
              />
              <v-btn
                class="profile-card--button font-weight-light text-none"
                color="primary"
                variant="outlined"
                text="Поддержка"
                prepend-icon="mdi-help-circle"
                href="https://t.me/babichbaker_course"
                target="_blank"
              />
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
            />
            <v-text-field
              v-model="editedData.lastName"
              label="Фамилия"
              variant="outlined"
              class="mb-1"
              density="compact"
            />
            <v-file-input
              label="Изменить фото"
              accept="image/*"
              prepend-icon=""
              variant="outlined"
              density="compact"
              hide-details
              class="mb-3"
              :class="{ 'w-100 h-25': smAndDown, 'max-width-250': !smAndDown }"
              style="max-height: 500px"
              @update:model-value="handlePhotoUpload"
            />
            <div class="d-flex gap-3">
              <v-btn
                class="profile-card--button font-weight-light text-none"
                color="#333132"
                text="Сохранить"
                @click="saveChanges"
              />
              <v-btn
                class="ml-2 profile-card--button font-weight-light text-none"
                color="grey"
                variant="outlined"
                text="Отмена"
                @click="cancelEditing"
              />
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-dialog v-model="showLogoutDialog" max-width="400">
    <v-card>
      <v-card-title>Подтверждение</v-card-title>
      <v-card-text class="font-weight-light">
        Вы действительно хотите выйти из аккаунта?
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          class="profile-card--button font-weight-light text-none"
          variant="outlined"
          text="Отмена"
          @click="showLogoutDialog = false"
        />
        <v-btn
          variant="outlined"
          class="profile-card--button font-weight-light text-none"
          color="error"
          text="Выйти"
          @click="logout"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Отладочный вывод URL -->
  <div class="debug-info" v-if="false">
    <p>URL изображения: {{ currentImageUrl }}</p>
    <v-img
      :src="'/EmptyAvatar.png'"
      width="50"
      height="50"
      alt="Тестовая картинка"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { AuthService } from "@/app/features/auth/model/Auth";
import { userApi } from "@/shared/api/api";

const { mdAndDown, smAndDown } = useDisplay();

const router = useRouter();
const props = defineProps({
  modelValue: { type: Object, required: true },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'logout'): void
  (e: 'error', message: string): void
  (e: 'success', message: string): void
}>();

const isEditing = ref(false);
const editedData = ref({ ...props.modelValue });
const showLogoutDialog = ref(false);

// Проверка, является ли пользователь администратором
const isAdmin = computed(() => {
  return AuthService.isAdmin();
});

// Переход в админ-панель
const goToAdmin = () => {
  router.push("/admin");
};

const getAuthToken = () => {
  return AuthService.getToken();
};

async function saveChanges() {
  try {
    // Получение токена авторизации
    const token = getAuthToken();
    if (!token) {
      emit("error", "Вы не авторизованы");
      return false;
    }

    // Обновление профиля пользователя
    await userApi.post("/users/update-user", null, {
      params: {
        newFirstName: editedData.value.firstName,
        newLastName: editedData.value.lastName,
      },
    });

    // Загрузка изображения, если оно было изменено
    if (imageChanged.value && imageFile.value) {
      const formData = new FormData();
      formData.append("image", imageFile.value);

      const photoResponse = await userApi.post("/users/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Обновление URL изображения в данных
      if (photoResponse.data && photoResponse.data.imageUrl) {
        editedData.value.imageUrl = photoResponse.data.imageUrl;
      }
    }

    // Обновление родительского компонента и сброс состояния редактирования
    emit("update:modelValue", { ...editedData.value });
    isEditing.value = false;

    // Уведомление об успешном обновлении
    emit("success", "Профиль успешно обновлен");
    return true;
  } catch (error: any) {
    // Детализированная обработка ошибок
    const errorMessage =
      error.response?.data?.message || "Не удалось обновить профиль";
    emit("error", errorMessage);
    return false;
  }
}

const currentImageUrl = computed(() => {
  // Если нет URL изображения в данных пользователя
  if (!props.modelValue.imageUrl) {
    return "/EmptyAvatar.png";
  }

  try {
    // Проверяем, является ли URL изображением
    const url = props.modelValue.imageUrl;

    // Обрабатываем URL для безопасного использования
    const processedUrl = processImageUrl(url);
    const finalUrl = fixImageUrl(processedUrl);

    // Добавим проверку изображения перед отображением
    testImageUrl(finalUrl);

    return finalUrl;
  } catch (e) {
    return "/EmptyAvatar.png";
  }
});

// Функция для тестирования доступности изображения
const testImageUrl = (url: string) => {
  const img = new Image();
  img.src = url;
};

// Упростите и исправьте функцию processImageUrl
const processImageUrl = (url: string) => {
  if (!url || url === "null" || url === "undefined") {
    return "/EmptyAvatar.png";
  }

  // Проверяем, является ли url путем к локальному ресурсу
  if (url.startsWith("/")) {
    return url; // Возвращаем как есть для файлов из public директории
  }

  // Проверяем, является ли url относительным путем
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    const baseUrl = userApi.defaults.baseURL || "";
    return `${baseUrl}${url}`;
  }

  return url;
};

const fixImageUrl = (url: string): string => {
  if (!url) return "/EmptyAvatar.png";

  // Если это локальный ресурс из public директории, возвращаем как есть
  if (url.startsWith("/")) {
    return url;
  }

  // Очищаем URL от проблемных символов
  let fixedUrl = url.replace(/https:\/\/https:\/\//g, "https://");
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, "https://");

  // Обрабатываем пробелы и специальные символы
  try {
    // Декодируем URL сначала (на случай, если он уже закодирован частично)
    const decodedUrl = decodeURIComponent(fixedUrl);
    // Потом правильно кодируем весь URL
    const encodedUrl = encodeURI(decodedUrl);

    return encodedUrl;
  } catch (error) {
    return fixedUrl; // Возвращаем хотя бы очищенный URL, если кодирование не удалось
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (!isEditing.value) {
      editedData.value = { ...newValue };
    }
  },
  { deep: true },
);

function startEditing() {
  editedData.value = { ...props.modelValue };
  isEditing.value = true;
}

const imageFile = ref<File | null>(null);
const imageChanged = ref(false);

function handlePhotoUpload(files: File | File[]) {
  const file = Array.isArray(files) ? files[0] : files;
  if (file) {
    imageFile.value = file;
    imageChanged.value = true;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        editedData.value.imageUrl = e.target.result as string;
      }
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
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  emit("logout");
  router.push("/login");
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

.list-left-aligned .v-list-item {
  padding-left: 0;
}

.profile--card {
  max-height: 35vh;
  overflow-y: auto;
}

.v-list-item-title {
  font-size: 1.5rem;
}

.v-avatar {
  border-radius: 1vw;
  overflow: hidden; /* Важно для правильного отображения внутреннего изображения */
}

.v-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Стили для мобильных устройств */
@media (max-width: 959px) {
  .profile--card {
    max-height: 70vh; /* Для мобильных устройств */
  }
  
  /* Стили для кнопок на мобильных устройствах */
  .profile-card--button {
    min-width: 100px;
    font-size: 0.8rem;
  }
  
  /* Обеспечиваем равномерное распределение кнопок */
  .d-flex.gap-2 {
    gap: 8px;
  }
}

/* Стили для больших экранов (960px+) */
@media (min-width: 960px) {
  .profile-card--text {
    text-align: left;
  }
  
  .profile--card .v-col:not(:first-child) {
    padding-left: 32px !important;
  }
  
  .v-list-item-title {
    font-size: 1.4rem;
  }
}

.debug-info {
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 4px;
}
</style>
