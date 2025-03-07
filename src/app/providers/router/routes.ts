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
  },
  {
    path: '/login',
    name: "login",
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
  // {
  //   path: '/course',
  //   component: () => import("@/pages/Courses/CourseBlocks.vue"),
  //   meta: { requiresAuth: true }
  // },
  {
    path: '/course/:courseId',
    name: 'CourseBlocks',
    component: () => import('@/pages/Courses/CourseBlocks.vue'),
    meta: { requiresAuth: true } // Если требуется авторизация
  },
  {
    path: '/blocks',
    component: () => import("@/pages/Courses/CourseLessons.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/lesson',
    component: () => import("@/pages/Courses/LessonPage.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/lk',
    component: () => import("@/pages/Profile/ui/Profile.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    component: () => import("@/pages/admin/AdminPanel.vue"),
    meta: { requiresAuth: true, requiredRole: 'ADMIN'}
  },
]
