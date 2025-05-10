<template>
  <div class="page-wrapper">
    <Header/>
    <v-container class="lesson-container" :width="mdAndDown ? '100vw' : '60vw'">
      <h2 class="mt-5 font-weight-medium">{{ courseTitle }}</h2>
      <h3 class="mb-2 font-weight-regular">Авторский курс от Максима Бабича</h3>
      <v-btn class="text-none" variant="outlined" color="#313131" @click="navigateToSupport">
        <v-icon>mdi-pencil</v-icon>
        Чат курса
      </v-btn>
      <div class="back-button-container pt-4 pb-2 pl-0 ml-0">
        <v-btn
          variant="outlined"
          density="comfortable"
          :to="`/profile`"
          class="back-button font-weight-light text-none"
        >
          В профиль
        </v-btn>
      </div>
      <div v-if="loading" class="d-flex justify-center my-5">
        <v-progress-circular indeterminate color="#F48A21"></v-progress-circular>
      </div>
      <v-alert v-if="error" type="error" class="my-3">
        {{ error }}
      </v-alert>

      <v-container v-if="!loading && !error" class="d-flex flex-column ga-7 ml-0 pl-0 align-center">
        <CourseCard
          v-for="(block, index) in courseBlocks"
          :key="block.blockId"
          :course-data="formatBlockData(block, index + 1)"
          @click="navigateToLesson(courseId, block.blockId)"
        />
        <v-alert v-if="courseBlocks.length === 0" type="info" class="my-3">
          Для этого курса еще не добавлены блоки
        </v-alert>
      </v-container>
    </v-container>
    <AppFooter/>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { courseUserService } from '@/shared/api/courseUserService'
import Header from '@/shared/ui/PagesElem/Header.vue'
import CourseCard from '@/shared/ui/PagesElem/CourseCard.vue'
import AppFooter from '@/shared/ui/PagesElem/AppFooter.vue'

const { mdAndDown } = useDisplay()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const error = ref('')
const courseTitle = ref('Пекарская витрина: от Булок до Хлеба')
const courseBlocks = ref([])
const courseId = ref(null)
const courseSupport = ref('')
const originalCourseImage = ref('')

const fetchCourseData = async (id) => {
  if (!id) return

  loading.value = true
  error.value = ''

  try {
    const response = await courseUserService.fetchCourseWithBlocks(id)
    courseTitle.value = response.courseTitle || 'Курс без названия'
    courseBlocks.value = response.blocks || []
    courseSupport.value = response.chat

    if (response.imageUrl) {
      originalCourseImage.value = fixImageUrl(response.imageUrl)
    }
  } catch (err) {
    console.error('Ошибка при загрузке курса:', err)
    error.value = 'Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.'
    courseBlocks.value = []
  } finally {
    loading.value = false
  }
}

const fixImageUrl = (url) => {
  if (!url) {
    return '/public/default-lesson.jpg'
  }

  let fixedUrl = url.replace(/https:\/\/https:\/\//g, 'https://')
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, 'https://')

  return fixedUrl
}

const formatBlockData = (block, number) => {
  return {
    id: block.blockId,
    number: number.toString(),
    title: block.blockTitle,
    imagePath: fixImageUrl(block.imageUrl), 
    progress: {
      completed: block.completedLessons,
      total: block.lessonsCount,
    },
    duration: `${block.lessonsCount * 2.5} минут`, 
    lessons: block.lessonsCount,
  }
}

const defaultSupportLink = 'https://t.me/babichbaker_course'

const navigateToSupport = () => {
  const isValidLink =
    сourseSupport &&
    сourseSupport.value &&
    typeof сourseSupport.value === 'string' &&
    сourseSupport.value.trim() !== '' &&
    !сourseSupport.value.includes('null')

  // Если ссылка валидная, используем её, иначе используем дефолтную
  const telegramLink = isValidLink ? сourseSupport.value : defaultSupportLink

  // Открываем ссылку в новом окне
  window.open(telegramLink, '_blank')
}
// Навигация к уроку
const navigateToLesson = (courseId, blockId) => {
  router.push(`/course/${courseId}/blocks/${blockId}`)
}

// Следим за изменением ID курса в URL
watch(
  () => route.params.courseId,
  (newId) => {
    if (newId && newId !== courseId.value) {
      courseId.value = newId
      fetchCourseData(newId)
    }
  },
)

onMounted(() => {
  const id = route.params.courseId
  if (id) {
    courseId.value = id
    fetchCourseData(id)
  }
})
</script>

<style scoped>
.course-title {
  font-size: 1.8rem;
}

h1 {
  color: #333132;
  font-size: 3rem;
}

h2 {
  color: #333132;
  font-size: 1.8rem;
}

h3 {
  color: #333132;
}

template {
  background-color: BLACK;
}

.custom-chip1 {
  background-color: #e5ff9f !important;
  color: #333132;
}

.custom-chip2 {
  background-color: #f8ff31 !important;
  color: #333132;
}
.custom-chip3 {
  background-color: #ffea9d !important;
  color: #333132;
}

.lesson-container {
  min-height: 70vh;
}

.page-wrapper {
  background-color: #fff8f2;
  min-height: 100vh;
  height: 100%;
}

.responsive-image {
  width: 100%;
  height: 100vh;
  max-width: 20vw;
  min-width: 0vw;
}

@media (max-width: 819px) {
  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.1rem;
  }

  h3 {
    font-size: 0.9rem;
  }

  .course-title {
    font-size: 1.2rem;
  }

  .v-breadcrumbs {
    font-size: 0.85rem;
  }
}
</style>
