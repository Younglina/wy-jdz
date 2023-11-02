<script setup>
import http from '@/utils/http'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const router = useRouter()
const tableInfo = ref({
  data: [],
  columns: [
    { prop: 'id', 'label': 'id', width: '60px'},
    { prop: 'name', 'label': '名称'},
    { prop: 'address', 'label': '地点'},
    { prop: 'description', 'label': '描述'},
    { prop: 'phone', 'label': '电话'},
    { prop: 'tags', 'label': '类别'},
    { prop: 'openTime', 'label': '开放时间'},
  ]
})
onMounted(()=>{
  getTableData()
})

function getTableData(limit=10, offset=0){
  http.get('/api/getArea', { limit, offset }).then(res => {
    tableInfo.value.data = res.data.map(item=>{
      item.previewList = item.images.map(img=> 'https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/' + img)
      item.images = item.previewList[0]
      item.tags = item.tags.join('、')
      return item
    })
  }).catch(e=>{
    console.log(e)
  })
}
const handleCurrentChange = (val) => {
  getTableData(10, (val-1)*10)
}

const toEdit = (data) => {
  useStore().currentEditArea = data
  router.push('/addArea')
}
</script>
<template>
  <el-row>
    <el-button @click="router.push('/addArea')">新增</el-button>
  </el-row>
  <TheTable :tableInfo="tableInfo">
    <el-table-column label="图片">
      <template #default="scope">
        <el-image class="table-img"
          fill="contain"
          :preview-src-list="scope.row.previewList"
          preview-teleported
          :key="scope.row.images"
          :src="scope.row.images" lazy />
      </template>
    </el-table-column>
    <el-table-column label="操作" >
      <template #default="scope">
        <el-button size="small" type="danger" link @click="toEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </TheTable>
</template>
<style scoped lang='scss'></style>
