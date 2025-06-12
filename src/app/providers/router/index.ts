import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { AuthService } from '@/app/features/auth/model/Auth'
import { hasAccessToCourse } from '@/shared/api/UserService' // Импортируйте функцию проверки доступа

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = AuthService.isAuthenticated()
    if (!isAuthenticated) {
      next({ name: 'login' })
      return
    }
    if (to.meta.requiredRole) {
      const userRole = localStorage.getItem('userRole')
      const hasRequiredRole = AuthService.hasRole(to.meta.requiredRole as string)
      if (!hasRequiredRole) {
        localStorage.setItem(
          'accessError',
          `Доступ запрещен. Требуется роль ${to.meta.requiredRole}`,
        )
        next('/profile')
        return
      }
    }
    if (to.name === 'CourseBlocks' && to.params.courseId) {
      try {
        const hasAccess = await hasAccessToCourse(to.params.courseId)

        if (!hasAccess) {
          localStorage.setItem('accessError', 'У вас нет доступа к этому курсу')
          next('/profile')
          return
        }
      } catch (error) {
        console.error('Error checking course access:', error)
        next('/profile')
        return
      }
    }
  }
  next()
})

export default router
