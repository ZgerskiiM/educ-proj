<template>
  <div class="sidebar-wrapper">
    <div class="flexible-filter-tabs">
      <v-btn
        v-for="item in menuItems"
        :key="item.value"
        class="filter-tab-btn font-weight-light"
        :class="{ 'active-tab': currentPage === item.value }"
        variant="outlined"
        @click="$emit('navigate', item.value)"
      >
        {{ item.title }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const { mdAndDown } = useDisplay();

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  },
  currentPage: String
});

const emit = defineEmits(['navigate']);
</script>

<style scoped>
.sidebar-wrapper {
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.flexible-filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  width: 100%;
  justify-content: center;
}

.filter-tab-btn {
  flex-grow: 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
  text-transform: none;
  font-size: 0.875rem;
  padding: 0 1.25rem;
  min-height: 2.25rem;
  border-radius: 0.5rem;
}

.filter-tab-btn:hover {
  border-color: #ff9800;
  background-color: rgba(255, 152, 0, 0.04);
}

.active-tab {
  background-color: rgba(255, 152, 0, 0.1) !important;
  color: #ff9800 !important;
  border-color: #ff9800 !important;
  border-radius: 0.5rem !important;
}

@media (max-width: 600px) {
  .flexible-filter-tabs {
    gap: 0.5rem;
    justify-content: center;
  }

  .filter-tab-btn {
    flex-grow: 1;
    min-width: 0;
    max-width: calc(50% - 0.25rem); /* По два в ряд */
    font-size: 0.75rem;
    padding: 0 0.75rem;
    min-height: 2rem;
  }
}
</style>
