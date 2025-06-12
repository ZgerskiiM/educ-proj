<template>
  <v-card class="mb-6">
    <v-card-title>Генерация отчетов</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <v-select
            v-model="localReportType"
            :items="reportTypes"
            label="Тип отчета"
            outlined
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-menu
            ref="dateMenu"
            v-model="dateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Период"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              />
            </template>
            <v-date-picker
              v-model="dateRange"
              range
              @input="dateMenu = false"
            />
          </v-menu>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps({
  reportType: String,
  reportTypes: Array,
});

const emit = defineEmits(["update:report-type", "generate"]);

const dateMenu = ref(false);
const dateRange = ref([]);

const localReportType = computed({
  get: () => props.reportType,
  set: (value) => emit("update:report-type", value),
});

const dateRangeText = computed(() => {
  if (dateRange.value.length === 2) {
    return `${dateRange.value[0]} - ${dateRange.value[1]}`;
  }
  return "Выберите период";
});
</script>
