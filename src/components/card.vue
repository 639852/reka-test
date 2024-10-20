<template>
  <article class="card">
    <div class="card__image">
      <img :src="`images/${item.id}.png`" :alt="item.id">
    </div>

    <p class="card__description" :title="item.description">
      {{ item.description }}
    </p>

    <card-button :active="item.subscribed" @click="onClick">
      {{ (item.subscribed) ? 'Subscribed' : 'Subscribe' }}
    </card-button>
  </article>
</template>

<script setup lang="ts">
import { useSitesStore, type Site } from '@/stores/sites'
import cardButton from '@/components/cardButton.vue'

interface CardProps {
  item: Site
}
const props = defineProps<CardProps>()
const sites = useSitesStore()

async function onClick () {
  try {
    if (props.item.subscribed) {
      await sites.unsubscribe(props.item.id)
    } else {
      await sites.subscribe(props.item.id)
    }

    console.info('Current state:', JSON.stringify(sites.list, null, 2))
  } catch (error) {
    alert((error as Error).message)
  }
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: clamp(1.5rem, 2vw, 2.5rem);
  background: var(--light-background-color);

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border-color);

    & > img {
      height: 100%;
      width: auto;
      max-width: 100%;
      object-fit: cover;
    }
  }

  &__description {
    display: -webkit-box;
    line-clamp: 2;
    box-orient: vertical;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    height: 5rem;
    margin-top: auto;

    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.6rem;
    line-height: 1.5;
  }
}
</style>
