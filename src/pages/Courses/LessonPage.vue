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
            <VideoPlayer :video-url="lessonData.videoUrl" :poster-image="fixImageUrl(lessonImageUrl)" />
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
          <div class="lesson-sidebar">
  <v-expansion-panels class="w-100">
    <!-- Панель "Описание урока" отображается только если есть описание -->
    <v-expansion-panel
      v-if="lessonData.description"
      class="w-100"
      key="1"
      title="01 / Описание урока"
    >
      <template v-slot:text>
        <div
          class="font-weight-light"
          v-html="lessonData.description || 'Описание отсутствует'"
        ></div>
      </template>
    </v-expansion-panel>
        <v-expansion-panel
          v-if="lessonData.sheetUrl"
          class="w-100"
          key="2"
          title="02 / Дополнительные материалы"
        >
          <template v-slot:text>
            <p class="font-weight-light">
              <a :href="lessonData.sheetUrl" target="_blank" class="material-link">
                Скачать материалы к уроку
              </a>
            </p>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
        </div>
      </div>
    </v-container>
    <AppFooter/>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/shared/ui/PagesElem/Header.vue'
import { useDisplay } from 'vuetify'
import VideoPlayer from '@/entities/Course/VideoPlayer.vue'
import { courseService } from '@/shared/api/courseService'
// import { markLessonAsComplete, markLessonAsStarted } from '@/shared/api/UserService'
import { LessonStateService } from '@/shared/api/LessonStateService'
import { courseUserService } from '@/shared/api/courseUserService'
import AppFooter from '@/shared/ui/PagesElem/AppFooter.vue'

const { mdAndDown } = useDisplay()
const route = useRoute()
const router = useRouter()
const courseImage = ref()

const lessonImageUrl = ref('')

const courseTitle = ref('')

const fixImageUrl = (url) => {
  if (!url) {
    return '/public/default-lesson.jpg'
  }

  let fixedUrl = url.replace(/https:\/\/https:\/\//g, 'https://')
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, 'https://')

  return fixedUrl
}

onMounted(async () => {
  const currentLessonId = route.params.lessonId

  const savedImageUrl = localStorage.getItem(`lesson_image_${currentLessonId}`)

  if (savedImageUrl) {
    lessonImageUrl.value = savedImageUrl

    // Удаляем из хранилища после использования
    localStorage.removeItem(`lesson_image_${currentLessonId}`)
  }

  // Выполняем загрузку данных урока и списка уроков
  await Promise.all([fetchLessonData(), fetchAllLessons()])

  // Если изображение не было получено из localStorage, используем из данных урока
  if (!lessonImageUrl.value && lessonData.value.imageUrl) {
    lessonImageUrl.value = fixImageUrl(lessonData.value.imageUrl)
  }
})

const fetchLessonData = async () => {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      loading.value = true;
      // Замените fetchLesson на getLessonDetails
      const response = await courseService.getLessonDetails(lessonId.value);
      lessonData.value = response;
      return response;
    } catch (err) {
      retries++;
      console.error(`Ошибка при загрузке урока (попытка ${retries}/${maxRetries}):`, err);

      if (retries >= maxRetries) {
        error.value = 'Не удалось загрузить урок. Пожалуйста, проверьте подключение к интернету и попробуйте снова.';
        throw err;
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
    } finally {
      loading.value = false;
    }
  }
};

const fetchCourseData = async (id) => {
  if (!id) return

  loading.value = true
  error.value = ''

  try {
    const response = await courseUserService.fetchCourseWithBlocks(id)
    courseTitle.value = response.courseTitle || 'Курс без названия'
    courseImage.value = response.imageUrl
  } catch (err) {
    console.error('Ошибка при загрузке курса:', err)
    error.value = 'Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const id = route.params.courseId
  if (id) {
    courseId.value = id
    fetchCourseData(id)
  }
})
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
const blockId = computed(() => route.params.blocksId)
const lessonId = computed(() => route.params.lessonId)

// Навигация между уроками
const allLessons = ref([])
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

const lessonStarted = ref(false)

