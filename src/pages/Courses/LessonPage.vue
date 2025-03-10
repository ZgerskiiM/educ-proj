<template>
    <div class="page-wrapper">
        <Header/>
        <v-container fluid class="content-container px-6 pt-2"
        :width="mdAndDown ? '100vw' : '80vw'"
        >
            <div v-if="loading" class="d-flex justify-center my-5">
                <v-progress-circular indeterminate color="#F48A21"></v-progress-circular>
            </div>
            <div v-else-if="error" class="error-message">
                {{ error }}
            </div>
            <div v-else>

              <div v-if="!mdAndDown" class="breadcrumbs-container">
                <v-breadcrumbs
                    class="mb-1 pl-0 font-weight-light"
                    color="#F48A21"
                >
                    <v-breadcrumbs-item to="/lk">Профиль</v-breadcrumbs-item>
                    <v-breadcrumbs-item :to="`/course/${courseId}`">{{ courseTitle }}</v-breadcrumbs-item>
                    <v-breadcrumbs-item :to="`/course/${courseId}/blocks/${blockId}`">Уроки</v-breadcrumbs-item>
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
                        <VideoPlayer
                        :video-url="lessonData.videoUrl"
                        :poster-image="lessonImageUrl"
                        />
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
                            <template v-else>
                                Предыдущий урок
                            </template>
                        </v-btn>

                        <v-btn
                          class="text-none rounded-lg ml-4"
                          :width="mdAndDown ? '40vw' : 'regular'"
                          variant="outlined"
                          color="#333132"
                          @click="isLastLesson ? completeLastLesson() : navigateToNextLesson()"
                          :loading="completingLesson"
                      >
    <template v-if="mdAndDown">
        {{ isLastLesson ? 'Завершить' : 'Следующий' }}
        <v-icon>mdi-arrow-right</v-icon>
    </template>
    <template v-else>
        {{ isLastLesson ? 'Завершить курс' : 'Следующий урок' }}
    </template>
</v-btn>
                        </div>
                    </div>
                    <div class="lesson-sidebar">
                      <v-expansion-panels class="w-100">
                        <v-expansion-panel class="w-100" key="1" title="01 / Описание урока">
                            <template v-slot:text>
                                <div class="font-weight-light" v-html="lessonData.description || 'Описание отсутствует'"></div>
                            </template>
                        </v-expansion-panel>
                        <v-expansion-panel class="w-100" key="2" title="02 / Дополнительные материалы">
                            <template v-slot:text>
                                <p class="font-weight-light" v-if="lessonData.sheetUrl">
                                    <a :href="lessonData.sheetUrl" target="_blank" class="material-link">
                                        Скачать материалы к уроку
                                    </a>
                                </p>
                                <p class="panel-text font-weight-light" v-else>
                                    У данного урока нет материалов
                                </p>
                            </template>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from "@/shared/ui/PagesElem/Header.vue";
import { useDisplay } from 'vuetify';
import VideoPlayer from "@/entities/Course/VideoPlayer.vue";
import { courseService } from '@/shared/api/courseService';
import { markLessonAsComplete, markLessonAsStarted } from '@/shared/api/UserService';
import { LessonStateService } from '@/shared/api/LessonStateService';

const { mdAndDown } = useDisplay();
const route = useRoute();
const router = useRouter();

const lessonImageUrl = ref('');


const fixImageUrl = (url) => {
  if (!url) {
    return '/public/default-lesson.jpg';
  }

  let fixedUrl = url.replace(/https:\/\/https:\/\//g, 'https://');
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, 'https://');


  return fixedUrl;
};

onMounted(async () => {
  const currentLessonId = route.params.lessonId;

  // Получаем сохраненный URL изображения из localStorage
  const savedImageUrl = localStorage.getItem(`lesson_image_${currentLessonId}`);

  if (savedImageUrl) {
    console.log('Получено изображение урока из localStorage:', savedImageUrl);
    lessonImageUrl.value = savedImageUrl;

    // Удаляем из хранилища после использования
    localStorage.removeItem(`lesson_image_${currentLessonId}`);
  }

  // Выполняем загрузку данных урока и списка уроков
  await Promise.all([
    fetchLessonData(),
    fetchAllLessons()
  ]);

  // Если изображение не было получено из localStorage, используем из данных урока
  if (!lessonImageUrl.value && lessonData.value.imageUrl) {
    lessonImageUrl.value = fixImageUrl(lessonData.value.imageUrl);
  }
});

// В начале script setup

// Состояние
const loading = ref(true);
const error = ref('');
const lessonData = ref({
    lessonTitle: '',
    videoUrl: '',
    description: '',
    sheetUrl: '',
    imageUrl: '',
});

// Параметры навигации
const courseId = computed(() => route.params.courseId);
const blockId = computed(() => route.params.blocksId);
const lessonId = computed(() => route.params.lessonId);
const courseTitle = ref('Пекарская витрина: от Булок до Хлеба');

