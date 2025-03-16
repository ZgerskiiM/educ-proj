<template>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">Предоставить доступ к курсу</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="userEmail"
                  label="Email пользователя*"
                  @input="userEmail = userEmail.replace(/\s/g, '')"
                  @keydown.space.prevent
                  required
                  :rules="[v => !!v || 'Email обязателен', v => /.+@.+\..+/.test(v) || 'Введите корректный email']"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="selectedCourseId"
                  :items="courses"
                  item-title="title"
                  item-value="id"
                  label="Выберите курс*"
                  required
                  :loading="loadingCourses"
                  :rules="[v => !!v || 'Выберите курс']"
                  return-object
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>* обязательные поля</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" text @click="close">Отмена</v-btn>
          <v-btn color="blue-darken-1" text @click="grantAccess" :loading="granting" :disabled="!isFormValid">Предоставить доступ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <script lang="ts" setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { getUserService } from '@/shared/api/getUserService';

  const props = defineProps({
    modelValue: Boolean,
    email: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['update:modelValue', 'access-granted']);

  const dialog = ref(props.modelValue);
  const userEmail = ref(props.email || '');
  const selectedCourseId = ref(null);
  const courses = ref([]);
  const loadingCourses = ref(false);
  const granting = ref(false);

  // Вычисляем валидность формы
  const isFormValid = computed(() => {
    return userEmail.value &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.value) &&
           selectedCourseId.value &&
           selectedCourseId.value.id !== undefined;
  });

  // Загрузка списка курсов
  const fetchCourses = async () => {
  loadingCourses.value = true;
  try {
    const response = await getUserService.fetchAllCourses();

    let coursesData = [];

    if (Array.isArray(response)) {
      coursesData = response;
    } else if (response && typeof response === 'object') {
      if (Array.isArray(response.content)) {
        coursesData = response.content;
      } else if (Array.isArray(response.items)) {
        coursesData = response.items;
      } else if (Array.isArray(response.data)) {
        coursesData = response.data;
      }
    }

    // Преобразуем courseId в id для совместимости с компонентом
    courses.value = coursesData.map(course => ({
      ...course,
      id: course.courseId || course.id // Используем courseId как id, или оставляем существующий id если он есть
    }));

  } catch (error) {
    console.error('Ошибка при загрузке курсов:', error);
    courses.value = [];
  } finally {
    loadingCourses.value = false;
  }
};

  // Предоставление доступа
  const grantAccess = async () => {
    if (!isFormValid.value) {
      alert('Пожалуйста, заполните все обязательные поля корректно');
      return;
    }

    if (!selectedCourseId.value || selectedCourseId.value.id === undefined) {
      alert('Выберите курс из списка');
      return;
    }

    const courseId = Number(selectedCourseId.value.id);
    console.log('', {
      email: userEmail.value,
      courseId: courseId,
      course: selectedCourseId.value
    });

    granting.value = true;
    try {
      await getUserService.grantCourseAccess(userEmail.value, courseId);
      emit('access-granted', {
        email: userEmail.value,
        courseId: courseId,
        courseName: selectedCourseId.value.title || 'Курс'
      });
      close();
    } catch (error) {
      console.error('Ошибка при предоставлении доступа:', error);
      let errorMessage = 'Не удалось предоставить доступ';
      if (error.response?.data?.message) {
        errorMessage += `: ${error.response.data.message}`;
      }
      alert(errorMessage);
    } finally {
      granting.value = false;
    }
  };

  // Закрытие диалога
  const close = () => {
    dialog.value = false;
    userEmail.value = '';
    selectedCourseId.value = null;
  };

  // Синхронизация с родительским компонентом
  watch(() => props.modelValue, (val) => {
    dialog.value = val;
    if (val) {
      fetchCourses();
    }
  });

  watch(() => props.email, (val) => {
    if (val) {
      userEmail.value = val;
    }
  });

  watch(dialog, (val) => {
    emit('update:modelValue', val);
  });

  // Загрузка курсов при монтировании
  onMounted(() => {
    if (props.modelValue) {
      fetchCourses();
    }
  });
  </script>
