<template>
    <v-card rounded="lg" elevation="1" class="cabinet-card d-flex flex-column">
        <v-img
          :src="course.imageUrl"
          class="mr-3 ml-3 mt-3 rounded-lg"
          :alt="course.title"
        />
      <v-card-title class=" font-weight-medium">
        {{ course.title }}
      </v-card-title>
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
          class="card-btn-text text-none	font-weight-light w-50"
          color="#333132"
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

    border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;
  transition: transform 0.3s, box-shadow 0.3s;
  
}

.v-card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;

}



.cabinet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-btn-text {
  font-size: 1rem;
}
</style>
