<template>
  <button
    class="button"
    :disabled="disabled"
    @click="emits('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  disabled?: boolean
}
defineProps<ButtonProps>()
const emits = defineEmits(['click'])
</script>

<style scoped lang="scss">
.button {
  --button-border-color: #ccc;

  padding: 1rem 1.6rem;
  border: 2px solid var(--button-border-color);
  border-radius: 0.4rem;

  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 500;

  background: none;
  color: var(--main-color);
  cursor: pointer;
  transition: all 300ms;

  &:hover {
    background: var(--main-color);
    color: var(--light-background-color);
    border-color: transparent;
  }

  &:disabled {
    pointer-events: none;
    filter: grayscale(1);
  }
}
</style>
