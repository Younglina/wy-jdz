<script setup>
// import CommonCard from '@/components/CommonCard.vue'
import Http from '../utils/http';
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { ImageBaseUrl, navCard } from '@/utils/useData'
const router = useRouter()
const toView = (key) => {
  router.push(`/preview?type=${key}`)
}
const store = useStore()
const areas = computed(() => store.areas)
</script>

<template>
  <div class="home-page">
    <van-swipe class="home-swipe" lazy-render autoplay="3000">
      <van-swipe-item v-for="item in areas" :key="item.name">
        <img class="home-swipe__image" :src="ImageBaseUrl+item.images[0]" :alt="item.name" />
      </van-swipe-item>
    </van-swipe>
    <div class="home-page-nav">
      <div v-for="item in navCard" :key="item.value" @click="toView(item.value)">
        <div class="home-page-nav__image">
          <img :src="item.image" loading="lazy" />
        </div>
        <p>{{ item.text }}</p>
      </div>
    </div>
    <!-- <CommonCard card-type="scenic" :card-data="scenic" />
    <CommonCard card-type="food" :card-data="food" />
    <CommonCard card-type="porcelain" :card-data="porcelain" /> -->
  </div>
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