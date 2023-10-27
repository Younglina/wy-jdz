<script setup>
import { ImageBaseUrl, randomAvatar } from '@/utils/useUtils.js'
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

const imagePreview = (imgs, idx) => {
  uni.previewImage({
    urls: imgs.map(item => item = ImageBaseUrl + item)
  })
}

const handleListClick = (item) => {
  if (props.type !== 'detail') {
    uni.navigateTo({ url: `/pages/detail/index?areakey=${item.areakey}`})
  }
}

</script>
<template>
  <view v-if="datalist.length">
    <view v-for="(item, idx) in datalist" @click.stop="handleListClick(item)" :key="idx" class="detail-comment">
      <view class="detail-comment__user">
        <view v-if="type === 'detail'" class="detail-comment__avatar" :style="{ backgroundImage: randomAvatar[idx % 10] }">
        </view>
        <view>
          <text class="detail-comment__username">{{ item[titleKey] }}</text>
          <view class="detail-comment__time">{{ item.createdAt }}</view>
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
  </view>
  <view v-else class="empty">
    <image src="@/static/empty.png"></image>
    <view>暂无数据</view>
  </view>
</template>
<style scoped lang='scss'>
.detail-comment {
  padding: 20rpx;
  background-color: #fff;

  &__user {
    display: flex;
    align-items: flex-end;
  }

  &__avatar {
    min-width: 60rpx;
    height: 60rpx;
    margin-right: 10rpx;
    border-radius: 50%;
  }

  &__username {
    font-weight: 500;
    font-size: 28rpx;
    margin-right: 10rpx;
  }

  &__time {
    font-size: 24rpx;
    color: $uni-text-color-grey;
  }

  &__content {
    font-size: 26rpx;
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
.empty{
  text-align: center;
  font-size: 28rpx;
  background-color: #fff;
  color: $uni-text-color-grey;
  image{
    width: 380rpx;
    height: 380rpx;
  }
  view{
    padding-bottom: 20rpx;
  }
}
</style>