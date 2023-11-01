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
      <view>{{ item.title }}</view>
      <view>{{ item.tags }}</view>
      <view>{{ item.cost }}</view>
      <view>{{ item.address }}</view>
      <view>{{ item.introduction }}</view>
      <view>{{ item.description }}</view>
      <view v-for="(cmt, index1) in item.comments_arr" :key="index1">
        <view>{{ cmt.username }}</view>
        <view>{{ cmt.time }}</view>
        <view>{{ cmt.txt }}</view>
        <view>{{ cmt.comment_from }}</view>
        <view class="comment-imgs">
          <image v-for="(img, index2) in cmt.imgs" :key="index2" :src="img" class="comment-img" model="scaleToFill"></image>
        </view>
      </view>
    </view>
  </view>
</template>
<style scoped lang='scss'>
.comment-imgs{
  display: flex;
  flex-wrap: wrap;
  .comment-img{
    width: 30vw;
    height: 30vw;
    padding: 6rpx;
  }
}
</style>