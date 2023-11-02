<script setup>
import { useStore } from '@/store'
import { routes } from '@/router'
const store = useStore()
const menus = computed(() => {
  return routes.filter(item=>item.meta.icon)
})
</script>
<template>
  <el-aside :style="{ width: store.isCollapse ? '64px' : '200px' }" class="animate-aside">
    <div h-60px line-height-60px text-center flex items-center justify-center :style="{ opacity: store.isCollapse ? '0' : '1' }">
      <img src="@/assets/jdz.svg" h-16px w-16px mr-1>
      <span style="font-family: fantasy;">Younglina</span>
    </div>
    <el-menu :collapse="store.isCollapse" class="aside-menu" border-r-unset :collapse-transition="false" router default-active="/">
      <el-menu-item v-for="item in menus" :key="item.name" :index="item.path">
        <el-icon>
        <div :class="[item.meta.icon]"></div>
      </el-icon>
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item>
  </el-menu>
</el-aside></template>
<style scoped lang='scss'>.animate-aside {
  transition: width 0.25s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.03);
}

</style>
