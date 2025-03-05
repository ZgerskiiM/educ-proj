<template>
    <v-app>
      <Header />

      <v-main class="bg-grey-lighten-5">
        <v-container width="80vw">
          <v-row class="mb-2">
            <v-col cols="12">
              <h1 class="font-weight-medium">Личный кабинет</h1>
            </v-col>
          </v-row>

          <v-card class="profile--card mb-8 border-md" flat rounded="xl" color="#FAFAFA" >
  <v-card-text>
    <v-row>
      <v-col cols="12" md="4" class="d-flex flex-column" >
        <v-avatar size="160" class="mb-4">
          <v-img :src="user.photo" alt="Фото профиля"></v-img>
        </v-avatar>
        <v-file-input
          v-if="isEditing"
          label="Изменить фото"
          accept="image/*"
          prepend-icon=""
          variant="outlined"
          density="compact"
          hide-details
          class="mb-2"
          style="max-width: 160px;"
          v-model="uploadedPhoto"
          @update:model-value="handlePhotoUpload"
        ></v-file-input>
      </v-col>

      <v-col cols="12" md="8">
        <div v-if="!isEditing">
          <div class="d-flex justify-space-between align-center mb-4">
            <div class="">Личная информация</div>
            <v-btn
              color="#31331"
              prepend-icon="mdi-pencil"
              size="small"
              variant="text"
              @click="isEditing = true"
            >
              Редактировать
            </v-btn>
          </div>

          <v-list color="#FAFAFA" >
            <v-list-item>
              <template v-slot:prepend >
                <v-icon icon="mdi-account" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>Имя</v-list-item-title>
              <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon icon="mdi-email" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>Email</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>

        <v-form v-else>
          <div class="d-flex justify-space-between align-center mb-4">
            <div class="">Редактирование профиля</div>
          </div>

          <v-text-field
            v-model="editedUser.name"
            label="Имя"
            variant="outlined"
            class="mb-3"
            density="comfortable"
          ></v-text-field>

          <v-text-field
            v-model="editedUser.email"
            label="Email"
            variant="outlined"
            class="mb-3"
            density="comfortable"
          ></v-text-field>

          <div class="d-flex gap-3 ga-2">
            <v-btn
              color="#333132"
              @click="saveProfile"
            >
              Сохранить
            </v-btn>

            <v-btn
              color="grey"
              variant="outlined"
              @click="cancelEditing"
            >
              Отмена
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-card-text>
</v-card>
          <!-- Мои курсы -->
          <div class="mb-8">
            <div class="d-flex justify-space-between align-center mb-4">
              <h2 class="font-weight-regular">Мои курсы</h2>
            </div>

            <!-- Фильтры курсов -->
            <div class="filter-tabs mb-4">
              <v-btn-toggle
                v-model="courseFilter"
                color="#333132"
                rounded="lg"
                mandatory
              >
                <v-btn
                  class="font-weight-regular"
                  value="all"
                >Все</v-btn>
                <v-btn
                  class="font-weight-regular"
                  value="not-started"
                >
                Не начатые</v-btn>
                <v-btn
                  class="font-weight-regular"
                  value="in-progress"
                >
                В процессе</v-btn>
                <v-btn
                  class="font-weight-regular"
                  value="completed"
                >
                Завершенные</v-btn>
              </v-btn-toggle>
            </div>

            <v-row>
              <v-col
                v-for="(course, index) in filteredCourses"
                :key="index"
                cols="12"
                sm="6"
                lg="3"
              >
                <v-card rounded="lg" elevation="1" class="cabinet-card d-flex flex-column overflow-x	" >
                  <div class="position-relative">
                    <v-img
                      :src="course.image"
                      height="250"
                      cover
                      class="rounded-t-lg"
                      :alt="course.title"
                    ></v-img>

                    <!-- Прогресс-бар над изображением -->
                    <div class="progress-container">
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
                    </div>
                  </div>

                  <v-card-title class="text-truncate">{{ course.title }}</v-card-title>

                  <v-card-text class="py-1">
                    <div class="d-flex align-center mb-2">
                      <v-icon icon="mdi-book-open-variant" size="small" class="mr-1"></v-icon>
                      <span class="text-caption">{{ course.lessonsCompleted }} из {{ course.totalLessons }} уроков</span>
                    </div>

                    <div class="text-caption text-truncate-2 course-description">
                      {{ course.description }}
                    </div>
                  </v-card-text>

                  <v-card-actions class="mt-auto">
                    <v-btn
                      block
                      color="#333132"
                      prepend-icon="mdi-play"
                      :to="`/course/${course.id}`"
                    >
                      {{ course.progress > 0 ? 'Продолжить' : 'Приступить' }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col v-if="filteredCourses.length === 0" cols="12">
                <v-card rounded="lg" elevation="0" class="d-flex flex-column align-center justify-center">
                  <v-icon icon="mdi-book-outline" size="64" color="grey-lighten-1" class="mb-4"></v-icon>
                  <div class=" mb-2">
                    {{ getNoCourseMessage() }}
                  </div>
                  <div class=" mb-6 text-grey">Выберите другой фильтр или перейдите в каталог</div>
                  <v-btn color="#333132" to="/catalog">Перейти в каталог</v-btn>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div>
            <div class="d-flex justify-space-between align-center mb-4">
              <h2 class="font-weight-regular">Мои сертификаты</h2>
            </div>
            <v-row>
              <v-col
                v-for="(certificate, index) in certificates"
                :key="index"
                cols="12"
                sm="6"
                lg="3"
              >
                <v-card rounded="lg" class="cabinet-card" elevation="1">
                  <v-img
                    :src="certificate.image"
                    height="200"
                    cover
                    contain
                    class="bg-grey-lighten-4 mb-5"
                    :alt="`Сертификат: ${certificate.courseName}`"
                  ></v-img>

                  <v-card-title class="text-truncate">{{ certificate.courseName }}</v-card-title>

                  <v-card-subtitle class="py-1">
                    Выдан: {{ certificate.issueDate }}
                  </v-card-subtitle>

                  <v-card-actions class="mt-3">
                    <v-btn
                      color="#333132"
                      prepend-icon="mdi-download"
                      variant="tonal"
                      size="small"
                      @click="downloadCertificate(certificate.id)"
                    >
                      Скачать
                    </v-btn>

                    <v-btn
                      color="#333132"
                      prepend-icon="mdi-open-in-new"
                      size="small"
                      @click="openCertificate(certificate.id)"
                    >
                      Открыть
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col v-if="certificates.length === 0" cols="12">
                <v-card rounded="lg" elevation="0" class="d-flex flex-column align-center justify-center">
                  <v-icon icon="mdi-certificate-outline" size="64" color="grey-lighten-1" class="mb-4"></v-icon>
                  <div class="mb-2">У вас пока нет сертификатов</div>
                  <div class="mb-4 text-grey">Завершите курс, чтобы получить сертификат</div>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </template>

<script setup>
import { ref, computed } from 'vue'
import Header from '@/shared/ui/PagesElem/Header.vue'
  const isEditing = ref(false)
  const courseFilter = ref('all')

  import { onMounted } from 'vue'
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUser()
});

