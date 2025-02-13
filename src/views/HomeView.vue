<template>
  <!-- TODO Move it to reusable classes -->
  <main class="min-h-screen">
    <Sidebar
      :is-open="isSidebarOpen"
      @toggle="isSidebarOpen = !isSidebarOpen"
    />
    <div class="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 xl:gap-4">
      <div class="col-span-full xl:col-start-2 xl:col-end-12">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/ui/custom/Sidebar/Sidebar.vue'

const isSidebarOpen = ref(false)

import { useAuthStore } from '@/stores/auth'

const aStore = useAuthStore()
aStore.refresh()
</script>
