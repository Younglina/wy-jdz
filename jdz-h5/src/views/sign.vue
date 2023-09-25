<script setup>
import { reactive, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import Http from '../utils/http';
import { showSuccessToast } from 'vant'

const router = useRouter()
const store = useStore()
const userForm = reactive({
  username: '',
  password: '',
})

const submitLoading = ref(false)
const onSubmit = () => {
  submitLoading.value = true
  Http.get('/login').then(res=>{
    store.setUserInfo(res.data.userInfo)
    store.addRoutes(res.data.menu, router)
    setTimeout(()=>{
      showSuccessToast({
        message: '登录成功',
      })
      submitLoading.value = false
      router.push('/my')
    }, 500)
  })
}
</script>
<template>
  <div class="sign-page">
    <van-form>
      <van-cell-group inset>
        <van-field v-model="userForm.username" name="昵称" label="昵称" placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]" />
        <van-field v-model="userForm.password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div class="sign-action">
        <van-button size="small" round block type="success" @click="onRegist" :loading="submitLoading" loading-text="提交中...">
          注册
        </van-button>
        <van-button size="small" round block type="primary" @click="onSubmit" :loading="submitLoading" loading-text="提交中...">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<style scoped lang='scss'>
.sign-page {
  height: 100vh;
  padding-bottom: var(--van-tabbar-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/yyc_3.jpeg);
  background-size: cover;
  background-position: center;
}

.sign-action {
  margin: 16px;
  display: flex;
}
</style>