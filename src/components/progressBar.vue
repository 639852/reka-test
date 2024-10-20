<template>
  <div class="wrapper">
    <span v-if="beforeText" class="before-text" v-html="beforeText" />

    <div class="bar__block">
      <div class="bar"></div>
      <span class="bar__text">{{ percent }}</span>
    </div>

    <p v-if="afterText" class="text" v-html="afterText" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ProgressBarProps {
  count: number
  checkedCount: number
  beforeText?: string
  afterText?: string
}
const props = defineProps<ProgressBarProps>()

const beforeBarText = 'Fun you get'
const percent = computed(() => {
  const result = props.checkedCount / props.count * 100
  const roundedResult = Math.round(result)

  if (isNaN(roundedResult)) return '0%'
  return `${roundedResult}%`
})
</script>

<style scoped lang="scss">
.wrapper {
  --fill-color: #f8b200;

  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 2rem);
  font-size: 1.4rem;
}

.bar {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 5rem);
  height: 2rem;
  overflow: hidden;
  border-radius: 1rem;
  background: var(--text-color);

  &::before {
    content: '';
    background: var(--fill-color);
    height: 2rem;
    display: block;
    width: v-bind('percent');
    transition: width 300ms;
  }

  &::after {
    content: v-bind('`"${beforeBarText}"`');
    position: absolute;
    font-size: 1.2rem;
    text-transform: uppercase;
    transform: translateY(-1.5rem);
    color: var(--light-text-color);
  }

  &__block {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }

  &__text {
    font-size: 1.6rem;
    color: var(--fill-color);
  }
}

.text {
  color: var(--light-text-color);
}
</style>