const uploadedPhoto = ref(null)

function handlePhotoUpload(file) {
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      editedUser.value.photo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
  // Пользователь
  const user = ref({
    name: userStore.user.name,
    email: userStore.user.email,
    photo: 'https://randomuser.me/api/portraits/women/28.jpg'
  })

  // Копия данных для редактирования
  const editedUser = ref({ ...user.value })

  // Купленные курсы
  const purchasedCourses = ref([
    {
      id: 1,
      title: 'Основы работы с бриошью',
      image: '/public/main--menu3.png',
      progress: 75,
      lessonsCompleted: 15,
      totalLessons: 20,
      certificateAvailable: false
    },
    {
      id: 2,
      title: 'Римская пицца',
      image: '/public/main--menu3.png',
      progress: 100,
      lessonsCompleted: 18,
      totalLessons: 18,
      certificateAvailable: true
    },
    {
      id: 3,
      title: 'Выпечка 1233',
      image: '/public/main--menu3.png',
      progress: 10,
      lessonsCompleted: 2,
      totalLessons: 15,
      certificateAvailable: false
    },
    {
      id: 4,
      title: 'Выпечка 1233',
      image: '/public/main--menu3.png',
      progress: 10,
      lessonsCompleted: 2,
      totalLessons: 15,
      certificateAvailable: false
    },
    {
      id: 5,
      title: 'Выпечка 1233',
      image: '/public/main--menu3.png',
      progress: 10,
      lessonsCompleted: 2,
      totalLessons: 15,
      certificateAvailable: false
    }
  ])

  // Отфильтрованные курсы
  const filteredCourses = computed(() => {
    switch(courseFilter.value) {
      case 'not-started':
        return purchasedCourses.value.filter(course => course.progress === 0)
      case 'in-progress':
        return purchasedCourses.value.filter(course => course.progress > 0 && course.progress < 100)
      case 'completed':
        return purchasedCourses.value.filter(course => course.progress === 100)
      default:
        return purchasedCourses.value
    }
  })

  // Сертификаты
  const certificates = ref([
    {
      id: 1,
      courseName: 'Римская пицца',
      issueDate: '15.02.2025',
      image: '/public/main--menu3.png'
    }
  ])

  // Методы
  function saveProfile() {
  user.value = { ...editedUser.value }
  isEditing.value = false
  uploadedPhoto.value = null
}

  function cancelEditing() {
    editedUser.value = { ...user.value }
    isEditing.value = false
  }

  function getProgressColor(progress) {
    if (progress === 0) return 'grey'
    if (progress < 30) return '#ED6638'
    if (progress < 70) return '#F48A21'
    if (progress < 100) return '#F48A21'
    return '#C4DB87'
  }

  function getNoCourseMessage() {
    switch(courseFilter.value) {
      case 'not-started':
        return 'У вас нет не начатых курсов'
      case 'in-progress':
        return 'У вас нет курсов в процессе'
      case 'completed':
        return 'У вас нет завершенных курсов'
      default:
        return 'У вас пока нет купленных курсов'
    }
  }

  function downloadCertificate(id) {
    console.log(`Загрузка сертификата с ID: ${id}`)
    alert('Сертификат скачивается...')
  }

  function openCertificate(id) {
    console.log(`Открытие сертификата с ID: ${id}`)
    window.open(`/certificates/${id}`, '_blank')
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

  .progress-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 8px;
    background: rgba(0, 0, 0, 0.3);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .text-truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .course-description {
    min-height: 40px;
  }

.sertificate-card {
  max-height: 20px
}

  .filter-tabs {
    overflow-x: auto;
    white-space: nowrap;
  }

  .profile--card {
  max-height: 40vh;
  min-height: 1vh;
}

@media (max-width: 1000px) {
.profile--card {
  max-height: 70vh;
  min-height: 1vh;
}
}

  @media (max-width: 600px) {
    .filter-tabs {
      display: flex;
      justify-content: center;
    }

    .v-btn-toggle {
      flex-wrap: wrap;
      justify-content: center;
    }

    .v-btn-toggle .v-btn {
      margin-bottom: 8px;
    }
  }
  </style>
