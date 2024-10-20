<template>
  <button :class="{ button: true, active }" @click="emits('click', $event)">
    <check-icon v-if="active" viewBox="0 0 32 32" style="width: 3.2rem; height: 3.2rem" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const checkIcon = defineAsyncComponent(
  () => import('@/assets/icons/check.svg')
)

interface CardButtonProps {
  active?: boolean
}
defineProps<CardButtonProps>()
const emits = defineEmits(['click'])
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  gap: 1rem;

  width: fit-content;
  padding: 0.6rem 1.2rem;
  border-radius: 1.6rem;

  font-family: inherit;
  font-size: 1.6rem;

  cursor: pointer;
  background: var(--main-color);
  color: var(--light-background-color);
  border: 1px solid transparent;
  transition: color 200ms, background 200ms, padding-left 200ms;

  &.active {
    padding: 0 1.2rem 0 0;
    background: #ecf4ff;
    color: var(--main-color);
  }

  &:hover {
    background: var(--light-background-color);
    color: var(--main-color);
    border: 1px solid var(--border-color);
  }
}
</style>
