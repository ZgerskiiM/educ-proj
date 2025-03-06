<template>
    <v-navigation-drawer v-model="localDrawer" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          @click="$emit('navigate', item.value)"
          :active="currentPage === item.value"
          :value="item.value"
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>

  <script setup>
  import { computed } from 'vue';

  const props = defineProps({
    menuItems: {
      type: Array,
      required: true
    },
    currentPage: String,
    modelValue: {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['navigate', 'update:modelValue']);

  const localDrawer = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });
  </script>
