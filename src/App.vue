<template>
  <div class="dark relative">
    <Header v-if="aStore.isAuthenticated" />
    <div class="application page-container">
      <RouterView />
    </div>
    <div class="bg-purple-100/20 absolute inset-0 w-full h-full z-50">
      <img :src="SVGTest" width="20px" height="20px" />
    </div>
  </div>
  <Toaster />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import Header from '@/components/page/header/Header.vue';
import SVGTest from './assets/images/svg/loader.svg'

import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import { toast } from '@/components/ui/toast';

const aStore = useAuthStore();
const tStore = useToastStore();

watch(() => tStore.visibilityTrigger, () => toast(tStore.toast))
</script>
