import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'


import AuthorizationPage from '@/pages/auth/Authorization.vue'
import LoginPage from '@/pages/AuthPages/LoginPage/LoginPage.vue'
import RegisterPage from '@/pages/AuthPages/RegisterPage/RegisterPage.vue'
import ResetPasswordPage from '@/pages/AuthPages/ResetPasswordPage/ResetPasswordPage.vue'
import VerificationPage from '@/pages/AuthPages/VerificationPage/VerificationPage.vue'
import rPassword from '@/pages/rPassword/rPassword.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/reset-password', component: ResetPasswordPage },
  { path: '/auth', component: AuthorizationPage },
  {path: '/verify', component: VerificationPage},
  {path: '/r-password', component: rPassword}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // Проверяем, требует ли маршрут авторизации
  if (to.meta.requiresAuth) {
    const isAuthenticated = !!localStorage.getItem("displayName");
    if (!isAuthenticated) {
      // Если юзер не авторизован, перенаправляем на страницу авторизации
      next({ name: "login" });
    } else {
      // Если юзер авторизован, пропускаем навигацию
      next();
    }
  } else {
    // Если авторизация не требуется, пропускаем навигацию
    next();
  }
});


export default router
