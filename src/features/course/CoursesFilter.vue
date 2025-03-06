<template>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="localSearch"
              label="Поиск курсов"
              prepend-inner-icon="mdi-magnify"
              hide-details
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="localStatus"
              :items="['Все статусы', 'Опубликован', 'Черновик', 'Архив']"
              label="Статус"
              outlined
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="localCategory"
              :items="['Все категории', 'Вязание', 'Шитье', 'Дизайн']"
              label="Категория"
              outlined
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn color="#333132" block @click="$emit('apply-filter')">
              Применить
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </template>

  <script setup>
  import { computed } from 'vue';

  const props = defineProps({
    search: String,
    status: String,
    category: String
  });

  const emit = defineEmits(['update:search', 'update:status', 'update:category', 'apply-filter']);

  const localSearch = computed({
    get: () => props.search,
    set: (value) => emit('update:search', value)
  });

  const localStatus = computed({
    get: () => props.status,
    set: (value) => emit('update:status', value)
  });

  const localCategory = computed({
    get: () => props.category,
    set: (value) => emit('update:category', value)
  });
  </script>
