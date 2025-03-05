<template>
  <v-card
    @click="$emit('click', courseData.id)"
    class="course-lessons rounded-lg"
    :width="mdAndDown ? '50vw' : '30vw'"
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
        <span class="font-weight-regular">{{ courseData.title }}</span>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'

const { mdAndDown } = useDisplay()

// Массив данных внутри компонента (имитация данных с сервера)
const coursesData = ref([
  {
    id: 1,
    number: '01',
    title: 'Основы работы с бриошью',
    imagePath: '/public/main--menu.JPG'
  },
  {
    id: 2,
    number: '02',
    title: 'Продвинутые техники вязания',
    imagePath: '/public/course-advanced.jpg'
  },
  {
    id: 3,
    number: '03',
    title: 'Создание узоров и орнаментов',
    imagePath: '/public/course-patterns.jpg'
  }
])

// Принимаем ID курса, который нужно отобразить
const props = defineProps<{
  courseId?: number | string
}>()

// Вычисляем данные курса, которые нужно отобразить
const courseData = computed(() => {
  // Если передан ID, находим соответствующий курс
  if (props.courseId) {
    const found = coursesData.value.find(course => course.id === props.courseId)
    return found || coursesData.value[0] // Если не найден, берем первый
  }
  // Если ID не передан, берем первый курс
  return coursesData.value[0]
})

defineEmits(['click'])

// В будущем здесь может быть функция для загрузки данных с сервера
// async function fetchCoursesData() {
//   // API запрос
//   // coursesData.value = await response.json()
// }
</script>

<style lang="css" scoped>
.card-text {
    font-size: 0.9rem;
    word-break: break-word;
}

.v-card {
    min-height: 1vh;
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
  height: 16vh;
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
