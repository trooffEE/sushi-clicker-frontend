import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const loadingCounter = ref(0)
  const isLoading = computed(() => loadingCounter.value > 0)
  const incLoadingCounter = () => loadingCounter.value++
  const decLoadingCounter = () => loadingCounter.value--
  const resetLoadingCounter = () => (loadingCounter.value = 0)

  return {
    isLoading,
    incLoadingCounter,
    decLoadingCounter,
    resetLoadingCounter,
  }
})
