<template>
    <div>
      <h1 class="font-weight-regular">Отчеты</h1>
      <report-generator
        v-model:report-type="reportType"
        :report-types="reportTypes"
        @generate="generateReport"
      />
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import ReportGenerator from '@/entities/report/ui/ReportGenerator.vue';

  const reportType = ref('');
  const reportTypes = [
    'Продажи по курсам',
    'Активность пользователей',
    'Финансовый отчет',
    'Статистика посещений'
  ];

  const generateReport = () => {
    console.log('Generating report of type:', reportType.value);
  };
  </script>
