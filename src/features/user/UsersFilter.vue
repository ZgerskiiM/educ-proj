<!-- src/features/user/UsersFilter.vue -->
<template>
  <v-card class="mb-6">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchModel"
            label="Поиск пользователей"
            prepend-inner-icon="mdi-magnify"
            hide-details
            outlined
            dense
            @input="updateSearch"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="roleModel"
            :items="roleOptions"
            label="Роль"
            outlined
            dense
            hide-details
            @change="updateRole"
          ></v-select>
        </v-col>
        <v-col cols="12" md="5" class="d-flex justify-end align-center">
          <v-btn color="#333132" class="mr-2" @click="$emit('apply-filter')">
            Применить
          </v-btn>
          <v-btn color="success" @click="$emit('grant-access')">
            Предоставить доступ к курсу
          </v-btn>
        </v-col>
      </v-row>
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
