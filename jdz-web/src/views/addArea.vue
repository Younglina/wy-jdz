
<script setup>
import { navCard } from '@/utils/useData.js'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import http from '@/utils/http'

const store = useStore()
const formData = ref({
  name: '',
  areakey: '',
  tags: '',
  location: '',
  areaType: '',
  longitude: '',
  latitude: '',
  address: '',
  description: '',
  phone: '',
  openTime: '',
  cost: '',
  introduction: '',
});
const fileList = ref([])

onMounted(() => {
  console.log(store.currentEditArea)
  formData.value = store.currentEditArea
  fileList.value = store.currentEditArea.previewList.map(item=>{
    return {
      name: item.split('/').at(-1),
      url: item
    }
  })
})


const formItems = [
  { prop: 'name', label: '名称', placeholder: '请输入名称', required: true },
  { prop: 'areakey', label: '唯一标识', placeholder: '拼音首字母缩写（如：陶溪川对应txc）', required: true },
  { prop: 'location', label: '所在地', placeholder: '大致街区，如昌江区', required: true },
  { prop: 'address', label: '详细地址', placeholder: '请输入详细地址' },
  { prop: 'dataType', label: '数据类型', placeholder: '选择数据类型', required: true },
  { prop: 'tags', label: '标签', placeholder: '用逗号隔开，如昌江区，博物馆' },
  { prop: 'areaType', label: '类型', placeholder: '如博物馆、商场、餐馆' },
  { prop: 'phone', label: '联系电话', placeholder: '请输入联系电话' },
  { prop: 'openTime', label: '开放时间', placeholder: '请输入开放时间' },
  { prop: 'cost', label: '人均消费', placeholder: '请输入人均消费' },
  { prop: 'description', label: '描述', placeholder: '请输入一句话描述' },
];

const submitLoading = ref(false)
const onSubmit = async () => {
  // if(!store.userInfo){
  //   return ElMessage.error('请先登录')
  // }
  submitLoading.value = true
  // showLoadingToast({
  //   message: '提交中...',
  //   duration: 0,
  //   forbidClick: true,
  //   loadingType: 'spinner',
  // });
  try {
    const submitForm = { ...formData.value }
    const timeKey = Date.now()
    submitForm.tags = submitForm.tags.replaceAll('，', ',').split(',')
    const oldKey = submitForm.areakey
    submitForm.areakey = `${oldKey}wy${timeKey}`
    submitForm.images = []
    submitForm.newImages = []
    fileList.value.map(async item=>{
      if(item.file){
        submitForm.newImages.push({ filename: `${store.userInfo?.username}_${Date.now()}_${item.name}`, file: item.file})
      }else{
        submitForm.images.push(item.name)
      }
    })
    console.log(submitForm, fileList.value)
    http.post('/api/addArea', submitForm)
    // await submitData(type, submitForm)
    // uploadImage(submitForm.key, fileList.value, timeKey)
    // showSuccessToast({
    //   message: '提交成功',
    //   duration: 1000
    // })
    submitLoading.value = false
    setTimeout(() => {
      router.go(-1)
    }, 1200)
  } catch (e) {
    console.dir(e)
    // showSuccessToast({
    //   message: '提交出错',
    //   duration: 1000
    // })
    submitLoading.value = false
  }
}

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handleChange = async (file) => {
  console.log(file)
  const base64String = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file.raw);
  })
  file.file = base64String
}
const chooseArea = (v) => {
  console.log(v)
  formData.value.longitude = v.lng
  formData.value.latitude = v.lat
}
</script>
<template>
  <div p-10>
    <el-form ref="form" label-width="100px">
      <el-form-item v-for="item in formItems" :key="item.label" :label="item.label">
        <el-select v-if="item.prop === 'dataType'" v-model="formData.dataType" placeholder="请选择">
          <el-option v-for="item in navCard" :key="item.text" :label="item.text" :value="item.value" />
        </el-select>
        <el-input v-else v-model="formData[item.prop]" :label="item.label" :placeholder="item.placeholder" :required="item.required" />
      </el-form-item>
      <el-form-item label="详细介绍">
        <el-input
          v-model="formData.introduction"
          :autosize="{ minRows: 3, maxRows: 6 }"
          type="textarea"
          placeholder="详细介绍"
        />
      </el-form-item>
      <el-form-item label="经纬度">
        <Amap :lng="formData.longitude" :lat="formData.latitude" :address="formData.address" @chooseArea="chooseArea"></Amap>
        <div>{{ formData.longitude || '-' }},{{ formData.latitude || '-' }}</div>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="handleChange"
        >
          <el-icon><div i-material-symbols-add></div></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item p-t-4>
        <el-button round type="primary" :loading="submitLoading">返回</el-button>
        <el-button round type="primary" :loading="submitLoading" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.add-page {}
</style>
