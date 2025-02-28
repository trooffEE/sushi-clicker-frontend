import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
	const sushiCoins = ref(0)
	const sushiDollars = ref(0)

	return {
		sushiCoins,
		sushiDollars,
	}
})
