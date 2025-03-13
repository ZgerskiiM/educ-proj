<template>
  <v-card
    @click="$emit('click', courseData.id)"
    class="course-lessons rounded-lg"
    :width="mdAndDown ? '50vw' : '20vw'"
    elevation="1"
  >
    <v-img
      :src="courseData.imagePath"
      class="responsive-image rounded-t"
      :aspect-ratio="16/9"
      cover
    ></v-img>

    <div class="pa-4">
      <div class="card-text d-flex flex-wrap">
        <span class="font-weight-bold mr-1">{{ courseData.number }} /</span>
        <span class="font-weight-light">{{ courseData.title }}</span>
      </div>
      <div v-if="courseData.progress" class="progress-badge mt-2" :class="progressClass">
        {{ progressText }}
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { computed } from 'vue'

const { mdAndDown } = useDisplay()

// Принимаем данные урока
const props = defineProps({
  courseData: {
    type: Object,
    required: true
  }
})

// Определяем текст и класс для статуса прогресса
const progressText = computed(() => {
  switch(props.courseData.progress) {
    case 'IN_PROGRESS': return 'В процессе';
    case 'COMPLETED': return 'Завершено';
    default: return 'Не начато';
  }
})

const progressClass = computed(() => {
  switch(props.courseData.progress) {
    case 'IN_PROGRESS': return 'progress-in-progress';
    case 'COMPLETED': return 'progress-completed';
    default: return 'progress-not-started';
  }
})

defineEmits(['click'])
</script>

<style lang="css" scoped>

.progress-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.progress-in-progress {
  background-color: #fff3e0;
  color: #F48A21;
}

.progress-completed {
  background-color: #e8f5e9;
  color: #4caf50;
}

.progress-not-started {
  background-color: #f5f5f5;
  color: #9e9e9e;
}

.card-text {
    font-size: 0.9rem;
    word-break: break-word;
}

.v-card {
    min-height: 35vh;
    height: auto;
    background-color: #FFFFFF;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
}

.v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.responsive-image {
  width: 100%;
  max-height: 22vh;
  min-width: 0vw;
}

/* Сохраняем остальные стили */
.course-title {
    font-size: 2rem
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
</style>
