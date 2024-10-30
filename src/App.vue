<template>
  <Header />
  <div class="application page-container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/page/header/Header.vue';
</script>

<style scoped>
.header {
  height: 64px;
  display: flex;
  align-items: center;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
