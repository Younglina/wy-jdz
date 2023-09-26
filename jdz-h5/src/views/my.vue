<script setup>
import { watch, computed, ref } from 'vue'
import CommnetList from '@/components/commonList.vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import Http from '../utils/http';
import { showSuccessToast } from 'vant'

const router = useRouter()
const store = useStore()
// import vconsole from 'vconsole'
// let clickCount = ref(0)
// const watchConsole = watch(clickCount, () => {
//   if(clickCount.value>=5){
//     new vconsole();
//     watchConsole();
//   }
// })

let userInfo = computed(() => {
  let user = store.userInfo
  if (!user) {
    user = {
      username: '游客',
      likes: [],
      comment: []
    }
  }
  return user
})

const onSignOut = () => {
  Http.get('/logout').then((res)=>{
    store.userInfo = null
    store.routes = []
    showSuccessToast(res.message)
  })
}

const toSign = () => {
  router.push({ path: '/sign' })
}

const active = ref(0);
</script>
<template>
  <div class="userinfo">
    <div class="userinfo-base card">
      <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="头像" @click="clickCount++">
      <img v-else src="../assets/images/avatar.jpeg" alt="头像" @click="clickCount++">
      <div class="userinfo-username">{{ userInfo.username }}</div>
      <div class="userinfo-ext">
        <div>{{ userInfo.likes.length }} 喜欢</div>
        <div>{{ userInfo.comment.length }} 评论</div>
      </div>
    </div>
    <van-tabs v-model:active="active" class="card">
      <van-tab title="我的喜欢">
        <CommnetList v-if="userInfo.likes.length > 0" type="myLikes" titleKey="areaName" :datalist="userInfo.likes" />
        <van-empty v-else description="暂无喜欢" />
      </van-tab>
      <van-tab title="我的评论">
        <CommnetList v-if="userInfo.comment.length > 0" type="myComment" titleKey="areaName" :datalist="userInfo.comment" />
        <van-empty v-else description="暂无评论" />
      </van-tab>
    </van-tabs>
    <van-button v-if="userInfo.id" round block size="small" type="primary" @click="onSignOut">
      退出登录
    </van-button>
    <van-button v-else round block size="small" type="primary" @click="toSign">
      登录/注册
    </van-button>
  </div>
</template>
<style scoped lang='scss'>
.userinfo {
  padding: 50px 20px 0;

  .card {
    border-radius: 8px;
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
    background: #FFFFFF;
    padding: 10px;
    margin-bottom: 20px;
  }

  &-base {
    position: relative;

    img {
      position: absolute;
      width: 38px;
      height: 38px;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -30px);
    }
  }

  &-username {
    padding-top: 10px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
  }

  &-ext {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #888;

    >div {
      position: relative;
      padding: 4px 6px;
    }

    div+div {
      &::before {
        content: '';
        width: 1px;
        height: 50%;
        top: 50%;
        transform: translateY(-50%);
        background-color: #888;
        position: absolute;
        left: 0;
      }
    }
  }
}
</style>