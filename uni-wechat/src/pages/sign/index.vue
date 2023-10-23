<script setup>
import { reactive, ref } from 'vue'
import { useStore } from '@/store'
import request from '@/utils/request.js'

const store = useStore()
const userForm = reactive({
  username: '',
  password: '',
})

const submitLoading = ref(false)
const onSubmit = (type) => {
  submitLoading.value = true
  request.post(type === 1 ? '/login' : '/signUser', userForm).then(res => {
    store.setUserInfo(res.userInfo)
    setTimeout(() => {
      submitLoading.value = false
      uni.switchTab({ url: '/pages/my/index' })
    }, 500)
  }).catch((err) => {
    uni.showToast({
      icon: 'error',
      title: err.message
    })
    submitLoading.value = false
  })
}

</script>
<template>
  <view class="sign-page">
    <view class="sign-form">
      <view class="cu-form-group">
        <view class="title">昵称</view>
        <input type="text" v-model="userForm.username" placeholder="昵称" />
      </view>
      <view class="cu-form-group">
        <view class="title">密码</view>
        <input type="password" v-model="userForm.password" placeholder="密码" />
      </view>
    </view>
    <view class="sign-action">
      <button size="mini" @click="onSubmit(2)" class="cu-btn round bg-green">
        注册
      </button>
      <button size="mini" @click="onSubmit(1)" class="cu-btn round bg-blue margin-left">
        登录
      </button>
    </view>
  </view>
</template>
<style scoped lang='scss'>
.sign-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/yyc_3.jpeg);
  background-size: cover;
  background-position: center;

  .sign-form {
    background-color: rgba(255, 255, 255);
    padding: 8px;
    border-radius: 4px;
  }

  .sign-action {
    margin: 16px;
    display: flex;
  }
}

.cu-form-group {
  position: relative;
}
</style>