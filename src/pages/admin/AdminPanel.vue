<template>
    <v-app>
        <admin-header @toggle-drawer="drawer = !drawer" />
        <admin-sidebar
        v-model:modelValue="drawer"
        :menu-items="menuItems"
        :current-page="currentPage"
        @navigate="navigateTo"
        />
        <v-main>
        <v-container fluid>
          <admin-dashboard v-if="currentPage === 'dashboard'" :stats="stats" />
          <admin-courses v-if="currentPage === 'courses'" />
          <admin-users v-if="currentPage === 'users'" />
          <admin-reports v-if="currentPage === 'reports'" />
        </v-container>
      </v-main>
    </v-app>
  </template>

  <script setup>
  import { ref } from 'vue';
  import AdminHeader from '@/widgets/admin/AdminHeader/index.vue';
  import AdminSidebar from '@/widgets/admin/AdminSidebar/index.vue';
  import AdminDashboard from '@/widgets/admin/AdminDashboard/index.vue';
  import AdminCourses from '@/widgets/admin/AdminCourses/index.vue';
  import AdminUsers from '@/widgets/admin/AdminUsers/index.vue';
  import AdminReports from '@/widgets/admin/AdminReports/index.vue';

  const drawer = ref(true);
  const currentPage = ref('dashboard');

  const menuItems = [
  { title: 'Панель управления', icon: 'mdi-view-dashboard', value: 'dashboard' },
  { title: 'Курсы', icon: 'mdi-book-open-page-variant', value: 'courses' },
  { title: 'Пользователи', icon: 'mdi-account-group', value: 'users' },
  { title: 'Отчеты', icon: 'mdi-file-chart', value: 'reports' },
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
