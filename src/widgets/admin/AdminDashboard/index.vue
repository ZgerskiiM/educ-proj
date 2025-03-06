<template>
    <div>
      <h1 class="font-weight-medium mb-6">Панель управления</h1>
      <stat-cards :stats="stats" />
      <v-row class="mt-6">
        <v-col cols="12" md="8">
          <enrollment-chart :chart-option="enrollmentChartOption" />
        </v-col>
        <v-col cols="12" md="4">
          <popular-courses-chart :chart-option="popularCoursesChartOption" />
        </v-col>
      </v-row>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import StatCards from '@/entities/stats/ui/StatCards.vue';
  import EnrollmentChart from '@/entities/stats/ui/EnrollmentChart.vue';
  import PopularCoursesChart from '@/entities/stats/ui/PopularCoursesChart.vue';

  defineProps({
    stats: Object
  });

  const enrollmentChartOption = ref({
    xAxis: {
      type: 'category',
      data: ['1 мар', '5 мар', '10 мар', '15 мар', '20 мар', '25 мар', '30 мар']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [25, 40, 35, 50, 45, 60, 70],
      type: 'line'
    }]
  });

  const popularCoursesChartOption = ref({
    tooltip: {
      trigger: 'item'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 40, name: 'Базовое вязание' },
        { value: 30, name: 'Мастер шитья' },
        { value: 20, name: 'Дизайн интерьера' },
        { value: 10, name: 'Другие' }
      ]
    }]
  });
  </script>
