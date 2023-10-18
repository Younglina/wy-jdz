<script setup>
import { ImageBaseUrl } from '@/utils/useData.js'
import { useStore } from '@/store';
import { ref, watch } from 'vue';
const props = defineProps({
  datalist: { default: [] },
  type: { default: 'detail' },
  titleKey: { default: 'nickname' },
})
console.log(props.datalist, 'asdf')
const store = useStore()
const verify = ref(false)
// watch(()=>store.userInfo,async ()=>{
//   if(store.userInfo){
//     const user = await queryUser(store.userInfo.username, null, [import.meta.env.VITE_VRF])
//     verify.value = !!user
//   }
// })

const randomAvatar = ['linear-gradient(to top, #c471f5 0%, #fa71cd 100%)', 'linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)', 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)', 'linear-gradient(to top, #feada6 0%, #f5efef 100%)', 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)', 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)', 'linear-gradient(to right, #74ebd5 0%, #9face6 100%)',]
const imagePreview = (imgs, idx) => {
  uni.previewImage({
    urls: imgs.map(item => item = ImageBaseUrl + item)
  })
}

const handleListClick = (item) => {
  if (props.type !== 'detail') {
    uni.navigateTo({ url: `/pages/detail/index?name=${item.key || item.areakey}&dataType=${item.dataType}`})
  }
}

</script>
<template>
  <view v-for="(item, idx) in datalist" @click.stop="handleListClick(item)" :key="idx" class="detail-comment">
    <view class="detail-comment__user">
      <view v-if="type === 'detail'" class="detail-comment__avatar" :style="{ backgroundImage: randomAvatar[idx % 10] }">
      </view>
      <view>
        <text class="detail-comment__username">{{ item[titleKey] }}</text>
        <text class="detail-comment__time">{{ item.createdAt }}</text>
      </view>
      <view v-if="verify" style="margin-left: auto;">
        <button @click="$emit('verify', item)" size="mini">审核</button>
      </view>
    </view>
    <text class="detail-comment__content">{{ item.content }}</text>
    <view v-if="item.images && item.images.length > 0" class="detail-comment__imgs">
      <image v-for="(img, idx) in item.images" @click.stop="imagePreview(item.images, idx)" 
        class="detail-comment__img"
        mode="aspectFit" :key="item" :src="ImageBaseUrl + img">
      </image>
    </view>
    <divider></divider>
  </view>
</template>
<style scoped lang='scss'>
.detail-comment {
  padding: 10rpx;

  &__user {
    display: flex;
  }

  &__avatar {
    min-width: 60rpx;
    height: 60rpx;
    margin-right: 10rpx;
    border-radius: 50%;
  }

  &__username {
    font-size: 30rpx;
    margin-right: 10rpx;
  }

  &__time {
    font-size: 24rpx;
    color: $uni-text-color-grey;
  }

  &__content {
    font-size: 28rpx;
    padding-top: 4px;
  }

  &__imgs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12rpx;
  }

  &__img {
    width: 200rpx;
    height: 200rpx;
  }
}
</style>