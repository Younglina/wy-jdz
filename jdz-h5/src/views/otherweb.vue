<script setup>
import Http from '../utils/http';
import { ref } from 'vue'

const datalist = ref([])
Http.get('/getAreaFromType?dataType=qunar').then(res=>{
  console.log(res)
  datalist.value = res.data
})
</script>
<template>
  <div v-for="(item, index) in datalist" :key="index">
    <span>{{ item.title }}</span>
    <span>{{ item.tags }}</span>
    <span>{{ item.cost }}</span>
    <span>{{ item.address }}</span>
    <span>{{ item.introduction }}</span>
    <span>{{ item.description }}</span>
    <div v-for="(cmt, index1) in item.comments_arr" :key="index1">
      <span>{{ cmt.username }}</span>
      <span>{{ cmt.time }}</span>
      <span>{{ cmt.txt }}</span>
      <span>{{ cmt.comment_from }}</span>
      <img v-for="(img, index2) in cmt.imgs" :key="index2" :src="img" alt="">
    </div>
  </div>
</template>
<style scoped lang='scss'>

</style>