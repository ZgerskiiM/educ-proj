<template>
  <v-app>
    <v-main class="main-background">
    <div class="admin-panel" :class="{ 'mobile': mdAndDown }">
      <admin-header />
        <div class="admin-layout" :class="{ 'mobile': mdAndDown }">
          <admin-sidebar
            :menu-items="menuItems"
            :current-page="currentPage"
            @navigate="navigateTo"
          />
          <v-container fluid :class="['main-container', { 'mobile': mdAndDown }]">
            <admin-dashboard v-if="currentPage === 'dashboard'" :stats="stats" />
            <admin-courses v-if="currentPage === 'courses'" />
            <admin-users v-if="currentPage === 'users'" />
            <!-- <admin-reports v-if="currentPage === 'reports'" /> -->
          </v-container>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import AdminHeader from '@/widgets/admin/AdminHeader/index.vue';
import AdminSidebar from '@/widgets/admin/AdminSidebar/index.vue';
import AdminDashboard from '@/widgets/admin/AdminDashboard/index.vue';
import AdminCourses from '@/widgets/admin/AdminCourses/index.vue';
import AdminUsers from '@/widgets/admin/AdminUsers/index.vue';

const { mdAndDown } = useDisplay();
const currentPage = ref('dashboard');

const menuItems = [
  { title: 'Панель управления', icon: 'mdi-view-dashboard', value: 'dashboard' },
  { title: 'Список курсов', icon: 'mdi-book-open-page-variant', value: 'courses' },
  { title: 'Список пользователей', icon: 'mdi-account-group', value: 'users' },
];

const stats = ref({
  totalCourses: 42,
  totalStudents: 1250,
  totalEnrollments: 2680,
  totalRevenue: 980000
});

const navigateTo = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
.v-btn {
  font-weight: 300;
  font-size: 0.85rem;
}

.admin-panel {
  display: flex;
  min-height: 100vh;
  width: 70%;
  margin: 0 auto;
}

.main-background {
  background-color: #fff8f0;
}

.admin-panel.mobile {
  width: 100%;
}

.admin-layout {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem;
  align-items: center;
}

.admin-layout.mobile {
  padding: 0.75rem;
}

.main-container {
  width: 100%;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
}

.main-container.mobile {
  padding: 0.75rem;
  border-radius: 0.25rem;
}

/* Переопределение стилей дочерних компонентов для мобильных устройств */
:deep(.mobile h1) {
  font-size: 1.5rem !important;
  margin-bottom: 1rem !important;
}

:deep(.mobile h2) {
  font-size: 1.25rem !important;
  margin-bottom: 1rem !important;
}

:deep(.mobile .v-data-table) {
  font-size: 0.875rem;
}

:deep(.mobile .v-card-text) {
  padding: 0.75rem !important;
}

:deep(.mobile .v-row) {
  margin: 0 !important;
}

:deep(.mobile .v-col) {
  padding: 0.5rem !important;
}

:deep(.mobile .v-btn) {
  font-size: 0.75rem !important;
  padding: 0 0.75rem !important;
}
</style>