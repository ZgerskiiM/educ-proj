<template>
<v-card rounded="lg" elevation="1" class="empty-card d-flex flex-column align-center justify-center">
  <v-icon :icon="icon" size="64" color="grey-lighten-1" class="mb-4"></v-icon>
  <div class="mb-2">{{ title }}</div>
  <div class="mb-6 text-grey">{{ description }}</div>

  <div class="tooltip-wrapper" v-if="actionText">
    <v-tooltip
      location="bottom"
      text="Скоро будет доступно"
    >
      <template v-slot:activator="{ props }">
        <div v-bind="props" class="w-100 h-100 position-absolute"></div>
      </template>
    </v-tooltip>

    <v-btn
      class="font-weight-light text-none"
      :color="actionColor"
      :to="actionRoute"
      disabled
    >
      {{ actionText }}
    </v-btn>
  </div>
</v-card>
  </template>

<script setup>
  defineProps({
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    actionText: { type: String, default: '' },
    actionRoute: { type: String, default: '' },
    actionColor: { type: String, default: '#333132' }
  })
</script>

<style lang="css" scoped>

.empty-card {
  min-height: 42vh;
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-wrapper .position-absolute {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

</style>
