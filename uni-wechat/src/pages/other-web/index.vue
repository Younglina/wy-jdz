<script setup>
import request from '@/utils/request.js'
import { ref, onMounted } from 'vue'

const datalist = ref([])
onMounted(()=>{
  request.get('/getAreaFromType?dataType=qunar').then(res=>{
    console.log(res)
    datalist.value = res
  })
})
</script>
<template>
  <view class="other-web">
    <view v-for="(item, index) in datalist" :key="index">
      <text>{{ item.title }}</text>
      <text>{{ item.tags }}</text>
      <text>{{ item.cost }}</text>
      <text>{{ item.address }}</text>
      <text>{{ item.introduction }}</text>
      <text>{{ item.description }}</text>
      <view v-for="(cmt, index1) in item.comments_arr" :key="index1">
        <text>{{ cmt.username }}</text>
        <text>{{ cmt.time }}</text>
        <text>{{ cmt.txt }}</text>
        <text>{{ cmt.comment_from }}</text>
        <image v-for="(img, index2) in cmt.imgs" :key="index2" :src="img" alt="" model="scaleToFill"></image>
      </view>
    </view>
  </view>
</template>
<style scoped lang='scss'>

</style>