// Навигация между уроками
const allLessons = ref([]);
const currentLessonIndex = computed(() => {
  const current = lessonId.value ? String(lessonId.value) : null;
  return allLessons.value.findIndex(lesson => {
    const lessonIdStr = lesson.id ? String(lesson.id) : null;
    const lessonLessonIdStr = lesson.lessonId ? String(lesson.lessonId) : null;
    return lessonIdStr === current || lessonLessonIdStr === current;
  });
});

const previousLessonId = computed(() => {
    if (currentLessonIndex.value > 0) {
        const lesson = allLessons.value[currentLessonIndex.value - 1];
        return lesson.id || lesson.lessonId;
    }
    return null;
});

const nextLessonId = computed(() => {
    if (currentLessonIndex.value < allLessons.value.length - 1 && currentLessonIndex.value !== -1) {
        const lesson = allLessons.value[currentLessonIndex.value + 1];
        return lesson.id || lesson.lessonId;
    }
    return null;
});

const lessonStarted = ref(false);



// Создайте функцию для отметки начала урока
const startLesson = async (lessonId) => {
  // Проверяем состояние из сервиса
  if (LessonStateService.isLessonStarted(lessonId)) {
    lessonStarted.value = true;
    return;
  }

  try {
    await markLessonAsStarted(lessonId);
    lessonStarted.value = true;
  } catch (error) {
    console.error('Ошибка при отметке начала урока:', error);
  }
};

// Навигация к следующему уроку
const navigateToNextLesson = async () => {
  if (completingLesson.value) {
    console.log('Переход уже выполняется, пропускаем');
    return;
  }

  if (!nextLessonId.value) {
    console.log('Нет следующего урока');
    return;
  }

  completingLesson.value = true;

  try {
    // Сохраняем информацию о картинке следующего урока перед переходом
    const nextLesson = allLessons.value.find(
      lesson => (lesson.id || lesson.lessonId) === nextLessonId.value
    );

    if (nextLesson && (nextLesson.imageUrl || nextLesson.lessonImage)) {
      const nextImageUrl = fixImageUrl(nextLesson.imageUrl || nextLesson.lessonImage);
      console.log('Сохраняем изображение следующего урока:', nextImageUrl);
      localStorage.setItem(`lesson_image_${nextLessonId.value}`, nextImageUrl);
    }

    // Отмечаем урок как завершенный
    await markLessonAsComplete(lessonId.value);
    console.log('Урок отмечен как завершенный');

    // Дожидаемся завершения запроса
    await new Promise(resolve => setTimeout(resolve, 300));

    // Проверяем, что компонент все еще смонтирован
    if (nextLessonId.value) {
      const nextUrl = `/course/${courseId.value}/blocks/${blockId.value}/lessons/${nextLessonId.value}`;
      console.log('Переход к следующему уроку:', nextUrl);

      // Очищаем состояние текущего урока перед переходом
      if (typeof LessonStateService !== 'undefined') {
        LessonStateService.resetLessonState(lessonId.value);
      }

      // Переходим к следующему уроку
      router.push(nextUrl);
    }
  } catch (error) {
    console.error('Ошибка при переходе к следующему уроку:', error);
  } finally {
    // Устанавливаем таймаут для сброса состояния
    setTimeout(() => {
      completingLesson.value = false;
    }, 500);
  }
};

const isLastLesson = computed(() => {
  return currentLessonIndex.value !== -1 &&
         currentLessonIndex.value === allLessons.value.length - 1;
});

// Функция для завершения последнего урока
const completeLastLesson = async () => {
  if (completingLesson.value) {
    return;
  }

  completingLesson.value = true;

  try {
    // Отмечаем урок как завершенный
    await markLessonAsComplete(lessonId.value);

    // Дожидаемся завершения запроса
    await new Promise(resolve => setTimeout(resolve, 300));

    // Очищаем состояние текущего урока перед переходом
    LessonStateService.resetLessonState(lessonId.value);

    // Переходим на страницу курса
    router.push(`/course/${courseId.value}`);
  } catch (error) {
    console.error('Ошибка при завершении последнего урока:', error);
    alert('Произошла ошибка при завершении урока. Пожалуйста, попробуйте еще раз.');
  } finally {
    // Устанавливаем таймаут для сброса состояния
    setTimeout(() => {
      completingLesson.value = false;
    }, 500);
  }
};

// Сбрасываем состояние отметки начала при смене урока
watch(() => route.params.lessonId, (newLessonId, oldLessonId) => {
  lessonStarted.value = false; // Сбрасываем флаг начала урока

  if (newLessonId && newLessonId !== oldLessonId) {
    // Сначала обнуляем текущие данные, чтобы показать загрузку
    lessonData.value = {
      lessonTitle: '',
      videoUrl: '',
      description: '',
      sheetUrl: ''
    };
    loading.value = true;

    // Небольшая задержка перед загрузкой данных нового урока
    setTimeout(() => {
      fetchLessonData();
    }, 100);
  }
}, { immediate: true });

