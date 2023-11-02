<script setup>
import http from '@/utils/http'

const tableInfo = ref({
  data: [],
  columns: [
    { prop: 'id', 'label': 'id', width: '60px' },
    { prop: 'nickname', 'label': '昵称', width: '120px' },
    { prop: 'areaName', 'label': '地点', width: '200px' },
    { prop: 'content', 'label': '内容' },
    { prop: 'isVerify', 'label': '审核状态' },
    { prop: 'createdAt', 'label': '创建时间' },
  ],
})

const queryForm = ref({id: '', isVerify: ''})
onMounted(() => {
  getTableData()
})

function getTableData() {
  http.get('/web/getComment', queryForm.value).then(res => {
    console.log(res)
    tableInfo.value.data = res.data.map(item=>{
      item.images = item.images.map(img=> 'https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/' + img)
      return item
    })
  }).catch(e => {
    console.log(e)
  })
}
const handleCurrentChange = (val) => {
  getTableData(10, (val - 1) * 10)
}

const handleVerify = (id, isVerify) => {
  http.get('/web/verifyComment', {id, isVerify}).then(res => {
    console.log(res)
    ElMessage.success('操作成功')
  }).catch(e => {
    ElMessage.error(e.messge || '操作失败')
  })
}
</script>
<template>
  <el-form :inline="true" :model="queryForm">
    <el-form-item label="id">
      <el-input v-model="queryForm.id" placeholder="id" clearable />
    </el-form-item>
    <el-form-item label="审核状态">
      <el-select v-model="queryForm.isVerify" placeholder="审核状态">
          <el-option label="通过" value="1"/>
          <el-option label="不通过" value="0"/>
        </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getTableData">查询</el-button>
    </el-form-item>
  </el-form>
  <TheTable :tableInfo="tableInfo">
    <el-table-column label="图片">
      <template #default="scope">
        <el-image v-for="url in scope.row.images" class="table-img"
          fill="contain"
          :preview-src-list="scope.row.images"
          preview-teleported
          :key="url"
          :src="url" lazy />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" link @click="handleVerify(scope.row.id, 1)">通过</el-button>
        <el-button size="small" type="danger" link @click="handleVerify(scope.row.id, 0)">不通过</el-button>
      </template>
    </el-table-column>
  </TheTable>
</template>
<style scoped lang='scss'>
.verify-list {
  flex-wrap: nowrap;
}</style>
