<template>
  <Header />
  <v-app>
    <v-main>
      <v-container :width="mdAndDown ? '100vw' : '60vw'">
        <v-row class="mb-2">
          <v-col cols="12">
            <h1 class="font-weight-medium mt-4">Личный кабинет</h1>
          </v-col>
        </v-row>
        <v-overlay :model-value="isLoading" contained class="align-center justify-center">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <ProfileCard v-model="userData" class="mb-8" @logout="handleLogout" />
        <CourseList
          :courses="purchasedCourses"
          :filter-value="courseFilter"
          :filter-options="courseFilterOptions"
          :empty-state="courseEmptyState"
        />
        
        <CertificateList :certificates="certificates" />
      </v-container>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from '@/shared/ui/PagesElem/Header.vue'
import ProfileCard from '@/entities/User/ui/ProfileCard.vue'
import CourseList from '@/widgets/CourseList/index.vue'
import CertificateList from '@/widgets/CertificateList/index.vue'
import { AuthService } from '@/app/features/auth/model/Auth'
import { fetchUserData } from '@/shared/api/UserService'
import { useDisplay } from 'vuetify'
import { getUserCourses } from '@/shared/api/UserService'
import AppFooter from '@/shared/ui/PagesElem/AppFooter.vue'

const { mdAndDown } = useDisplay()
const courseFilter = ref('all')
const isLoading = ref(false)
const userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
})

const purchasedCourses = ref([])

async function fetchUserCourses() {
  try {
    isLoading.value = true

    const token = AuthService.getToken()
    if (!token) {
      purchasedCourses.value = []
      return
    }

    const courses = await getUserCourses()

    purchasedCourses.value = courses.map((course) => ({
      id: course.id,
      title: course.title,
      imageUrl: course.imageUrl || '/public/main--menu3.png',
      progress: course.progress || 0,
      lessonsCompleted: course.lessonsCompleted || 0,
      totalLessons: course.totalLessons || 0,
      certificateAvailable: course.certificateAvailable || false,
    }))
  } catch (error) {
    console.error('Ошибка при получении курсов пользователя:', error)
    purchasedCourses.value = []
  } finally {
    isLoading.value = false
  }
}

async function loadUserData() {
  try {
    isLoading.value = true
    const userDataResult = await fetchUserData()

    userData.value = {
      firstName: userDataResult.firstName || '',
      lastName: userDataResult.lastName || '',
      email: userDataResult.email || '',
      imageUrl: userDataResult.imageUrl || '/EmptyAvatar.png',
    }
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadUserData()
  fetchUserCourses()
})

const certificates = ref('')

function handleLogout() {
  userData.value = {
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: '',
  }

  localStorage.removeItem('jwt_token')
}

const courseFilterOptions = [
  { value: 'all', label: 'Все курсы' },
  { value: 'not-started', label: 'Не начатые' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'completed', label: 'Завершенные' },
]

const courseEmptyState = computed(() => {
  let message = ''

  switch (courseFilter.value) {
    case 'not-started':
      message = 'У вас нет не начатых курсов'
      break
    case 'in-progress':
      message = 'У вас нет курсов в процессе'
      break
    case 'completed':
      message = 'У вас нет завершенных курсов'
      break
    default:
      message = 'У вас пока нет курсов'
  }

  return {
    icon: 'mdi-book-outline',
    title: message,
    description: 'Выберите другой фильтр или перейдите в каталог',
    actionText: 'Перейти в каталог',
    actionRoute: '/catalog',
  }
})
</script>

<style scoped>
.cabinet-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.cabinet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.v-main {
  background-color: #fff8f0;
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

h1 {
  color: #333132;
}

.sertificate-card {
  max-height: 20px;
}

.filter-tabs {
  overflow-x: auto;
  white-space: nowrap;
}

.profile--card {
  max-height: 5vh;
  min-height: 1vh;
}

@media (max-width: 1000px) {
  .profile--card {
    max-height: 70vh;
    min-height: 1vh;
  }
}

/* Стили для мобильных устройств */
@media (max-width: 959px) {
  .profile--card {
    max-height: 70vh; /* Для мобильных устройств */
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
