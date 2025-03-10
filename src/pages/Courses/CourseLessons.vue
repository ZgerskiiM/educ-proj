<template>
  <div class="page-wrapper ">
    <Header />
    <v-container :width="mdAndDown ? '100vw' : '80vw'">
      <h2 class="mt-5 font-weight-medium">{{ courseName }}</h2>
      <h3 class="mb-2 font-weight-regular">{{ courseAuthor }}</h3>
      <!-- Обновленные хлебные крошки с правильными ссылками -->
      <v-breadcrumbs
        class="ml-0 pl-0 font-weight-light"
        color="#F48A21"
      >
        <v-breadcrumbs-item to="/">Главная</v-breadcrumbs-item>
        <v-breadcrumbs-item :to="`/course/${courseId}`">{{ courseName }}</v-breadcrumbs-item>
        <v-breadcrumbs-item disabled>{{ blockTitle }}</v-breadcrumbs-item>
      </v-breadcrumbs>

      <v-card-title class="course-title font-weight-bold pt-0 pl-0" style="color: #333132">
        Блок {{ blockNumber }} / {{ blockTitle }}
      </v-card-title>

      <v-container
        :class="
          mdAndDown
            ? 'd-flex flex-row flex-wrap ga-5 ml-0 pl-0 mr-0 pr-0'
            : 'd-flex flex-row flex-wrap ga-5 ml-0 pl-0 align-center'
        "
      >
        <div v-if="loading" class="text-center w-100">
          <v-progress-circular indeterminate color="#F48A21"></v-progress-circular>
        </div>
        <div v-else-if="error" class="text-center w-100 red--text">
          {{ error }}
        </div>
        <template v-else>
          <LessonCard
            v-for="(lesson, index) in lessons"
            :key="lesson.lessonId"
            :course-data="{
              id: lesson.lessonId,
              number: String(index + 1).padStart(2, '0'),
              title: lesson.lessonTitle,
              imagePath: fixImageUrl(lesson.imageUrl),
            }"
            @click="navigateToLesson(lesson.lessonId)"
          />
        </template>
      </v-container>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/shared/ui/PagesElem/Header.vue'
import { useDisplay } from 'vuetify'
import LessonCard from '@/shared/ui/PagesElem/LessonCard.vue'
import { getBlockLessons } from '@/shared/api/UserService'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { mdAndDown } = useDisplay()
const route = useRoute()
const router = useRouter()

// Получаем параметры маршрута
const courseId = computed(() => route.params.courseId)
const blocksId = computed(() => route.params.blocksId)

// Данные курса
const courseName = ref('Пекарская витрина: от Булок до Хлеба')
const courseAuthor = ref('Авторский курс от Максима Бабича')
const blockNumber = ref('1')
const blockTitle = ref('')

const loading = ref(true)
const error = ref('')
const lessons = ref([])

const fixImageUrl = (url) => {
  if (!url) {
    return '/public/default-lesson.jpg';
  }

  let fixedUrl = url.replace(/https:\/\/https:\/\//g, 'https://');
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, 'https://');

  console.log('Исправленный URL:', fixedUrl);

  return fixedUrl;
};

// Функция для загрузки данных блока
const fetchBlockData = async () => {
  loading.value = true
  error.value = ''

  try {
    // Используем blocksId из параметров маршрута
    const data = await getBlockLessons(blocksId.value)

    // Логируем для отладки
    console.log('Полученные данные блока:', data);
    console.log('Уроки в блоке:', data.lessons);

    // Обновляем состояние
    blockTitle.value = data.blockTitle
    lessons.value = data.lessons
  } catch (err) {
    error.value = 'Не удалось загрузить данные уроков'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Обновленная функция навигации к уроку с сохранением иерархии маршрута
const navigateToLesson = (lessonId) => {
  router.push(`/course/${courseId.value}/blocks/${blocksId.value}/lessons/${lessonId}`)
}

// Загружаем данные при монтировании компонента
onMounted(() => {
  fetchBlockData()
})
</script>

<style scoped>

.page-wrapper {
  background-color: #fff8f2;
  height: 100vh;
}
</style>
