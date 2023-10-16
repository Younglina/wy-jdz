<script setup>
import { ImageBaseUrl, navCard } from '@/utils/useData.js'
import { computed } from 'vue'
import { useStore } from '@/store'
// import { showLoadingToast } from 'vant'

const Strs = computed(()=>{
  const types = navCard.find(item=>item.value===props.cardType)
  return types?types.text:''
})
const props = defineProps({
  cardType: String
})
const store = useStore()
const cardData = computed(() => {
  console.log(store.areas, props.cardType)
  return store.areas.filter(item => item.dataType === props.cardType)
})
const toDetail = (name) => {
  // showLoadingToast({
  //   message: '加载中...',
  //   duration: 0,
  //   loadingType: 'spinner',
  // });
  uni.switchTab({ url: '/detail', query: { name, dataType: props.cardType } })
}
</script>

<template>
  <view class="common-card">
    <text class="wy-title">特色{{ Strs }}</text>
    <view class="card-body">
      <view v-for="item in cardData.slice(0, 10)" class="card-body__item" :key="item.name" @click="toDetail(item.key)">
        <image class="card-body__image" :src="ImageBaseUrl+item.images[0]" alt=""></image>
        <text class="card-body__name">{{ item.name }}</text>
        <text class="card-body__desc">{{ item.desc }}</text>
        <view class="card-body__likes">
          <text>喜欢</text>
          <text>{{ item.likes || 0 }}</text>
        </view>
    </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.card-body {
  white-space: nowrap;
  overflow-y: auto;
  display: flex;

  &__item {
    position: relative;
    padding: 6px;
  }

  &__image {
    width: 3.4rem;
    height: 3.4rem;
    object-position: center center;
    object-fit: fill;
  }

  &__name,
  &__desc{
    margin: 4px 0;
    width: 3rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &__desc{
    font-size: 14px;
    color: #888;
  }

  &__likes{
    position: absolute;
    font-size: 12px;
    top: 10px;
    right: 8px;
    padding: 0px 4px;
    border-radius: 4px;
    min-width: 30px;
    background-color: rgba(0,0,0,.4);
    span{
      color: #fff;
      margin-left: 4px;
    }
  }
}
</style>