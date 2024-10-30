import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        // 
        return 
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
