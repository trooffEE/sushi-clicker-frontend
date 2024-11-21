<template>
  <div class="dark relative">
    <div class="application page-container">
      <RouterView />
    </div>
    <LoaderOverlay :is-visible="lStore.isLoading" />
  </div>
  <Toaster />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import LoaderOverlay from '@/components/ui/custom/LoaderOverlay.vue';

import { toast } from '@/components/ui/toast';
import { useToastStore } from '@/stores/toast';
import { useLoadingStore } from '@/stores/loading';

const tStore = useToastStore();
const lStore = useLoadingStore();

watch(() => tStore.visibilityTrigger, () => toast(tStore.toast))
</script>
