<template>
  <main class="main">
    <header class="main__header">
      <h1>Ok, let's change your preferences</h1>

      <custom-button :disabled="isDisabled" @click="isVisible = true">
        Unsubscribe from all
      </custom-button>
    </header>

    <p class="text">To unsubscribe, please uncheck the appropriate box(es).</p>

    <cards v-if="sites.list.length > 0" :items="sites.list" />
    <empty v-else class="main__empty" />
  </main>

  <confirm-modal v-model:visible="isVisible" @click="unsubscribeAll">
    Please confirm that you want to unsubscribe from all and lose {{ percent }}% fun.
  </confirm-modal>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useSitesStore } from '@/stores/sites'

import cards from '@/components/cards.vue'
import empty from '@/components/empty.vue'

const customButton = defineAsyncComponent(
  () => import('@/components/button.vue')
)
const confirmModal = defineAsyncComponent(
  () => import('@/components/modal.vue')
)

interface MainProps {
  sidebarVisible?: boolean
}
const props = defineProps<MainProps>()

const app = useAppStore()
const sites = useSitesStore()
const isDisabled = computed(() =>
  sites.list.every(({ subscribed }) => !subscribed)
)
const isVisible = ref(false)

const percent = computed(() => {
  const count = sites.list.length
  const checkedCount = sites.list.filter(({ subscribed }) => subscribed).length

  const result = checkedCount / count * 100
  const roundedResult = Math.round(result)

  if (isNaN(roundedResult)) return 0
  return roundedResult
})

const mainMarginTop = computed(() => {
  if (props.sidebarVisible && app.viewport <= 900) {
    return '14.4rem'
  }
  return '0'
})

async function unsubscribeAll () {
  try {
    await sites.unsubscribeAll()

    console.info('Current state:', JSON.stringify(sites.list, null, 2))
    isVisible.value = false
  } catch (error) {
    alert((error as Error).message)
  }
}

async function fetchSites () {
  try {
    await sites.fetch()
  } catch (error) {
    alert((error as Error).message)
  }
}
fetchSites()
</script>

<style scoped lang="scss">
.main {
  container: main / inline-size;

  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-self: center;

  width: 134rem;
  margin: 0 auto;
  padding: 2rem;
  margin-top: v-bind('mainMarginTop');

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    & > h1 {
      font-size: 2.4rem;
      font-weight: 400;
    }
  }

  &__empty {
    padding-bottom: 4rem;
    border-radius: 0.4rem;
    background: var(--light-background-color);
    box-shadow: 0 2px 6px -4px;
  }
}

.text {
  font-size: 1.6rem;
  color: var(--light-text-color);
}
</style>
