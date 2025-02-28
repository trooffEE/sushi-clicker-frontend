<template>
	<div class="min-h-screen container flex flex-col justify-center items-center">
		<h1 class="heading md:text-5xl text-3xl mb-8 sm:mb-12">sushi-clicker🍣</h1>
		<div class="w-full max-w-[600px] flex justify-center">
			<AuthForm />
		</div>
	</div>
</template>
<script setup lang="ts">
import AuthForm from '@/components/forms/AuthForm.vue'
</script>
<style lang="css" scoped>
.heading {
	font-family: 'Lexend', sans-serif;
	text-transform: uppercase;
}

.page-auth {
	@apply min-h-screen max-w-[1400px] mx-auto flex flex-col justify-center items-center;
}
</style>
