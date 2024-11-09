import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
  ],
})

router.beforeEach(async from => {
  const aStore = useAuthStore()
  if (aStore.isAuthenticated && from.redirectedFrom?.name !== 'home') {
    return {
      name: 'home',
    }
  }

  if (!aStore.isAuthenticated && from.name !== 'auth') {
    return {
      name: 'auth',
    }
  }
})

export default router
