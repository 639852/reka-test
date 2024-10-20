<template>
  <div class="none">
    <div class="smile">
      :(
    </div>
    {{ text }}
  </div>
</template>

<script setup lang="ts">
interface EmptyProps {
  text?: string
}
withDefaults(defineProps<EmptyProps>(), {
  text: 'It\'s empty...'
})
</script>

<style scoped>
.none {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
  padding: 1rem 2.4rem;
  font-size: 3.2rem;
  text-align: center;
}

.smile {
  width: 10rem;
  height: 10rem;
  font-size: 6.4rem;
  font-family: monospace;
  letter-spacing: -1.5rem;
  transform: rotate(90deg);
}

</style>
