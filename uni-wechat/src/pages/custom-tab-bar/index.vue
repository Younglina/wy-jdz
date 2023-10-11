<script setup>
import { ref } from 'vue';

const active = ref(0)
const onChange = (va)=>{
  console.log(va)
}
</script>
<template>
  <van-tabbar :active="active" @change="onChange">
    <van-tabbar-item icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item icon="search">标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
  </van-tabbar>
</template>
<style scoped lang='scss'>

</style>