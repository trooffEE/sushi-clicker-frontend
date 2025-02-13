<template>
  <aside
    class="min-h-full h-screen w-full bg-gray-900 py-6 px-1 flex gap-4 flex-col"
    :class="{ _isHovered: isHovered }"
    @mouseenter="changeWithTimeout(() => (isHovered = true))"
    @mouseleave="changeWithTimeout(() => (isHovered = false))"
  >
    <RouterLink class="button py-2" to="/">
      <Icon class="w-10 h-10" icon="game-icons:sushis" />
    </RouterLink>

    <RouterLink
      v-for="(item, i) in menuItems"
      class="transition-all duration-200 px-4 py-2 w-full flex gap-2 items-center rounded-sm hover:bg-gray-800"
      :class="{ 'justify-center': !isHovered }"
      :to="item.to"
      :key="i"
    >
      <Icon class="w-6 h-6 flex-nowrap flex-shrink-0" :icon="item.icon" />
      <span v-if="isHovered" v-html="item.name" />
    </RouterLink>
  </aside>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { ref, Transition } from 'vue'

const isHovered = ref(false)

let timeoutId: any | number = null
const changeWithTimeout = (callback: any) => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  timeoutId = setTimeout(() => {
    callback()
  }, 160)
}

const menuItems = [
  { name: 'Settings', icon: 'iconamoon:settings-thin', to: '/' },
  { name: 'Text text 1', icon: 'iconamoon:settings-thin', to: '/' },
  { name: 'Text text 2', icon: 'iconamoon:settings-thin', to: '/' },
  { name: 'Achivements', icon: 'iconamoon:settings-thin', to: '/' },
]
</script>

<style lang="css" scoped>
aside {
  max-width: 70px;
  transition: all 250ms ease-in-out;

  &._isHovered,
  &:hover {
    max-width: 200px;
  }
}

.button {
  display: grid;
  place-items: center;
  width: 100%;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 90ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
