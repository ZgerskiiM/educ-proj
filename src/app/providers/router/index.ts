import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "./routes";
import { AuthService } from '@/app/features/auth/model/Auth';
import { hasAccessToCourse } from '@/shared/api/UserService'; // Импортируйте функцию проверки доступа


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  console.log('Navigating to:', to.path, 'Meta:', to.meta);

  // Если маршрут требует авторизации
  if (to.meta.requiresAuth) {
    console.log('Route requires auth, checking authentication...');
    // Проверяем, авторизован ли пользователь
    const isAuthenticated = AuthService.isAuthenticated();
    console.log('Is authenticated:', isAuthenticated);

    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      next({ name: 'login' });
      return;
    }

    // Если требуется определенная роль
    if (to.meta.requiredRole) {
      console.log('Route requires role:', to.meta.requiredRole);
      const userRole = localStorage.getItem('userRole');
      console.log('User role:', userRole);

      const hasRequiredRole = AuthService.hasRole(to.meta.requiredRole as string);
      console.log('Has required role:', hasRequiredRole);

      if (!hasRequiredRole) {
        console.log('Role check failed, redirecting to home');
        localStorage.setItem('accessError',
          `Доступ запрещен. Требуется роль ${to.meta.requiredRole}`);

        // Используйте абсолютный путь, чтобы избежать проблем с именами маршрутов
        next('/');
        return;
      }
    }

    // Проверка доступа к курсу (если это страница курса)
    if (to.name === 'CourseBlocks' && to.params.courseId) {
      console.log('Checking course access for course ID:', to.params.courseId);

      try {
        const hasAccess = await hasAccessToCourse(to.params.courseId);
        console.log('Has access to course:', hasAccess);

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
