import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const viewport = ref(window.innerWidth)

  window.addEventListener('resize', () => {
    viewport.value = window.innerWidth
  })

  return { viewport }
})