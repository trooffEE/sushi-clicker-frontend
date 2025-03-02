import HomeView from '@/views/HomeView.vue'
import HomePage from '@/pages/home/Home.vue'
import ProfilePage from '@/pages/home/Profile.vue'
import SettingsPage from '@/pages/home/Settings.vue'
import AchievementsPage from '@/pages/home/Achievements.vue'
import GamePage from '@/pages/home/Game.vue'

const homeRoutes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		children: [
			{ path: '', component: HomePage },
			{ path: '/game', component: GamePage },
			{ path: '/settings', component: SettingsPage },
			{ path: '/achievements', component: AchievementsPage },
			{ path: '/profile', component: ProfilePage },
		],
	},
]

export default homeRoutes
