<script setup>
import { ImageBaseUrl, navCard } from '@/utils/useUtils.js'
import { computed } from 'vue'
import { useStore } from '@/store'

const Strs = computed(()=>{
  const types = navCard.find(item=>item.value===props.cardType)
  return types?types.text:''
})
const props = defineProps({
  cardType: String
})
const store = useStore()
const cardData = computed(() => {
  return store.areas.filter(item => item.dataType === props.cardType)
})
const toDetail = (areakey) => {
  uni.navigateTo({ url: `/pages/detail/index?areakey=${areakey}&dataType=${props.cardType}`})
}
</script>

<template>
  <view class="common-card">
    <text class="wy-title">特色{{ Strs }}</text>
    <view scroll-x="true" scroll-y="true" class="card-body">
      <view v-for="item in cardData.slice(0, 10)" class="card-body__item" :key="item.name" @click="toDetail(item.areakey)">
        <image class="card-body__image" :src="ImageBaseUrl+item.images[0]" alt=""></image>
        <view class="card-body__name">{{ item.name }}</view>
        <view class="card-body__desc subtext">{{ item.description }}</view>
        <view class="card-body__likes">
          <image class="svg-icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZjQyNDIiIGQ9Ik0xMiAyMC4zMjVxLS4zNSAwLS43MTMtLjEyNXQtLjYzNy0uNGwtMS43MjUtMS41NzVxLTIuNjUtMi40MjUtNC43ODgtNC44MTNUMiA4LjE1UTIgNS44IDMuNTc1IDQuMjI1VDcuNSAyLjY1cTEuMzI1IDAgMi41LjU2MnQyIDEuNTM4cS44MjUtLjk3NSAyLTEuNTM4dDIuNS0uNTYycTIuMzUgMCAzLjkyNSAxLjU3NVQyMiA4LjE1cTAgMi44NzUtMi4xMjUgNS4yNzVUMTUuMDUgMTguMjVsLTEuNyAxLjU1cS0uMjc1LjI3NS0uNjM3LjR0LS43MTMuMTI1Wk0xMS4wNSA2Ljc1cS0uNzI1LTEuMDI1LTEuNTUtMS41NjJ0LTItLjUzOHEtMS41IDAtMi41IDF0LTEgMi41cTAgMS4zLjkyNSAyLjc2M3QyLjIxMyAyLjgzN3ExLjI4NyAxLjM3NSAyLjY1IDIuNTc1VDEyIDE4LjNxLjg1LS43NzUgMi4yMTMtMS45NzV0Mi42NS0yLjU3NXExLjI4Ny0xLjM3NSAyLjIxMi0yLjgzN1QyMCA4LjE1cTAtMS41LTEtMi41dC0yLjUtMXEtMS4xNzUgMC0yIC41MzdUMTIuOTUgNi43NXEtLjE3NS4yNS0uNDI1LjM3NVQxMiA3LjI1cS0uMjc1IDAtLjUyNS0uMTI1dC0uNDI1LS4zNzVabS45NSA0LjcyNVoiLz48L3N2Zz4="></image>
          <text>{{ item.likes }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.card-body {
  display: flex;
  white-space: nowrap;
  overflow-y: auto;
  overflow-x: scroll;

  &__item {
    position: relative;
    padding: 6px;
  }

  &__image {
    width: 200rpx;
    height: 200rpx;
    object-position: center center;
    object-fit: fill;
  }

  &__name{
    font-size: 28rpx;
  }

  &__name,
  &__desc{
    margin: 4px 0;
    max-width: 180rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &__likes{
    position: absolute;
    display: flex;
    align-items: center;
    font-size: 24rpx;
    top: 10px;
    right: 8px;
    padding: 0px 4px;
    border-radius: 4px;
    min-width: 30px;
    background-color: rgba(0,0,0,.2);
    text{
      color: #fff;
      margin-left: 2px;
    }
  }
}

.svg-icon{
  width: 32rpx;
  height: 32rpx;
}
</style>