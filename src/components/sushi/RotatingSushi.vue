<template>
	<div>
		<div class="transition-all active:scale-90 flex items-center justify-center">
			<div ref="animationItem" class="test animate-spin-slow w-[500px]">
				<img :src="Image" class="transition-all" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Image from '@/assets/images/sushis/sushiset1.webp'
</script>

<style scoped>
.test {
	box-shadow: inset 0px 0px 42px 1px white;
	position: relative;
	border-radius: 167px;
	padding: 15px;
	border-radius: 50%;
	padding: 25px;
}

.test img {
	-moz-user-select: none;
	-webkit-user-select: none;
	user-select: none;
}

.test::after {
	content: '';
	position: absolute;
	inset: 0;
	display: block;
	width: 100%;
	height: 100%;
	box-shadow: 0px 0px 50px 5px white;
	border-radius: 167px;
	border-radius: 50%;
}
</style>
