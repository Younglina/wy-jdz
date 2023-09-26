<script setup>
import { useStore } from '@/store'
const store = useStore()
store.getAreas()
</script>

<template>
  <router-view></router-view>
  <foot-bar></foot-bar>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
