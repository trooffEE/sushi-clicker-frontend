<template>
  <Transition>
    <div v-if="isVisible" class="bg-overlay absolute flex items-center justify-center inset-0 w-full h-full z-50">
      <img :src="SVGTest" width="150px" height="150px" />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import SVGTest from '@/assets/images/svg/loader.svg'

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
})
</script>
