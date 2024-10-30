<template>
    <header class="bg-red-200">
        <nav>
            <div>123123</div>
            <div>123123</div>
            <div v-if="isAuthenticated">123123</div>
        </nav>
    </header>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const { isAuthenticated } = useAuthStore()
</script>