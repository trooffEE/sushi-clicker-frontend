<template>
  <!-- TODO Move it to reusable classes -->
  <aside class="absolute inset-0 h-full w-full" :class="{ '_open': isOpen }">
    <div class="h-1/12 relative transition-all w-full bg-red-300 py-8 cursor-pointer z-20 xl:h-full"
      :class="{ 'h-full xl:w-2/12': isOpen, 'xl:w-1/12': !isOpen }">
      <div @click="emit('toggle')">CLOSE ME</div>
    </div>

    <div v-if="isOpen" @click="emit('toggle')"
      class="absolute inset-0 w-full h-full bg-overlay z-[15] transition-all" />
  </aside>
</template>

<script lang="ts" setup>
const emit = defineEmits(['toggle'])

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  }
})
</script>
