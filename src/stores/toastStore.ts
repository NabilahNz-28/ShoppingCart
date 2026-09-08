import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ToastNotification } from '@/types'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastNotification[]>([])

  const addToast = (
    message: string,
    type: ToastNotification['type'] = 'success',
    duration: number = 3500,
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
    toasts.value.push({ id, message, type, duration })

    setTimeout(() => {
      removeToast(id)
    }, duration)

    return id
  }

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return { toasts, addToast, removeToast }
})
