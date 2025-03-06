import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import("@/pages/MainPage.vue"),
    meta: { breadcrumb: 'Главная' }
  },
  {
    path: '/register',
    component: () => import("@/pages/AuthPages/RegisterPage/RegisterPage.vue"),
    // Если не нужно показывать этот маршрут в хлебных крошках, можно и не задавать meta
  },
  {
    path: '/login',
    component: () => import("@/pages/AuthPages/LoginPage/LoginPage.vue")
  },
  {
    path: '/reset-password',
    component: () => import("@/pages/AuthPages/ResetPasswordPage/ResetPasswordPage.vue")
  },
  {
    path: '/verify',
    component: () => import("@/pages/AuthPages/VerificationPage/VerificationPage.vue")
  },
  {
    path: '/r-password',
    component: () => import("@/pages/AuthPages/rPassword/rPassword.vue")
  },
  {
    path: '/course',
    component: () => import("@/pages/Courses/CourseBlocks.vue"),
    meta: { breadcrumb: 'Курсы' }
  },
  {
    path: '/blocks',
    component: () => import("@/pages/Courses/CourseLessons.vue"),
    meta: { breadcrumb: 'Занятия' }
  },
  {
    path: '/lesson',
    component: () => import("@/pages/Courses/LessonPage.vue"),
    meta: { breadcrumb: 'Урок' }
  },
  {
    path: '/lk',
    component: () => import("@/pages/Profile/ui/Profile.vue"),
    meta: { breadcrumb: 'Личный кабинет' }
  },
  {
    path: '/admin',
    component: () => import("@/pages/admin/AdminPanel.vue"),
    meta: { breadcrumb: 'Админ-панель' }
  },
]
