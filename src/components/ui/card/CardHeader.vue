<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
	class?: HTMLAttributes['class']
}>()
</script>

<template>
	<div :class="cn('flex flex-col gap-y-1.5 px-5 py-6 sm:px-6 sm:pb-0', props.class)">
		<slot />
	</div>
</template>
