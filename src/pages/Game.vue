<template>
	<page-container @click="startFireworks">
		<rotating-sushi class="col-start-3 col-span-8 flex justify-center items-center" />
		<fireworks ref="fw" class="absolute inset-0 w-full h-full z-10" :options="options" />
	</page-container>
</template>

<script setup lang="ts">
import PageContainer from '@/components/page/PageContainer.vue'
import RotatingSushi from '@/components/sushi/RotatingSushi.vue'

import { Fireworks } from '@fireworks-js/vue'
import { onMounted, ref, watch } from 'vue'
import type { FireworksOptions } from '@fireworks-js/vue'

const fw = ref<InstanceType<typeof Fireworks>>()
const options = ref<FireworksOptions>({
	opacity: 1,
	mouse: {
		click: true,
		move: true,
		max: 1,
	},
	rocketsPoint: {
		max: 50,
		min: 50,
	},
	particles: 10,
	hue: {
		max: 0,
		min: 0,
	},
	lineWidth: {
		explosion: {
			min: 2,
			max: 4,
		},

		trace: {
			max: 0,
			min: 0,
		},
	},
	gravity: 0,
	traceLength: 1,
	friction: 0.9,
	boundaries: {
		debug: true,
	},
	autoresize: true,
})

async function startFireworks() {
	if (!fw.value) return
	fw.value.launch(5)
}

watch(fw, () => startFireworks())
</script>
