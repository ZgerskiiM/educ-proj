<!-- features/CourseFilter/ui/CourseFilterTabs/index.vue -->
<template>
    <div class="filter-tabs mb-4">
      <v-btn-toggle
        :model-value="modelValue"
        color="#333132"
        rounded="lg"
        mandatory
        @update:model-value="$emit('update:modelValue', $event)"
      >
        <v-btn
          v-for="option in options"
          :key="option.value"
          class="font-weight-regular"
          :value="option.value"
        >
          {{ option.label }}
        </v-btn>
      </v-btn-toggle>
    </div>
  </template>

  <script setup>
  defineProps({
    modelValue: { type: String, required: true },
    options: { type: Array, required: true }
  });

  defineEmits(['update:modelValue']);
  </script>
