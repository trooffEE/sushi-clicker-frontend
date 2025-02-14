<template>
  <!-- TODO Move it to reusable classes -->
  <main class="min-h-screen main">
    <Sidebar />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import Sidebar from '@/components/ui/custom/Sidebar/Sidebar.vue'

import { useAuthStore } from '@/stores/auth'

const aStore = useAuthStore()
aStore.refresh()
</script>

<style scoped>
.main {
  display: flex;
}
</style>
