import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'


import AuthorizationPage from '@/pages/auth/Authorization.vue'
import LoginPage from '@/pages/AuthPages/LoginPage/LoginPage.vue'
import RegisterPage from '@/pages/AuthPages/RegisterPage/RegisterPage.vue'
import ResetPasswordPage from '@/pages/AuthPages/ResetPasswordPage/ResetPasswordPage.vue'
import SignUpPage from '@/pages/AuthPages/SignUpPage/SignUpPage.vue'
import VerificationPage from '@/pages/AuthPages/VerificationPage/VerificationPage.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/reset', component: ResetPasswordPage },
  { path: '/auth', component: AuthorizationPage },
  {path: '/verify', component: VerificationPage}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
