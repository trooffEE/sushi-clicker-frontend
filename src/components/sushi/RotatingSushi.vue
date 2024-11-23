<template>
  <div @click="slowDownAnimation">
    <div class="transition-all active:scale-90 flex items-center justify-center">
      <div ref="animationItem" class="test animate-spin-slow w-[500px]"
        :style="{ animationDuration, animationDelay: `${animationDelay}s` }">
        <img :src="Image" class="transition-all" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import Image from '@/assets/images/sushis/sushiset1.webp'

const isSlowedDown = ref(false);
const animationDuration = ref('10s');
const animationDelay = ref(0.5);
const test = ref(0)
const timeSlowedDown = ref(0);
const animationItem = useTemplateRef('animationItem');
const timer = ref<number | undefined>();
onMounted(() => {
  animationItem.value?.addEventListener('animationstart', () => {
    test.value = Date.now();
  });
})
const slowDownAnimation = () => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = undefined;
  }

  isSlowedDown.value ||= true;

  if (isSlowedDown.value) {
    timer.value = setTimeout(() => {
      timeSlowedDown.value++;
      isSlowedDown.value = false;
    }, 1000);
  }
};

watch(() => isSlowedDown.value, (value) => {
  if (value) {
    const rest = (test.value - Date.now()) / 1000;
    animationDuration.value = '20s'
    animationDelay.value = rest;
  } else {
    animationDuration.value = '10s';
    animationDelay.value = 0.5;
  }
});
</script>

<style lang="scss" scoped>
.test {
  box-shadow: inset 0px 0px 42px 1px white;
  position: relative;
  border-radius: 167px;
  padding: 15px;
  border-radius: 50%;
  padding: 25px;
}

.test img {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.test::after {
  content: '';
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 50px 5px white;
  border-radius: 167px;
  border-radius: 50%
}
</style>
