<template>
  <sidebar
    :visible="(app.viewport > 900) ? true : isVisible"
    @update:visible="isVisible = $event"
  />
  <main-block :sidebar-visible="isVisible" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

import sidebar from '@/components/sidebar.vue'
import mainBlock from '@/components/main.vue'

const app = useAppStore()
const isVisible = ref(false)

if (app.viewport > 900) isVisible.value = true
</script>

<style lang="scss">
@use 'assets/scss/mixins';
@include mixins.font('Rubik', 'Rubik-Medium', '500', 'normal');
@include mixins.font('Rubik', 'Rubik-Regular', '400', 'normal');

:root {
  --text-color: #333;
  --light-text-color: #666;
  --background-color: #f1f1f1;
  --light-background-color: #fff;
  --border-color: #f1f1f1;
  --main-color: #346df1;
  --active-button-color: #ecf3ff;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  line-height: 1.2;
}

body {
  font-family: Rubik, Inter, Avenir, Helvetica, Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
}

#app {
  display: flex;
  min-height: 100vh;
}

@media (min-width: vars.$fourth-breakpoint) {
  html {
    font-size: 0.52vw;
  }
}
</style>
