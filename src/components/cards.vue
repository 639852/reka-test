<template>
  <div class="wrapper">
    <card-item v-for="item of items" :key="item.id" :item="item" />
  </div>
</template>

<script setup lang="ts">
import type { Site } from '@/stores/sites'
import cardItem from '@/components/card.vue'

interface CardsProps {
  items: Site[]
}
defineProps<CardsProps>()
</script>

<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(1.5rem, 2vw, 2.5rem);

  @container main (max-width: 840px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: vars.$third-breakpoint) {
    grid-template-columns: 1fr;
  }
}
</style>