// Создайте функцию для отметки начала урока
// const startLesson = async (lessonId) => {
//   // Проверяем состояние из сервиса
//   if (LessonStateService.isLessonStarted(lessonId)) {
//     lessonStarted.value = true
//     return
//   }

//   try {
//     await markLessonAsStarted(lessonId)
//     lessonStarted.value = true
//   } catch (error) {
//     console.error('Ошибка при отметке начала урока:', error)
//   }
// }

// Навигация к следующему уроку
const navigateToNextLesson = async () => {
  // Если это последний урок, выполнить завершение блока
  if (isLastLesson.value) {
    // Добавить логику завершения блока
    router.push(`/course/${courseId.value}`);
    return;
  }

  // Иначе переходим к следующему уроку
  if (nextLessonId.value) {
    const nextUrl = `/course/${courseId.value}/blocks/${blockId.value}/lessons/${nextLessonId.value}`;
    router.push(nextUrl);
  }
}

const isLastLesson = computed(() => {
  return currentLessonIndex.value !== -1 && currentLessonIndex.value === allLessons.value.length - 1
})

// Функция для завершения последнего урока
// const completeLastLesson = async () => {
//   if (completingLesson.value) {
//     return
//   }

//   completingLesson.value = true

//   try {
//     // Отмечаем урок как завершенный
//     await markLessonAsComplete(lessonId.value)

//     // Дожидаемся завершения запроса
//     await new Promise((resolve) => setTimeout(resolve, 300))

//     // Очищаем состояние текущего урока перед переходом
//     LessonStateService.resetLessonState(lessonId.value)

//     // Переходим на страницу курса
//     router.push(`/course/${courseId.value}`)
//   } catch (error) {
//     console.error('Ошибка при завершении последнего урока:', error)
//     alert('Произошла ошибка при завершении урока. Пожалуйста, попробуйте еще раз.')
//   } finally {
//     // Устанавливаем таймаут для сброса состояния
//     setTimeout(() => {
//       completingLesson.value = false
//     }, 500)
//   }
// }

// Сбрасываем состояние отметки начала при смене урока

watch(allLessons, () => {}, { immediate: true })

watch([() => route.params.courseId, () => route.params.blocksId], ([newCourseId, newBlockId]) => {
  if (newCourseId && newBlockId) {
    fetchAllLessons()
  }
})


const fetchAllLessons = async () => {
  try {
    // Используем getLessonsByBlockId вместо отсутствующей функции
    const response = await courseService.getLessonsByBlockId(blockId.value);
    allLessons.value = response || [];

  } catch (err) {
    console.error('Ошибка при загрузке списка уроков:', err);
    error.value = 'Не удалось загрузить список уроков. Пожалуйста, попробуйте позже.';
  }
};

watch(
  () => route.params.lessonId,
  (newLessonId, oldLessonId) => {
    if (newLessonId && newLessonId !== oldLessonId) {
      // Сначала обнуляем текущие данные, чтобы показать загрузку
      lessonData.value = {
        lessonTitle: '',
        videoUrl: '',
        description: '',
        sheetUrl: '',
      }
      loading.value = true

      // Затем загружаем новые данные
      fetchLessonData()
    }
  },
  { immediate: true },
)

watch(
  () => route.params.lessonId,
  (newLessonId) => {
    if (newLessonId) {
      // Пытаемся получить картинку из localStorage
      const savedImageUrl = localStorage.getItem(`lesson_image_${newLessonId}`)

      if (savedImageUrl) {
        lessonImageUrl.value = savedImageUrl
        localStorage.removeItem(`lesson_image_${newLessonId}`)
      } else {
        // Если картинки нет в localStorage, ищем в списке уроков
        const currentLesson = allLessons.value.find(
          (lesson) => (lesson.id || lesson.lessonId) === newLessonId,
        )

        if (currentLesson && (currentLesson.imageUrl || currentLesson.lessonImage)) {
          lessonImageUrl.value = fixImageUrl(currentLesson.imageUrl || currentLesson.lessonImage)
        } else {
          // Если не нашли, сбрасываем URL изображения (будет обновлен в fetchLessonData)
          lessonImageUrl.value = ''
        }
      }
    }
  },
  { immediate: true },
)

// Получение всех уроков блока (для навигации)


