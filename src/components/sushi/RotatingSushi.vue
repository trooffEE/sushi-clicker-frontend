<template>
	<div>
		<div
			class="transition-all rotating-sushi relative active:scale-90 p-10 flex items-center justify-center"
			@click="onClick"
		>
			<div class="sushi animate-spin-slow w-[500px] h-[500px]" />

			<transition-group name="fade" tag="div">
				<span
					v-for="point in pointQueue"
					:key="point.disappearTime.valueOf()"
					class="transition-all text-2xl font-semibold absolute mix-blend-difference point select-none"
					:style="point.style"
				>
					+{{ point.pointValue }}
				</span>
			</transition-group>
		</div>
	</div>
</template>

<script setup lang="ts">
// @ts-expect-error library doesn't have any TS, we use js for it
import confetti from 'canvas-confetti'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { onBeforeUnmount, ref } from 'vue'

type Point = {
	pointValue: number
	style: string
	disappearTime: Dayjs
}

const POINT_QUEUE_SIZE = 12
const GAME_TICK = 50
const pointQueue = ref<Point[]>([])

// Start game loop
const intervalId = setInterval(() => {
	if (pointQueue.value.length === 0) return

	if (pointQueue.value[0].disappearTime.diff(dayjs(), 'milliseconds') <= 0) {
		pointQueue.value.shift()
	}
}, GAME_TICK)

onBeforeUnmount(() => {
	confetti.reset()
	clearInterval(intervalId)
})

const onClick = (event: MouseEvent) => {
	const xConfeti = event.clientX / window.innerWidth
	const yConfeti = event.clientY / window.innerHeight

	confetti({
		particleCount: 15,
		spread: 40,
		startVelocity: 15,
		useWorker: true,
		origin: { x: xConfeti, y: yConfeti },
		resize: true,
		flat: true,
		disableForReducedMotion: true,
		scalar: 0.3,
	})

	const target = event.currentTarget as HTMLElement
	const rect = target.getBoundingClientRect()
	const xPoint = event.clientX - rect.left + 30
	const yPoint = event.clientY - rect.top

	addPointToQueue({ x: xPoint, y: yPoint })
}

const addPointToQueue = ({ x, y }: { x: number; y: number }) => {
	if (pointQueue.value.length < POINT_QUEUE_SIZE) {
		const style = `left: ${x}px;top: ${y}px;`

		pointQueue.value.push(createPoint(style))
		return
	}

	pointQueue.value.shift()
}

const createPoint = (style: string): Point => {
	return {
		pointValue: 1, //TODO нужно придумать, как пересчитатьыва
		style,
		disappearTime: dayjs().add(2, 'seconds'),
	}
}
</script>

<style lang="css" scoped>
.sushi {
	position: relative;
	padding: 15px;
	padding: 25px;
	background-image: url('@/assets/images/sushis/sushiset1.webp');
	background-size: cover;
}

.sushi img {
	-moz-user-select: none;
	-webkit-user-select: none;
	user-select: none;
}

.rotating-sushi {
	box-shadow: inset 0px 0px 42px 1px rgba(255, 255, 255, 0.33);
	border-radius: 50%;
}

.rotating-sushi::after {
	content: '';
	position: absolute;
	inset: 0;
	display: block;
	width: 100%;
	height: 100%;
	box-shadow: 0px 0px 50px 5px rgba(255, 255, 255, 0.33);
	border-radius: 167px;
	border-radius: 50%;
}

.fade-enter-active,
.fade-leave-active {
	transition:
		opacity 0.5s,
		transform 0.5s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}
</style>
