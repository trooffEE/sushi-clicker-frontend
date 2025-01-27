import { defineStore } from 'pinia'
import type { Toast } from '@/components/ui/toast/use-toast'
import { h, ref } from 'vue'
import type { Ref } from 'vue'

type StoreState = {
  toast: Ref<Toast>
  visibilityTrigger: Ref<boolean>
  makeErrorToast: (title: string, message?: string) => void
}

export const useToastStore = defineStore('toast', (): StoreState => {
  const visibilityTrigger = ref(false)
  const toast = ref<Toast>({
    title: '',
    variant: 'default',
    description: '',
  })

  const makeErrorToast = (
    message: string,
    title: string = 'Something went wrong!',
  ) => {
    toast.value = {
      variant: 'destructive',
      title: `${title}`,
      description: h(
        'div',
        { class: 'mt-2 w-[340px] text-sm rounded-md p-4' },
        [h('p', { class: 'text-white' }, JSON.stringify(message, null, 2))],
      ),
    }

    visibilityTrigger.value = !visibilityTrigger.value
  }

  return { toast, visibilityTrigger, makeErrorToast }
})
