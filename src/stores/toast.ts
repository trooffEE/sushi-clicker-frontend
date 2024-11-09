import { defineStore } from 'pinia'
import type { Toast } from '@/components/ui/toast/use-toast'
import { h, ref } from 'vue'
import type { Ref } from 'vue'

type StoreState = {
  toast: Ref<Toast>
  visibilityTrigger: Ref<boolean>
  makeErrorAPIToast: (data: string) => void
}

export const useToastStore = defineStore('toast', (): StoreState => {
  const visibilityTrigger = ref(false)
  const toast = ref<Toast>({
    title: '',
    variant: 'default',
    description: '',
  })

  const makeErrorAPIToast = (data: string) => {
    toast.value = {
      variant: 'destructive',
      title: 'Something went wrong on the Backend! ⚠️',
      description: h(
        'div',
        { class: 'mt-2 w-[340px] text-sm rounded-md bg-red-950 p-4' },
        [h('code', { class: 'text-white' }, JSON.stringify(data, null, 2))],
      ),
    }

    visibilityTrigger.value = !visibilityTrigger.value
  }

  return { toast, visibilityTrigger, makeErrorAPIToast }
})
