<template>
    <v-card rounded="lg" elevation="1" class="empty-card d-flex flex-column align-center justify-center">
      <v-icon :icon="icon" size="64" color="grey-lighten-1" class="mb-4"></v-icon>
      <div class="mb-2">{{ title }}</div>
      <div class="mb-6 text-grey">{{ description }}</div>
      <v-btn v-if="actionText" :color="actionColor" :to="actionRoute"
      disabled>{{ actionText }}</v-btn>
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

</style>
