import { defineStore } from 'pinia'
import type { Toast } from '@/components/ui/toast/use-toast'
import { h, ref } from 'vue'
import type { Ref } from 'vue'

type StoreState = {
	toast: Ref<Toast>
	visibilityTrigger: Ref<boolean>
	makeErrorToast: (title: string, message: string) => void
	makeSuccessToast: (title: string, message: string) => void
}

export const useToastStore = defineStore('toast', (): StoreState => {
	const visibilityTrigger = ref(false)
	const toast = ref<Toast>({
		title: '',
		variant: 'default',
		description: '',
	})

	const makeSuccessToast = (title: string = '', message: string) => {
		toast.value = {
			variant: 'default',
			title: `${title}`,
			description: h('div', { class: 'mt-2 w-[340px] text-sm rounded-md p-4' }, [
				h('p', { class: 'text-white' }, JSON.stringify(message, null, 2)),
			]),
		}

		visibilityTrigger.value = !visibilityTrigger.value
	}

	const makeErrorToast = (title: string, message: string) => {
		title ||= 'Something went wrong!'

		toast.value = {
			variant: 'destructive',
			title: `${title}`,
			description: h('div', { class: 'mt-2 w-[340px] text-sm rounded-md p-4' }, [
				h('p', { class: 'text-white' }, JSON.stringify(message, null, 2)),
			]),
		}

		visibilityTrigger.value = !visibilityTrigger.value
	}

	return { toast, visibilityTrigger, makeErrorToast, makeSuccessToast }
})
