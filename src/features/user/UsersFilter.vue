<template>
    <v-card class="mb-6">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="localSearch"
              label="Поиск пользователей"
              prepend-inner-icon="mdi-magnify"
              hide-details
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="localRole"
              :items="['Все роли', 'Администратор', 'Пользователь']"
              label="Роль"
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
          <v-col cols="12" md="2">
            <v-btn
              color="#333132"
              block
              prepend-icon="mdi-gift"
              @click="$emit('grant-access')"
            >
              Выдать доступ
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
    role: String
  });

  const emit = defineEmits(['update:search', 'update:role', 'apply-filter', 'grant-access']);

  const localSearch = computed({
    get: () => props.search,
    set: (value) => emit('update:search', value)
  });

  const localRole = computed({
    get: () => props.role,
    set: (value) => emit('update:role', value)
  });
  </script>
