<template>
  <v-card rounded="lg" elevation="1" class="cabinet-card d-flex flex-column overflow-x">
    <div class="position-relative">
      <v-img
        :src="certificate.image"
        height="250"
        cover
        class="rounded-t-lg bg-grey-lighten-4"
        :alt="`Сертификат: ${certificate.courseName}`"
      ></v-img>

      <div class="certificate-badge">
      </div>
    </div>

    <v-card-title class="text-truncate">{{ certificate.courseName }}</v-card-title>

    <v-card-text class="py-1">
      <div class="d-flex align-center mb-2">
        <v-icon icon="mdi-calendar" size="small" class="mr-1"></v-icon>
        <span class="font-weight-light">Выдан: {{ certificate.issueDate }}</span>
      </div>

      <div class="text-caption">
        <v-icon icon="mdi-certificate" size="small" class="mr-1"></v-icon>
        <span>Профессиональный сертификат</span>
      </div>
    </v-card-text>

    <v-card-actions class="mt-auto d-flex align-center justify-center ml-2 mr-2">
      <v-btn
        class="card-btn-text text-none font-weight-regular w-50"
        color="#333132"
        prepend-icon="mdi-open-in-new"
        variant="flat"

        @click="$emit('open', certificate.id)"
      >
        Открыть
      </v-btn>

      <v-btn
        color="#333132"
        variant="outlined"
        prepend-icon="mdi-download"
        class="card-btn-text text-none	font-weight-regular w-50"
        @click="$emit('download', certificate.id)"
      >
        Скачать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  certificate: { type: Object, required: true }
});

defineEmits(['download', 'open']);
</script>

<style scoped>
.cabinet-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cabinet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.position-relative {
  position: relative;
}

.card-btn-text {
  font-size: 1rem;
}

.certificate-badge {
  position: absolute;
  top: 12px;
  right: 12px;
}
</style>
