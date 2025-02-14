<template>
  <aside
    class="min-h-full h-screen w-full bg-gray-900 py-6 px-1 flex gap-4 flex-col"
    :class="{ _isHovered: isHovered }"
    @mouseenter="changeWithTimeout(() => (isHovered = true))"
    @mouseleave="changeWithTimeout(() => (isHovered = false))"
  >
    <RouterLink
      class="flex items-center transition-all duration-200 justify-center py-2 mb-8 hover:text-gray-400 focus:bg-gray-800"
      to="/"
    >
      <span
        class="menu-item-text heading text-md uppercase"
        v-text="'sushi-clicker'"
      />&nbsp;🍣
    </RouterLink>

    <RouterLink
      v-for="(item, i) in upperMenuItems"
      class="menu-item transition-all duration-200 px-4 py-2 w-full flex items-center gap-2 rounded-sm hover:bg-gray-800 focus:bg-gray-800"
      :to="item.to"
      :key="i"
    >
      <Icon
        class="w-7 h-7 transition-all duration-200 flex-nowrap flex-shrink-0"
        :icon="item.icon"
      />
      <span class="menu-item-text" v-html="item.name" />
    </RouterLink>

    <div class="mt-auto flex flex-col gap-4">
      <RouterLink
        v-for="(item, i) in bottomMenuItems"
        class="menu-item transition-all duration-200 px-4 py-2 w-full flex items-center gap-2 rounded-sm hover:bg-gray-800 focus:bg-gray-800"
        :to="item.to"
        :key="i"
      >
        <Icon
          class="w-7 h-7 transition-all duration-200 flex-nowrap flex-shrink-0"
          :icon="item.icon"
        />
        <span class="menu-item-text" v-html="item.name" />
      </RouterLink>
    </div>
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
  }, 150)
}

const upperMenuItems = [
  {
    name: 'Game',
    icon: 'mynaui:click',
    to: '/game',
  },
  {
    name: 'Achievements',
    icon: 'bitcoin-icons:star-outline',
    to: '/achievements',
  },
]

const bottomMenuItems = [
  { name: 'Profile', icon: 'iconamoon:profile-circle-thin', to: '/profile' },
  { name: 'Settings', icon: 'iconamoon:settings-thin', to: '/settings' },
]
</script>

<style lang="css" scoped>
aside {
  max-width: 70px;
  transition: all 250ms ease-in-out;

  &._isHovered,
  &:hover {
    max-width: 210px;
  }

  .menu-item-text {
    display: inline-block;
  }

  &:not(._isHovered) .menu-item {
    justify-content: center;
  }

  &:not(._isHovered) .menu-item-text {
    display: none;
  }

  &:hover .menu-item {
    justify-content: start;
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
