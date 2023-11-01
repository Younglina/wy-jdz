<script setup>
import { useStore } from '@/store'
const store = useStore()
</script>
<template>
  <el-header flex items-center class="wy-header">
    <div :class="[store.isCollapse ? 'i-material-symbols-right-panel-close-sharp' : 'i-material-symbols-left-panel-close-sharp']" cursor-pointer @click="store.toggleAsideBar()" mr-3></div>
    TheHeader
  </el-header>
</template>
<style scoped lang='scss'>
.wy-header{
  box-shadow: 0 0 10px rgba(0,0,0,0.03);
  margin-bottom: 6px;
}
</style>
