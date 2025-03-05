<template>
    <div class="mb-8">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="font-weight-regular">{{ title }}</h2>
      </div>

      <CourseFilterTabs
        v-model="courseFilter"
        :options="courseFilterOptions"
    />

      <v-row>
        <v-col
          v-for="course in filteredCourses"
          :key="course.id"
          cols="12"
          sm="6"
          lg="3"
        >
          <CourseCard :course="course" />
        </v-col>

        <v-col v-if="filteredCourses.length === 0" cols="12">
          <EmptyState
            :icon="emptyState.icon"
            :title="emptyState.title"
            :description="emptyState.description"
            :action-text="emptyState.actionText"
            :action-route="emptyState.actionRoute"
          />
        </v-col>
      </v-row>
    </div>
  </template>

  <script setup>
  import { computed } from 'vue';
  import CourseCard from '@/entities/Course/ui/CourseCard.vue';
  import CourseFilterTabs from '@/features/CourseFilter/ui/CourseFilterTabs.vue';
  import EmptyState from '@/shared/ui/EmptyState.vue';

  const props = defineProps({
    title: { type: String, default: 'Мои курсы' },
    courses: { type: Array, required: true },
    filterValue: { type: String, required: true },
    filterOptions: { type: Array, required: true },
    emptyState: { type: Object, required: true }
  });

  const filteredCourses = computed(() => {
    switch(props.filterValue) {
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
