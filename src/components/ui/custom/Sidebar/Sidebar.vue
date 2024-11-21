<template>
  <!-- TODO Move it to reusable classes -->
  <aside class="absolute inset-0 h-full w-full" :class="{ '_open': isOpen }">
    <div class="h-1/12 w-full bg-red-300 py-8 cursor-pointer z-20 xl:h-full"
      :class="{ 'h-full xl:w-3/12': isOpen, 'xl:w-1/12': !isOpen }">
      <div @click="emit('close')">CLOSE ME</div>
    </div>

    <div v-if="isOpen" @click="emit('close')" class="absolute inset-0 w-full h-full bg-overlay z-[15]" />
  </aside>
</template>

<script lang="ts" setup>

const emit = defineEmits(['close'])

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  }
})
</script>
