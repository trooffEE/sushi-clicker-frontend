<template>
	<Card class="w-full max-w-[600px]">
		<CardHeader>
			<CardTitle>{{ texts.title }}</CardTitle>
			<CardDescription class="mt-3">{{ texts.titleDescription }}</CardDescription>
		</CardHeader>

		<CardContent>
			<form class="space-y-6" @submit="onSubmit">
				<FormField v-slot="{ componentField }" name="email">
					<FormItem>
						<FormLabel>Email:</FormLabel>
						<FormControl>
							<Input
								ref="focusTarget"
								type="email"
								placeholder="example@mail.com"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<FormField v-slot="{ componentField }" name="password">
					<FormItem>
						<FormLabel>Password:</FormLabel>
						<FormControl>
							<Input type="password" placeholder="Type here!" v-bind="componentField" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<FormField v-if="isRegisterMode" v-slot="{ componentField }" name="confirmPassword">
					<FormItem>
						<FormLabel>Confirm password:</FormLabel>
						<FormControl>
							<Input type="password" placeholder="Type here!" v-bind="componentField" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<Separator label="Or" />
				<div class="text-sm text-muted-foreground underline cursor-pointer" @click="switchIsRegisterMode">
					{{ texts.hintToReplaceRegisterMode }}
				</div>
				<Button type="submit"> Let's go! </Button>
			</form>
		</CardContent>
	</Card>
</template>
<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { authZodSchema } from './validation/auth'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToastStore } from '@/stores/toast'
import { useFocus } from '@vueuse/core'

const isRegisterMode = ref(false)
const focusTarget = shallowRef()
const { focused } = useFocus(focusTarget, { initialValue: true })
const switchIsRegisterMode = () => {
	isRegisterMode.value = !isRegisterMode.value
	focused.value = true
}
const texts = computed(() => {
	return {
		title: isRegisterMode.value ? 'Registration' : 'Login',
		titleDescription: isRegisterMode.value
			? 'For registration process we need you to provide email and password! Easy as that :)'
			: "Let's login and visit your sushis! They probably missed you!",
		hintToReplaceRegisterMode: isRegisterMode.value
			? 'I have an account and just want to login!'
			: 'I want to register!',
	}
})

const formSchema = toTypedSchema(
	authZodSchema.refine(
		(check) => {
			if (!isRegisterMode.value) {
				return true
			}

			return check.password === check.confirmPassword
		},
		{
			message: "Please make sure 'Password' and 'Confirm password' match",
			path: ['confirmPassword'],
		},
	),
)
const { handleSubmit, resetField } = useForm({ validationSchema: formSchema })

const aStore = useAuthStore()
const router = useRouter()
const uStore = useToastStore()
const authFn = computed(() => (isRegisterMode.value ? aStore.register : aStore.login))

const onSubmit = handleSubmit(async (values) => {
	console.log('test', values)
	authFn
		.value(values)
		.then(() => {
			const title = isRegisterMode.value ? 'Thank you for registration!' : 'Welcome back!'
			const descrption = isRegisterMode.value ? "You can now safely surf to find your best sushi's! <3" : '<3'
			uStore.makeSuccessToast(title, descrption)
			router.replace('/')
		})
		.catch(() => {
			resetField('password')
			resetField('confirmPassword')
			focused.value = true
		})
})
</script>
