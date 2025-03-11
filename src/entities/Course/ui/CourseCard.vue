<template>
    <v-card rounded="lg" elevation="1" class="cabinet-card d-flex flex-column overflow-x">
      <div class="position-relative">
        <v-img
          :src="course.imageUrl"
          height="250"
          cover
          class="rounded-t-lg"
          :alt="course.title"
        ></v-img>
        <!-- <div class="progress-container">
          <v-tooltip location="top" :text="`Прогресс: ${course.progress}%`">
            <template v-slot:activator="{ props }">
              <v-progress-linear
                v-bind="props"
                v-model="course.progress"
                height="8"
                :color="getProgressColor(course.progress)"
                rounded
              ></v-progress-linear>
            </template>
          </v-tooltip>
        </div> -->
      </div>
      <v-card-title class="text-truncate">{{ course.title }}</v-card-title>
      <v-card-text class="py-1">
        <div class="d-flex align-center mb-2">
          <!-- <v-icon icon="mdi-book-open-variant" size="small" class="mr-1"></v-icon>
          <span class="text-caption">{{ course.lessonsCompleted }} из {{ course.totalLessons }} уроков</span> -->
        </div>
        <div class="text-caption text-truncate-2 course-description">
          {{ course.description }}
        </div>
      </v-card-text>
      <v-card-actions class="mt-auto">
        <v-btn
          variant="flat"
          block
          class="card-btn-text text-none	font-weight-regular w-50"
          color="#333132"
          prepend-icon="mdi-play"
          :to="`/course/${course.id}`"
        >
          {{ course.progress > 0 ? 'Продолжить' : 'Приступить' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

  <script setup>
  defineProps({
    course: { type: Object, required: true }
  });

  function getProgressColor(progress) {
    if (progress < 30) return 'red';
    if (progress < 70) return 'orange';
    return 'green';
  }
  </script>

<style scoped>
.cabinet-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cabinet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-btn-text {
  font-size: 1rem;
}
</style>
