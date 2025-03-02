import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import authRoutes from './auth'
import homeRoutes from './home'
import error500 from '@/pages/Error500.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...homeRoutes, ...authRoutes, error500],
})

router.beforeEach(async (from) => {
	const aStore = useAuthStore()
	const tStore = useToastStore()

	if (from.name !== 'auth' && !aStore.isAuthenticated && from.redirectedFrom?.name !== 'auth') {
		router.replace({ name: 'auth' })
		tStore.makeErrorToast('', 'Please auth before continue!')
		return
	}

	if (aStore.isAuthenticated && from.name === 'auth') {
		return { name: 'home' }
	}
})

export default router
