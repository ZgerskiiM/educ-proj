<template>
  <div v-if="!mdAndDown && !isEditing" class="desktop-buttons mt-2 mb-2 d-flex">
    <div class="d-flex">
      <v-btn
        class="profile-card--button font-weight-light text-none"
        variant="outlined"
        color="#333132"
        @click="startEditing"
      >
        Редактировать
      </v-btn>
      <v-btn
        class="profile-card--button font-weight-light text-none ml-3"
        color="error"
        variant="outlined"
        @click="showLogoutDialog = true"
      >
        Выйти
      </v-btn>
      <v-btn
        v-if="isAdmin"
        class="profile-card--button font-weight-light text-none ml-3"
        color="warning"
        variant="outlined"
        @click="goToAdmin"
      >
        Админка
      </v-btn>
    </div>

    <v-btn
      class="profile-card--button font-weight-light text-none ml-auto"
      color="primary"
      variant="outlined"
      href="https://t.me/babichbaker_course"
      target="_blank"
    >
      Связаться с поддержкой
    </v-btn>
  </div>

  <v-card class="profile--card mb-5 rounded-lg">
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          md="4"
          lg="2"
          class="d-flex mr-0 pr-0 pl-0 ml-0"
          :class="{
            'justify-center align-center flex-column': mdAndDown,
            'align-self-start flex-row': !mdAndDown,
          }"
        >
          <v-avatar
            size="160"
            class="mb-2 mt-4"
            :class="{
              'justify-center align-center flex-column ': mdAndDown,
              'align-self-start ml-4': !mdAndDown,
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
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-avatar>
        </v-col>

        <v-col cols="12" md="7" lg="8" class="d-flex align-center">
          <div v-if="!isEditing">
            <v-list
              color="#FAFAFA"
              :class="{ 'pa-0 list-left-aligned': !mdAndDown }"
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
              <v-btn
                v-if="isAdmin"
                class="profile-card--button font-weight-light text-none ml-2"
                color="warning"
                variant="outlined"
                prepend-icon="mdi-shield-account"
                @click="goToAdmin"
              >
                Админка
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
              :class="{ 'w-100 h-25': mdAndDown, 'max-width-250': !mdAndDown }"
              style="max-height: 500px"
              @update:model-value="handlePhotoUpload"
            />
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
    ></v-img>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { AuthService } from "@/app/features/auth/model/Auth";
import { userApi } from "@/shared/api/api";

const { mdAndDown } = useDisplay();

const router = useRouter();
const props = defineProps({
  modelValue: { type: Object, required: true },
});

const emit = defineEmits(["update:modelValue", "logout"]);

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
  } catch (error) {
    // Детализированная обработка ошибок
    const errorMessage =
      error.response?.data?.message || "Не удалось обновить профиль";
    console.error("Ошибка при обновлении профиля:", error);
    emit("error", errorMessage);
    return false;
  }
}

const currentImageUrl = computed(() => {
  // Если нет URL изображения в данных пользователя
  if (!props.modelValue.imageUrl) {
    console.log("Используем резервное изображение /EmptyAvatar.png");
    return "/EmptyAvatar.png";
  }

  try {
    // Проверяем, является ли URL изображением
    const url = props.modelValue.imageUrl;

    // Обрабатываем URL для безопасного использования
    const processedUrl = processImageUrl(url);
    const finalUrl = fixImageUrl(processedUrl);

    console.log("Финальный URL для отображения:", finalUrl);

    // Добавим проверку изображения перед отображением
    testImageUrl(finalUrl);

    return finalUrl;
  } catch (e) {
    console.error("Ошибка обработки URL изображения:", e);
    return "/EmptyAvatar.png";
  }
});

// Функция для тестирования доступности изображения
const testImageUrl = (url) => {
  const img = new Image();
  img.onload = () =>
    console.log(
      "Изображение успешно загружено, размеры:",
      img.width,
      "x",
      img.height,
    );
  img.onerror = () => console.error("Ошибка загрузки изображения по URL:", url);
  img.src = url;
};

// Упростите и исправьте функцию processImageUrl
const processImageUrl = (url: string) => {
  if (!url || url === "null" || url === "undefined") {
    return "/EmptyAvatar.png";
  }

  // Проверяем, является ли url относительным путем
  if (url.startsWith("/")) {
    // Получаем базовый URL API из настроек
    const baseUrl = userApi.defaults.baseURL || "";
    return `${baseUrl}${url}`;
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`; // Лучше использовать https
  }

  return url;
};

const fixImageUrl = (url: string) => {
  if (!url) return "/EmptyAvatar.png";

  // Очищаем URL от проблемных символов
  let fixedUrl = url.replace(/https:\/\/https:\/\//g, "https://");
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, "https://");

  // Обрабатываем пробелы и специальные символы
  try {
    // Декодируем URL сначала (на случай, если он уже закодирован частично)
    const decodedUrl = decodeURIComponent(fixedUrl);
    // Потом правильно кодируем весь URL
    const encodedUrl = encodeURI(decodedUrl);

    console.log("Исходный URL:", url);
    console.log("Очищенный URL:", fixedUrl);
    console.log("Финальный закодированный URL:", encodedUrl);

    return encodedUrl;
  } catch (error) {
    console.error("Ошибка кодирования URL:", error);
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

const imageFile = ref(null);
const imageChanged = ref(false);

function handlePhotoUpload(file: File | null) {
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
}

@media (min-width: 960px) {
  .profile-card--text {
    text-align: left;
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
