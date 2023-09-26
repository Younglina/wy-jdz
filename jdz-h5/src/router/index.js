import { createRouter, createWebHashHistory } from 'vue-router'
import { useStore } from '../store'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue'), meta: { title: '首页', inFoot: true } },
  // { path: '/preview', name: 'Preview', component: () => import('@/views/previewList.vue'), meta: { title: '列表预览' } },
  // { path: '/detail', name: 'Detail', component: () => import('@/views/detail.vue'), meta: { title: '详情' } },
  { path: '/my', name: 'My', component: () => import('@/views/my.vue') , meta: { title: '我的', inFoot: true}},
  { path: '/sign', name: 'Sign', component: () => import('@/views/sign.vue') , meta: { title: '登录/注册'}},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if('Sign' === to.name){
    if(useStore().getUserInfo){
      next({path: '/my'})
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
