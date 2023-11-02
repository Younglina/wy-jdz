<script setup>

</script>
<template>
  <el-table :data="$attrs.tableInfo.data" style="width: 100%" show-overflow-tooltip>
    <el-table-column v-for="item in $attrs.tableInfo.columns" :prop="item.prop" :label="item.label" :key="item.prop"
      :width="item.width || ''" />
    <slot></slot>
  </el-table>
  <el-pagination layout="prev, pager, next" :total="$attrs.tableInfo.total"
    @current-change="(val) => $emit('handleCurrentChange', val)" />
</template>
<style scoped lang='scss'></style>
