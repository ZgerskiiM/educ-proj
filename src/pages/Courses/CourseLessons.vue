<template>
  <div class="page-wrapper ">
    <Header />
    <v-container :width="mdAndDown ? '100vw' : '60vw'">
      <div class="info">
      <h2 class="mt-5 font-weight-medium">{{ courseTitle }}</h2>
      <h3 class="mb-2 font-weight-regular">{{ courseAuthor }}</h3>
    </div>
      <div v-if="!mdAndDown" class="breadcrumbs-container">
                <v-breadcrumbs
                    class="mb-1 pl-0 font-weight-light"
                    color="#F48A21"
                >
                    <v-breadcrumbs-item to="/lk">Профиль</v-breadcrumbs-item>
                    <v-breadcrumbs-item :to="`/course/${courseId}`">{{ courseTitle }}</v-breadcrumbs-item>
                    <v-breadcrumbs-item disabled :to="`/course/${courseId}/blocks`">{{ blockTitle }}</v-breadcrumbs-item>
                </v-breadcrumbs>
            </div>
            <div v-else class="back-button-container pt-4 pb-2 pl-0 ml-0">
            <v-btn
              variant="outlined"
              density="comfortable"
              :to="`/course/${courseId}`"
              class="back-button text-none"
            >
              К блокам
            </v-btn>
          </div>

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
            @click="navigateToLesson(lesson.lessonId, lesson.imageUrl)"
          />
        </template>
      </v-container>
    </v-container>
    <AppFooter/>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/shared/ui/PagesElem/Header.vue'
import { useDisplay } from 'vuetify'
import LessonCard from '@/shared/ui/PagesElem/LessonCard.vue'
import { getBlockLessons } from '@/shared/api/UserService'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courseUserService} from '@/shared/api/courseUserService'
import AppFooter from '@/shared/ui/PagesElem/AppFooter.vue'

const { mdAndDown } = useDisplay()
const route = useRoute()
const router = useRouter()

// Получаем параметры маршрута
const courseId = computed(() => route.params.courseId)
const blocksId = computed(() => route.params.blocksId)

const courseImage = ref();

const courseTitle = ref('');
const courseBlocks = ref([]);

// Данные курса
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


  return fixedUrl;
};

const fetchCourseData = async (id) => {
  if (!id) return;

  loading.value = true;
  error.value = '';

  try {
    const response = await courseUserService.fetchCourseWithBlocks(id);
    courseTitle.value = response.courseTitle || 'Курс без названия';
    courseBlocks.value = response.blocks || [];
  } catch (err) {
    console.error('Ошибка при загрузке курса:', err);
    error.value = 'Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.';
    courseBlocks.value = [];
  } finally {
    loading.value = false;
  }
};



// Форматирование данных блока для компонента CourseCard
const formatBlockData = (block, number) => {
  return {
    id: block.blockId,
    number: number.toString(),
    title: block.blockTitle,
    imagePath: fixImageUrl(block.imageUrl), // Заглушка для изображений
    progress: {
      completed: block.completedLessons,
      total: block.lessonsCount
    },
    duration: `${block.lessonsCount * 2.5} минут`, // Приблизительная длительность
    lessons: block.lessonsCount,
    cards: Math.round(block.lessonsCount) // Примерное количество карт
  };
};


onMounted(() => {
  const id = route.params.courseId;
  if (id) {
    courseId.value = id;
    fetchCourseData(id);
  }
});


// Функция для загрузки данных блока
const fetchBlockData = async () => {
  loading.value = true
  error.value = ''

  try {
    // Используем blocksId из параметров маршрута
    const data = await getBlockLessons(blocksId.value)

    // Логируем для отладки


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
const navigateToLesson = (lessonId, imageUrl) => {
  // Сохраняем URL изображения в localStorage
  if (imageUrl) {
    const fixedImageUrl = fixImageUrl(imageUrl);
    console.log(`Сохраняем изображение урока ${lessonId}:`, fixedImageUrl);
    localStorage.setItem(`lesson_image_${lessonId}`, fixedImageUrl);
  }

  // Переходим на страницу урока
  router.push(`/course/${courseId.value}/blocks/${blocksId.value}/lessons/${lessonId}`);
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  fetchBlockData()
})
</script>



<style scoped>

.page-wrapper {
  background-color: #fff8f2;
  height: 100%;
}
</style>
