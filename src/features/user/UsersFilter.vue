<!-- src/features/user/UsersFilter.vue -->
<template>
  <v-card class="mb-6">
    <v-card-text class="py-6 px-6 d-flex flex-row justify-center align-center">
          <v-text-field
            v-model="searchModel"
            label="Поиск пользователей"
            prepend-inner-icon="mdi-magnify"
            hide-details
            outlined
            @input="updateSearch"
          ></v-text-field>
          <v-btn class="ml-16"  color="success" @click="$emit('grant-access')">
            Предоставить доступ к курсу
          </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  search: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'Все роли'
  }
});

const emit = defineEmits(['update:search', 'update:role', 'apply-filter', 'grant-access']);

const searchModel = ref(props.search);
const roleModel = ref(props.role);

const roleOptions = [
  'Все роли',
  'USER',
  'ADMIN'
];

// Обновление значений при изменении props
watch(() => props.search, (val) => {
  searchModel.value = val;
});

watch(() => props.role, (val) => {
  roleModel.value = val;
});

// Методы для обновления значений
const updateSearch = () => {
  emit('update:search', searchModel.value);
};

const updateRole = () => {
  emit('update:role', roleModel.value);
};
</script>
