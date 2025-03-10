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
    meta: { requiresAuth: true },
  },
  {
    path: '/course/:courseId/blocks/:blocksId/lessons/:lessonId',
    name: 'LessonContent',
    component: () => import('@/pages/Courses/LessonPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course/:courseId/blocks/:blocksId',
    name: 'BlockLessons',
    component: () => import('@/pages/Courses/CourseLessons.vue'),
    meta: { requiresAuth: true },
    alias: '/c/:courseId/b/:blocksId'
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
