<template>
  <v-app>
    <Header />

    <v-main class="bg-grey-lighten-5">
      <v-container
    :width="mdAndDown ? '100vw' : '80vw'"
    >
        <v-row class="mb-2">
          <v-col cols="12">
            <h1 class="font-weight-medium">Личный кабинет</h1>
          </v-col>
        </v-row>

        <v-overlay :model-value="isLoading" contained class="align-center justify-center">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <ProfileCard v-model="userData" class="mb-8" />

        <CourseList
          :courses="purchasedCourses"
          :filter-value="courseFilter"
          :filter-options="courseFilterOptions"
          :empty-state="courseEmptyState"
        />

        <CertificateList
          :certificates="certificates"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';
import Header from '@/shared/ui/PagesElem/Header.vue';
import ProfileCard from '@/entities/User/ui/ProfileCard.vue';
import CourseList from '@/widgets/CourseList/index.vue';
import CertificateList from '@/widgets/CertificateList/index.vue';
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()

const courseFilter = ref('all');
const isLoading = ref(false);

// Создаем реактивный объект с данными пользователя
const userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: 'https://randomuser.me/api/portraits/women/28.jpg' // Дефолтное изображение
});

// Функция для получения токена из localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Функция для загрузки данных пользователя с API
const API_URL = 'http://localhost:8080';


async function fetchUserData() {
  try {
    isLoading.value = true;
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    // Обновляем данные пользователя
    userData.value = {
      firstName: response.data.firstName || '',
      lastName: response.data.lastName || '',
      email: response.data.email || '',
      imageUrl: response.data.imageUrl || '/EmptyAvatar.png'
    };
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchUserData();
});

// Опции фильтра курсов
const courseFilterOptions = [
  { value: 'all', label: 'Все' },
  { value: 'not-started', label: 'Не начатые' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'completed', label: 'Завершенные' }
];

// Пустое состояние для курсов
const courseEmptyState = computed(() => {
  let message = '';

  switch(courseFilter.value) {
    case 'not-started':
      message = 'У вас нет не начатых курсов';
      break;
    case 'in-progress':
      message = 'У вас нет курсов в процессе';
      break;
    case 'completed':
      message = 'У вас нет завершенных курсов';
      break;
    default:
      message = 'У вас пока нет курсов';
  }

  return {
    icon: 'mdi-book-outline',
    title: message,
    description: 'Выберите другой фильтр или перейдите в каталог',
    actionText: 'Перейти в каталог',
    actionRoute: '/catalog'
  };
});

// Купленные курсы
const purchasedCourses = ref([
  {
    id: 1,
    title: 'Основы работы с бриошью',
    image: '/public/main--menu3.png',
    progress: 75,
    lessonsCompleted: 15,
    totalLessons: 20,
    certificateAvailable: false
  },
  {
    id: 2,
    title: 'Римская пицца',
    image: '/public/main--menu3.png',
    progress: 100,
    lessonsCompleted: 18,
    totalLessons: 18,
    certificateAvailable: true
  },
  {
    id: 3,
    title: 'Выпечка 1233',
    image: '/public/main--menu3.png',
    progress: 10,
    lessonsCompleted: 2,
    totalLessons: 15,
    certificateAvailable: false
  },
  {
    id: 4,
    title: 'Выпечка 1233',
    image: '/public/main--menu3.png',
    progress: 10,
    lessonsCompleted: 2,
    totalLessons: 15,
    certificateAvailable: false
  },
  {
    id: 5,
    title: 'Выпечка 1233',
    image: '/public/main--menu3.png',
    progress: 10,
    lessonsCompleted: 2,
    totalLessons: 15,
    certificateAvailable: false
  }
]);

// Сертификаты
const certificates = ref([
  {
    id: 1,
    courseName: 'Римская пицца',
    issueDate: '15.02.2025',
    image: '/public/main--menu3.png'
  }
]);
</script>

<style scoped>
.cabinet-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cabinet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.progress-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-description {
  min-height: 40px;
}

.sertificate-card {
  max-height: 20px
}

.filter-tabs {
  overflow-x: auto;
  white-space: nowrap;
}

.profile--card {
  max-height: 40vh;
  min-height: 1vh;
}

@media (max-width: 1000px) {
  .profile--card {
    max-height: 70vh;
    min-height: 1vh;
  }
}

@media (max-width: 600px) {
  .filter-tabs {
    display: flex;
    justify-content: center;
  }

  .v-btn-toggle {
    flex-wrap: wrap;
    justify-content: center;
  }

  .v-btn-toggle .v-btn {
    margin-bottom: 8px;
  }
}
</style>
