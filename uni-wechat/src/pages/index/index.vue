<script setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import { ImageBaseUrl, navCard } from '../../utils/useUtils.js'
import CommonCard from '@/components/CommonCard/CommonCard.vue'
// const ImageBaseUrl = 'https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/'

// import { wxLogin, getPhoneNumber } from '@/api/user.js'

// const onWxLogin = async () => {
//   uni.login({
//       provider: 'weixin',
//       success: loginRes => {
//           const jsCode = loginRes.code
//           console.log(jsCode)
//           wxLogin(jsCode).then((res) => {
//               const { openId } = res.data
//               // user.setUserInfo({ openId })
//           })
//       }
//   })
// }
const toView = (item) => {
  uni.navigateTo({url: `/pages/area-card/index?dataType=${item.value}&typeStr=${item.text}`})
}
const store = useStore()
store.getAreas()
const areas = computed(() => store.areas.slice(0, 10))
</script>

<template>
  <view class="home-page">
    <swiper class="screen-swiper" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
      <swiper-item v-for="item in areas" :key="item.name">
        <image :src="ImageBaseUrl+item.images[0]" mode="aspectFill" :alt="item.name"></image>
      </swiper-item>
    </swiper>
    <view class="home-page-nav">
      <view v-for="item in navCard" :key="item.value" @click="toView(item)">
        <view class="home-page-nav__image">
          <image :src="item.image"></image>
        </view>
        <text>{{ item.text }}</text>
      </view>
    </view>
    <CommonCard card-type="scenic" />
    <CommonCard card-type="food" />
    <CommonCard card-type="porcelain" />
  </view>
</template>

<style lang="scss" scoped>

.home-page {
  width: 100vw;
  padding: 4px;
  box-sizing: border-box;

  &-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20rpx 0;
    text-align: center;
    &__image {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64rpx;
      height: 64rpx;
      background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
      border-radius: 4px;
    }

    text {
      font-size: 24rpx;
    }
  }
}
</style>