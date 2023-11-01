<script setup>
import http from '@/utils/http'

// const tableData = ref([])
// const tableTotal = ref(0)
const tableInfo = ref({
  data: [],
  total: 0,
  columns: [
    { prop: 'id', 'label': 'id'},
    { prop: 'username', 'label': '昵称'},
    { prop: 'likes', 'label': '喜欢'},
    { prop: 'loginStatus', 'label': '在线状态'},
    { prop: 'createTime', 'label': '创建时间'},
    { prop: 'updateTime', 'label': '最后上线时间'},
  ]
})
onMounted(()=>{
  getTableData()
})

function getTableData(limit=10, offset=0){
  http.get('/web/allUser', { limit, offset }).then(res => {
    tableInfo.value.data = res.data.list
    tableInfo.value.total = res.data.total
  }).catch(e=>{
    console.log(e)
  })
}
const handleCurrentChange = (val) => {
  getTableData(10, (val-1)*10)
}

const handleDelete = (id) => {
  console.log(id)
}
</script>
<template>
  <TheTable :tableInfo="tableInfo">
    <el-table-column label="操作" >
      <template #default="scope">
        <el-button size="small" type="danger" link @click="handleDelete(scope.row.id)">编辑</el-button>
      </template>
    </el-table-column>
  </TheTable>
</template>
<style scoped lang='scss'></style>
