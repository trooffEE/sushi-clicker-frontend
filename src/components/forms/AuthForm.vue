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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="example@mail.com" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Type here!" v-bind="componentField" />
                        </FormControl>
                        <div></div>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Separator label="Or" />
                <div class="text-sm text-muted-foreground underline cursor-pointer" @click="switchMode">
                    {{ texts.hintToReplaceRegisterMode }}
                </div>
                <Button type="submit">
                    Let's go!
                </Button>
            </form>
        </CardContent>
    </Card>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

const isRegisterMode = ref(false);

const texts = computed(() => {
    return {
        title: isRegisterMode.value ? 'Registration' : 'Login',
        titleDescription: isRegisterMode.value ?
            'For registration process we need you to provide email and password! Easy as that :)' :
            'Let\'s login and visit your sushis! They probably missed you!',
        hintToReplaceRegisterMode: isRegisterMode.value ?
            'I have an account and just want to login!' :
            'I want to register!',
    }
});

const switchMode = () => {
    isRegisterMode.value = !isRegisterMode.value;
}

import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
    email: z.string().email().max(50).email(),
    password: z.string().min(6).max(30),
}))


const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    toast({
        title: 'You submitted the following values:',
        description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
    })
})
</script>