<template>
  <div class="dark">
    <Header v-if="isAuthenticated" />
    <div class="application page-container">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/page/header/Header.vue';

import { useAuthStore } from '@/stores/auth';

const { isAuthenticated } = useAuthStore()
</script>