<template>
  <div class="page-wrapper">
    <Header />
    <v-container fluid class="content-container px-6 pt-2" :width="mdAndDown ? '100vw' : '60vw'">
      <div v-if="loading" class="d-flex justify-center my-5">
        <v-progress-circular indeterminate color="#F48A21"></v-progress-circular>
      </div>
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-else>
        <div v-if="!mdAndDown" class="breadcrumbs-container">
          <v-breadcrumbs class="mb-1 pl-0 font-weight-light" color="#F48A21">
            <v-breadcrumbs-item to="/lk">Профиль</v-breadcrumbs-item>
            <v-breadcrumbs-item :to="`/course/${courseId}`">{{ courseTitle }}</v-breadcrumbs-item>
            <v-breadcrumbs-item :to="`/course/${courseId}/blocks/${blockId}`"
              >Уроки</v-breadcrumbs-item
            >
            <v-breadcrumbs-item disabled>{{ lessonData.lessonTitle }}</v-breadcrumbs-item>
          </v-breadcrumbs>
        </div>
        <div v-else class="back-button-container pt-4 pb-2 pl-0 ml-0">
          <v-btn
            variant="outlined"
            density="comfortable"
            :to="`/course/${courseId}/blocks/${blockId}`"
            class="back-button text-none"
          >
            К урокам
          </v-btn>
        </div>

        <div class="content-wrapper flex-column">
          <div class="video-block mb-0 pt-0">
            <h2 class="font-weight-medium mb-3">{{ lessonData.lessonTitle }}</h2>
            <VideoPlayer :video-url="lessonData.videoUrl" :poster-image="fixImageUrl(courseImage)" />
            <div class="nav--buttons pt-0 mt-0 mb-1 d-flex justify-end">
              <v-btn
                class="text-none rounded-lg"
                :width="mdAndDown ? '40vw' : 'regular'"
                variant="outlined"
                @click="navigateToPreviousLesson"
                :disabled="!previousLessonId"
              >
                <template v-if="mdAndDown">
                  <v-icon>mdi-arrow-left</v-icon>
                  Предыдущий
                </template>
                <template v-else> Предыдущий урок </template>
              </v-btn>

              <v-btn
                class="text-none rounded-lg ml-4"
                :width="mdAndDown ? '40vw' : 'regular'"
                variant="outlined"
                color="#333132"
                @click="navigateToNextLesson()"
              >
                <template v-if="mdAndDown">
                  {{ isLastLesson ? 'Завершить' : 'Следующий' }}
                  <v-icon>mdi-arrow-right</v-icon>
                </template>
                <template v-else>
                  {{ isLastLesson ? 'Завершить блок' : 'Следующий урок' }}
                </template>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-container>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/shared/ui/PagesElem/Header.vue'
import { useDisplay } from 'vuetify'
import VideoPlayer from '@/entities/Course/VideoPlayer.vue'
import { courseService } from '@/shared/api/courseService'
import { courseUserService } from '@/shared/api/courseUserService'
import AppFooter from '@/shared/ui/PagesElem/AppFooter.vue'

const { mdAndDown } = useDisplay()
const route = useRoute()
const router = useRouter()

const courseImage = ref<string | null>(null) // Для хранения изображения курса

const courseTitle = ref('')

const fixImageUrl = (url) => {
  if (!url) {
    return '/public/default-lesson.jpg'
  }

  let fixedUrl = url.replace(/https:\/\/https:\/\//g, 'https://')
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, 'https://')

  return fixedUrl
}

const fetchLessonData = async () => {
  const maxRetries = 3
  let retries = 0

  while (retries < maxRetries) {
    try {
      loading.value = true
      const response = await courseService.getLessonDetails(lessonId.value)
      lessonData.value = response
      return response
    } catch (err) {
      retries++
      console.error(`Ошибка при загрузке урока (попытка ${retries}/${maxRetries}):`, err)

      if (retries >= maxRetries) {
        error.value = 'Не удалось загрузить урок. Пожалуйста, проверьте подключение к интернету и попробуйте снова.'
        throw err
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * retries))
    } finally {
      loading.value = false
    }
  }
}

const fetchCourseData = async (id) => {
  if (!id) return

  loading.value = true
  error.value = ''

  try {
    const response = await courseUserService.fetchCourseWithBlocks(id)
    courseTitle.value = response.courseTitle || 'Курс без названия'
    courseImage.value = response.imageUrl || null // Предполагаем, что imageUrl приходит в ответе
  } catch (err) {
    console.error('Ошибка при загрузке курса:', err)
    error.value = 'Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.'
  } finally {
    loading.value = false
  }
}

// Состояние
const loading = ref(true)
const error = ref('')
const lessonData = ref({
  lessonTitle: '',
  videoUrl: '',
  description: '',
  sheetUrl: '',
  imageUrl: '',
})

// Параметры навигации
const courseId = computed(() => route.params.courseId)
const blockId = computed(() => route.params.keysId)
const lessonId = computed(() => route.params.lessonId)

// Навигация между уроками
const allLessons = ref([])

const fetchAllLessons = async () => {
  try {
    const response = await courseService.getBlockLessons(blockId.value) // Предполагаем, что у вас есть такой метод
    allLessons.value = response.lessons || []
  } catch (err) {
    console.error('Ошибка при загрузке списка уроков:', err)
  }
}

const currentLessonIndex = computed(() => {
  const current = lessonId.value ? String(lessonId.value) : null
  return allLessons.value.findIndex((lesson) => {
    const lessonIdStr = lesson.id ? String(lesson.id) : null
    const lessonLessonIdStr = lesson.lessonId ? String(lesson.lessonId) : null
    return lessonIdStr === current || lessonLessonIdStr === current
  })
})

const previousLessonId = computed(() => {
  if (currentLessonIndex.value > 0) {
    const lesson = allLessons.value[currentLessonIndex.value - 1]
    return lesson.id || lesson.lessonId
  }
  return null
})

const nextLessonId = computed(() => {
  if (currentLessonIndex.value < allLessons.value.length - 1 && currentLessonIndex.value !== -1) {
    const lesson = allLessons.value[currentLessonIndex.value + 1]
    return lesson.id || lesson.lessonId
  }
  return null
})

const isLastLesson = computed(() => {
  return currentLessonIndex.value !== -1 && currentLessonIndex.value === allLessons.value.length - 1
})

const navigateToPreviousLesson = () => {
  if (previousLessonId.value) {
    router.push(`/course/${courseId.value}/blocks/${blockId.value}/lessons/${previousLessonId.value}`)
  }
}

const navigateToNextLesson = () => {
  if (nextLessonId.value) {
    router.push(`/course/${courseId.value}/blocks/${blockId.value}/lessons/${nextLessonId.value}`)
  } else if (isLastLesson.value) {
    router.push(`/course/${courseId.value}/blocks/${blockId.value}`)
  }
}

onMounted(async () => {
  await Promise.all([fetchLessonData(), fetchAllLessons(), fetchCourseData(courseId.value)])
})

watch(
  () => route.params.lessonId,
  (newLessonId, oldLessonId) => {
    if (newLessonId && newLessonId !== oldLessonId) {
      lessonData.value = {
        lessonTitle: '',
        videoUrl: '',
        description: '',
        sheetUrl: '',
      }
      loading.value = true
      fetchLessonData()
    }
  }
)
</script>
