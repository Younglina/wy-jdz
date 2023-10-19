<script setup>
import { ImageBaseUrl } from '@/utils/useData.js'
import { makeCall } from '@/utils/useUtils.js'
import { useStore } from '@/store'
import { ref } from 'vue'
import { onLoad } from "@dcloudio/uni-app";
import request from '@/utils/request.js'
import CommentList from '@/components/CommentList/CommentList.vue'

const store = useStore()
const showMore = ref(false)
const detailData = ref({ images: [] })
const loading = ref(true)

const aryComment = ref([])
onLoad(async (options) => {
  detailData.value = store.areas.find(item => item.areakey === options.areakey)
  const areaCommnet = await request.get('/getAreaComment', { areakey: options.areakey })
  const mockComment = await request.get('/mock/commend')
  aryComment.value = (areaCommnet || []).concat(mockComment || [])
  loading.value = false
})

const isLike = ref(false)
const handleLike = () => {
  store.like(detailData.value.areakey)
  isLike.value = !isLike.value
}

const toComment = () => {
  uni.navigateTo({
    url: `/pages/comment/index?areaKey=${detailData.value.areakey}&areaName=${detailData.value.name}&dataType=${detailData.value.dataType}`
  })
}

const toLocation = () => {
  const { latitude, longitude, name, address } = detailData.value
  uni.openLocation({
    latitude: +latitude,
    longitude: +longitude,
    name: name,
    address: address
  })
}

</script>

<template>
  <view class="detail-page">
    <swiper v-if="detailData.images.length" class="screen-swiper screen-swiper-lg" indicator-dots="true" circular="true">
      <swiper-item v-for="item in detailData.images" :key="item.name">
        <image :src="ImageBaseUrl + item" mode="aspectFill" :alt="item.name"></image>
      </swiper-item>
    </swiper>
    <view v-else class="screen-swiper">暂无数据</view>
    <view v-if="loading" class="cu-load"></view>
    <view v-else class="detail-container">
      <view class="detail-info">
        <view class="detail-info__title">
          <text>{{ detailData.name }}</text>
          <text @click="handleLike"
            :class="[isLike ? 'cuIcon-likefill' : 'cuIcon-like', isLike ? 'text-red' : 'text-gray']"></text>
        </view>
        <divider />
        <view class="detail-info__address">
          <view>
            <text>{{ detailData.address }}</text>
            <view class="detail-info__cost">
              <view v-if="detailData.openTime">
                <text class="cuIcon-time"></text>
                开放时间：{{ detailData.openTime }}
              </view>
              <view v-if="detailData.cost" class="detail-info__cost__money">
                <text class="cuIcon-recharge"></text>
                人均花费：{{ detailData.cost }}
              </view>
            </view>
          </view>
          <view class="detail-info__action">
            <view @click="toLocation">
              <text class="cuIcon-location"></text>
              <text>地图</text>
            </view>
            <view v-if="detailData.phone" @click="makeCall(detailData.phone)">
              <text class="cuIcon-phone"></text>
              <text>电话</text>
            </view>
          </view>
        </view>
        <!-- <van-action-sheet v-model:show="showAction" :actions="actions" @select="onSelect" /> -->
      </view>
      <view class="detail-info">
        <text class="wy-title">介绍</text>
        <template v-if="detailData.introduction">
          <text class="detail-info__intor">{{ detailData.introduction?.slice(0, 50) + '...' }}</text>
          <view v-if="detailData.introduction.length > 50" class="detail-info__showmore"
            @click="() => { showMore = !showMore }">
            <text>查看更多</text>
          </view>
          <view :class="['cu-modal', showMore ? 'show' : '']">
            <view class="cu-dialog">
              <view class="cu-bar bg-white justify-end">
                <view class="action" @click="() => { showMore = false }">
                  <text class="cuIcon-close text-red"></text>
                </view>
              </view>
              <view class="padding">
                <view class="detail-info__modal">{{ detailData.introduction }}</view>
              </view>
            </view>
          </view>
        </template>
        <p v-else>暂无</p>
      </view>
      <view class="detail-info">
        <view class="flex flex-direction padding-bottom-sm">
          <button @click="toComment" class="cu-btn bg-blue lg round">去留言</button>
        </view>
        <CommentList :datalist="aryComment"></CommentList>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.screen-swiper-lg {
  background-color: $uni-bg-color;
}

.detail-page {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  background-color: $uni-bg-color-grey;
}

.detail-container {
  position: absolute;
  margin-top: -24rpx;
  padding: 0 8px;
  overflow-y: auto;
  border-radius: 20px;
}

.detail-info {
  position: relative;
  border-radius: 12px;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;

  &__title {
    font-size: 40rpx;
    display: flex;
    justify-content: space-between;
  }

  &__address {
    display: flex;
    font-size: 30rpx;
    justify-content: space-between;

    >text {
      flex: 1;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 28rpx;

    >view {
      min-width: 50rpx;
      padding-left: 6rpx;
    }
  }

  &__cost {
    display: flex;
    font-size: 28rpx;
    padding-top: 2px;

    .van-icon-clock-o {
      color: #409EFF;
      margin-right: 2px;
    }

    &__money {
      margin-left: 12px;
      color: #F56C6C;
    }
  }

  &__intor {
    font-size: 30rpx;
    text-indent: 2em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__modal {
    font-size: 30rpx;
    text-indent: 2em;
    text-align: left;
  }

  &__showmore {
    position: absolute;
    font-size: 28rpx;
    bottom: 10px;
    right: 10px;
    color: $uni-color-primary;
  }
}</style>