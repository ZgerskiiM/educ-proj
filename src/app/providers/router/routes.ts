import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import("@/pages/MainPage.vue"),
  },
  {
    path: '/register',
    component: () => import("@/pages/AuthPages/RegisterPage/RegisterPage.vue"),
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
    component: () => import("@/pages/Courses/CourseBlocks.vue")
  }
]