watch(allLessons, () => {

}, { immediate: true });

watch([() => route.params.courseId, () => route.params.blocksId], ([newCourseId, newBlockId]) => {
  if (newCourseId && newBlockId) {
    fetchAllLessons();
  }
});

const completingLesson = ref(false);

// Навигация к следующему уроку с отметкой о завершении





// Получение данных урока
const fetchLessonData = async () => {
  loading.value = true;
  error.value = '';

  try {
    const currentLessonId = route.params.lessonId;
    console.log('Загрузка данных для урока:', currentLessonId);

    const data = await courseService.getLessonDetails(currentLessonId);
    console.log('Получены данные урока:', data);

    // Обновляем данные в интерфейсе
    lessonData.value = data;

    // Обновляем URL изображения, если его еще нет
    if (!lessonImageUrl.value && data.imageUrl) {
      lessonImageUrl.value = fixImageUrl(data.imageUrl);
    }

    // Отмечаем урок как начатый после загрузки данных
    await startLesson(currentLessonId);

  } catch (err) {
    console.error('Ошибка при загрузке урока:', err);
    error.value = 'Не удалось загрузить данные урока';
  } finally {
    loading.value = false;
  }
};

watch(() => route.params.lessonId, (newLessonId, oldLessonId) => {
  if (newLessonId && newLessonId !== oldLessonId) {
    // Сначала обнуляем текущие данные, чтобы показать загрузку
    lessonData.value = {
      lessonTitle: '',
      videoUrl: '',
      description: '',
      sheetUrl: ''
    };
    loading.value = true;

    // Затем загружаем новые данные
    fetchLessonData();
  }
}, { immediate: true });

watch(() => route.params.lessonId, (newLessonId) => {
  if (newLessonId) {
    // Пытаемся получить картинку из localStorage
    const savedImageUrl = localStorage.getItem(`lesson_image_${newLessonId}`);

    if (savedImageUrl) {
      console.log('Получено изображение урока из localStorage при переходе:', savedImageUrl);
      lessonImageUrl.value = savedImageUrl;
      localStorage.removeItem(`lesson_image_${newLessonId}`);
    } else {
      // Если картинки нет в localStorage, ищем в списке уроков
      const currentLesson = allLessons.value.find(
        lesson => (lesson.id || lesson.lessonId) === newLessonId
      );

      if (currentLesson && (currentLesson.imageUrl || currentLesson.lessonImage)) {
        lessonImageUrl.value = fixImageUrl(currentLesson.imageUrl || currentLesson.lessonImage);
      } else {
        // Если не нашли, сбрасываем URL изображения (будет обновлен в fetchLessonData)
        lessonImageUrl.value = '';
      }
    }
  }
}, { immediate: true });

// Получение всех уроков блока (для навигации)
const fetchAllLessons = async () => {
    try {
        const data = await courseService.getLessonsByBlockId(blockId.value);
        allLessons.value = data;
    } catch (err) {
        console.error('Ошибка при загрузке списка уроков:', err);
    }
};

// Навигация к предыдущему уроку
const navigateToPreviousLesson = () => {
  if (!previousLessonId.value) {
    console.log('Нет предыдущего урока');
    return;
  }

  // Сохраняем информацию о картинке предыдущего урока перед переходом
  const prevLesson = allLessons.value.find(
    lesson => (lesson.id || lesson.lessonId) === previousLessonId.value
  );

  if (prevLesson && (prevLesson.imageUrl || prevLesson.lessonImage)) {
    const prevImageUrl = fixImageUrl(prevLesson.imageUrl || prevLesson.lessonImage);
    console.log('Сохраняем изображение предыдущего урока:', prevImageUrl);
    localStorage.setItem(`lesson_image_${previousLessonId.value}`, prevImageUrl);
  }

  // Очищаем состояние текущего урока перед переходом, если сервис доступен
  if (typeof LessonStateService !== 'undefined') {
    LessonStateService.resetLessonState(lessonId.value);
  }

  // Переходим к предыдущему уроку
  router.push(`/course/${courseId.value}/blocks/${blockId.value}/lessons/${previousLessonId.value}`);
};

onBeforeUnmount(() => {
  // Очищаем состояние текущего урока при выходе со страницы
  if (lessonId.value) {
    LessonStateService.resetLessonState(lessonId.value);
  }
});

// Загрузка данных при монтировании компонента
onMounted(async () => {
  await Promise.all([
    fetchLessonData(),
    fetchAllLessons()
  ]);
});

</script>

<style scoped>
p {
    font-size: 1.1rem
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
    color: #F48A21;
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
