<template>
  <div class="page-wrapper ">
    <Header />
    <v-container class="lessons-container" :width="mdAndDown ? '100vw' : '60vw'">
      <div class="info">
      <h2 class="mt-5 font-weight-medium">{{ courseTitle }}</h2>
      <h3 class="mb-2 font-weight-regular">{{ courseAuthor }}</h3>
    </div>
            <div class="back-button-container pt-4 pb-2 pl-0 ml-0">
            <v-btn
              variant="outlined"
              density="comfortable"
              :to="`/course/${courseId}`"
              class="back-button font-weight-light text-none"
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
              imagePath: lesson.imageUrl,
            }"
            @click="navigateToLesson(lesson.lessonId)"
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
const courseId = computed(() => route.params.courseId)
const blocksId = computed(() => route.params.blocksId)
const courseTitle = ref('');
const courseBlocks = ref([]);
const courseAuthor = ref('Авторский курс от Максима Бабича')
const blockNumber = ref('1')
const blockTitle = ref('')
const loading = ref(true)
const error = ref('')
const lessons = ref([])


const courseImage = ref('');

// В методе onMounted или внутри fetchBlockData
onMounted(() => {
  // Получаем изображение курса из localStorage
  const savedCourseImage = localStorage.getItem(`original_course_image_${courseId.value}`);
  if (savedCourseImage) {
    courseImage.value = savedCourseImage;
  }

  fetchBlockData();
});



const fetchBlockData = async () => {
  loading.value = true
  error.value = ''

  try {
    // Используем blocksId из параметров маршрута
    const data = await getBlockLessons(blocksId.value)
    blockTitle.value = data.blockTitle
    lessons.value = data.lessons

    // Получаем сохраненное изображение курса
    const savedCourseImage = localStorage.getItem(`original_course_image_${courseId.value}`);
    if (savedCourseImage) {
      courseImage.value = savedCourseImage;
    }
  } catch (err) {
    error.value = 'Не удалось загрузить данные уроков'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const blockImage = ref('')

const fixImageUrl = (url) => {
  if (!url) {
    return '/assets/default-lesson.jpg'
  }

  let fixedUrl = url.replace(/https:\/\/https:\/\//g, 'https://')
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, 'https://')

  return fixedUrl
}

// Функция загрузки данных курса
const fetchBlockImage = async (courseId, blockId) => {
  if (!courseId) return

  loading.value = true

  try {
    const response = await courseUserService.fetchCourseWithBlocks(courseId)

    // Находим нужный блок по ID
    const block = response.blocks.find(b => b.blockId === blockId)

    if (block) {
      // Применяем ту же функцию обработки
      blockImage.value = fixImageUrl(block.imageUrl)
    }
  } catch (err) {
    console.error('Ошибка при загрузке данных:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const courseId = route.params.courseId
  const blockId = route.params.blockId

  if (courseId && blockId) {
    fetchBlockImage(courseId, blockId)
  }
})

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

onMounted(() => {
  const id = route.params.courseId;
  if (id) {
    courseId.value = id;
    fetchCourseData(id);
  }
});

const navigateToLesson = (lessonId) => {
  router.push(`/course/${courseId.value}/blocks/${blocksId.value}/lessons/${lessonId}`);
};

onMounted(() => {
  fetchBlockData()
})
</script>



<style scoped>

.lessons-container {
  min-height: 70vh;
}

.page-wrapper {
  background-color: #fff8f2;
  min-height: 100vh;
  height: 100%;
}
</style>
