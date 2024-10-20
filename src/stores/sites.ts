import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Site {
  id: string
  description: string
  subscribed: boolean
}

export const useSitesStore = defineStore('sites', () => {
  const list = ref<Site[]>([])

  return {
    list,

    async fetch (update?: boolean) {
      try {
        if (!update && list.value.length > 0) {
          return list.value
        }
        const url = (import.meta.env.DEV)
          ? `http://${location.host}/subscribe.json`
          : `https://${location.host}/reka-test/subscribe.json`

        const response = await fetch(url)
        const sites = await response.json()

        list.value = sites
        return sites
      } catch (error) {
        console.debug(error)
        throw error
      }
    },

    async subscribe (id: string) {
      try {
        const item = list.value.find((site) => site.id === id)

        if (item) item.subscribed = true
        else throw new Error('Site not found')

        return item
      } catch (error) {
        console.debug(error)
        throw error
      }
    },

    async unsubscribe (id: string) {
      try {
        const item = list.value.find((site) => site.id === id)

        if (item) item.subscribed = false
        else throw new Error('Site not found')

        return item
      } catch (error) {
        console.debug(error)
        throw error
      }
    },

    async unsubscribeAll () {
      try {
        const result = list.value.map((site) => ({ ...site, subscribed: false }))

        list.value = result
        return result
      } catch (error) {
        console.debug(error)
        throw error
      }
    }
  }
})