// Навигация к предыдущему уроку
const navigateToPreviousLesson = () => {
  if (!previousLessonId.value) {
    console.log('Нет предыдущего урока')
    return
  }

  // Сохраняем информацию о картинке предыдущего урока перед переходом
  const prevLesson = allLessons.value.find(
    (lesson) => (lesson.id || lesson.lessonId) === previousLessonId.value,
  )

  if (prevLesson && (prevLesson.imageUrl || prevLesson.lessonImage)) {
    const prevImageUrl = fixImageUrl(prevLesson.imageUrl || prevLesson.lessonImage)
    console.log('Сохраняем изображение предыдущего урока:', prevImageUrl)
    localStorage.setItem(`lesson_image_${previousLessonId.value}`, prevImageUrl)
  }

  // Очищаем состояние текущего урока перед переходом, если сервис доступен
  if (typeof LessonStateService !== 'undefined') {
    LessonStateService.resetLessonState(lessonId.value)
  }

  // Переходим к предыдущему уроку
  router.push(`/course/${courseId.value}/blocks/${blockId.value}/lessons/${previousLessonId.value}`)
}

onBeforeUnmount(() => {
  // Очищаем состояние текущего урока при выходе со страницы
  if (lessonId.value) {
    LessonStateService.resetLessonState(lessonId.value)
  }
})

onMounted(async () => {
  try {
    loading.value = true

    // Сначала загружаем данные курса
    await fetchCourseData(courseId.value)

    // Затем данные урока
    const lessonInfo = await fetchLessonData()

    // Только после успешной загрузки урока получаем список уроков
    await fetchAllLessons()

    // Устанавливаем изображение после всех загрузок
    if (lessonInfo && lessonInfo.imageUrl) {
      lessonImageUrl.value = fixImageUrl(lessonInfo.imageUrl)
    } else {
      const savedImageUrl = localStorage.getItem(`lesson_image_${lessonId.value}`)
      if (savedImageUrl) {
        lessonImageUrl.value = savedImageUrl
      } else {
        lessonImageUrl.value = '/public/default-lesson.jpg'
      }
    }
  } catch (e) {
    error.value = 'Ошибка при загрузке урока. Попробуйте обновить страницу.'
    console.error('Ошибка загрузки:', e)
  } finally {
    loading.value = false
  }
})

// 4. Улучшите обработку состояния загрузки
// watch(
//   () => route.params.lessonId,
//   async (newLessonId, oldLessonId) => {
//     if (newLessonId && newLessonId !== oldLessonId) {
//       loading.value = true
//       error.value = ''
//       lessonStarted.value = false

//       try {
//         // Сначала обнуляем текущие данные
//         lessonData.value = {
//           lessonTitle: '',
//           videoUrl: '',
//           description: '',
//           sheetUrl: '',
//           imageUrl: '',
//         }

//         // Затем загружаем новые
//         await fetchLessonData()
//         // Не обязательно перезагружать весь список уроков при смене урока
//       } catch (e) {
//         error.value = 'Не удалось загрузить урок. Попробуйте еще раз.'
//       } finally {
//         loading.value = false
//       }
//     }
//   },
//   { immediate: true },
// )
</script>

<style scoped>
p {
  font-size: 1.1rem;
}

.page-wrapper {
  background-color: #fff8f2;
  min-height: 100vh;
}

.panel-text {
  font-size: 0.9rem;
}

.content-container {
  max-width: 100%;
}

.content-wrapper {
  gap: 0.5vw;
  display: flex;
}

.nav--buttons {
  margin-left: 10px;
}

.lesson-info {
  border-radius: 8px;
  padding: 16px;
  font-size: 24px;
}

.video-block {
  flex-grow: 1;
}

.v-btn {
  font-weight: 300;
}

.v-expansion-panel {
  background-color: #333132;
  color: white;
  margin-top: 1vh;
}

.material-link {
  color: #f48a21;
  text-decoration: none;
}

.material-link:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  padding: 20px;
  text-align: center;
}

@media (max-width: 819px) {
  .content-wrapper {
    flex-direction: column;
  }

  .lesson-sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

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
    font-size: 0.62rem;
  }
}
</style>
