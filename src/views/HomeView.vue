<template>
  <!-- TODO Move it to reusable classes -->
  <main class="min-h-screen main">
    <Sidebar />
    <div class="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 xl:gap-4">
      <div class="col-span-full xl:col-start-2 xl:col-end-12">
        <RouterView />
      </div>
    </div>
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
