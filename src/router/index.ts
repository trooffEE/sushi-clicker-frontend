import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import DashboardPage from '@/pages/Dashboard.vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [{ path: '', component: DashboardPage }],
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
  ],
})

router.beforeEach(async (from, to) => {
  const aStore = useAuthStore()
  const tStore = useToastStore()

  if (
    from.name !== 'auth' &&
    !aStore.isAuthenticated &&
    from.redirectedFrom?.name !== 'auth'
  ) {
    router.replace({ name: 'auth' })
    tStore.makeErrorToast('Please auth before continue!')
    return
  }

  if (aStore.isAuthenticated && from.name === 'auth') {
    return { name: 'home' }
  }
})

export default router
