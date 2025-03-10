import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "./routes";
import { AuthService } from '@/app/features/auth/model/Auth';
import { hasAccessToCourse } from '@/shared/api/UserService'; // Импортируйте функцию проверки доступа


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {

  // Если маршрут требует авторизации
  if (to.meta.requiresAuth) {
    // Проверяем, авторизован ли пользователь
    const isAuthenticated = AuthService.isAuthenticated();

    if (!isAuthenticated) {
      next({ name: 'login' });
      return;
    }

    // Если требуется определенная роль
    if (to.meta.requiredRole) {
      const userRole = localStorage.getItem('userRole');
      console.log('User role:', userRole);

      const hasRequiredRole = AuthService.hasRole(to.meta.requiredRole as string);

      if (!hasRequiredRole) {
        localStorage.setItem('accessError',
          `Доступ запрещен. Требуется роль ${to.meta.requiredRole}`);

        // Используйте абсолютный путь, чтобы избежать проблем с именами маршрутов
        next('/');
        return;
      }
    }

    // Проверка доступа к курсу (если это страница курса)
    if (to.name === 'CourseBlocks' && to.params.courseId) {

      try {
        const hasAccess = await hasAccessToCourse(to.params.courseId);

        if (!hasAccess) {
          console.log('Course access denied, redirecting to access-denied');
          localStorage.setItem('accessError', 'У вас нет доступа к этому курсу');
          next('/lk');
          return;
        }
      } catch (error) {
        console.error('Error checking course access:', error);
        next('/lk');
        return;
      }
    }
  }

  // Если авторизация не требуется или все проверки пройдены
  console.log('All checks passed, proceeding to route');
  next();
});

export default router
