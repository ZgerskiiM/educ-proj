<template>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto" color="#C4DB87" dark>
          <v-card-text>
            <div class="font-weight-thin">{{ stats.totalCourses }}</div>
            <div class="font-weight-thin">Всего курсов</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto" color="#FEE99E" dark>
          <v-card-text>
            <div class="font-weight-thin">{{ stats.totalStudents }}</div>
            <div class="font-weight-thin">Студентов</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto" color="#302E2F" dark>
          <v-card-text>
            <div class="font-weight-thin">{{ stats.totalEnrollments }}</div>
            <div class="font-weight-thin">Всего записей</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto" color="#FED85D" dark>
          <v-card-text>
            <div class="font-weight-thin">{{ stats.totalRevenue }} ₽</div>
            <div class="font-weight-thin">Выручка</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>

  <script setup>
  defineProps({
    stats: {
      type: Object,
      required: true
    }
  });
  </script>
