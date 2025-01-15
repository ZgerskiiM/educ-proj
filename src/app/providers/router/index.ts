import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "./routes";

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
