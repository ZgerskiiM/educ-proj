<template>
  <div class="filter-tabs mb-4">
    <div class="flexible-filter-tabs">
      <v-btn
        v-for="option in options"
        :key="option.value"
        class="filter-tab-btn font-weight-light"
        :class="{ 'active-tab': modelValue === option.value }"
        variant="outlined"
        @click="$emit('update:modelValue', option.value)"
      >
        {{ option.label }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: { type: String, required: true },
  options: { type: Array, required: true }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.flexible-filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-tab-btn {
  flex-grow: 0;
  background-color: none;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
  text-transform: none;
  font-size: 14px;
  padding: 0 20px;
  min-height: 36px;
}

.filter-tab-btn:hover {
  border-color: #333132;
  background-color: rgba(51, 49, 50, 0.04);
}

.active-tab {
  background-color: #333132 !important;
  color: white !important;
  border-color: #333132 !important;
}

/* Медиа-запрос для мобильных устройств */
@media (max-width: 600px) {
  .flexible-filter-tabs {
    gap: 8px;
  }

  .filter-tab-btn {
    flex-grow: 1;
    min-width: 0;
    max-width: calc(50% - 4px); /* По два в ряд */
    font-size: 12px;
    padding: 0 12px;
    min-height: 32px;
  }
}
</style>
