<script setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import { ImageBaseUrl, navCard } from '@/utils/useData.js'
import { wxLogin, getPhoneNumber } from '@/api/user.js'

const onWxLogin = async () => {
  uni.login({
      provider: 'weixin',
      success: loginRes => {
          const jsCode = loginRes.code
          console.log(jsCode)
          wxLogin(jsCode).then((res) => {
              const { openId } = res.data
              // user.setUserInfo({ openId })
          })
      }
  })
}
const toView = (key) => {
  // router.push(`/preview?type=${key}`)
}
const store = useStore()
const areas = computed(() => store.areas)
const setArea = () => {
  console.log(123)
  store.getAreas()
}
</script>

<template>
  <view class="home-page">
    <!-- <view class="home-page-nav">
      <view v-for="item in navCard" :key="item.value" @click="toView(item.value)">
        <view class="home-page-nav__image">
          <image :src="item.image" loading="lazy"></image>
        </view>
        <text>{{ item.text }}</text>
      </view>
    </view> -->
    <button @click="onWxLogin">setArea</button>
    <van-button type="primary" size="mini">按钮</van-button>
    <view>{{ areas }}</view>
    <!-- <CommonCard card-type="scenic" :card-data="scenic" />
    <CommonCard card-type="food" :card-data="food" />
    <CommonCard card-type="porcelain" :card-data="porcelain" /> -->
  </view>
</template>

<style lang="scss" scoped>
.home-page {
  width: 100vw;
  padding: 10px;
  box-sizing: border-box;

  &-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 16px 0;

    img {
      width: 24px;
      height: 24px;
    }

    &__image {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
      border-radius: 4px;
    }

    p {
      text-align: center;
      font-size: 12px;
    }
  }
}

:deep.home-swipe {
  &__image {
    object-position: center center;
    object-fit: fill;
    height: 200px;
    width: 100%;
  }

  .van-swipe__track {
    align-items: center
  }
}
</style>