<template>
  <div class="dark">
    <Header v-if="aStore.isAuthenticated" />
    <div class="application page-container">
      <RouterView />
    </div>
  </div>
  <Toaster />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import Header from '@/components/page/header/Header.vue';

import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import { toast } from '@/components/ui/toast';

const aStore = useAuthStore()
const tStore = useToastStore();

watch(() => tStore.visibilityTrigger, () => toast(tStore.toast))
</script>
