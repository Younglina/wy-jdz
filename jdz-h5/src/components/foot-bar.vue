<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { computed, ref } from 'vue';

const staticRouter = useRouter().getRoutes()
const currentTabbar = ref(0)

const store = useStore()
const footBars = computed(() => {
  const dr = store.routes
  console.log(staticRouter, dr)
  return [...dr, ...staticRouter].filter(item=>item.meta.inFoot)
})

</script>
<template>
  <van-tabbar v-model="currentTabbar">
    <van-tabbar-item icon="home-o" v-for="item in footBars" :key="item.path" :to="item.path">{{ item.meta.title }}</van-tabbar-item>
  </van-tabbar>
</template>
<style scoped lang='scss'>

</style>