<template>
    <div>
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="font-weight-regular">{{ title }}</h2>
      </div>
      <v-row>
        <v-col
          v-for="certificate in certificates"
          :key="certificate.id"
          cols="12"
          sm="6"
          lg="3"
        >
          <CertificateCard
            :certificate="certificate"
            @download="downloadCertificate"
            @open="openCertificate"
          />
        </v-col>

        <v-col v-if="certificates.length === 0" cols="12" class="text-center py-8 mt-0 pt-0">
          <EmptyState
            :icon="emptyState.icon"
            :title="emptyState.title"
            :description="emptyState.description"
          />
        </v-col>
      </v-row>
    </div>
  </template>

  <script setup>
  import CertificateCard from '@/entities/Certificate/ui/CertificateCard.vue';
  import EmptyState from '@/shared/ui/EmptyState.vue';

  defineProps({
    title: { type: String, default: 'Мои сертификаты' },
    certificates: { type: Array, required: true },
    emptyState: {
      type: Object,
      default: () => ({
        icon: 'mdi-certificate-outline',
        title: 'У вас пока нет сертификатов',
        description: 'Завершите курс, чтобы получить сертификат'
      })
    }
  });

  const downloadCertificate = (id) => {
    // Логика скачивания сертификата
    console.log('Скачивание сертификата:', id);
  };

  const openCertificate = (id) => {
    // Логика открытия сертификата
    console.log('Открытие сертификата:', id);
  };
  </script>
