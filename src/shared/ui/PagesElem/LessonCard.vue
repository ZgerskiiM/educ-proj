<template>
  <v-card
    @click="$emit('click', courseData.id)"
    class="course-lessons rounded-lg"
    :width="mdAndDown ? '50vw' : '20vw'"
    elevation="1"
  >
    <v-img
      :src="courseData.imagePath"
      class="responsive-image mr-3 ml-3 mt-3 rounded-lg"
      :aspect-ratio="16/9"
      cover
    />
    <div class="pa-4">
      <div class="card-text d-flex flex-wrap">
        <span class="font-weight-bold mr-1">{{ courseData.number }} /</span>
        <span class="font-weight-light">{{ courseData.title }}</span>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()

const props = defineProps({
  courseData: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])
</script>

<style lang="css" scoped>
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
  max-height: 22vh;
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
