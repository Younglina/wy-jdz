<script setup>
import { computed, ref } from 'vue'
import { ImageBaseUrl, randomAvatar } from '@/utils/useUtils.js'
import { useStore } from '@/store'
import CommentList from '@/components/CommentList/CommentList.vue'

let likesList = ref([])

const store = useStore()
const randomAvatarColor = ref(randomAvatar[Math.floor(Math.random()*9)])
let userInfo = computed(() => {
  const info = store.userInfo?{...store.userInfo}:{
    likes: [],
    comments: [],
    username: '游客'
  }
  if (info) {
    info.avatar = info.avatar?(ImageBaseUrl + info.avatar):''
    if(info.likes.length>0){
      const arr = store.areas.filter(item=>info.likes.includes(item.areakey))
      likesList.value = arr.map(item=>{
        return {
          areaName: item.name, // 中文名 展示用
          areakey: item.areakey, // key值 对应列表查询用
          dataType: item.dataType, // food||scenic等 对应列表查询用
          content: item.description, // 描述
        }
      })
    }
  }
  return info
})

const onSignOut = () => {
  store.userInfo = null
  likesList.value = []
}

const curTab = ref(0);
const tabSelect = (c) => {
  curTab.value = c
}

const toSign = () => {
  uni.redirectTo({url: "/pages/sign/index"})
}
</script>
<template>
  <view v-if="userInfo" class="userinfo">
    <view class="userinfo-base card">
      <image v-if="userInfo.avatar" :src="userInfo.avatar" alt="头像" @click="clickCount++"></image>
      <view v-else class="userinfo-avatar" :style="{ backgroundImage: randomAvatarColor}">
      </view>
      <view class="userinfo-username">{{ userInfo.username }}</view>
      <view class="userinfo-ext">
        <view>{{ userInfo.likes.length }} 喜欢</view>
        <view>{{ userInfo.comments.length }} 评论</view>
      </view>
    </view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="curTab==0?'text-blue cur':''" @click="tabSelect(0)">
					我的喜欢
				</view>
				<view class="cu-item flex-sub" :class="curTab==1?'text-blue cur':''" @click="tabSelect(1)">
					我的评论
				</view>
			</view>
		</scroll-view>
    <CommentList v-show="curTab==0" type="myLikes" titleKey="areaName" :datalist="likesList"/>
    <CommentList v-show="curTab==1" type="myComment" titleKey="areaName" :datalist="userInfo.comments"/>
    <view v-if="userInfo.id" class="flex padding-top justify-center">
      <button round class="cu-btn round" @click="onSignOut">
        退出登录
      </button>
    </view>
    <view v-else class="flex padding-top justify-center">
      <button class="cu-btn bg-blue round" @click="toSign">登录/注册</button>
    </view>
  </view>
</template>
<style scoped lang='scss'>
.userinfo {
  padding: 90rpx 20rpx 0;
  .card {
    border-radius: 8rpx;
    box-shadow: 0rpx 8rpx 16rpx 0rpx rgb(0 0 0 / 3%);
    background: #FFFFFF;
    padding: 10rpx;
    margin-bottom: 20rpx;
  }

  &-base {
    position: relative;

    image, .userinfo-avatar{
      position: absolute;
      width: 140rpx;
      height: 140rpx;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &-username {
    padding-top: 80rpx;
    text-align: center;
    font-size: 26rpx;
    font-weight: bold;
  }

  &-ext {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    color: #888;

    >view {
      position: relative;
      padding: 6rpx 10rpx;
    }

    view+view {
      &::before {
        content: '';
        width: 1rpx;
        height: 50%;
        top: 50%;
        transform: translateY(-50%);
        background-color: #888;
        position: absolute;
        left: 0;
      }
    }

  }
  .cu-item{
    font-size: 28rpx;
  }
}
</style>