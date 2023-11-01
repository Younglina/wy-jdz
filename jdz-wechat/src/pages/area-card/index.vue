<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { useStore } from '@/store'
import { ImageBaseUrl } from '../../utils/useUtils.js'
import { ref, computed } from 'vue'

const dataType =  ref('')
const typeStr = ref('')

onLoad(async (options) => {
  dataType.value = options.dataType
  typeStr.value = options.typeStr
})
const toDetail = (areakey) => {
  uni.navigateTo({url: `/pages/detail/index?areakey=${areakey}`})
}
const store = useStore()
const cards = computed(()=> store.areas.filter(item=>item.dataType === dataType.value))
</script>

<template>
  <view class="preview-page">
    <text class="wy-title">特色{{ typeStr }}</text>
    <view class="card">
      <view v-for="item in cards" class="card-item" :key="item.name" @click="toDetail(item.areakey)">
        <image class="card-item__image" :src="ImageBaseUrl+item.images[0]" loading="lazy" :alt="item.name"></image>
        <image class="card-item__wenli" src="../../static/home.png" ></image>
        <view class="card-item__info">
          <text class="card-item__name">{{ item.name }}</text>
          <text class="card-item__desc">{{ item.description }}</text>
          <view class="card-item__tag">
            <span><van-icon name="location-o" />{{ item.location }}</span>
            <span><van-icon name="label-o" />{{ item.areaType }}</span>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.preview-page {
  padding: 20rpx;

  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60rpx 30rpx;

    &-item {
      position: relative;

      &__image {
        width: 100%;
        height: 320rpx;
        margin-bottom: 20rpx;
        object-fit: cover;
        border-radius: 6px;
      }

      text {
        padding: 6rpx 0;
      }

      &__info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100% - 360rpx);
      }
      &__name {
        font-weight: 500;
        font-size: 26rpx;
      }

      &__desc {
        color: $uni-text-color-grey;
        font-size: 24rpx;
      }

      &__tag {
        color: $uni-text-color-grey;
        font-size: 24rpx;
        display: flex;
        justify-content: space-between;
      }

      &__wenli {
        width: 52rpx;
        height: 52rpx;
        top: 292rpx;
        left: calc(50% - 26rpx);
        background-color: #fff;
        border-radius: 50%;
        border: 1px solid #fff;
        position: absolute;
      }
    }
  }
}
</style>