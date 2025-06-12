<template>
  <v-card>
    <v-card-title>Статистика записей за последние 30 дней</v-card-title>
    <v-card-text>
      <v-chart class="chart" :option="chartOption" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps({
  chartOption: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.chart {
  height: 300px;
  width: 100%;
}
</style>
