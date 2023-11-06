<script setup>
import { useStore } from '@/store'
const store = useStore()
</script>
<template>
  <el-header flex items-center class="wy-header">
    <div :class="[store.isCollapse ? 'i-material-symbols-right-panel-close-sharp' : 'i-material-symbols-left-panel-close-sharp']" cursor-pointer @click="store.toggleAsideBar()" mr-3></div>
    <div flex items-center justify-end flex-grow-1>
      <button icon-btn @click="toggleDark()">
        <div i-material-symbols-sunny-outline dark:i-material-symbols-nightlight-outline />
      </button>
      <a i-material-symbols-route-outline icon-btn m-l-2 m-r-2 rel="noreferrer" href="https://github.com/younglina/wy-jdz" target="_blank"
        title="GitHub" />
      <span>{{ store.userInfo?.username || '游客' }}</span>
    </div>
  </el-header>
</template>
<style scoped lang='scss'>
.wy-header{
  box-shadow: 0 0 10px rgba(0,0,0,0.03);
  margin-bottom: 6px;
}
</style>
