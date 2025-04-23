<template>
  <div :class="{ 'mobile-layout': mdAndDown }">
    <h2 class="font-weight-regular mb-4">Панель управления</h2>
      <stat-cards :stats="stats" />
      <v-row class="mt-6">
        <v-col cols="12" :md="mdAndDown ? 12 : 8">
          <enrollment-chart :chart-option="enrollmentChartOption" />
        </v-col>
        <v-col cols="12" :md="mdAndDown ? 12 : 4">
          <popular-courses-chart :chart-option="popularCoursesChartOption" />
        </v-col>
      </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import StatCards from '@/entities/stats/ui/StatCards.vue';
import EnrollmentChart from '@/entities/stats/ui/EnrollmentChart.vue';
import PopularCoursesChart from '@/entities/stats/ui/PopularCoursesChart.vue';

const { mdAndDown } = useDisplay();

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

<style scoped>
.mobile-layout h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.dashboard-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mobile-layout .dashboard-card {
  border-radius: 6px;
}

.admin-content {
  width: 100%;
  padding: 24px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.admin-content.mobile {
  padding: 0.75rem;
  background-color: transparent;
}

.content-wrapper {
  max-width: 70%;
  margin: 0 auto;
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content-wrapper.mobile {
  max-width: 100%;
  padding: 0.75rem;
  box-shadow: none;
  border-radius: 0.25rem;
}
</style>
