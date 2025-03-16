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
      </div>
      <v-card-title class=" font-weight-regular">{{ course.title }}</v-card-title>
      <v-card-text class="py-1">
        <div class="d-flex align-center mb-2">
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
          @click="navigateToCourse"
          >
          {{ course.progress > 0 ? 'Продолжить' : 'Приступить' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  course: { type: Object, required: true }
});

const router = useRouter();
const emit = defineEmits(['navigate']);

function navigateToCourse() {
  localStorage.setItem(`original_course_image_${props.course.id}`, props.course.imageUrl);
  router.push(`/course/${props.course.id}`);
}
</script>

<style scoped>
.cabinet-card {

  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card-title {
  font-size: 1rem;
}

.cabinet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-btn-text {
  font-size: 1rem;
}
</style>
