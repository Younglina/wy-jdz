<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from "@dcloudio/uni-app";
import { useComment } from "@/utils/useUtils.js"

const commentContent = ref('') // 留言
const imgList = ref([])
const submitLoading = ref(false)
let queryObj = {}
onLoad(async (options) => {
  queryObj = { ...options }
})

const submitComment = async (t) => {
  if(t === 2) uni.navigateBack()
  if(submitLoading.value) return
  submitLoading.value = true
  console.log(queryObj,'queryObj')
  await useComment(queryObj, commentContent.value, [...imgList.value])
  submitLoading.value = false
}

const previewImage = (e) => {
  uni.previewImage({
    urls: imgList.value,
    current: e.currentTarget.dataset.url
  });
}

const chooseImage = () => {
  uni.chooseImage({
    count: 9, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: (res) => {
      console.log(res)
      if (imgList.value.length != 0) {
        imgList.value = imgList.value.concat(res.tempFilePaths)
      } else {
        imgList.value = res.tempFilePaths
      }
    }
  });
}

const delImg = () => {
  imgList.value.splice(e.currentTarget.dataset.index, 1)
}
</script>

<template>
  <view>
    <view class="cu-form-group margin-top">
      <textarea maxlength="500" v-model="commentContent" placeholder="说点什么吧~"></textarea>
    </view>
    <divider />
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        上传图片
      </view>
      <view class="action">
        {{ imgList.length }}/9
      </view>
    </view>
    <view class="cu-form-group">
      <view class="grid col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item, index) in imgList" :key="index" @click="previewImage" :data-url="item">
          <image :src="item" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @click.stop="delImg" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @click="chooseImage" v-if="imgList.length < 9">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>
    <divider />
    <view class="cu-form-group flex justify-center">
      <button size="mini" @click="submitComment(2)" class="cu-btn round bg-green">
        取消
      </button>
      <button size="mini" @click="submitComment(1)" class="cu-btn round bg-blue margin-left">
        提交
      </button>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.commnet-form {
  position: relative;
  overflow-y: auto;

  :deep(.van-cell-group) {
    margin: 0
  }

  .action-button {
    display: flex;
  }
}
</style>