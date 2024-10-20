<template>
  <transition name="toggle">
    <div v-if="visible" class="mask" @click="onMaskClick">
      <article class="modal">
        <header class="modal__header">
          <h2>{{ title }}</h2>
          <close-icon class="modal__close" @click="emits('update:visible', false)" />
        </header>

        <section class="modal__body"> <slot /> </section>

        <footer class="modal__footer">
          <button class="modal__button" @click="emits('click', $event)">
            {{ buttonText }}
          </button>
        </footer>
      </article>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineAsyncComponent, watch } from 'vue'

const closeIcon = defineAsyncComponent(
  () => import('@/assets/icons/close.svg')
)

interface ModalProps {
  visible?: boolean
  title?: string
  buttonText?: string
}
const props = withDefaults(defineProps<ModalProps>(), {
  visible: false,
  title: 'Are you sure?',
  buttonText: 'Affirmative'
})

const emits = defineEmits(['update:visible', 'click'])

watch(() => props.visible, (value) => {
  if (value) {
    scrollTo({ top: 0 })
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function onMaskClick (event: MouseEvent) {
  const element = event.target as HTMLElement

  if (element.classList.contains('mask')) {
    emits('update:visible', false)
  }
}
</script>

<style scoped lang="scss">
.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(4px);
  background: rgba(12, 28, 96, 0.3);
}

.modal {
  max-width: 51.2rem;
  width: 100%;
  margin: 1.5rem;
  border-radius: 0.8rem;

  background: var(--light-background-color);
  box-shadow:
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12),
    0 5px 5px -3px rgba(0, 0, 0, 0.2);


  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.4rem;

    & > h2 {
      font-size: 2rem;
    }
  }

  &__close {
    cursor: pointer;
    transition: background 200ms;

    &:hover {
      background: var(--background-color);
    }
  }

  &__body {
    padding: 0 2.4rem;
    font-size: 1.6rem;
    color: var(--light-text-color);
  }

  &__footer {
    display: flex;
    justify-content: end;
    padding: 2.4rem;
  }

  &__button {
    padding: 0.8rem 1.6rem;
    border-radius: 4px;

    font-family: inherit;
    font-size: 1.6rem;
    font-weight: 500;

    color: var(--light-background-color);
    background: var(--main-color);
    cursor: pointer;
    transition: all 200ms;

    &:hover {
      color: var(--main-color);
      background: var(--active-button-color);
    }
  }
}

.toggle-enter-active, .toggle-leave-active {
  transition: opacity 300ms;
}

.toggle-enter-from, .toggle-leave-to {
  opacity: 0;
  transition: opacity 300ms;
}
</style>
