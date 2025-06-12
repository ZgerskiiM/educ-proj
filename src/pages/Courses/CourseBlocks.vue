<template>
  <div class="page-wrapper">
    <Header />
    <v-container class="lesson-container pr-0" :width="mdAndDown ? '100vw' : '60vw'">
      <h2 class="mt-5 font-weight-medium">{{ courseTitle }}</h2>
      <h3 class="mb-2 font-weight-regular">Авторский курс от Максима Бабича</h3>
      
      <div class="action-buttons-container d-flex ga-3 mt-4 mb-5">
        <v-btn
          class="text-none secondary-action-btn"
          variant="outlined"
          color="#313131"
          text="Назад"
          :to="`/profile`"
        />
        <v-btn
          class="text-none primary-action-btn"
          variant="outlined"
          color="#F48A21"
          text="Чат курса"
          prepend-icon="mdi-forum"
          @click="navigateToSupport"
        />
      </div>
      
      <div v-if="loading" class="d-flex justify-center my-5">
        <v-progress-circular
          color="#F48A21"
          indeterminate
        />
      </div>

      <v-alert 
        v-if="error" 
        type="error" 
        class="my-3"
      >
        {{ error }}
      </v-alert>

      <v-container
        v-if="!loading && !error"
        class="d-flex flex-column ga-7 ml-0 pl-0 align-center"
      >
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
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { courseUserService } from "@/shared/api/courseUserService";
import Header from "@/shared/ui/PagesElem/Header.vue";
import CourseCard from "@/shared/ui/PagesElem/CourseCard.vue";
import AppFooter from "@/shared/ui/PagesElem/AppFooter.vue";

const { mdAndDown } = useDisplay();
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const error = ref("");
const courseTitle = ref("Пекарская витрина: от Булок до Хлеба");
const courseBlocks = ref<any[]>([]);
const courseId = ref<string | string[] | null>(null);
const courseSupport = ref("");
const originalCourseImage = ref("");

const fetchCourseData = async (id: string | string[]) => {
  if (!id) return;

  loading.value = true;
  error.value = "";

  try {
    const response = await courseUserService.fetchCourseWithBlocks(id);
    courseTitle.value = response.courseTitle || "Курс без названия";
    courseBlocks.value = response.blocks || [];
    courseSupport.value = response.chat;

    if (response.imageUrl) {
      originalCourseImage.value = fixImageUrl(response.imageUrl);
    }
  } catch (err) {
    console.error("Ошибка при загрузке курса:", err);
    error.value =
      "Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.";
    courseBlocks.value = [];
  } finally {
    loading.value = false;
  }
};

const fixImageUrl = (url: string) => {
  if (!url) {
    return "/public/default-lesson.jpg";
  }

  let fixedUrl = url.replace(/https:\/\/https:\/\//g, "https://");
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, "https://");

  return fixedUrl;
};

const formatBlockData = (block: any, number: number) => {
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
  };
};

const defaultSupportLink = "https://t.me/babichbaker_course";

const navigateToSupport = () => {
  const isValidLink =
    courseSupport &&
    courseSupport.value &&
    typeof courseSupport.value === "string" &&
    courseSupport.value.trim() !== "" &&
    !courseSupport.value.includes("null");

  // Если ссылка валидная, используем её, иначе используем дефолтную
  const telegramLink = isValidLink ? courseSupport.value : defaultSupportLink;

  // Открываем ссылку в новом окне
  window.open(telegramLink, "_blank");
};
// Навигация к уроку
const navigateToLesson = (courseId: string | string[] | null, blockId: string) => {
  if (courseId) {
    // Ensure courseId is a string
    const courseIdStr = Array.isArray(courseId) ? courseId[0] : courseId;
    router.push(`/course/${courseIdStr}/blocks/${blockId}`);
  }
};

// Следим за изменением ID курса в URL
watch(
  () => route.params.courseId,
  (newId) => {
    if (newId && newId !== courseId.value) {
      courseId.value = newId;
      fetchCourseData(newId);
    }
  },
);

onMounted(() => {
  const id = route.params.courseId;
  if (id) {
    courseId.value = id;
    fetchCourseData(id);
  }
});
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

.action-buttons-container {
  width: 100%;
}

.primary-action-btn, .secondary-action-btn {
  min-width: 150px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.primary-action-btn {
  border-width: 2px;
}
</style>
