<template>
  <div class="mb-8">
    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="font-weight-regular">{{ title }}</h2>
    </div>

    <CourseFilterTabs
      v-if="filterOptions && filterOptions.length"
      v-model="localFilterValue"
      :options="filterOptions"
    />

    <v-row v-if="filteredCourses.length > 0">
      <v-col
        v-for="course in filteredCourses"
        :key="course.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <CourseCard :course="course" />
      </v-col>
    </v-row>

    <!-- Пустое состояние -->
    <div v-else class="text-center py-8 mt-0 pt-0 font-weight-light">
      <EmptyState
        :icon="emptyState.icon"
        :title="emptyState.title"
        :description="emptyState.description"
        :action-text="emptyState.actionText"
        :action-route="emptyState.actionRoute"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import CourseCard from '@/entities/Course/ui/CourseCard.vue';
import CourseFilterTabs from '@/features/CourseFilter/ui/CourseFilterTabs.vue';
import EmptyState from '@/shared/ui/EmptyState.vue';

const props = defineProps({
  title: { type: String, default: 'Мои курсы' },
  courses: { type: Array, required: true },
  filterValue: { type: String, required: true },
  filterOptions: { type: Array, required: true },
  emptyState: {
    type: Object,
    default: () => ({
      icon: 'mdi-school-outline',
      title: 'У вас пока нет курсов',
      description: 'Вы можете найти интересные курсы в нашем каталоге',
      actionText: 'Перейти в каталог',
      actionRoute: '/catalog',
      actionDisabled: { type: Boolean, default: false }
    })
  }
});

const emit = defineEmits(['update:filter-value']);

const localFilterValue = ref(props.filterValue);

watch(() => props.filterValue, (newValue) => {
  localFilterValue.value = newValue;
});

watch(localFilterValue, (newValue) => {
  emit('update:filter-value', newValue);
});

const filteredCourses = computed(() => {
  switch(localFilterValue.value) {
    case 'not-started':
      return props.courses.filter(course => course.progress === 0);
    case 'in-progress':
      return props.courses.filter(course => course.progress > 0 && course.progress < 100);
    case 'completed':
      return props.courses.filter(course => course.progress === 100);
    default:
      return props.courses;
  }
});
</script>
