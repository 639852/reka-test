<template>
  <transition name="slide">
    <aside v-show="visible" :class="{ sidebar: true, active }" @click="onClick">
      <header class="header">
        <teleport defer to=".main" :disabled="visible">
          <div class="header__logo">
            <logo viewBox="0 0 224 118" class="logo" />

            <arrow-to-left
              v-if="visible"
              class="header__arrow-left"
              @click="emits('update:visible', false)"
            />
            <arrow-to-right
              v-else
              class="header__arrow-right"
              @click="emits('update:visible', true)"
            />
          </div>
        </teleport>

        <p class="header__text">How much fun <br> do you want in your life?</p>

        <progress-bar
          :count="sites.list.length"
          :checked-count="subscribedSites.length"
          :after-text="afterText"
          before-text="harry.simon@yahoo.com"
        />
      </header>

      <footer class="footer">
        <p class="footer__text">EntertainMeMore <br> 11807 Westheimer 550 PMB617 <br> Houston, TX 77077</p>

        <a href="mailto:contact@mail.com" class="footer__link">contact@mail.com</a>
        <a href="#" class="footer__link">Privace Policy</a>
      </footer>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { useSitesStore } from '@/stores/sites'

const logo = defineAsyncComponent(
  () => import('@/assets/icons/logo.svg')
)
const arrowToLeft = defineAsyncComponent(
  () => import('@/assets/icons/arrow-to-left.svg')
)
const arrowToRight = defineAsyncComponent(
  () => import('@/assets/icons/arrow-to-right.svg')
)
const progressBar = defineAsyncComponent(
  () => import('@/components/progressBar.vue')
)

interface SidebarProps {
  visible?: boolean
}
const props = defineProps<SidebarProps>()
const emits = defineEmits(['update:visible'])

const app = useAppStore()
const sites = useSitesStore()
const subscribedSites = computed(() =>
  sites.list.filter(({ subscribed }) => subscribed)
)

const afterText = `
  <a href="#" class="link">Subscribe</a>
  to all our fun sites to upgrade your fun progress
`
const active = ref(false)

watch(() => props.visible, (value) => {
  setTimeout(() => active.value = value, (value) ? 500 : 0)
  if (app.viewport > 900) {
    document.body.style.overflow = ''
  } else if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function onClick (event: MouseEvent) {
  if (app.viewport / 2 > event.clientX) return
  emits('update:visible', false)
}
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 1 32rem;
  padding: 4.8rem;
  background: var(--light-background-color);

  @media (max-width: vars.$first-breakpoint) {
    padding: 4vw;
  }

  @media (max-width: vars.$second-breakpoint) {
    position: absolute;
    z-index: 10;
    height: 100%;
    width: 50vw;

    &::before {
      content: '';

      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 50vw;
      
      transform: translateX(100%);
      transition: background 300ms, backdrop-filter 300ms;
    }

    &.active::before {
      backdrop-filter: blur(4px);
      background: rgba(12, 28, 96, 0.3);
    }
  }

  @media (max-width: vars.$third-breakpoint) {
    width: 100vw;

    &.active::before {
      content: none;
    }
  }
}

.header {
  display: flex;
  flex-direction: column;
  gap: clamp(2.4rem, 4vw, 6.4rem);
  font-size: 1.6rem;

  &__logo {
    display: flex;
    gap: 1rem;
    order: -1;

    & > .logo{
      width: 23rem;
      height: 100%;
      min-width: 23rem;
    }
  }

  &__arrow-left {
    position: absolute;
    right: 1rem;
    top: 1rem;
    display: none;
  }

  &__arrow-right,
  &__arrow-left {
    width: 30px;
    height: 30px;
    cursor: pointer;

    @media (max-width: vars.$second-breakpoint) {
      display: block;
    }
  }
}

.footer {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 3rem);
  font-size: 1.2rem;
  color: var(--light-text-color);

  &__link {
    color: var(--light-text-color);
  }
}

:deep(.link) {
  color: var(--main-color);
  text-decoration: none;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 500ms;
}

.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
  transition: transform 500ms;
}
</style>
