<template>
  <v-card
    @click="$emit('click', courseData.id)"
    :class="mdAndDown ? 'course-block-card d-flex flex-column rounded-sm' : 'rounded-lg	 course-block-card d-flex align-center'"
    width="100%"
    flat
    elevation="1"
  >
    <v-img
      :src="courseData.imagePath"
      class="responsive-image rounded-t"
      :aspect-ratio="16/9"
      cover
    />
    <div
      :class="mdAndDown ? 'card-text px-2 py-3 flex-grow-1' : 'card-text ml-10 flex-grow-1'"
    >
      <div class="d-flex align-center justify-space-between">
        <div class="text-h7">
          <span class="font-weight-regular">Блок {{ courseData.number }} / </span>
          <span class="font-weight-light">{{ courseData.title }}</span>
        </div>
      </div>

      <!-- Десктопная версия чипов -->
      <div v-if="!mdAndDown" class="chip d-flex flex-wrap gap-2 mt-2">
        <v-chip
          class="custom-chip1 font-weight-light my-1"
          :text="courseData.duration"
          label
        >
        </v-chip>

        <v-chip
          style="background-color: #FFE68E;"
          class="custom-chip2 font-weight-light my-1 ml-2"
          label
          color="#333132"
        >
          {{ courseData.lessons }} уроков
        </v-chip>

        <v-chip
          style="background-color: #FEE99E; color: #333132"
          class="custom-chip3 font-weight-light my-1 ml-2"
          label
        >
          {{ courseData.cards }} технологических карт
        </v-chip>
      </div>

      <!-- Мобильная версия чипов -->
      <div v-else class="chip-container w-100 mt-2 ">
        <v-chip
          class="custom-chip1 equal-width-chip"
          :text="courseData.duration"
          label
        >
        </v-chip>

        <v-chip
          style="background-color: #FFE68E;"
          class="custom-chip2 equal-width-chip mx-1"
          label
          color="#333132"
        >
          {{ courseData.lessons }} уроков
        </v-chip>

        <v-chip
          style="background-color: #FEE99E; color: #333132"
          class="custom-chip3 equal-width-chip"
          label
        >
          {{ courseData.cards }} технологических <br> карт
        </v-chip>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

const { smAndDown, mdAndDown } = useDisplay();

const fixImageUrl = (url) => {
  if (!url) {
    return '/public/default-lesson.jpg';
  }

  // Исправляем только дублирование протокола, не трогая русские символы
  let fixedUrl = url.replace(/https:\/\/https:\/\//g, 'https://');
  fixedUrl = fixedUrl.replace(/https:\/\/https\//g, 'https://');


  return fixedUrl;
};

// Принимаем данные курса напрямую из родительского компонента
const props = defineProps({
  courseData: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      number: '1',
      title: 'Загрузка...',
      imagePath: '/public/placeholder.jpg',
      progress: {
        completed: 0,
        total: 0
      },
      duration: '0 часов',
      lessons: 0,
      cards: 0
    })
  }
});

defineEmits(['click']);
</script>


<style lang="css" scoped>
.v-card {
    height: 1vh;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.chip-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.equal-width-chip {
    flex: 1 1 0 !important;
    text-align: center;
    justify-content: center;
}

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

.responsive-image {
  width: 100%;
  height: 100vh;
  max-width: 15vw;
  min-width: 0vw;
}

.gap-2 {
  gap: 8px;
}

@media (max-width: 819px) {
  h1 {
    font-size: 1rem;
  }

  .responsive-image {
    width: 100%;
    height: 100vh;
    max-width: 100vw;
    max-height: 10vh;
  }

  .card-text {
    font-size: 0.7rem;
  }

  .v-chip {
    font-size: 0.47rem;
  }

  span {
    font-size: 0.8rem;
  }

  h2 {
    font-size: 1.1rem;
  }

  h3 {
    font-size: 0.9rem;
  }

  .progress-small {
    font-size: 0.6rem;
    display: flex;
    align-items: center;
  }

  .mx-2 {
    margin-left: 8px !important;
    margin-right: 8px !important;
  }
}
</style>
