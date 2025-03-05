// stores/userStore.ts
import { defineStore } from 'pinia'
import { getUserData } from '@/shared/api/UserService'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: '',
      email: '',
    },
    loading: false,
    error: null
  }),

  actions: {
    async fetchUser() {
      this.loading = true
      try {
        const userData = await getUserData.getCurrentUser()
        this.user = {
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          // другие поля
        }
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
